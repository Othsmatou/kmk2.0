import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  ShowerHead as Shower, 
  Droplets, 
  Flame, 
  Building2, 
  PaintBucket,
  Phone,
  Mail,
  Clock,
  
} from 'lucide-react';

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const images = [
    "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1482731215275-a1f151646268?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  ];

  useEffect(() => {
    // Preload images
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoading(false);
    });

    // Set up carousel interval
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const [servicesInView, setServicesInView] = useState(false);
  const [aboutInView, setAboutInView] = useState(false);

  useEffect(() => {
    const servicesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setServicesInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAboutInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const servicesSection = document.getElementById('services');
    const aboutSection = document.getElementById('about');
    
    if (servicesSection) servicesObserver.observe(servicesSection);
    if (aboutSection) aboutObserver.observe(aboutSection);

    return () => {
      if (servicesSection) servicesObserver.unobserve(servicesSection);
      if (aboutSection) aboutObserver.unobserve(aboutSection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Carousel images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              currentImageIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${image}")`,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
          <nav className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <img src="https://github.com/Othsmatou/kmk2.0/blob/main/src/logo.png?raw=true" alt="KMK VVS Logo" className="h-12 w-auto" />
              <div className="hidden md:flex space-x-8 text-white">
              <a 
                href="#about" 
                className="hover:text-blue-400 transition"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                About
              </a>
              <a 
                href="#services" 
                className="hover:text-blue-400 transition"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Services
              </a>
              <a 
                href="#contact" 
                className="hover:text-blue-400 transition"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </a>
              </div>
            </div>
          </nav>
          
          <div className="container mx-auto px-6 h-[calc(100vh-200px)] flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Professional Plumbing & Installation Services
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Your trusted partner for all plumbing, heating, and renovation needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition text-lg"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Our Services
                </button>
                <button 
                  className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition text-lg"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
          
          {/* Carousel indicators */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>

        
        </div>
      </div>

      {/* About Us Section */}
      <div id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80" 
                alt="KMK VVS Team"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-blue-600 text-white px-6 py-4 rounded-lg inline-block">
                  <p className="text-2xl font-bold">15+ Years of Excellence</p>
                </div>
              </div>
            </div>
            <div 
              className="lg:pl-12"
              style={{
                opacity: aboutInView ? 1 : 0,
                transform: aboutInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease-out'
              }}
            >
              <h2 className="text-4xl font-bold mb-6">About KMK VVS</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Since our establishment, KMK VVS has been at the forefront of providing exceptional plumbing and installation services across the region. Our commitment to quality, reliability, and customer satisfaction has made us a trusted name in the industry.
              </p>
              <div 
                className="grid grid-cols-2 gap-6 mb-8"
                style={{
                  opacity: aboutInView ? 1 : 0,
                  transform: aboutInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease-out',
                  transitionDelay: `${100}ms`
                }}
              >
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-3xl font-bold text-blue-600">2000+</p>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-3xl font-bold text-blue-600">98%</p>
                  <p className="text-gray-600">Client Satisfaction</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-3xl font-bold text-blue-600">24/7</p>
                  <p className="text-gray-600">Emergency Service</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-3xl font-bold text-blue-600">15+</p>
                  <p className="text-gray-600">Years Experience</p>
                </div>
              </div>
              <p 
                className="text-gray-600 text-lg"
                style={{
                  opacity: aboutInView ? 1 : 0,
                  transform: aboutInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease-out',
                  transitionDelay: `${200}ms`
                }}
              >
                Our team of certified professionals brings expertise, dedication, and innovative solutions to every project, ensuring that your plumbing and installation needs are met with the highest standards of workmanship.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for all your plumbing needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Wrench className="w-12 h-12 text-blue-600" />, title: 'Plumbing Tasks', description: 'Expert solutions for all your plumbing needs, from repairs to maintenance.' },
              { icon: <Shower className="w-12 h-12 text-blue-600" />, title: 'Bathroom Installation', description: 'Complete bathroom renovation and installation services.' },
              { icon: <Droplets className="w-12 h-12 text-blue-600" />, title: 'Water Treatment', description: 'Professional water treatment solutions for clean and safe water.' },
              { icon: <Flame className="w-12 h-12 text-blue-600" />, title: 'Heat Sources', description: 'Installation and maintenance of heating systems.' },
              { icon: <Building2 className="w-12 h-12 text-blue-600" />, title: 'New Construction', description: 'Complete plumbing solutions for new construction projects.' },
              { icon: <PaintBucket className="w-12 h-12 text-blue-600" />, title: 'Renovation Tasks', description: 'Professional renovation services for your property.' },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-out"
                style={{
                  opacity: servicesInView ? 1 : 0,
                  transform: servicesInView ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose KMK VVS?</h2>
              <div className="space-y-6">
                {[
                  { title: 'Expert Team', description: 'Highly skilled and certified professionals' },
                  { title: 'Quality Service', description: 'Premium quality work with attention to detail' },
                  { title: '24/7 Support', description: 'Round-the-clock emergency service available' },
                  { title: 'Competitive Pricing', description: 'Fair and transparent pricing for all services' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-600 flex-shrink-0 mt-1"></div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80" 
                alt="Modern luxury bathroom"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
              <p className="text-gray-400 mb-8">
                Get in touch with us for all your plumbing and installation needs. We're here to help!
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4" />
                  <span>+46 123 456 789</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4" />
                  <span>info@kmkvvs.com</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-4" />
                  <span>Mon - Fri: 8:00 - 17:00</span>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                ></textarea>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2024 KMK VVS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
