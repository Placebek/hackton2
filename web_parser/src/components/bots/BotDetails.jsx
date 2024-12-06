import React, { useState } from 'react';

function BotDetails({ bot }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isActive, setIsActive] = useState(bot.is_active);

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const deactivateBot = () => {
        setIsActive(false);
        console.log(`Бот ${bot.name} деактивирован`);
    };

    return (
        <div className="p-4 border-2 border-slate-300 w-[60vw] md:w-[40vw] mt-4 rounded-md">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{bot.name}</h3>
                <button
                    onClick={toggleDropdown}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Опции
                </button>
            </div>
            {isDropdownOpen && (
                <div className="mt-2 border border-gray-300 rounded-md bg-white shadow-lg p-2">
                    <button
                        onClick={deactivateBot}
                        className="w-full text-left px-2 py-1 hover:bg-gray-100"
                        disabled={!isActive}
                    >
                        {isActive ? 'Деактивировать' : 'Уже деактивирован'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default BotDetails;
