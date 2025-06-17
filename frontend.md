# DealBrief Security Scanner - Frontend Design

## Overview
A comprehensive Next.js frontend for the DealBrief security scanning platform that enables users to trigger scans, review findings, verify results, and generate AI-powered security reports.

## Core Features

### 1. Scan Initiation
- **Company Information Input**: Company name and domain
- **Tag Management**: Optional tags for categorization and filtering
- **Real-time Scan Progress**: Live updates showing module completion (1/16 → 16/16)
- **Scan History**: Previous scans with status and completion times

### 2. Findings Workspace
- **Interactive Findings Table**: All discovered security issues with verification controls
- **State Management**: Toggle between AUTOMATED → VERIFIED for each finding
- **Filtering & Search**: Filter by severity, type, verification status, tags
- **Bulk Operations**: Select multiple findings for batch verification
- **Trend Analysis**: Compare raw vs verified results over time

### 3. AI Report Generation
- **OpenAI o3-2025-04-16 Integration**: Generate comprehensive security reports
- **Custom Prompting**: User-configurable report templates
- **Export Options**: PDF, Word, and JSON formats
- **Report History**: Previous reports with regeneration capability

## Technical Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand + TanStack Query
- **Database**: Supabase (PostgreSQL) 
- **Authentication**: Supabase Auth
- **File Handling**: Next.js API routes + AWS S3
- **Real-time**: Supabase Realtime subscriptions

### Database Schema Integration
Based on the provided findings data, the key tables are:

```typescript
interface Finding {
  id: string;
  created_at: string;
  description: string;
  scan_id: string;
  type: string;
  recommendation: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  attack_type_code: string;
  state: 'AUTOMATED' | 'VERIFIED' | 'FALSE_POSITIVE';
  eal_low: number;
  eal_ml: number;
  eal_high: number;
}

interface Scan {
  scan_id: string;
  company_name: string;
  domain: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  total_modules: number;
  created_at: string;
  completed_at?: string;
  tags?: string[];
}
```

## Page Structure

### 1. Dashboard (`/dashboard`)
```typescript
// Dashboard showing scan overview and quick actions
const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Quick Stats */}
      <div className="col-span-12 lg:col-span-8">
        <StatsOverview />
      </div>
      
      {/* Recent Activity */}
      <div className="col-span-12 lg:col-span-4">
        <RecentActivity />
      </div>
      
      {/* Active Scans */}
      <div className="col-span-12">
        <ActiveScansTable />
      </div>
      
      {/* Quick Actions */}
      <div className="col-span-12">
        <QuickActions />
      </div>
    </div>
  );
};
```

### 2. New Scan (`/scans/new`)
```typescript
const NewScan = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    domain: '',
    tags: []
  });

  const startScan = async () => {
    const response = await fetch('/api/scans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      const { scanId } = await response.json();
      router.push(`/scans/${scanId}`);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Start Security Scan</CardTitle>
        <CardDescription>
          Initiate a comprehensive security assessment
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              companyName: e.target.value
            }))}
            placeholder="Acme Corporation"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="domain">Domain</Label>
          <Input
            id="domain"
            value={formData.domain}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              domain: e.target.value
            }))}
            placeholder="example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (Optional)</Label>
          <TagInput
            value={formData.tags}
            onChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
            placeholder="Add tags for categorization"
          />
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={startScan} className="w-full">
          Start Scan
        </Button>
      </CardFooter>
    </Card>
  );
};
```

### 3. Scan Progress (`/scans/[scanId]`)
```typescript
const ScanProgress = ({ scanId }: { scanId: string }) => {
  const { data: scan, isLoading } = useQuery({
    queryKey: ['scan', scanId],
    queryFn: () => fetchScan(scanId),
    refetchInterval: 2000, // Poll every 2 seconds
  });

  const progressPercentage = scan ? (scan.progress / scan.total_modules) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{scan?.company_name}</h1>
          <p className="text-muted-foreground">{scan?.domain}</p>
        </div>
        <Badge variant={getStatusVariant(scan?.status)}>
          {scan?.status}
        </Badge>
      </div>
      
      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Scan Progress</span>
              <span>{scan?.progress}/{scan?.total_modules} modules</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      {/* Module Status */}
      <ModuleStatusGrid scanId={scanId} />
      
      {/* Live Findings Feed */}
      {scan?.status === 'completed' && (
        <Button onClick={() => router.push(`/scans/${scanId}/findings`)}>
          View Findings ({scan.total_findings_count})
        </Button>
      )}
    </div>
  );
};
```

