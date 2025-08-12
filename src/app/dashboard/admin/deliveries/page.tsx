
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { deliveries } from "@/lib/data";
import { Truck } from "lucide-react";
import type { Delivery } from "@/lib/types";

const statusColors: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'Completed': 'default',
  'Scheduled': 'secondary',
  'Delayed': 'destructive'
};

const typeColors: { [key: string]: 'default' | 'outline' } = {
    'Pickup': 'default',
    'Return': 'outline'
}

const DeliveryTable = ({ deliveries }: { deliveries: Delivery[] }) => (
    <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Delivery ID</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
                <TableCell className="font-mono text-xs">{delivery.id}</TableCell>
                <TableCell className="font-mono text-xs">{delivery.orderId}</TableCell>
                <TableCell>{delivery.customerName}</TableCell>
                <TableCell>
                    <Badge variant={typeColors[delivery.type]}>{delivery.type}</Badge>
                </TableCell>
                <TableCell>{delivery.scheduledDate.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={statusColors[delivery.status] || 'default'}>
                    {delivery.status}
                  </Badge>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>
);


export default function DeliveriesPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Truck className="h-6 w-6"/>
                <span>Delivery Schedule</span>
            </CardTitle>
            <CardDescription>View and manage all upcoming and past deliveries.</CardDescription>
        </CardHeader>
        <CardContent>
            <DeliveryTable deliveries={deliveries} />
        </CardContent>
    </Card>
  );
}
