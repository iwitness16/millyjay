# EmailJS Setup Instructions

This guide will help you set up EmailJS to send order notifications to `orders@idplugmaster.com`.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (or log in if you already have one)
3. The free plan includes 200 emails per month

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Note your Service ID** (e.g., `service_xxxxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Configure the template settings with these values:

### Template Configuration Settings:

- **Template Name**: `Order Notification`
- **Subject**: `New Order #{{order_id}} - {{product}}`
- **To Email**: `orders@idplugmaster.com` (this is where you'll receive order notifications)
- **From Name**: `ID Plug Master Order System` (or any name you prefer)
- **From Email**: Check "Use Default Email Address" (this uses your EmailJS service email)
- **Reply To**: `{{customer_email}}` (this allows you to reply directly to the customer)
- **Bcc**: (leave empty, or add additional emails if needed)
- **Cc**: (leave empty)

4. Use the following HTML template content:

### Template Settings - Fill in these exact values:

**To Email**: `orders@idplugmaster.com` ⚠️ (Required - this is where you'll receive all order notifications)

**From Name**: `ID Plug Master Order System` (or any name you prefer - this appears as the sender name)

**From Email**: ✅ **Check the box "Use Default Email Address"** (this uses your EmailJS service email - recommended)

**Reply To**: `{{customer_email}}` (this allows you to reply directly to the customer who placed the order)

**Bcc**: (leave empty - optional)

**Cc**: (leave empty - optional)

**Subject**: `New Order #{{order_id}} - {{product}}`

### Template Content (HTML):

**⚠️ IMPORTANT: Email clients strip out `<style>` tags. Use this version with INLINE STYLES:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
  <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; margin: -30px -30px 30px -30px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">🛒 New Order Received</h1>
    </div>

    <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Order ID:</span>
        <span style="color: #212529;"><strong>#{{order_id}}</strong></span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Order Date:</span>
        <span style="color: #212529;">{{order_date}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Product:</span>
        <span style="color: #212529;"><strong>{{product}}</strong></span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Quantity:</span>
        <span style="color: #212529;">{{quantity}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0;">
        <span style="font-weight: bold; color: #495057;">Total Price:</span>
        <span style="color: #28a745; font-size: 18px; font-weight: bold;">{{total_price}}</span>
      </div>
    </div>

    <div style="margin: 25px 0;">
      <div style="font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea;">👤 Customer Information</div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Full Name:</span>
        <span style="color: #212529;">{{full_name}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Email:</span>
        <span style="color: #212529;">{{customer_email}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Contact Method:</span>
        <span style="color: #212529;">{{contact_method}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0;">
        <span style="font-weight: bold; color: #495057;">Contact Value:</span>
        <span style="color: #212529;">{{contact_value}}</span>
      </div>
    </div>

    <div style="margin: 25px 0;">
      <div style="font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea;">📋 Personal Details</div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">First Name:</span>
        <span style="color: #212529;">{{first_name}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Middle Name:</span>
        <span style="color: #212529;">{{middle_name}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Last Name:</span>
        <span style="color: #212529;">{{last_name}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Sex:</span>
        <span style="color: #212529;">{{sex}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0;">
        <span style="font-weight: bold; color: #495057;">Birthday:</span>
        <span style="color: #212529;">{{birthday}}</span>
      </div>
    </div>

    <div style="margin: 25px 0;">
      <div style="font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea;">👁️ Physical Attributes</div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Hair Color:</span>
        <span style="color: #212529;">{{hair_color}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Eyes Color:</span>
        <span style="color: #212529;">{{eyes_color}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
        <span style="font-weight: bold; color: #495057;">Height:</span>
        <span style="color: #212529;">{{height}}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0;">
        <span style="font-weight: bold; color: #495057;">Weight:</span>
        <span style="color: #212529;">{{weight}}</span>
      </div>
    </div>

    <div style="margin: 25px 0;">
      <div style="font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea;">📍 Address</div>
      <div style="background-color: #fff3cd; padding: 15px; border-radius: 4px; border-left: 4px solid #ffc107; margin: 15px 0;">
        {{address}}
      </div>
    </div>

    <div style="margin: 25px 0;">
      <div style="font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea;">✏️ Customization Notes</div>
      <div style="background-color: #fff3cd; padding: 15px; border-radius: 4px; border-left: 4px solid #ffc107; margin: 15px 0;">
        {{customize}}
      </div>
    </div>

    <div style="margin: 25px 0;">
      <div style="font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea;">💳 Payment Method</div>
      <div style="display: flex; justify-content: space-between; padding: 8px 0;">
        <span style="font-weight: bold; color: #495057;">Selected Payment:</span>
        <span style="color: #212529; font-weight: bold;">{{payment_method}}</span>
      </div>
    </div>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d; font-size: 12px;">
      <p>This is an automated email from your order system.</p>
      <p>Order details are also stored in Firestore database.</p>
    </div>
  </div>
</body>
</html>
```

**Note:** This template uses inline styles (styles directly on HTML elements) because most email clients strip out `<style>` tags in the `<head>`. Inline styles ensure your email looks beautiful in all email clients.

4. **Save the template** and **note your Template ID** (e.g., `template_xxxxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxxxxx`)
3. Copy it

## Step 5: Add Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

**Replace the values with your actual IDs from EmailJS.**

## Step 6: Template Variables Reference

The following variables are available in your email template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{order_id}}` | Unique order ID from Firestore | `abc123xyz` |
| `{{order_date}}` | Formatted order date | `December 14, 2026, 10:30 AM EST` |
| `{{product}}` | Product name | `California` |
| `{{quantity}}` | Order quantity | `2` |
| `{{total_price}}` | Total price with $ sign | `$200` |
| `{{customer_email}}` | Customer email address | `customer@example.com` |
| `{{contact_method}}` | Contact method (WhatsApp/Telegram) | `WhatsApp` |
| `{{contact_value}}` | Contact value (phone number) | `+1234567890` |
| `{{first_name}}` | Customer first name | `John` |
| `{{middle_name}}` | Customer middle name | `Michael` or `N/A` |
| `{{last_name}}` | Customer last name | `Doe` |
| `{{full_name}}` | Full name combined | `John Michael Doe` |
| `{{sex}}` | Gender | `M` or `F` |
| `{{birthday}}` | Date of birth | `01/15/1990` |
| `{{hair_color}}` | Hair color | `Brown` |
| `{{eyes_color}}` | Eye color | `Blue` |
| `{{height}}` | Height | `6'0"` |
| `{{weight}}` | Weight | `180 lbs` |
| `{{address}}` | Shipping address | `123 Main St, City, State 12345` |
| `{{customize}}` | Customization notes | `None` or custom text |
| `{{payment_method}}` | Payment method selected | `Cryptocurrency`, `Apple Pay`, `CashApp`, `Zelle`, `Bank Transfer` |

## Step 7: Test Your Setup

1. Place a test order on your website
2. Check your email at `orders@idplugmaster.com`
3. Verify all information is displayed correctly

## Troubleshooting

- **Email not sending**: Check that all environment variables are set correctly
- **Template variables not showing**: Make sure variable names match exactly (case-sensitive)
- **Service connection issues**: Verify your email service is properly connected in EmailJS dashboard

## Notes

- Photos and signatures are stored in Firestore, not sent via email (due to size limitations)
- Email sending failures won't block order submission - orders are still saved to Firestore
- Check EmailJS dashboard for email delivery status and logs

