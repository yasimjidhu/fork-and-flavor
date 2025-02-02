import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold">🍽️ Recipe Hub</h2>
            <p className="mt-2 text-gray-400">
              Your ultimate destination for delicious recipes and cooking tips.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li><Link href="/recipes" className="hover:text-yellow-400">Recipes</Link></li>
              <li><Link href="/about" className="hover:text-yellow-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-yellow-400">Blog</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex mt-2 space-x-4">
              <Link href="#" className="hover:text-yellow-400"><FaFacebook size={24} /></Link>
              <Link href="#" className="hover:text-yellow-400"><FaInstagram size={24} /></Link>
              <Link href="#" className="hover:text-yellow-400"><FaTwitter size={24} /></Link>
              <Link href="#" className="hover:text-yellow-400"><FaYoutube size={24} /></Link>
            </div>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} Recipe Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
