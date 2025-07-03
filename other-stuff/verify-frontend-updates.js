const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying image URL updates...');

const frontendDir = path.join(__dirname, 'frontend', 'src');

// Function to check if file has old patterns
function checkForOldPatterns(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const oldPatterns = [
        /\$\{backendUrl\}\$\{[^}]+\}/g,
        /`\$\{backendUrl\}\$\{[^}]+\}`/g,
        /backendUrl\s*\+\s*[a-zA-Z_][a-zA-Z0-9_?.]*(?!\s*\))/g
    ];
    
    const issues = [];
    oldPatterns.forEach((pattern, index) => {
        const matches = content.match(pattern);
        if (matches) {
            issues.push({
                pattern: index + 1,
                matches: matches
            });
        }
    });
    
    return issues;
}

// Function to check if file has import
function hasImport(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes('getImageUrl');
}

// Get all JSX files recursively
function getJSXFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            files.push(...getJSXFiles(fullPath));
        } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
            files.push(fullPath);
        }
    });
    
    return files;
}

const allFiles = getJSXFiles(frontendDir);
let filesWithIssues = 0;
let filesWithImports = 0;

console.log('📊 Checking all JSX/JS files...\n');

allFiles.forEach(file => {
    const relativePath = path.relative(frontendDir, file);
    const issues = checkForOldPatterns(file);
    const hasImportStatement = hasImport(file);
    
    if (issues.length > 0) {
        console.log(`❌ ${relativePath}:`);
        issues.forEach(issue => {
            console.log(`   Pattern ${issue.pattern}: ${issue.matches.join(', ')}`);
        });
        filesWithIssues++;
    }
    
    if (hasImportStatement) {
        filesWithImports++;
    }
});

console.log('\n📋 Summary:');
console.log(`  📁 Total files checked: ${allFiles.length}`);
console.log(`  ✅ Files with imports: ${filesWithImports}`);
console.log(`  ❌ Files with old patterns: ${filesWithIssues}`);

if (filesWithIssues === 0) {
    console.log('\n🎉 All files are updated correctly!');
    console.log('✅ Ready to deploy!');
} else {
    console.log('\n⚠️  Some files still need manual review.');
}

console.log('\n🏁 Verification completed!');
