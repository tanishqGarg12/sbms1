import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  { name: "Rahul S.", role: "Small Business Owner", text: "Adopting this system has transformed our workflow. The efficiency we gained is remarkable!" },
  { name: "Priya M.", role: "Freelancer", text: "The support team is always ready to help, making our experience smooth and enjoyable!" },
  { name: "Amit K.", role: "Startup Founder", text: "We couldn't be happier with the results. This system truly understands our needs!" },
  { name: "Sneha D.", role: "Accountant", text: "Billing has never been this easy. Saves me hours every week on invoicing tasks." },
];

const Organizers = () => {
    const { darkMode } = useContext(DarkModeContext);

    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'ease-in-out',
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section className="py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className={`text-3xl md:text-4xl font-bold text-center ${darkMode ? 'text-green-400' : 'text-gray-900'}`}>
                    What Our Customers Say
                </h2>
                <p className={`text-center mt-3 text-base max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Trusted by businesses across 40+ countries.
                </p>
                <div className="mt-12">
                    <Slider {...settings}>
                        {testimonials.map((t, index) => (
                            <div key={index} className="px-3">
                                <div className={`p-6 rounded-2xl h-64 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-md'
                                }`}>
                                    <p className={`text-sm leading-relaxed italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        "{t.text}"
                                    </p>
                                    <div className="mt-4">
                                        <p className={`font-bold ${darkMode ? 'text-green-400' : 'text-gray-900'}`}>{t.name}</p>
                                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Organizers;
