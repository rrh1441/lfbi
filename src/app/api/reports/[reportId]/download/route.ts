import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  try {
    const resolvedParams = await params
    const reportId = resolvedParams.reportId
    
    const { data: report, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', reportId)
      .single()
    
    if (error || !report) {
      return new NextResponse('Report not found', { status: 404 })
    }
    
    // Generate standalone HTML with embedded CSS
    const html = generateStandaloneHTML(report)
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${report.report_type}-${report.scan_id}.html"`
      }
    })
  } catch (error) {
    console.error('Failed to download report:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

function generateStandaloneHTML(report: { id: string; scan_id: string; company_name: string; domain: string; content: string; report_type: string; status: string; created_at: string; findings_count: number }): string {
  // Professional styling for standalone HTML
  const baseCSS = `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        line-height: 1.6; 
        color: #374151; 
        background: #f9fafb;
      }
      .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
      .header { 
        background: white; 
        border-bottom: 1px solid #e5e7eb; 
        padding: 2rem 0; 
        margin-bottom: 2rem; 
      }
      .header h1 { 
        font-size: 2.5rem; 
        font-weight: 300; 
        color: #1f2937; 
        margin-bottom: 1rem; 
      }
      .header .meta { 
        color: #6b7280; 
        display: flex; 
        gap: 1rem; 
        align-items: center; 
      }
      .content { 
        background: white; 
        border-radius: 0.75rem; 
        padding: 2rem; 
        box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
        margin-bottom: 2rem; 
      }
      .gradient-text { 
        background: linear-gradient(135deg, #ef4444, #dc2626); 
        -webkit-background-clip: text; 
        -webkit-text-fill-color: transparent; 
        background-clip: text;
      }
      .risk-score { 
        text-align: center; 
        padding: 3rem; 
        background: linear-gradient(135deg, #f9fafb, #ffffff); 
        border-radius: 1rem; 
        border: 1px solid #e5e7eb; 
      }
      .risk-score .score { 
        font-size: 5rem; 
        font-weight: 100; 
        margin: 1rem 0; 
      }
      .financial-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
        gap: 1.5rem; 
        margin: 2rem 0; 
      }
      .financial-card { 
        background: white; 
        border: 1px solid #e5e7eb; 
        border-radius: 1rem; 
        padding: 1.5rem; 
        position: relative; 
        overflow: hidden; 
      }
      .financial-card.emphasis { 
        border-color: #fed7aa; 
        background: linear-gradient(135deg, #fef3c7, #fbbf24); 
      }
      .financial-card h3 { 
        font-size: 0.875rem; 
        font-weight: 600; 
        color: #6b7280; 
        text-transform: uppercase; 
        letter-spacing: 0.05em; 
        margin-bottom: 0.5rem; 
      }
      .financial-card .value { 
        font-size: 2.5rem; 
        font-weight: 300; 
        color: #1f2937; 
      }
      .financial-card.emphasis .value { 
        color: #92400e; 
      }
      .findings-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
        gap: 1.5rem; 
        margin: 2rem 0; 
      }
      .finding-card { 
        background: white; 
        border: 1px solid #e5e7eb; 
        border-radius: 0.5rem; 
        padding: 1.5rem; 
      }
      .badge { 
        display: inline-block; 
        padding: 0.25rem 0.75rem; 
        border-radius: 9999px; 
        font-size: 0.75rem; 
        font-weight: 600; 
        text-transform: uppercase; 
      }
      .badge.critical { background: #fef2f2; color: #dc2626; }
      .badge.high { background: #fff7ed; color: #ea580c; }
      .badge.medium { background: #fefce8; color: #ca8a04; }
      .badge.low { background: #f0f9ff; color: #0284c7; }
      pre { 
        background: #f3f4f6; 
        padding: 1rem; 
        border-radius: 0.5rem; 
        overflow-x: auto; 
        font-size: 0.875rem; 
        white-space: pre-wrap; 
      }
      @media print {
        body { background: white; }
        .container { padding: 1rem; }
        .content { box-shadow: none; border: 1px solid #e5e7eb; }
      }
    </style>
  `

  // Get report type specific styling
  const getReportTypeHeader = (reportType: string) => {
    switch (reportType) {
      case 'threat_snapshot':
        return {
          title: '🚨 Security Risk Assessment - Threat Snapshot',
          subtitle: 'Executive Dashboard Overview'
        }
      case 'executive_summary':
        return {
          title: '📊 Executive Security Briefing',
          subtitle: 'Strategic Security Overview'
        }
      case 'technical_remediation':
        return {
          title: '🛠️ Technical Remediation Guide',
          subtitle: 'Detailed Implementation Instructions'
        }
      default:
        return {
          title: '📋 Security Assessment Report',
          subtitle: 'Security Analysis Results'
        }
    }
  }

  const headerInfo = getReportTypeHeader(report.report_type)
  
  // Format content based on report type
  let formattedContent = report.content
  
  // If content is markdown, convert basic formatting
  if (typeof formattedContent === 'string') {
    formattedContent = formattedContent
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\`\`\`([\\s\\S]*?)\`\`\`/g, '<pre>$1</pre>')
      .replace(/\`(.+?)\`/g, '<code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">$1</code>')
      .replace(/\\n\\n/g, '</p><p>')
      .replace(/\\n/g, '<br>')
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${headerInfo.title} - ${report.company_name}</title>
  ${baseCSS}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${headerInfo.title}</h1>
      <div class="meta">
        <strong>${report.company_name}</strong>
        <span>•</span>
        <span>${report.domain}</span>
        <span>•</span>
        <span>Generated: ${new Date(report.created_at).toLocaleDateString()}</span>
        <span>•</span>
        <span class="badge ${report.status === 'completed' ? 'high' : 'medium'}">${report.status}</span>
      </div>
    </div>

    <div class="content">
      <h2>${headerInfo.subtitle}</h2>
      <p style="color: #6b7280; margin-bottom: 2rem;">
        This report contains ${report.findings_count} verified security findings for ${report.company_name}.
      </p>
      
      <div style="white-space: pre-wrap; line-height: 1.8;">
        ${formattedContent}
      </div>
    </div>

    <div class="content">
      <h3>Report Information</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div>
          <strong>Report Type:</strong><br>
          <span class="badge medium">${report.report_type.replace('_', ' ').toUpperCase()}</span>
        </div>
        <div>
          <strong>Findings Count:</strong><br>
          ${report.findings_count} verified findings
        </div>
        <div>
          <strong>Generated:</strong><br>
          ${new Date(report.created_at).toLocaleString()}
        </div>
        <div>
          <strong>Status:</strong><br>
          <span class="badge ${report.status === 'completed' ? 'high' : 'medium'}">${report.status}</span>
        </div>
      </div>
    </div>

    <footer style="text-align: center; padding: 2rem; color: #6b7280; border-top: 1px solid #e5e7eb; margin-top: 2rem;">
      <p>This report was generated by DealBrief Security Platform</p>
      <p style="font-size: 0.875rem; margin-top: 0.5rem;">
        Report ID: ${report.id} | Scan ID: ${report.scan_id}
      </p>
    </footer>
  </div>
</body>
</html>`
}