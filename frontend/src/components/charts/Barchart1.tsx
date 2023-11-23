import { BarChart } from '@mui/x-charts'
import React from 'react'

function Barchart1({width,height}:{width:number,height:number}) {
    return (
        <div className=' w-fit h-fit bg-zinc-800 bg-opacity-60 rounded-2xl hover:scale-95 hover:opacity-80 cursor-pointer transition-colors hover:bg-slate-700'>
            <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[
                    { data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] },

                ]}
                height={height}
                width={width}
                sx={{ stroke: "white" }}
                colors={["#ff805d", "#5dc9ff", "#34c7cf"]}
            />
        </div>
    )
}

export default Barchart1