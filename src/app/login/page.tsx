
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, User, UserCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Link href="/" className="flex items-center gap-4 mb-8">
        <Zap className="w-12 h-12 text-primary" />
        <h1 className="text-5xl font-bold font-headline text-primary">Rent N Run</h1>
      </Link>
      <div className="flex gap-8">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck />
              Admin Login
            </CardTitle>
            <CardDescription>
              Access the management dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push('/login/admin')}>
              Login as Admin
            </Button>
          </CardContent>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User />
              Customer Login
            </CardTitle>
            <CardDescription>
              Access your account and rentals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push('/signup')}>
              Login or Sign Up as Customer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
