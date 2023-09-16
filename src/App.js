import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from './components/Home'
import Results from './components/Results'

function App() {
  return (
    <div className="App w-full h-screen">
      <Routes>
         <Route path="/" element={<Home />}/>
         <Route path="/results/:url" element={<Results />}/> 
      </Routes> 
    </div>
  );
}

export default App;
