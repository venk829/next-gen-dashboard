"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function CourseCard({ course }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl"
    >
      <BookOpen className="w-10 h-10 text-cyan-400 mb-4" />

      <h2 className="text-xl font-bold text-white">
        {course.title}
      </h2>

      <p className="text-slate-300 mt-2">
        Progress: {course.progress}%
      </p>

      <div className="w-full bg-slate-700 rounded-full h-3 mt-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${course.progress}%` }}
          transition={{ duration: 1 }}
          className="bg-cyan-400 h-3 rounded-full"
        />
      </div>
    </motion.div>
  );
}