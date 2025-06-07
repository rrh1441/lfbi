"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText } from "lucide-react"
import MarkdownEditor from "@/components/markdown-editor"
import ReportPreview from "@/components/report-preview"
import ReportExporter from "@/components/report-exporter"

const sampleMarkdown = `# Due Diligence Report

## Executive Summary

This comprehensive due diligence report provides an in-depth analysis of the target company's financial position, operational capabilities, and strategic outlook.

## Company Overview

**Company Name:** TechCorp Solutions Inc.  
**Industry:** Software Technology  
**Founded:** 2018  
**Headquarters:** San Francisco, CA  

### Key Metrics

| Metric | Value | Growth (YoY) |
|--------|-------|--------------|
| Revenue | $12.5M | +45% |
| EBITDA | $3.2M | +52% |
| Employees | 85 | +38% |
| Customers | 450 | +67% |

## Financial Analysis

### Revenue Streams

1. **SaaS Subscriptions** (70% of revenue)
   - Monthly recurring revenue: $875K
   - Annual churn rate: 8%
   - Average contract value: $2,800

2. **Professional Services** (25% of revenue)
   - Implementation services
   - Training and support
   - Custom development

3. **Licensing** (5% of revenue)
   - Third-party integrations
   - White-label solutions

### Profitability Analysis

The company has demonstrated strong profitability growth with improving margins:

- **Gross Margin:** 78% (industry average: 65%)
- **Operating Margin:** 15% (up from 8% in 2022)
- **Net Margin:** 12%

## Market Position

### Competitive Landscape

The company operates in a competitive but growing market with several key advantages:

- **Market Size:** $2.8B (growing at 15% CAGR)
- **Market Share:** 2.1%
- **Competitive Moat:** Proprietary AI algorithms and strong customer relationships

### SWOT Analysis

**Strengths:**
- Strong technical team and product innovation
- High customer satisfaction scores (NPS: 68)
- Scalable business model

**Weaknesses:**
- Limited geographic presence
- Dependence on key personnel
- Need for additional capital for expansion

**Opportunities:**
- International expansion
- Adjacent market penetration
- Strategic partnerships

**Threats:**
- Increasing competition from larger players
- Economic downturn impact on customer spending
- Regulatory changes in data privacy

## Risk Assessment

### High Priority Risks

1. **Customer Concentration Risk**
   - Top 5 customers represent 35% of revenue
   - Mitigation: Active diversification strategy

2. **Technology Risk**
   - Rapid pace of technological change
   - Mitigation: Continuous R&D investment (18% of revenue)

3. **Regulatory Risk**
   - Data privacy regulations (GDPR, CCPA)
   - Mitigation: Compliance program and legal review

## Recommendations

Based on our comprehensive analysis, we recommend proceeding with the investment opportunity with the following considerations:

1. **Investment Structure:** Preferred equity with board representation
2. **Use of Funds:** 60% growth initiatives, 40% working capital
3. **Key Performance Indicators:** Monthly monitoring of ARR, churn, and customer acquisition cost

## Conclusion

TechCorp Solutions presents a compelling investment opportunity with strong fundamentals, experienced management, and significant growth potential. The company's market position and financial performance indicate a well-positioned business for continued success.

---

*This report was prepared by [Your Firm Name] on [Date]. All information is confidential and proprietary.*`

export default function ReportGenerator() {
  const [markdown, setMarkdown] = useState(sampleMarkdown)
  const [images, setImages] = useState<
    Array<{ id: string; name: string; url: string; type: "logo" | "image" | "icon" }>
  >([])
  const [reportConfig, setReportConfig] = useState({
    title: "Due Diligence Report",
    subtitle: "Comprehensive Analysis",
    companyLogo: "",
    headerImage: "",
    theme: "professional",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Due Diligence Report Generator</h1>
          <p className="text-gray-600">Transform your Markdown content into professional, editable reports</p>
        </div>

        <Tabs defaultValue="editor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor">
            <MarkdownEditor
              markdown={markdown}
              onChange={setMarkdown}
              config={reportConfig}
              onConfigChange={setReportConfig}
            />
          </TabsContent>

          <TabsContent value="preview">
            <ReportPreview markdown={markdown} images={images} config={reportConfig} />
          </TabsContent>

          <TabsContent value="export">
            <ReportExporter markdown={markdown} images={images} config={reportConfig} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
