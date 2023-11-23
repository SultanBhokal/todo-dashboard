import { create } from "zustand";
import { columnObject, todo } from "../types/todo";
import { api } from "../axios/interceptors";

type CurrentEventsObject = {
  id: string;
  title: string;
  start: string;
};

type CurrentEvents = CurrentEventsObject[];

type CurrPageType = "dashboard" | "calendar" | "todo-board";

const currentPage = localStorage.getItem("curr_p") as CurrPageType || "dashboard";

type UseCalendarState = {
  curr_page: CurrPageType;
  setCurr_Page: (curr_page: CurrPageType) => void;
  currentEvents: CurrentEvents;
  setCurrentEvents: (currentEvents: CurrentEvents) => void;
  login: boolean;
  setLogin: (login: boolean) => void;
  todo:todo;
  setTodo:(todo:todo)=>void;
  todoId:string,
  setTodoId:(todoId:string)=>void;
  loading:boolean;
  setLoading:(loading:boolean)=>void;
  
};

const useCalendar = create<UseCalendarState>((set) => ({
  curr_page: currentPage,
  setCurr_Page: (curr_page) => set({ curr_page }),
  currentEvents: [],
  setCurrentEvents: (currentEvents) => set({ currentEvents }),
  login: false,
  setLogin: (login) => set({ login }),
  todo:{
    'TASKS': [],
    'IN_PROGRESS': [],
    'COMPLETED': [],
  },
  setTodo:(todo)=>set({todo}),
  todoId:"",
  setTodoId:(todoId)=>set({todoId}),
  loading:true,
  setLoading:(loading)=>set({loading})
}));

async function getAuth(){
    try {
        const res = await api.get("http://localhost:3000/api/users/")
        if(res.data.success){
            useCalendar.getState().setLogin(true)
            const todos = await api.get<{data:Array<{_id:string,__v:number,"COMPLETED":Array<columnObject>,"IN_PROGRESS":Array<columnObject>,"TASKS":Array<columnObject>}>,msg:string,error:string,success:boolean}>("http://localhost:3000/api/dashboard/todo")
            if(todos.data.success){
                const finalData = {
                  "TASKS":[...todos.data.data[0].TASKS],
                  "IN_PROGRESS":[...todos.data.data[0].IN_PROGRESS],
                  "COMPLETED":[...todos.data.data[0].COMPLETED],
                }
                useCalendar.getState().setTodo(finalData);
                useCalendar.getState().setTodoId(todos.data.data[0]._id);
                // useCalendar.getState().setLoading(false)
            }
        }
        useCalendar.getState().setLoading(false)

    } catch (error) {
        console.log(error)
        useCalendar.getState().setLoading(false)

    }
}

getAuth()

export { useCalendar };
