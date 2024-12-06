// // export const sendDataToBackend = async (inputValue, trackingPeriod) => {
// //     try {
// //         const response = await fetch('http://localhost:8000/check/', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({
// //                 query: inputValue
// //                 // inputValue,
// //                 // trackingPeriod,
// //             }),
// //         });

// //         if (response.ok) {
// //             console.log('Данные успешно отправлены на сервер');
// //             startNotifications();
// //         } else {
// //             console.error('Ошибка при отправке данных на сервер');
// //         }
// //     } catch (error) {
// //         console.error('Ошибка сети:', error);
// //     }
// // };

// // const startNotifications = () => {
// //     const socket = new WebSocket('ws://172.20.10.4:8000/task_updates/');

// //     if ("Notification" in window) {
// //         Notification.requestPermission().then((permission) => {
// //             if (permission !== "granted") {
// //                 console.warn("Уведомления заблокированы пользователем.");
// //             }
// //         });
// //     }

// //     socket.onmessage = (event) => {
// //         const data = JSON.parse(event.data);

// //         if (Notification.permission === "granted") {
// //             new Notification("Новое уведомление", {
// //                 body: `Уязвимость: ${data.vulnerability_name}\nОписание: ${data.vulnerability_description}`,
// //                 icon: '/path/to/your/icon.png',
// //             });
// //         } else {
// //             console.warn("Уведомления не разрешены.");
// //         }
// //     };

// //     socket.onopen = () => {
// //         console.log("WebSocket connection established.");
// //     };

// //     socket.onerror = (error) => {
// //         console.error("WebSocket error:", error);
// //     };

// //     socket.onclose = () => {
// //         console.log("WebSocket connection closed.");
// //     };
// // };

// import React, { useEffect } from 'react';

// const NotificationComponent = () => {


//     useEffect(() => {
//         const socket = new WebSocket('ws://127.0.0.1:8000/task_updates/');

//         // Проверяем, поддерживаются ли уведомления в браузере
//         if ("Notification" in window) {
//             Notification.requestPermission().then((permission) => {
//                 if (permission !== "granted") {
//                     console.warn("Уведомления заблокированы пользователем.");
//                 }
//             });
//         }

//         socket.onopen = () => {
//             console.log("WebSocket connection established.");
//         };

//         socket.onerror = (error) => {
//             console.error("WebSocket error:", error);
//         };

//         socket.onclose = () => {
//             console.log("WebSocket connection closed.");
//         };

//         socket.onmessage = (event) => {
//             console.log("WebSocket message received:", event.data);

//             // Обрабатываем данные из WebSocket
//             const data = JSON.parse(event.data);

//             // Отправляем браузерное уведомление
//             if (Notification.permission === "granted") {
//                 new Notification("Новое уведомление", {
//                     body: `Уязвимость: ${data.vulnerability_name}\nОписание: ${data.vulnerability_description}`,
//                     icon: '/path/to/your/icon.png', // Замените на путь к вашему значку
//                 });
//             } else {
//                 console.warn("Уведомления не разрешены.");
//             }
//         };

//         return () => {
//             socket.close();
//         };
//     }, []);

//     return <div>Listening for notifications...</div>;
// };

// export default NotificationComponent;
