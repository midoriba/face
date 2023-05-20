import React, { useState } from 'react'
import FaceContainer from './FaceContainer'

function FaceController(props){
  const handleChange = (e) => {
    const { name, value } = e.target
    props.setfixedparameter(name, value)
  }
  return (
    <div className="value-selecter">
      <ul>
        <li>
          <span>横回転</span><input type="range" name="xturn" min="-100" max="100" value="0" onChange={handleChange}/>
          <span>縦回転</span><input type="range" name="yturn" min="-100" max="100" value="0" onChange={handleChange}/>
        </li>
        <li>
          <span>瞼</span><input type="range" name="eyelidturn" min="0" max="100" value="100" onChange={handleChange} />
          <span>瞼の角度</span><input type="range" name="eyelidarg" min="-20" max="20" value="0" onChange={handleChange} />
          <span>黒目の距離</span><input type="range" name="irisr" min="0" max="50" value="0" onChange={handleChange} />
          <span>黒目の角度</span><input type="range" name="irisarg" min="-180" max="180" value="0" onChange={handleChange} />
        </li>
        <li>
          <span>眉内</span><input type="range" name="eyebrowin" min="-100" max="100" value="0" onChange={handleChange} />
          <span>眉中央</span><input type="range" name="eyebrowce" min="-100" max="100" value="0" onChange={handleChange} />
          <span>眉外</span><input type="range" name="eyebrowex" min="-100" max="100" value="0" onChange={handleChange} />
        </li>
        <li>
          <span>口端</span><input type="range" name="mouthedge" min="-100" max="100" value="0" onChange={handleChange} />
          <span>上唇</span><input type="range" name="mouthup" min="-100" max="100" value="0" onChange={handleChange} />
          <span>下唇</span><input type="range" name="mouthlow" min="-100" max="100" value="0" onChange={handleChange} />
        </li>
      </ul>
    </div>
  )
}

export default FaceController