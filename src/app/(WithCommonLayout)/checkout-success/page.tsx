import Link from "next/link";


const CheckoutSuccessPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
            <p className="mb-6 text-gray-700">Thank you for your purchase. Your order has been confirmed.</p>
            <Link href="/" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Go to Home
            </Link>
        </div>
    );
};

export default CheckoutSuccessPage;