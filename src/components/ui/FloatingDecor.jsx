import { motion } from 'framer-motion';
import cn from '@/utils/classNames';

/**
 * Floating aesthetic decorations untuk landing page. Setiap shape memiliki
 * orbit-like motion yang lambat dan blur tinggi sehingga terasa elegan
 * tanpa mengganggu konten utama.
 */
const decors = [
  {
    className: 'left-[6%] top-[12%] h-40 w-40 bg-sage-200/60',
    duration: 14,
    delay: 0,
  },
  {
    className: 'right-[8%] top-[20%] h-56 w-56 bg-cream-300/60',
    duration: 18,
    delay: 1.2,
  },
  {
    className: 'left-[20%] bottom-[10%] h-32 w-32 bg-cream-200/70',
    duration: 16,
    delay: 0.4,
  },
  {
    className: 'right-[18%] bottom-[14%] h-44 w-44 bg-sage-100/70',
    duration: 22,
    delay: 0.8,
  },
];

export default function FloatingDecor({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      {decors.map((d, i) => (
        <motion.span
          key={i}
          className={cn(
            'absolute rounded-full blur-3xl mix-blend-multiply opacity-80',
            d.className,
          )}
          animate={{
            y: [0, -24, 0],
            x: [0, 16, -8, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
