import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const MAX_IMAGE_FIELD_LENGTH = 200000;

function trimImageField(value: string | null): string | null {
  if (!value) return null;
  if (value.length <= MAX_IMAGE_FIELD_LENGTH) return value;
  return null;
}

function sanitizeOrderData(
  orderData: Omit<OrderData, 'createdAt' | 'status'>
): Omit<OrderData, 'createdAt' | 'status'> {
  return {
    ...orderData,
    email: orderData.email ?? '',
    paymentMethod: orderData.paymentMethod?.trim() || 'Not specified',
    photo: trimImageField(orderData.photo),
    signature: trimImageField(orderData.signature),
  };
}

async function sendOrderEmailNotification(payload: Record<string, unknown>): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    await fetch('/api/send-order-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

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
    const sanitized = sanitizeOrderData(orderData);

    const orderWithMetadata: OrderData = {
      ...sanitized,
      createdAt: serverTimestamp(),
      status: 'pending',
    };

    const docRef = await addDoc(
      collection(db, 'orders'),
      orderWithMetadata
    );

    // Fire-and-forget email — must not block checkout/redirect
    sendOrderEmailNotification({
      ...sanitized,
      orderId: docRef.id,
      orderDate: new Date().toLocaleString(),
    }).catch((emailError) => {
      console.error('Order saved but email notification failed:', emailError);
    });

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

