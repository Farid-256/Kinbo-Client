import React from 'react';

const OrderSuccess = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-100">

                {/* Success Icon Animation/Badge */}
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 shadow-inner">
                    <svg className="h-10 w-10 text-green-600 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                {/* Heading & Subtitle */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600 text-sm mb-6">
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>

                {/* Order Summary Box */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left border border-gray-200">
                   
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Payment Status:</span>
                        <span className="font-semibold text-green-600">Cash on Delivery</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccess;