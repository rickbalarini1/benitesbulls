import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Galeria', href: '/galeria' },
    { name: 'Padreadores', href: '/padreadores' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/70 shadow-xl backdrop-blur-lg' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          <Link to="/" className="flex items-center">
            <img  
              className="h-20 w-auto" 
              alt="Benites Bulls Logo"
              src="https://dash.henriquebalarini.com/wp-content/uploads/2025/08/loogo.png" />
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-base font-semibold transition-colors duration-300 rounded-md ${
                  isActive(item.href) ? 'text-primary' : 'text-white hover:text-primary'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-6 bg-primary rounded-full"
                    layoutId="active-link-underline"
                  />
                )}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center ml-4">
            <Button asChild size="sm">
              <a
                href="https://wa.me/5516997962312"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary transition-colors p-2"
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl rounded-xl shadow-2xl mb-4"
            >
              <div className="px-2 pt-2 pb-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-4 text-lg font-semibold transition-colors duration-200 rounded-md ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/20'
                        : 'text-white hover:text-primary hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-2 pt-4">
                  <Button asChild className="w-full" size="lg">
                    <a
                      href="https://wa.me/5516997962312"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;