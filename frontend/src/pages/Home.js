import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPaintRoller, 
  FaUtensils, 
  FaBath, 
  FaLightbulb, 
  FaShieldAlt, 
  FaChartLine,
  FaHome,
  FaTools
} from 'react-icons/fa';

const Home = () => {
  const features = [
    { icon: FaPaintRoller, title: 'Smart Improvements', desc: 'Curated home improvement ideas tailored for Indian homes' },
    { icon: FaChartLine, title: 'ROI Calculator', desc: 'Calculate the return on investment for each improvement' },
    { icon: FaUtensils, title: 'Room-wise Planning', desc: 'Get recommendations based on specific rooms' },
    { icon: FaBath, title: 'Modern Upgrades', desc: 'Stay ahead with modern home upgrade suggestions' },
    { icon: FaLightbulb, title: 'Expert Tips', desc: 'Professional insights for better decision making' },
    { icon: FaShieldAlt, title: 'Value Protection', desc: 'Make improvements that protect and increase home value' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Maximize Your Home's Value
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover smart home improvements that deliver the highest ROI. 
              Make data-driven decisions to increase your property value.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/improvements" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
                Explore Improvements
              </Link>
              <Link to="/register" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose HomeValor?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make informed decisions about your home improvements with our comprehensive platform
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-6 text-center hover:transform hover:scale-105 transition">
              <feature.icon className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Improvement Ideas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">₹50K+</div>
              <div className="text-gray-600">Average Value Added</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Homeowners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
