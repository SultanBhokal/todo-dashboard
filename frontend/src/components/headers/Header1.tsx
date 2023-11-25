import React from 'react'
import { formatDate } from '../../utils/dateUtils'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useCalendar } from '../../store/zustandStore';
import LogoutIcon from '@mui/icons-material/Logout';
import { api } from '../../axios/interceptors';

function Header1() {
    const curr_page:string  = useCalendar((state:any)=>state.curr_page);
    const setLoading = useCalendar((state)=>state.setLoading)
    const setLogin = useCalendar((state)=>state.setLogin)
    const handleLogout = async ()=>{
        try {
            setLoading(true)
            const res = await api.get("http://localhost:3000/api/users/logout")
            if(res){
                setLoading(false)
                if(res.data.success){
                    localStorage.removeItem("jwt-auth-token")
                    setLogin(false)
                }
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div className=' w-full h-1/4 flex justify-around items-center relative' >
            <section className=' font-extrabold text-red-400'>
                <h3>{curr_page.toUpperCase()}</h3>
            </section>
            <section className=' font-extrabold'>
                {formatDate(new Date())}
            </section>
            <section>
                <div>
                    <div className="relative mx-auto max-w-md">
                        <input
                            type="text"
                            className="w-full text-zinc-900 bg-white border-2 border-gradient focus:outline-none focus:border-pulse rounded-md px-4 py-2 transition-all duration-300 ease-in-out"
                            placeholder="Search"
                        />
                        <div className="absolute right-4 top-3">
                            <svg
                                className="text-gray-500 h-6 w-6 transition-all duration-300 ease-in-out transform hover:scale-110"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m0 0l-6-6m6 6l-6 6m6-6L3 3"
                                ></path>
                            </svg>
                        </div>
                    </div>



                </div>
            </section>
            <section className=' flex items-center gap-2'>
                <div className=' rounded-full bg-slate-500 h-10 w-10 flex items-center justify-center cursor-pointer'>
                    <PersonOutlineIcon fontSize='large' />
                </div>
                <section className=' cursor-pointer transition-transform hover:text-red-400 hover:scale-90' onClick={handleLogout}>
                    <LogoutIcon />
                </section>
            </section>
        </div>
    )
}

export default Header1