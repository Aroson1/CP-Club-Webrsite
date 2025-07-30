"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { getRecentEvents } from "@/app/_data/_eventsData";

const events = getRecentEvents(4); // Get the 4 most recent events

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function RecentEventsSection() {
  return (
    <section className="min-h-screen pt-5 px-6 relative overflow-hidden">
      {/* Terminal-style background patterns */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
                 linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
               `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10 flex-1 flex flex-col"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-nevera">
            Event Queue
            <span className="text-cyan-400 font-mono text-lg ml-4">
              // priority_queue&lt;Event&gt;
            </span>
          </h2>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-mono">
            <span className="text-cyan-400">$</span> eventQueue.size() ={" "}
            {events.length} | next() ={" "}
            <span className="text-green-400">
              {events.filter((e) => e.status === "upcoming")[0]?.title}
            </span>
          </p>
        </motion.div>

        {/* Events Carousel */}
        <motion.div variants={itemVariants} className="relative flex-1">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet-custom",
              bulletActiveClass: "swiper-pagination-bullet-active-custom",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="events-swiper"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 
                           border-2 border-cyan-400/20 rounded-xl overflow-hidden
                           shadow-2xl shadow-cyan-500/10 backdrop-blur-sm
                           hover:border-cyan-400/40 hover:shadow-cyan-500/20
                           transition-all duration-300 group h-full"
                >
                  {/* Terminal Header */}
                  <div className="bg-slate-700/50 px-4 py-2 border-b border-cyan-400/10">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-cyan-400">
                        {event.id}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-mono px-2 py-1 rounded ${
                            event.status === "upcoming"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-slate-500/20 text-slate-400"
                          }`}
                        >
                          {event.status.toUpperCase()}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          P{event.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Event Image */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Event Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-mono">
                      {event.title}
                    </h3>

                    <p className="text-gray-400 mb-3 text-sm leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-1 mb-3">
                      <div className="flex items-center text-sm text-gray-300">
                        <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                        <span className="font-mono">{event.date}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-300">
                        <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                        <span className="font-mono">{event.time}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                        <span className="font-mono">{event.location}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-300">
                        <Users className="w-4 h-4 mr-2 text-cyan-400" />
                        <span className="font-mono">
                          {event.attendees} registered
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href="#"
                      className="w-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 
                                     py-2 px-4 rounded-lg font-mono text-sm
                                     hover:bg-cyan-400/20 hover:border-cyan-400/40
                                     transition-all duration-300 group-hover:shadow-cyan-500/20
                                     flex items-center justify-center gap-2"
                    >
                      {event.status === "upcoming"
                        ? "Register Now"
                        : "View Details"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div
            className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-10
                          w-12 h-12 bg-slate-800/50 border border-cyan-400/20 rounded-full
                          flex items-center justify-center cursor-pointer
                          hover:bg-cyan-400/10 hover:border-cyan-400/40 transition-all duration-300
                          text-cyan-400 hover:text-cyan-300"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </div>

          <div
            className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-10
                          w-12 h-12 bg-slate-800/50 border border-cyan-400/20 rounded-full
                          flex items-center justify-center cursor-pointer
                          hover:bg-cyan-400/10 hover:border-cyan-400/40 transition-all duration-300
                          text-cyan-400 hover:text-cyan-300"
          >
            <ArrowRight className="w-5 h-5" />
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .events-swiper .swiper-pagination {
          bottom: -30px !important;
        }

        .swiper-pagination-bullet-custom {
          width: 8px;
          height: 8px;
          background: rgb(148 163 184 / 0.3);
          border-radius: 50%;
          opacity: 1;
          margin: 0 4px;
          transition: all 0.3s;
        }

        .swiper-pagination-bullet-active-custom {
          background: rgb(6 182 212);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
