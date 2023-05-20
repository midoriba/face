import React, { useState } from 'react'
import './App.css';
import FaceContainer from './Components/face/FaceContainer'

function App() {
  return (
    <div className="App">
      <FaceContainer emotion={{r:1, arg:60}}/>
    </div>
  );
}

export default App;
//-34