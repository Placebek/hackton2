import React, { useState } from 'react';
import ModalAuth from '../modals/ModalAuth';
import ModalCreateBot from './ModalCreateBot';
import DropdownMenu from './DropdownMenu';

function Header() {
    const [isAuth, setIsAuth] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCreateBotModalOpen, setCreateBotModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const toggleCreateBotModal = () => {
        setCreateBotModalOpen(!isCreateBotModalOpen);
    };

    const handleLogout = () => {
        setIsAuth(false);
    };

    return (
        <div className="relative flex items-center justify-between ">
            <div>
                <DropdownMenu
                    isAuth={isAuth}
                    toggleModal={toggleModal}
                    toggleCreateBotModal={toggleCreateBotModal}
                />
            </div>

            <div>
                {!isAuth ? (
                    <div className="flex gap-2 mt-[1.5vh]">
                        <button
                            onClick={toggleModal}
                            className="text-white px-2 bg-[#385E82BA] font-semibold rounded-[20px] w-[25vw] md:w-[10vw] md:text-[2vh] md:mr-[1.1vw] h-[5vh] border-[2px] border-[#335E87] text-[1.6vh] shadow-custom mr-2"
                        >

                            Войти
                        </button>
                        <button
                            onClick={toggleModal}
                            className="text-white px-2  bg-[#1A4B785C] font-semibold rounded-[20px] w-[32vw] h-[5vh] md:w-[12vw] border-[2px] border-[#335E87] md:text-[2vh] text-[1.6vh] shadow-custom mr-3"

                        >
                            Регистрация
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="text-white px-2 bg-[#385E82BA] font-semibold rounded-[20px] w-[25vw] md:w-[10vw] md:text-[2vh] md:mr-[1.1vw] h-[5vh] border-[2px] border-[#335E87] text-[1.6vh] shadow-custom mr-2"
                    >
                        Выйти
                    </button>
                )}
            </div>

            {isModalOpen && (
                <ModalAuth
                    closeModal={toggleModal}
                    setIsAuth={setIsAuth}
                />
            )}

            {isCreateBotModalOpen && (
                <ModalCreateBot
                    closeModal={toggleCreateBotModal}
                />
            )}
        </div>
    );
}

export default Header;
