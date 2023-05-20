import React from "react";

function Face({ faceparameter }) {
  const eyelidcalc = ({ sweep_flag, ry }) => {
    return `100 ${ry} 0 0 ${sweep_flag}`;
  };
  const collapsecalc = () => {
    const x = faceparameter.x;
    const y = faceparameter.y;
    return 1 - (Math.sqrt(x * x + y * y) * 0.15) / 100;
  };
  const eyecenterxcalc = () => {
    return xturntranscalc;
  };
  const xturncalc = () => {
    let retx = 1;
    const xturn = faceparameter.xturn;
    if (xturn > 0) {
      retx = 1 - (xturn * 0.15) / 100;
    } else {
      retx = 1 - (-xturn * 0.15) / 100;
    }
    return retx;
  };
  const yturncalc = () => {
    let rety = 1;
    const yturn = faceparameter.yturn;
    if (yturn > 0) {
      rety = 1 - (yturn * 0.15) / 100;
    } else {
      rety = 1 - (-yturn * 0.15) / 100;
    }
    return rety;
  };
  const xturntranscalc = () => {
    let retx = 0;
    const xturn = faceparameter.xturn;
    if (xturn > 0) {
      retx = (xturn * 112.5) / 100 + (xturn * 50) / 100;
    } else {
      retx = (xturn * 50) / 100;
    }
    return retx;
  };
  const yturntranscalc = () => {
    let rety = 0;
    const yturn = faceparameter.yturn;
    if (yturn > 0) {
      rety = (yturn * 112.5) / 100 + (yturn * 50) / 100;
    } else {
      rety = (yturn * 50) / 100;
    }
    return rety;
  };
  const lefteyelidposition = () => {
    const eyelidturn = faceparameter.eyelidturn;
    let sweep_flag = 0;
    let ry = 0;
    if (eyelidturn > 50) {
      sweep_flag = 0;
      ry = eyelidturn * 2 - 100;
    } else {
      sweep_flag = 1;
      ry = 100 - eyelidturn * 2;
    }
    return `M 100 300 A 100 100 0 1 1 300 300 A 100 ${ry} 0 0 ${sweep_flag} 100 300 z`;
  };
  const righteyelidposition = () => {
    const eyelidturn = faceparameter.eyelidturn;
    let sweep_flag = 0;
    let ry = 0;
    if (eyelidturn > 50) {
      sweep_flag = 0;
      ry = eyelidturn * 2 - 100;
    } else {
      sweep_flag = 1;
      ry = 100 - eyelidturn * 2;
    }
    return `M 450 300 A 100 100 0 1 1 650 300 A 100 ${ry} 0 0 ${sweep_flag} 450 300 z`;
  };
  const lefteyelidrotatecalc = () => {
    const eyelidarg = faceparameter.eyelidarg;
    return `rotate(${eyelidarg} 200 300)`;
  };
  const righteyelidrotatecalc = () => {
    const eyelidarg = faceparameter.eyelidarg;
    return `rotate(${-eyelidarg} 550 300)`;
  };
  const leftirisposition = () => {
    const irisr = faceparameter.irisr;
    const irisarg = (faceparameter.irisarg * Math.PI) / 180;
    const x = irisr * Math.cos(irisarg);
    const y = irisr * Math.sin(irisarg);
    return `translate(${x} ${y})`;
  };
  const rightirisposition = () => {
    const irisr = faceparameter.irisr;
    const irisarg = (faceparameter.irisarg * Math.PI) / 180;
    const x = irisr * Math.cos(irisarg);
    const y = irisr * Math.sin(irisarg);
    return `translate(${x} ${y})`;
  };
  const nosexturntranscalc = () => {
    let retx = 0;
    const xturn = faceparameter.xturn;
    retx = (xturn * 50) / 100;
    return retx;
  };
  const noseyturntranscalc = () => {
    let rety = 0;
    const yturn = faceparameter.yturn;
    rety = (yturn * 50) / 100;
    return rety;
  };
  const eyebrowxturntranscalc = () => {
    let retx = 0;
    const xturn = faceparameter.xturn;
    retx = (xturn * 20) / 100;
    return retx;
  };
  const eyebrowyturntranscalc = () => {
    let rety = 0;
    const yturn = faceparameter.yturn;
    rety = (yturn * 20) / 100;
    return rety;
  };
  const lefteyebrowposition = () => {
    const exparam = faceparameter.eyebrowex;
    const inparam = faceparameter.eyebrowin;
    const ceparam = faceparameter.eyebrowce;
    const maxtrans = 80;
    const exedge = [100, 130 + (maxtrans * exparam) / 300];
    const inedge = [300, 130 + (maxtrans * inparam) / 100];
    const center = [200, 100 + (maxtrans * ceparam) / 200];
    return `M ${exedge[0]} ${exedge[1]} Q ${center[0]} ${center[1]} ${inedge[0]} ${inedge[1]}`;
  };
  const righteyebrowposition = () => {
    const exparam = faceparameter.eyebrowex;
    const inparam = faceparameter.eyebrowin;
    const ceparam = faceparameter.eyebrowce;
    const maxtrans = 80;
    const exedge = [650, 130 + (maxtrans * exparam) / 300];
    const inedge = [450, 130 + (maxtrans * inparam) / 100];
    const center = [550, 100 + (maxtrans * ceparam) / 200];
    return `M ${exedge[0]} ${exedge[1]} Q ${center[0]} ${center[1]} ${inedge[0]} ${inedge[1]}`;
  };
  const mouthposition = () => {
    const edparam = faceparameter.mouthedge;
    const upparam = faceparameter.mouthup;
    const lowparam = faceparameter.mouthlow;
    const maxtrans = 80;
    const leftedge = [280, 560 + (maxtrans * edparam) / 100];
    const rightedge = [470, 560 + (maxtrans * edparam) / 100];
    const lowright = [440, 570 + (maxtrans * lowparam) / 100];
    const lowleft = [310, 570 + (maxtrans * lowparam) / 100];
    const upright = [440, 570 + (maxtrans * upparam) / 100];
    const upleft = [310, 570 + (maxtrans * upparam) / 100];
    return `M ${leftedge[0]} ${leftedge[1]} C ${upleft[0]} ${upleft[1]} ${upright[0]} ${upright[1]} ${rightedge[0]} ${rightedge[1]} C ${lowright[0]} ${lowright[1]} ${lowleft[0]} ${lowleft[1]} ${leftedge[0]} ${leftedge[1]} z`;
  };
  return (
    <div>
      <svg className="moveface" viewBox="0 0 750 750 ">
        <rect className="skin" cx="0" cy="0" width="1000px" height="1000" />
        <g
          className="parts"
          transform={
            "translate(" +
            xturntranscalc() +
            " " +
            yturntranscalc() +
            ")" +
            "scale(" +
            xturncalc() +
            " " +
            yturncalc() +
            ")"
          }
        >
          <path
            className="eyebrow lefteye"
            d={lefteyebrowposition()}
            transform={"translate(" + eyebrowxturntranscalc() + " " + eyebrowyturntranscalc() + ")"}
          />
          <path
            className="eyebrow righteye"
            d={righteyebrowposition()}
            transform={"translate(" + eyebrowxturntranscalc() + " " + eyebrowyturntranscalc() + ")"}
          />
          <circle className="whiteeye lefteye" cx="200" cy="300" r="100" />
          <circle className="whiteeye righteye" cx="550" cy="300" r="100" />
          <circle className="iris lefteye" cx="200" cy="300" r="50" transform={leftirisposition()} />
          <circle className="iris righteye" cx="550" cy="300" r="50" transform={rightirisposition()} />
          <path className="eyelid lefteye" d={lefteyelidposition()} transform={lefteyelidrotatecalc()} />
          <path className="eyelid righteye" d={righteyelidposition()} transform={righteyelidrotatecalc()} />
          <ellipse
            className="nose center"
            cx="375"
            cy="430"
            rx="65"
            ry="55"
            transform={"translate(" + nosexturntranscalc() + " " + noseyturntranscalc() + ")"}
          />
          <path className="mouth center" d={mouthposition()} />
        </g>
      </svg>
    </div>
  );
}

export default Face;