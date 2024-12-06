import React, { useState } from 'react';

function BotsItems({ props }) {
    const [isActive, setIsActive] = useState(props.is_active);
    const [date, time] = props.created_at.split('T')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };
    const togleActive = () => {
        setIsActive((prevState) => !prevState);
    }

    return (
        <div className='mt-[1vh]'>
            <div className="border-[2px] border-blue-300 w-[60vw] md:w-[40vw] mt-[1vh] h-[5vh] bg-[#9FC5EA] rounded-md relative" onClick={toggleDropdown}>
                <div className="flex items-center">
                    <div className="h-[4.4vh] w-[6vw] ml-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill={isActive ? 'green' : 'red'} className="bi bi-circle-fill" viewBox="0 0 16 16" >
                            <circle cx="8" cy="8" r="8" />
                        </svg>
                    </div>
                    <div className="ml-2 text-[2vh] font-medium text-slate-700/90">
                        {props.name}
                    </div>
                    <div className="flex absolute right-1 bottom-1 text-[1.5vh] font-medium text-slate-700/90">
                        {date}
                    </div>
                </div>
            </div>
            {isDropdownOpen && (
                <div className=" border-[2px] border-blue-300 rounded-b-md bg-[#9FC5EA]">
                    <button
                        onClick={() => togleActive()}
                        className="w-full text-left px-2 py-1 "
                        disabled={!isActive}

                    >
                        {isActive ? 'Деактивировать' : 'Уже деактивирован'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default BotsItems;
