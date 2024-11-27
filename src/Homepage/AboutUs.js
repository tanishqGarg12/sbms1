import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen py-10">
            {/* About Us Section with Background */}
            <motion.div 
                className="max-w-7xl w-full bg-cover bg-center rounded-lg shadow-lg p-8 mb-10"
                style={{ backgroundImage: 'url("https://www.shutterstock.com/image-vector/payment-approved-online-card-concept-260nw-2133510943.jpg")' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-5xl font-bold text-center text-black mb-8">About Us - Smart Billing and Invoice</h1>
                <motion.p 
                    className="text-2xl text-black mb-6"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Smart Billing and Invoice is a revolutionary platform designed to streamline and automate your business's billing and invoicing process. 
                    Whether you're a freelancer, small business owner, or part of a large enterprise, our goal is to save you time and reduce manual errors in your billing systems.
                </motion.p>
            </motion.div>

            {/* Why Choose Us Section with Larger Font and Background */}
            <motion.div 
                className="flex justify-between items-center w-full max-w-7xl bg-gradient-to-r from-blue-500 to-blue-400 p-12 rounded-lg shadow-lg mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="w-1/2 text-white text-5xl font-extrabold">Why Choose Us?</div>
                <div className="w-1/2 text-white text-xl">
                    <ul className="list-disc ml-6 space-y-4">
                        <li><strong>Automated Invoicing:</strong> No more manual entry, saving you time and reducing human error.</li>
                        <li><strong>Real-Time Reporting:</strong> Get insights into your business’s financial health with detailed reports.</li>
                        <li><strong>Seamless Integrations:</strong> Easily sync with your accounting software to keep your workflows streamlined.</li>
                        <li><strong>Customizable Features:</strong> Tailor invoices, reports, and notifications to meet your business’s needs.</li>
                        <li><strong>24/7 Customer Support:</strong> Get the help you need, whenever you need it.</li>
                    </ul>
                </div>
            </motion.div>

            {/* Vision, Mission, and More */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
                    <img src="https://th.bing.com/th/id/OIP.w9IqSSCVtOjz7dvhjPFEuAHaF1?w=233&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Vision" className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
                    <p className="text-white">
                        To be the leading platform that empowers businesses of all sizes by providing seamless and efficient billing and invoicing solutions, 
                        ultimately allowing them to focus on growth and innovation.
                    </p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-400 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
                    <img src="https://th.bing.com/th/id/OIP.toqwLGu6IAe7RtQMStCPbAHaDm?w=337&h=169&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Mission" className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
                    <p className="text-white">
                        To simplify and automate the invoicing process for businesses by providing an intuitive, easy-to-use platform that reduces human error 
                        and enhances operational efficiency, saving time and increasing productivity.
                    </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
                    <img src="https://th.bing.com/th/id/OIP.SK3lPi1TbJmFbkH_2aFAWgHaHa?w=150&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Services" className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-semibold text-white mb-4">Our Services</h2>
                    <p className="text-white">
                        From automated invoicing to real-time reporting, our services are designed to make billing and invoicing easier and more efficient.
                    </p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-400 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
                    <img src="https://th.bing.com/th/id/OIP.dwhcKMV8xXblGRrckOjE3wHaD4?w=89&h=89&c=1&rs=1&qlt=90&r=0&dpr=1.3&pid=InlineBlock" alt="Technology" className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-semibold text-white mb-4">Our Technology</h2>
                    <p className="text-white">
                        We leverage the latest technology to build secure, reliable, and scalable billing solutions. Our platform integrates seamlessly with your existing systems.
                    </p>
                </div>
            </motion.div>

            {/* Services Section with Lighter Colors and Larger Font */}
            <motion.div 
                className="text-center mt-10 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <h2 className="text-5xl font-semibold text-blue-600 mb-6">Services We Provide</h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    {/* Light Blue Box */}
                    <div className="bg-blue-100 shadow-xl rounded-lg p-8 text-center hover:shadow-2xl transition duration-300 ease-in-out">
                        <img src="https://img.freepik.com/free-vector/isometric-online-shopping-composition_23-2147686010.jpg" alt="Invoicing" className="w-24 h-24 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-blue-600 mb-3">Automated Invoicing</h3>
                        <p className="text-blue-600 text-lg">
                            Say goodbye to manual invoicing. Our platform automatically generates and sends invoices, saving you time and reducing errors.
                        </p>
                    </div>

                    {/* Light Green Box */}
                    <div className="bg-green-100 shadow-xl rounded-lg p-8 text-center hover:shadow-2xl transition duration-300 ease-in-out">
                        <img src="https://www.actian.com/wp-content/uploads/2023/11/AV21-B.jpg" alt="Reporting" className="w-24 h-24 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-green-600 mb-3">Real-Time Reporting</h3>
                        <p className="text-green-600 text-lg">
                            Track your financial health in real time. Our platform provides detailed reports to give you insights into your business performance.
                        </p>
                    </div>

                    {/* Light Yellow Box */}
                    <div className="bg-yellow-100 shadow-xl rounded-lg p-8 text-center hover:shadow-2xl transition duration-300 ease-in-out">
                        <img src="https://miro.medium.com/v2/resize:fit:1400/1*FSlfq2qzSbXQFQct8gE1wQ.jpeg" alt="Integration" className="w-24 h-24 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-yellow-600 mb-3">Seamless Integration</h3>
                        <p className="text-yellow-600 text-lg">
                            Integrate effortlessly with your existing accounting systems. We provide flexible API solutions to streamline your workflows.
                        </p>
                    </div>

                    {/* Light Purple Box */}
                    <div className="bg-purple-100 shadow-xl rounded-lg p-8 text-center hover:shadow-2xl transition duration-300 ease-in-out">
                        <img src="https://th.bing.com/th/id/OIP.W8NoEK2JYVB1x9lwZlzXVQHaHa?w=213&h=213&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Support" className="w-24 h-24 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-purple-600 mb-3">24/7 Support</h3>
                        <p className="text-purple-600 text-lg">
                            Our support team is available around the clock to assist you with any inquiries or issues you may encounter.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AboutUs;