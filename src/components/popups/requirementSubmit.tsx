"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RequirementSuccessPopup({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center relative">

              {/* Success Icon */}
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
                <span className="text-3xl">✅</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Requirement Submitted!
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-6">
                Your requirement has been successfully submitted.  
                Our team will connect you with the best matching properties soon.
              </p>

              {/* Button */}
              <button
                onClick={onClose}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}