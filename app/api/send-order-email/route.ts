import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

export async function POST(request: NextRequest) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return NextResponse.json(
      { error: 'Email configuration missing. Set GMAIL_USER and GMAIL_APP_PASSWORD.' },
      { status: 500 }
    );
  }

  let data: EmailOrderData;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const fullName = `${data.firstName} ${data.middleName || ''} ${data.lastName}`.trim();
  const height = `${data.heightFeet}'${data.heightInches}"`;
  const weight = data.weight ? `${data.weight} lbs` : 'N/A';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px;">
  <div style="background:#fff;border-radius:8px;padding:30px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:20px;border-radius:8px 8px 0 0;margin:-30px -30px 30px -30px;text-align:center;">
      <h1 style="margin:0;font-size:24px;">New Order Received</h1>
    </div>
    <div style="background:#f8f9fa;border-left:4px solid #667eea;padding:15px;margin:20px 0;border-radius:4px;">
      <p><strong>Order ID:</strong> #${data.orderId}</p>
      <p><strong>Order Date:</strong> ${data.orderDate}</p>
      <p><strong>Product:</strong> ${data.product}</p>
      <p><strong>Quantity:</strong> ${data.quantity}</p>
      <p><strong>Total Price:</strong> $${data.totalPrice}</p>
    </div>
    <div style="margin:25px 0;">
      <div style="font-size:18px;font-weight:bold;color:#667eea;margin-bottom:15px;">Customer Information</div>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Contact (${data.social}):</strong> ${data.socialValue}</p>
      <p><strong>Address:</strong> ${data.address || 'N/A'}</p>
    </div>
    <div style="margin:25px 0;">
      <div style="font-size:18px;font-weight:bold;color:#667eea;margin-bottom:15px;">Details</div>
      <p><strong>Sex:</strong> ${data.sex}</p>
      <p><strong>Birthday:</strong> ${data.birthday || 'N/A'}</p>
      <p><strong>Hair/Eyes:</strong> ${data.hairColor} / ${data.eyesColor}</p>
      <p><strong>Height/Weight:</strong> ${height} / ${weight}</p>
      <p><strong>Customization:</strong> ${data.customize || 'None'}</p>
      <p><strong>Payment Method:</strong> ${data.paymentMethod || 'Not specified'}</p>
    </div>
  </div>
</body>
</html>
`;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"JAYTIMMAID Orders" <${user}>`,
      to: user,
      replyTo: data.email,
      subject: `New Order #${data.orderId} - ${data.product}`,
      html,
      text: `New Order #${data.orderId}\nProduct: ${data.product}\nCustomer: ${fullName}\nEmail: ${data.email}\nTotal: $${data.totalPrice}`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Nodemailer error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
