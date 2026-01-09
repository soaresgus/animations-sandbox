import { motion } from "motion/react"
import Link from "next/link"

interface NavItemProps {
    href: string
    label: string
    isOpen: boolean
    index: number
}

export function NavItem({ href, label, isOpen, index }: NavItemProps) {
    const navItemVariants = {
        closed: { opacity: 0, x: 20 },
        open: { opacity: 1, x: 0 }
    }

    const openDelay = 0.1 * (index + 2)
    const closeDelay = 0

    return (
        <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={navItemVariants}
            transition={{
                duration: 0.2,
                delay: isOpen ? openDelay : closeDelay,
            }}
        >
            <Link href={href}>
                <span className="text-gray-800 font-semibold text-2xl text-nowrap">{label}</span>
            </Link>
        </motion.div>
    )
}
