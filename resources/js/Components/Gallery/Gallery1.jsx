import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Gallery1 = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const galleryRef = useRef(null);
  const itemRefs = useRef([]);

  // Fixed categories with reliable image sources
  const categories = [
    { 
      id: 'all', 
      name: 'All', 
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=center'  // Generic travel/beach image
    },
    { 
      id: 'island', 
      name: 'The Island', 
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop&crop=center'  // Island/tropical image
    },
    { 
      id: 'rooms', 
      name: 'Rooms', 
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop&crop=center'  // Hotel room image
    },
    { 
      id: 'wine', 
      name: 'Wine & Dine', 
      image: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=200&h=200&fit=crop&crop=center'  // Wine/dining image
    },
    { 
      id: 'experience', 
      name: 'Experience', 
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center'  // Experience/activity image
    },
  ];

  const galleryItems = [
    { id: 1, category: 'island', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=750&h=750&fit=crop' },
    { id: 2, category: 'rooms', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=750&h=750&fit=crop' },
    { id: 3, category: 'wine', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=750&h=750&fit=crop' },
    { id: 4, category: 'experience', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=750&h=750&fit=crop' },
    { id: 5, category: 'island', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=750&h=750&fit=crop' },
    { id: 6, category: 'rooms', image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=750&h=750&fit=crop' },
    { id: 7, category: 'wine', image: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=750&h=750&fit=crop' },
    { id: 8, category: 'experience', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=750&h=750&fit=crop' },
    { id: 9, category: 'island', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=750&h=750&fit=crop' },
    { id: 10, category: 'rooms', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=750&h=750&fit=crop' },
    { id: 11, category: 'wine', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=750&h=750&fit=crop' },
    { id: 12, category: 'experience', image: 'https://images.unsplash.com/photo-1519677100203-4f3c1f0f8c5c?w=750&h=750&fit=crop' },
  ];

  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    animateCategoryChange(categoryId);
  };

  const animateCategoryChange = (categoryId) => {
    const currentItems = itemRefs.current.filter(ref => ref);
    
    gsap.to(currentItems, {
      opacity: 1,
      scale: 0.8,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setTimeout(() => {
          const newItems = itemRefs.current.filter(ref => ref);
          gsap.fromTo(newItems, 
            { opacity: 1, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.7)"
            }
          );
        }, 50);
      }
    });
  };

  const handleImageClick = (item) => {
    if (enlargedImage?.id === item.id) {
      gsap.to(`#enlarged-${item.id}`, {
        scale: 0,
        opacity: 1,
        duration: 0.3,
        onComplete: () => setEnlargedImage(null)
      });
    } else {
      setEnlargedImage(item);
      setTimeout(() => {
        gsap.fromTo(`#enlarged-${item.id}`, 
          { scale: 0, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
        );
      }, 10);
    }
  };

  const closeEnlarged = () => {
    if (enlargedImage) {
      gsap.to(`#enlarged-${enlargedImage.id}`, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: () => setEnlargedImage(null)
      });
    }
  };

  useEffect(() => {
    gsap.from('.category-item', {
      y: 20,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.3,
      ease: "back.out(1.7)"
    });

    setTimeout(() => {
      const initialItems = itemRefs.current.filter(ref => ref);
      gsap.fromTo(initialItems, 
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.5,
          ease: "back.out(1.7)"
        }
      );
    }, 100);
  }, []);

  const filteredItems = galleryItems.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, filteredItems.length);
  }, [filteredItems]);

  return (
    <>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h3 className='text-4xl md:text-5xl font-light text-center text-gray-800 mb-12'>
          Stella Island Photo Gallery
        </h3>
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`category-item flex flex-col items-center transition-all duration-300 transform ${
                activeCategory === category.id 
                  ? 'opacity-100 scale-105' 
                  : 'opacity-70 hover:opacity-90 hover:scale-105'
              }`}
            >
              <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition-all duration-300 shadow-lg ${
                activeCategory === category.id 
                  ? 'border-blue-500 shadow-blue-200' 
                  : 'border-gray-300 hover:border-blue-300'
              }`}>
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  src={category.image} 
                  alt={category.name}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = `https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=${category.name}`;
                  }}
                />
              </div>
              <p className={`mt-3 text-sm md:text-base font-medium transition-colors duration-300 ${
                activeCategory === category.id 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-600'
              }`}>
                {category.name}
              </p>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div 
          ref={galleryRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={el => itemRefs.current[index] = el}
              onClick={() => handleImageClick(item)}
              className="relative aspect-square overflow-hidden cursor-pointer group gallery-item"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <img
                src={item.image}
                alt={`Gallery ${item.category}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📷</div>
            <h4 className="text-2xl text-gray-600 mb-2">No Images Found</h4>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}

        {/* Enlarged Image Modal */}
        {enlargedImage && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeEnlarged}
          >
            <div 
              id={`enlarged-${enlargedImage.id}`}
              className="relative max-w-6xl max-h-[90vh] w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video md:aspect-auto md:h-[85vh]">
                <img
                  src={enlargedImage.image}
                  alt="Enlarged view"
                  className="w-full h-full object-contain shadow-2xl"
                />
                <button
                  onClick={closeEnlarged}
                  className="absolute top-4 right-4 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg backdrop-blur-sm"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="bg-black/60 backdrop-blur-sm p-4 max-w-md">
                    <p className="text-xl font-semibold text-white capitalize mb-1">
                      {enlargedImage.category}
                    </p>
                    <p className="text-sm text-gray-300">
                      Image #{enlargedImage.id} • Click outside or press ESC to close
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery1;