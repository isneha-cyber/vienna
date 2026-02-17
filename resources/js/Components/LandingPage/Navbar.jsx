// import {useState, useEffect} from 'react';
// import {Menu, X, User, Cloud} from 'lucide-react';
// import { Link } from '@inertiajs/react';

// export default function Navbar({ 
//   textColor = 'white',
//   defaultScrolledColor = 'white' 
// }) {
// 	const [isMenuOpen, setIsMenuOpen] = useState(false);
// 	const [isScrolled, setIsScrolled] = useState(false);
// 	const [isAnimating, setIsAnimating] = useState(false);

// 	// Calculate text color based on scroll state and props
// 	const getTextColor = () => {
// 		if (isScrolled) {
// 			return 'black';
// 		} else {
// 			return textColor;
// 		}
// 	};
	
// 	const currentTextColor = getTextColor();
	
// 	// Close menu on resize (for better UX)
// 	useEffect(() => {
// 		const handleResize = () => {
// 			if (window.innerWidth >= 768) {
// 				closeMenu();
// 			}
// 		};

// 		window.addEventListener('resize', handleResize);
// 		return() => window.removeEventListener('resize', handleResize);
// 	}, []);

// 	// Handle scroll for navbar background
// 	useEffect(() => {
// 		const handleScroll = () => {
// 			setIsScrolled(window.scrollY > 10);
// 		};

// 		window.addEventListener('scroll', handleScroll);
// 		return() => window.removeEventListener('scroll', handleScroll);
// 	}, []);

// 	// Toggle menu with smooth animation
// 	const toggleMenu = () => {
// 		if (!isMenuOpen) {
// 			openMenu();
// 		} else {
// 			closeMenu();
// 		}
// 	};

// 	const openMenu = () => {
// 		setIsAnimating(true);
// 		setIsMenuOpen(true);
// 		document.body.style.overflow = 'hidden';
// 	};

// 	const closeMenu = () => {
// 		setIsAnimating(false);
// 		setTimeout(() => {
// 			setIsMenuOpen(false);
// 			document.body.style.overflow = 'unset';
// 		}, 800); // Match the longest animation duration
// 	};

// 	// Handle link click
// 	const handleLinkClick = () => {
// 		setIsAnimating(false);
// 		setTimeout(() => {
// 			setIsMenuOpen(false);
// 			document.body.style.overflow = 'unset';
// 		}, 800);
// 	};
	

// 	const navItems = [
// 		{ num: '01', label: 'About', href: '/about' },
// 		{ num: '02', label: 'Accommodation', href: '/accomodation' },
// 		{ num: '03', label: 'Wine & Dine', href: '/winedine' },
// 		{ num: '04', label: 'Wellness', href: '/wellness' },
// 		{ num: '05', label: 'Celebrate', href: '/celebrate' },
// 		{ num: '06', label: 'Crete', href: '/crete' },
// 		{ num: '07', label: 'Experiences', href: '/experiences' },
// 		{ num: '08', label: 'Gallery', href: '/gallery' },
// 		{ num: '09', label: 'Career', href: '/career' },
// 		{ num: '10', label: 'Loyalty Circle', href: '/loyalty' },
// 		{ num: '11', label: 'Gift Cards', href: '/gifts' },
// 		{ num: '12', label: 'Contact Us', href: '/contact' }
// 	];

// 	const hotels = [
// 		{ name: 'Stella Island', description: 'Luxury Resort & Spa', active: true },
// 		{ name: 'Stella Rocca A Mare', description: 'Santorini' },
// 		{ name: 'Stella Palace', description: 'Aqua Park Resort' },
// 		{ name: 'Stella Village', description: 'Seaside Resort' },
// 		{ name: 'Stella Blue', description: 'Seaside Resort' }
// 	];

