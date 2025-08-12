
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Menu, ShoppingCart, User, Zap } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
);

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        router.push('/signup'); // Redirect to signup if not logged in
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'C';
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
  }

  return (
    <div className="flex flex-col min-h-screen bg-background dark">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/dashboard/customer" className="flex items-center gap-2 font-semibold">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg">Rent N Run</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="items-center hidden gap-6 text-sm font-medium md:flex">
              <Link
                href="/dashboard/customer/products"
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Browse
              </Link>
              <Link
                href="/dashboard/customer/orders"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                My Orders
              </Link>
            </nav>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                </Button>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.photoURL ?? "https://placehold.co/40x40.png"} alt={user?.displayName ?? "Customer"} data-ai-hint="user avatar" />
                        <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                    </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.displayName ?? 'My Account'}</DropdownMenuLabel>
                    <DropdownMenuLabel className="font-normal text-xs text-muted-foreground -mt-2">{user?.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    </DropdownMenuItem>
                    <Link href="/dashboard/customer/orders">
                    <DropdownMenuItem>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                    </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
                 <Sheet>
                    <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                    <div className="grid gap-6 text-lg font-medium p-6">
                        <Link href="/dashboard/customer/products" className="hover:text-primary">
                            Browse
                        </Link>
                        <Link href="/dashboard/customer/orders" className="hover:text-primary">
                            My Orders
                        </Link>
                    </div>
                    </SheetContent>
                </Sheet>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
       <footer className="py-8 border-t bg-muted/40 border-border/40">
        <div className="container text-center">
             <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary" />
                    <span className="font-semibold">Rent N Run</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Rent N Run. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
                </div>
            </div>
             <div className="pt-8 mt-8 border-t border-border/40">
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
                    <div className="flex items-center gap-3">
                        <Image src="https://placehold.co/40x40.png" alt="Tirth Patel" width={40} height={40} className="rounded-full" data-ai-hint="developer portrait"/>
                        <h4 className="font-semibold">Tirth Patel</h4>
                        <a href="https://github.com/tirth-dev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <GitHubIcon className="w-5 h-5" />
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Image src="https://placehold.co/40x40.png" alt="Krish Patel" width={40} height={40} className="rounded-full" data-ai-hint="developer portrait"/>
                        <h4 className="font-semibold">Krish Patel</h4>
                        <a href="https://github.com/krishpatel2611" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <GitHubIcon className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
