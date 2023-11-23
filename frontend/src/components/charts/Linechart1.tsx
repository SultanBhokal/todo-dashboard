import { LineChart } from '@mui/x-charts'
import React from 'react'

function Linechart1({width,height}:{width:number,height:number}) {
    return (
        <div className=' w-fit h-fit bg-zinc-800 bg-opacity-60 rounded-2xl hover:scale-95 hover:opacity-80 cursor-pointer transition-colors hover:bg-slate-700'>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                ]}
                height={height}
                width={width}
                sx={{ stroke: "white" }}
                colors={[ "#34c7cf"]}
            />
        </div>
    )
}

export default Linechart1