import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const OrderSuccessPage = () => {
    return (
        <div>
            <Header />
            <Success />
            <Footer />
        </div>
    );
};

const Success = () => {
    return (
        <div className="flex mt-20 flex-col items-center">
            <div className="success-animation mb-6">
                <div className="success-circle">
                    <svg
                        className="success-check"
                        viewBox="0 0 52 52"
                        width={80}
                        height={80}
                    >
                        <circle
                            className="success-check-circle"
                            cx="26"
                            cy="26"
                            r="25"
                            fill="none"
                        />
                        <path
                            className="success-check-mark"
                            fill="none"
                            d="M14 27l7 7 16-16"
                        />
                    </svg>
                </div>
            </div>
            <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
                Your order is successful 😍
            </h5>
            <br />
            <br />
            <style>{`
                .success-animation {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .success-circle {
                    background: #e6ffe6;
                    border-radius: 50%;
                    width: 100px;
                    height: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                }
                .success-check-circle {
                    stroke: #4BB543;
                    stroke-width: 2;
                    stroke-dasharray: 166;
                    stroke-dashoffset: 166;
                    animation: circle-anim 0.6s ease-out forwards;
                }
                .success-check-mark {
                    stroke: #4BB543;
                    stroke-width: 3;
                    stroke-linecap: round;
                    stroke-dasharray: 48;
                    stroke-dashoffset: 48;
                    animation: check-anim 0.4s 0.6s ease forwards;
                }
                @keyframes circle-anim {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                @keyframes check-anim {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default OrderSuccessPage;