// app/dashboard/layout.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Layout, Users, Settings, Zap, Shield, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

import ProtectedRoute from '@/utils/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import MasterProtectedRoute from '@/utils/masterProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: Layout },
    { path: '/admin-dashboard/brokers', label: 'Broker Manager', icon: Users },
    { path: '/admin-dashboard/properties', label: 'Property Manager', icon: Users },
    { path: '/admin-dashboard/requirements', label: 'Requirements', icon: Users },
    { path: '/admin-dashboard/broker-request', label: 'Broker Requests', icon: Users },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <MasterProtectedRoute>
      <div className="flex h-screen bg-[var(--color-secondary-50)] overflow-hidden">
        
        {/* Desktop Sidebar - Sticky */}
        <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-neutral-200 flex-shrink-0">
          {/* Logo Section */}
          <div className="p-4 border-b border-neutral-200 flex-shrink-0">
           <Link href="/">  <div className="flex items-center gap-3">
              <img 
                src="/assets/estateai.png" 
                alt="EstateAI" 
                className=" object-cover"
              />
            </div></Link>
          </div>

          {/* Navigation - Scrollable if needed */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    active 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-neutral-200 flex-shrink-0">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-base font-medium"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar Drawer */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-neutral-200 transform transition-transform duration-300 ease-in-out lg:hidden ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile Header */}
          <div className="p-2 border-b border-neutral-200 flex items-center justify-between">
           <Link href="/"> <div className="flex items-center gap-3">
              <img 
                src="/assets/estateai.png" 
                alt="EstateAI" 
                className=" "
              />
            </div></Link>
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4 space-y-2 overflow-y-auto flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    router.push(item.path);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    active 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Logout */}
          <div className="p-4 border-t border-neutral-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-base font-medium"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 h-screen overflow-y-auto relative">
          {/* Mobile Header Bar */}
          <div className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/estateai.png" 
                alt="EstateAI" 
                className="h-7 w-auto object-contain"
              />
            </div>
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Page Content */}
          <div className=" min-h-full">
            {children}
          </div>
        </main>
      </div>
    </MasterProtectedRoute>
  );
}