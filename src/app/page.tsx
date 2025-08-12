
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Search, Handshake, Smile, Menu } from 'lucide-react';
import { products } from '@/lib/data';
import { useState, useEffect } from 'react';
import { AnimatedBorderButton } from '@/components/ui/animated-border-button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
);


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground dark">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-primary">Rent N Run</span>
          </Link>
          <nav className="items-center hidden gap-8 text-sm font-medium md:flex">
            <Link
              href="#products"
              className="nav-link-scribble"
            >
              Products
            </Link>
            <Link
              href="#how-it-works"
              className="nav-link-scribble"
            >
              How It Works
            </Link>
             <Link
              href="#pricing"
              className="nav-link-scribble"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden md:block">
              <Button>Login</Button>
            </Link>
             <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="grid gap-6 text-lg font-medium p-6">
                    <Link href="#products" className="hover:text-primary">
                      Products
                    </Link>
                    <Link href="#how-it-works" className="hover:text-primary">
                      How It Works
                    </Link>
                    <Link href="#pricing" className="hover:text-primary">
                      Pricing
                    </Link>
                    <Link href="/login" className="hover:text-primary">
                      Login
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
          </div>
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
                <AnimatedBorderButton href="/login">
                  Get Started
                </AnimatedBorderButton>
            </div>
          </div>
        </section>

        <section id="products" className="py-20">
          <div className="container">
            <h2 className="mb-12 text-3xl font-bold text-center">Featured Products</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 3).map((product) => (
                <Link key={product.id} href="/login">
                  <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 bg-secondary border-border/60 hover:border-primary/50">
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

      <footer className="py-8 border-t border-border/40">
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