// 	return (
// 		<>
// 			{/* Navbar */}
// 			<nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 sm:px-12  ${
// 				isScrolled ? 'bg-white ' : 'bg-transparent'
// 			}`}>
// 				<div className=" sm:px-8 px-3">
// 					<div className="flex items-center justify-between h-14 md:h-24">
// 						{/* Left Section - Menu & Weather */}
// 						<div className="flex items-center gap-3 md:gap-6">
// 							{/* Hamburger Menu */}
// 							<button onClick={toggleMenu}
// 								className={`transition-all duration-500 p-1.5 md:p-2 ${
// 									currentTextColor === 'black' 
// 										? 'text-black hover:text-gray-700' 
// 										: 'text-white hover:text-gray-200'
// 								}`}
// 								aria-label="Toggle menu">
// 								{isMenuOpen ? (
// 									<X className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-700 ${currentTextColor === 'black' ? 'text-black' : 'text-white'}`} />
// 								) : (
// 									<img 
// 										className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-700 ${
// 											currentTextColor === 'black' 
// 												? 'filter brightness-0' 
// 												: 'filter brightness-0 invert'
// 										}`} 
// 										src="/images/hambar.png" 
// 										alt="hamburger" 
// 									/>
// 								)}
// 							</button>

// 							{/* Weather Info - Desktop Only */}
// 							<div className={`hidden md:flex items-center gap-2 text-sm ${
// 								currentTextColor === 'black' ? 'text-black' : 'text-white'
// 							}`}>
// 								<span className="uppercase tracking-wide font-medium">CRETE,</span>
// 								<span className="font-light">16°</span>
// 								<Cloud className={`w-5 h-5 ml-1 ${
// 									currentTextColor === 'black' ? 'text-black' : 'text-white'
// 								}`} />
// 							</div>
// 						</div>

// 						{/* Center Section - Logo */}
// 						<div className="absolute left-1/2 transform -translate-x-1/2">
// 							<div className="text-center">
// 								<Link href="/">
// 								<h2 className={`text-lg sm:text-xl md:text-2xl lg:text-5xl whitespace-nowrap tracking-wider md:tracking-widest transition-all duration-500 ${
// 									currentTextColor === 'black' ? 'text-black' : 'text-white'
// 								}`}>
// 									Stella Island
// 								</h2>
// 								</Link>
// 							</div>
// 						</div>

// 						{/* Right Section - User Icon & Book Now */}
// 						<div className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
// 							{/* User Icon - Hide on smallest screens */}
// 							<button className={` transition-all duration-500 p-1.5 md:p-2 ${
// 								currentTextColor === 'black' 
// 									? 'text-black hover:text-gray-700' 
// 									: 'text-white hover:text-gray-200'
// 							}`} aria-label="User account">
// 								<img  
// 									className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
// 										currentTextColor === 'black' 
// 											? 'filter brightness-0' 
// 											: 'filter brightness-0 invert'
// 									}`} 
// 									src="/images/lock.png" 
// 									alt="User account" 
// 								/>
// 							</button>

// 							{/* Book Now Button */}
// 							<button className={`border-b border-t px-2 py-1 md:px-4 md:py-1.5 lg:px-6 lg:py-2.5 text-xs sm:text-sm md:text-base tracking-wider md:tracking-widest transition-all duration-500 uppercase font-medium whitespace-nowrap ${
// 								currentTextColor === 'black' 
// 									? 'border-black text-black hover:bg-black hover:text-white' 
// 									: 'border-white text-white hover:bg-white hover:text-gray-900'
// 							}`}>
// 								<span className="hidden xs:inline">Book Now</span>
// 								<span className="xs:hidden">Book</span>
// 							</button>
// 						</div> 
// 					</div>

// 					{/* Mobile Weather (below navbar) */}
// 					<div className={`md:hidden flex items-center justify-center gap-2 text-xs sm:text-sm pb-3 transition-all duration-500 ${
// 						currentTextColor === 'black' ? 'text-black' : 'text-white'
// 					}`}>
// 						<span className="uppercase tracking-wide font-medium">CRETE,</span>
// 						<span className="font-light">16°</span>
// 						<Cloud className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 ${
// 							currentTextColor === 'black' ? 'text-black' : 'text-white'
// 						}`} />
// 					</div>
// 				</div>

// 				{/* Fullscreen Menu Overlay */}
// 				<div className={`fixed inset-0 z-50 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
// 					isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible delay-500'
// 				}`}>
// 					{/* Background Overlay */}
// 					<div className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
// 						isMenuOpen ? 'bg-black/95' : 'bg-black/0'
// 					}`}></div>

