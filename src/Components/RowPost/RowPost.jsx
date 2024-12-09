import axios from '../../axios';
import React, { useEffect, useState, useRef } from 'react';
import { imageUrl } from '../../Constants/Constants';
import gsap from 'gsap';
import { Colors } from '../../Constants/Colors';

const RowPost = (props) => {
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        axios.get(props.url).then((response) => {
            console.log(response.data);
            setMovies(response.data.results);
        });
    }, [props.url]);

    // Scroll horizontally with animation
    const scroll = (direction) => {
        const { current } = scrollRef;

        const scrollAmount = 450; // Adjust scroll distance
        const scrollToPosition =
            direction === 'left'
                ? current.scrollLeft - scrollAmount
                : current.scrollLeft + scrollAmount;

        gsap.to(current, {
            duration: 0.5,
            scrollLeft: scrollToPosition,
            ease: 'power2.inOut', // Smooth easing
        });
    };

    return (
        <div className=' bg-stone-900 px-12 py-4'>
            <div className='flex justify-between items-center px-4'>
                <h2 className='text-white text-lg sm:text-2xl font-bold'>{props.title}</h2>
                <div>
                    <button
                        onClick={() => scroll('left')}
                        className='bg-black bg-opacity-60 px-2 sm:px-4 py-2 text-white rounded-lg mr-2'
                    >
                        Previous
                    </button>
                    <button
                     style={{backgroundColor:Colors.primary}}
                        onClick={() => scroll('right')}
                        className=' text-white px-2 sm:px-4 py-2 rounded-lg'
                    >
                        Next
                    </button>
                </div>
            </div>
            <div
                ref={scrollRef}
                className='flex overflow-x-scroll scrollbar-hide px-4 space-x-4 mt-4'
            >
                {movies.map((obj, index) => (
                    <div
                        key={index}
                        className='relative min-w-[200px] flex-shrink-0 rounded-lg overflow-hidden'
                    >
                        <img
                            className={`${
                                props.isSmall ? 'h-40' : 'h-60'
                            } w-full object-cover`}
                            src={`${imageUrl}${obj.backdrop_path}`}
                            alt="poster"
                        />
                        {/* Movie title and duration */}
                        <div className='absolute bottom-0 left-0 w-full bg-black bg-opacity-70 p-2 text-white'>
                            <h3 className='text-sm font-bold truncate'>{obj.title || obj.name}</h3>
                            <p className='text-xs'>
                                {obj.genre_ids.length *15} mins
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RowPost;
