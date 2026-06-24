import { WHATSAPP_NUMBER } from './site';
import { formatPriceForProduct } from './products';

export interface OrderSummaryItem {
  orderId?: string;
  product: string;
  quantity: number;
  totalPrice: number;
  paymentMethod?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: string;
  social: string;
  socialValue: string;
  address?: string;
  sex?: string;
  birthday?: string;
  hairColor?: string;
  eyesColor?: string;
  heightFeet?: string;
  heightInches?: string;
  weight?: string;
  customize?: string;
}

export function buildSingleOrderMessage(item: OrderSummaryItem, orderId?: string): string {
  const fullName = [item.firstName, item.middleName, item.lastName].filter(Boolean).join(' ');
  const height =
    item.heightFeet && item.heightInches
      ? `${item.heightFeet}' ${item.heightInches}"`
      : 'N/A';
  const lines = [
    '🛒 *New Order — JAYTIMMAID*',
    '',
    orderId || item.orderId ? `*Order ID:* ${orderId || item.orderId}` : null,
    `*Product:* ${item.product}`,
    `*Quantity:* ${item.quantity}`,
    `*Total:* ${formatPriceForProduct(item.product, item.totalPrice)}`,
    item.paymentMethod ? `*Payment:* ${item.paymentMethod}` : null,
    '',
    '👤 *Customer*',
    `*Name:* ${fullName}`,
    item.email ? `*Email:* ${item.email}` : null,
    `*WhatsApp:* ${item.socialValue}`,
    item.address ? `*Address:* ${item.address}` : null,
    '',
    '📋 *Details*',
    item.sex ? `*Sex:* ${item.sex}` : null,
    item.birthday ? `*DOB:* ${item.birthday}` : null,
    item.hairColor || item.eyesColor
      ? `*Hair/Eyes:* ${item.hairColor || 'N/A'} / ${item.eyesColor || 'N/A'}`
      : null,
    item.heightFeet ? `*Height:* ${height}` : null,
    item.weight ? `*Weight:* ${item.weight} lbs` : null,
    item.customize ? `*Notes:* ${item.customize}` : null,
    '',
    'Please confirm my order and share payment details. Thank you!',
  ].filter(Boolean) as string[];

  return lines.join('\n');
}

export function buildCartOrderMessage(
  items: Array<OrderSummaryItem & { orderId: string }>
): string {
  const lines: string[] = ['🛒 *New Cart Order — JAYTIMMAID*', ''];

  items.forEach((item, index) => {
    lines.push(`*Order ${index + 1}*`);
    lines.push(`ID: ${item.orderId}`);
    lines.push(`Product: ${item.product}`);
    lines.push(`Qty: ${item.quantity}`);
    lines.push(`Total: ${formatPriceForProduct(item.product, item.totalPrice)}`);
    lines.push(
      `Name: ${[item.firstName, item.middleName, item.lastName].filter(Boolean).join(' ')}`
    );
    lines.push(`WhatsApp: ${item.socialValue}`);
    if (item.address) lines.push(`Address: ${item.address}`);
    lines.push('');
  });

  lines.push('Please confirm my order(s) and share payment details. Thank you!');
  return lines.join('\n');
}

export function openWhatsAppWithMessage(message: string): void {
  if (typeof window === 'undefined') return;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
