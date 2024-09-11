import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPass, setConfPass] = useState('')
  const [msg, setMsg] = useState('')
  const navigasi = useNavigate()

  const ButtonRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/signup", {
        name: name,
        email: email,
        password: password,
        confPassword: confPass,
      })
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
      navigasi('/')
    } catch (error) {
      setMsg(error.response.data)
      setTimeout(() => {
        setMsg("")
      }, 5000);
    }
  }

  return (
    <div className="flex bg-gray-300 w-full h-screen">
      <div className="w-full flex items-center justify-center">
        <div className="absolute bottom-0 right-0 m-5">
          {msg !== "" && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Peringatan</AlertTitle>
              <AlertDescription>
                <p className="text-red-600 italic">{msg}</p>
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div className="w-[25rem] flex flex-col mx-auto p-5 md:p-5 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
          <div className="flex pb-4 justify-center">
            <h1 className="text-3xl font-bold text-[#4B5563]">REGISTER</h1>
          </div>
          <form onSubmit={ButtonRegister} className="flex flex-col" method="post">
            <div className="pb-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#111827]" >
                Nama
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input type="text" name="name" id="name" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="asep gaming" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="pb-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">
                Email
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </span>
                <input type="email" name="email" id="email" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="tes@gmail.com" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="pb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">
                Password
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk">
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M12 8v8"></path>
                    <path d="m8.5 14 7-4"></path>
                    <path d="m8.5 10 7 4"></path>
                  </svg>
                </span>
                <input type="password" name="password" id="password" placeholder="••••••••••" className="pl-12  bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className="pb-6">
              <label htmlFor="confPassword" className="block mb-2 text-sm font-medium text-[#111827]">
                Confirmasi Password
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk">
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M12 8v8"></path>
                    <path d="m8.5 14 7-4"></path>
                    <path d="m8.5 10 7 4"></path>
                  </svg>
                </span>
                <input type="password" name="confPassword" id="confPassword" placeholder="••••••••••" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" value={confPass} onChange={(e) => setConfPass(e.target.value)} />
              </div>
            </div>
            <div className="pb-6">
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Send
              </button>
            </div>
          </form>
          <div className="text-sm font-light text-[#6B7280] flex">
            <p>Have an accout yet? </p>
            <a href="/" className="font-medium text-[#4F46E5] hover:underline pl-3" >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
