# Frontend Image URL Update Guide

## Problem
After moving to Cloudinary, the frontend still uses the old pattern of `${backendUrl}${imagePath}` which doesn't work with Cloudinary URLs.

## Solution
Use the `getImageUrl` utility function that handles both old and new image formats.

## Files Already Updated ✅
- `src/components/Profile/ProfileContent.jsx`
- `src/components/Shop/Layout/DashboardHeader.jsx`
- `src/components/Shop/ShopSettings.jsx`
- `src/components/Shop/ShopInfo.jsx`

## Files That Need Updates ⚠️

### Search and Replace Pattern:
1. **Add import at the top:**
   ```javascript
   import { getImageUrl } from "../../utils/imageUtils";
   ```

2. **Replace image src patterns:**
   ```javascript
   // BEFORE:
   src={`${backendUrl}${user?.avatar}`}
   src={`${backendUrl}${item.images[0]}`}
   src={`${backendUrl}${data.avatar}`}

   // AFTER:
   src={getImageUrl(user?.avatar)}
   src={getImageUrl(item.images[0])}
   src={getImageUrl(data.avatar)}
   ```

### Key Files to Update:
1. **User-related components:**
   - `src/pages/UserInbox.jsx` (multiple instances)
   - `src/components/Layout/Header.jsx`
   - `src/components/Profile/ProfileSideBar.jsx`

2. **Product-related components:**
   - `src/components/Route/ProductCard/ProductCard.jsx`
   - `src/components/Route/ProductDetailsCard/ProductDetailsCard.jsx`
   - `src/components/Products/ProductCard.jsx`
   - `src/components/Wishlist/Wishlist.jsx`

3. **Shop-related components:**
   - `src/components/Shop/AllProducts.jsx`
   - `src/components/Shop/CreateProduct.jsx`
   - `src/components/Shop/OrderDetails.jsx`
   - `src/components/Shop/ShopProfileData.jsx`

4. **Order-related components:**
   - `src/components/UserOrderDetails.jsx`
   - `src/components/Shop/AllOrders.jsx`

## Quick Fix Method:
1. Use VS Code's "Find and Replace" (Ctrl+H)
2. Enable "Use Regular Expression" mode
3. Search for: `\$\{backendUrl\}\$\{([^}]+)\}`
4. Replace with: `getImageUrl($1)`
5. Add the import statement to each file

## Environment Variables for Frontend:
Add these to your Vercel frontend project settings:
```
VITE_API_URL=https://your-backend-url.vercel.app/api/v2
VITE_BACKEND_URL=https://your-backend-url.vercel.app/
```

## Testing:
After updating, test these features:
- User profile images
- Product images
- Shop avatars
- Order item images
- Message images

## Deploy:
```bash
cd frontend
vercel --prod
```
