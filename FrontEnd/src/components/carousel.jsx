// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
//import fondo from "../assets/img.png"
import carrusel1 from "../assets/carrusel1.png"
import carrusel2 from "../assets/carrusel2.png"
import carrusel3 from "../assets/carusel3.png"

const CarouselDefault = () => {
  const images = [
    carrusel2,
    carrusel1,
    carrusel3,
    'https://via.placeholder.com/800x400?text=Slide+4',
  ];
 
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-64 overflow-hidden">
      <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img src={image} alt={`Slide ${index}`} className="w-full h-64 object-cover" />
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2">
        &#10094;
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2">
        &#10095;
      </button>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-700' : 'bg-gray-300'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselDefault;
