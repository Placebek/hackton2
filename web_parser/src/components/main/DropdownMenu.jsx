import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function DropdownMenu({ isAuth, toggleModal, toggleCreateBotModal }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleProtectedAction = (action) => {
        if (!isAuth) {
            toggleModal();
        } else {
            action();
        }
    };

    return (
        <div className="relative">
            <div
                onClick={toggleDropdown}
                className="ml-[3vw] h-[5vh] w-[10vw] mt-[1.5vh]
             md:h-[6vh] md:w-[6vh] md:ml-[1.2vw]
             sm:h-[3vh] sm:w-[5vw] sm:ml-[1.2vw]
             cursor-pointer flex justify-center items-center bg-[#7DABD5BF] rounded-full border-[2px] border-[#335E87A8] shadow-custom"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    className={`bi bi-list transition-transform duration-200 ${isOpen ? '-rotate-90' : ''} h-[70%] w-[70%]`} // Уменьшаем иконку
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                    />
                </svg>
            </div>


            {isOpen && (
                <div className="absolute top-[6vh] left-0 bg-slate-300  shadow-lg  w-[50vw]  z-30 md:w-[30vw] rounded-r-[20px]" onClick={() => toggleDropdown()}>
                    <div
                        className="h-[5vh] cursor-pointer flex justify-center items-center text-[2vh] border-b-[1px] border-white font-semibold text-slate-600"
                        onClick={() => handleProtectedAction(toggleCreateBotModal)}
                    >
                        Добавить нового бота
                    </div>
                    <Link to='/my_bots'
                        className="h-[5vh] cursor-pointer flex justify-center items-center text-[2vh] font-semibold text-slate-600"
                    >
                        Мой список ботов
                    </Link>

                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
