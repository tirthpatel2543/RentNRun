
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type { Product } from "@/lib/types";
import { Matcher } from "react-day-picker";

interface ProductCalendarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export function ProductCalendarDialog({ open, onOpenChange, product }: ProductCalendarDialogProps) {
  // Generate some random disabled dates for demonstration
  const today = new Date();
  const get_random_date = (d: Date) => {
    const new_date = new Date(d);
    new_date.setDate(new_date.getDate() + (Math.floor(Math.random() * 30)));
    return new_date;
  };
  const disabledDays: Matcher[] = [
    { before: new Date() },
    get_random_date(today),
    get_random_date(today),
    { from: get_random_date(today), to: get_random_date(get_random_date(today)) },
  ];


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Availability Calendar: {product.name}</DialogTitle>
          <DialogDescription>
            View the booking schedule for this product.
            {/* Future enhancement: Display actual bookings */}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <Calendar
            mode="multiple"
            disabled={disabledDays}
            className="rounded-md border"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
