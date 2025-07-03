const fs = require('fs');
const path = require('path');

console.log('🚀 Starting automatic image URL updates...');

const frontendDir = path.join(__dirname, 'frontend', 'src');

// Function to calculate relative path for import
function getRelativeImportPath(filePath) {
    const relativePath = path.relative(frontendDir, filePath);
    const depth = relativePath.split(path.sep).length - 1;
    return '../'.repeat(depth) + 'utils/imageUtils';
}

// Function to add import if not exists
function addImportIfNotExists(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes(getImageUrl)) {
        const lines = content.split('\n');
        let lastImportIndex = -1;
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].match(/^import.*from/)) {
                lastImportIndex = i;
            }
        }
        
        if (lastImportIndex >= 0) {
            const relativeImportPath = getRelativeImportPath(filePath);
            const newImport = `import { getImageUrl } from "${relativeImportPath}";`;
            
            lines.splice(lastImportIndex + 1, 0, newImport);
            fs.writeFileSync(filePath, lines.join('\n'));
            console.log(`  ✅ Added import to ${path.basename(filePath)}`);
        }
    }
}

// Function to update image URLs
function updateImageUrls(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    
    // Pattern 1: ${backendUrl}${variable}
    updatedContent = updatedContent.replace(/\$\{backendUrl\}\$\{([^}]+)\}/g, 'getImageUrl($1)');
    
    // Pattern 2: `${backendUrl}${variable}`
    updatedContent = updatedContent.replace(/`\$\{backendUrl\}\$\{([^}]+)\}`/g, 'getImageUrl($1)');
    
    // Pattern 3: backendUrl + variable
    updatedContent = updatedContent.replace(/backendUrl\s*\+\s*([a-zA-Z_][a-zA-Z0-9_?.]*)/g, 'getImageUrl($1)');
    
    if (updatedContent !== content) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`  ✅ Updated image URLs in ${path.basename(filePath)}`);
        return true;
    }
    return false;
}

// List of files to update
const filesToUpdate = [
    'pages/UserInbox.jsx',
    'components/Shop/ShopProfileData.jsx',
    'components/Shop/OrderDetails.jsx',
    'components/UserOrderDetails.jsx',
    'components/Wishlist/Wishlist.jsx',
    'components/Route/ProductDetailsCard/ProductDetailsCard.jsx',
    'components/Products/ProductCard.jsx',
    'components/Route/ProductCard/ProductCard.jsx',
    'components/Route/Categories/Categories.jsx',
    'components/Route/Hero/Hero.jsx',
    'components/Route/BestDeals/BestDeals.jsx',
    'components/Route/FeaturedProduct/FeaturedProduct.jsx',
    'components/Route/Events/Events.jsx',
    'components/Events/EventCard.jsx',
    'components/Shop/AllProducts.jsx',
    'components/Shop/CreateProduct.jsx',
    'components/Shop/CreateEvent.jsx',
    'components/Shop/AllEvents.jsx',
    'components/Shop/AllOrders.jsx',
    'components/Shop/AllRefundOrders.jsx',
    'components/Shop/DashboardMessages.jsx',
    'components/Shop/ShopAllProducts.jsx',
    'components/Shop/ShopAllEvents.jsx',
    'components/Shop/ShopAllOrders.jsx',
    'components/Shop/ShopAllRefunds.jsx',
    'components/Shop/ShopInboxPage.jsx',
    'components/Admin/AllUsers.jsx',
    'components/Admin/AllSellers.jsx',
    'components/Admin/AllProducts.jsx',
    'components/Admin/AllEvents.jsx',
    'components/Admin/AllOrders.jsx',
    'components/Layout/Header.jsx',
    'components/Layout/Navbar.jsx',
    'components/Layout/DropDown.jsx',
    'components/Route/Sponsored.jsx',
    'components/Profile/ProfileSideBar.jsx',
    'components/Profile/TrackOrder.jsx',
    'components/Profile/Address.jsx',
    'components/Profile/ChangePassword.jsx',
    'components/Profile/AllOrders.jsx',
    'components/Profile/AllRefundOrders.jsx',
    'components/Profile/InboxPage.jsx',
    'components/Checkout/CheckoutSteps.jsx',
    'components/Checkout/Checkout.jsx',
    'components/Payment/Payment.jsx',
    'components/cart/Cart.jsx'
];

let updatedFiles = 0;
let totalFiles = 0;

console.log('🔄 Processing files...');

filesToUpdate.forEach(file => {
    const fullPath = path.join(frontendDir, file);
    totalFiles++;
    
    if (fs.existsSync(fullPath)) {
        console.log(`Processing: ${file}`);
        
        // Add import if needed
        addImportIfNotExists(fullPath);
        
        // Update image URLs
        if (updateImageUrls(fullPath)) {
            updatedFiles++;
        }
    } else {
        console.log(`  ⚠️  File not found: ${file}`);
    }
});

console.log('\n✨ Update Summary:');
console.log(`  📁 Total files processed: ${totalFiles}`);
console.log(`  ✅ Files updated: ${updatedFiles}`);
console.log(`  ⏭️  Files skipped: ${totalFiles - updatedFiles}`);

if (updatedFiles > 0) {
    console.log('\n🎉 Image URL updates completed successfully!');
    console.log('📋 Next steps:');
    console.log('  1. Test the changes locally');
    console.log('  2. Deploy frontend: cd frontend && vercel --prod');
} else {
    console.log('\n💡 No files needed updating - they may already be up to date!');
}

console.log('\n🏁 Script completed!');
