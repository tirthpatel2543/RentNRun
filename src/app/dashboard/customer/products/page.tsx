
"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/data";
import { Search } from "lucide-react";
import { RentDialog } from "@/components/rent-dialog";
import type { Product } from "@/lib/types";

export default function CustomerProductsPage() {
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
    <div className="container py-12">
        {productToRent && (
          <RentDialog
            open={isRentDialogOpen}
            onOpenChange={setIsRentDialogOpen}
            product={productToRent}
          />
        )}
        <h1 className="mb-4 text-4xl font-bold text-center">Our Products</h1>
        <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search for products..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
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
  );
}
