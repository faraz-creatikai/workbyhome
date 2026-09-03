import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

export function EstateAILoading({ 
  message = "Loading your workspace...",
  showLogo = true 
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0066cc 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center gap-8">
        
        {/* Logo & Animation Container */}
        {showLogo && (
          <div className="relative">
            {/* Outer Ring Animation */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#0066cc]/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: 80, height: 80, margin: -10 }}
            />
            
            {/* Inner Ring Animation */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#0066cc]/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 0.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
              style={{ width: 80, height: 80, margin: -10 }}
            />

            {/* Logo Container */}
            <motion.div
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl  "
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* EstateAI Icon - Building/Property Symbol */}
             <img width={50} height={50} src="/icons/icon-192.png" alt='estateAi'/>
              
              {/* AI Sparkle Badge */}
              <motion.div 
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0066cc] text-xs font-bold shadow-md"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✦
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Text Content */}
        <div className="flex flex-col items-center gap-3 text-center">
          <motion.h2 
            className="text-xl font-semibold text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            EstateAI
          </motion.h2>
          
          <motion.p 
            className="text-sm text-gray-500 max-w-[200px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {message}
          </motion.p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-[#0066cc]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#0066cc] to-[#4d94ff] rounded-full"
            initial={{ width: "0%", x: "-100%" }}
            animate={{ 
              width: ["0%", "100%", "0%"],
              x: ["-100%", "0%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <motion.div 
        className="absolute bottom-8 text-xs text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Powered by AI · Secure · Fast
      </motion.div>
    </div>
  );
}


// if (isLoading || loading) {
//   return <EstateAILoading message="Loading properties..." />;
// }