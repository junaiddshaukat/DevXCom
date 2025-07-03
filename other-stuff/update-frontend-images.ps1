# PowerShell script to automatically update image URLs in frontend files
Write-Host "🚀 Starting automatic image URL updates..." -ForegroundColor Green

# Define the base directory
$frontendDir = "d:\DevXCom\frontend\src"

# Function to add import if not exists
function Add-ImportIfNotExists {
    param([string]$filePath, [string]$importStatement)
    
    $content = Get-Content $filePath -Raw
    if (-not $content.Contains("getImageUrl")) {
        # Find the last import statement
        $lines = Get-Content $filePath
        $lastImportIndex = -1
        
        for ($i = 0; $i -lt $lines.Count; $i++) {
            if ($lines[$i] -match "^import.*from") {
                $lastImportIndex = $i
            }
        }
        
        if ($lastImportIndex -ge 0) {
            # Calculate the relative path
            $relativePath = $filePath.Replace($frontendDir, "").Replace("\", "/")
            $depth = ($relativePath.Split("/").Count - 2)
            $relativeImportPath = ("../" * $depth) + "utils/imageUtils"
            
            $newImport = "import { getImageUrl } from `"$relativeImportPath`";"
            $lines = $lines[0..$lastImportIndex] + $newImport + $lines[($lastImportIndex + 1)..($lines.Count - 1)]
            $lines | Set-Content $filePath
            Write-Host "  ✅ Added import to $filePath" -ForegroundColor Yellow
        }
    }
}

# Function to update image URLs
function Update-ImageUrls {
    param([string]$filePath)
    
    $content = Get-Content $filePath -Raw
    $originalContent = $content
    
    # Pattern 1: ${backendUrl}${variable}
    $content = $content -replace '\$\{backendUrl\}\$\{([^}]+)\}', 'getImageUrl($1)'
    
    # Pattern 2: `${backendUrl}${variable}`
    $content = $content -replace '`\$\{backendUrl\}\$\{([^}]+)\}`', 'getImageUrl($1)'
    
    # Pattern 3: backendUrl + variable
    $content = $content -replace 'backendUrl\s*\+\s*([a-zA-Z_][a-zA-Z0-9_?.]*)', 'getImageUrl($1)'
    
    if ($content -ne $originalContent) {
        $content | Set-Content $filePath
        Write-Host "  ✅ Updated image URLs in $filePath" -ForegroundColor Green
        return $true
    }
    return $false
}

# List of files to update
$filesToUpdate = @(
    "pages\UserInbox.jsx",
    "components\Shop\ShopProfileData.jsx",
    "components\Shop\OrderDetails.jsx",
    "components\UserOrderDetails.jsx",
    "components\Wishlist\Wishlist.jsx",
    "components\Route\ProductDetailsCard\ProductDetailsCard.jsx",
    "components\Products\ProductCard.jsx",
    "components\Route\ProductCard\ProductCard.jsx",
    "components\Route\Categories\Categories.jsx",
    "components\Route\Hero\Hero.jsx",
    "components\Route\BestDeals\BestDeals.jsx",
    "components\Route\FeaturedProduct\FeaturedProduct.jsx",
    "components\Route\Events\Events.jsx",
    "components\Events\EventCard.jsx",
    "components\Shop\AllProducts.jsx",
    "components\Shop\CreateProduct.jsx",
    "components\Shop\CreateEvent.jsx",
    "components\Shop\AllEvents.jsx",
    "components\Shop\AllOrders.jsx",
    "components\Shop\AllRefundOrders.jsx",
    "components\Shop\DashboardMessages.jsx",
    "components\Shop\ShopAllProducts.jsx",
    "components\Shop\ShopAllEvents.jsx",
    "components\Shop\ShopAllOrders.jsx",
    "components\Shop\ShopAllRefunds.jsx",
    "components\Shop\ShopInboxPage.jsx",
    "components\Admin\AllUsers.jsx",
    "components\Admin\AllSellers.jsx",
    "components\Admin\AllProducts.jsx",
    "components\Admin\AllEvents.jsx",
    "components\Admin\AllOrders.jsx",
    "components\Layout\Header.jsx",
    "components\Layout\Navbar.jsx",
    "components\Layout\DropDown.jsx",
    "components\Route\Sponsored.jsx",
    "components\Profile\ProfileSideBar.jsx",
    "components\Profile\TrackOrder.jsx",
    "components\Profile\Address.jsx",
    "components\Profile\ChangePassword.jsx",
    "components\Profile\AllOrders.jsx",
    "components\Profile\AllRefundOrders.jsx",
    "components\Profile\InboxPage.jsx",
    "components\Checkout\CheckoutSteps.jsx",
    "components\Checkout\Checkout.jsx",
    "components\Payment\Payment.jsx",
    "components\cart\Cart.jsx"
)

$updatedFiles = 0
$totalFiles = 0

Write-Host "🔄 Processing files..." -ForegroundColor Cyan

foreach ($file in $filesToUpdate) {
    $fullPath = Join-Path $frontendDir $file
    $totalFiles++
    
    if (Test-Path $fullPath) {
        Write-Host "Processing: $file" -ForegroundColor White
        
        # Add import if needed
        Add-ImportIfNotExists $fullPath
        
        # Update image URLs
        if (Update-ImageUrls $fullPath) {
            $updatedFiles++
        }
    } else {
        Write-Host "  ⚠️  File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n✨ Update Summary:" -ForegroundColor Magenta
Write-Host "  📁 Total files processed: $totalFiles" -ForegroundColor White
Write-Host "  ✅ Files updated: $updatedFiles" -ForegroundColor Green
Write-Host "  ⏭️  Files skipped: $($totalFiles - $updatedFiles)" -ForegroundColor Yellow

if ($updatedFiles -gt 0) {
    Write-Host "`n🎉 Image URL updates completed successfully!" -ForegroundColor Green
    Write-Host "📋 Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Test the changes locally" -ForegroundColor White
    Write-Host "  2. Deploy frontend: cd frontend && vercel --prod" -ForegroundColor White
} else {
    Write-Host "`n💡 No files needed updating - they may already be up to date!" -ForegroundColor Yellow
}

Write-Host "`n🏁 Script completed!" -ForegroundColor Green
