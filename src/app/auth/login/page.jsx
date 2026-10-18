'use client'

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const route = useRouter()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password
        })

        if (error) {
            toast.error(error.message || 'Login unsuccessful')
            return
        }

        if (data) {
            toast.success('Login Successful');
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination
            window.location.href = '/';
        }
    }


    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: 'google'
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-6">Login to your Kinbo account</p>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400 font-medium uppercase">Or login with email</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="e.g. farid@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition mt-2 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full my-2 flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition cursor-pointer mb-4"
                >
                    <FcGoogle className="text-2xl" />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Dont have an account?{' '}
                    <Link href="/auth/register" className="text-blue-600 font-semibold hover:underline">
                        Please Register
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;