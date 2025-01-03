import React from 'react';
import Image from 'next/image';

const Aboutsection2 = () => {
  return (
    <div>
      <section className="px-5 sm:px-10 pt-16 sm:pt-32 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-5">
          {/* Left Side - Content */}
          <div className="order-2 md:order-1 flex flex-col justify-center text-center sm:text-left px-5 sm:px-10">
            <p className="text-3xl sm:text-4xl font-bold md:text-5xl lg:text-7xl text-black">
              Why{' '}
              <span className="text-orange-600">
                I Started This Blog
              </span>.
            </p>
            <p className="mt-4 text-gray-700 text-justify text-sm sm:text-base lg:text-lg">
              The journey to{' '}
              <span className="text-orange-500 text-lg font-bold">
                health and wellness
              </span>{' '}
              hasn’t always been easy for me. There were times when I struggled
              with finding the right balance between work, self-care, and a
              healthy lifestyle. Like many, I often felt overwhelmed by
              conflicting advice about what it means to &quot;be healthy.&quot;
              <br />
              <br />
              Over time, I realized that wellness isn’t about perfection—it’s
              about progress. It’s about finding what works for you and making
              choices that honor your unique body and mind. That realization
              inspired me to start this blog, where I can share practical tips,
              simple strategies, and evidence-based advice to make your journey
              smoother and more enjoyable.
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <Image
              src="/blogpic.png"
              alt="about image"
              width={400}
              height={400}
              layout="intrinsic"
              className="cursor-pointer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutsection2;
