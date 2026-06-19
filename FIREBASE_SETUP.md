# Firebase Setup Guide

## Prerequisites
1. A Firebase project named "plugmaster" (already created)
2. Node.js and npm installed

## Installation Steps

### 1. Install Firebase SDK
```bash
npm install firebase
```

### 2. Get Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your "plugmaster" project
3. Click the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. If you don't have a web app, click the `</>` icon to add one
7. Copy the configuration values

### 3. Set Up Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase configuration values in `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=plugmaster.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=plugmaster
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=plugmaster.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
   ```

### 4. Set Up Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Start in **test mode** (for now - you can secure it later)
4. Choose a location for your database
5. Click "Enable"

### 5. Set Up Firestore Security Rules (Optional but Recommended)
Go to Firestore Database > Rules and update with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read: if request.auth != null; // Only authenticated users can read
      allow create: if true; // Anyone can create orders (for public form)
      allow update, delete: if request.auth != null; // Only authenticated users can update/delete
    }
  }
}
```

### 6. Test the Setup
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to the order page
3. Fill out the form and submit
4. Check Firestore Database in Firebase Console to see if the order was created

## Order Data Structure

Orders are stored in the `orders` collection with the following structure:
- `product`: string
- `quantity`: number
- `totalPrice`: number
- `originalPrice`: number
- `discount`: number
- `social`: string (WhatsApp, Telegram, Email)
- `socialValue`: string
- `email`: string
- `firstName`: string
- `middleName`: string
- `lastName`: string
- `sex`: string
- `birthday`: string
- `hairColor`: string
- `eyesColor`: string
- `heightFeet`: string
- `heightInches`: string
- `weight`: string
- `address`: string
- `customize`: string
- `photo`: string (base64 encoded)
- `signature`: string (base64 encoded or null)
- `createdAt`: timestamp
- `status`: string (default: "pending")

## Next Steps

After orders are stored in Firestore, you can:
1. Set up a Cloud Function to send emails to orders@iidplugmaster.com
2. Create an admin dashboard to view and manage orders
3. Add authentication for admin access
4. Implement order status updates

