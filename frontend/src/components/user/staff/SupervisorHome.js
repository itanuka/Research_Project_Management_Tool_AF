import {useState, useEffect} from 'react';
import jwtDecode from 'jwt-decode';

function SupervisorHome() {

  const [user, setUser] = useState({});

  useEffect(()=>{

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
