"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Code, Share } from "lucide-react"
import { useState } from "react"

interface ReportExporterProps {
  markdown: string
  images: Array<{ id: string; name: string; url: string; type: string }>
  config: any
}

export default function ReportExporter({ markdown, images, config }: ReportExporterProps) {
  const [exportFormat, setExportFormat] = useState("pdf")
  const [isExporting, setIsExporting] = useState(false)

  const exportReport = async (format: string) => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (format === "html") {
      const htmlContent = generateHTML()
      downloadFile(htmlContent, "report.html", "text/html")
    } else if (format === "markdown") {
      downloadFile(markdown, "report.md", "text/markdown")
    } else if (format === "json") {
      const jsonData = {
        config,
        markdown,
        images,
        exportedAt: new Date().toISOString(),
      }
      downloadFile(JSON.stringify(jsonData, null, 2), "report.json", "application/json")
    }

    setIsExporting(false)
  }

  const generateHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        h2 { color: #1f2937; margin-top: 2em; }
        table { width: 100%; border-collapse: collapse; margin: 1em 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f8f9fa; font-weight: 600; }
        .header { text-align: center; margin-bottom: 2em; padding: 2em; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; }
        .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1em; margin: 2em 0; }
        .metric-card { background: #f8f9fa; padding: 1.5em; border-radius: 8px; text-align: center; }
        .metric-value { font-size: 2em; font-weight: bold; color: #2563eb; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${config.title}</h1>
        <p>${config.subtitle}</p>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    </div>
    
    <div class="metrics">
        <div class="metric-card">
            <div class="metric-value">+45%</div>
            <div>Revenue Growth</div>
        </div>
        <div class="metric-card">
            <div class="metric-value">Strong</div>
            <div>Market Position</div>
        </div>
        <div class="metric-card">
            <div class="metric-value">Medium</div>
            <div>Risk Level</div>
        </div>
    </div>
    
    <div class="content">
        ${markdown.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}
    </div>
    
    <footer style="margin-top: 3em; padding-top: 2em; border-top: 1px solid #eee; text-align: center; color: #666;">
        <p>This report contains confidential and proprietary information.</p>
        <p>© ${new Date().getFullYear()} - All rights reserved</p>
    </footer>
</body>
</html>`
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareReport = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: config.title,
          text: config.subtitle,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Report URL copied to clipboard!")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="html">HTML File</SelectItem>
                <SelectItem value="markdown">Markdown File</SelectItem>
                <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => exportReport(exportFormat)} disabled={isExporting} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? "Exporting..." : "Export"}
            </Button>

            <Button variant="outline" onClick={shareReport} className="w-full">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Quick Export</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => exportReport("html")}>
                <FileText className="w-4 h-4 mr-1" />
                HTML
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportReport("markdown")}>
                <Code className="w-4 h-4 mr-1" />
                MD
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Report Summary</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Title:</strong> {config.title}
                </p>
                <p>
                  <strong>Pages:</strong> ~{Math.ceil(markdown.length / 3000)}
                </p>
                <p>
                  <strong>Images:</strong> {images.length}
                </p>
                <p>
                  <strong>Word Count:</strong> ~{markdown.split(" ").length}
                </p>
                <p>
                  <strong>Theme:</strong> {config.theme}
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-900">Export Features</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Professional formatting</li>
                <li>✓ Embedded images and logos</li>
                <li>✓ Interactive tables and charts</li>
                <li>✓ Print-ready layout</li>
                <li>✓ Responsive design</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2 text-green-900">API Integration</h4>
              <p className="text-sm text-green-800 mb-2">Programmatic export available via REST API</p>
              <code className="text-xs bg-white p-2 rounded block">
                POST /api/reports/export
                <br />
                {`{ "format": "pdf", "config": {...} }`}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
