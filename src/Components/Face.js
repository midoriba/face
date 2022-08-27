import React, { useState } from 'react'

function Face(props) {
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
  const lefteyelidposition = () => {
    let eyelidturn = props.faceparameter.eyelidturn
    let sweep_flag = 0
    let ry = 0
    if(eyelidturn > 50) {
      sweep_flag = 0
      ry = eyelidturn * 2 - 100
    }
    else {
      sweep_flag = 1
      ry = 100 - eyelidturn * 2
    }
    return `M 100 300 A 100 100 0 1 1 300 300 A 100 ${ry} 0 0 ${sweep_flag} 100 300 z`
  }
  const righteyelidposition = () => {
    let eyelidturn = props.faceparameter.eyelidturn
    let sweep_flag = 0
    let ry = 0
    if(eyelidturn > 50) {
      sweep_flag = 0
      ry = eyelidturn * 2 - 100
    }
    else {
      sweep_flag = 1
      ry = 100 - eyelidturn * 2
    }
    return `M 450 300 A 100 100 0 1 1 650 300 A 100 ${ry} 0 0 ${sweep_flag} 450 300 z`
  }
  const lefteyelidrotatecalc = () => {
    let eyelidarg = props.faceparameter.eyelidarg
    return `rotate(${eyelidarg} 200 300)`
  }
  const righteyelidrotatecalc = () => {
    let eyelidarg = props.faceparameter.eyelidarg
    return `rotate(${-eyelidarg} 550 300)`
  }
  const leftirisposition = () => {
    let irisr = props.faceparameter.irisr
    let irisarg = props.faceparameter.irisarg * Math.PI / 180
    let x = irisr * Math.cos(irisarg)
    let y = irisr * Math.sin(irisarg)
    return `translate(${x} ${y})`
  }
  const rightirisposition = () => {
    let irisr = props.faceparameter.irisr
    let irisarg = props.faceparameter.irisarg * Math.PI / 180
    let x = irisr * Math.cos(irisarg)
    let y = irisr * Math.sin(irisarg)
    return `translate(${x} ${y})`
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
  const lefteyebrowposition = () => {
    let exparam = props.faceparameter.eyebrowex
    let inparam = props.faceparameter.eyebrowin
    let ceparam = props.faceparameter.eyebrowce
    const maxtrans = 80
    let exedge = [100, 130+maxtrans*exparam/100]
    let inedge = [300, 130+maxtrans*inparam/100]
    let center = [200, 100+maxtrans*ceparam/100]
    //console.log(`M ${exedge[0]} ${exedge[1]} Q ${center[0]} ${center[1]} ${inedge[0]} ${inedge[1]}`)
    //console.log(props.faceparameter)
    return `M ${exedge[0]} ${exedge[1]} Q ${center[0]} ${center[1]} ${inedge[0]} ${inedge[1]}`
  }
  const righteyebrowposition = () => {
    let exparam = props.faceparameter.eyebrowex
    let inparam = props.faceparameter.eyebrowin
    let ceparam = props.faceparameter.eyebrowce
    const maxtrans = 80
    let exedge = [650, 130+maxtrans*exparam/100]
    let inedge = [450, 130+maxtrans*inparam/100]
    let center = [550, 100+maxtrans*ceparam/100]
    return `M ${exedge[0]} ${exedge[1]} Q ${center[0]} ${center[1]} ${inedge[0]} ${inedge[1]}`
  }
  const mouthposition = () => {
    let edparam = props.faceparameter.mouthedge
    let upparam = props.faceparameter.mouthup
    let lowparam = props.faceparameter.mouthlow
    const maxtrans = 80
    let leftedge = [280, 550+maxtrans*edparam/100]
    let rightedge = [470, 550+maxtrans*edparam/100]
    let lowright = [440, 600+maxtrans*lowparam/100]
    let lowleft = [310, 600+maxtrans*lowparam/100]
    let upright = [440, 570+maxtrans*upparam/100]
    let upleft = [310, 570+maxtrans*upparam/100]
    return `M ${leftedge[0]} ${leftedge[1]} C ${upleft[0]} ${upleft[1]} ${upright[0]} ${upright[1]} ${rightedge[0]} ${rightedge[1]} C ${lowright[0]} ${lowright[1]} ${lowleft[0]} ${lowleft[1]} ${leftedge[0]} ${leftedge[1]} z`
  }
  return (
    <div>
    <svg className="moveface">
      <rect className="skin" cx="0" cy="0" width="1000px" height="1000"/>
      <g className="parts" transform={"translate("+xturntranscalc()+" "+yturntranscalc()+")" + "scale("+xturncalc()+" "+yturncalc()+")" }>
          <path className="eyebrow lefteye" d={lefteyebrowposition()} transform={"translate("+eyebrowxturntranscalc()+" "+eyebrowyturntranscalc()+")"}/>
          <path className="eyebrow righteye" d={righteyebrowposition()} transform={"translate("+eyebrowxturntranscalc()+" "+eyebrowyturntranscalc()+")"}/>
          <circle className="whiteeye lefteye" cx="200" cy="300" r="100"/>
          <circle className="whiteeye righteye" cx="550" cy="300" r="100"/>
          <circle className="iris lefteye" cx="200" cy="300" r="50" transform={leftirisposition()}/>
          <circle className="iris righteye" cx="550" cy="300" r="50" transform={rightirisposition()}/>
          <path className="eyelid lefteye" d={lefteyelidposition()} transform={lefteyelidrotatecalc()}/>
          <path className="eyelid righteye" d={righteyelidposition()} transform={righteyelidrotatecalc()}/>
          <ellipse className="nose center" cx="375" cy="430" rx="65" ry="55" transform={"translate("+nosexturntranscalc()+" "+noseyturntranscalc()+")"}/>
          <path className="mouth center" d={mouthposition()} />
      </g>
    </svg>
    <p>({props.faceparameter.xturn},{props.faceparameter.yturn})</p>
    </div>
  )
}

export default Face