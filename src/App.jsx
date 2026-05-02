import React from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import Hero from "./Components/custom/Hero";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="overflow-hidden">
      <Hero />
    </div>
  );
};

export default App;
