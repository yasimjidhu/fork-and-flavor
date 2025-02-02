import Image from 'next/image';
import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

const About = () => {
  return (
    <ProtectedRoute>
    <div className="grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0 p-4 md:w-full mt-4">
      <div className="space-y-4">
        <div className="leading-relaxed text-justify">
          <h1 className="primary text-xl">About Fork and Flavor</h1>
          <p>
            Welcome to Fork and Flavor, the ultimate dining companion for food enthusiasts! Our mission is simple:
            to revolutionize the way you discover, personalize, and enjoy dining experiences. Whether you are  a foodie
            exploring new cuisines or someone looking for the perfect meal, Fork and Flavor is here to make it easy, fun,
            and memorable. 
          </p>
        </div>

        <div className="leading-relaxed text-justify">
          <h1 className="primary text-xl">Our Vision</h1>
          <p>
            We believe dining should be more than just eating—it should be an experience. Our vision is to empower
            food lovers by connecting them to the flavors they crave through intuitive technology and innovative
            solutions.
          </p>
        </div>

        <div className="leading-relaxed">
          <h1 className="primary text-xl">Our Mission</h1>
          <ul className="list-disc list-inside space-y-2">
            <li>Simplifying the process of finding your next favorite dish.</li>
            <li>Providing personalized recommendations tailored to your taste.</li>
            <li>Bridging the gap between food and technology to create a seamless user experience.</li>
          </ul>
        </div>

        <div className="leading-relaxed text-justify">
          <h1 className="primary text-xl">The Story Behind Fork & Flavor</h1>
          <p>
            Fork and Flavor was born from a passion for food and technology. As a tech enthusiast and food lover, I
            wanted to create a platform that blends the best of both worlds. From ideation to execution, Fork and Flavor
            is a reflection of my dedication to bringing value to food enthusiasts everywhere.
          </p>
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <Image
          src="/grape.jpg"
          width={400}
          height={500}
          alt="chef"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default About;
