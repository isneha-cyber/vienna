import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

export default function StellaFooter() {
  const brands = [
    { name: 'Stella Island', subtitle: 'LUXURY RESORT & SPA' },
    { name: 'Stella Rocca a Mare', subtitle: 'SANTORINI' },
    { name: 'Stella Palace', subtitle: 'AQUA PARK RESORT' },
    { name: 'Stella Village', subtitle: 'SEASIDE HOTEL' },
    { name: 'Stella Blue', subtitle: '' }
  ];

  const links = [
    'Stella Collection',
    'Career',
    'Media Library',
    'Gift Cards',
    'Privacy Policy'
  ];

  return (
    <footer className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
     

        {/* Decorative Divider with Circle */}
        <div className="relative flex items-center justify-center mb-12">
          <div className="absolute w-full h-px bg-gray-300"></div>
          <div className="relative bg-white px-4">
            <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-gray-400"></div>
            </div>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {brands.map((brand, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Logo Circle */}
              <div className="mb-3">
                {index === 0 && (
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
                    <div className="absolute inset-2 rounded-full border border-gray-400"></div>
                  </div>
                )}
                {index > 0 && index < 4 && (
                  <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-400"></div>
                  </div>
                )}
              </div>
              
              {/* Brand Name */}
              <div className="text-gray-600">
                {index === 4 ? (
                  <span className="text-2xl font-light italic tracking-wide">{brand.name}</span>
                ) : (
                  <>
                    <div className="font-light text-lg tracking-wider">{brand.name}</div>
                    {brand.subtitle && (
                      <div className="text-xs tracking-widest mt-1 uppercase">{brand.subtitle}</div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Links and Social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-200">
          {/* Links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-600">
            {links.map((link, index) => (
              <a 
                key={index} 
                href="#" 
                className="hover:text-gray-900 transition"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social Media */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Follow us</span>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-white transition"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-white transition"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-left mt-6 text-sm text-gray-600">
          © 2026 Stella Island | Luxury Resort and Spa
        </div>
      </div>
    </footer>
  );
}