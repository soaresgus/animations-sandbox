'use client'

import { useState, useRef } from 'react'

interface TrailPosition {
    x: number
    y: number
    id: number
}

export default function HoverBackgroundPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isMouseMoved, setIsMouseMoved] = useState(false)
    const [trail, setTrail] = useState<TrailPosition[]>([])
    const textRef = useRef<HTMLHeadingElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const newPosition = {
            x: e.pageX,
            y: e.pageY,
            id: Date.now()
        }

        setMousePosition(newPosition)

        // Add new position to trail
        setTrail(prev => {
            const newTrail = [...prev, newPosition]
            // Keep only the last 10 positions for performance
            return newTrail.slice(-10)
        })

        if (!isMouseMoved) setIsMouseMoved(true)
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center overflow-hidden bg-blue-200 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Trail circles with fade effect */}
            {isMouseMoved && trail.map((pos, index) => {
                const opacity = (index + 1) / trail.length
                const scale = 0.5 + (index / trail.length) * 0.5

                return (
                    <div
                        key={pos.id}
                        className="pointer-events-none absolute w-96 h-96 rounded-full transition-opacity duration-300"
                        style={{
                            left: pos.x,
                            top: pos.y,
                            transform: `translate(-70%, -50%) scale(${scale})`,
                            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%)',
                            opacity: opacity * 0.6
                        }}
                    />
                )
            })}

            {/* Main circle that follows cursor */}
            {isMouseMoved && (
                <div
                    className="pointer-events-none absolute w-96 h-96 rounded-full"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                        transform: 'translate(-70%, -50%)',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%)'
                    }}
                />
            )}

            {/* SVG mask for text color effect */}
            <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                <defs>
                    <mask id="circleMask">
                        <rect width="100%" height="100%" fill="white" />
                        {isMouseMoved && (
                            <circle
                                cx={mousePosition.x}
                                cy={mousePosition.y}
                                r="192"
                                fill="black"
                            />
                        )}
                    </mask>
                </defs>
            </svg>

            <div className="relative z-10">
                {/* Gray text with mask applied */}
                <h1
                    ref={textRef}
                    className="text-4xl font-bold text-gray-800"
                    style={{ mask: 'url(#circleMask)', WebkitMask: 'url(#circleMask)' }}
                >
                    Hover over the background!
                </h1>

                {/* Blue text underneath, visible only where mask allows */}
                <h1
                    className="text-4xl font-bold text-blue-600 absolute top-0 left-0"
                    aria-hidden="true"
                >
                    Hover over the background!
                </h1>
            </div>
        </div>
    )
}
