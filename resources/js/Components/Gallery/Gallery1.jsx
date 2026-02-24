import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';

// Configure axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

// Get CSRF token from the meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (csrfToken) axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

const BASE_URL = window.location.origin;

const Gallery1 = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  
  const galleryRef = useRef(null);
  const itemRefs = useRef([]);

  // Default category images (fallbacks)
  const categoryImages = {
    all: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=center',
    island: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop&crop=center',
    rooms: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop&crop=center',
    winedine : 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=200&h=200&fit=crop&crop=center',
    experience: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center',
    wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=200&fit=crop&crop=center',
    portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=center',
    nature: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop&crop=center'
  };

  // Fetch gallery images from backend
  const fetchGalleryImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/mygallery`, {
        headers: { Accept: 'application/json' }
      });
      
      console.log('API Response:', response.data); // Debug log
      
      const images = response.data.data || [];
      setGalleryItems(images);
      
      // Generate categories from the data
      generateCategories(images);
      
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  // Generate categories from gallery items
  const generateCategories = (images) => {
    if (!images || images.length === 0) {
      // If no images, at least show the "All" category
      setCategories([{
        id: 'all',
        name: 'All',
        image: categoryImages.all
      }]);
      return;
    }

    // Get unique categories (filter out null/undefined/empty)
    const uniqueCategories = ['all'];
    const categorySet = new Set();
    
    images.forEach(img => {
      if (img.category && img.category.trim() !== '') {
        categorySet.add(img.category.trim());
      }
    });
    
    // Add unique categories to the array
    uniqueCategories.push(...Array.from(categorySet));
    
    console.log('Unique categories:', uniqueCategories); // Debug log

    // Create category objects with images
    const categoryObjects = uniqueCategories.map(catId => {
      if (catId === 'all') {
        return {
          id: 'all',
          name: 'All',
          image: categoryImages.all
        };
      }
      
      // Try to find an image from this category to use as thumbnail
      const categoryImage = images.find(img => 
        img.category && img.category.toLowerCase() === catId.toLowerCase()
      );
      
      // Format category name (capitalize first letter of each word)
      const formattedName = catId
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      // Get image URL or use default based on category
      let imageUrl = categoryImage?.image_url;
      
      // If no image found for this category, use default from categoryImages or placeholder
      if (!imageUrl) {
        const categoryKey = catId.toLowerCase().replace(/\s+/g, '');
        imageUrl = categoryImages[categoryKey] || 
                  categoryImages[catId.toLowerCase()] || 
                  `https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=${formattedName}`;
      }
      
      return {
        id: catId,
        name: formattedName,
        image: imageUrl
      };
    });
    
    console.log('Generated categories:', categoryObjects); // Debug log
    setCategories(categoryObjects);
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

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
        opacity: 1,
        duration: 0.3,
        onComplete: () => setEnlargedImage(null)
      });
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeEnlarged();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [enlargedImage]);

  // Initial animation
  useEffect(() => {
    if (!loading && galleryItems.length > 0 && categories.length > 0) {
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
        if (initialItems.length > 0) {
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
        }
      }, 100);
    }
  }, [loading, galleryItems, categories]);

  const filteredItems = galleryItems.filter(item => 
    activeCategory === 'all' || (item.category && item.category.toLowerCase() === activeCategory.toLowerCase())
  );

  // Update refs array when filtered items change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, filteredItems.length);
  }, [filteredItems]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Loading gallery...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h4 className="text-2xl text-gray-800 mb-2">Oops! Something went wrong</h4>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchGalleryImages}
            className="px-6 py-3 bg-blue-500 text-white  hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h3 className='text-4xl md:text-5xl font-light text-center text-gray-800 mb-12'>
          Stella Island Photo Gallery
        </h3>
        
        {/* Category Navigation - Always show if there are categories */}
        {categories.length > 0 && (
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
        )}

        {/* Gallery Grid */}
        {galleryItems.length > 0 ? (
          <>
            <div 
              ref={galleryRef}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  ref={el => itemRefs.current[index] = el}
                  onClick={() => handleImageClick(item)}
                  className="relative aspect-square overflow-hidden cursor-pointer group gallery-item  shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img
                    src={item.image_url}
                    alt={item.alt_text || item.title || `Gallery ${item.category}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/750x750/CCCCCC/FFFFFF?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 uppercase tracking-wider">
                      {item.category || 'Uncategorized'}
                    </span>
                  </div>
                  {item.title && (
                    <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <p className="text-white text-sm font-medium truncate">{item.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Empty filtered state */}
            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h4 className="text-2xl text-gray-600 mb-2">No Images in this Category</h4>
                <p className="text-gray-500">Try selecting a different category</p>
              </div>
            )}
          </>
        ) : (
          // Empty state
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📷</div>
            <h4 className="text-2xl text-gray-600 mb-2">No Images Found</h4>
            <p className="text-gray-500">The gallery is currently empty</p>
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
                  src={enlargedImage.image_url}
                  alt={enlargedImage.alt_text || enlargedImage.title || 'Enlarged view'}
                  className="w-full h-full object-contain shadow-2xl"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/1200x800/CCCCCC/FFFFFF?text=Image+Not+Found';
                  }}
                />
                <button
                  onClick={closeEnlarged}
                  className="absolute top-4 right-4 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg backdrop-blur-sm"
                  aria-label="Close"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-between items-end gap-4">
                  <div className="bg-black/60 backdrop-blur-sm p-4  max-w-md">
                    {enlargedImage.title && (
                      <p className="text-xl font-semibold text-white mb-1">
                        {enlargedImage.title}
                      </p>
                    )}
                    <p className="text-sm text-gray-300 capitalize">
                      Category: {enlargedImage.category || 'Uncategorized'}
                    </p>
                    {enlargedImage.alt_text && (
                      <p className="text-sm text-gray-400 mt-2">
                        {enlargedImage.alt_text}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={closeEnlarged}
                      className="px-4 py-2 bg-black/60 backdrop-blur-sm text-white  hover:bg-black/80 transition-colors text-sm"
                    >
                      Close (ESC)
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