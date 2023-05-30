import React, { useState, useEffect } from "react";

import Face from "./Face";
import FaceMover from "./FaceMover";

function FaceContainer({ move, emotion, canChangeEmotion = true }) {
  useEffect(() => {}, [move]);
  const [faceparameter, setFaceparameter] = useState({
    irisr: 0,
    irisarg: 0,
    xturn: 0,
    yturn: 0,
    eyelidturn: 100,
    eyelidarg: 0,
    eyebrowin: 0,
    eyebrowex: 0,
    eyebrowce: 0,
    mouthedge: 0,
    mouthup: 0,
    mouthlow: 0,
  });
  // stateにパラメータを追加

  const setfixedparameter = (name, value) => {
    setFaceparameter({ ...faceparameter, [name]: value });
  };
  const addtoparameter = (name, n) => {
    setFaceparameter({ ...faceparameter, [name]: faceparameter[name] + n });
  };
  return (
    <div className="face-container">
      <Face faceparameter={faceparameter} />
      <FaceMover
        emotion={emotion}
        move={move}
        faceparameter={faceparameter}
        setFaceparameter={setFaceparameter}
        canChangeEmotion={canChangeEmotion}
      />
    </div>
  );
}

export default FaceContainer;