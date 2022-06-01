import React from 'react'
import { motion } from "framer-motion"


function GroupPage() {
  return (
    <motion.div
    initial={{  y:250}}
    animate={{  y:0}}
    exit={{ x: window.innerWidth, y: window.innerHeight }}
    className='container'
    >
        <h1 className='mt-3'>Group 1</h1>
        <h2>Chat Forum</h2>
        <h2>Documents</h2>
    </motion.div>
  )
}

export default GroupPage