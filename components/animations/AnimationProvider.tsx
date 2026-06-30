'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface AnimationProviderProps {
    children: ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
const ENABLE_PAGE_TRANSITIONS = false;
    if (!ENABLE_PAGE_TRANSITIONS) {
  return <>{children}</>;
}
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
