import { motion } from "motion/react"

interface HamburgerButtonProps {
    isOpen: boolean;
    setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export function HamburgerButton({ isOpen, setIsOpen }: HamburgerButtonProps) {
    const topVariants = {
        closed: { y: 6, rotate: 0 },
        open: { y: 12, rotate: 45 },
    }
    const middleVariants = {
        closed: { x: 0, opacity: 1 },
        open: { x: -24, opacity: 0 }, // slide left and hide
    }
    const bottomVariants = {
        closed: { y: 16, rotate: 0 },
        open: { y: 12, rotate: -45 },
    }

    return (
        <button
            type="button"
            onClick={() => setIsOpen(open => !open)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded hover:bg-gray-200 transition-colors"
        >
            <motion.svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                strokeLinecap="round"
                className="text-gray-800"
                initial={false}
            >
                {/* Top bar */}
                <motion.rect
                    width="16"
                    height="2"
                    rx="1"
                    x="4"
                    animate={isOpen ? "open" : "closed"}
                    variants={topVariants}
                    transition={{ type: "spring", stiffness: 500, damping: 30, delay: isOpen ? 0.12 : 0 }}
                    style={{ transformOrigin: "12px 12px" }}
                    initial="closed"
                />
                {/* Middle bar (slides out first) */}
                <motion.rect
                    width="16"
                    height="2"
                    rx="1"
                    x="4"
                    animate={isOpen ? "open" : "closed"}
                    variants={middleVariants}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                    y="11"
                    initial="closed"
                />
                {/* Bottom bar */}
                <motion.rect
                    width="16"
                    height="2"
                    rx="1"
                    x="4"
                    animate={isOpen ? "open" : "closed"}
                    variants={bottomVariants}
                    transition={{ type: "spring", stiffness: 500, damping: 30, delay: isOpen ? 0.12 : 0 }}
                    style={{ transformOrigin: "12px 12px" }}
                    initial="closed"
                />
            </motion.svg>
        </button>
    )
}
