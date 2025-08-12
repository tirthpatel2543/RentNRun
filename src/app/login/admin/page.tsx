
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@rentnrun.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter an email and password.');
      return;
    }
    
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard/admin');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="flex items-center gap-4 mb-12">
        <Zap className="w-14 h-14 text-primary animate-pulse" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }}/>
        <h1 className="text-5xl font-bold tracking-wider">Rent N Run</h1>
      </div>
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">Admin Login</CardTitle>
          <CardDescription className="text-gray-300">
            Log in to access the management dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="admin@rentnrun.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/20 border-white/20 placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="bg-black/20 border-white/20 placeholder:text-gray-400"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            className="w-full font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg text-white" 
            onClick={handleLogin}>
              Login
          </Button>
           <p className="text-sm text-center text-gray-400">
             Not an admin?{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Login as Customer
              </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
