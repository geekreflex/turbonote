import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ViewWrap = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ y: 100, opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ViewWrap;
