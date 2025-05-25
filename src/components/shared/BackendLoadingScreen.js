"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoAnimationSvg from "./LogoAnimationSvg";

export default function BackendLoadingScreen({ onBackendReady }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Initializing AI Assistant");
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5189";

  useEffect(() => {
    let intervalId;
    let timeoutId;
    let messageIntervalId;
    let startTime = Date.now();
    let retryCount = 0;
    const maxRetries = 20; // 20 retries * 3 seconds = 60 seconds max
    
    // Update elapsed time every second
    const timeIntervalId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsed);
      
      // Update progress based on elapsed time (up to 90% in 60 seconds)
      const progressValue = Math.min(90, (elapsed / 60) * 90);
      setProgress(progressValue);
    }, 1000);

    // Rotate through loading messages
    const messages = [
      "Initializing AI Assistant",
      "Waking up the backend server",
      "Loading portfolio data from GitHub",
      "Connecting to AI services",
      "Preparing conversation engine",
      "Almost ready to chat",
      "Starting up (free tier takes ~60s)",
      "Thank you for your patience",
      "Configuring AI personality",
      "Loading your conversation history"
    ];
    
    let messageIndex = 0;
    messageIntervalId = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 3000);

    const checkBackendHealth = async () => {
      try {
        const controller = new AbortController();
        timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout per request
        
        const response = await fetch(`${apiUrl}/api/health`, {
          method: "GET",
          signal: controller.signal,
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          // Backend is ready!
          setProgress(100);
          setLoadingMessage("Ready to chat!");
          
          // Clear all intervals
          clearInterval(intervalId);
          clearInterval(messageIntervalId);
          clearInterval(timeIntervalId);
          
          // Wait a moment to show 100% progress
          setTimeout(() => {
            setIsLoading(false);
            if (onBackendReady) {
              onBackendReady();
            }
          }, 500);
          
          return true;
        }
      } catch (error) {
        console.log("Backend not ready yet, retrying...", error.message);
      }
      
      retryCount++;
      if (retryCount >= maxRetries) {
        // After 60 seconds, show error state
        setLoadingMessage("Server is taking longer than expected. Please refresh the page.");
        clearInterval(intervalId);
        clearInterval(messageIntervalId);
        clearInterval(timeIntervalId);
      }
      
      return false;
    };

    // Start checking immediately
    checkBackendHealth();
    
    // Then check every 3 seconds
    intervalId = setInterval(checkBackendHealth, 3000);

    return () => {
      clearInterval(intervalId);
      clearInterval(messageIntervalId);
      clearInterval(timeIntervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [apiUrl, onBackendReady]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950"
      >
        <div className="relative flex flex-col items-center justify-center p-8 max-w-md w-full">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <LogoAnimationSvg className="w-32 h-32" />
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center space-y-4 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              PortofAI
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {loadingMessage}
            </p>
            {elapsedTime > 10 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                Using free tier • Startup time: ~60 seconds
              </motion.p>
            )}
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="w-full max-w-xs"
          >
            <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(progress)}%
              </span>
              {elapsedTime > 0 && (
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  • {elapsedTime}s
                </span>
              )}
            </div>
          </motion.div>

          {/* Animated Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex space-x-2 mt-8"
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-indigo-500 dark:bg-indigo-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Fun Facts or Tips */}
          {elapsedTime > 20 && elapsedTime < 50 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg max-w-sm"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                💡 <span className="font-medium">Did you know?</span> This AI assistant has real-time access to my latest GitHub projects and can answer questions about my skills, experience, and availability.
              </p>
            </motion.div>
          )}

          {/* Error State */}
          {elapsedTime > 65 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-sm"
            >
              <p className="text-sm text-red-600 dark:text-red-400 text-center">
                The server is taking longer than expected. Please refresh the page or try again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Refresh Page
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}