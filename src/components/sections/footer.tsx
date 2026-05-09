"use client"
 const footerLinks = {
    left: ['About Us', 'Contact', "What's New", 'Careers'],
    right: ['Product', 'Solutions', 'Integrations', 'Price'],
  };
function Footer() {
  return (
     <div className=" bg-white font-sans">
       <div className="mx-4 ">
      <footer className="relative bg-[#F0F0F0] rounded-t-xl shadow-2xl shadow-neutral-100 pt-12 pb-8 px-4 relative overflow-hidden">
        
        {/* Dot Pattern Background */}
        <div 
          className="absolute inset-0 pointer-events-none  z-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(#e0dfdf 1.5px, transparent 1.5px)',
            backgroundSize: '6px 6px'
          }}
        />
        <div className="max-w-6xl mx-auto">
          {/* Footer Top */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
            {/* Left Side - Brand */}
            <div className="mb-8 lg:mb-0">
              <div className="flex items-center  gap-2 mb-4">
               <img src="/workbyhome-logo.png" className='w-60 h-20 z-50'/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 z-50 leading-tight">
                Stay organized and<br />
                boost your productivity
              </h3>
            </div>

            {/* Right Side - Links */}
            <div className="flex gap-16">
              <ul className="space-y-3">
                {footerLinks.left.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5">
                      <span className="text-gray-300">→</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {footerLinks.right.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5">
                      <span className="text-gray-300">→</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Floating Icons Area */}
          <div className="relative h-48 mb-8">
            {/* Chat Bubble */}
            <div className="absolute top-[20%] left-[2%] w-16 h-16 bg-white rounded-2xl shadow-2xl shadow-gray-500 flex items-center justify-center -rotate-12 hover:-translate-y-1 transition-transform">
             <img src="https://cdn-icons-png.flaticon.com/512/5962/5962463.png" className="w-12 h-12"/>
            </div>
            {/* Calendar 20 */}
            <div className="absolute top-[5%] left-[22%] w-16 h-16 bg-white rounded-2xl shadow-2xl shadow-gray-500 flex flex-col items-center justify-center rotate-6 hover:-translate-y-1 transition-transform">
              <span className="text-2xl font-bold text-gray-800">20</span>
            </div>

            {/* Checkmark */}
            <div className="absolute top-[50%] left-[12%] w-16 h-16 bg-white rounded-2xl shadow-2xl shadow-gray-500 flex items-center justify-center -rotate-6 hover:-translate-y-1 transition-transform">
             
               <img src="https://cdn-icons-png.flaticon.com/512/5290/5290058.png" className="w-12 h-12"/>
           
            </div>

            {/* Flag */}
            <div className="absolute top-[38%] left-[32%] w-16 h-16 bg-white rounded-2xl shadow-2xl shadow-gray-500 flex items-center justify-center rotate-12 hover:-translate-y-1 transition-transform">
          <img src="https://p1.hiclipart.com/preview/391/439/753/simply-styled-icon-set-731-icons-free-action-center-gray-and-blue-flag-illustration-png-clipart.jpg" className='w-14 h-14'/>
            </div>

            {/* Clock */}
            <div className="absolute top-[18%] left-[42%] w-16 h-16 bg-gray-900 rounded-2xl shadow-2xl shadow-gray-500 flex items-center justify-center -rotate-8 hover:-translate-y-1 transition-transform">
               <img src="https://cdn.iconscout.com/icon/free/png-256/free-apple-clock-icon-svg-download-png-493151.png" className="w-14 h-14"/>
            </div>

            {/* Hourglass */}
            <div className="absolute top-[55%] left-[54%] w-16 h-16 bg-white rounded-2xl shadow-2xl shadow-gray-500 flex items-center justify-center -rotate-12 hover:-translate-y-1 transition-transform">
            <img src="https://png.pngtree.com/png-clipart/20250218/original/pngtree-golden-phone-bold-icon-png-image_20458807.png" className="w-14 h-14"/>
            </div>

            {/* Calendar Grid */}
            <div className="absolute top-[8%] left-[62%] w-16 h-16 bg-white rounded-2xl shadow-2xl shadow-gray-500 flex items-center justify-center -rotate-3 hover:-translate-y-1 transition-transform">
             <img src="https://icons.iconarchive.com/icons/vectorizeimages/iconpack/512/date-icon.png" className="w-10 h-10"/>
            </div>

            {/* Stopwatch */}
            <div className="absolute top-[52%] left-[70%] w-16 h-16 bg-white rounded-2xl shadow-2xl shadow-gray-500 flex items-center justify-center rotate-6 hover:-translate-y-1 transition-transform">
             <img src="https://thumbs.dreamstime.com/b/red-d-stopwatch-icon-minimalist-design-transparent-background-sleek-featuring-clean-detailed-clock-face-modern-359626738.jpg" className='w-14 h-14' />
            </div>

            {/* Lightbulb */}
            <div className="absolute top-[10%] left-[80%] w-16 h-16 bg-white rounded-2xl shadow-2xl shadow-gray-500 flex items-center justify-center -rotate-6 hover:-translate-y-1 transition-transform">
              <img src='https://cdn-icons-png.flaticon.com/512/2779/2779262.png' className="w-10 h-10" />
            </div>

            {/* Fast Forward */}
            <div className="absolute top-[52%] left-[92%] w-16 h-16 bg-white rounded-2xl shadow-2xl shadow-gray-500 flex items-center justify-center rotate-4 hover:-translate-y-1 transition-transform">
             <img src="https://img.favpng.com/18/4/25/arrow-symbol-blue-fast-forward-icon-for-media-control-qrvyBRAX_t.jpg" className="w-12 h-12"/>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400 mb-2 sm:mb-0">© 2024. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}

export default Footer