// 					{/* Menu Content Container */}
// 					<div className={`relative h-full flex flex-col md:flex-row overflow-y-auto transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
// 						isMenuOpen ? 'translate-y-0' : '-translate-y-full'
// 					} pt-14 sm:pt-16 md:pt-0`}>
// 						{/* Close Button */}
// 						<button onClick={toggleMenu}
// 							className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 text-white hover:text-gray-300 transition-all duration-500 z-10"
// 							aria-label="Close menu">
// 							<X className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10"/>
// 						</button>

// 						{/* Left Side - Hotel Collection */}
// 						<div className={`w-full md:w-1/3 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center md:border-r bg-white transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] delay-150 ${
// 							isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
// 						}`}>
// 							<div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
// 								<div className={`transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] delay-300 ${
// 									isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
// 								}`}>
// 									<h2 className="text-black text-xl sm:text-2xl md:text-3xl font-light font-serif">
// 										Stella Island
// 									</h2>
// 								</div>

// 								<div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
// 									{hotels.map((hotel, index) => (
// 										<div key={index}
// 											className={`border-l-2 pl-3 sm:pl-4 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
// 												hotel.active ? 'border-black' : 'border-transparent hover:border-black/50'
// 											} ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
// 											style={{ transitionDelay: `${index * 150 + 400}ms` }}>
// 											<h4 className="text-black text-base sm:text-lg md:text-xl font-light mb-1 font-serif">
// 												{hotel.name}
// 											</h4>
// 											<p className="text-black/70 text-xs tracking-wider uppercase">
// 												{hotel.description}
// 											</p>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 						</div>

// 						{/* Right Side - Main Navigation */}
// 						<div className={`flex-1 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] delay-150 ${
// 							isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
// 						}`} style={{backgroundImage:'url("/images/img2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
							
// 							{/* Logo for Mobile */}
// 							<div className={`md:hidden mb-6 sm:mb-8 text-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] delay-300 ${
// 								isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
// 							}`}>
// 								<h2 className="text-white text-xl sm:text-2xl font-light font-serif">Stella Island</h2>
// 							</div>

// 							{/* Navigation Items - Responsive Grid */}
// 							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4 md:gap-y-5 lg:gap-y-6 max-w-6xl mx-auto">
// 								{navItems.map((item, index) => (
// 									<Link key={item.num}
// 										href={item.href}
// 										className="flex items-start gap-2 sm:gap-3 text-white hover:text-gray-300 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] group"
// 										onClick={handleLinkClick}>
// 										<span className={`text-white text-xs sm:text-sm md:text-base font-light w-5 sm:w-6 md:w-8 flex-shrink-0 ${
// 											isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
// 										}`}
// 										style={{ transitionDelay: `${index * 80 + 400}ms` }}>
// 											{item.num}
// 										</span>
// 										<span className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light font-serif group-hover:translate-x-2 ${
// 											isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
// 										}`}
// 										style={{ transitionDelay: `${index * 80 + 500}ms` }}>
// 											{item.label}
// 										</span>
// 									</Link>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</nav>
// 		</>
// 	);
// }


