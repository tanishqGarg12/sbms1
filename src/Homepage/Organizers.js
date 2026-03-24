import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  { name: "Rahul S.", role: "Small Business Owner", text: "Adopting this system has transformed our workflow. The efficiency we gained is remarkable — we save 10+ hours every week!", rating: 5 },
  { name: "Priya M.", role: "Freelancer", text: "The support team is always ready to help, making our experience smooth and enjoyable. Best invoicing tool I've used!", rating: 5 },
  { name: "Amit K.", role: "Startup Founder", text: "We couldn't be happier with the results. This system truly understands our needs and scales with our growth.", rating: 5 },
  { name: "Sneha D.", role: "Accountant", text: "Billing has never been this easy. Saves me hours every week on invoicing tasks. The automation is incredible.", rating: 4 },
];

const Organizers = () => {
  const { darkMode } = useContext(DarkModeContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'ease-in-out',
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className={`py-24 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 ${
            darkMode ? 'bg-brand-500/10 text-brand-400' : 'bg-brand-50 text-brand-600'
          }`}>Testimonials</span>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Loved by businesses
          </h2>
          <p className={`text-lg mt-4 max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            See what our customers have to say about their experience.
          </p>
        </div>

        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index} className="px-3">
              <div className={`p-7 rounded-2xl h-72 flex flex-col justify-between card-hover ${
                darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 border border-gray-100'
              }`}>
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} size={12} className={i < t.rating ? 'text-amber-400' : darkMode ? 'text-gray-700' : 'text-gray-200'} />
                    ))}
                  </div>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    darkMode ? 'bg-brand-500/20 text-brand-400' : 'bg-brand-50 text-brand-600'
                  }`}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.name}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Organizers;
