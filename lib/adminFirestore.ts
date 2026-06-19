import { db } from './firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { OrderData } from './firestore';

export interface AdminOrderData extends OrderData {
  id: string;
  createdAt: Timestamp | Date | null;
}

export const fetchAllOrders = async (): Promise<AdminOrderData[]> => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const orders: AdminOrderData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
      } as AdminOrderData);
    });
    
    return orders;
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders. Please check your Firestore configuration.');
  }
};

export const downloadBase64Image = (base64String: string, filename: string): void => {
  try {
    // Check if it's a data URL
    let imageData = base64String;
    if (!base64String.startsWith('data:')) {
      imageData = `data:image/jpeg;base64,${base64String}`;
    }
    
    const link = document.createElement('a');
    link.href = imageData;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading image:', error);
    alert('Failed to download image. Please try again.');
  }
};