import {useState, useEffect} from 'react';
import {Menu, X, User, Cloud} from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Navbar({ 
  textColor = 'white',
  defaultScrolledColor = 'white' 
}) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const getTextColor = () => {
		if (isScrolled) {
			return 'black';
		} else {
			return textColor;
		}
	};
	
	const currentTextColor = getTextColor();
	
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				closeMenu();
			}
		};

		window.addEventListener('resize', handleResize);
		return() => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return() => window.removeEventListener('scroll', handleScroll);
	}, []);

	const toggleMenu = () => {
		if (!isMenuOpen) {
			openMenu();
		} else {
			closeMenu();
		}
	};

	const openMenu = () => {
		setIsAnimating(true);
		setIsMenuOpen(true);
		document.body.style.overflow = 'hidden';
	};

	const closeMenu = () => {
		setIsAnimating(false);
		setTimeout(() => {
			setIsMenuOpen(false);
			document.body.style.overflow = 'unset';
		}, 800);
	};

	const handleLinkClick = () => {
		setIsAnimating(false);
		setTimeout(() => {
			setIsMenuOpen(false);
			document.body.style.overflow = 'unset';
		}, 800);
	};
	
	const navItems = [
		{ num: '01', label: 'About', href: '/about' },
		{ num: '02', label: 'Accommodation', href: '/accomodation' },
		{ num: '03', label: 'Wine & Dine', href: '/winedine' },
		{ num: '04', label: 'Wellness', href: '/wellness' },
		{ num: '05', label: 'Celebrate', href: '/celebrate' },
		{ num: '06', label: 'Crete', href: '/crete' },
		{ num: '07', label: 'Experiences', href: '/experiences' },
		{ num: '08', label: 'Gallery', href: '/gallery' },
		{ num: '09', label: 'Career', href: '/career' },
		{ num: '10', label: 'Loyalty Circle', href: '/loyalty' },
		{ num: '11', label: 'Gift Cards', href: '/gifts' },
		{ num: '12', label: 'Contact Us', href: '/contact' }
	];

	const hotels = [
		{ name: 'Stella Island', description: 'Luxury Resort & Spa', active: true },
		{ name: 'Stella Rocca A Mare', description: 'Santorini' },
		{ name: 'Stella Palace', description: 'Aqua Park Resort' },
		{ name: 'Stella Village', description: 'Seaside Resort' },
		{ name: 'Stella Blue', description: 'Seaside Resort' }
	];

	return (
		<>
			{/* Navbar */}
			<nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 sm:px-12  ${
				isScrolled ? 'bg-white ' : 'bg-transparent'
			}`}>
				<div className=" sm:px-8 px-3">
					<div className="flex items-center justify-between h-14 md:h-24">
						{/* Left Section - Menu & Weather */}
						<div className="flex items-center gap-3 md:gap-6">
							{/* Hamburger Menu */}
							<button onClick={toggleMenu}
								className={`transition-all duration-500 p-1.5 md:p-2 ${
									currentTextColor === 'black' 
										? 'text-black hover:text-gray-700' 
										: 'text-white hover:text-gray-200'
								}`}
								aria-label="Toggle menu">
								{isMenuOpen ? (
									<X className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-700 ${currentTextColor === 'black' ? 'text-black' : 'text-white'}`} />
								) : (
									<img 
										className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-700 ${
											currentTextColor === 'black' 
												? 'filter brightness-0' 
												: 'filter brightness-0 invert'
										}`} 
										src="/images/hambar.png" 
										alt="hamburger" 
									/>
								)}
							</button>

							{/* Weather Info - Desktop Only */}
							<div className={`hidden md:flex items-center gap-2 text-sm ${
								currentTextColor === 'black' ? 'text-black' : 'text-white'
							}`}>
								<span className="uppercase tracking-wide font-medium">CRETE,</span>
								<span className="font-light">16°</span>
								<Cloud className={`w-5 h-5 ml-1 ${
									currentTextColor === 'black' ? 'text-black' : 'text-white'
								}`} />
							</div>
						</div>

						{/* Center Section - Logo */}
						<div className="absolute left-1/2 transform -translate-x-1/2">
							<div className="text-center">
								<Link href="/">
								<h2 className={`text-lg sm:text-xl md:text-2xl lg:text-5xl whitespace-nowrap tracking-wider md:tracking-widest transition-all duration-500 ${
									currentTextColor === 'black' ? 'text-black' : 'text-white'
								}`}>
									Stella Island
								</h2>
								</Link>
							</div>
						</div>

						{/* Right Section - User Icon & Book Now */}
						<div className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
							<button className={` transition-all duration-500 p-1.5 md:p-2 ${
								currentTextColor === 'black' 
									? 'text-black hover:text-gray-700' 
									: 'text-white hover:text-gray-200'
							}`} aria-label="User account">
								<img  
									className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
										currentTextColor === 'black' 
											? 'filter brightness-0' 
											: 'filter brightness-0 invert'
									}`} 
									src="/images/lock.png" 
									alt="User account" 
								/>
							</button>

							{/* Book Now Button */}
							<button className={`border-b border-t px-2 py-1 md:px-4 md:py-1.5 lg:px-6 lg:py-2.5 text-xs sm:text-sm md:text-base tracking-wider md:tracking-widest transition-all duration-500 uppercase font-medium whitespace-nowrap ${
								currentTextColor === 'black' 
									? 'border-black text-black hover:bg-black hover:text-white' 
									: 'border-white text-white hover:bg-white hover:text-gray-900'
							}`}>
								<span className="hidden xs:inline">Book Now</span>
								<span className="xs:hidden">Book</span>
							</button>
						</div> 
					</div>

					{/* Mobile Weather (below navbar) */}
					<div className={`md:hidden flex items-center justify-center gap-2 text-xs sm:text-sm pb-3 transition-all duration-500 ${
						currentTextColor === 'black' ? 'text-black' : 'text-white'
					}`}>
						<span className="uppercase tracking-wide font-medium">CRETE,</span>
						<span className="font-light">16°</span>
						<Cloud className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 ${
							currentTextColor === 'black' ? 'text-black' : 'text-white'
						}`} />
					</div>
				</div>

				{/* Fullscreen Menu Overlay */}
				<div className={`fixed inset-0 z-50 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
					isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible delay-500'
				}`}>
					{/* Background Overlay */}
					<div className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
						isMenuOpen ? 'bg-black/95' : 'bg-black/0'
					}`}></div>

					{/* Menu Content Container */}
					<div className={`relative h-full flex flex-col md:flex-row overflow-y-auto transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
						isMenuOpen ? 'translate-y-0' : '-translate-y-full'
					} pt-14 sm:pt-16 md:pt-0`}>
						{/* Close Button */}
						<button onClick={toggleMenu}
							className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 text-white hover:text-gray-300 transition-all duration-500 z-10"
							aria-label="Close menu">
							<X className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10"/>
						</button>

						{/* Left Side - Hotel Collection */}
						<div className={`w-full md:w-1/3 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center md:border-r bg-white transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] delay-150 ${
							isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
						}`}>
							<div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
								<div className={`transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] delay-300 ${
									isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
								}`}>
									<h2 className="text-black text-xl sm:text-2xl md:text-3xl font-light font-serif">
										Stella Island
									</h2>
								</div>

								<div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
									{hotels.map((hotel, index) => (
										<div key={index}
											className={`border-l-2 pl-3 sm:pl-4 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
												hotel.active ? 'border-black' : 'border-transparent hover:border-black/50'
											} ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
											style={{ transitionDelay: `${index * 150 + 400}ms` }}>
											<h4 className="text-black text-base sm:text-lg md:text-xl font-light mb-1 font-serif">
												{hotel.name}
											</h4>
											<p className="text-black/70 text-xs tracking-wider uppercase">
												{hotel.description}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Right Side - Main Navigation */}
						<div className={`relative flex-1 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] delay-150 ${
							isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
						}`} style={{backgroundImage:'url("/images/img2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
							
							{/* ── BLACK OVERLAY ── */}
							<div className="absolute inset-0 bg-black/60" />

							{/* All content sits above the overlay */}
							<div className="relative z-10 flex flex-col justify-center h-full">
								{/* Logo for Mobile */}
								<div className={`md:hidden mb-6 sm:mb-8 text-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] delay-300 ${
									isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
								}`}>
									<h2 className="text-white text-xl sm:text-2xl font-light font-serif">Stella Island</h2>
								</div>

								{/* Navigation Items - Responsive Grid */}
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4 md:gap-y-5 lg:gap-y-6 max-w-6xl mx-auto">
									{navItems.map((item, index) => (
										<Link key={item.num}
											href={item.href}
											className="flex items-start gap-2 sm:gap-3 text-white hover:text-gray-300 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] group"
											onClick={handleLinkClick}>
											<span className={`text-white text-xs sm:text-sm md:text-base font-light w-5 sm:w-6 md:w-8 flex-shrink-0 ${
												isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
											}`}
											style={{ transitionDelay: `${index * 80 + 400}ms` }}>
												{item.num}
											</span>
											<span className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light font-serif group-hover:translate-x-2 ${
												isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
											}`}
											style={{ transitionDelay: `${index * 80 + 500}ms` }}>
												{item.label}
											</span>
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}