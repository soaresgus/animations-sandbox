'use client'

import Lottie from "lottie-react";
import Swimming from '../../src/constants/lottie/Swimming.json'

export default function LottiePage() {
    return (
        <div className="flex justify-center">
            <div className="w-120 h-120">
                <Lottie animationData={Swimming} loop />
            </div>
        </div>
    )
}
