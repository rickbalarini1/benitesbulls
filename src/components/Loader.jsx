import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Loader = ({ text = "Carregando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="h-12 w-12 text-primary" />
      </motion.div>
      <p className="text-lg text-muted-foreground font-semibold">{text}</p>
    </div>
  );
};

export default Loader;