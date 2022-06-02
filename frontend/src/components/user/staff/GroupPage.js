import React from 'react'
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom'


function GroupPage() {
  let navigate = useNavigate()
  return (
    <motion.div
    initial={{  y:250}}
    animate={{  y:0}}
    exit={{ x: window.innerWidth, y: window.innerHeight }}
    className='container'
    >
      <h1 className='mt-3'>Group 1</h1>
        <Link to='/chat_forum'>
          <h2>Chat Forum</h2>
        </Link>
      <h2>Documents</h2>
    </motion.div>
  )
}

export default GroupPage