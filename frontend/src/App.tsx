import "./App.css"
import Header1 from "./components/headers/Header1"
import GradientBg from "./components/other/GradientBg"
import Sidebar1 from "./components/sidebars/Sidebar1"
import FullCalendarContainer from './containers/FullCalendarContainer';
import TodoBoardContainer from './containers/TodoBoardContainer';
import { useCalendar } from './store/zustandStore';
import AuthContainer from './containers/auth/AuthContainer';
import DashboardContainer from './containers/DashboardContainer';
import LoadingScreen from './components/other/LoadingScreen';


function App() {
  const curr_page = useCalendar((state: any) => state.curr_page);
  const login = useCalendar((state: any) => state.login);
  const loading = useCalendar((state)=>state.loading);

  return (
    <section className=" bg-zinc-900 h-full w-screen relative text-purple-50 flex">
      <GradientBg />
      {
        loading ? <LoadingScreen /> : null
      }
      {
        !login && !loading ?
          <AuthContainer />
          :
          <>
            <Sidebar1 />
            <section className=" w-full h-screen z-50 bg-transparent flex flex-col justify-between items-center pb-5" >
              <Header1 />
              {
                curr_page === "dashboard"
                  ?
                  <DashboardContainer />
                  :
                  null
              }
              {
                curr_page === "calendar"
                  ?
                  <FullCalendarContainer />
                  :
                  null
              }
              {
                curr_page === "todo-board"
                  ?
                  <TodoBoardContainer />
                  :
                  null
              }

            </section>
          </>
      }
    </section>
  )
}

export default App