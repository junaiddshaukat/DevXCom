import React from "react";

const FeaturedProduct = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Featured Products</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                <div style={{ border: "1px solid #eee", padding: "1rem", borderRadius: "8px", background: "#fafafa" }}>
                    <div style={{ height: "120px", background: "#ddd", borderRadius: "4px", marginBottom: "1rem" }} />
                    <h2 style={{ fontSize: "1.1rem", margin: 0 }}>Product Name</h2>
                    <p style={{ color: "#888", margin: "0.5rem 0 0 0" }}>$99.99</p>
                </div>
                <div style={{ border: "1px solid #eee", padding: "1rem", borderRadius: "8px", background: "#fafafa" }}>
                    <div style={{ height: "120px", background: "#ddd", borderRadius: "4px", marginBottom: "1rem" }} />
                    <h2 style={{ fontSize: "1.1rem", margin: 0 }}>Product Name</h2>
                    <p style={{ color: "#888", margin: "0.5rem 0 0 0" }}>$99.99</p>
                </div>
                <div style={{ border: "1px solid #eee", padding: "1rem", borderRadius: "8px", background: "#fafafa" }}>
                    <div style={{ height: "120px", background: "#ddd", borderRadius: "4px", marginBottom: "1rem" }} />
                    <h2 style={{ fontSize: "1.1rem", margin: 0 }}>Product Name</h2>
                    <p style={{ color: "#888", margin: "0.5rem 0 0 0" }}>$99.99</p>
                </div>
                <div style={{ border: "1px solid #eee", padding: "1rem", borderRadius: "8px", background: "#fafafa" }}>
                    <div style={{ height: "120px", background: "#ddd", borderRadius: "4px", marginBottom: "1rem" }} />
                    <h2 style={{ fontSize: "1.1rem", margin: 0 }}>Product Name</h2>
                    <p style={{ color: "#888", margin: "0.5rem 0 0 0" }}>$99.99</p>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct;