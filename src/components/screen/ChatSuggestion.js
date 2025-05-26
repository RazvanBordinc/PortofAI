"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, User, Mail, Award, Briefcase } from "lucide-react";

export default function ChatSuggestion({ onSelectSuggestion, distance }) {
  const suggestions = [
    {
      id: 1,
      text: "Tell me about your projects",
      icon: <Code size={16} />,
    },
    {
      id: 2,
      text: "What are your skills?",
      icon: <Award size={16} />,
    },
    {
      id: 3,
      text: "Work experience?",
      icon: <Briefcase size={16} />,
    },
    {
      id: 4,
      text: "How can I contact you?",
      icon: <Mail size={16} />,
    },
    {
      id: 5,
      text: "Tell me about yourself",
      icon: <User size={16} />,
    },
  ];

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Handle suggestion click - directly call parent handler
  const handleSuggestionClick = (text) => {
    console.log("ChatSuggestion: Suggestion clicked:", text);
    // FIXED: This directly calls the parent handler instead of just setting input value
    onSelectSuggestion(text);
  };

  return (
    <div
      className={`px-4 py-3 absolute bottom-20 w-full transition-all ${distance}`}
    >
      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 pl-1 hidden sm:block">
          SUGGESTED QUESTIONS
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
          {suggestions.map((suggestion) => (
            <motion.button
              key={suggestion.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSuggestionClick(suggestion.text)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full 
                text-xs sm:text-sm font-medium
                text-black dark:text-white shadow-sm transition-all duration-300
                border border-white/20 dark:border-slate-700/50 hover:shadow-md cursor-pointer
                whitespace-nowrap`}
              type="button" // Explicitly setting button type to avoid form submission
            >
              <span className="opacity-70 hidden sm:inline">{suggestion.icon}</span>
              <span className="truncate max-w-[100px] sm:max-w-none">{suggestion.text}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
