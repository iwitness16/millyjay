# Firestore Security Rules - Complete Setup

This document contains the exact security rules to copy and paste into your Firebase Console.

## Quick Setup Instructions

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **plugmaster** project
3. Navigate to **Firestore Database** → **Rules** tab
4. Copy and paste the rules below
5. Click **Publish** to save the rules

---

## Recommended Rules (Copy This)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Orders Collection
    match /orders/{orderId} {
      // Allow anyone to create orders (for public order form)
      // Validate required fields to ensure data integrity
      allow create: if request.resource.data.keys().hasAll([
        'product',
        'quantity', 
        'totalPrice',
        'email',
        'firstName',
        'lastName',
        'paymentMethod'
      ]) &&
      request.resource.data.product is string &&
      request.resource.data.quantity is int &&
      request.resource.data.totalPrice is number &&
      request.resource.data.email is string &&
      request.resource.data.firstName is string &&
      request.resource.data.lastName is string &&
      request.resource.data.paymentMethod is string &&
      // Ensure status is set to 'pending' on creation
      request.resource.data.status == 'pending' &&
      // Ensure createdAt timestamp is set
      request.resource.data.createdAt is timestamp;
      
      // Allow reading orders (for admin dashboard)
      // Note: In production, restrict this to authenticated admin users
      allow read: if true;
      
      // Allow updating orders (for admin to change status, etc.)
      // Only allow updating specific fields for security
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['status']) &&
        request.resource.data.status is string &&
        request.resource.data.status in ['pending', 'processing', 'completed', 'cancelled'];
      
      // Allow deleting orders (for admin cleanup)
      // Note: Consider restricting this in production
      allow delete: if true;
    }
  }
}
```

---

## Alternative: More Restrictive Rules (For Production)

If you want more security and plan to implement Firebase Authentication for admin access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             request.auth.token.admin == true;
    }
    
    // Orders Collection
    match /orders/{orderId} {
      // Allow anyone to create orders (for public order form)
      // Validate required fields to ensure data integrity
      allow create: if request.resource.data.keys().hasAll([
        'product',
        'quantity', 
        'totalPrice',
        'email',
        'firstName',
        'lastName',
        'paymentMethod'
      ]) &&
      request.resource.data.product is string &&
      request.resource.data.quantity is int &&
      request.resource.data.totalPrice is number &&
      request.resource.data.email is string &&
      request.resource.data.firstName is string &&
      request.resource.data.lastName is string &&
      request.resource.data.paymentMethod is string &&
      // Ensure status is set to 'pending' on creation
      request.resource.data.status == 'pending' &&
      // Ensure createdAt timestamp is set
      request.resource.data.createdAt is timestamp;
      
      // Only allow admin to read orders
      allow read: if isAdmin();
      
      // Only allow admin to update orders
      allow update: if isAdmin() &&
        request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['status']) &&
        request.resource.data.status is string &&
        request.resource.data.status in ['pending', 'processing', 'completed', 'cancelled'];
      
      // Only allow admin to delete orders
      allow delete: if isAdmin();
    }
  }
}
```

