import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { translations } from '../../lib/translations';
import { Facebook, Instagram } from '../SocialIcons';

interface FooterProps {
  lang: 'sr' | 'en';
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="bg-uvac-dark text-white/70 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img 
                src="https://res.cloudinary.com/dejmpunhb/image/upload/f_auto,q_auto:eco,w_220/v1777665116/uvac-griffon.webp" 
                alt="Uvac Griffon" 
                className="h-14 sm:h-16 w-auto object-contain brightness-0 invert" 
                loading="lazy"
                decoding="async"
              />
            </Link>
          </div>
          <p className="max-w-sm mb-6">
            {t.footer.desc}
          </p>
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/p/Euro-Uvac-Krstarenje-meandrima-Uvca-100071051771543/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-social-facebook hover:bg-white/10 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href="https://instagram.com/uvacgriffon_krstarenje" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-social-instagram hover:bg-white/10 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">{t.footer.linksTitle}</h4>
          <ul className="space-y-2">
            <li><Link to="/#iskustvo" className="hover:text-white transition-colors">{t.footer.l1}</Link></li>
            <li><Link to={lang === 'en' ? '/#tour' : '/#tura'} className="hover:text-white transition-colors">{t.footer.l2}</Link></li>
            <li><Link to="/#location" className="hover:text-white transition-colors">{t.footer.l4}</Link></li>
            <li><Link to="/recenzije" className="hover:text-white transition-colors">{t.footer.l3}</Link></li>
            <li><Link to="/#faq-section" className="hover:text-white transition-colors">{lang === 'sr' ? 'Česta pitanja' : 'FAQ'}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">{t.footer.contactTitle}</h4>
          <ul className="space-y-3">
            <li><a href="mailto:milivoje.ciro@gmail.com" className="hover:text-white transition-colors">milivoje.ciro@gmail.com</a></li>
            <li className="flex items-center gap-3">
              <a href="tel:+381658862760" className="hover:text-white transition-colors">+381 65 886 2760</a>
              <a 
                href="https://wa.me/381658862760" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-social-whatsapp hover:bg-social-whatsapp-hover text-white p-1 rounded-full transition-colors flex items-center justify-center"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </li>
            <li className="text-gray-400">{t.footer.c1}</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
        <p className="mb-1 font-medium text-gray-300">
          {t.footer.copyright}
        </p>
        <div className="flex justify-center items-center gap-3 flex-wrap mb-2">
          <Link 
            to="/privacy"
            className="text-gray-400 hover:text-white underline text-sm transition-colors"
          >
            {lang === 'sr' ? 'Politika privatnosti' : 'Privacy Policy'}
          </Link>
          <span className="text-white/20 select-none">•</span>
          <Link 
            to="/image-credits"
            className="text-gray-400 hover:text-white underline text-sm transition-colors"
          >
            {lang === 'sr' ? 'Izvori fotografija' : 'Image Credits'}
          </Link>
        </div>
        <p className="mb-1">{t.footer.organizer}</p>
        <p>{t.footer.legal}</p>
      </div>
    </footer>
  );
}
