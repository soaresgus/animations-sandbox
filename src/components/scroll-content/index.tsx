'use client'

import { motion } from "motion/react"

export function ScrollContent() {
    const contentVariants = {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // 200ms delay between each child
                delayChildren: 0.2
            }
        }
    }

    return (
        <main>
            <motion.div className="text-center py-6" initial="hidden" animate="visible" variants={contentVariants}>
                <h1 className="text-4xl font-bold mb-4">Initial Content</h1>
                <p className="text-lg">
                    This is some scrollable content. Scroll down to see more animations!
                </p>
            </motion.div>

            <div style={{ height: '100vh' }}></div> {/* Spacer to enable scrolling */}

            <div className="bg-blue-100">
                <motion.div className="text-center p-6" initial="hidden" whileInView="visible" variants={contentVariants} viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold mb-4">Animated on Scroll</h2>
                    <p className="text-lg">
                        This content fades in as you scroll down!
                    </p>
                </motion.div>
            </div>

            <div style={{ height: '100vh' }}></div> {/* Spacer to enable scrolling */}

            <motion.div className="flex gap-4" initial="hidden" whileInView="visible" variants={containerVariants} viewport={{ once: true }}>
                {[1, 2, 3].map((item) => (
                    <motion.div key={item} className="bg-green-100 p-6 flex-1 text-center" variants={contentVariants}>
                        <h3 className="text-2xl font-bold mb-4">Box {item}</h3>
                        <p className="text-lg">
                            This box also animates into view!
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </main>
    )
}
