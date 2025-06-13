import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {toast} from "react-toastify"

export const MyContext = createContext();

//Context = Global storage

//Provider = Sabko access dene wala

// useMemo = Memory optimization (smart calculations)

export function Context({ children }) {
  const [bal, setBal] = useState(0);
  const [receiveId, setreceiveId] = useState("");
  const [receiveName, setreceiveName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [allUsers, setallUsers] = useState();
  const URL_STRING = import.meta.env.VITE_API_URL;

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are Not logged in")
        return;
      }

      const response = await axios.get(`${URL_STRING}/api/v1/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBal(response.data.bal);
      setFirstName(response.data.firstName);
      setlastName(response.data.lastName);
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }

  async function fetchDashBoardUsers() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are Not logged in")
      }

      const response = await axios.get(`${URL_STRING}/api/v1/user/allUser`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      setallUsers(response.data.allUsers)
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }

  
  useEffect(()=>{
      fetchData();
    fetchDashBoardUsers();
  },[]);

  return(
    <MyContext.Provider value={{
        bal,setBal,firstName,setFirstName,lastName,setlastName,allUsers,receiveId,setreceiveId,setallUsers,fetchData,fetchDashBoardUsers,setreceiveName,receiveName
    }}>
        {children}
    </MyContext.Provider>
  )
}



