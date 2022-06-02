import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

function SupervisorHome() {
  let navigate = useNavigate()

  const [user, setUser] = useState({});

  //checking whether the user is logged in
  useEffect(()=>{
    try {
        const jwt = localStorage.getItem("token");
        if(!jwt)
            navigate('/unauthorized')
    } catch (error) {
    }
  }, [])

  useEffect(() => {

    try {
      const jwt = localStorage.getItem("token");
      setUser(jwtDecode(jwt));
    } catch (error) {

    }
  }, []);




  return (
    <div>
      <h1>SupervisorHome{user.userID}</h1>
    </div>
  );
}

export default SupervisorHome;
