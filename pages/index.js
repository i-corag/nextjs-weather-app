import Image from 'next/image';
import { Inter } from 'next/font/google';
import axios from 'axios';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Weather from '@/components/Weather';
import Loading from '@/components/Loading';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const featchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.get(url);
    setWeather(response.data);
    setCity('');
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <main>
        {/* overlay */}
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/5 z-[1]' />

        {/* background */}
        <Image
          src='https://a-static.besthdwallpaper.com/beautiful-sky-sunset-wallpaper-1600x1200-81200_23.jpg'
          layout='fill'
          alt='background'
          className='object-cover'
        />

        {/* search */}
        <div className='relative flex flex-col justify-between gap-4 items-center max-w-[500px] w-4/5 m-auto pt-4 text-white z-10 mt-2'>
          <p className='text-4xl'>Welcome to Weather App</p>
          <form
            onSubmit={featchWeather}
            className='flex justify-between items-center w-full m-auto p-3 bg-transparent border-2 border-white text-white rounded-2xl'>
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                className='bg-transparent border-none text-white focus:outline-none text-xl placeholder:text-white'
                type='text'
                placeholder='Search City'
              />
            </div>
            <button onClick={featchWeather}>
              <BsSearch size={20} />
            </button>
          </form>
        </div>

        {/* weather */}
        {weather.main && <Weather weather={weather} />}
      </main>
    );
  }
}
