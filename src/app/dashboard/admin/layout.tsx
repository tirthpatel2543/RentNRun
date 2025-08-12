
import Link from "next/link";
import { DashboardNav } from "@/components/dashboard-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Zap } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <Sidebar>
            <div className="hidden md:flex flex-col w-64 border-r bg-background">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Zap className="h-6 w-6 text-primary" />
                        <span className="">Rent N Run</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <DashboardNav />
                </div>
                <div className="mt-auto p-4 border-t">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex gap-2 items-center">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="user avatar" />
                                            <AvatarFallback>AD</AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <p className="text-sm font-medium">Admin User</p>
                                            <p className="text-xs text-muted-foreground">admin@rentnrun.com</p>
                                        </div>
                                    </div>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <Link href="/">
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </Sidebar>
        <main className="flex-1 bg-background h-full p-4 md:p-6">
            {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
