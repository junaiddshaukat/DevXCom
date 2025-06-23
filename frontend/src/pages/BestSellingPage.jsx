import React from 'react';

const bestSellingProducts = [
    { id: 1, name: 'Wireless Headphones', price: '$99', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Smart Watch', price: '$149', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Bluetooth Speaker', price: '$79', image: 'https://via.placeholder.com/150' },
];

const BestSellingPage = () => (
    <div style={{ padding: '2rem' }}>
        <h1>Best Selling Products</h1>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {bestSellingProducts.map(product => (
                <div key={product.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: '1rem', width: 200, textAlign: 'center' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 4 }} />
                    <h2 style={{ fontSize: '1.1rem' }}>{product.name}</h2>
                    <p style={{ fontWeight: 'bold' }}>{product.price}</p>
                </div>
            ))}
        </div>
    </div>
);

export default BestSellingPage;