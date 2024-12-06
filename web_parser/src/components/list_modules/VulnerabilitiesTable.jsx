import React from 'react';

function VulnerabilitiesTable({ props }) {
    const getColorClass = () => {
        if (props.vulnerability_indicator >= 7.0) {
            return 'bg-red-500 border-red-700';
        } else if (props.vulnerability_indicator >= 4.0) {
            return 'bg-orange-500 border-orange-700';
        } else {
            return 'bg-blue-500 border-blue-700';
        }
    };

    // const getColorClass = () => {
    //     if (props.sample >= 'Exploit') {
    //         return 'text-[2vh] text-red-300';
    //     } else {
    //         return '';
    //     }
    // };



    const copyToClipboard = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(props.description)
                .then(() => {
                    alert('Описание скопировано!');
                })
                .catch((err) => {
                    alert('Ошибка при копировании!');
                    console.error(err);
                });
        } else {
            alert('Ваш браузер не поддерживает копирование в буфер обмена.');
        }
    };

    return (
        <div className="bg-[#335E874F] w-[85vw] md:w-[68.5vw] h-[19vh] md:h-[25vh] rounded-[10px] md:rounded-[15px] relative">
            <div className='flex flex-row'>
                <div className="flex flex-wrap">
                    {/* Первый элемент */}
                    <div
                        className={`${getColorClass()} rounded-[10px] w-[8vw] border-[1px] h-[2.5vh] ml-[1vw] mt-[1vh] text-white font-semibold text-[1.5vh] 
        md:h-[4vh] md:rounded-[20px] md:text-[2.5vh] md:w-[3.5vw] flex justify-center items-center`}
                    >
                        {props.vulnerability_indicator}
                    </div>
                    <div
                        className="bg-[#335E87] rounded-[10px] w-[12vw] border-[1px] h-[2.5vh] ml-[1.5vw] mt-[1vh] 
        md:h-[4vh] md:rounded-[20px] md:text-[2.5vh] md:w-[4vw] md:ml-[0.5vw] text-white font-semibold text-[1.5vh]  flex justify-center items-center md:[]"
                    >
                        {props.sample}
                    </div>
                    <div
                        className="bg-[#335E87] rounded-[10px] w-[20vw] border-[1px] h-[2.5vh] ml-[1vw] mt-[1vh] text-white font-semibold text-[1.5vh] 
        md:text-[2vh] md:w-[7vw] md:h-[4vh] md:rounded-[20px] md:ml-[0.5vw] md:mr-[0.5vw] flex justify-center items-center leading-none 
        md:flex-grow-0 flex-grow"
                    >
                        {props.vuln_date}
                    </div>
                </div>

                <div className='w-[100vw] h-[6vh] bg-[#D9D9D9] ml-[2vw] mr-[1.5vw] mt-[1vh] border-[1px] rounded-[10px] text-[1.5vh] 
                md:text-[2vh] md:ml-[0.5vw] md:w-[50.5vw] md:mr-0 font-semibold flex justify-center items-center p-3'>
                    {props.vuln_title}
                </div>
            </div>
            <div className='flex justify-center mt-[1vh] relative'>
                <div className='bg-[#D9D9D9] w-[82vw] h-[10vh] rounded-[10px] text-[1.5vh] font-semibold p-[0.5vh] overflow-y-auto break-words 
                md:w-[67.2vw] md:mt-[1vh] md:h-[15vh]'>
                    {props.description}
                </div>
                <button
                    onClick={copyToClipboard}
                    className="absolute top-0 right-2 mt-[0.5vh] mr-[0.5vw] h-[1vh] w-[4vw] 
                    md:h-[3vh] md:w-[2vw] font-semibold"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                    </svg>
                </button>
            </div>
            <div></div>
            <div></div>
        </div>
    );
}

export default VulnerabilitiesTable;
