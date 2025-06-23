import React from "react";
import styles from "../../../styles/styles";
// import ProductCard from "../ProductCard/ProductCard";

const dummyProducts = [
    { id: 1, name: "Product 1", sold_out: 10 },
    { id: 2, name: "Product 2", sold_out: 8 },
    { id: 3, name: "Product 3", sold_out: 6 },
    { id: 4, name: "Product 4", sold_out: 4 },
    { id: 5, name: "Product 5", sold_out: 2 },
];

const BestDeals = () => {
    return (
        <div>
            <div className={styles.section}>
                <div className={styles.heading}>
                    <h1>Best Deals</h1>
                </div>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                    {/* {dummyProducts.map((product) => (
                        <ProductCard data={product} key={product.id} />
                    ))} */}
                </div>
            </div>
        </div>
    );
};

export default BestDeals;
