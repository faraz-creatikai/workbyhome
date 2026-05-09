import React from 'react';

export default function TestimonialsSection() {
  return (
    <section className="relative bg-[#fafafa] min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none  z-0 opacity-40"
        style={{
           backgroundImage: 'radial-gradient(#c9c8c8 1.5px, transparent 1.5px)',
            backgroundSize: '6px 6px'
        }}
      />
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-100 mb-6">
            <span className="text-sm font-medium text-gray-500">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight max-w-3xl leading-[1.15]">
            People just like you <br className="hidden md:block" />
            are already using ChronoTask
          </h2>
        </div>

        {/* Masonry Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

          {/* Floating Chat Icon (Decorative) */}
          <div className="absolute -left-12 top-32 z-10 hidden xl:flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] -rotate-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8" cy="12" r="1" fill="#9CA3AF" stroke="#9CA3AF" strokeWidth="1"/>
              <circle cx="12" cy="12" r="1" fill="#9CA3AF" stroke="#9CA3AF" strokeWidth="1"/>
              <circle cx="16" cy="12" r="1" fill="#9CA3AF" stroke="#9CA3AF" strokeWidth="1"/>
            </svg>
          </div>

          {/* Floating YouTube Icon (Decorative) */}
          <div className="absolute -right-8 bottom-24 z-10 hidden xl:flex items-center justify-center w-20 h-16 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] rotate-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.01 29.01 0 0 0 1 11.75a29.01 29.01 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29.01 29.01 0 0 0 .46-5.33 29.01 29.01 0 0 0-.46-5.33z" fill="#FF0000"/>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
            </svg>
          </div>

          {/* Column 1 — TALL top (70%), SHORT bottom (30%) */}
          <div className="flex flex-col gap-6 md:h-[640px] ">
            <Card
              flex="[7]"
              quote="This task manager has completely transformed the way my team works. We now collaborate in real-time and always meet deadlines."
              name="John D."
              role="Marketing Lead"
              avatar="https://i.pravatar.cc/150?img=11"
            />
            <Card
              flex="[3]"
              quote="I love how easy it is to create and assign tasks. The platform's interface makes work feel less overwhelming."
              name="Daniela T."
              role="Operations Manager"
              avatar="https://i.pravatar.cc/150?img=47"
            />
          </div>

          {/* Column 2 — SHORT top (30%), TALL bottom (70%) */}
          <div className="flex flex-col gap-6 md:h-[640px]">
            <Card
              flex="[3]"
              quote="An essential tool for anyone looking to manage their tasks better."
              name="Sarah W."
              role="Freelance Designer"
              avatar="https://i.pravatar.cc/150?img=5"
            />
            <Card
              flex="[7]"
              quote="The time-tracking feature has been a game-changer for my freelance projects. It helps me stay organized and productive."
              name="Alex M."
              role="Freelance Developer"
              avatar="https://i.pravatar.cc/150?img=33"
            />
          </div>

          {/* Column 3 — SHORT top (30%), TALL video bottom (70%) */}
          <div className="flex flex-col gap-6 md:h-[640px]">
            <Card
              flex="[3]"
              quote="The built-in analytics give me a complete overview of our team's productivity."
              name="Sam J."
              role="Project Coordinator"
              avatar="https://i.pravatar.cc/150?img=59"
            />

            {/* Video Review Card — flex-[7] replaces the broken aspect-ratio + flex-grow combo */}
            <div className="flex-[7] relative rounded-3xl overflow-hidden bg-gray-900 shadow-2xl shadow-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Video review by a user"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium hover:bg-white/30 transition-colors">
                  Watch video review
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Reusable Card Component
interface CardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  flex?: string;
}

function Card({ quote, name, role, avatar, flex = '[3]' }: CardProps) {
  return (
    <div className={`flex-${flex} bg-white rounded-3xl shadow-2xl shadow-neutral-400 p-8 flex flex-col justify-between`}>
      <p className="text-gray-700 text-[15px] leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border border-gray-100"
        />
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{name}</h4>
          <p className="text-gray-500 text-xs font-medium">{role}</p>
        </div>
      </div>
    </div>
  );
}