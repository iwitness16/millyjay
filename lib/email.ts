export interface EmailOrderData {
  product: string;
  quantity: number;
  totalPrice: number;
  social: string;
  socialValue: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  sex: string;
  birthday: string;
  hairColor: string;
  eyesColor: string;
  heightFeet: string;
  heightInches: string;
  weight: string;
  address: string;
  customize: string;
  paymentMethod: string;
  orderId: string;
  orderDate: string;
}

export const sendOrderEmail = async (orderData: EmailOrderData): Promise<void> => {
  console.log('Email order sending is disabled. Order data:', orderData);
};
