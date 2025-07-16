import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  try {
    const resolvedParams = await params
    const reportId = resolvedParams.reportId
    
    // Parse report ID format: scanId_reportType
    let scanId: string
    let reportType: string
    let report: any = null
    
    if (reportId.includes('_')) {
      // New format: scanId_reportType
      const parts = reportId.split('_')
      reportType = parts.pop()!
      scanId = parts.join('_')
      
      // Query scan_status table
      const { data: scan, error: scanError } = await supabase
        .from('scan_status')
        .select('*')
        .eq('scan_id', scanId)
        .single()
      
      if (!scanError && scan) {
        // Extract report data based on type
        if (reportType === 'threat_snapshot' && scan.threat_snapshot_status === 'completed') {
          report = {
            id: reportId,
            scan_id: scanId,
            report_type: 'threat_snapshot',
            html_content: scan.threat_snapshot_html,
            markdown_content: scan.threat_snapshot_markdown,
            company_name: scan.company_name,
            domain: scan.domain,
            created_at: scan.threat_snapshot_generated_at,
            findings_count: scan.verified_findings_count
          }
        } else if (reportType === 'executive_summary' && scan.executive_summary_status === 'completed') {
          report = {
            id: reportId,
            scan_id: scanId,
            report_type: 'executive_summary',
            html_content: scan.executive_summary_html,
            markdown_content: scan.executive_summary_markdown,
            company_name: scan.company_name,
            domain: scan.domain,
            created_at: scan.executive_summary_generated_at,
            findings_count: scan.verified_findings_count
          }
        } else if (reportType === 'technical_remediation' && scan.technical_remediation_status === 'completed') {
          report = {
            id: reportId,
            scan_id: scanId,
            report_type: 'technical_remediation',
            html_content: scan.technical_remediation_html,
            markdown_content: scan.technical_remediation_markdown,
            company_name: scan.company_name,
            domain: scan.domain,
            created_at: scan.technical_remediation_generated_at,
            findings_count: scan.verified_findings_count
          }
        }
      }
    }
    
    // If not found, try old reports table
    if (!report) {
      const { data: oldReport, error: oldError } = await supabase
        .from('reports')
        .select('*')
        .eq('id', reportId)
        .single()
      
      if (oldError || !oldReport) {
        return new NextResponse('Report not found', { status: 404 })
      }
      
      // Transform old report to new structure
      report = {
        ...oldReport,
        html_content: null,
        markdown_content: oldReport.content,
        report_type: oldReport.report_type || 'threat_snapshot'
      }
    }
    
    // Get HTML content
    let htmlContent = report.html_content
    
    if (!htmlContent) {
      // Generate HTML from markdown if needed
      const baseCSS = getPrintOptimizedCSS()
      const formattedContent = convertMarkdownToHTML(report.markdown_content || report.content || '')
      
      htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${getReportTitle(report.report_type)} - ${report.company_name || 'Report'}</title>
  ${baseCSS}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${getReportTitle(report.report_type)}</h1>
      <div class="meta">
        <strong>${report.company_name || 'Unknown Company'}</strong>
        <span>•</span>
        <span>${report.domain || 'Unknown Domain'}</span>
        <span>•</span>
        <span>Generated: ${new Date(report.created_at).toLocaleDateString()}</span>
      </div>
    </div>
    <div class="content">
      ${formattedContent}
    </div>
  </div>
</body>
</html>`
    }
    
    // Add print-specific CSS and JavaScript to trigger print dialog
    const printableHTML = htmlContent.replace('</head>', `
  <style>
    @media print {
      body { 
        margin: 0; 
        background: white;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .container { 
        max-width: 100%; 
        padding: 0;
      }
      .no-print { display: none !important; }
      @page {
        margin: 1in 0.75in;
        size: letter;
      }
      .page-break { page-break-after: always; }
      .avoid-break { page-break-inside: avoid; }
    }
  </style>
  <script>
    // Auto-trigger print dialog when page loads
    window.onload = function() {
      window.print();
      // Close window after print dialog is closed
      window.onafterprint = function() {
        window.close();
      }
    }
  </script>
</head>`)
    
    // Return HTML with print dialog trigger
    return new NextResponse(printableHTML, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `inline; filename="${report.report_type}-${report.scan_id}-${new Date().toISOString().split('T')[0]}.pdf"`
      }
    })
  } catch (error) {
    console.error('Failed to generate PDF:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

function getPrintOptimizedCSS(): string {
  return `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        line-height: 1.6; 
        color: #000; 
        background: white;
        font-size: 11pt;
      }
      .container { max-width: 100%; margin: 0; padding: 0; }
      .header { 
        border-bottom: 2px solid #000; 
        padding-bottom: 1rem; 
        margin-bottom: 2rem; 
      }
      .header h1 { 
        font-size: 24pt; 
        font-weight: 600; 
        color: #000; 
        margin-bottom: 0.5rem; 
      }
      .header .meta { 
        color: #333; 
        display: flex; 
        gap: 1rem; 
        align-items: center;
        font-size: 10pt;
      }
      .content { 
        margin-bottom: 2rem; 
      }
      h2 { 
        font-size: 18pt; 
        font-weight: 600; 
        color: #000; 
        margin: 1.5rem 0 0.75rem;
        page-break-after: avoid;
      }
      h3 { 
        font-size: 14pt; 
        font-weight: 600; 
        color: #000; 
        margin: 1rem 0 0.5rem;
        page-break-after: avoid;
      }
      p { margin-bottom: 0.75rem; }
      table { 
        width: 100%; 
        border-collapse: collapse; 
        margin: 1rem 0;
        page-break-inside: avoid;
      }
      th, td { 
        padding: 0.5rem; 
        text-align: left; 
        border: 1px solid #000; 
      }
      th { 
        font-weight: 600; 
        background: #f0f0f0;
      }
      .badge { 
        display: inline-block; 
        padding: 0.25rem 0.5rem; 
        border: 1px solid #000;
        font-size: 9pt; 
        font-weight: 600; 
        text-transform: uppercase; 
      }
      .financial-card { 
        border: 2px solid #000; 
        padding: 1rem; 
        margin: 0.5rem 0;
        page-break-inside: avoid;
      }
      .financial-card h3 { 
        font-size: 10pt; 
        font-weight: 600; 
        text-transform: uppercase; 
        margin-bottom: 0.25rem; 
      }
      .financial-card .value { 
        font-size: 20pt; 
        font-weight: 600; 
      }
      pre { 
        background: #f0f0f0; 
        padding: 0.75rem; 
        border: 1px solid #000;
        font-size: 9pt; 
        white-space: pre-wrap;
        page-break-inside: avoid;
      }
      .page-break { page-break-after: always; }
      .avoid-break { page-break-inside: avoid; }
    </style>
  `
}

function convertMarkdownToHTML(markdown: string): string {
  if (!markdown) return ''
  
  // Basic markdown to HTML conversion
  let html = markdown
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/```([\s\S]*?)```/g, '<pre>$1</pre>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
  
  // Wrap in paragraph tags if not already wrapped
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`
  }
  
  return html
}

function getReportTitle(reportType: string): string {
  const titles: Record<string, string> = {
    threat_snapshot: 'Security Risk Assessment - Threat Snapshot',
    executive_summary: 'Executive Security Briefing',
    technical_remediation: 'Technical Remediation Guide'
  }
  return titles[reportType] || 'Security Assessment Report'
}