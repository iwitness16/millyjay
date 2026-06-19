# Vercel Subdomain Setup Guide

## Overview

This guide explains how to configure `admin.idplugmaster.com` to work with your admin dashboard.

## Vercel Configuration

### Step 1: Add Subdomain in Vercel Dashboard

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter: `admin.idplugmaster.com`
5. Follow the DNS configuration instructions

### Step 2: DNS Configuration

Add a CNAME record in your DNS provider:

```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com (or your Vercel domain)
TTL: Auto (or 3600)
```

**Note:** Replace `cname.vercel-dns.com` with the actual CNAME value provided by Vercel.

### Step 3: Verify Configuration

The `vercel.json` file is already configured with:
- **Redirect:** When someone visits `admin.idplugmaster.com` (root), they're redirected to `/admin/login`
- **Rewrites:** Admin routes are properly configured

## How It Works

### Flow Diagram

```
User visits: admin.idplugmaster.com
    ↓
Vercel redirects to: /admin/login (via vercel.json redirect)
    ↓
Login page checks authentication
    ↓
If authenticated → Redirects to /admin (dashboard)
If not authenticated → Shows login form
    ↓
After login → Redirects to /admin (dashboard)
    ↓
Dashboard checks authentication
    ↓
If authenticated → Shows dashboard
If not authenticated → Redirects to /admin/login
```

### Route Behavior

1. **`admin.idplugmaster.com`** (root)
   - Redirects to `/admin/login` (configured in `vercel.json`)

2. **`admin.idplugmaster.com/admin/login`**
   - Shows login page
   - If already authenticated → Redirects to `/admin`
   - After successful login → Redirects to `/admin`

3. **`admin.idplugmaster.com/admin`**
   - Shows dashboard (if authenticated)
   - If not authenticated → Redirects to `/admin/login`

## Testing

### Local Testing

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Test routes:
   - `http://localhost:3000/admin/login` - Should show login
   - `http://localhost:3000/admin` - Should redirect to login if not authenticated

### Production Testing

1. After deploying to Vercel:
   - Visit `https://admin.idplugmaster.com`
   - Should redirect to `/admin/login`
   - Login with credentials: `spender` / `Spender123#`
   - Should redirect to `/admin` dashboard

## Authentication Flow

The authentication is handled client-side:

1. **Login Page** (`/admin/login`):
   - Checks if user is already authenticated
   - If yes → Redirects to `/admin`
   - If no → Shows login form
   - On successful login → Saves session → Redirects to `/admin`

2. **Dashboard** (`/admin`):
   - Checks if user is authenticated
   - If yes → Loads and displays orders
   - If no → Redirects to `/admin/login`

## Troubleshooting

### Subdomain Not Working

1. **Check DNS:**
   - Verify CNAME record is correct
   - Wait for DNS propagation (can take up to 48 hours)
   - Use `dig admin.idplugmaster.com` or `nslookup admin.idplugmaster.com` to verify

2. **Check Vercel Settings:**
   - Verify domain is added in Vercel dashboard
   - Check SSL certificate status
   - Ensure domain is verified

3. **Check vercel.json:**
   - Ensure `vercel.json` is in the root directory
   - Verify redirect rules are correct

### Redirect Not Working

- Clear browser cache
- Check browser console for errors
- Verify `vercel.json` is deployed with your project
- Check Vercel deployment logs

### Authentication Issues

- Check browser console for errors
- Verify sessionStorage is enabled
- Clear browser cache and cookies
- Try in incognito/private mode

## Security Notes

1. **HTTPS:** Vercel automatically provides SSL certificates for custom domains
2. **Session Storage:** Authentication uses browser sessionStorage (cleared when browser closes)
3. **Client-Side Auth:** Currently uses client-side authentication - consider implementing server-side auth for production

## Alternative Configuration

If you want `admin.idplugmaster.com` to show the dashboard directly (instead of redirecting to login), you can modify the redirect in `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/",
      "has": [
        {
          "type": "host",
          "value": "admin.idplugmaster.com"
        }
      ],
      "destination": "/admin",
      "permanent": false
    }
  ]
}
```

The dashboard will then handle the authentication check and redirect to login if needed.

## Current Configuration

The current setup:
- ✅ Root of subdomain redirects to `/admin/login`
- ✅ Login page handles authentication
- ✅ Dashboard checks authentication
- ✅ Proper redirects between login and dashboard
- ✅ Security headers configured

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify DNS configuration
4. Test routes locally first
