"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building, TrendingUp, AlertTriangle } from "lucide-react"

interface ReportPreviewProps {
  markdown: string
  images: Array<{ id: string; name: string; url: string; type: string }>
  config: any
}

export default function ReportPreview({ markdown, images, config }: ReportPreviewProps) {
  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "modern":
        return "bg-gradient-to-br from-blue-50 to-indigo-100"
      case "minimal":
        return "bg-white"
      case "corporate":
        return "bg-gray-50"
      default:
        return "bg-white"
    }
  }

  const processMarkdown = (text: string) => {
    return (
      text
        .replace(
          /^# (.*$)/gm,
          '<h1 class="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-red-600 pb-2">$1</h1>',
        )
        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">$1</h2>')
        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium text-gray-700 mb-3 mt-6">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        // Security-specific formatting
        .replace(
          /🔴 Critical/g,
          '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">🔴 Critical</span>',
        )
        .replace(
          /🟡 High/g,
          '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">🟡 High</span>',
        )
        .replace(
          /🟢 Low/g,
          '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">🟢 Low</span>',
        )
        .replace(
          /🟡 YELLOW - Medium Risk/g,
          '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">🟡 YELLOW - Medium Risk</span>',
        )
        // Code formatting
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
        // Checkbox formatting
        .replace(/- \[ \]/g, '<li class="flex items-center ml-4 mb-1"><input type="checkbox" class="mr-2" disabled>')
        .replace(
          /- \[x\]/g,
          '<li class="flex items-center ml-4 mb-1"><input type="checkbox" class="mr-2" checked disabled>',
        )
        .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
        .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
        .replace(/\n\n/g, '</p><p class="mb-4">')
        // Table formatting
        .replace(/\|(.+)\|/g, (match, content) => {
          const cells = content
            .split("|")
            .map((cell: string) => cell.trim())
            .filter((cell: string) => cell)
          return `<tr>${cells.map((cell: string) => `<td class="border border-gray-300 px-4 py-2">${cell}</td>`).join("")}</tr>`
        })
    )
  }

  return (
    <Card className="max-w-none">
      <CardContent className="p-0">
        <div className={`min-h-screen ${getThemeClasses(config.theme)}`}>
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {config.companyLogo && (
                    <img src={config.companyLogo || "/placeholder.svg"} alt="Company Logo" className="h-12 w-auto" />
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
                    <p className="text-gray-600">{config.subtitle}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" />
                    {new Date().toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Confidential
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Header Image */}
          {config.headerImage && (
            <div className="w-full h-48 bg-cover bg-center" style={{ backgroundImage: `url(${config.headerImage})` }}>
              <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl font-bold mb-2">Due Diligence Analysis</h2>
                  <p className="text-lg opacity-90">Comprehensive Business Review</p>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="max-w-4xl mx-auto px-8 py-8">
            {/* Security Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Risk Level</p>
                      <p className="text-2xl font-bold text-yellow-600">Medium</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Critical Issues</p>
                      <p className="text-2xl font-bold text-red-600">4</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Compliance</p>
                      <p className="text-2xl font-bold text-blue-600">Partial</p>
                    </div>
                    <Building className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Remediation</p>
                      <p className="text-2xl font-bold text-green-600">30 Days</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Security Status Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge className="bg-red-100 text-red-800">API Security Issues</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">Email Security</Badge>
              <Badge className="bg-orange-100 text-orange-800">Domain Threats</Badge>
              <Badge className="bg-blue-100 text-blue-800">Authentication Gaps</Badge>
              <Badge variant="outline">Assessment Complete</Badge>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: `<p class="mb-4">${processMarkdown(markdown)}</p>`,
                }}
              />
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>This report contains confidential and proprietary information.</p>
              <p>© {new Date().getFullYear()} - All rights reserved</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
