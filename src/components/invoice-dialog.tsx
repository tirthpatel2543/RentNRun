
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
import type { Invoice } from "@/lib/types";
import { Badge } from "./ui/badge";

interface InvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice;
}

const statusColors: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'Paid': 'default',
  'Partial': 'secondary',
  'Due': 'outline',
  'Overdue': 'destructive'
};

export function InvoiceDialog({ open, onOpenChange, invoice }: InvoiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Invoice: {invoice.id}</span>
            <Badge variant={statusColors[invoice.status]}>{invoice.status}</Badge>
          </DialogTitle>
          <DialogDescription>
            Details for invoice associated with order {invoice.orderId}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Customer</p>
                    <p className="font-medium">{invoice.customerName}</p>
                </div>
                 <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-medium">{invoice.dueDate.toLocaleDateString()}</p>
                </div>
            </div>
            <div className="border-t pt-4">
                 <h4 className="font-semibold mb-2">Invoice Summary</h4>
                 <div className="flex justify-between items-center text-lg">
                    <span>Total Amount Due:</span>
                    <span className="font-bold text-primary">${invoice.amount.toFixed(2)}</span>
                 </div>
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
           <Button type="button">Print Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
