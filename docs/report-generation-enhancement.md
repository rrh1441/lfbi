# Report Generation Enhancement

## Overview
This document describes the enhanced report generation system that solves the `max_tokens` errors by implementing batch remediation generation.

## Key Changes

### 1. Batch Remediation Generation
Instead of making individual API calls for each finding, the system now:
- Processes up to 15 findings in a single API call
- Uses structured JSON response format
- Reduces API calls from 10+ to just 1

### 2. Database Persistence
Enhanced remediation is now persisted back to the database:
- Updates the `findings` table with generated remediation
- Adds `updated_at` timestamp when updating recommendations
- Enables reuse of remediation data for future reports

### 3. Report Generation Flow

```
1. Receive report generation request
2. Batch generate remediation for findings missing recommendations
3. Update findings in database with new remediation
4. Fetch updated findings from database
5. Generate CSV data for report templates
6. Generate reports using enhanced data
7. Save reports to database
```

## API Endpoint Changes

### POST /api/reports/generate

**Request Body:**
```json
{
  "scanId": "scan-123",
  "findings": [...],  // Optional - will fetch from DB if not provided
  "companyName": "Example Corp",
  "domain": "example.com",
  "reportTypes": ["threat_snapshot", "executive_summary"]  // Support for multiple types
}
```

**Response:**
```json
{
  "success": true,
  "scanId": "scan-123",
  "generatedReports": 2,
  "enhancedFindings": 10,
  "reports": [
    {
      "type": "threat_snapshot",
      "id": "scan-123-threat_snapshot",
      "content": "...",
      "htmlContent": "..."
    }
  ]
}
```

## Report Types Configuration

Located in `/lib/report-types.ts`:

```typescript
export interface ReportTypeConfig {
  type: string
  title: string
  description: string
  system_prompt: string
  user_prompt_template: string
  max_tokens: number
}
```

### Available Report Types:
1. **threat_snapshot** - Executive dashboard with financial impact (650 words)
2. **executive_summary** - Strategic overview (2,500 words)
3. **technical_remediation** - Detailed technical guide (4,500 words)

## Implementation Details

### Batch Remediation Prompt Structure
```
Generate specific remediation steps for these security findings:

FINDING 1 (ID: xxx):
Type: XSS
Severity: HIGH
Description: ...
---

Return a JSON array with remediation for each finding:
[
  {
    "finding_id": "xxx",
    "risk_explanation": "Brief risk explanation",
    "remediation_steps": ["Step 1", "Step 2", "Step 3"],
    "verification": "How to verify the fix"
  }
]
```

### Models Used
- Batch remediation: `gpt-4o` (6000 max tokens)
- Report generation: `o3-2025-04-16` (configurable per report type)

## Benefits
1. **Efficiency**: Single batch API call instead of 10+ individual calls
2. **Cost Control**: Limits to 15 findings for remediation enhancement
3. **Persistence**: Remediation written to database for future use
4. **Fresh Data**: Reports use updated findings from database
5. **Error Handling**: Graceful fallbacks if remediation generation fails

## Backward Compatibility
The endpoint maintains backward compatibility:
- Accepts both single `reportType` and multiple `reportTypes`
- Returns appropriate response format based on request
- Falls back to original findings if database fetch fails