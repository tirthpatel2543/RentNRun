
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Trash2, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { products as productOptions } from "@/lib/data";
import type { Order } from "@/lib/types";

interface OrderLine {
  id: number;
  product: string;
  quantity: number;
  unitPrice: number;
  tax: number;
}

export function QuotationDialog({ 
  open, 
  onOpenChange, 
  order 
}: { 
  open: boolean, 
  onOpenChange: (open: boolean) => void,
  order?: Order 
}) {
  const [orderLines, setOrderLines] = useState<OrderLine[]>([]);
  const [untaxedTotal, setUntaxedTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<'Quotation' | 'Quotation Sent' | 'Rental Order'>('Quotation');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  useEffect(() => {
    if (order) {
      const initialLine: OrderLine = {
        id: 1,
        product: order.productName,
        quantity: 1, // Default quantity
        unitPrice: order.total, // Assume total is based on quantity 1 for simplicity
        tax: 0, // Default tax
      };
      const product = productOptions.find(p => p.name === order.productName);
      if (product) {
        initialLine.unitPrice = product.dailyRate;
      }
      setOrderLines([initialLine]);
      setStatus(order.status === 'Confirmed' ? 'Rental Order' : 'Quotation');
    } else {
      // Set a default empty line for new quotations
      setOrderLines([{ id: 1, product: "", quantity: 1, unitPrice: 0, tax: 0 }]);
      setStatus('Quotation');
    }
  }, [order, open]);

  useEffect(() => {
    let newUntaxedTotal = 0;
    let newTaxTotal = 0;
    orderLines.forEach((line) => {
      const subtotal = line.quantity * line.unitPrice;
      const taxAmount = subtotal * (line.tax / 100);
      newUntaxedTotal += subtotal;
      newTaxTotal += taxAmount;
    });
    setUntaxedTotal(newUntaxedTotal);
    setTaxTotal(newTaxTotal);
    setTotal(newUntaxedTotal + newTaxTotal);
  }, [orderLines]);

  const addOrderLine = () => {
    setOrderLines([
      ...orderLines,
      { id: Date.now(), product: "", quantity: 1, unitPrice: 0, tax: 0 },
    ]);
  };

  const removeOrderLine = (id: number) => {
    setOrderLines(orderLines.filter((line) => line.id !== id));
  };

  const handleOrderLineChange = (id: number, field: keyof OrderLine, value: any) => {
    const newOrderLines = orderLines.map((line) => {
        if (line.id === id) {
            const updatedLine = { ...line, [field]: value };

            if (field === 'product') {
                const selectedProduct = productOptions.find(p => p.name === value);
                updatedLine.unitPrice = selectedProduct ? selectedProduct.dailyRate : 0;
            }

            if (field === 'quantity' || field === 'unitPrice' || field === 'tax') {
                if (isNaN(parseFloat(value))) {
                    // @ts-ignore
                    updatedLine[field] = 0;
                } else {
                    // @ts-ignore
                    updatedLine[field] = parseFloat(value);
                }
            }
            return updatedLine;
        }
        return line;
    });
    setOrderLines(newOrderLines);
  };
  
  const getCustomerName = () => order?.customer?.name ?? '';
  const getOrderDate = () => order?.startDate ? new Date(order.startDate).toISOString().split('T')[0] : '';


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Rental Order: {order?.id ?? `R${String(Date.now()).slice(-5)}`}</DialogTitle>
           <div className="flex items-center gap-4 pt-4">
                <Button variant="outline">Invoice</Button>
                <Button variant="outline">Pickup</Button>
                <Button variant="outline">Print</Button>
                <Badge variant="destructive">2 Delivery</Badge>
                <div className="flex-grow"></div>
                 <div className="flex items-center gap-2 text-sm">
                    <Badge variant={status === 'Quotation' ? 'default' : 'outline'}>Quotation</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Button 
                        variant={status === 'Quotation Sent' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setStatus('Quotation Sent')}
                        disabled={status !== 'Quotation'}
                        className="p-2 h-auto text-xs"
                    >
                        Quotation Sent
                    </Button>
                     <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Button 
                        variant={status === 'Rental Order' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setStatus('Rental Order')}
                        disabled={status !== 'Quotation Sent'}
                        className="p-2 h-auto text-xs"
                    >
                        Rental Order
                    </Button>
                </div>
            </div>
        </DialogHeader>

        <div className="flex-grow overflow-auto pr-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="customer">Customer</Label>
                    <Input id="customer" defaultValue={getCustomerName()} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="expiration">Expiration</Label>
                    <Input id="expiration" type="date" min={minDate} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="invoice-address">Invoice Address</Label>
                    <Input id="invoice-address" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="order-date">Rental Order Date</Label>
                    <Input id="order-date" type="date" defaultValue={getOrderDate()} min={minDate} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="delivery-address">Delivery Address</Label>
                    <Input id="delivery-address" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="pricelist">Pricelist</Label>
                    <Input id="pricelist" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="rental-template">Rental Template</Label>
                    <Input id="rental-template" />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="rental-period">Rental Period</Label>
                        <Input id="rental-period" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="rental-duration">Rental Duration</Label>
                        <Input id="rental-duration" />
                    </div>
                 </div>
            </div>
          
            <div className="mt-6">
                 <h3 className="mb-2 font-semibold">Order Lines</h3>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40%]">Product</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead>Tax (%)</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderLines.map((line) => (
                        <TableRow key={line.id}>
                            <TableCell>
                                <Select
                                    value={line.product}
                                    onValueChange={(value) => handleOrderLineChange(line.id, 'product', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a product" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {productOptions.map(p => (
                                            <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={line.quantity}
                                    onChange={(e) => handleOrderLineChange(line.id, 'quantity', e.target.value)}
                                    className="w-20"
                                    min="1"
                                />
                            </TableCell>
                            <TableCell>
                                 <Input
                                    type="number"
                                    value={line.unitPrice}
                                    onChange={(e) => handleOrderLineChange(line.id, 'unitPrice', e.target.value)}
                                    className="w-24"
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={line.tax}
                                    onChange={(e) => handleOrderLineChange(line.id, 'tax', e.target.value)}
                                    className="w-20"
                                />
                            </TableCell>
                            <TableCell className="text-right">
                               ${(line.quantity * line.unitPrice).toFixed(2)}
                            </TableCell>
                             <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => removeOrderLine(line.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                 </Table>
                 <Button variant="link" size="sm" className="mt-2" onClick={addOrderLine}>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add a row
                </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                     <Label htmlFor="terms">Terms & Conditions</Label>
                     <Textarea id="terms" className="mt-2 h-24"/>
                </div>
                <div className="flex flex-col items-end gap-2 text-sm">
                    <div className="flex justify-between w-full max-w-xs">
                        <span className="text-muted-foreground">Untaxed Total:</span>
                        <span className="font-medium">${untaxedTotal.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between w-full max-w-xs">
                        <span className="text-muted-foreground">Tax:</span>
                        <span className="font-medium">${taxTotal.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between w-full max-w-xs text-base font-bold border-t pt-2 mt-2">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">{order ? 'Save Changes' : 'Save Quotation'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
