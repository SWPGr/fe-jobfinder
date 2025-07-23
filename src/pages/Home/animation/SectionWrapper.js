import { motion } from 'framer-motion';

export default function SectionWrapper({ children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                type: 'spring',
                stiffness: 60,
                damping: 12,
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {children}
        </motion.div>
    );
}
