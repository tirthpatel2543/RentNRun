export type Product = {
  id: string;
  name: string;
  category: string;
  dailyRate: number;
  availability: 'Available' | 'Rented';
  imageUrl: string;
  stock: number;
};

export type Order = {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  productName: string;
  startDate: Date;
  endDate: Date;
  total: number;
  status: 'Quotation' | 'Confirmed' | 'Delivered' | 'Returned' | 'Late';
};

export type Delivery = {
  id: string;
  orderId: string;
  customerName: string;
  type: 'Pickup' | 'Return';
  scheduledDate: Date;
  status: 'Scheduled' | 'Completed' | 'Delayed';
};

export type Invoice = {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  status: 'Paid' | 'Partial' | 'Due' | 'Overdue';
  dueDate: Date;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  avatarUrl: string;
};
