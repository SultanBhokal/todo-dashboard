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
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const curr_page = useCalendar((state: any) => state.curr_page);
  const login = useCalendar((state: any) => state.login);
  const loading = useCalendar((state) => state.loading);

  const pageVariants = {
    initial: {
      opacity: 0,
      x: '-100%',
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    initial: {
      opacity: 0,
      x: -20,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className=" bg-zinc-900 h-full min-h-max min-w-max w-screen relative text-purple-50 flex overflow-auto">
      <GradientBg />
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      <AnimatePresence>
        {!login && !loading && (
          <motion.div
            className=" w-full h-full"
            key="authContainer"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className=" w-full h-full"
              variants={childVariants}>
              <AuthContainer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {login && (
        <>
          <Sidebar1 />
          <section className=" w-full h-screen z-50 bg-transparent flex flex-col justify-between items-center pb-5">
            <Header1 />
            <AnimatePresence mode="wait" >
              {curr_page === 'dashboard' && (
                <motion.div
                  key="dashboardContainer"
                  className=" w-full h-full"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div
                    className=" w-full h-full"
                    variants={childVariants}
                  >
                    <DashboardContainer />
                  </motion.div>
                </motion.div>
              )}
              {curr_page === 'calendar' && (
                <motion.div
                  key="fullCalendarContainer"
                  className=" w-full h-full"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div className=" w-full h-full"
                    variants={childVariants}>
                    <FullCalendarContainer />
                  </motion.div>
                </motion.div>
              )}
              {curr_page === 'todo-board' && (
                <motion.div
                  key="todoBoardContainer"
                  className=" w-full h-full"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div
                    className=" w-full h-full"
                    variants={childVariants}
                  >
                    <TodoBoardContainer />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </>
      )}
    </section>
  );
}

export default App