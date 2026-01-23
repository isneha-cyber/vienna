import React, {useEffect, useRef} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)
}

const Island = () => {
	const imageRef = useRef(null)

	useEffect(() => {
		if (! imageRef.current) 
			return


		


		const animation = gsap.fromTo(imageRef.current, {
			clipPath: 'inset(0 100% 0 0)',
			opacity: 0.7
		}, {
			clipPath: 'inset(0 0% 0 0)',
			opacity: 1,
			duration: 1.8,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: imageRef.current,
				start: 'top 80%', // Works well for both mobile and desktop
				end: 'bottom 20%',
				scrub: true, // Automatically adjusts speed based on scroll
				toggleActions: 'play none none reverse',
				// Responsive settings
				onEnter: () => { // Optional: Add different behavior for mobile
					if (window.innerWidth < 768) {
						animation.duration(1.2)
					}
				}
			}
		})

		return() => {
			animation.scrollTrigger ?. kill()
		}
	}, [])

	return (
		<>
			<div className="max-w-5xl mx-auto  py-12 sm:py-24">
				<div className="flex flex-col lg:flex-row justify-between  lg:items-center gap-8 lg:gap-16 px-4 sm:px-0 text-center lg:text-left">
					<div className="lg:w-2/5">
						<h2 className='text-4xl sm:text-5xl lg:text-6xl  '>
							Live the island life
						</h2>
					</div>
					<div className="lg:w-2/5">
						<p className='text-lg sm:text-xl leading-relaxed'>
							An adults-only 5 haven, a luxurious getaway beyond imagination. 
														              Living as an Islander feels like stepping inside your dreams.
						</p>
					</div>
				</div>
			</div>
			<div ref={imageRef}
				className="mt-20 w-full sm:ps-36 ">
				<img src="/images/img1.jpg" alt="Island lifestyle" className="w-full"/>
			</div>
			<div className="max-w-3xl mx-auto py-8 sm:py-20 sm:px-0 px-4">
				<p className="text-lg">With massive lagoon pools that winds its way around the resort, Stella Island creates the sense of floating on water. The idyllic destination for the most romantic moments, you are bound to reignite your love in the soothing and secluded ambiance. Savor every highlight of 5-star elegance and unpretentious luxury.</p>
				<p className="text-lg mt-6">Welcome new sensations and indulge in a world of wonderful experiences.</p>
			</div>

		</>
	)
}

export default Island
