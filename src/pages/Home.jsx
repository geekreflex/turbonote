import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../styles/GlobalStyles';

const Home = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <h1>Welcome To Quick Noe</h1>
          <div>
            <div>
              <Link to="/note">Note</Link>
            </div>
            <div>
              <Link to="/auth">Auth</Link>
            </div>
          </div>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
