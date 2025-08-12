
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Search, Handshake, Smile } from 'lucide-react';
import { products } from '@/lib/data';
import { useState, useEffect } from 'react';

const AnimatedText = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const words = ["Anytime.", "Anywhere."];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 80 : 150);

      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="inline-block relative">
      {text}
      <span className="absolute -right-2 top-0 animate-blink border-r-2 border-foreground h-full"></span>
    </span>
  );
};


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-primary">Rent N Run</span>
          </Link>
          <nav className="items-center hidden gap-6 text-sm font-medium md:flex">
            <Link
              href="#products"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Products
            </Link>
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              How It Works
            </Link>
             <Link
              href="#pricing"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Pricing
            </Link>
          </nav>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-xy -z-10"></div>
          <div className="container">
            <h1 className="text-4xl font-bold tracking-tighter md:text-6xl text-primary h-20 md:h-24">
              Rent Anything, <AnimatedText />
            </h1>
            <p className="max-w-xl mx-auto mt-4 text-lg text-muted-foreground">
              The seamless way to rent gear for your next adventure, project, or event. High-quality items, delivered to your doorstep.
            </p>
            <div className="mt-8">
              <Link href="/login">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="products" className="py-20">
          <div className="container">
            <h2 className="mb-12 text-3xl font-bold text-center">Featured Products</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 3).map((product) => (
                <Link key={product.id} href="/login">
                  <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-0">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={600}
                        height={400}
                        className="object-cover w-full h-56"
                        data-ai-hint={product.name === 'High-Performance E-Bike' ? 'electric bike' : product.name === 'Professional DSLR Camera' ? 'dslr camera' : 'camping tent'}
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="mt-2 text-muted-foreground">{product.category}</p>
                        <div className="flex items-baseline justify-between mt-4">
                          <p className="text-lg font-bold text-primary">
                            ${product.dailyRate.toFixed(2)}
                            <span className="text-sm font-normal text-muted-foreground">/day</span>
                          </p>
                          <Button variant="outline">Rent Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-secondary/50">
            <div className="container">
                <h2 className="mb-12 text-3xl font-bold text-center">How It Works</h2>
                <div className="grid gap-12 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary text-primary-foreground">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">1. Find Your Gear</h3>
                        <p className="text-muted-foreground">Browse our extensive catalog of high-quality rental items.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary text-primary-foreground">
                            <Handshake className="w-8 h-8" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">2. Book It</h3>
                        <p className="text-muted-foreground">Select your dates and confirm your booking in just a few clicks.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary text-primary-foreground">
                            <Smile className="w-8 h-8" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">3. Enjoy!</h3>
                        <p className="text-muted-foreground">We deliver to you. Enjoy your rental, and we'll handle the pickup.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-6 border-t">
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
