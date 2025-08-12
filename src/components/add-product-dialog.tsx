
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/lib/types";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductSubmit: (product: Omit<Product, 'id' | 'availability' | 'imageUrl'>, id?: string) => void;
  productToEdit?: Product;
}

export function AddProductDialog({ open, onOpenChange, onProductSubmit, productToEdit }: AddProductDialogProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [dailyRate, setDailyRate] = useState(0);
  const [stock, setStock] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategory(productToEdit.category);
      setDailyRate(productToEdit.dailyRate);
      setStock(productToEdit.stock);
    } else {
        // Reset form for adding new product
        setName('');
        setCategory('');
        setDailyRate(0);
        setStock(1);
    }
  }, [productToEdit, open]); // Depend on `open` to reset form when dialog is re-opened for adding

  const handleSubmit = () => {
    if (!name || !category || dailyRate <= 0 || stock < 0) {
      setError('Please fill out all fields with valid values.');
      return;
    }
    setError('');
    onProductSubmit({ name, category, dailyRate, stock }, productToEdit?.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{productToEdit ? 'Edit Product' : 'Add a New Product'}</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input id="product-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Electric Scooter" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="product-category">Category</Label>
            <Input id="product-category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Electronics" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="daily-rate">Daily Rate ($)</Label>
              <Input id="daily-rate" type="number" value={dailyRate} onChange={(e) => setDailyRate(parseFloat(e.target.value) || 0)} min="0" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value) || 0)} min="0" />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>{productToEdit ? 'Save Changes' : 'Add Product'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
