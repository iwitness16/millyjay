# Firestore Security Rules for Testing

Since you're using **production mode**, you need to set up security rules to allow order creation.

## Quick Setup for Testing

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **plugmaster** project
3. Navigate to **Firestore Database** → **Rules** tab
4. Replace the existing rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create orders (for public order form)
    match /orders/{orderId} {
      allow create: if true;
      allow read: if false; // Only allow creation, not reading (for security)
      allow update: if false;
      allow delete: if false;
    }
  }
}
```

5. Click **Publish** to save the rules

## Rules for Admin Dashboard Access

To allow the admin dashboard to read orders, update the rules to allow read access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      // Allow anyone to create orders (for public order form)
      allow create: if true;
      
      // Allow reading orders for admin dashboard
      // Note: For production, implement Firebase Auth with admin claims
      allow read: if true; // Temporary - enable for admin dashboard
      
      // Disable update/delete for now
      allow update: if false;
      allow delete: if false;
    }
  }
}
```

## More Secure Rules (Recommended for Production)

For better security, you can add validation:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      // Allow creation with required fields
      allow create: if request.resource.data.keys().hasAll([
        'product', 'quantity', 'email', 'firstName', 'lastName'
      ]) && 
      request.resource.data.email is string &&
      request.resource.data.firstName is string &&
      request.resource.data.lastName is string;
      
      // Only allow reading/updating with authentication (for admin dashboard later)
      allow read, update, delete: if false;
    }
  }
}
```

## Testing

After setting up the rules:
1. Fill out the order form on your website
2. Click "CheckOut"
3. Check Firestore Console → Firestore Database → Data tab
4. You should see a new document in the `orders` collection

## Troubleshooting

If you get a "permission-denied" error:
- Make sure the rules are published (not just saved)
- Check that the collection name is exactly `orders` (case-sensitive)
- Verify your Firebase configuration in `.env.local` is correct

