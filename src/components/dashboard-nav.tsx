
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClipboardList, FileText, LayoutDashboard, Package, Settings, Truck } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/admin/products", icon: Package, label: "Products" },
  { href: "/dashboard/admin/orders", icon: ClipboardList, label: "Orders" },
  { href: "/dashboard/admin/deliveries", icon: Truck, label: "Deliveries" },
  { href: "/dashboard/admin/invoicing", icon: FileText, label: "Invoicing" },
  { href: "/dashboard/admin/settings", icon: Settings, label: "Settings" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              className={cn(pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/20")}
              isActive={pathname === item.href}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
