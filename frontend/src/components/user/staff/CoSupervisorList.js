import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import axios from 'axios'

function CoSupervisorList() {

    const [staff, setStaff] = useState([])
    const [coSupervisors, setCoSupervisors] = useState([])

    async function getCoSupervisors() {
        await axios.get("http://localhost:4000/api/v1/staff/")
        .then((res)=> {
            setStaff(res.data)
        })

        setCoSupervisors(
            staff.filter((member)=>member.type === "co-supervisor")
        )
    }


    useEffect(()=>{
        getCoSupervisors()
    }, [])

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
                        <th scope='col'> ID Number </th>
                        <th scope='col'> Research Interest </th>
                        <th scope='col'> Request </th>
                    </tr>
                </thead>
                <tbody>
                    {coSupervisors.map(coSupervisor=>{
                        return(<tr key={coSupervisor._id}>
                            <td> { coSupervisor.name } </td>
                            <td> { coSupervisor.idNumber } </td>
                            <td> { coSupervisor.researchInterest } </td>
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