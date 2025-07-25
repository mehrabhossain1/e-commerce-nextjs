import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Company Branding/Logo */}
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="text-2xl font-bold">
                            E-Shop
                        </Link>
                        <p className="text-sm text-gray-400 mt-2">
                            Your one-stop shop for quality products.
                        </p>
                    </div>

                    {/* Essential Links */}
                    <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                        <Link
                            href="/about"
                            className="text-gray-300 hover:text-white"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-300 hover:text-white"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-gray-300 hover:text-white"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-gray-300 hover:text-white"
                        >
                            Terms of Service
                        </Link>
                    </nav>
                </div>
                <div className="mt-8 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} E-Shop. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
}
