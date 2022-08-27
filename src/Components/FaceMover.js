import React from 'react'

function FaceMover(props) {
  const neutralface = () => {
    return new Promise(resolve => {
        const v = 10
        let count = 0
        let mode = false //False:下がる, True:上がる
        props.setFaceparameter(prev => ({...prev, irisarg:-90}))
        const id = setInterval(() => {
          props.setFaceparameter(prev => ({...prev, yturn:count, irisr:count/3}))
          console.log(count)
          if(mode){
            count -= v
          }
          else{
            count += v
          }
          if(mode && count <= 0){
            resolve()
            clearInterval(id)
          }
          else if(count > 80){
            mode = true
          }
        }, 10)
      })
  }
  const nod = () => {
    return new Promise(resolve => {
      const v = 3
      const limit = 80
      let count = 0
      let mode = false //False:下がる, True:上がる
      props.setFaceparameter(prev => ({...prev, irisarg:-90}))
      const id = setInterval(() => {
        props.setFaceparameter(prev => ({...prev, yturn:count, irisr:count/3}))
        console.log(count)
        if(mode){
          count -= v
        }
        else{
          count += v
        }
        if(mode && count <= 0){
          resolve()
          clearInterval(id)
        }
        else if(count > 80){
          mode = true
        }
      }, 10)
    })
  }
  const shakehead = () => {
    return new Promise(resolve => {
      const v = 10
      const limit = 80
      let count = props.faceparameter.xturn
      let mode = false //False:右に振る, True:左に振る
      props.setFaceparameter(prev => ({...prev, irisarg:180}))
      const id = setInterval(() => {
        props.setFaceparameter(prev => ({...prev, xturn:count, irisr:count/2}))
        console.log(count)
        if(mode){
          count -= v
        }
        else{
          count += v
        }
        if(!mode && count === 0){
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
    await neutralface()
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