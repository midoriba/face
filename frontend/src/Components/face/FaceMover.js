import { useEffect, useRef } from "react";

function FaceMover(props) {
  // 感情を表情に適用
  const emotiontoface = async (r, arg) => {
    console.log('mover')
    if (props.canChangeEmotion === false) {
      console.log('mover return')
      return;
    }
    const v = 1;
    const radarg = (arg * Math.PI) / 180;
    const x = r * Math.cos(radarg);
    const y = r * Math.sin(radarg);
    const eyelidwidth = () => {
      const ret = 100 + y * 50;
      if (ret > 100) {
        return 100;
      } else {
        return ret;
      }
    };
    const yturn = () => {
      if (y < 0) {
        return -y * 40;
      } else {
        return 0;
      }
    };
    const eyebrowdist = -(80 * x) + 10 * y;
    const mouthcorner = -50 * x;
    baseFaceParameterRef.current = {
      ...baseFaceParameterRef.current,
      eyelidturn: eyelidwidth(),
      mouthedge: mouthcorner,
      yturn: yturn(),
    };
    await Promise.all([
      seteyelidwidth(eyelidwidth(), v),
      seteyebrowdist(eyebrowdist, v),
      setmouthcorner(mouthcorner, v),
      setyturn(yturn(), v),
    ]);
  };
  // 表情関数
  // 目の開き
  const seteyelidwidth = (w = 100, v = 5) => {
    return new Promise((resolve) => {
      const id = setInterval(() => {
        props.setFaceparameter((prev) => {
          const prevv = prev.eyelidturn;
          if (prevv > w - v && prevv < w + v) {
            resolve();
            clearInterval(id);
            return { ...prev, eyelidturn: w };
          } else if (prevv < w) {
            return { ...prev, eyelidturn: prevv + v };
          } else {
            return { ...prev, eyelidturn: prevv - v };
          }
        });
      }, 10);
    });
  };
  // 口角
  const setmouthcorner = (w = 50, v = 5) => {
    return new Promise((resolve) => {
      const id = setInterval(() => {
        props.setFaceparameter((prev) => {
          const prevv = prev.mouthedge;
          if (prevv > w - v && prevv < w + v) {
            resolve();
            clearInterval(id);
            return { ...prev, mouthedge: w };
          } else if (prevv < w) {
            return { ...prev, mouthedge: prevv + v };
          } else {
            return { ...prev, mouthedge: prevv - v };
          }
        });
      }, 10);
    });
  };
  // 眉
  const seteyebrowdist = (w = 60, v = 5) => {
    return new Promise((resolve) => {
      const id = setInterval(() => {
        props.setFaceparameter((prev) => {
          const prevv = prev.eyebrowce;
          if (prevv > w - v && prevv < w + v) {
            resolve();
            clearInterval(id);
            return { ...prev, eyebrowex: w, eyebrowce: w, eyebrowin: w };
          } else if (prevv < w) {
            return {
              ...prev,
              eyebrowex: prevv + v,
              eyebrowce: prevv + v,
              eyebrowin: prevv + v,
            };
          } else {
            return {
              ...prev,
              eyebrowex: prevv - v,
              eyebrowce: prevv - v,
              eyebrowin: prevv - v,
            };
          }
        });
      }, 10);
    });
  };

  // 動作関数
  // 首の角度
  const setyturn = (w = 60, v = 5) => {
    return new Promise((resolve) => {
      const id = setInterval(() => {
        props.setFaceparameter((prev) => {
          const prevv = prev.yturn;
          if (prevv > w - v && prevv < w + v) {
            resolve();
            clearInterval(id);
            return { ...prev, yturn: w };
          } else if (prevv < w) {
            return { ...prev, yturn: prevv + v };
          } else {
            return { ...prev, yturn: prevv - v };
          }
        });
      }, 10);
    });
  };
  // 口パク
  const speak = (v = 5) => {
    const limit = 80;
    let count = 0;
    let timecount = 0;
    let mode = false; // False:下がる, True:上がる
    props.setFaceparameter((prev) => ({ ...prev, irisarg: -90 }));
    const id = setInterval(() => {
      if (mode) {
        props.setFaceparameter((prev) => {
          return { ...prev, mouthlow: prev.mouthlow - v };
        });
        count -= v;
      } else {
        props.setFaceparameter((prev) => {
          return { ...prev, mouthlow: prev.mouthlow + v };
        });
        count += v;
      }
      // if (mode && count <= 0) {
      if (count <= 0) {
        timecount++;
        mode = false;
      } else if (count > limit) {
        mode = true;
      }
    }, 10);
    return id;
  };
  const closeMouth = (v = 5) => {
    return new Promise((resolve) => {
      const id = setInterval(() => {
        props.setFaceparameter((prev) => {
          const prevv = prev.mouthlow;
          if (prevv < v) {
            resolve();
            clearInterval(id);
            return { ...prev, mouthlow: 0 };
          } else {
            return { ...prev, mouthlow: prevv - v };
          }
        });
      }, 10);
    });
  };

  // 目を開く
  const openeye = (v = 0.5, limit = 100) => {
    return new Promise((resolve) => {
      const id = setInterval(() => {
        props.setFaceparameter((prev) => {
          const prevv = prev.eyelidturn;
          if (prevv > limit - v) {
            resolve(id);
            return { ...prev, eyelidturn: limit };
          } else {
            return { ...prev, eyelidturn: prevv + v };
          }
        });
      }, 100);
    });
  };
  // 目を閉じる
  const closeeye = (v = 0.5, limit = 0) => {
    return new Promise((resolve) => {
      const id = setInterval(() => {
        props.setFaceparameter((prev) => {
          const prevv = prev.eyelidturn;
          if (prevv < limit + v) {
            resolve(id);
            return { ...prev, eyelidturn: 0 };
          } else {
            return { ...prev, eyelidturn: prevv - v };
          }
        });
      }, 100);
    });
  };
  // 呼吸
  const breathe = (v = 0.05) => {
    const limit = 10;
    let count = 0;
    let mode = false; // False:下がる, True:上がる
    props.setFaceparameter((prev) => ({ ...prev, irisarg: -90 }));
    return setInterval(() => {
      if (mode) {
        props.setFaceparameter((prev) => ({
          ...prev,
          yturn: prev.yturn - v,
          irisr: prev.irisr - v / 3,
        }));
        count -= v;
      } else {
        props.setFaceparameter((prev) => ({
          ...prev,
          yturn: prev.yturn + v,
          irisr: prev.irisr + v / 3,
        }));
        count += v;
      }
      if (mode && count <= 0) {
        mode = false;
      } else if (count > limit) {
        mode = true;
      }
    }, 10);
  };
  // 瞬き
  const blink = () => {
    return new Promise((resolve) => {
      const v = 33;
      let mode = true; // False:開く, True:閉じる
      const id = setInterval(() => {
        props.setFaceparameter((prev) => {
          if (mode) {
            if (prev.eyelidturn <= v) {
              mode = false;
              return {
                ...prev,
                eyelidturn: 0,
              };
            }
            return {
              ...prev,
              eyelidturn: prev.eyelidturn - v,
            };
          } else {
            if (prev.eyelidturn >= baseFaceParameterRef.current.eyelidturn - v) {
              console.log(`blink ok`);
              resolve(id);
              return {
                ...prev,
                eyelidturn: baseFaceParameterRef.current.eyelidturn,
              };
            } else {
              return {
                ...prev,
                eyelidturn: prev.eyelidturn + v,
              };
            }
          }
        });
      }, 100);
    });
  };
  // 瞬きを続ける
  const continueBlinking = async (interval = 4000) => {
    return setInterval(() => {
      blink().then((id) => {
        clearInterval(id);
      });
    }, interval);
  };
  // うなずく
  const nod = () => {
    return new Promise((resolve) => {
      const v = 3;
      const limit = 80;
      let count = 0;
      let mode = false; // False:下がる, True:上がる
      props.setFaceparameter((prev) => ({ ...prev, irisarg: -90 }));
      const id = setInterval(() => {
        if (mode) {
          props.setFaceparameter((prev) => ({
            ...prev,
            yturn: prev.yturn - v,
            irisr: prev.irisr - v / 3,
          }));
          count -= v;
        } else {
          props.setFaceparameter((prev) => ({
            ...prev,
            yturn: prev.yturn + v,
            irisr: prev.irisr + v / 3,
          }));
          count += v;
        }
        if (mode && count <= 0) {
          props.setFaceparameter((prev) => ({
            ...prev,
            yturn: Math.trunc(prev.yturn),
            irisr: Math.trunc(prev.irisr),
          }));
          resolve();
          clearInterval(id);
        } else if (count > limit) {
          mode = true;
        }
      }, 10);
    });
  };
  // 首を振る
  const shakehead = () => {
    return new Promise((resolve) => {
      const v = 10;
      const limit = 80;
      let count = props.faceparameter.xturn;
      let mode = false; // False:右に振る, True:左に振る
      props.setFaceparameter((prev) => ({ ...prev, irisarg: 180 }));
      const id = setInterval(() => {
        if (mode) {
          props.setFaceparameter((prev) => ({
            ...prev,
            xturn: prev.xturn - v,
            irisr: prev.irisr - v / 2,
          }));
          count -= v;
        } else {
          props.setFaceparameter((prev) => ({
            ...prev,
            xturn: prev.xturn + v,
            irisr: prev.irisr + v / 2,
          }));
          count += v;
        }
        if (!mode && count === 0) {
          props.setFaceparameter((prev) => ({
            ...prev,
            xturn: Math.trunc(prev.xturn),
            irisr: Math.trunc(prev.irisr),
          }));
          resolve();
          clearInterval(id);
        } else if (count > limit) {
          mode = true;
        } else if (count < -limit) {
          mode = false;
        }
      }, 10);
    });
  };
  // 横を見る
  const lookaside = async (direction = false) => {
    // direction: falseで左、trueで右
    return new Promise((resolve) => {
      const v = 10;
      const limit = 80;
      let count = props.faceparameter.xturn;
      let mode = false; // False:右に振る, True:左に振る
      props.setFaceparameter((prev) => ({ ...prev, irisarg: 180 }));
      const id = setInterval(() => {
        if (mode) {
          props.setFaceparameter((prev) => ({
            ...prev,
            xturn: prev.xturn - v,
            irisr: prev.irisr + v / 2,
          }));
          count -= v;
        } else {
          props.setFaceparameter((prev) => ({
            ...prev,
            xturn: prev.xturn + v,
            irisr: prev.irisr - v / 2,
          }));
          count += v;
        }
        if (!mode && count === 0) {
          props.setFaceparameter((prev) => ({
            ...prev,
            xturn: Math.trunc(prev.xturn),
            irisr: Math.trunc(prev.irisr),
          }));
          resolve();
          clearInterval(id);
        } else if (count > limit) {
          mode = true;
        } else if (count < -limit) {
          mode = false;
        }
      }, 10);
    });
  };
  const moveMouthIdRef = useRef(null);
  const blinkingIdRef = useRef(null);
  const breathingIdRef = useRef(null);
  const baseFaceParameterRef = useRef(props.faceparameter);
  useEffect(() => {
    console.log("ue blink, breath", props.canChangeEmotion);
    if (breathingIdRef.current == null) {
      breathingIdRef.current = breathe();
    }
    if (blinkingIdRef.current == null) {
      blinkingIdRef.current = continueBlinking();
    }
  }, []);
  useEffect(() => {
    if (props.move === true) {
      moveMouthIdRef.current = speak();
    } else if (moveMouthIdRef.current !== null && moveMouthIdRef.current !== undefined) {
      clearInterval(moveMouthIdRef.current);
      props.setFaceparameter((prev) => ({ ...prev, mouthlow: 0 }));
      moveMouthIdRef.current = null;
    }
  }, [props.move]);
  useEffect(() => {
    emotiontoface(props.emotion.r, props.emotion.arg);
  }, [props.emotion]);
  return null;
  /* return (
    <div className='action-button'>
      <ul>
        <li><button type='button' onClick={emotiontoface}>emo</button></li>
        <li>{props.faceparameter.yturn}<button type='button' onClick={nod}>nod</button></li>
        <li>{props.faceparameter.xturn}<button type='button' onClick={shakehead}>shakehead</button></li>
        <li>{props.faceparameter.yturn}<button type='button' onClick={move}>move</button></li>
      </ul>
    </div>
  ) */
}

export default FaceMover;