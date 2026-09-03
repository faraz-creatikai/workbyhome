"use client"

import Link from "next/link";

 export default function HeroSection() {
    return (
      <div className="min-h-screen bg-[#fafafa] relative overflow-hidden font-sans text-slate-900 selection:bg-blue-100">
        
        {/* Dot Pattern Background */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
            backgroundSize: '6px 6px'
          }}
        />
  
    
  
        {/* Main Hero Section */}
        <main className="relative z-10 flex flex-col items-center justify-center pt-24 pb-32 px-4 max-w-7xl mx-auto min-h-[80vh]">
          
          {/* Central Floating Logo Icon */}
          <div className="w-20 h-20 bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex items-center justify-center mb-12 transform hover:scale-105 transition-transform duration-300">
            <div className=" ">
              {/* <div className="w-4 h-4 rounded-full bg-[#1A73E8]"></div>
              <div className="w-4 h-4 rounded-full bg-slate-800"></div>
              <div className="w-4 h-4 rounded-full bg-slate-800"></div>
              <div className="w-4 h-4 rounded-full bg-slate-800"></div>
               */}
               <img src="/workbyhome.png" className="w-20 h-20"/>
            </div>
          </div>
  
          {/* Hero Typography */}
          <div className="text-center max-w-4xl mx-auto relative z-20">
            <h1 className="text-[2rem] sm:text-[3rem] lg:text-[4.5rem] leading-[1.05] font-semibold tracking-tight text-slate-900 mb-6">
              Think, plan, and track <br />
              <span className="text-gray-400">all in one place</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-medium">
              Efficiently manage your tasks and boost productivity.
            </p>
            <Link href="/apply-now" className="px-8 py-4 rounded-full bg-[#1A73E8] text-white text-lg font-medium hover:bg-blue-600 transition-all shadow-[0_10px_30px_-10px_rgba(26,115,232,0.5)] transform hover:-translate-y-0.5">
              Get free demo
            </Link>
          </div>
  
          {/* --- FLOATING DECORATIVE ELEMENTS --- */}
  
          {/* 1. Top Left: Yellow Sticky Note & Checkmark */}
          
          <div className="absolute  top-24 left-[5%] lg:left-[16%] xl:left-[4%] hidden md:block z-20 -rotate-3 hover:rotate-0 transition-transform duration-500">
            {/* Base white card behind note */}
            <div className="absolute  -inset-4 top-36 h-[120px] -left-28 bg-white/50 backdrop-blur-sm rounded-3xl rotate-12 shadow-sm border border-white/50 z-10 w-64 "></div>
            
            <div className="relative w-48 bg-[#FFF48F] rounded-br-2xl rounded-tl-sm px-5 pt-5 pb-16 shadow-[5px_15px_30px_rgba(0,0,0,0.08)]">
              {/* Red Pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-[0_4px_8px_rgba(239,68,68,0.4)] border border-red-600 flex items-center justify-center">
                 <div className="w-1 h-1 rounded-full bg-white/50 absolute top-0.5 left-1"></div>
              </div>
              {/* Note text */}
              <p className="text-slate-800 font-medium text-[15px] leading-snug mt-2" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
                Take notes to keep track of crucial details, and accomplish more tasks with ease.
              </p>
            </div>
  
            {/* Floating Blue Checkmark */}
            <div className="absolute -bottom-8 left-8 w-16 h-16 bg-white rounded-2xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.15)] flex items-center z-50 justify-center rotate-6">
              <div className="w-10 h-10 bg-[#1A73E8] rounded-xl flex items-center justify-center shadow-inner">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
  
          {/* 2. Top Right: Reminders Card & Clock */}
          <div className="absolute top-28 right-[5%] lg:right-[10%] xl:-right-[2%] hidden md:block z-0 rotate-6 hover:rotate-3 transition-transform duration-500">
             {/* Folded tab shape backdrop */}
             <div className="w-64 bg-gray-50/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 p-6 absolute -top-4 -right-4 -bottom-4 -left-4 -z-10 rotate-[-4deg]"></div>
             
             <div className="relative w-56 bg-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] p-5 border border-gray-50">
               <h3 className="font-semibold text-slate-900 mb-4">Reminders</h3>
               <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100/50">
                  <p className="text-xs text-blue-500 font-medium mb-1">Meetings</p>
                  <p className="text-sm font-semibold text-slate-800 mb-1">Today's Meeting</p>
                  <p className="text-xs text-gray-400 mb-3">Call with marketing team</p>
                  <div className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-100/50 w-max px-2 py-1 rounded-md">
                     <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    13:00 - 13:45
                  </div>
               </div>
             </div>
  
             {/* Floating Clock Icon */}
             <div className="absolute -top-6 -left-10 w-16 h-16 bg-white rounded-2xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.15)] flex items-center justify-center -rotate-12 border border-gray-50">
                <svg className="w-10 h-10 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l2.5 2.5" />
                  {/* Red second hand detail */}
                  <line x1="12" y1="12" x2="15" y2="9" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
             </div>
          </div>
  
          {/* 3. Bottom Left: Today's Tasks */}
          <div className="absolute -bottom-8 left-[8%] lg:left-[15%] hidden lg:block z-20 -rotate-6 hover:rotate-0 transition-transform duration-500">
             <div className="relative w-72 bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] p-6 border border-gray-100">
               {/* Folder Tab Detail */}
               <div className="absolute -top-4 left-6 w-24 h-6 bg-white rounded-t-xl border-t border-l border-r border-gray-100"></div>
               
               <h3 className="font-semibold text-slate-900 mb-5 relative z-10">Today's tasks</h3>
               
               <div className="space-y-4">
                 {/* Task Item */}
                 <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
                   <div className="flex items-center gap-3 mb-3">
                     <div className="w-6 h-6 rounded-md bg-orange-100 flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                     </div>
                     <span className="text-sm font-semibold text-slate-800">New Ideas for campaign</span>
                   </div>
                   
                   <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                     <span>Sep 10</span>
                     <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full bg-blue-100 border border-white z-20"></div>
                        <div className="w-5 h-5 rounded-full bg-green-100 border border-white z-10"></div>
                     </div>
                   </div>
  
                   {/* Progress Bar */}
                   <div className="flex items-center gap-3 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-[60%] h-full bg-[#1A73E8] rounded-full"></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-700">60%</span>
                   </div>
                 </div>
               </div>
             </div>
          </div>
  
          {/* 4. Bottom Right: Integrations */}
          <div className="absolute -bottom-2 right-[10%] lg:right-[12%] hidden lg:block z-20 rotate-3 hover:rotate-6 transition-transform duration-500">
             <div className="relative w-64 bg-white rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] p-6 border border-gray-100">
                {/* Folder Tab Detail */}
                <div className="absolute -top-3 left-6 w-32 h-6 bg-white rounded-t-xl border-t border-l border-r border-gray-100"></div>
                
                <h3 className="font-semibold text-slate-900 text-sm mb-5 relative z-10">100+ Integrations</h3>
                
                <div className="flex items-end justify-center gap-2">
                  {/* Gmail Style Icon */}
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-md border border-gray-50 flex items-center justify-center transform -rotate-6">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" fill="white"/>
                      <path d="M22 6L12 13L2 6" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 18V6L12 13L22 6V18" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  {/* Slack Style Icon (Simplified) */}
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-gray-50 flex items-center justify-center z-10 -translate-y-2">
                     <div className="grid grid-cols-2 gap-1 rotate-12">
                       <div className="w-3 h-3 rounded-full bg-[#E01E5A]"></div>
                       <div className="w-3 h-8 rounded-full bg-[#36C5F0]"></div>
                       <div className="w-3 h-8 rounded-full bg-[#2EB67D]"></div>
                       <div className="w-3 h-3 rounded-full bg-[#ECB22E]"></div>
                     </div>
                  </div>
  
                  {/* Calendar Style Icon */}
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-md border border-gray-50 flex items-center justify-center transform rotate-6 overflow-hidden flex-col">
                    <div className="w-full bg-[#1A73E8] h-4 flex-shrink-0"></div>
                    <div className="flex-1 w-full flex items-center justify-center text-blue-600 font-bold text-lg">
                      31
                    </div>
                  </div>
                </div>
             </div> 
          </div>
  
        </main>
      </div>
    );

}