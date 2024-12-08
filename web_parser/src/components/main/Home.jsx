import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import VulnerabilitiesTable from '../list_modules/VulnerabilitiesTable';
import { validateInput } from '../validations/validation';

function Home() {
    const [inputValue, setInputValue] = useState('');
    const [trackingPeriod, setTrackingPeriod] = useState('daily');
    const [validationResult, setValidationResult] = useState({ isValid: true, message: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vulnerabilities, setVulnerabilities] = useState([]);

    // Обработка ввода
    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setValidationResult(validateInput(value));
    };

    // Открытие/закрытие модального окна
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Отправка данных на сервер
    const sendDataToBackend = async () => {
        try {
            const response = await fetch('http://localhost:8000/check/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: inputValue }),
            });
            if (response.ok) {
                console.log('Данные успешно отправлены.');
            } else {
                console.error('Ошибка при отправке данных.');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };

    // WebSocket для уведомлений
    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8000/task_updates/');
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (Array.isArray(data.result)) {
                setVulnerabilities(data.result);
            }
        };
        return () => socket.close();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <input
                placeholder="IP/домены"
                type="text"
                className={`input-style ${validationResult.isValid ? '' : 'border-red-500'}`}
                value={inputValue}
                onChange={handleChange}
            />
            {validationResult.isValid && inputValue && (
                <button className="btn-confirm" onClick={openModal}>
                    Подтвердить
                </button>
            )}
            {isModalOpen && (
                <Modal
                    closeModal={closeModal}
                    inputValue={inputValue}
                    trackingPeriod={trackingPeriod}
                    setTrackingPeriod={setTrackingPeriod}
                    handleConfirm={sendDataToBackend}
                />
            )}
            <ul>
                {vulnerabilities.map((item) => (
                    <li key={item.id}>
                        <VulnerabilitiesTable props={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
