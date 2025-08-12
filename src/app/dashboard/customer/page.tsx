
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/data";
import { ChevronRight, Search } from "lucide-react";
import { RentDialog } from "@/components/rent-dialog";
import type { Product } from "@/lib/types";

const categories = [
    { name: "Electronics", image: "https://res.cloudinary.com/dmcuryefk/image/upload/v1754945984/360_F_364410756_Ev3WoDfNyxO9c9n4tYIsU5YBQWAP3UF8_iljrgi.jpg", hint: "cameras laptops" },
    { name: "Bikes", image: "https://res.cloudinary.com/dmcuryefk/image/upload/v1754946016/20190808135751-motorcycle-1453863_am4gjr.jpg", hint: "mountain bike" },
    { name: "Outdoor Gear", image: "https://res.cloudinary.com/dmcuryefk/image/upload/v1754946099/Summer-Outdoors1348-web-smaller_k1oktd_eaqdsg.webp", hint: "camping gear" },
    { name: "Sound Equipment", image: "https://res.cloudinary.com/dmcuryefk/image/upload/v1754946073/photo-1520444451380-ebe0f7b9cfd5_h2mc6c.jpg", hint: "dj equipment" },
];

export default function CustomerDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);
  const [productToRent, setProductToRent] = useState<Product | undefined>(undefined);

  const handleRentClick = (product: Product) => {
    setProductToRent(product);
    setIsRentDialogOpen(true);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background">
      {productToRent && (
        <RentDialog
          open={isRentDialogOpen}
          onOpenChange={setIsRentDialogOpen}
          product={productToRent}
        />
      )}
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] bg-gradient-to-r from-primary/20 to-accent/20">
        <Image 
            src="https://res.cloudinary.com/dmcuryefk/image/upload/v1754946999/ezgif-5ed44798522d3d_sqvvdc.png"
            alt="Rental hero banner"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="people enjoying outdoors"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black/40 backdrop-blur-sm">
            <h1 className="text-4xl font-bold md:text-6xl">Rent Anything, Anytime</h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg">
                The best gear for your needs, available for rent at your fingertips.
            </p>
             <div className="relative w-full max-w-lg mt-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search for products..." 
                    className="pl-12 pr-4 py-6 text-lg rounded-full text-foreground" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
          <div className="container px-4 mx-auto md:px-6">
            <h2 className="mb-8 text-3xl font-bold text-center">Browse by Category</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                    <Link href="#" key={category.name}>
                        <Card className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
                             <Image
                                src={category.image}
                                alt={category.name}
                                width={600}
                                height={400}
                                className="object-cover w-full h-48"
                                data-ai-hint={category.hint}
                            />
                            <CardContent className="p-4">
                                <h3 className="text-lg font-semibold">{category.name}</h3>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
          </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/40">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/dashboard/customer/products">
                <Button variant="link" className="text-primary">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.slice(0, 4).map((product) => (
              <Card key={product.id} className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-0">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="object-cover w-full h-56"
                    data-ai-hint={`${product.category} product`}
                  />
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
                    <div className="flex items-baseline justify-between mt-4">
                      <p className="text-xl font-bold text-primary">
                        ${product.dailyRate.toFixed(2)}
                        <span className="text-sm font-normal text-muted-foreground">/day</span>
                      </p>
                      <Button onClick={() => handleRentClick(product)}>Rent Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
