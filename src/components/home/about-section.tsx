"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const images = [
  {
    src: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Team collaboration",
    caption: "Weekly coding sessions"
  },
  {
    src: "https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
    alt: "Hackathon event",
    caption: "Annual hackathon"
  },
  {
    src: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Workshop session",
    caption: "Technical workshops"
  },
  {
    src: "https://images.pexels.com/photos/3182761/pexels-photo-3182761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Group discussion",
    caption: "Industry networking"
  }
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-card/30" id="about">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-primary">Us</span>
            </h2>
            <p className="text-lg mb-4">
              TechBytes is a student-led coding club dedicated to fostering a 
              community of passionate developers at our university. Whether you're 
              a beginner or an experienced coder, we provide a space for learning, 
              collaboration, and innovation.
            </p>
            <p className="text-lg mb-4">
              Our mission is to empower students with technical skills and create 
              an environment where creativity thrives. We organize workshops, 
              hackathons, coding competitions, and industry networking events 
              throughout the academic year.
            </p>
            <p className="text-lg">
              Join us to expand your coding knowledge, build impressive projects, 
              and connect with like-minded individuals who share your passion for 
              technology.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="relative h-[450px] rounded-lg overflow-hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="h-full w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 glassmorphic p-4">
                      <p className="text-foreground text-center font-medium">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}