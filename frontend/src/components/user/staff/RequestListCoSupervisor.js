import React from 'react'
import { motion } from "framer-motion"

function RequestListCoSupervisor() {

    const requestList = [
        { id: 1, grpId: "Grp_01", topic: "Research Topic 1" },
        { id: 2, grpId: "Grp_02", topic: "Research Topic 2" },
        { id: 3, grpId: "Grp_03", topic: "Research Topic 3" },
        { id: 4, grpId: "Grp_04", topic: "Research Topic 4" },
        { id: 5, grpId: "Grp_05", topic: "Research Topic 5" }
    ]

  return (
    <motion.div
    initial={{  y:250}}
    animate={{  y:0}}
    exit={{ x: window.innerWidth, y: window.innerHeight }}
    className='container'>
        <h1 className='mt-3'> Co-Supervisor Requests </h1>
        <table className='table table-light table-striped table-hover mt-5'>
            <thead>
                <tr>
                    <th scope='col' colSpan='2' className='col-2'> # </th>
                    <th scope='col' className='col-2'> Group ID </th>
                    <th scope='col'> Research Topic </th>
                    <th scope='col'> Accept </th>
                    <th scope='col'> Reject </th>
                </tr>
            </thead>
            <tbody>
                {requestList.map(request=>(
                    <tr key={request.id}>
                        <td colSpan='2' className='align-middle col-2'> {request.id} </td>
                        <td className='align-middle col-2'> {request.grpId} </td>
                        <td className='align-middle'> {request.topic} </td>
                        <td className='align-middle'> 
                            <motion.button className='btn btn-success px-4'
                            initial={{backgroundColor:'white', transitionDuration:"3s"}}
                            animate={{backgroundColor:'#181'}}
                            > Accept </motion.button>
                        </td>
                        <td className='align-middle'> 
                            <motion.button className='btn btn-danger px-4'
                                initial={{backgroundColor:'white', transitionDuration:"3s"}}
                                animate={{backgroundColor:'#811'}}
                            > Reject </motion.button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </motion.div>

  )
}

export default RequestListCoSupervisor