'use client'

import { useState } from "react"
import { HamburgerButton } from "../hamburger-button"
import clsx from "clsx"
import { NavItem } from "../nav-item"


export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const NAV_ITEMS = [
        { href: "/", label: "Home" },
        { href: "/hover-background", label: "Hover Background" },
    ]

    return (
        <nav
            className={clsx(
                "fixed h-dvh bg-gray-100 border border-gray-600 p-4 transition-all duration-300 ease-in-out",
                isOpen ? "w-64" : "w-20",
            )}
        >
            <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />

            <section className="flex flex-col gap-2 py-2">
                {NAV_ITEMS.map((item, index) => (
                    <NavItem
                        key={item.label}
                        href={item.href}
                        label={item.label}
                        isOpen={isOpen}
                        index={index}
                    />
                ))}
            </section>
        </nav>
    )
}
