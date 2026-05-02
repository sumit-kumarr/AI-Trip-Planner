import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex items-center w-full h-screen gap-8 flex-col justify-center bg-cover overflow-hidden" style={{ backgroundImage: "url('/bg3.jpg')" }}>
      <h1 className="text-4xl font-extrabold text-center mt-10">
        <span className="text-blue-700">
          Discover Your Next Adventures <br></br> with AI:{" "}
        </span>{" "}
        Personalized ltineraries <br></br> at Your Fingertrips{" "}
      </h1>
      <p className="text-lg text-white font-bold text-center">
        Plan your perfect trip with the help of artificial intelligence
      </p>

      <Link to={"/create-trip"}>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-blue-600 transition duration-300 cursor-pointer font-bold">
          Create Your Trip
        </button>
      </Link>
    </div>
  );
};

export default Hero;
