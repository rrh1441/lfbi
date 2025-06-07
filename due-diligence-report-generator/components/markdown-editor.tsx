"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Edit, Save, Upload, ImageIcon, Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownEditorProps {
  markdown: string
  onChange: (markdown: string) => void
  config: any
  onConfigChange: (config: any) => void
}

const sampleMarkdown = `# DealBrief Security Assessment

**Company:** Lexigate  
**Assessment Model:** Advanced Security Scanner v2.1  
**Generated:** ${new Date().toISOString()}  
**Analyst:** Security Team Alpha  

## Executive Snapshot

Lexigate's cybersecurity posture presents a **medium level of risk**, primarily driven by weak rate limiting across multiple API endpoints and the presence of numerous typo domains that could facilitate phishing attacks. Email security measures including DKIM, SPF, and DMARC require immediate strengthening to prevent email spoofing attacks. The absence of CAPTCHA on critical login forms also creates vulnerability to automated attacks.

**Immediate action is recommended** to address these vulnerabilities to protect user data and prevent potential security breaches.

## Overall Security Rating

> **🟡 YELLOW - Medium Risk**
> 
> *Requires attention within 30 days*

## 🚨 Critical Red Flags

- **API Security:** Multiple endpoints with insufficient rate limiting detected
- **Domain Security:** Presence of multiple typo domains enabling phishing attacks  
- **Email Security:** Weak SPF/DMARC policies allowing email spoofing
- **Authentication:** Missing CAPTCHA protection on login forms
- **Communication Security:** Absent DKIM email authentication

## Detailed Security Findings

### 1. Rate Limiting Vulnerabilities

**🔍 What was discovered:**
- Eight API endpoints identified with inadequate rate limiting
- Affected endpoints: \`/api/data\`, \`/api/users\`, \`/api/forgot-password\`, and others

**⚔️ Threat actor tactics:**
- Brute force attacks against user accounts
- Automated data scraping and extraction
- API abuse leading to service degradation

**💼 Business impact:**
- **High risk** of data breaches and unauthorized access
- Loss of customer trust and confidence
- Potential regulatory fines and compliance violations
- Service availability issues

**✅ Recommended solution:**
Implement comprehensive rate limiting across all API endpoints with:
- IP-based request throttling (max 100 requests/minute)
- Progressive delays for repeated violations
- Monitoring and alerting for suspicious activity

### 2. Typo Domain Threats

**🔍 What was discovered:**
- Multiple typo domains registered: \`lexisgate.com\`, \`lexicate.com\`
- Domains could be used for sophisticated phishing campaigns

**⚔️ Threat actor tactics:**
- Credential harvesting through fake login pages
- Brand impersonation for social engineering
- Malware distribution via lookalike domains

**💼 Business impact:**
- **Medium risk** of successful phishing attacks
- Brand reputation damage
- Customer data compromise
- Legal liability for security incidents

**✅ Recommended solution:**
- Implement domain monitoring and alerting
- Consider legal action against malicious domain registrations
- Deploy email security training for employees
- Implement browser security extensions

### 3. Email Security Deficiencies

**🔍 What was discovered:**
- **DKIM:** Not implemented
- **SPF Policy:** Overly permissive configuration
- **DMARC Policy:** Set to 'none' (no enforcement)

**⚔️ Threat actor tactics:**
- Email spoofing and impersonation attacks
- Business Email Compromise (BEC) schemes
- Phishing campaigns using company domain

**💼 Business impact:**
- **High risk** of email-based attacks
- Damage to email deliverability and reputation
- Financial fraud through BEC attacks
- Loss of customer trust

**✅ Recommended solution:**
- Implement strict DKIM signing for all outbound emails
- Configure restrictive SPF policy (\`v=spf1 include:_spf.company.com -all\`)
- Deploy DMARC with \`p=reject\` policy after testing
- Monitor DMARC reports for unauthorized usage

### 4. Authentication Security Gaps

**🔍 What was discovered:**
- Login forms lack CAPTCHA protection
- No evidence of multi-factor authentication enforcement

**⚔️ Threat actor tactics:**
- Automated credential stuffing attacks
- Brute force password attacks
- Account takeover attempts

**💼 Business impact:**
- **Medium risk** of account compromise
- Unauthorized access to user data
- Potential for lateral movement within systems

**✅ Recommended solution:**
- Deploy CAPTCHA on all authentication forms
- Implement mandatory 2FA for all user accounts
- Add account lockout policies after failed attempts
- Monitor for suspicious login patterns

## Risk Assessment Matrix

| Vulnerability | Severity | Likelihood | Business Impact | Priority |
|---------------|----------|------------|-----------------|----------|
| API Rate Limiting | High | High | High | 🔴 Critical |
| Email Security | High | Medium | High | 🔴 Critical |
| Typo Domains | Medium | Medium | Medium | 🟡 High |
| CAPTCHA Missing | Medium | High | Medium | 🟡 High |

## Remediation Timeline

### Immediate (0-7 days)
- [ ] Implement API rate limiting
- [ ] Deploy CAPTCHA on login forms
- [ ] Configure basic SPF records

### Short-term (1-4 weeks)
- [ ] Implement DKIM signing
- [ ] Deploy DMARC policy (monitor mode)
- [ ] Set up domain monitoring

### Medium-term (1-3 months)
- [ ] Enforce strict DMARC policy
- [ ] Legal action against typo domains
- [ ] Comprehensive security awareness training

## Compliance Considerations

- **GDPR:** Data protection measures required for EU users
- **SOC 2:** Security controls needed for enterprise customers
- **ISO 27001:** Information security management standards
- **PCI DSS:** If processing payment data

---

## Appendix A: Technical Evidence

### Source References
1. **API Rate Limiting Analysis** - Automated security scanner results
2. **Domain Intelligence** - Threat intelligence feeds and WHOIS data
3. **Email Security Assessment** - DNS record analysis and email authentication testing
4. **Authentication Testing** - Manual security testing of login mechanisms

### Coverage Limitations
- **Infrastructure Details:** Limited visibility into internal network architecture
- **Code Review:** Source code analysis not performed
- **Penetration Testing:** Full penetration test recommended for comprehensive assessment
- **Third-party Integrations:** Security of external dependencies not fully assessed

---

*This assessment was conducted by DealBrief Security Scanner • Confidential Analysis*  
*Report Classification: CONFIDENTIAL - Internal Use Only*`

