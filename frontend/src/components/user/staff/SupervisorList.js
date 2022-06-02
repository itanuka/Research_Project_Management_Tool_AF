import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function SupervisorList() {
    let navigate = useNavigate()
    
    const [staff, setStaff] = useState([])
    const [supervisors, setSupervisors] = useState([])

    const [keyword, setKeyword] = useState("")

    
    async function getSupervisors() {
        await axios.get("http://localhost:4000/api/v1/staff/")
        .then((res)=> {
            setStaff(res.data)
        })
        
        setSupervisors(
            staff.filter((member)=>member.type==="supervisor")
        )
    }//end of getSupervisors function

    //checking whether the user is logged in
    useEffect(()=>{
        try {
            const jwt = localStorage.getItem("token");
            if(!jwt)
                navigate('/unauthorized')
        } catch (error) {
        }
    }, [])
        
    useEffect(()=>{
        getSupervisors()
    }, [supervisors])
        
    // search function
    const searchedSupervisors = supervisors.filter((supervisor) => {
        return supervisor.name.toLowerCase().includes(keyword.toLowerCase())
    })


  return (
    <motion.div
    initial={{  y:250}}
    animate={{  y:0}}
    exit={{ x: window.innerWidth, y: window.innerHeight }}
    className='container' style={{justifyContent:"flex-end"}}>
        <h1 className='mt-3'> List of Supervisors </h1>

        <div className='row mr-1'>
            <div className='col-md-8'></div>
            <input className="mt-5 col-md input-group-text" placeholder="Search Supervisor by Name..." style={{borderStyle:"initial"}}
                onChange={(e) => {
                setKeyword(e.target.value)
                }}
            />
        </div>

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
                {searchedSupervisors.map(supervisor=>{
                    return(<tr key={supervisor.idNumber}>
                        <td> { supervisor.name } </td>
                        <td> { supervisor.idNumber } </td>
                        <td style={{}}> { supervisor.researchInterest } </td>
                        <td>
                            <motion.button className='btn btn-primary px-4'
                            initial={{backgroundColor:'white', transitionDuration:"3s"}}
                            animate={{backgroundColor:'#015'}}
                            whileHover={{
                                scale: 1.1,
                                textShadow: "0px 0px 8px rgb(150, 150, 255)",
                                boxShadow: "0px 0px 8px rgb(200, 200, 255)",
                            }}
                            transition={{type: 'spring', stiffness: 500}}
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