import React from 'react'
import { motion } from "framer-motion"

function SupervisorList() {
    const supervisors = [
        { id: 1, name: "Supervisor 1", Interest: "Research Interest 1" },
        { id: 2, name: "Supervisor 2", Interest: "Research Interest 2" },
        { id: 3, name: "Supervisor 3", Interest: "Research Interest 3" },
        { id: 4, name: "Supervisor 4", Interest: "Research Interest 4" },
        { id: 5, name: "Supervisor 5", Interest: "Research Interest 5" }
    ]

  return (
    <motion.div
    initial={{  y:250}}
    animate={{  y:0}}
    exit={{ x: window.innerWidth, y: window.innerHeight }}
    className='container'>
        <h1 className='mt-3'> List of Supervisors </h1>
        <table className='table table-light table-striped table-hover mt-5'>
            <thead>
                <tr className='table-row'>
                    <th scope='col'> Name </th>
                    <th scope='col'> Interest </th>
                    <th scope='col'> Request </th>
                </tr>
            </thead>
            <tbody>
                {supervisors.map(supervisor=>{
                    return(<tr key={supervisor.id}>
                        <td> { supervisor.name } </td>
                        <td style={{}}> { supervisor.Interest } </td>
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

export default SupervisorList