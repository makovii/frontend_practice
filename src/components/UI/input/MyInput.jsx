import React from 'react'
import classes from './MuInput.module.css'

function MyInput(props) {
  return (
    <input className={classes.MyInput} {...props}/>
  )
}

export default MyInput
