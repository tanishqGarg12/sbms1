import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Organizers = () => {
    const { darkMode } = useContext(DarkModeContext);

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className={`py-20 px-4 md:px-8 lg:px-16 transition-colors duration-300 bg-transparent`}>
            <div className="max-w-screen-xl mx-auto">
                <h2 className={`text-5xl font-extrabold mb-8 text-center animate__animated animate__fadeInDown ${darkMode ? 'text-blue-400' : 'text-gradient'}`} style={{ background: 'linear-gradient(to right, #FF6F20, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Best Customers
                </h2>
                <p className="text-center mb-12 text-lg max-w-xl mx-auto">
                    Some of our valuable customers who adopted our system for the best. All of them were very happy after adopting our system and always give us valuable feedback!
                </p>
                <Slider {...settings}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className={`bg-white h-80 dark:bg-gray-800 p-8 rounded-lg border border-gray-300 dark:border-gray-700 shadow-lg m-4 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`} style={{ height: '400px' }}>
                            <h3 className="text-xl font-bold mb-2 text-center" style={{ color: darkMode ? 'inherit' : 'rgba(255, 111, 32, 1)' }}>Customer {index + 1}</h3>
                            <p className={`text-gray-700 dark:text-gray-300 mb-4 text-center`}>
                                "Adopting this system has transformed our workflow. The efficiency we gained is remarkable!"<br />
                                "The support team is always ready to help, making our experience smooth and enjoyable!"<br />
                                "We couldn't be happier with the results. This system truly understands our needs!"
                            </p>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Organizers;