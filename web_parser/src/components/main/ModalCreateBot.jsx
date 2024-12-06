import React, { useState } from 'react';
import authBotAxios from '../axiosInstance'

function ModalCreateBot({ closeModal }) {
    const [formData, setFormData] = useState({
        ipDomain: '',
        nameBot: '',
    });
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('');


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            console.error('Токен доступа не найден!');
            setLoading(false);
            return;
        }

        try {
            const response = await authBotAxios.post(
                '/auths_bots/api/v1/register-bot/',
                JSON.stringify({
                    token: formData.ipDomain,
                    name: formData.nameBot,
                },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }
                )

            )
            setKey(response.data.api_key)
            setLoading(false);
            closeModal();
        } catch (err) {
            if (err.status === 400) {
                const errors = err.response.data;
                const errorMessages = [];
                for (const key in errors) {
                    if (errors[key]) {
                        errorMessages.push(...errors[key]);
                    }
                }
                setError(errorMessages)
            }
            else if (err.status === 200) {
                setError('Бот успешно добавлен')
                closeModal();
            }
            else {
                const errors = err.response.data;
                const errorMessages = [];
                for (const key in errors) {
                    if (errors[key]) {
                        errorMessages.push(...errors[key]);
                    }
                }
                setError(errorMessages)
            }
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
            <div className="bg-[#9FC5EA] p-4 rounded-xl w-[90vw] sm:w-[30vw] flex justify-center h-[37vh] md:h-[42vh] md:w-[27vw] flex-col">
                <div className='bg-[#0E4D8940] w-[82vw] sm:w-[25vw] rounded-2xl relative '>
                    <h2 className="text-[3vh] font-light mb-[2vh] ml-5 text-starts text-[#335E87]" >
                        Добавление бота
                    </h2>
                    <div className="text-[3vh] font-light mb-9 mt-5 ml-5 absolute right-4 -top-1 z-50 text-[#335E87] md:h-[6vh] md:w-[2vw] h-[4vh] w-[7vw] cursor-pointer" onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-lg w-full h-full" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </div>
                    {error && Array.isArray(error) ? (
                        <p className="text-red-400 font-semibold text-center p-0 text-[2vh]">
                            {error.map((errorMessage, index) => (
                                <span key={index}>{errorMessage}</span>
                            ))}
                        </p>
                    ) : (
                        <p className="text-red-500 text-center">{error}</p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 w-full max-w-md">
                            <label className="block mb-2 ml-5 text-[#10385C]" htmlFor="ipDomain">
                                Токен вашего бота
                            </label>
                            <input
                                type="text"
                                id="ipDomain"
                                name="ipDomain"
                                value={formData.ipDomain}
                                onChange={handleChange}
                                className="w-[75vw] ml-[3.2vw] md:w-[18vw] p-2 border border-gray-300 rounded-[17px] focus:outline-none shadow-cus"
                                required
                            />
                        </div>

                        <div className="mb-4 w-full max-w-md">
                            <label className="block mb-2 ml-5 text-[#10385C]" htmlFor="nameBot">
                                Имя бота
                            </label>
                            <input
                                type="text"
                                id="nameBot"
                                name="nameBot"
                                value={formData.nameBot}
                                onChange={handleChange}
                                className="w-[75vw] ml-[3.2vw] md:w-[18vw] p-2 border border-gray-300 rounded-[17px] focus:outline-none shadow-cus"
                                required
                            />
                        </div>

                        <div className="text-center mt-4 w-[20vw] bg-[#10385C] flex justify-center rounded-full ml-[28vw] md:ml-[7vw] md:w-[10vw] md:mb-[1vh]">
                            <button
                                type="submit"
                                className=" text-white px-4 py-2 rounded "
                            >
                                Создать
                            </button>
                        </div>
                        {loading && (
                            <div className='flex justify-center'>
                                <p>Подождите, идет обработка...</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div >
    );
}

export default ModalCreateBot;
