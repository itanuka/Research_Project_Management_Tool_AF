import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function CoSupervisorList() {
    let navigate = useNavigate()

    const [staff, setStaff] = useState([])
    const [coSupervisors, setCoSupervisors] = useState([])

    const [keyword, setKeyword] = useState("")


    async function getCoSupervisors() {
        await axios.get("http://localhost:4000/api/v1/staff/")
        .then((res)=> {
            setStaff(res.data)
        })

        setCoSupervisors(
            staff.filter((member)=>member.type === "co-supervisor")
        )
    }   //end of getCoSupervisors function

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
        getCoSupervisors()
    }, [coSupervisors])

    // search function
    const searchedCoSupervisors = coSupervisors.filter((coSupervisor) => {
        return coSupervisor.name.toLowerCase().includes(keyword.toLowerCase())
    })


    return (
        <motion.div className='container'
        initial={{  y:250}}
        animate={{  y:0}}
        exit={{ x: window.innerWidth, y: window.innerHeight }}
        >
            <h1 className='mt-3'> List of Co-Supervisors </h1>

            <div className='row mr-1'>
                <div className='col-md-8'></div>
                <input className="mt-5 col-md input-group-text" placeholder="Search Co-Supervisor by Name..." style={{borderStyle:"initial"}}
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
                    {searchedCoSupervisors.map(coSupervisor=>{
                        return(<tr key={coSupervisor._id}>
                            <td> { coSupervisor.name } </td>
                            <td> { coSupervisor.idNumber } </td>
                            <td> { coSupervisor.researchInterest } </td>
                            <td>
                                <motion.button className='btn btn-primary px-4'
                                initial={{backgroundColor:'white', transitionDuration:"3s"}}
                                animate={{backgroundColor:'#015'}}
                                whileHover={{
                                    scale: 1.1,
                                    textShadow: "0px 0px 8px rgb(100, 100, 255)",
                                    boxShadow: "0px 0px 8px rgb(200, 200, 255)"
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

export default CoSupervisorList