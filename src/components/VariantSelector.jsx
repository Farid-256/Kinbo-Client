'use client'

import { useState } from 'react'

const VariantSelector = ({ variantName, variantOptions, onSelect }) => {
    const [selected, setSelected] = useState('')

    const handleClick = (option) => {
        setSelected(option)
        if (onSelect) onSelect(option)  // 👈 parent কে জানাও
    }

    return (
        <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">
                {variantName}
            </h3>
            <div className="flex flex-wrap gap-2">
                {variantOptions.map((option, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleClick(option)}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition cursor-pointer
                            ${selected === option
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {selected && (
                <p className="text-sm text-gray-500 mt-2">
                    Selected: <span className="font-semibold text-blue-600">{selected}</span>
                </p>
            )}
        </div>
    )
}

export default VariantSelector