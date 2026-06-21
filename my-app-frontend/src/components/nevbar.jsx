import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div>
            <a href="/" className="text-2xl font-bold text-indigo-600">
              AK Store
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="hover:text-indigo-600 bg-green-100 text-gray-700">
              Home
            </a>
            <a href="/products" className="hover:text-indigo-600 bg-green-100 text-gray-700">
              Products
            </a>
            <a href="/categories" className="hover:text-indigo-600 bg-green-100 text-gray-700">
              Categories
            </a>
            <a href="/contact" className="hover:text-indigo-600 bg-green-100 text-gray-700">
              Contact
            </a>

            <button className="relative">
              <ShoppingCart size={24} className="text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-gray-700 text-xs w-5 h-5 rounded-full flex items-center justify-center ">
                3
              </span>
            </button>

            <button className="bg-indigo-600 text-gray-700 px-4 py-2 rounded-lg hover:bg-indigo-700 ">
              <a href="/login">Login</a>
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col gap-4">
              <a href="/" className="hover:text-indigo-600  bg-green-100 text-gray-700">
                Home
              </a>
              <a href="/products" className="hover:text-indigo-600 text-gray-700 bg-green-100">
                Products
              </a>
              <a href="/categories" className="hover:text-indigo-600 text-gray-700 bg-green-100">
                Categories
              </a>
              <a href="/contact" className="hover:text-indigo-600 text-gray-700 bg-green-100">
                Contact
              </a>

              <button className="bg-indigo-600 text-gray-700 py-2 rounded-lg">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}