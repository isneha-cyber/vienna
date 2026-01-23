import {useState, useEffect} from 'react';
import {Menu, X, User, Cloud} from 'lucide-react';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	// Close menu on resize (for better UX)
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		return() => window.removeEventListener('resize', handleResize);
	}, []);

	// Handle scroll for navbar background
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return() => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navItems = [
		{ num: '01', label: 'About' },
		{ num: '02', label: 'Accommodation' },
		{ num: '03', label: 'Wine & Dine' },
		{ num: '04', label: 'Wellness' },
		{ num: '05', label: 'Celebrate' },
		{ num: '06', label: 'Crete' },
		{ num: '07', label: 'Experiences' },
		{ num: '08', label: 'Gallery' },
		{ num: '09', label: 'Career' },
		{ num: '10', label: 'Loyalty Circle' },
		{ num: '11', label: 'Gift Cards' },
		{ num: '12', label: 'Contact Us' }
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
			<nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
				isScrolled ? 'bg-white ' : 'bg-transparent'
			}`}>
				<div className=" sm:px-8 px-3">
					<div className="flex items-center justify-between h-14 md:h-24">
						{/* Left Section - Menu & Weather */}
						<div className="flex items-center gap-3 md:gap-6">
							{/* Hamburger Menu */}
							<button onClick={() => setIsMenuOpen(!isMenuOpen)}
								className={`transition-colors p-1.5 md:p-2 ${
									isScrolled 
										? 'text-black hover:text-gray-700' 
										: 'text-white hover:text-gray-200'
								}`}
								aria-label="Toggle menu">
								{isMenuOpen ? (
									<X className={`w-5 h-5 md:w-6 md:h-6 ${isScrolled ? 'text-black' : 'text-white'}`} />
								) : (
									<img 
										className={`w-5 h-5 md:w-6 md:h-6 ${
											isScrolled 
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
								isScrolled ? 'text-black' : 'text-white'
							}`}>
								<span className="uppercase tracking-wide font-medium">CRETE,</span>
								<span className="font-light">16°</span>
								<Cloud className={`w-5 h-5 ml-1 ${
									isScrolled ? 'text-black' : 'text-white'
								}`} />
							</div>
						</div>

						{/* Center Section - Logo */}
						<div className="absolute left-1/2 transform -translate-x-1/2">
							<div className="text-center">
								<h2 className={`text-lg sm:text-xl md:text-2xl lg:text-5xl whitespace-nowrap tracking-wider md:tracking-widest ${
									isScrolled ? 'text-black' : 'text-white'
								}`}>
									Stella Island
								</h2>
							</div>
						</div>

						{/* Right Section - User Icon & Book Now */}
						<div className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
							{/* User Icon - Hide on smallest screens */}
							<button className={` transition-colors p-1.5 md:p-2 ${
								isScrolled 
									? 'text-black hover:text-gray-700' 
									: 'text-white hover:text-gray-200'
							}`} aria-label="User account">
								<img  
									className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
										isScrolled 
											? 'filter brightness-0' 
											: 'filter brightness-0 invert'
									}`} 
									src="/images/lock.png" 
									alt="User account" 
								/>
							</button>

							{/* Book Now Button */}
							<button className={`border-b border-t px-2 py-1 md:px-4 md:py-1.5 lg:px-6 lg:py-2.5 text-xs sm:text-sm md:text-base tracking-wider md:tracking-widest transition-all duration-300 uppercase font-medium whitespace-nowrap ${
								isScrolled 
									? 'border-black text-black hover:bg-black hover:text-white' 
									: 'border-white text-white hover:bg-white hover:text-gray-900'
							}`}>
								<span className="hidden xs:inline">Book Now</span>
								<span className="xs:hidden">Book</span>
							</button>
						</div> 
					</div>

					{/* Mobile Weather (below navbar) */}
					<div className={`md:hidden flex items-center justify-center gap-2 text-xs sm:text-sm pb-3 ${
						isScrolled ? 'text-black' : 'text-white'
					}`}>
						<span className="uppercase tracking-wide font-medium">CRETE,</span>
						<span className="font-light">16°</span>
						<Cloud className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 ${
							isScrolled ? 'text-black' : 'text-white'
						}`} />
					</div>
				</div>

				{/* Fullscreen Menu Overlay */}
				{isMenuOpen && (
					<div className="fixed inset-0 z-50 animate-fadeIn">
						{/* Background Overlay */}
						<div className="absolute inset-0 bg-black/95"></div>

						{/* Close Button */}
						<button onClick={() => setIsMenuOpen(false)}
							className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 text-white hover:text-gray-300 transition-colors z-10"
							aria-label="Close menu">
							<X className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10"/>
						</button>

						<div className="relative h-full flex flex-col md:flex-row overflow-y-auto pt-14 sm:pt-16 md:pt-0">
							{/* Left Side - Hotel Collection */}
							<div className="w-full md:w-1/3 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center md:border-r  bg-white ">
								<div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
									<div>
										<h2 className="text-black text-xl sm:text-2xl md:text-3xl font-light font-serif">
											Stella Island
										</h2>
									</div>

									<div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
										{hotels.map((hotel, index) => (
											<div key={index}
												className={`border-l-2 pl-3 sm:pl-4 transition-colors cursor-pointer ${
													hotel.active ? 'border-black' : 'border-transparent hover:border-black/50'
												}`}>
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
							<div className="flex-1 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center bg-black/10 opacity-80" style={{backgroundImage:'url("/images/img2.jpg'}}>
								
								{/* Logo for Mobile */}
								<div className="md:hidden mb-6 sm:mb-8 text-center">
									<h2 className="text-white text-xl sm:text-2xl font-light font-serif">Stella Island</h2>
								</div>

								{/* Navigation Items - Responsive Grid */}
								
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4 md:gap-y-5 lg:gap-y-6 max-w-6xl mx-auto" >
									{navItems.map((item) => (
										<a key={item.num}
											href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
											className="flex items-start gap-2 sm:gap-3 text-white hover:text-gray-300 transition-colors group"
											onClick={() => setIsMenuOpen(false)}>
											<span className="text-white text-xs sm:text-sm md:text-base font-light w-5 sm:w-6 md:w-8 flex-shrink-0">
												{item.num}
											</span>
											<span className="text-base sm:text-lg md:text-xl lg:text-2xl font-light font-serif group-hover:translate-x-2 transition-transform duration-300">
												{item.label}
											</span>
										</a>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
			</nav>
	</>
	);
}