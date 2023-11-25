import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid";
import { useCalendar } from "../store/zustandStore";
import "./calender.css";
import { generateUniqueId } from "../utils/otherUtils";
import { useMemo } from "react";

function FullCalendarContainer() {
    const currEvents = useCalendar((state:any)=>state.currentEvents)
    const setCurrEvents = useCalendar((state:any)=>state.setCurrentEvents)

    const handleEvents = async (events:any)=>{
        console.log(events)
        await Promise.resolve(setCurrEvents(events))
    }

    const handleSelect = (selectInformation:any)=>{
        let title = prompt('Enter Title For The Event');
        let calenderApi = selectInformation.view.calendar;
        calenderApi.unselect();

        if(title){
            calenderApi.addEvent({
                id:generateUniqueId(),
                title,
                start:selectInformation.start,
                end:selectInformation.end,
                allDay:selectInformation.allDay
            })
        }
    }

    const handleEventClick = (clickInfo:any)=>{
        if(confirm('Are you sure you want to delete this ? ')){
            clickInfo.event.remove()
        }
    }

    


    return (
        <div className=" h-full w-full flex justify-center items-center" >
            <div className=" m-auto w-11/12 h-full pt-5 pb-0 ps-20 pe-20 max-w-screen-lg bg-zinc-800 bg-opacity-70 rounded-3xl overflow-auto">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    headerToolbar={{
                        left:'prev,next today',
                        center:'title',
                        right:"dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    allDaySlot={false}
                    initialView="timeGridWeek"
                    slotDuration={"01:00:00"}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    nowIndicator={true}
                    initialEvents={currEvents}
                    height={500}
                    eventsSet={handleEvents}
                    select={handleSelect}
                    eventClick={handleEventClick}
                />

            </div>
        </div>
    )
}

export default FullCalendarContainer