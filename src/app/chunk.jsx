import React, { useState, useEffect } from "react";
import { Button, Select } from 'antd'
import style from './chunk.less'

const chunk = () => {
  console.log('chunk')
  const [text, setText] = useState('')
  const a = () => {
    import(/* webpackChunkName: "List" */ './page/list').then(res => {
      return setText(res.default)
    })
  }
  return <div className={style.container}>
    <Select defaultValue={1}>
      <Select.Option value={1}>中国</Select.Option>
      <Select.Option value={2}>韩国</Select.Option>
    </Select>
    <Button onClick={a}>点我122！</Button>
    {text}
</div>}

export default chunk