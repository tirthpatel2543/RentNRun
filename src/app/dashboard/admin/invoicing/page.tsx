
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, BellRing } from "lucide-react";
import { invoices as initialInvoices } from "@/lib/data";
import { InvoiceDialog } from "@/components/invoice-dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Invoice } from "@/lib/types";

const statusColors: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'Paid': 'default',
  'Partial': 'secondary',
  'Due': 'outline',
  'Overdue': 'destructive'
};

export default function InvoicingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [invoiceToView, setInvoiceToView] = useState<Invoice | undefined>(undefined);
  const [ringingInvoiceId, setRingingInvoiceId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleViewInvoice = (invoice: Invoice) => {
    setInvoiceToView(invoice);
    setIsInvoiceDialogOpen(true);
  };
  
  const handleRecordPayment = (invoiceId: string) => {
    const updatedInvoices = invoices.map(inv => 
      inv.id === invoiceId ? { ...inv, status: 'Paid' } : inv
    );
    setInvoices(updatedInvoices);
    
    const index = initialInvoices.findIndex(inv => inv.id === invoiceId);
    if (index !== -1) {
      initialInvoices[index].status = 'Paid';
    }

    toast({
      title: "Payment Recorded",
      description: `Invoice ${invoiceId} has been marked as paid.`,
    });
  };

  const handleSendReminder = (invoiceId: string) => {
    setRingingInvoiceId(invoiceId);
    setTimeout(() => {
      setRingingInvoiceId(null);
    }, 700);

    toast({
      title: "Reminder Sent",
      description: `A payment reminder for invoice ${invoiceId} has been sent.`,
    });
  };

  return (
    <>
      {invoiceToView && (
        <InvoiceDialog 
          open={isInvoiceDialogOpen} 
          onOpenChange={setIsInvoiceDialogOpen}
          invoice={invoiceToView}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle>Invoicing</CardTitle>
          <CardDescription>Manage customer invoices and track payments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
                  <TableCell className="font-mono text-xs">{invoice.orderId}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{invoice.dueDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={statusColors[invoice.status]}>{invoice.status}</Badge>
                      {ringingInvoiceId === invoice.id && (
                        <div className="relative">
                          <BellRing className={cn("h-4 w-4 text-destructive animate-shake")} />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
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
                        <DropdownMenuItem onSelect={() => handleViewInvoice(invoice)}>View Invoice</DropdownMenuItem>
                        {invoice.status !== 'Paid' && (
                          <DropdownMenuItem onSelect={() => handleRecordPayment(invoice.id)}>Record Payment</DropdownMenuItem>
                        )}
                        {invoice.status !== 'Paid' && (
                          <DropdownMenuItem onSelect={() => handleSendReminder(invoice.id)}>Send Reminder</DropdownMenuItem>
                        )}
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
