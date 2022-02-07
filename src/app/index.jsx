import React, { useState, useEffect } from 'react'
import Chunk from './chunk'
import style from './style.less'

const App = () => {
  console.log('App')
  const [chunk, setChunk] = useState(' 你好！');
  // useEffect
  return <div className={style.container} onClick={() => setChunk('dfdf')}>
    Hello World!
    {
      chunk
    }
    <Chunk />
  </div>
}

export default App