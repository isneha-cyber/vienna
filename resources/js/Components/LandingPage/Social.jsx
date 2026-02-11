import React from 'react'
import { Instagram } from 'lucide-react'

const Social = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
			{/* Header Section */}
			<div className="space-y-4 lg:space-y-6 mb-12 lg:mb-16">
				<h3 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-800 leading-tight">
					Experience the magic of Stella Island
				</h3>
				<h3 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-400 leading-tight sm:pl-16 lg:pl-32">
					#StellaIslandCrete
				</h3>
			</div>

			{/* Instagram Handle */}
			<div className="mb-8 lg:mb-12">
				<div className="flex items-center gap-4 sm:gap-6">
					<div className="rounded-full bg-black p-3 sm:p-4 flex items-center justify-center">
						<Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
					</div>
					<h3 className="text-lg sm:text-xl font-bold text-neutral-800">
						stellaislandcrete
					</h3>
				</div>
			</div>

			{/* Image Grid */}
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
				<div className="aspect-square overflow-hidden ">
					<img 
						src="/images/s1.webp" 
						alt="Stella Island moment 1" 
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
					/>
				</div>
				<div className="aspect-square overflow-hidden ">
					<img 
						src="/images/s2.webp" 
						alt="Stella Island moment 2" 
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
					/>
				</div>
				<div className="aspect-square overflow-hidden ">
					<img 
						src="/images/s3.webp" 
						alt="Stella Island moment 3" 
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
					/>
				</div>
				<div className="aspect-square overflow-hidden ">
					<img 
						src="/images/s4.webp" 
						alt="Stella Island moment 4" 
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
					/>
				</div>
				<div className="aspect-square overflow-hidden  col-span-2 sm:col-span-1">
					<img 
						src="/images/s5.webp" 
						alt="Stella Island moment 5" 
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
					/>
				</div>
			</div>
            <div className="flex justify-center items-center gap-4 text-white mt-8">
            <button className='border bg-black py-2 px-4'>Load More</button>
            <button className='border bg-black py-2 px-4'>Follow on Instagram</button>
            </div>
         
		</div>
	)
}

export default Social