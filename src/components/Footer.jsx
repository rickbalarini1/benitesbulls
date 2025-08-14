import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, KeyRound } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="md:col-span-2 lg:col-span-1">
            <img  
              className="h-12 w-auto mb-4" 
              alt="Benites Bulls Logo"
              src="https://dash.henriquebalarini.com/wp-content/uploads/2025/08/benites-1-e1755026992907.png" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Excelência e paixão na criação de raças de elite. Genética de alto padrão e temperamento exemplar.
            </p>
          </div>

          <div>
            <span className="text-base font-semibold text-foreground mb-4 block">Links Rápidos</span>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Início</Link></li>
              <li><Link to="/galeria" className="text-muted-foreground hover:text-primary transition-colors">Galeria</Link></li>
              <li><Link to="/padreadores" className="text-muted-foreground hover:text-primary transition-colors">Padreadores</Link></li>
              <li><Link to="/sobre" className="text-muted-foreground hover:text-primary transition-colors">Sobre</Link></li>
              <li><Link to="/contato" className="text-muted-foreground hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-base font-semibold text-foreground mb-4 block">Contato</span>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Rua Honório Gasparino, 595<br />
                  Res. Alexandre - Dobrada/SP
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a href="https://wa.me/5516997962312" className="text-muted-foreground hover:text-primary transition-colors text-sm">(16) 9 9796-2312</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">contato@benitesbulls.com.br</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-base font-semibold text-foreground mb-4 block">Siga-nos</span>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={24} /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} Benites Bulls. Todos os direitos reservados.
          </p>
          <Link to="/admin-login" className="flex items-center text-muted-foreground hover:text-primary transition-colors text-sm mt-4 md:mt-0">
            <KeyRound size={14} className="mr-2" />
            Área do Criador
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;