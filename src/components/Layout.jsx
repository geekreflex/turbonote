import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Container } from '../styles/GlobalStyles';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <AnimatePresence>
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>{children}</div>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default Layout;