### 4. Findings Workspace (`/scans/[scanId]/findings`)
```typescript
const FindingsWorkspace = ({ scanId }: { scanId: string }) => {
  const [filters, setFilters] = useState({
    severity: [],
    type: [],
    state: [],
    search: ''
  });
  
  const [selectedFindings, setSelectedFindings] = useState<string[]>([]);

  const { data: findings, isLoading } = useQuery({
    queryKey: ['findings', scanId, filters],
    queryFn: () => fetchFindings(scanId, filters),
  });

  const verifyFindings = async (findingIds: string[], newState: 'VERIFIED' | 'FALSE_POSITIVE') => {
    await fetch('/api/findings/verify', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ findingIds, state: newState })
    });
    
    // Optimistic update
    queryClient.invalidateQueries(['findings', scanId]);
  };

  const generateReport = async () => {
    const verifiedFindings = findings?.filter(f => f.state === 'VERIFIED') || [];
    
    const response = await fetch('/api/reports/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scanId,
        findings: verifiedFindings,
        companyName: scan?.company_name,
        domain: scan?.domain
      })
    });
    
    if (response.ok) {
      const { reportId } = await response.json();
      router.push(`/reports/${reportId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Findings</h1>
          <p className="text-muted-foreground">
            {findings?.filter(f => f.state === 'VERIFIED').length || 0} verified of {findings?.length || 0} total
          </p>
        </div>
        
        <div className="flex gap-2">
          {selectedFindings.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={() => verifyFindings(selectedFindings, 'VERIFIED')}
              >
                Verify Selected ({selectedFindings.length})
              </Button>
              <Button
                variant="outline"
                onClick={() => verifyFindings(selectedFindings, 'FALSE_POSITIVE')}
              >
                Mark False Positive
              </Button>
            </>
          )}
          
          <Button onClick={generateReport} disabled={!findings?.some(f => f.state === 'VERIFIED')}>
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <FindingsFilters filters={filters} onFiltersChange={setFilters} />

      {/* Findings Table */}
      <Card>
        <CardContent className="p-0">
          <FindingsTable
            findings={findings || []}
            selectedFindings={selectedFindings}
            onSelectionChange={setSelectedFindings}
            onVerifyFinding={(id, state) => verifyFindings([id], state)}
          />
        </CardContent>
      </Card>
    </div>
  );
};
```

## Key Components

### 1. FindingsTable Component
```typescript
const FindingsTable = ({ findings, selectedFindings, onSelectionChange, onVerifyFinding }) => {
  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
        />
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.getValue('type')}
        </Badge>
      )
    },
    {
      accessorKey: 'severity',
      header: 'Severity',
      cell: ({ row }) => (
        <Badge variant={getSeverityVariant(row.getValue('severity'))}>
          {row.getValue('severity')}
        </Badge>
      )
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <div className="max-w-md">
          <p className="truncate">{row.getValue('description')}</p>
        </div>
      )
    },
    {
      accessorKey: 'state',
      header: 'Status',
      cell: ({ row }) => {
        const state = row.getValue('state');
        const findingId = row.original.id;
        
        return (
          <Select
            value={state}
            onValueChange={(newState) => onVerifyFinding(findingId, newState)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AUTOMATED">Automated</SelectItem>
              <SelectItem value="VERIFIED">Verified</SelectItem>
              <SelectItem value="FALSE_POSITIVE">False Positive</SelectItem>
            </SelectContent>
          </Select>
        );
      }
    },
    {
      accessorKey: 'recommendation',
      header: 'Recommendation',
      cell: ({ row }) => (
        <div className="max-w-md">
          <p className="text-sm text-muted-foreground truncate">
            {row.getValue('recommendation')}
          </p>
        </div>
      )
    }
  ];

  const table = useReactTable({
    data: findings,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === 'function' 
        ? updater(selectedFindings) 
        : updater;
      onSelectionChange(Object.keys(newSelection));
    },
    state: {
      rowSelection: selectedFindings.reduce((acc, id) => ({ ...acc, [id]: true }), {})
    }
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
```

### 2. Real-time Progress Updates
```typescript
const useRealtimeProgress = (scanId: string) => {
  const [progress, setProgress] = useState(null);
  
  useEffect(() => {
    const subscription = supabase
      .channel(`scan-${scanId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'scan_status',
          filter: `scan_id=eq.${scanId}`
        },
        (payload) => {
          setProgress(payload.new);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [scanId]);

  return progress;
};
```

## API Routes

### 1. Start Scan (`/api/scans` - POST)
```typescript
// pages/api/scans.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { companyName, domain, tags } = req.body;

  // Validate input
  if (!companyName || !domain) {
    return res.status(400).json({ error: 'Company name and domain are required' });
  }

  try {
    // Call DealBrief scanner API
    const scanResponse = await fetch(`${process.env.SCANNER_API_URL}/api/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SCANNER_API_KEY}`
      },
      body: JSON.stringify({
        companyName,
        domain,
        tags
      })
    });

    const { scanId } = await scanResponse.json();

    // Insert into Supabase
    const { data, error } = await supabase
      .from('scan_status')
      .insert({
        scan_id: scanId,
        company_name: companyName,
        domain,
        status: 'pending',
        progress: 0,
        total_modules: 16,
        tags
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ scanId });
  } catch (error) {
    console.error('Failed to start scan:', error);
    res.status(500).json({ error: 'Failed to start scan' });
  }
}
```

### 2. Verify Findings (`/api/findings/verify` - PATCH)
```typescript
// pages/api/findings/verify.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { findingIds, state } = req.body;

  if (!findingIds || !Array.isArray(findingIds) || !state) {
    return res.status(400).json({ error: 'Finding IDs and state are required' });
  }

  try {
    const { data, error } = await supabase
      .from('findings')
      .update({ state })
      .in('id', findingIds)
      .select();

    if (error) throw error;

    res.status(200).json({ updated: data.length });
  } catch (error) {
    console.error('Failed to verify findings:', error);
    res.status(500).json({ error: 'Failed to verify findings' });
  }
}
```

### 3. Generate Report (`/api/reports/generate` - POST)
```typescript
// pages/api/reports/generate.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scanId, findings, companyName, domain } = req.body;

  try {
    // Prepare findings data for AI
    const findingsSummary = findings.map(f => ({
      type: f.type,
      severity: f.severity,
      description: f.description,
      recommendation: f.recommendation,
      attack_type: f.attack_type_code,
      estimated_loss: {
        low: f.eal_low,
        medium: f.eal_ml,
        high: f.eal_high
      }
    }));

    // Call OpenAI o3-2025-04-16
    const completion = await openai.chat.completions.create({
      model: 'o3-2025-04-16',
      messages: [
        {
          role: 'system',
          content: `You are a cybersecurity expert generating executive security reports. 
                   Create a comprehensive, professional security assessment report based on the verified findings.
                   Include executive summary, risk analysis, prioritized recommendations, and financial impact estimates.`
        },
        {
          role: 'user',
          content: `Generate a security assessment report for ${companyName} (${domain}).
                   
                   Verified Security Findings:
                   ${JSON.stringify(findingsSummary, null, 2)}
                   
                   Please structure the report with:
                   1. Executive Summary
                   2. Risk Assessment Matrix
                   3. Critical Findings Analysis
                   4. Financial Impact Estimates
                   5. Prioritized Remediation Roadmap
                   6. Compliance & Regulatory Considerations
                   7. Appendix: Technical Details`
        }
      ],
      temperature: 0.3,
      max_tokens: 4000
    });

    const reportContent = completion.choices[0].message.content;

    // Save report to database
    const { data, error } = await supabase
      .from('reports')
      .insert({
        scan_id: scanId,
        company_name: companyName,
        domain,
        content: reportContent,
        findings_count: findings.length,
        status: 'completed'
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ 
      reportId: data.id,
      content: reportContent 
    });

  } catch (error) {
    console.error('Failed to generate report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
}
```

## State Management

### Zustand Store
```typescript
// stores/scanStore.ts
import { create } from 'zustand';

interface ScanState {
  currentScan: Scan | null;
  findings: Finding[];
  selectedFindings: string[];
  filters: FindingsFilters;
  
  // Actions
  setCurrentScan: (scan: Scan) => void;
  setFindings: (findings: Finding[]) => void;
  updateFindingState: (findingId: string, state: string) => void;
  setSelectedFindings: (ids: string[]) => void;
  setFilters: (filters: FindingsFilters) => void;
  clearSelection: () => void;
}

export const useScanStore = create<ScanState>((set, get) => ({
  currentScan: null,
  findings: [],
  selectedFindings: [],
  filters: {
    severity: [],
    type: [],
    state: [],
    search: ''
  },

  setCurrentScan: (scan) => set({ currentScan: scan }),
  
  setFindings: (findings) => set({ findings }),
  
  updateFindingState: (findingId, state) => set((prev) => ({
    findings: prev.findings.map(f => 
      f.id === findingId ? { ...f, state } : f
    )
  })),
  
  setSelectedFindings: (ids) => set({ selectedFindings: ids }),
  
  setFilters: (filters) => set({ filters }),
  
  clearSelection: () => set({ selectedFindings: [] })
}));
```

## Deployment Configuration

### Next.js Configuration
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SCANNER_API_URL: process.env.SCANNER_API_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/scanner/:path*',
        destination: `${process.env.SCANNER_API_URL}/api/:path*`
      }
    ];
  }
};

module.exports = nextConfig;
```

### Environment Variables
```bash
# .env.local
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

SCANNER_API_URL=https://dealbrief-scanner.fly.dev
SCANNER_API_KEY=your-scanner-api-key

OPENAI_API_KEY=your-openai-api-key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

## Implementation Priority

### Phase 1: Core Functionality (Week 1-2)
1. **Scan Initiation** - Basic form and API integration
2. **Progress Tracking** - Real-time updates with Supabase
3. **Findings Display** - Basic table with verification controls

### Phase 2: Enhanced UX (Week 3)
1. **Advanced Filtering** - Multi-criteria filtering and search
2. **Bulk Operations** - Mass verification capabilities
3. **Responsive Design** - Mobile optimization

### Phase 3: AI & Reporting (Week 4)
1. **OpenAI Integration** - Report generation with o3-2025-04-16
2. **Export Features** - PDF/Word export capabilities
3. **Dashboard Analytics** - Trend analysis and metrics

This frontend design provides a comprehensive, user-friendly interface for managing security scans while maintaining the professional standards required for enterprise security assessments.