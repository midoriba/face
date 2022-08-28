import React from 'react'

function FaceMover(props) {
  //口パク
  const speak = (v = 5) => {
    return new Promise(resolve => {
      const limit = 80
      let count = 0
      let mode = false //False:下がる, True:上がる
      props.setFaceparameter(prev => ({...prev, irisarg:-90}))
      const id = setInterval(() => {
        console.log(count)
        if(mode){
          props.setFaceparameter(prev => ({...prev, mouthlow:prev.mouthlow-v}))
          count -= v
        }
        else{
          props.setFaceparameter(prev => ({...prev, mouthlow:prev.mouthlow+v}))
          count += v
        }
        if(mode && count <= 0){
          props.setFaceparameter(prev => ({...prev, mouthlow:Math.trunc(prev.mouthlow)}))
          resolve()
          clearInterval(id)
        }
        else if(count > limit){
          mode = true
        }
      }, 10)
    })
  }  
  //目を開く
  const openeye = (v = 5) => {
    return new Promise(resolve => {
      const id = setInterval(() => {
        props.setFaceparameter(prev => {
            const prevv = prev.eyelidturn
            if (prevv > 100 - v){
              resolve()
              clearInterval(id)
              return {...prev, eyelidturn:100}
            }
            else {
              return {...prev, eyelidturn:prevv + v}
            }
        })
      }, 10)
    })
  }
  //目を閉じる
  const closeeye = (v = 5) => {
    return new Promise(resolve => {
      const id = setInterval(() => {
        props.setFaceparameter(prev => {
            const prevv = prev.eyelidturn
            if (prevv < v){
              resolve()
              clearInterval(id)
              return {...prev, eyelidturn:0}
            }
            else {
              return {...prev, eyelidturn:prevv - v}
            }
        })
      }, 10)
    })
  }
  //呼吸
  const breathe = (time = 5, v = 0.05) => {
    return new Promise(resolve => {
      const limit = 10
      let count = 0
      let timecount = 0
      let mode = false //False:下がる, True:上がる
      props.setFaceparameter(prev => ({...prev, irisarg:-90}))
      const id = setInterval(() => {
        if(mode){
          props.setFaceparameter(prev => ({...prev, yturn:prev.yturn-v, irisr:prev.irisr-(v/3)}))
          count -= v
        }
        else{
          props.setFaceparameter(prev => ({...prev, yturn:prev.yturn+v, irisr:prev.irisr+(v/3)}))
          count += v
        }
        if(mode && count <= 0 && timecount >= time){
          props.setFaceparameter(prev => ({...prev, yturn:Math.trunc(prev.yturn), irisr:Math.trunc(prev.irisr)}))
          resolve()
          clearInterval(id)
        }
        else if(mode && count <= 0 && timecount < time){
          timecount += 1
          mode = false
        }
        else if(count > limit){
          mode = true
        }
      }, 10)
    })
  }
  //うなずく
  const nod = () => {
    return new Promise(resolve => {
      const v = 3
      const limit = 80
      let count = 0
      let mode = false //False:下がる, True:上がる
      props.setFaceparameter(prev => ({...prev, irisarg:-90}))
      const id = setInterval(() => {
        console.log(count)
        if(mode){
          props.setFaceparameter(prev => ({...prev, yturn:prev.yturn-v, irisr:prev.irisr-(v/3)}))
          count -= v
        }
        else{
          props.setFaceparameter(prev => ({...prev, yturn:prev.yturn+v, irisr:prev.irisr+(v/3)}))
          count += v
        }
        if(mode && count <= 0){
          props.setFaceparameter(prev => ({...prev, yturn:Math.trunc(prev.yturn), irisr:Math.trunc(prev.irisr)}))
          resolve()
          clearInterval(id)
        }
        else if(count > limit){
          mode = true
        }
      }, 10)
    })
  }
  //首を振る
  const shakehead = () => {
    return new Promise(resolve => {
      const v = 10
      const limit = 80
      let count = props.faceparameter.xturn
      let mode = false //False:右に振る, True:左に振る
      props.setFaceparameter(prev => ({...prev, irisarg:180}))
      const id = setInterval(() => {
        if(mode){
          props.setFaceparameter(prev => ({...prev, xturn:prev.xturn-v, irisr:prev.irisr-(v/2)}))
          count -= v
        }
        else{
          props.setFaceparameter(prev => ({...prev, xturn:prev.xturn+v, irisr:prev.irisr+(v/2)}))
          count += v
        }
        if(!mode && count === 0){
          props.setFaceparameter(prev => ({...prev, xturn:Math.trunc(prev.xturn), irisr:Math.trunc(prev.irisr)}))
          resolve()
          clearInterval(id)
        }
        else if(count > limit){
          mode = true
        }
        else if(count < -limit){
          mode = false
        }
      }, 10)
    })
  }
  const move = async () => {
    breathe()
    await closeeye(1)
    speak()
    await openeye(1)
    await closeeye(5)
    await openeye(5)
  }
  return (
    <div className='action-button'>
      <ul>
        <li>{props.faceparameter.yturn}<button type='button' onClick={nod}>nod</button></li>
        <li>{props.faceparameter.xturn}<button type='button' onClick={shakehead}>shakehead</button></li>
        <li>{props.faceparameter.yturn}<button type='button' onClick={move}>move</button></li>
      </ul>
    </div>
  )
}

export default FaceMover