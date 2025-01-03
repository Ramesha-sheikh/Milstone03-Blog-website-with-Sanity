import React from 'react';
import Image from 'next/image';

const Aboutsection3 = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center max-w-screen-xl mt-20 px-11">
        {/* Left Section */}
        <div className="w-full sm:w-1/2 p-5 sm:p-10 flex justify-center sm:justify-center md:justify-start">
          <Image
            src="/find.jpg"
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
              What{' '}
              <span className="text-orange-500 font-bold text-4xl sm:text-6xl">
                You’ll Find Here
              </span>
            </h2>
            <p className="text-gray-700 text-justify">
              <strong>Healthy Recipes:</strong> Simple, nutritious meals that
              you can make at home.
              <br />
              <strong>Fitness Tips:</strong> Easy-to-follow exercises for every
              fitness level.
              <br />
              <strong>Mindfulness & Mental Health:</strong> Techniques to reduce
              stress, boost focus, and find inner peace.
              <br />
              <strong>Self-Care Routines:</strong> Practical ways to nurture
              yourself amidst a busy schedule.
              <br />
              <strong>Wellness Inspiration:</strong> Stories and tips to keep
              you motivated.
              <br />
              <br />
              Whether you’re just starting your health journey or looking for
              ways to stay consistent, this blog is here to support and inspire
              you every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutsection3;
