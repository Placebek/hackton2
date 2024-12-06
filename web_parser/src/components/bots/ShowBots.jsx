import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authBotAxios from '../axiosInstance'
import BotsItems from './BotsItems';

function ShowBots() {
    const [botsList, setBotsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBots = async (e) => {
        const accessToken = localStorage.getItem('access_token');
        setLoading(true)
        try {
            const response = await authBotAxios.get('/auths_bots/api/v1/botlist/',
                JSON.stringify(
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }
                ));
            setBotsList(response.data);
        } catch (err) {
            setError('Ошибка при загрузке данных. Пожалуйста, попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBots();
    }, []);

    return (
        <div>
            <div className='text-[2.5vh] font-semibold text-[#335E87] text-center mt-[5vh]'>Ваши созданные боты:</div>
            <div className='flex justify-center flex-wrap gap-2 mt-[4vh]'>
                {loading ? (
                    <p className="text-white text-center">Загрузка...</p>
                ) : error ? (
                    <p className="text-red-500 text-center ">{error}</p>
                ) : botsList.length > 0 ? (
                    botsList.map((bot) => (
                        <div key={bot.id} className="">
                            <BotsItems props={bot} />
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">Боты не найдены</p>
                )}
            </div>
            <Link to='/' className='text-[4vh] flex justify-center font-medium text-slate-600 mt-[3vh]'>←Назад</Link>
        </div>
    );
}

export default ShowBots;
