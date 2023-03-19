import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Container } from '../styles/GlobalStyles';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, name }) => {
  return (
    <div>
      <Header name={name} />
      <Container>
        <AnimatePresence>
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: '100px',
            }}
          >
            <div>{children}</div>
            <Footer />
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default Layout;
