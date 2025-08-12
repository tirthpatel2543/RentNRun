
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, ShoppingCart, User, Zap } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
       <footer className="py-6 border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 text-center md:flex-row">
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
      </footer>
    </div>
  );
}
