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
      sweep_flag:0,
      ry:100
    },
    xturn:0,
    yturn:0
  })
  // 0-100で指定された瞼の開きをsvgのパラメータに変換
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
  // stateにパラメータを追加
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
  const frontarg = () => {
    let x = props.faceparameter.xturn
    let y = props.faceparameter.yturn
    let arg = 0
    if(x === 0 && y === 0) {
      return 0
    }
    else if(x === 0 && y > 0) {
      return Math.PI / 2
    }
    else if(x === 0 && y < 0) {
      return -Math.PI / 2
    }
    else {
      arg = Math.atan(y/x)
    }
    if(x < 0 && y >= 0) {
      return Math.PI + arg
    }
    else if(x < 0 && y < 0) {
      return -Math.PI + arg
    }
    else {
      return arg
    }
  }
  const eyelidcalc = ({sweep_flag, ry}) => {
    return `100 ${ry} 0 0 ${sweep_flag}`
  }
  const collapsecalc = () => {
    let x = props.faceparameter.x
    let y = props.faceparameter.y
    return 1 - (Math.sqrt(x*x + y*y) * 0.15 / 100)
  }
  const eyecenterxcalc = () => {
    return xturntranscalc
  }
  const xturncalc = () => {
    let retx = 1
    let xturn = props.faceparameter.xturn
    if(xturn > 0) {
      retx = 1 - (xturn * 0.15 / 100) 
    }
    else {
      retx = 1 - (-xturn * 0.15 / 100)
    }
    return retx
  }
  const yturncalc = () => {
    let rety = 1
    let yturn = props.faceparameter.yturn
    if(yturn > 0) {
      rety = 1 - (yturn * 0.15 / 100) 
    }
    else {
      rety = 1 - (-yturn * 0.15 / 100)
    }
    return rety
  }
  const xturntranscalc = () => {
    let retx = 0
    let xturn = props.faceparameter.xturn
    if(xturn > 0) {
      retx = (xturn * 112.5 / 100) + xturn * 50 / 100 
    }
    else{
      retx = xturn * 50 / 100
    }
    return retx
  }
  const yturntranscalc = () => {
    let rety = 0
    let yturn = props.faceparameter.yturn
    if(yturn > 0) {
      rety = (yturn * 112.5 / 100) + yturn * 50 / 100
    }
    else{
      rety = yturn * 50 / 100
    }
    return rety
  }
  const nosexturntranscalc = () => {
    let retx = 0
    let xturn = props.faceparameter.xturn
    retx =  xturn * 50 / 100 
    return retx
  }
  const noseyturntranscalc = () => {
    let rety = 0
    let yturn = props.faceparameter.yturn
    rety =  yturn * 50 / 100 
    return rety
  }
  const eyebrowxturntranscalc = () => {
    let retx = 0
    let xturn = props.faceparameter.xturn
    retx =  xturn * 20 / 100 
    return retx
  }
  const eyebrowyturntranscalc = () => {
    let rety = 0
    let yturn = props.faceparameter.yturn
    rety =  yturn * 20 / 100 
    return rety
  }
  return (
    <div>
    <svg className="moveface">
      <rect className="skin" cx="0" cy="0" width="1000px" height="1000"/>
      <g className="parts" transform={"translate("+xturntranscalc()+" "+yturntranscalc()+")" + "scale("+xturncalc()+" "+yturncalc()+")" }>
          <path className="eyebrow lefteye" d="M 100 130 Q 200 100 300 130" transform={"translate("+eyebrowxturntranscalc()+" "+eyebrowyturntranscalc()+")"}/>
          <path className="eyebrow righteye" d="M 450 130 Q 550 100 650 130" transform={"translate("+eyebrowxturntranscalc()+" "+eyebrowyturntranscalc()+")"}/>
          <circle className="whiteeye lefteye" cx="200" cy="300" r="100" transform={"rotate("+frontarg()+" "+200+xturntranscalc()+" "+300+yturntranscalc}/>
          <circle className="whiteeye righteye" cx="550" cy="300" r="100"/>
          <circle className="iris lefteye" cx="200" cy="300" r="50"/>
          <circle className="iris righteye" cx="550" cy="300" r="50"/>
          <path className="eyelid lefteye" d={`M 100 300 A 100 100 0 1 1 300 300 A ${eyelidcalc(props.faceparameter.eyelidturn)} 100 300`}/>
          <path className="eyelid righteye" d={`M 450 300 A 100 100 0 1 1 650 300 A ${eyelidcalc(props.faceparameter.eyelidturn)} 450 300`}/>
          <ellipse className="nose center" cx="375" cy="430" rx="65" ry="55" transform={"translate("+nosexturntranscalc()+" "+noseyturntranscalc()+")"}/>
          <path className="mouth center" d="M 280 550 C 310 600 440 600 470 550 C 440 570 310 570 280 550" />
      </g>
    </svg>
    <p>({props.faceparameter.xturn},{props.faceparameter.yturn}), {frontarg()}</p>
    </div>
  )
}

function FaceController(props){
  const handleChange = (e) => {
    const { name, value } = e.target
    props.setfixedparameter(name, value)
  }
  return (
    <div className="value-selecter">
      <span>横回転</span><input type="range" name="xturn" min="-100" max="100" value="0" onChange={handleChange}/>
      <span>縦回転</span><input type="range" name="yturn" min="-100" max="100" value="0" onChange={handleChange}/>
      <span>瞼</span><input type="range" name="eyelidturn" min="0" max="100" value="100" onChange={handleChange} />
    </div>
  )
}

export default App;
