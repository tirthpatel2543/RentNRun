
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { orders as initialOrders } from "@/lib/data";
import { QuotationDialog } from "@/components/quotation-dialog";
import type { Order } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const statusColors: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'Returned': 'default',
  'Delivered': 'default',
  'Confirmed': 'secondary',
  'Quotation': 'outline',
  'Late': 'destructive'
};

const OrderTable = ({ 
  orders, 
  onViewDetails, 
  onConfirmOrder, 
  onGenerateInvoice 
}: { 
  orders: Order[],
  onViewDetails: (order: Order) => void,
  onConfirmOrder: (orderId: string) => void,
  onGenerateInvoice: (orderId: string) => void,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Quotations & Orders</CardTitle>
      <CardDescription>Manage your rental quotations and confirmed orders.</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-xs">{order.id}</TableCell>
              <TableCell>
                <div className="font-medium">{order.customer.name}</div>
                <div className="text-sm text-muted-foreground">{order.customer.email}</div>
              </TableCell>
              <TableCell>{order.productName}</TableCell>
              <TableCell>
                {order.startDate.toLocaleDateString()} - {order.endDate.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge variant={statusColors[order.status]}>{order.status}</Badge>
              </TableCell>
              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
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
                    <DropdownMenuItem onSelect={() => onViewDetails(order)}>View Details</DropdownMenuItem>
                    {order.status === 'Quotation' && (
                      <DropdownMenuItem onSelect={() => onConfirmOrder(order.id)}>Confirm Order</DropdownMenuItem>
                    )}
                    {order.status === 'Confirmed' && (
                      <DropdownMenuItem onSelect={() => onGenerateInvoice(order.id)}>Generate Invoice</DropdownMenuItem>
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
);

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isQuotationDialogOpen, setIsQuotationDialogOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<Order | undefined>(undefined);
  const { toast } = useToast();

  const handleOpenQuotationDialog = (order?: Order) => {
    setOrderToEdit(order);
    setIsQuotationDialogOpen(true);
  }

  const handleConfirmOrder = (orderId: string) => {
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: 'Confirmed' } : o
    );
    setOrders(updatedOrders);
    
    // Also update shared data if needed
    const index = initialOrders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      initialOrders[index].status = 'Confirmed';
    }

    toast({
      title: "Order Confirmed",
      description: `Order ${orderId} has been moved to 'Confirmed'.`,
    });
  }
  
  const handleGenerateInvoice = (orderId: string) => {
     toast({
      title: "Invoice Generated",
      description: `Invoice for order ${orderId} has been created.`,
    });
  }

  const quotations = orders.filter(order => order.status === 'Quotation');
  const confirmed = orders.filter(order => order.status === 'Confirmed');
  const completed = orders.filter(order => order.status === 'Returned' || order.status === 'Delivered');

  return (
    <>
      <QuotationDialog 
        key={orderToEdit?.id ?? 'new'}
        open={isQuotationDialogOpen} 
        onOpenChange={setIsQuotationDialogOpen}
        order={orderToEdit}
      />
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="quotation">Quotations</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <Button size="sm" className="gap-1" onClick={() => handleOpenQuotationDialog()}>
            <PlusCircle className="h-4 w-4" />
            Create Quotation
          </Button>
        </div>
        <TabsContent value="all">
          <OrderTable 
            orders={orders} 
            onViewDetails={handleOpenQuotationDialog} 
            onConfirmOrder={handleConfirmOrder}
            onGenerateInvoice={handleGenerateInvoice}
          />
        </TabsContent>
        <TabsContent value="quotation">
          <OrderTable 
            orders={quotations} 
            onViewDetails={handleOpenQuotationDialog}
            onConfirmOrder={handleConfirmOrder}
            onGenerateInvoice={handleGenerateInvoice}
          />
        </TabsContent>
        <TabsContent value="confirmed">
          <OrderTable 
            orders={confirmed} 
            onViewDetails={handleOpenQuotationDialog}
            onConfirmOrder={handleConfirmOrder}
            onGenerateInvoice={handleGenerateInvoice}
          />
        </TabsContent>
        <TabsContent value="completed">
          <OrderTable 
            orders={completed} 
            onViewDetails={handleOpenQuotationDialog}
            onConfirmOrder={handleConfirmOrder}
            onGenerateInvoice={handleGenerateInvoice}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
