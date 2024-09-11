import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [name, setName] = useState('')
  const [users, setUsers] = useState([])
  const [expired, setExpired] = useState('')

  const navigasi = useNavigate()

  useEffect(()=>{
    refreshToken()
    getUsers()
  }, [])

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3000/token")
      setToken(response.data.accessToken)
      const decoded = jwtDecode(response.data.accessToken)
      setName(decoded.name)
      setExpired(decoded.exp)
    } catch (error) {
      if(error.response) {
        navigasi('/')
      }
    }

  }

  const axiosJWT = axios.create()
  axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date();
    if(expired * 1000 < currentDate.getTime()) {
      const response = await axios.get("http://localhost:3000/token")
      config.headers.Authorization = `Bearer ${response.data.accessToken}`
      setToken(response.data.accessToken)
      const decoded = jwtDecode(response.data.accessToken)
      setName(decoded.name)
      setExpired(decoded.exp)
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:3000", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setUsers(response.data);
  }


  return (
    <div>
    <div className="mt-5 flex justify-end flex-wrap">
      <div className="container">
        <h1 className="mb-2">Hallo {name}</h1>
        <button onClick={getUsers} type="button" className="bg-red-500 p-2 rounded-lg text-white">get users</button>
      </div>
      <div className="p-5">
        <table className="table-fixed w-full text-left">
            <thead className="uppercase bg-[#6b7280] text-[#e5e7eb]">
              <tr>
                <td className="py-1 border text-center">No</td>
                <td className="py-1 border text-center">User</td>
                <td className="py-1 border text-center">Email</td>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-500">
              {users.map((item, index) => (
                <tr key={item.id} className="py-5">
                  <td className="py-5 border text-center">{index + 1}</td>
                  <td className="py-5 border text-center">
                    {item.name}
                  </td>
                  <td className="py-5 border text-center">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
