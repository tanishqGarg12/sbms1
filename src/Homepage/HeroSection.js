import React, { useRef, useState, useEffect } from 'react';
import CountUp from 'react-countup';
import ParticlesBackground from '../components/ParticlesBackground';
import Front1 from "./Assests/Front1.png";
import rupee from "./Assests/ruppe.png";
import Front2 from "./Assests/Front2.png";
import Front3 from "./Assests/Front3.png";

const HeroSection = () => {
    const [startCount, setStartCount] = useState(false);
    const sectionRef = useRef(null);
    const targetNumber = 2500; // Set your target number here
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStartCount(true);
            observer.unobserve(entry.target); // Stop observing after counting starts
          }
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
    return (
        <div className="relative w-full h-auto overflow-hidden  bg-[#029c78]">
            <ParticlesBackground id="particles" />
            {/* Particles Background */}
            <div className='flex flex-col ml-24 justify-center mt-24'>
                <h1 className='text-white text-9xl font-bold'>Welcome to the <br/> Powerfull</h1>
                <br/>
                <div className='flex'>


                <h1 className='text-white text-9xl font-bold'>BILLING AND INVOICE SYSTEM</h1>
                
                <h1 className='text-white text-5xl font-bold mt-32 mr-12'>Your <br/> Bussiness</h1>
                <img
                    src={rupee}
                    alt="Image 1"
                    className="w-28 mt-36 mr-9 rounded-xl h-16 shadow-lg"
                />
                <h1 className='text-white text-5xl font-bold mt-32 mr-5'>Your <br/> Client</h1>
                
                </div>
            </div>

            <div className='flex justify-between mt-16 '>
                <div className='flex flex-col text-white text-3xl ml-10'>
                    <p>A simple payment process helps you get paid on time.</p>
                    <p>Provide multiple payment options that your customers can.</p>
                    <p>A simple payment process helps you get paid on time.</p>


                    <div>
                    <div class=" mt-20" data-id="39cc095" data-element_type="widget" data-widget_type="icon-list.default">
				<div class="elementor-widget-container">
        		<ul class="elementor-icon-list-items">
							<li class="elementor-icon-list-item flex">
											<span class="elementor-icon-list-icon mt-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none"><path d="M6.70164 20L6.47213 19.5894C4.75082 16.5217 0.183607 9.97585 0.137705 9.90338L0 9.71014L1.72131 7.92271L6.63279 11.5459C9.7082 7.343 12.5771 4.4686 14.459 2.77778C16.5475 0.917874 17.8557 0.0724638 17.9016 0.0483092L17.9705 0H21L20.4951 0.483092C14.023 6.54589 7 19.4686 6.93115 19.5894L6.70164 20Z" fill="white"></path></svg>						</span>
										<span class="elementor-icon-list-text ">Send invoices via SMS, email and client portal</span>
									</li>
								<li class="elementor-icon-list-item flex mt-5">
											<span class="elementor-icon-list-icon mt-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none"><path d="M6.70164 20L6.47213 19.5894C4.75082 16.5217 0.183607 9.97585 0.137705 9.90338L0 9.71014L1.72131 7.92271L6.63279 11.5459C9.7082 7.343 12.5771 4.4686 14.459 2.77778C16.5475 0.917874 17.8557 0.0724638 17.9016 0.0483092L17.9705 0H21L20.4951 0.483092C14.023 6.54589 7 19.4686 6.93115 19.5894L6.70164 20Z" fill="white"></path></svg>						</span>
										<span class="elementor-icon-list-text">Keep track of customers' invoice status</span>
									</li>
								<li class="elementor-icon-list-item flex mt-5">
											<span class="elementor-icon-list-icon mt-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none"><path d="M6.70164 20L6.47213 19.5894C4.75082 16.5217 0.183607 9.97585 0.137705 9.90338L0 9.71014L1.72131 7.92271L6.63279 11.5459C9.7082 7.343 12.5771 4.4686 14.459 2.77778C16.5475 0.917874 17.8557 0.0724638 17.9016 0.0483092L17.9705 0H21L20.4951 0.483092C14.023 6.54589 7 19.4686 6.93115 19.5894L6.70164 20Z" fill="white"></path></svg>						</span>
										<span class="elementor-icon-list-text">Follow up with automated payment reminders</span>
									</li>
						</ul>
				</div>
                <div className='flex'>
                    <img decoding="async" fetchpriority="high" width="400" height="130" src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/Group-20481.svg" class="attachment-full wp-image-1159" alt=""></img>
                    <section ref={sectionRef} className=" flex items-center justify-center ">
                        <h1 className="text-6xl font-extrabold text-white-600">
                        {startCount ? <CountUp end={targetNumber} duration={2.5} /> : 0}
                        +users
                        </h1>
                    </section>

                </div>


				</div>
                    </div>
                    
                </div>

                

                <div>
                <img decoding="async" width="783" height="600" src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/12/hello.png" class="attachment-full size-full wp-image-1582" alt="" srcset="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/12/hello.png 783w, https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/12/hello-300x252.png 300w, https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/12/hello-768x645.png 768w, https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/12/hello-600x504.png 600w" sizes="(max-width: 783px) 100vw, 783px"/>
                </div>

            </div>

            {/* Overlay for better text visibility */}
            {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

            {/* Content with left alignment */}
            {/* <div className="relative flex flex-col items-start justify-center text-white text-left ml-10 p-8 w-1/2">
                <h1 className="text-4xl md:text-6xl font-bold animate__animated animate__fadeInDown transition duration-300"
                    style={{
                        background: 'linear-gradient(to right, #FF6F20, #3B82F6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                    }}>
                    Welcome to Smart Billing System
                </h1>
                <p className="mt-4 text-lg md:text-xl animate__animated animate__fadeInUp transition duration-300 shadow-md"
                    style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                    }}>
                    It is the solution to many problems
                </p>
                <button className="mt-6 px-6 py-2 bg-blue-600 rounded hover:bg-blue-500 transition duration-300 animate__animated animate__bounceIn">
                    Learn More
                </button>
            </div> */}

            {/* Images on the right */}
            {/* <div className="relative flex flex-col items-center justify-center w-1/2 p-4">
                <img
                    src={Front1}
                    alt="Image 1"
                    className="mb-2 mr-36 w-60 rounded shadow-lg transition-transform duration-300 transform hover:scale-105"
                />
                <img
                    src={Front2}
                    alt="Image 2"
                    className="mb-2 h-44 w-60 rounded shadow-lg transition-transform duration-300 transform hover:scale-105 translate-x-20"
                />
                <img
                    src={Front3}
                    alt="Image 3"
                    className="w-60 mr-36 rounded shadow-lg transition-transform duration-300 transform hover:scale-105"
                />
            </div> */}
        </div>
    );
};

export default HeroSection;