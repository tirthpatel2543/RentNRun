
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { products as initialProducts } from "@/lib/data";
import { useState } from "react";
import { AddProductDialog } from "@/components/add-product-dialog";
import { ProductCalendarDialog } from "@/components/product-calendar-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { Product } from "@/lib/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const [isCalendarDialogOpen, setIsCalendarDialogOpen] = useState(false);
  const [productForCalendar, setProductForCalendar] = useState<Product | undefined>(undefined);
  const [productToDelete, setProductToDelete] = useState<Product | undefined>(undefined);

  const handleOpenAddDialog = () => {
    setProductToEdit(undefined);
    setIsAddProductDialogOpen(true);
  };
  
  const handleOpenEditDialog = (product: Product) => {
    setProductToEdit(product);
    setIsAddProductDialogOpen(true);
  };
  
  const handleOpenCalendarDialog = (product: Product) => {
    setProductForCalendar(product);
    setIsCalendarDialogOpen(true);
  };
  
  const handleOpenDeleteDialog = (product: Product) => {
    setProductToDelete(product);
  };

  const handleProductSubmit = (productData: Omit<Product, 'id' | 'availability' | 'imageUrl'>, id?: string) => {
    if (id) {
      // Editing existing product
      const updatedProducts = products.map(p => 
        p.id === id ? { ...p, ...productData, availability: productData.stock > 0 ? 'Available' : 'Rented' } : p
      );
      setProducts(updatedProducts);
      // Also update shared data
      const index = initialProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        initialProducts[index] = { ...initialProducts[index], ...productData, availability: productData.stock > 0 ? 'Available' : 'Rented' };
      }
    } else {
      // Adding new product
      const newProduct: Product = {
        ...productData,
        id: `prod-${Math.random().toString(36).substr(2, 9)}`,
        availability: productData.stock > 0 ? 'Available' : 'Rented',
        imageUrl: '/images/placeholder.png',
      };
      setProducts(prevProducts => [...prevProducts, newProduct]);
      initialProducts.push(newProduct);
    }
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      const updatedProducts = products.filter(p => p.id !== productToDelete.id);
      setProducts(updatedProducts);

      const index = initialProducts.findIndex(p => p.id === productToDelete.id);
      if (index > -1) {
          initialProducts.splice(index, 1);
      }
      setProductToDelete(undefined);
    }
  };


  return (
    <>
      <AddProductDialog 
        key={productToEdit?.id ?? 'add'}
        open={isAddProductDialogOpen} 
        onOpenChange={setIsAddProductDialogOpen}
        onProductSubmit={handleProductSubmit}
        productToEdit={productToEdit}
      />
      {productForCalendar && (
        <ProductCalendarDialog
          open={isCalendarDialogOpen}
          onOpenChange={setIsCalendarDialogOpen}
          product={productForCalendar}
        />
      )}
      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(undefined)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              "{productToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setProductToDelete(undefined)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Rental Products</CardTitle>
          <Button size="sm" className="gap-1" onClick={handleOpenAddDialog}>
            <PlusCircle className="h-4 w-4" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Daily Rate</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      data-ai-hint={`${product.category} product`}
                      height="64"
                      src={product.imageUrl}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={product.availability === 'Available' ? 'secondary' : 'outline'}>{product.availability}</Badge>
                  </TableCell>
                  <TableCell className="text-right">${product.dailyRate.toFixed(2)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => handleOpenEditDialog(product)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleOpenCalendarDialog(product)}>View Calendar</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleOpenDeleteDialog(product)} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