export default function MarkdownEditor({ markdown, onChange, config, onConfigChange }: MarkdownEditorProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<Array<{ name: string; url: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      const newImage = { name: file.name, url }
      setUploadedImages((prev) => [...prev, newImage])

      // Auto-insert the image at cursor position
      insertImageAtCursor(file.name, url)
    }
  }

  const insertImageAtCursor = (name: string, url: string) => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const imageMarkdown = `![${name}](${url})`
      const newText = markdown.substring(0, start) + imageMarkdown + markdown.substring(end)
      onChange(newText)

      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length)
      }, 0)
    }
  }

  const insertTextAtCursor = (text: string) => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newText = markdown.substring(0, start) + text + markdown.substring(end)
      onChange(newText)

      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + text.length, start + text.length)
      }, 0)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Markdown Editor</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={!isPreviewMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsPreviewMode(false)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant={isPreviewMode ? "default" : "outline"} size="sm" onClick={() => setIsPreviewMode(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!isPreviewMode ? (
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <Textarea
                  ref={textareaRef}
                  value={markdown}
                  onChange={(e) => onChange(e.target.value)}
                  className="min-h-[600px] font-mono text-sm"
                  placeholder="Enter your Markdown content here..."
                />
              </div>
            ) : (
              <div className="min-h-[600px] prose prose-sm max-w-none p-4 border rounded-md bg-white overflow-auto">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 pb-2 border-b" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-6 mb-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200" {...props} />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-2 whitespace-nowrap text-sm border-b" {...props} />
                    ),
                    img: ({ node, ...props }) => <img className="max-w-full h-auto rounded-lg shadow-sm" {...props} />,
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Report Title</Label>
              <Input
                id="title"
                value={config.title}
                onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={config.subtitle}
                onChange={(e) => onConfigChange({ ...config, subtitle: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={config.theme} onValueChange={(value) => onConfigChange({ ...config, theme: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="logo">Company Logo URL</Label>
              <Input
                id="logo"
                value={config.companyLogo}
                onChange={(e) => onConfigChange({ ...config, companyLogo: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
            </div>

            <Button className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() =>
                insertTextAtCursor(
                  "\n\n## Security Finding\n\n**🔍 What was discovered:**\n\n**⚔️ Threat actor tactics:**\n\n**💼 Business impact:**\n\n**✅ Recommended solution:**\n",
                )
              }
            >
              Add Security Finding
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() =>
                insertTextAtCursor(
                  "\n\n| Vulnerability | Severity | Likelihood | Impact | Priority |\n|---------------|----------|------------|--------|----------|\n| Example Issue | High | Medium | High | 🔴 Critical |\n",
                )
              }
            >
              Add Risk Matrix
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() =>
                insertTextAtCursor(
                  "\n\n### Remediation Steps\n\n- [ ] Immediate action item\n- [ ] Short-term fix\n- [ ] Long-term improvement\n",
                )
              }
            >
              Add Remediation Plan
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => fileInputRef.current?.click()}>
              <ImageIcon className="w-4 h-4 mr-2" />
              Insert Evidence
            </Button>
          </CardContent>
        </Card>

        {uploadedImages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Images ({uploadedImages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 border rounded">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{image.name}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const markdown = `![${image.name}](${image.url})`
                        navigator.clipboard.writeText(markdown)
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
