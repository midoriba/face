import React, { useState } from 'react'
import FaceMover from './FaceMover'
import Face from './Face'

function FaceContainer() {
  const [faceparameter, setFaceparameter] = useState({
    irisr:0,
    irisarg:0,
    xturn:0,
    yturn:0,
    eyelidturn:100,
    eyelidarg:0,
    eyebrowin:0,
    eyebrowex:0,
    eyebrowce:0,
    mouthedge:0,
    mouthup:0,
    mouthlow:0,
  })
  // stateにパラメータを追加
  console.log(faceparameter)
  
  const setfixedparameter = (name, value) => {
    setFaceparameter({ ...faceparameter, [name]: value })
  }
  const addtoparameter = (name, n) => {
    setFaceparameter({ ...faceparameter, [name]: faceparameter[name]+n})
  }
  return (
    <div className="FaceContainer">
      {faceparameter.yturn}
      <Face faceparameter={faceparameter}/>
      <FaceMover faceparameter={faceparameter} setFaceparameter={setFaceparameter}/>
    </div>
  )
}

export default FaceContainer