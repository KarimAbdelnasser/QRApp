import { CircularProgress, LinearProgress } from '@mui/material'
import React from 'react'

function Loading(Circular:any) {
  return (
    <>
    {console.log(Object.keys(Circular).length)}
    {Object.keys(Circular).length == 0? <LinearProgress sx={{width:"400px", ml: "auto", mr: "auto"}} />: <CircularProgress sx={{width:"400px", ml: "auto", mr: "auto"}}/>}
    </>
  )
}

export default Loading