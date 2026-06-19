import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface OrderData {
  // Product Information
  product: string;
  quantity: number;
  totalPrice: number;
  
  // Contact Information
  social: string;
  socialValue: string;
  email: string;
  
  // Personal Information
  firstName: string;
  middleName: string;
  lastName: string;
  sex: string;
  birthday: string;
  
  // Physical Attributes
  hairColor: string;
  eyesColor: string;
  heightFeet: string;
  heightInches: string;
  weight: string;
  
  // Address and Customization
  address: string;
  customize: string;
  
  // Payment Method
  paymentMethod: string;
  
  // Files (stored as base64 strings or URLs)
  photo: string | null;
  signature: string | null;
  
  // Metadata
  createdAt: any;
  status: string;
}

export const submitOrder = async (
  orderData: Omit<OrderData, 'createdAt' | 'status'>
): Promise<string> => {
  try {
    const orderWithMetadata: OrderData = {
      ...orderData,
      createdAt: serverTimestamp(),
      status: 'pending',
    };

    const docRef = await addDoc(
      collection(db, 'orders'),
      orderWithMetadata
    );

    // Send admin email notification
    try {
      await fetch('/api/send-order-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...orderData,
          orderId: docRef.id,
          orderDate: new Date().toLocaleString(),
        }),
      });
    } catch (emailError) {
      console.error(
        'Order saved but email notification failed:',
        emailError
      );
    }

    return docRef.id;
  } catch (error: any) {
    console.error('Error submitting order:', error);

    if (error.code === 'permission-denied') {
      throw new Error(
        'Permission denied. Please check your Firestore security rules. Orders collection must allow writes.'
      );
    } else if (error.code === 'unavailable') {
      throw new Error(
        'Firestore is unavailable. Please check your internet connection and Firebase configuration.'
      );
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error(
        'Failed to submit order. Please try again or contact support.'
      );
    }
  }
};

