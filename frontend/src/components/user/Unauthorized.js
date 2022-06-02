import React from 'react'
import { motion } from "framer-motion"

function Unauthorized() {
  return (
    <motion.div
    initial={{y:100}}
    animate={{y:0}}
    exit={{ y: window.innerHeight }}
    transition={{type:"spring", bounce:1}}
    className='py-5 text-warning' style={{height:window.innerHeight}} >
        <h1 className='py-5 mt-5 mb-5'> You tried accessing a page that only logged in users are allowed to access </h1>
        <br/>
        <h1> Please login first to gain access </h1>
    </motion.div>
  )
}

export default Unauthorized