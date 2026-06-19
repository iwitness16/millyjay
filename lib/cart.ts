export interface CartItem {
  id: string;
  product: string;
  quantity: number;
  price: number;
  image: string;
  formData: {
    social: string;
    socialValue: string;
    email?: string;
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
    photo: string | null;
    signature: string | null;
  };
  selected: boolean;
  createdAt: number;
}

import { CART_STORAGE_KEY } from './site';

export const getCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

export const addToCart = (item: Omit<CartItem, 'id' | 'selected' | 'createdAt'>): string => {
  const cartItems = getCartItems();
  const newItem: CartItem = {
    ...item,
    id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    selected: true,
    createdAt: Date.now(),
  };
  
  cartItems.push(newItem);
  saveCartItems(cartItems);
  return newItem.id;
};

export const updateCartItem = (id: string, updates: Partial<CartItem>): void => {
  const cartItems = getCartItems();
  const updatedItems = cartItems.map(item =>
    item.id === id ? { ...item, ...updates } : item
  );
  saveCartItems(updatedItems);
};

export const removeFromCart = (id: string): void => {
  const cartItems = getCartItems();
  const filteredItems = cartItems.filter(item => item.id !== id);
  saveCartItems(filteredItems);
};

export const clearCart = (): void => {
  saveCartItems([]);
};

export const saveCartItems = (items: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const getCartItemCount = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
};

