import React from 'react'
import { motion } from "framer-motion"

function CoSupervisorList() {
    const co_supervisors = [
        { id: 1, name: "Co-Supervisor 1", Interest: "Research Interest 1" },
        { id: 2, name: "Co-Supervisor 2", Interest: "Research Interest 2" },
        { id: 3, name: "Co-Supervisor 3", Interest: "Research Interest 3" },
        { id: 4, name: "Co-Supervisor 4", Interest: "Research Interest 4" },
        { id: 5, name: "Co-Supervisor 5", Interest: "Research Interest 5" }
    ]

  return (
    <motion.div className='container'
    initial={{  y:250}}
    animate={{  y:0}}
    exit={{ x: window.innerWidth, y: window.innerHeight }}
    >
        <h1 className='mt-3'> List of Co-Supervisors </h1>
        <table className='table table-light table-striped table-hover mt-5'>
            <thead>
                <tr className='table-row'>
                    <th scope='col'> Name </th>
                    <th scope='col'> Interest </th>
                    <th scope='col'> Request </th>
                </tr>
            </thead>
            <tbody>
                {co_supervisors.map(co_supervisor=>{
                    return(<tr key={co_supervisor.id}>
                        <td> { co_supervisor.name } </td>
                        <td> { co_supervisor.Interest } </td>
                        <td>
                            <motion.button className='btn btn-primary px-4'
                            initial={{backgroundColor:'white', transitionDuration:"3s"}}
                            animate={{backgroundColor:'#015'}}
                            > Request </motion.button>
                        </td>
                    </tr>)
                })}
            </tbody>
        </table>
    </motion.div>
  )
}

export default CoSupervisorList