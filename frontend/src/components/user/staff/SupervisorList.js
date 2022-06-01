import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import axios from "axios"

function SupervisorList() {
    
    const [staff, setStaff] = useState([])
    const [supervisors, setSupervisors] = useState([])

    async function getSupervisors() {
        await axios.get("http://localhost:4000/api/v1/staff/")
        .then((res)=> {
            setStaff(res.data)
        })

        setSupervisors(
            staff.filter((member)=>member.type==="supervisor")
        )
    }
    

    useEffect(()=>{
        getSupervisors()
    }, [])

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
                    <th scope='col'> ID Number </th>
                    <th scope='col'> Research Interest </th>
                    <th scope='col'> Request </th>
                </tr>
            </thead>
            <tbody>
                {supervisors.map(supervisor=>{
                    return(<tr key={supervisor.idNumber}>
                        <td> { supervisor.type } </td>
                        <td> { supervisor.idNumber } </td>
                        <td style={{}}> { supervisor.researchInterest } </td>
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