import StellaFooter from '@/Components/LandingPage/Footer'
import Navbar from '@/Components/LandingPage/Navbar'
import Social from '@/Components/LandingPage/Social'
import React from 'react'

const Contact = () => {
  return (
      <>
       <div className="l">
            <Navbar textColor="black"/>
                      {/* Page Header/Breadcrumb Section */}
                 <div className="pb-8 px-4 sm:px-6 lg:px-24 mt-24 sm:mt-28">
                   <div className="border-t border-gray-300 mb-4 sm:mb-6"></div>
                   <nav className="text-sm sm:text-base max-w-7xl mx-auto">
                     <ol className="flex items-center space-x-1">
                       <li className="text-gray-600 hover:text-gray-900 transition-colors">
                         <a href="/">Home</a>
                       </li>
                       <li className="text-gray-400">
                         <span className="mx-1 sm:mx-2">/</span>
                       </li>
                       <li className="text-gray-900 font-medium leading-snug">
                    Contact Us
                       </li>
                     </ol>
                   </nav>
                 </div>
                 
                 <div className="flex flex-col lg:flex-row justify-between px-4 sm:px-6 lg:px-32">
                   <div className="w-full lg:w 1/2 mb-8 lg:mb-0">
                      <h3 className='text-3xl'>Get in touch</h3>
                      <p className='text-md mt-4'>Analipsis Hersonissos,Crete Greece</p>
                      <p className='text-md mt-4'>TEL: +30 28975 01701</p>
                      <p className='text-md mt-4'>FAX: +30 28970 29228</p>
                      <p className='text-md mt-4'>email: info@stellaisland.gr</p>
                   </div>
                   <img 
                     className='h-[300px] sm:h-[400px] lg:h-[850px] w-full lg:w-[950px] object-cover mt-6 lg:mt-0' 
                     src="/images/contact.png" 
                     alt="Contact us" 
                   />
                 </div>

              {/* Contact Form Section */}
<div className="px-4 sm:px-6 lg:px-32 mt-12 sm:mt-16">
  <h3 className='text-2xl sm:text-3xl lg:text-4xl font-medium mb-8 sm:mb-10'>Contact Form</h3>
  
  <div className="max-w-3xl">
    {/* Subject Field - with border-bottom only */}
    <div className="mb-6 sm:mb-8">
      <label htmlFor="subject" className="block text-lg sm:text-xl font-medium text-gray-500 mb-2">
        Subject
      </label>
      <input
        type="text"
                className="w-full px-0 py-3 sm:py-4 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 rounded-none outline-none transition-all duration-200"

       
      />
      <div className="h-px bg-gray-300 mt-[-1px]"></div> {/* Optional: Adds a subtle line */}
    </div>

    {/* Full Name, Email, Telephone in grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div>
        <label className="block text-lg sm:text-xl font-medium text-gray-500 mb-2">
          Full Name
        </label>
        <input
          type="text"
        className="w-full px-0 py-3 sm:py-4 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 rounded-none outline-none transition-all duration-200"
       
        />
      </div>
      
      <div>
        <label className="block text-lg sm:text-xl font-medium text-gray-500 mb-2">
          Email
        </label>
        <input
          type="email"
        className="w-full px-0 py-3 sm:py-4 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 rounded-none outline-none transition-all duration-200"
        
        />
      </div>
      
      <div className="sm:col-span-2 lg:col-span-1">
        <label className="block text-lg sm:text-xl font-medium text-gray-500 mb-2">
          Telephone
        </label>
        <input
          type="tel"
        className="w-full px-0 py-3 sm:py-4 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 rounded-none outline-none transition-all duration-200"
     
        />
      </div>
    </div>

    {/* Your Comments */}
    <div className="mb-8 sm:mb-10">
      <label htmlFor="comments" className="block text-lg sm:text-xl font-medium text-gray-900 mb-2">
        Your Comments
      </label>
      <textarea
        id="comments"
        rows={5}
        className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
     
      />
    </div>

    {/* Submit Button */}
    <button
      type="button"
      className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition duration-200"
    >
      SUBMIT
    </button>
  </div>
</div>
               
                  <Social/>
                  <StellaFooter/>
       </div>
       </>
  )
}

export default Contact