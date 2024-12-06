import React from 'react';

const Modal = ({ closeModal, inputValue, trackingPeriod, setTrackingPeriod, handleConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="text-lg font-bold mb-4">Настройки трекинга</h2>

                {/* Выбор периода */}
                <label className="block mb-2 text-gray-700 font-medium">Выберите период</label>
                <select
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={trackingPeriod}
                    onChange={(e) => setTrackingPeriod(e.target.value)}
                >
                    <option value="hourly">Каждый час</option>
                    <option value="daily">Ежедневно</option>
                    <option value="weekly">Еженедельно</option>
                    <option value="monthly">Ежемесячно</option>
                </select>

                {/* Поле для IP/доменов */}
                <label className="block mt-4 mb-2 text-gray-700 font-medium">Введите IP/домен</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inputValue}
                    readOnly
                />

                {/* Кнопки */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        onClick={closeModal}
                    >
                        Закрыть
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        onClick={handleConfirm}
                    >
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
