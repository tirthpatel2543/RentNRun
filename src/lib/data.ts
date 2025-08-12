import type { Product, Order, Delivery, Invoice, Customer } from './types';

export const products: Product[] = [
  { id: 'prod-001', name: 'High-Performance E-Bike', category: 'Bikes', dailyRate: 75, availability: 'Available', stock: 5, imageUrl: 'https://res.cloudinary.com/dmcuryefk/image/upload/v1754942506/kbo-bike-kXP41LVdcv0-unsplash_n8t7li.jpg' },
  { id: 'prod-002', name: 'Professional DSLR Camera', category: 'Electronics', dailyRate: 120, availability: 'Rented', stock: 2, imageUrl: 'https://res.cloudinary.com/dmcuryefk/image/upload/v1754942507/allyson-beaucourt-W6OCE1sGOYw-unsplash_ddc1si.jpg' },
  { id: 'prod-003', name: 'Camping Tent (4-person)', category: 'Outdoor Gear', dailyRate: 40, availability: 'Available', stock: 10, imageUrl: 'https://res.cloudinary.com/dmcuryefk/image/upload/v1754942507/patrick-hendry-VkaihQSqVbI-unsplash_yeztzg.jpg' },
  { id: 'prod-004', name: 'Portable Projector', category: 'Electronics', dailyRate: 60, availability: 'Available', stock: 8, imageUrl: 'https://res.cloudinary.com/dmcuryefk/image/upload/v1754942506/alex-litvin-MAYsdoYpGuk-unsplash_ght5sw.jpg' },
  { id: 'prod-005', name: 'Complete DJ Set', category: 'Sound Equipment', dailyRate: 250, availability: 'Rented', stock: 1, imageUrl: 'https://res.cloudinary.com/dmcuryefk/image/upload/v1754945348/XDJ-RX3_prm_top_211221_scvcg5.png' },
];

export const orders: Order[] = [
  { id: 'ord-101', customer: { name: 'Alice Johnson', email: 'alice@example.com' }, productName: 'Professional DSLR Camera', startDate: new Date('2024-07-20'), endDate: new Date('2024-07-25'), total: 600, status: 'Returned' },
  { id: 'ord-102', customer: { name: 'Bob Williams', email: 'bob@example.com' }, productName: 'High-Performance E-Bike', startDate: new Date('2024-07-22'), endDate: new Date('2024-07-24'), total: 150, status: 'Delivered' },
  { id: 'ord-103', customer: { name: 'Charlie Brown', email: 'charlie@example.com' }, productName: 'Complete DJ Set', startDate: new Date('2024-08-01'), endDate: new Date('2024-08-03'), total: 500, status: 'Confirmed' },
  { id: 'ord-104', customer: { name: 'Diana Prince', email: 'diana@example.com' }, productName: 'Camping Tent (4-person)', startDate: new Date('2024-08-05'), endDate: new Date('2024-08-10'), total: 200, status: 'Quotation' },
  { id: 'ord-105', customer: { name: 'Ethan Hunt', email: 'ethan@example.com' }, productName: 'Portable Projector', startDate: new Date('2024-07-28'), endDate: new Date('2024-07-29'), total: 60, status: 'Confirmed' },
];

export const deliveries: Delivery[] = [
  { id: 'del-201', orderId: 'ord-102', customerName: 'Bob Williams', type: 'Pickup', scheduledDate: new Date('2024-07-22'), status: 'Completed' },
  { id: 'del-202', orderId: 'ord-102', customerName: 'Bob Williams', type: 'Return', scheduledDate: new Date('2024-07-24'), status: 'Scheduled' },
  { id: 'del-203', orderId: 'ord-103', customerName: 'Charlie Brown', type: 'Pickup', scheduledDate: new Date('2024-08-01'), status: 'Scheduled' },
  { id: 'del-204', orderId: 'ord-105', customerName: 'Ethan Hunt', type: 'Pickup', scheduledDate: new Date('2024-07-28'), status: 'Scheduled' },
];

export const invoices: Invoice[] = [
    { id: 'inv-301', orderId: 'ord-101', customerName: 'Alice Johnson', amount: 600, status: 'Paid', dueDate: new Date('2024-07-20') },
    { id: 'inv-302', orderId: 'ord-102', customerName: 'Bob Williams', amount: 150, status: 'Due', dueDate: new Date('2024-07-22') },
    { id: 'inv-303', orderId: 'ord-103', customerName: 'Charlie Brown', amount: 500, status: 'Partial', dueDate: new Date('2024-08-01') },
    { id: 'inv-304', orderId: 'ord-105', customerName: 'Ethan Hunt', amount: 60, status: 'Due', dueDate: new Date('2024-07-28') },
];

export const customers: Customer[] = [
    { id: 'cust-01', name: 'Alice Johnson', email: 'alice@example.com', totalSpent: 1250.00, avatarUrl: 'https://placehold.co/40x40.png' },
    { id: 'cust-02', name: 'Bob Williams', email: 'bob@example.com', totalSpent: 850.50, avatarUrl: 'https://placehold.co/40x40.png' },
    { id: 'cust-03', name: 'Charlie Brown', email: 'charlie@example.com', totalSpent: 2400.00, avatarUrl: 'https://placehold.co/40x40.png' },
    { id: 'cust-04', name: 'Diana Prince', email: 'diana@example.com', totalSpent: 500.75, avatarUrl: 'https://placehold.co/40x40.png' },
];

export const revenueData = [
  { month: 'Jan', revenue: 4500 },
  { month: 'Feb', revenue: 4200 },
  { month: 'Mar', revenue: 5800 },
  { month: 'Apr', revenue: 5200 },
  { month: 'May', revenue: 6100 },
  { month: 'Jun', revenue: 7200 },
  { month: 'Jul', revenue: 6800 },
];
