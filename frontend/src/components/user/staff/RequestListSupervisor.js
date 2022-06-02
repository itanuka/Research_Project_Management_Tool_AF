import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function RequestListSupervisor() {
    let navigate = useNavigate()

    const [requests, setRequests] = useState([])

    // IMPORTANT --> change the url (given url is strictly for demonstration purposes)
    async function getRequests() {
        await axios.get("http://localhost:4000/api/v1/requests/getRequestByStaffId/6291df9650646990e2ccbdc4")
        .then(res => res.data.map(info=>{
            axios.get(`http://localhost:4000/api/v1/groups/get/${info.group}`)
            .then(res=>{
                groupName = res.data.groupName
                supervisor = res.data.supervisor
                requests.push({groupName, supervisor})
            })
        }))
    }

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
        getRequests()
    }, [requests])


    let requestNumber = 0

  return (
    <motion.div
    initial={{  y:250}}
    animate={{  y:0}}
    exit={{ x: window.innerWidth, y: window.innerHeight }}
    className='container'>
        <h1 className='mt-3'> Supervisor Requests </h1>
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
                {requests.map(request=>(
                    <tr key={request._id}>
                        <td colSpan='2' className='align-middle col-2'> {++requestNumber} </td>
                        <td className='align-middle col-2'> {request.groupName} </td>
                        <td className='align-middle'>  </td>
                        <td className='align-middle'> 
                            <motion.button className='btn btn-success px-4'
                            initial={{backgroundColor:'white', transitionDuration:"3s"}}
                            animate={{backgroundColor:'#181'}}
                            whileHover={{
                                scale: 1.1,
                                textShadow: "0px 0px 8px rgb(100, 255, 100)",
                                boxShadow: "0px 0px 8px rgb(200, 255, 200)"
                            }}
                            transition={{type: 'spring', stiffness: 500}}
                            > Accept </motion.button>
                        </td>
                        <td className='align-middle'> 
                            <motion.button className='btn btn-danger px-4'
                                initial={{backgroundColor:'white', transitionDuration:"3s"}}
                                animate={{backgroundColor:'#811'}}
                                whileHover={{
                                    scale: 1.1,
                                    textShadow: "0px 0px 8px rgb(255, 100, 100)",
                                    boxShadow: "0px 0px 8px rgb(255, 200, 200)"
                                }}
                                transition={{type: 'spring', stiffness: 500}}
                            > Reject </motion.button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </motion.div>
  )
}

export default RequestListSupervisor