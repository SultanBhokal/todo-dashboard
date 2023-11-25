import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FitbitIcon from '@mui/icons-material/Fitbit';
import { useCalendar } from '../../store/zustandStore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Sidebar1() {
  const setCurr_Page = useCalendar((state: any) => state.setCurr_Page);
  const curr_page = useCalendar((state:any)=>state.curr_page);

  const handlePage = (page:string)=>{
    setCurr_Page(page);
    localStorage.setItem("curr_p",page)
  }

  return (
    <div className=' h-screen w-40 overflow-auto flex flex-col pt-10 gap-16 items-center bg-neutral-950' style={{minWidth:"7rem"}}>
      <div className=''>
        <span>
          <FitbitIcon fontSize='large' className=' text-red-400 cursor-pointer' />
        </span>
      </div>
      <div>
        <span className=' cursor-pointer relative' onClick={()=>handlePage("dashboard")}>
          <DashboardIcon fontSize='large' className=' cursor-pointer' />
          {
            curr_page === "dashboard" && <span className=' absolute -right-10 text-red-400'><ArrowBackIosIcon /></span>
          }
        </span>
      </div>
      <div>
        <span className=' cursor-pointer relative' onClick={()=>handlePage("calendar")}>
          <TableRowsTwoToneIcon fontSize='large' className=' cursor-pointer' />
          {
            curr_page === "calendar" && <span className=' absolute -right-10 text-red-400'><ArrowBackIosIcon /></span>
          }
        </span>
      </div>
      <div>
        <span className=' cursor-pointer relative' onClick={()=>handlePage("todo-board")}>
          <ChecklistIcon fontSize='large' className=' cursor-pointer' />
          {
            curr_page === "todo-board" && <span className=' absolute -right-10 text-red-400'><ArrowBackIosIcon /></span>
          }
        </span>
      </div>
    </div>
  )
}

export default Sidebar1