'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Activity, 
  Plus, 
  Settings,
  Search,
  Home
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'New Scan', href: '/scans/new', icon: Plus },
  { name: 'Scans', href: '/scans', icon: Activity },
  { name: 'Findings', href: '/findings', icon: Search },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface MobileNavProps {
  onNavigate: () => void
}

export function MobileNav({ onNavigate }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 p-6 border-b">
        <Shield className="w-8 h-8 text-primary" />
        <h2 className="text-lg font-semibold tracking-tight">DealBrief</h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href))
            
            return (
              <Button
                key={item.name}
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-secondary'
                )}
                asChild
                onClick={onNavigate}
              >
                <Link href={item.href}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}