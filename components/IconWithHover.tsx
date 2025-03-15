import { motion } from 'framer-motion';
import { IconCircleDotted } from '@tabler/icons-react';

interface IconWithHoverProps {
  className?: string;
}

export default function IconWithHover({ className }: IconWithHoverProps) {
  return (
    <motion.div
      className={`rounded-full bg-gray-300 p-1 ${className}`}
      whileHover={{ backgroundColor: '#000000 ', scale: 1.1, rotate: 360, transform: 'rotate(360deg)' }}
      transition={{ 
        backgroundColor: { duration: 0.9 }, // Background color change takes 0.5s
        scale: { duration: 0.5 },           // Scale can remain at 0.5s
        rotate: { duration: 0.5 }           // Rotate can remain at 0.5s
      }}
      role="button"
      aria-label="Interactive icon"
    >
      <motion.div 
        whileHover={{ color: '#ffffff' }}
        transition={{ color: { duration: 0.9 } }} // Text/icon color change takes 0.5s
      >
        <IconCircleDotted />
      </motion.div>
    </motion.div>
  );
}