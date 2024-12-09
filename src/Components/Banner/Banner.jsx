import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import the main CSS file directly

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import { Element } from 'react-scroll';
import { API_KEY, imageUrl } from '../../Constants/Constants';
import axios from '../../axios';

// icons import
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { Colors } from '../../Constants/Colors';

const Banner = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
            .then((response) => {
                console.log(response.data.results);
                setMovies(response.data.results); // Set the fetched movies
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    return (
        <Element id='home'>
            {/* <div className='h-screen w-full bg-black absolute z-10 bg-opacity-70'></div> */}
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-screen w-full relative"
            >
                {movies.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                backgroundImage: `url(${movie.backdrop_path ? imageUrl + movie.backdrop_path : 'https://via.placeholder.com/1920x1080'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <div className='h-full w-full flex flex-col items-center justify-center bg-black bg-opacity-10'>
                                <div className=' items-center justify-center flex flex-col absolute gap-4'>
                                    <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-bold">
                                        {movie.title || movie.name || 'Untitled'}
                                    </h1>
                                    <div className=' w-2/3'>
                                        <p className=' text-white'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia blanditiis amet officiis modi beatae harum. Autem ut at quia sapiente ipsa! Totam pariatur asperiores aliquam consectetur, vero similique tempore est?</p>
                                    </div>

                                    <div className=' flex gap-2'>

                                    <div 
                                    style={{backgroundColor:Colors.primary}}
                                    className=' px-8 py-2 rounded-lg flex justify-center items-center gap-2 shadow-2xl'>
                                        <FaPlay color='white' size={12} />
                                        <h1 className=' text-white'>PLAY</h1>
                                    </div>

                                    <div className=' bg-black bg-opacity-60 px-6 py-2 rounded-lg flex justify-center items-center gap-2 shadow-2xl'>
                                        <FaPlus color='white' size={18} />
                                    </div>

                                    <div className=' bg-black bg-opacity-60 px-6 py-2 rounded-lg flex justify-center items-center gap-2 shadow-2xl'>
                                        <HiOutlineHandThumbUp color='white' size={22} />
                                    </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Element>
    );
};

export default Banner;
