
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from '@/lib/utils';
import { QuotationDialog } from '@/components/quotation-dialog';

interface Order {
    id: string;
    customer: string;
    amount: number;
    status: 'Quotation' | 'Pickedup' | 'Reserved' | 'Returned';
    invoiceStatus: 'To invoice' | 'Fully Invoiced' | 'Nothing to invoice';
    pickupDate: string;
    isLate?: boolean;
}

const orders: Order[] = [
    { id: 'RO001', customer: 'Customer1', amount: 2000, status: 'Quotation', invoiceStatus: 'To invoice', pickupDate: '08/03/2025 00:30:36' },
    { id: 'RO002', customer: 'Customer2', amount: 1000, status: 'Pickedup', invoiceStatus: 'Fully Invoiced', pickupDate: '08/03/2025 00:30:36' },
    { id: 'RO003', customer: 'Customer3', amount: 3000, status: 'Reserved', invoiceStatus: 'To invoice', pickupDate: '08/03/2025 00:30:36', isLate: true },
    { id: 'RO004', customer: 'Customer3', amount: 1400, status: 'Returned', invoiceStatus: 'Fully Invoiced', pickupDate: '08/03/2025 00:30:36', isLate: true },
    { id: 'RO005', customer: 'Customer4', amount: 2000, status: 'Quotation', invoiceStatus: 'To invoice', pickupDate: '08/03/2025 00:30:36' },
    { id: 'RO006', customer: 'Customer5', amount: 1000, status: 'Pickedup', invoiceStatus: 'Fully Invoiced', pickupDate: '08/03/2025 00:30:36' },
    { id: 'RO007', customer: 'Customer6', amount: 3000, status: 'Reserved', invoiceStatus: 'To invoice', pickupDate: '08/03/2025 00:30:36' },
    { id: 'RO008', customer: 'Customer7', amount: 1400, status: 'Returned', invoiceStatus: 'Nothing to invoice', pickupDate: '08/03/2025 00:30:36' },
    { id: 'RO009', customer: 'Customer1', amount: 2000, status: 'Quotation', invoiceStatus: 'To invoice', pickupDate: '08/03/2025 00:30:36' },
    { id: 'RO010', customer: 'Customer2', amount: 1000, status: 'Pickedup', invoiceStatus: 'Fully Invoiced', pickupDate: '08/03/2025 00:30:36' },
    { id: 'RO011', customer: 'Customer3', amount: 3000, status: 'Reserved', invoiceStatus: 'To invoice', pickupDate: '08/03/2025 00:30:36' },
    { id: 'RO012', customer: 'Customer1', amount: 1400, status: 'Returned', invoiceStatus: 'Fully Invoiced', pickupDate: '08/03/2025 00:30:36' },
];

const statusColors: { [key in Order['status']]: string } = {
    Quotation: 'border-blue-500 text-blue-500',
    Pickedup: 'border-yellow-500 text-yellow-500',
    Reserved: 'border-green-500 text-green-500',
    Returned: 'border-gray-500 text-gray-500',
};

const lateStatusColors = 'border-red-500 text-red-500';

const rentalStatuses = [
    { label: 'ALL', count: 12 },
    { label: 'Quotation', count: 3 },
    { label: 'Reserved', count: 3 },
    { label: 'Pickedup', count: 3 },
    { label: 'Returned', count: 3 },
];

const invoiceStatuses = [
    { label: 'Fully Invoiced', count: 5 },
    { label: 'Nothing to invoice', count: 1 },
    { label: 'To invoice', count: 6 },
];


export default function RentalOrdersPage() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [isQuotationDialogOpen, setIsQuotationDialogOpen] = useState(false);

    const rentalStatusLabels = rentalStatuses.map(s => s.label);
    const invoiceStatusLabels = invoiceStatuses.map(s => s.label);

    const filteredOrders = orders.filter(order => {
        const matchesFilter = activeFilter === 'ALL' || 
                              (rentalStatusLabels.includes(activeFilter) && order.status === activeFilter) ||
                              (invoiceStatusLabels.includes(activeFilter) && order.invoiceStatus === activeFilter);
        
        const matchesSearch = searchQuery === '' || 
                              order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              order.id.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <>
        <QuotationDialog open={isQuotationDialogOpen} onOpenChange={setIsQuotationDialogOpen} />
        <div className="flex h-full bg-background">
            {/* Collapsible Sidebar */}
            <div className={cn(
                "transition-all duration-300 ease-in-out bg-card text-card-foreground border-r",
                isSidebarCollapsed ? "w-0 p-0 overflow-hidden" : "w-64 p-4"
            )}>
                <div className="flex flex-col h-full">
                    <h3 className="font-semibold text-lg mb-4">RENTAL STATUS</h3>
                    <ul className="space-y-2">
                        {rentalStatuses.map(status => (
                             <li key={status.label}>
                                <button
                                    className={cn(
                                        "w-full text-left p-2 rounded-md flex justify-between items-center text-sm",
                                        activeFilter === status.label ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted"
                                    )}
                                    onClick={() => setActiveFilter(status.label)}
                                >
                                    <span>{status.label}</span>
                                    <span className="text-xs font-mono bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{status.count}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                     <h3 className="font-semibold text-lg mt-8 mb-4">INVOICE STATUS</h3>
                     <ul className="space-y-2">
                        {invoiceStatuses.map(status => (
                            <li key={status.label}>
                                <button
                                     className={cn(
                                        "w-full text-left p-2 rounded-md flex justify-between items-center text-sm",
                                        activeFilter === status.label ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted"
                                    )}
                                    onClick={() => setActiveFilter(status.label)}
                                >
                                    <span>{status.label}</span>
                                     <span className="text-xs font-mono bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{status.count}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="p-4 border-b">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}>
                                {isSidebarCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
                            </Button>
                            <h2 className="text-lg font-semibold hidden sm:block">Rental Orders</h2>
                        </div>
                        <div className="flex-1 min-w-[200px] max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Search by customer or order ID..." 
                                    className="pl-10" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-6 overflow-auto">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredOrders.map(order => (
                            <Card key={order.id} className="hover:shadow-lg transition-shadow flex flex-col">
                                <CardContent className="p-4 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-semibold truncate pr-2">{order.customer}</div>
                                        <div className="font-semibold whitespace-nowrap">₹ {order.amount}</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground space-y-1 mb-4">
                                        <p className="font-mono text-xs">{order.id}</p>
                                        <p className="text-xs">Pickup: {order.pickupDate}</p>
                                    </div>
                                    <div className="mt-auto pt-4 space-y-2">
                                        <div className="flex justify-between items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "text-xs font-bold w-full justify-center",
                                                    order.isLate ? lateStatusColors : statusColors[order.status]
                                                )}
                                            >
                                                {order.status}
                                            </Badge>
                                             <Badge
                                                variant="outline"
                                                className="text-xs w-full justify-center"
                                            >
                                                {order.invoiceStatus}
                                            </Badge>
                                        </div>
                                        {order.isLate && <Badge variant="destructive" className="w-full justify-center">Late Pickup</Badge>}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
        </>
    );
}
