export interface InvoiceObj {
  id: string;
  recipient: {
    name: string;
    email: string;
  };
  created_at: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    total_price: {
      currency: string;
      amount: string;
    }
  }[];
  delivery: {
    courier: string;
    method: string;
  };
  charge_customer: {
    currency: string;
    total_price: string;
  };
}
