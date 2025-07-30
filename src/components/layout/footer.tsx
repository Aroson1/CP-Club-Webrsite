"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Github, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { footerData } from "@/app/_data/_footerData";

export function Footer() {
  const iconMap: Record<string, any> = {
    Github,
    Twitter,
    Instagram,
    Mail,
    MapPin,
    Phone
  };

  const socialLinks = footerData.socialLinks.map(link => ({
    ...link,
    icon: iconMap[link.iconName]
  }));

  const quickLinks = footerData.quickLinks;

  const contactInfo = footerData.contactInfo.map(info => ({
    ...info,
    icon: iconMap[info.iconName]
  }));

  const motionProps = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <footer className="relative bg-black text-purple-400 font-mono overflow-hidden mx-3 mt-3">
      <div className="mx-auto">
        {/* Terminal window wrapper */}
        <div className="border-t border-x border-purple-600 rounded-t-lg shadow-lg bg-black/80">
          <div className="px-4 py-2 border-b border-purple-600 flex items-center space-x-2">
            <span className="mr-auto text-xs">bash:~$ ssh cck@footer</span>
          </div>
          <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Description */}
            <motion.div
              {...motionProps}
              className="col-span-1 lg:col-span-2 space-y-4"
            >
              <h3 className="text-2xl font-bold text-purple-400">
                $ sudo coders-club --peak 
              </h3>
              <p className="text-sm text-gray-500">
                A student-led coding community fostering development and
                learning.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={link.href}
                      whileHover={{ scale: 1.2, color: "#33ff33" }}
                      className="text-purple-400 hover:text-purple-200"
                      aria-label={link.label}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              {...{
                ...motionProps,
                transition: { ...motionProps.transition, delay: 0.1 },
              }}
            >
              <h4 className="text-lg font-semibold text-purple-400 mb-4">
                $ ls -a
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2">{`>>`}</span>
                    <a
                      href={link.href}
                      className="hover:text-purple-200 transition-colors text-sm"
                    ><span className="mr-2">cd</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              {...{
                ...motionProps,
                transition: { ...motionProps.transition, delay: 0.2 },
              }}
            >
              <h4 className="text-lg font-semibold text-purple-400 mb-4">
                $ contact --info
              </h4>
              <ul className="space-y-2 text-sm">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <li key={idx} className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-gray-500">{info.text}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>

          {/* Footer bottom line */}
          <div className="px-6 py-4 border-t border-purple-600 flex justify-between text-xs">
            <span>© 2025 Coders' Club IIIT-K. All rights reserved.</span>
            <span>
              made by:{" "}
              <a href="https://www.linkedin.com/in/alex-gijo/" className="underline hover:text-purple-200 font-nevera">
                @Aroson
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
