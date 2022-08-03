import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <FaceContainer />
    </div>
  );
}

function FaceContainer() {
  const [faceparameter, setFaceparameter] = useState({
    eyelidturn: {
      "sweep_flag":0,
      "ry":100
    }
  })
  const eyelidpositioning = (n) => {
    if(n > 50) {
      return {
        "sweep_flag": 0,
        "ry": n * 2 - 100
      }
    }
    else {
      return {
        "sweep_flag": 1,
        "ry": 100-n*2
      }
    }
  }
  const setfixedparameter = (name, value) => {
    if(name == "eyelidturn"){
      setFaceparameter({ ...faceparameter, [name]: eyelidpositioning(value) })
    }
    else {
      setFaceparameter({ ...faceparameter, [name]: value })
    }
  }
  return (
    <div className="FaceContainer">
      <Face faceparameter={faceparameter}/>
      <FaceController setfixedparameter={setfixedparameter}/>
    </div>
  )
}

function Face(props) {
  const eyelidcalc = ({sweep_flag, ry}) => {
    return `100 ${ry} 0 0 ${sweep_flag}`
  }
  return (
    <svg className="moveface">
      <g className="face">
        <rect className="skin" cx="0" cy="0" width="1000px" height="1000"/>
        <g className="parts">
            <path className="eyebrow lefteye" d="M 100 130 Q 200 100 300 130"/>
            <path className="eyebrow righteye" d="M 450 130 Q 550 100 650 130"/>
            <circle className="whiteeye lefteye" cx="200" cy="300" r="100"/>
            <circle className="whiteeye righteye" cx="550" cy="300" r="100"/>
            <circle className="iris lefteye" cx="200" cy="300" r="50"/>
            <circle className="iris righteye" cx="550" cy="300" r="50"/>
            <path className="eyelid lefteye" d={`M 100 300 A 100 100 0 1 1 300 300 A ${eyelidcalc(props.faceparameter.eyelidturn)} 100 300`}/>
            <path className="eyelid righteye" d={`M 450 300 A 100 100 0 1 1 650 300 A 100 40 0 0 0 450 300`}/>
            <ellipse className="nose center" cx="375" cy="430" rx="65" ry="55"/>
            <path className="mouth center" d="M 280 550 C 310 600 440 600 470 550 C 440 570 310 570 280 550" />
        </g>
      </g>
    </svg>
  )
}

function FaceController(props){
  const handleChange = (e) => {
    const { name, value } = e.target
    props.setfixedparameter(name, value)
  }
  return (
    <div className="value-selecter">
      <span>縦回転</span><input type="range" name="xturn" min="-100" max="100" />
      <span>横回転</span><input type="range" name="yturn" min="-100" max="100" />
      <span>瞼</span><input type="range" name="eyelidturn" min="0" max="100" value="100" onChange={handleChange} />
    </div>
  )
}

export default App;
