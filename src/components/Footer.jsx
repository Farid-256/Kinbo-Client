import Link from 'next/link';
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* ১. Brand Section */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <BsCart3 className="text-2xl text-blue-500" />
                            <h3 className="text-2xl font-bold text-white">
                                Kinbo
                            </h3>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Shop fashion, gadgets & more at the best prices. Fast delivery, trusted quality — only on Kinbo.
                        </p>
                        <div className="flex gap-3 mt-5">
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                                <FaFacebookF className="text-sm" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition">
                                <FaInstagram className="text-sm" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition">
                                <FaTwitter className="text-sm" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition">
                                <FaYoutube className="text-sm" />
                            </a>
                        </div>
                    </div>

                    {/* ২. Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-blue-500 transition">Home</Link></li>
                            <li><Link href="/shop" className="hover:text-blue-500 transition">Shop</Link></li>
                            <li><Link href="/dashboard" className="hover:text-blue-500 transition">Dashboard</Link></li>
                            <li><Link href="/about" className="hover:text-blue-500 transition">About Us</Link></li>
                        </ul>
                    </div>

                    {/* ৩. Customer Service */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-blue-500 transition">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition">Return Policy</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition">Shipping Info</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* ৪. Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Contact Info</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-blue-500" />
                                <span>Bogura Sadar, Bogura</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-blue-500" />
                                <span>+880 1992-811801</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-blue-500" />
                                <span>faridiqubal334@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
                    <p>© {currentYear} Kinbo. All rights reserved.</p>
                    <p>Made with  in Bangladesh</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;