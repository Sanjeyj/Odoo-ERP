"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import CustomerSidebar from "@/components/dashboard/CustomerSidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  const isAuthPage = pathname === "/" || pathname === "/register";

  useEffect(() => {
    // Check auth state
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role') || 'admin';
    setUserRole(role);
    
    if (!token && !isAuthPage) {
      // Unauthenticated users trying to access protected routes go to login
      router.push('/');
    } else if (token) {
      if (role === 'customer') {
        if (pathname !== '/customer-dashboard') {
          router.push('/customer-dashboard');
        } else {
          setIsAuthenticated(true);
          setIsChecking(false);
        }
      } else {
        // Admin
        if (isAuthPage || pathname === '/customer-dashboard') {
          router.push('/dashboard');
        } else {
          setIsAuthenticated(true);
          setIsChecking(false);
        }
      }
    } else {
      setIsAuthenticated(true);
      setIsChecking(false);
    }
  }, [pathname, isAuthPage, router]);

  if (isChecking && !isAuthPage) {
    return <div className="h-screen w-full flex items-center justify-center bg-slate-950 text-slate-400">Loading...</div>;
  }

  if (isAuthPage) {
    return <main className="flex-1 overflow-y-auto">{children}</main>;
  }

  return (
    <>
      {userRole === 'customer' ? <CustomerSidebar /> : <Sidebar />}
      <main className="flex-1 overflow-y-auto bg-slate-950 p-8">
        {children}
      </main>
    </>
  );
}
