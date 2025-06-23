import React, { useEffect, useState } from "react";

const mockProducts = [
    { id: 1, name: "Product A", price: "$10", category: "Books" },
    { id: 2, name: "Product B", price: "$20", category: "Electronics" },
    { id: 3, name: "Product C", price: "$15", category: "Books" },
];

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Simulate fetching products
        setProducts(mockProducts);
    }, []);

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h2>Products</h2>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "1rem",
                            minWidth: "150px",
                        }}
                    >
                        <h4>{product.name}</h4>
                        <p>{product.price}</p>
                        <small>{product.category}</small>
                    </div>
                ))}
            </div>
            {products.length === 0 && (
                <p style={{ marginTop: "2rem" }}>No products found.</p>
            )}
        </div>
    );
};

export default ProductsPage;
