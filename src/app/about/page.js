import Link from 'next/link'
import { FaShoppingCart, FaTruck, FaShieldAlt, FaUndoAlt, FaUsers, FaBox, FaStar, FaHeart } from 'react-icons/fa'

const AboutPage = () => {
    return (
        <div className="min-h-screen">

            {/* Hero Section */}
            <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">About Kinbo</h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                        Bangladeshi modern marketplace connecting buyers and sellers - one click at a time.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Kinbo was born from a simple idea <span className="font-semibold text-gray-800">shopping should be easy, transparent, and accessible to everyone.</span>
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We noticed that small business owners in Bangladesh struggled to reach customers online, while buyers were stuck with limited choices. So we built Kinbo - a platform where sellers can showcase their products and customers can discover, compare, and buy with confidence.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Today, Kinbo is growing into a trusted marketplace with a focus on quality, security, and customer satisfaction.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-64 h-64 bg-blue-50 rounded-full flex items-center justify-center">
                            <FaShoppingCart className="text-blue-600 text-8xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-gray-50 py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose Kinbo?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                                <FaTruck />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Fast Delivery</h3>
                            <p className="text-sm text-gray-500">Quick and reliable shipping across Bangladesh.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                                <FaShieldAlt />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Secure Shopping</h3>
                            <p className="text-sm text-gray-500">Safe transactions with Cash on Delivery.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                                <FaUndoAlt />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Easy Returns</h3>
                            <p className="text-sm text-gray-500">Hassle-free return policy on eligible items.</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                                <FaHeart />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Trusted by Many</h3>
                            <p className="text-sm text-gray-500">Growing community of happy customers.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-blue-600 py-16 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    
                    <div>
                        <FaUsers className="text-4xl mx-auto mb-2 text-blue-200" />
                        <h3 className="text-3xl font-bold">100+</h3>
                        <p className="text-blue-100 text-sm mt-1">Happy Customers</p>
                    </div>

                    <div>
                        <FaBox className="text-4xl mx-auto mb-2 text-blue-200" />
                        <h3 className="text-3xl font-bold">50+</h3>
                        <p className="text-blue-100 text-sm mt-1">Products</p>
                    </div>

                    <div>
                        <FaStar className="text-4xl mx-auto mb-2 text-blue-200" />
                        <h3 className="text-3xl font-bold">4.8</h3>
                        <p className="text-blue-100 text-sm mt-1">Average Rating</p>
                    </div>

                    <div>
                        <FaShoppingCart className="text-4xl mx-auto mb-2 text-blue-200" />
                        <h3 className="text-3xl font-bold">500+</h3>
                        <p className="text-blue-100 text-sm mt-1">Orders Delivered</p>
                    </div>

                </div>
            </section>

            {/* Our Values */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Values</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
                            01
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Customer First</h3>
                        <p className="text-sm text-gray-500">
                            Every decision we make starts with one question does this help our customers?
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
                            02
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Empower Sellers</h3>
                        <p className="text-sm text-gray-500">
                            We help small businesses grow by giving them a platform to reach more customers.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
                            03
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Build Trust</h3>
                        <p className="text-sm text-gray-500">
                            Transparency, honesty, and quality the foundation of everything we do.
                        </p>
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-50 py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Shopping?</h2>
                    <p className="text-gray-600 mb-8">
                        Explore our collection and discover amazing deals on everyday products.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default AboutPage