**Note:** For the restrictive rules to work, you need to:
1. Set up Firebase Authentication
2. Add custom claims to admin users (set `admin: true` in the user's token)
3. Use Firebase Admin SDK or Cloud Functions to set custom claims

---

## Current Recommended Rules (For Immediate Use)

Since the admin dashboard currently uses client-side authentication, use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /orders/{orderId} {
      // ✅ CUSTOMERS: Can create orders
      // Validates required fields and ensures data integrity
      allow create: if request.resource.data.keys().hasAll([
        'product',
        'quantity', 
        'totalPrice',
        'email',
        'firstName',
        'lastName',
        'paymentMethod'
      ]) &&
      request.resource.data.product is string &&
      request.resource.data.quantity is int &&
      request.resource.data.totalPrice is number &&
      request.resource.data.email is string &&
      request.resource.data.firstName is string &&
      request.resource.data.lastName is string &&
      request.resource.data.paymentMethod is string &&
      request.resource.data.status == 'pending' &&
      request.resource.data.createdAt is timestamp;
      
      // ✅ ADMIN: Can read all orders (for dashboard)
      allow read: if true;
      
      // ✅ ADMIN: Can update order status
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['status']) &&
        request.resource.data.status is string &&
        request.resource.data.status in ['pending', 'processing', 'completed', 'cancelled'];
      
      // ✅ ADMIN: Can delete orders (for cleanup)
      allow delete: if true;
    }
  }
}
```

---

## What Each Rule Does

### `allow create`
- **Who:** Anyone (customers placing orders)
- **What:** Creates new order documents
- **Validation:** 
  - Ensures all required fields are present
  - Validates data types
  - Sets status to 'pending' automatically
  - Requires createdAt timestamp

### `allow read`
- **Who:** Anyone (currently - for admin dashboard)
- **What:** Reads order documents
- **Note:** In production, restrict to authenticated admins only

### `allow update`
- **Who:** Anyone (currently - for admin operations)
- **What:** Updates order documents
- **Restriction:** Only allows updating the 'status' field
- **Valid Statuses:** pending, processing, completed, cancelled

### `allow delete`
- **Who:** Anyone (currently - for admin cleanup)
- **What:** Deletes order documents
- **Note:** In production, restrict to authenticated admins only

---

## Testing the Rules

### Test Order Creation (Customer)
1. Fill out the order form on your website
2. Click "CheckOut"
3. Check Firestore Console → Firestore Database → Data tab
4. You should see a new document in the `orders` collection

### Test Order Reading (Admin)
1. Login to admin dashboard at `/admin`
2. You should see all orders displayed
3. Orders should load without permission errors

### Test Order Update (Admin)
1. In admin dashboard, you can update order status
2. Changes should be saved to Firestore

---

## Troubleshooting

### "Permission denied" when creating orders
- Check that all required fields are present in the order data
- Verify field names match exactly (case-sensitive)
- Ensure `status` is set to 'pending' and `createdAt` is a timestamp
- Make sure rules are **published** (not just saved)

### "Permission denied" when reading orders
- Verify `allow read: if true;` is in the rules
- Check that rules are published
- Clear browser cache and try again

### Orders not appearing in admin dashboard
- Check browser console for errors
- Verify Firestore rules allow reading
- Check Firebase configuration in `.env.local`
- Ensure orders collection exists in Firestore

### Cannot update order status
- Verify the update rule allows status changes
- Check that you're only updating the 'status' field
- Ensure the new status is one of: pending, processing, completed, cancelled

---

## Security Recommendations

1. **For Production:**
   - Implement Firebase Authentication
   - Use custom claims to mark admin users
   - Restrict read/update/delete to authenticated admins only

2. **Rate Limiting:**
   - Consider adding rate limiting on order creation
   - Prevent spam orders

3. **Data Validation:**
   - The rules already validate required fields
   - Consider adding more validation (email format, price ranges, etc.)

4. **Audit Logging:**
   - Log all admin actions (read, update, delete)
   - Track who accessed what data

---

## Quick Copy-Paste (Current Setup)

Use these rules for immediate deployment:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if request.resource.data.keys().hasAll(['product', 'quantity', 'totalPrice', 'email', 'firstName', 'lastName', 'paymentMethod']) && request.resource.data.product is string && request.resource.data.quantity is int && request.resource.data.totalPrice is number && request.resource.data.email is string && request.resource.data.firstName is string && request.resource.data.lastName is string && request.resource.data.paymentMethod is string && request.resource.data.status == 'pending' && request.resource.data.createdAt is timestamp;
      allow read: if true;
      allow update: if request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status']) && request.resource.data.status is string && request.resource.data.status in ['pending', 'processing', 'completed', 'cancelled'];
      allow delete: if true;
    }
  }
}
```

---

**Last Updated:** January 2026
**Project:** IDPLUGMASTER Admin Dashboard
