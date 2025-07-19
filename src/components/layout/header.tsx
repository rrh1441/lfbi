'use client'

import { useState } from 'react'
import { Bell, User, Menu, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MobileNav } from './mobile-nav'

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Mobile menu trigger */}
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <MobileNav onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Mobile logo - only show on small screens */}
        <div className="flex items-center gap-2 lg:hidden">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">DealBrief</h2>
        </div>

        <div className="ml-auto flex items-center space-x-2 lg:space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}