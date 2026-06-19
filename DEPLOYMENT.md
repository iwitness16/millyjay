# Firebase Hosting Deployment Guide

This project is now configured for Firebase Hosting. Follow these steps to deploy:

## Prerequisites

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```
   
   Or install locally (already added to package.json):
   ```bash
   npm install
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```
   This will open your browser to authenticate with your Google account.

3. **Verify Firebase Project**:
   ```bash
   firebase use plugmaster
   ```
   Or if you need to set a different project:
   ```bash
   firebase use --add
   ```

## Deployment Steps

### Option 1: Deploy Everything
```bash
npm run deploy
```

### Option 2: Deploy Only Hosting
```bash
npm run deploy:hosting
```

### Option 3: Manual Steps
```bash
# Build the Next.js app (creates 'out' directory)
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## What Was Configured

1. **next.config.ts**: Updated to enable static export (`output: 'export'`)
2. **firebase.json**: Created hosting configuration pointing to the `out` directory
3. **.firebaserc**: Set default project to "plugmaster"
4. **.firebaseignore**: Added to exclude unnecessary files from deployment
5. **package.json**: Added `firebase-tools` and deploy scripts

## Important Notes

- The app is configured for **static export**, which means it will be fully client-side
- All Firebase operations (Firestore, Storage) will work from the client
- Make sure your `.env.local` file has all the required Firebase configuration variables (these are public variables, so they'll be included in the build)
- After deployment, your site will be available at: `https://plugmaster.web.app` or `https://plugmaster.firebaseapp.com`

## Troubleshooting

### If you get "Project not found" error:
- Make sure the project "plugmaster" exists in your Firebase Console
- Or update `.firebaserc` with your actual project ID

### If build fails:
- Make sure all environment variables are set in `.env.local`
- Check that all dependencies are installed: `npm install`

### If deployment fails:
- Ensure you're logged in: `firebase login`
- Verify project access: `firebase projects:list`
- Check Firebase Hosting is enabled in Firebase Console

## Custom Domain (Optional)

After deployment, you can add a custom domain:
1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the instructions to verify domain ownership

