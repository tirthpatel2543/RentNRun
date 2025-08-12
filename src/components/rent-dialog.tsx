
"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, addMonths } from "date-fns";
import type { Product, Order } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { orders } from "@/lib/data";

interface RentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export function RentDialog({ open, onOpenChange, product }: RentDialogProps) {
  const [duration, setDuration] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const dailyRate = product.dailyRate;
  const total = dailyRate * duration * 30 * quantity; // Approximate monthly cost

  const handleConfirmRental = () => {
    if (!deliveryDate) {
      toast({
        title: "Error",
        description: "Please select a delivery date.",
        variant: "destructive",
      });
      return;
    }

    const newOrder: Order = {
      id: `ord-${Math.random().toString(36).substr(2, 9)}`,
      customer: { name: 'New Customer', email: 'customer@example.com' }, // Placeholder customer
      productName: product.name,
      startDate: deliveryDate,
      endDate: addMonths(deliveryDate, duration),
      total: total,
      status: 'Confirmed',
    };

    // Add the new order to our mock data source
    orders.unshift(newOrder);
    
    toast({
        title: "Rental Confirmed!",
        description: `Your rental for ${product.name} has been booked. You can now see it in the admin "Orders" page.`,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Rent: {product.name}</DialogTitle>
          <DialogDescription>
            Configure your rental options below. Total will be calculated based on daily rate.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="p-4 rounded-md bg-muted">
            <Label>Daily Rate</Label>
            <p className="text-2xl font-bold text-primary">${product.dailyRate.toFixed(2)}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="months">Choose Months</Label>
                <Select value={String(duration)} onValueChange={(val) => setDuration(parseInt(val))}>
                <SelectTrigger id="months">
                    <SelectValue placeholder="Select months" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">1 Month</SelectItem>
                    <SelectItem value="3">3 Months</SelectItem>
                    <SelectItem value="6">6 Months</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input 
                    id="quantity" 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Select Delivery Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !deliveryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deliveryDate ? format(deliveryDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deliveryDate}
                  onSelect={setDeliveryDate}
                  disabled={{ before: new Date() }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
           <div className="p-4 rounded-md bg-muted/50 border">
            <Label>Estimated Total for {duration} Month(s)</Label>
            <p className="text-2xl font-bold text-primary">${total.toFixed(2)}</p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleConfirmRental}>Confirm Rental</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
