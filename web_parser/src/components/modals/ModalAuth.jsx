import React, { useState, Suspense } from 'react';
import authAxios from '../authInstance';

const LazyInput = React.lazy(() => import('../load/LazyInput'));

function ModalAuthRegister({ closeModal, setIsAuth }) {
    const [isRegistering, setIsRegistering] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

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

        try {
            if (isRegistering) {
                await authAxios.post('/auths/register/', formData);
                setIsRegistering(false);
                setIsRegistered(true)
                setLoading(false);
            } else {
                await authAxios.post('/auths/login/', formData);
                setIsAuth(true);
                setLoading(false);
                closeModal();
            }
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
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#9FC5EA] p-4 rounded-xl w-[90vw] sm:w-[30vw] flex justify-center h-[52vh] md:h-[60vh] md:w-[27vw]">
                <div className='bg-[#0E4D8940] w-[88vw] sm:w-[25vw] rounded-2xl relative'>
                    <h2 className="text-[3vh] font-light mb-9 mt-5 ml-5 text-starts text-[#335E87]" >
                        {isRegistering ? 'Регистрация' : 'Войти'}
                    </h2>
                    <div className="text-[3vh] font-light mb-9 mt-5 ml-5 absolute right-4 -top-1 z-50 text-[#335E87] md:h-[6vh] md:w-[2vw] h-[4vh] w-[7vw] cursor-pointer" onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-lg w-full h-full" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </div>

                    {error && Array.isArray(error) ? (
                        <p className="text-red-500 text-center">
                            {error.map((errorMessage, index) => (
                                <span key={index}>{errorMessage}</span>
                            ))}
                        </p>
                    ) : (
                        <p className="text-red-500 text-center">{error}</p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Suspense fallback={<div>Загрузка поля...</div>}>
                            <div className="flex flex-col items-center justify-center ">
                                <div className="mb-4 w-full max-w-md">
                                    <label className="block mb-2 ml-5 text-[#10385C]" htmlFor="username">
                                        Имя пользователя
                                    </label>
                                    <LazyInput
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-[75vw] ml-[3.2vw] md:w-[18vw] p-2 border border-gray-300 rounded-[17px] focus:outline-none shadow-cus"
                                        required
                                    />
                                </div>
                                <div className="mb-4 w-full max-w-md">
                                    <label className="block text-[#10385C] ml-5 mb-2" htmlFor="password">
                                        Пароль
                                    </label>
                                    <LazyInput
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-[75vw] ml-[3.2vw] p-2 border md:w-[18vw] border-gray-300 rounded-[17px] focus:outline-none shadow-cus"
                                        required
                                    />
                                </div>
                            </div>

                        </Suspense>
                        <div className=" mt-3 flex justify-center items-center ">
                            <button
                                type="submit"
                                className="bg-[#335E87] text-white font-semibold px-4 py-2 md:mt-8 rounded-[20px] hover:bg-blue-600 shadow-custom"
                            >
                                {isRegistering ? 'Зарегистрироваться' : 'Войти'}
                            </button>
                        </div>
                    </form>
                    <p className="text-center mt-4 text-[#10385C] ">
                        {isRegistering
                            ? 'Уже зарегистрированы? '
                            : 'Нет аккаунта? '}
                        <button
                            type="button"
                            className="text-blue-500 hover:underline"
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setError('');
                            }}
                        >
                            {isRegistering ? 'Войти' : 'Зарегистрироваться'}
                        </button>
                    </p>
                    {loading && (
                        <div className='flex justify-center'>
                            <p>Подождите, идет обработка...</p>
                        </div>
                    )}
                </div>
            </div>
            {isRegistered && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[60vw] bg-green-500/80 text-white p-4 rounded-lg shadow-lg">
                    <p className="text-center">
                        Вы успешно зарегистрированы. Пожалуйста, войдите в систему.
                    </p>
                </div>
            )}
        </div>
    );
}

export default ModalAuthRegister;
