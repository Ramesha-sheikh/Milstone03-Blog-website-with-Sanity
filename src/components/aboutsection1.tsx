import React from 'react';
import Image from 'next/image';

const Aboutsection1 = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center max-w-screen-xl mt-20">
        {/* Left Section */}
        <div className="w-full sm:w-1/2 p-5 sm:p-10 flex justify-center sm:justify-center md:justify-start">
          <Image
            src="/myy.png"
            alt="about image"
            width={400}
            height={400}
            layout="intrinsic" // or 'responsive'
            className="cursor-pointer"
          />
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/2 p-5 text-center sm:text-left">
          <div className="text">
            <h2 className="my-4 font-bold text-3xl sm:text-4xl">
              About <span className="text-orange-500">Me</span>
            </h2>
            <h2 className="my-4 font-bold text-3xl sm:text-4xl">
              Welcome to{' '}
              <span className="text-orange-500 font-bold text-4xl sm:text-6xl">
                HealthyPulse! 🌿
              </span>
            </h2>
            <p className="text-gray-700 text-justify">
              Hi,{' '}
              <span className="text-2xl text-orange-500 font-bold">
                I’m Ramesha!
              </span>{' '}
              I’m so glad you’re here. This blog is a labor of love—a space
              where I combine my passion for health, wellness, and balanced
              living to share tips, insights, and inspiration with people like
              you.
              <br />
              <br />
              For years, I’ve believed in the power of small, consistent changes
              to transform not just our physical health, but our mental and
              emotional well-being too. Through this blog, I aim to empower you
              to make informed decisions about your health and create habits
              that truly last.
              <br />
              <br />
              Let’s Connect I’d love to hear from you! Your feedback, stories,
              and questions mean the world to me. Feel free to reach out through
              the Contact page or find me on [insert social media links]. Let’s
              build a community that uplifts and supports each other on the path
              to better health.
              <br />
              <br />
              Thank you for stopping by. Here’s to a healthier, happier you! 💚
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutsection1;
