import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { markdown, config, format, images } = await request.json()

    // Validate input
    if (!markdown || !config || !format) {
      return NextResponse.json({ error: "Missing required fields: markdown, config, format" }, { status: 400 })
    }

    // Process the report based on format
    let result
    switch (format) {
      case "html":
        result = await generateHTML(markdown, config, images)
        break
      case "pdf":
        result = await generatePDF(markdown, config, images)
        break
      case "json":
        result = {
          config,
          markdown,
          images,
          exportedAt: new Date().toISOString(),
          metadata: {
            wordCount: markdown.split(" ").length,
            imageCount: images?.length || 0,
            estimatedPages: Math.ceil(markdown.length / 3000),
          },
        }
        break
      default:
        return NextResponse.json({ error: "Unsupported format" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      format,
      data: result,
      exportedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function generateHTML(markdown: string, config: any, images: any[]) {
  // Convert markdown to HTML with professional styling
  const processedMarkdown = markdown
    .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-gray-800 mb-4 mt-8">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium text-gray-700 mb-3 mt-6">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/\n\n/g, '</p><p class="mb-4">')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="max-w-4xl mx-auto bg-white shadow-lg">
        <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold">${config.title}</h1>
                    <p class="text-blue-100 mt-2">${config.subtitle}</p>
                </div>
                ${config.companyLogo ? `<img src="${config.companyLogo}" alt="Logo" class="h-16">` : ""}
            </div>
        </header>
        
        <main class="p-8">
            <div class="prose prose-lg max-w-none">
                <p class="mb-4">${processedMarkdown}</p>
            </div>
        </main>
        
        <footer class="bg-gray-100 p-6 text-center text-gray-600">
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            <p class="text-sm mt-2">This report contains confidential information</p>
        </footer>
    </div>
</body>
</html>`
}

async function generatePDF(markdown: string, config: any, images: any[]) {
  // In a real implementation, you would use a library like Puppeteer or jsPDF
  // For now, return a placeholder
  return {
    message: "PDF generation would be implemented with Puppeteer or similar",
    config,
    contentLength: markdown.length,
    imageCount: images?.length || 0,
  }
}
