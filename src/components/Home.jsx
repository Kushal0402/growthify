import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    const encodedUrl = btoa(url);
    if(url === ''){
      alert('Please enter a url before submitting');
      return
    }
    else if(url.includes('http')) {
      navigate(`/results/${encodedUrl}`);
    }
    else {
      alert('Invalid Link');
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Welcome to Growthify</h1>

      <div className="w-full flex justify-center items-center m-8">
        <p className="text-lg font-semibold mr-4">Enter your URL:</p>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border-2 p-2 rounded-lg text-center border-black"
          placeholder="Your Site URL"
        />
      </div>

      <button onClick={handleSubmit} className="bg-black text-white rounded-md p-2 hover:bg-gray-600 duration-150 ease-linear">
        Submit
      </button>
    </div>
  );
};

export default Home;
