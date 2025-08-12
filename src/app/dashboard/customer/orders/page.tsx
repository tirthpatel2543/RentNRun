
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { orders as initialOrders } from "@/lib/data";
import type { Order } from "@/lib/types";

const statusColors: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'Returned': 'default',
  'Delivered': 'default',
  'Confirmed': 'secondary',
  'Quotation': 'outline',
  'Late': 'destructive'
};

const OrderTable = ({ orders }: { orders: Order[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-xs">{order.id}</TableCell>
            <TableCell>{order.productName}</TableCell>
            <TableCell>
              {order.startDate.toLocaleDateString()} - {order.endDate.toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Badge variant={statusColors[order.status]}>{order.status}</Badge>
            </TableCell>
            <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
);

export default function CustomerOrdersPage() {
  // Directly use the imported orders, which will now be updated by the RentDialog
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // This effect will re-render the component if the underlying data changes.
  // This is a workaround for not having a proper state management solution.
  useEffect(() => {
    const interval = setInterval(() => {
        if (orders.length !== initialOrders.length) {
            setOrders([...initialOrders]);
        }
    }, 1000); // Check for changes every second
    return () => clearInterval(interval);
  }, [orders.length]);


  // In a real app, you would filter these by the logged-in customer's ID
  const activeOrders = orders.filter(order => ['Confirmed', 'Delivered', 'Late'].includes(order.status));
  const pastOrders = orders.filter(order => ['Returned', 'Quotation'].includes(order.status));

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>View your rental order history and status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Orders</TabsTrigger>
              <TabsTrigger value="past">Past Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
                <OrderTable orders={activeOrders} />
            </TabsContent>
            <TabsContent value="past">
                <OrderTable orders={pastOrders} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
