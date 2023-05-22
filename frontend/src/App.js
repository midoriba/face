import React, { useState } from 'react'
import './App.css';
import FaceContainer from './Components/face/FaceContainer'
import Chat from './Components/Chat/Chat';

function App() {
  return (
    <div className="App">
      <Chat />
      <FaceContainer emotion={{r:1, arg:60}}/>
    </div>
  );
}

export default App;
//-34