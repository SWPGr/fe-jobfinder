import React, { useEffect, useState } from 'react';
import { CheckCircle, Crown, Star, Zap, Shield, Download, ArrowRight, Gift } from 'lucide-react';
import { paymentService } from '~/services';
import { useSearchParams } from 'react-router-dom';
import { useNotification } from '~/hooks';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
    const [showContent, setShowContent] = useState(false);
    const [showBenefits, setShowBenefits] = useState(false);
    const [searchParams] = useSearchParams();
    const orderCode = searchParams.get('orderCode');
    const { showSuccess, showError } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        const timer1 = setTimeout(() => setShowContent(true), 300);
        const timer2 = setTimeout(() => setShowBenefits(true), 800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                console.log(orderCode);

                await paymentService.confirmPaymentSuccess(orderCode);
                showSuccess('Payment confirmed successfully');
                navigate('/');
            } catch (error) {
                showError(error);
            }
        }
        confirmPayment();
    }, [])

    const benefits = [
        {
            icon: <Crown className="w-6 h-6" />,
            title: "Premium Access",
            description: "Unlock all premium features"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "High Speed",
            description: "Experience 10x faster performance"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Maximum Security",
            description: "Your data is safely protected"
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: "VIP Support",
            description: "Priority 24/7 support"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="max-w-4xl w-full">
                    {/* Main success card */}
                    <div className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}>

                        {/* Success icon with animation */}
                        <div className="relative mb-8">
                            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <Crown className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Success message */}
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                            Payment Successful! 🎉
                        </h1>

                        <p className="text-xl text-gray-600 mb-2">
                            Congratulations on upgrading to VIP package
                        </p>

                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-3 rounded-full mb-8">
                            <Gift className="w-5 h-5 text-purple-600" />
                            <span className="text-purple-700 font-semibold">VIP Premium Package - 1 months</span>
                        </div>

                        {/* Transaction details */}
                        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
                            <h3 className="font-semibold text-gray-800 mb-4">Transaction Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Transaction ID:</span>
                                    <span className="font-mono text-gray-800">#VIP2025010001</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Payment Date:</span>
                                    <span className="text-gray-800">Jan 15, 2025 - 2:30 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Payment Method:</span>
                                    <span className="text-gray-800">Credit Card ****1234</span>
                                </div>
                                <hr className="border-gray-200" />
                                <div className="flex justify-between font-semibold text-lg">
                                    <span className="text-gray-800">Total Amount:</span>
                                    <span className="text-purple-600">$99.99 USD</span>
                                </div>
                            </div>
                        </div>

                        {/* Benefits section */}
                        <div className={`transition-all duration-1000 transform ${showBenefits ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Your VIP Benefits
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-3 text-white">
                                                {benefit.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                                                <p className="text-gray-600">{benefit.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <Download className="w-5 h-5" />
                                Download VIP App
                            </button>

                            <button className="bg-white border-2 border-purple-200 hover:border-purple-300 text-purple-600 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105">
                                Explore Features
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Footer info */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-gray-500 text-sm">
                                A confirmation email has been sent to your email address
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                                For support, please contact: <span className="text-purple-600 font-semibold">support@company.com</span>
                            </p>
                        </div>
                    </div>

                    {/* Additional info card */}
                    <div className={`mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-1000 delay-300 transform ${showBenefits ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <span className="text-gray-700 font-semibold">VIP package is active immediately</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Valid until: Jan 15, 2026 | Auto-renewal enabled
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;

