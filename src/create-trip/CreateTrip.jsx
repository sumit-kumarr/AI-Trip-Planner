import { SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import React, { useEffect } from "react";
import { toast } from "sonner";

const CreateTrip = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const [formData, setFormData] = React.useState([]);

  const handleInputChange = (name, value) => {
    if (name == "days" && value > 5) {
      toast("Please select a value less than 5 for days.");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    if (inputValue.length > 2) {
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(inputValue)}&apiKey=854f0317d96e41d9877c37c39d294ce6`;
      fetch(url)
        .then(response => response.json())
        .then(result => {
          if (result.features) {
            setSuggestions(result.features.map(f => f.properties.formatted));
          }
        })
        .catch(error => console.log('error', error));
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const OnGenerateTrip = () => {
    if (formData?.days > 5 && !formData?.location || !formData?.budget || !formData?.travelers) {
      toast("Please fill all the fields and select a value less than 5 for days.");
      return;
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-2 bg-cover h-full" style={{backgroundImage:"url('/bg4.jpg')",backgroundPosition:'center',backgroundRepeat:'no-repeat'}}>
      {/* <h1 className="text-3xl font-bold mb-6 text-center">Create Your Trip</h1> */}

      <h2 className="font-bold text-3xl mb-4 p-4">
        Tell Us Your Travel Preferences🛩️
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Share your travel preferences, interests, and any specific requirements
        you have for your trip. The more details you provide, the better we can
        tailor your itinerary to your needs.
      </p>

      <h2 className="font-bold text-3xl mb-4">
        Get Your Personalized Itinerary
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Our AI will analyze your preferences and generate a personalized
        itinerary for your trip. You'll receive recommendations for
        destinations, activities, accommodations, and more, all tailored to your
        unique travel style.
      </p>

      <div className="mt-20 flex flex-col gap-15">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of Choice?
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter destination"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        handleInputChange("location", s);
                        setInputValue(s);
                        setSuggestions([]);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </h2>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days do you want to spend on this trip?
          </h2>
          <input
            placeholder="EX.3"
            className="w-full border border-gray-300 rounded-md p-2"
            type="number"
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          What is your preferred travel budget?<br></br>
          The Budget can be cheap, moderate or luxury.
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {SelectBudgetOptions.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`border border-black rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-100/80 transition duration-300 backdrop-blur-md bg-white/60
                  ${formData.budget === item.title ? "bg-gray-200/80 border-black" : ""}
                  `}
              >
                <h2 className="text-2xl mb-2">{item.icon}</h2>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
          What do you plan on Travelling with on your next Adventure?<br></br>
          It can be just you, a couple, family or friends.
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {SelectTravelList.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleInputChange("travelers", item.people)}
                className={`border border-black rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-100/80 transition duration-300 backdrop-blur-md bg-white/60
                  ${formData.travelers === item.people ? "bg-gray-200 border-black" : ""}
                  `}
              >
                <h2 className="text-2xl mb-2">{item.icon}</h2>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end mt-20 my-10">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-blue-600 transition duration-300 cursor-pointer mb-10"
          onClick={OnGenerateTrip}
        >
          Generate Trip🛩️
        </button>
      </div>
    </div>
  );
};

export default CreateTrip;
