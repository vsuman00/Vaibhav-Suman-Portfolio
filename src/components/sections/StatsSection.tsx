"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, BookOpen, Award, Users } from "lucide-react";

interface Stat {
  id: string;
  name: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

const stats: Stat[] = [
  {
    id: "projects",
    name: "Projects Completed",
    value: 10,
    suffix: "+",
    icon: Code,
    description: "Successful projects delivered",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "publications",
    name: "Research Publications",
    value: 3,
    suffix: "+",
    icon: BookOpen,
    description: "Peer-reviewed publications",
    color: "text-green-600 dark:text-green-400",
  },
  {
    id: "certifications",
    name: "Certifications",
    value: 15,
    suffix: "+",
    icon: Award,
    description: "Professional certifications",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    id: "collaborations",
    name: "Collaborations",
    value: 10,
    suffix: "+",
    icon: Users,
    description: "Professional collaborations",
    color: "text-orange-600 dark:text-orange-400",
  },
];

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function Counter({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
}: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return (
    <span ref={countRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="heading-2 mb-4">
            Impact by the Numbers
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="body-large max-w-3xl mx-auto"
          >
            A snapshot of my journey in research, development, and
            collaboration. These numbers represent the impact and growth
            achieved through dedication and continuous learning.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="group relative"
              >
                <div className="card-hover text-center p-8 h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>

                  {/* Number */}
                  <div className="mb-4">
                    <div
                      className={`text-4xl sm:text-5xl font-bold ${stat.color} mb-2`}
                    >
                      <Counter
                        end={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {stat.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="body-small">{stat.description}</p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Updated in real-time</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
