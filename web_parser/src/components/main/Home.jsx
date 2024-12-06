import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { validateInput } from '../validations/validation';
import VulnerabilitiesTable from '../list_modules/VulnerabilitiesTable';
// import { sendDataToBackend } from '../notifications/NotificationComponent';



function Home() {
    const [inputValue, setInputValue] = useState('');
    const [trackingPeriod, setTrackingPeriod] = useState('daily');
    const [validationResult, setValidationResult] = useState({ isValid: true, message: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        const result = validateInput(value);
        setValidationResult(result);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const sendDataToBackend = async (inputValue, trackingPeriod) => {
        try {
            const response = await fetch('http://localhost:8000/check/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: inputValue
                    // inputValue,
                    // trackingPeriod,
                }),
            });

            if (response.ok) {
                console.log('Данные успешно отправлены на сервер');
                // startNotifications();
            } else {
                console.error('Ошибка при отправке данных на сервер');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };


    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8000/task_updates/');

        // Проверяем, поддерживаются ли уведомления в браузере
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
                if (permission !== "granted") {
                    console.warn("Уведомления заблокированы пользователем.");
                }
            });
        }

        socket.onopen = () => {
            console.log("WebSocket connection established.");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        socket.onmessage = (event) => {
            console.log("WebSocket message received:", event.data);

            // Обрабатываем данные из WebSocket
            const data = JSON.parse(event.data);

            var qwe = data.result;
            debugger

            if (Array.isArray(data.result)) {
                setAsd(data.result);
            } else {
                console.error("Expected an array, but received:", data.result);
            }

            // Отправляем браузерное уведомление
            if (Notification.permission === "granted") {
                new Notification("Новое уведомление", {
                    body: `Вышли результаты парсинга`,
                    icon: '/path/to/your/icon.png', // Замените на путь к вашему значку
                });
                // Уязвимость: ${ data.result } \nОписание: ${ data.vulnerability_description }
            } else {
                console.warn("Уведомления не разрешены.");
            }
        };

        return () => {
            socket.close();
        };
    }, []);


    const handleConfirm = async () => {
        await sendDataToBackend(inputValue, trackingPeriod);
        closeModal();
    };

    const [asd, setAsd] = useState([{
        id: 1,
        request: "Ss7",
        vuln_title: "Exploit for CVE-2022-32862",
        vuln_date: "2023-09-13",
        vuln_sample: "Exploit",
        sploitus_id: "90FFF58A-EDFA-5C1A-B7A4-2FE763FECB06",
        vulnerability_indicator: 5.5,
        description: "## https://sploitus.com/exploit?id=90FFF58A-EDFA-5C1A-B7A4-2FE763FECB06\n%PDF-1.5\n%\ufffd\ufffd\ufffd\ufffd\n16 0 obj\n<<\n/Length 972 \n/Filter /FlateDecode\n>>\nstream..mvwmwklrmlermmtbjnjbenbjlkevkjlwmwkjdvnwkjvnwrkjnvkrnvkj.",
        task_interval: 5,
        sample: 'Exploit',
        user: null,
        vuln_tool: 1
    },
    {
        id: 2,
        request: "GET /api/v1/resource",
        vuln_title: "Buffer Overflow",
        vuln_date: "2024-01-15",
        vuln_sample: "AAAABBBBCCCC",
        sploitus_id: "1234ABCD-5678-EFGH-9012-IJKLMN345678",
        vulnerability_indicator: 9.8,
        description: "A critical buffer overflow vulnerability found in the input handling module.",
        task_interval: 10,
        user: "admin",
        vuln_tool: 2
    },
    {
        id: 3,
        request: "POST /api/v1/login",
        vuln_title: "Cross-Site Scripting (XSS)",
        vuln_date: "2024-02-20",
        vuln_sample: "<script>alert('XSS');</script>",
        sploitus_id: "5678WXYZ-1234-QRST-5678-UVWX56789012",
        vulnerability_indicator: 7.4,
        description: "This vulnerability allows malicious scripts to execute in the victim's browser.",
        task_interval: 15,
        sample: 'PoC',
        user: null,
        vuln_tool: 3
    }])

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center md:w-[50vw] md:h-[7.5vh] mt-[10vh] relative ">
                <input
                    placeholder="IP/домены"
                    type="text"
                    className={`bg-[#0000000] rounded-full pl-5 pr-5 h-[5vh] w-[75vw] md:w-[58.5vw] border-[2px] shadow-custom border-[#335E87] focus:outline-none font-medium placeholder:text-gray-600 placeholder:font-semibold md:h-[6.5vh] ${validationResult.isValid ? '' : 'border border-red-500'}`}
                    value={inputValue}
                    onChange={handleChange}
                />
                <div className='absolute right-0 bg-[#335E87] h-[5vh] md:h-[6.45vh] w-[20vw] rounded-full border-[2px] border-[#335E87] text-white flex justify-center items-center font-semibold md:w-[9vw] md:text-[2vh]'>Найти</div>
            </div>

            {validationResult.isValid && inputValue && (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
                    onClick={openModal}
                >
                    Подтвердить
                </button>
            )}

            {isModalOpen && (
                <Modal
                    closeModal={closeModal}
                    inputValue={inputValue}
                    trackingPeriod={trackingPeriod}
                    setTrackingPeriod={setTrackingPeriod}
                    handleConfirm={handleConfirm}
                />
            )}
            <div className="mt-10">
                <h2 className="text-lg font-bold mb-4">Элементы массива asd:</h2>
                <ul className="w-[90vw] md:w-[70vw] bg-[#9FC5EA73] rounded-[10px] md:rounded-[15px] pt-[0.3vh] min-h-[20vh] pb-[1vh]">
                    <div>
                        {asd.map((item) => (
                            <li key={item.id} className="mt-2 flex justify-center">
                                <VulnerabilitiesTable props={item} />
                            </li>
                        ))}
                    </div>
                </ul>
            </div>

        </div>

    );

}

export default Home;
