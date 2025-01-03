"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const socialIcons = [
    {
      name: "Linkedin",
      src: "/linkedin-svg.svg",
    },
    {
      name: "YouTube",
      src: "/youtube.svg",
    },
    {
      name: "Facebook",
      src: "/facebook-svg.svg",
    },
  ];

  return (
    <footer className="pt-20">
      <div className="max-w-screen-xl mx-auto">

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col lg:flex-row gap-16 lg:px-0 px-7 divide-y-2 divide-zinc-600 lg:divide-y-0"
        >
          <div className="flex flex-col gap-4 lg:w-[30%]">
            <div className="flex items-center gap-4">
              <Image
                src="/mylogo.png"
                alt="HealthWellness-logo"
                height={70}
                width={40}
                className="mt-1"
              />
              <span className="text-2xl font-semibold">HealthWellness</span>
            </div>

            <p className="text-slate-600">
              Empowering individuals to live healthier lives with resources and 
              support for physical, mental, and emotional well-being.
            </p>

            <div className="flex gap-3">
              {socialIcons.map((social) => (
                <Image
                  src={social.src}
                  key={social.name}
                  alt={social.name}
                  width={30}
                  height={30}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-10 lg:pt-0">
            <h1 className="text-xl font-semibold">Wellness Categories</h1>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Physical Fitness
            </li>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Nutrition
            </li>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Mental Health
            </li>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Lifestyle Coaching
            </li>
          </div>

          <div className="flex flex-col gap-4 pt-10 lg:pt-0">
            <h1 className="text-xl font-semibold">Programs</h1>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Weight Management
            </li>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Yoga and Meditation
            </li>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Stress Reduction
            </li>
          </div>

          <div className="flex flex-col gap-4 pt-10 lg:pt-0">
            <h1 className="text-xl font-semibold">Services</h1>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Personalized Coaching
            </li>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Health Workshops
            </li>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Wellness Retreats
            </li>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Online Resources
            </li>
          </div>

          <div className="flex flex-col gap-4 pt-10 lg:pt-0">
            <h1 className="text-xl font-semibold">Company</h1>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              About Us
            </li>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Blog
            </li>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              FAQ
            </li>
          </div>
        </motion.div>

        <div className="flex justify-between pt-16 pb-6 px-7 sm:flex-row flex-col gap-y-2">
          <p>&copy; 2024 HealthWellness. All rights reserved</p>
          <div className="flex gap-2">
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Privacy Policy
            </li>
            <li className="list-none text-slate-500 text-lg font-medium cursor-pointer">
              Terms of Use
            </li>
          </div>
        </div>
      </div>
    </footer>
  );
}
