import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar.jsx';
import Footer from '@/components/layout/Footer.jsx';
import ScrollToTop from '@/components/layout/ScrollToTop.jsx';

import { motion } from 'framer-motion';

export default function MainLayout() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen flex-col bg-cream-50"
    >
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </motion.div>
  );
}
