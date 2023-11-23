import { BarChart, ResponsiveChartContainer } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import BarChart1 from '../components/charts/Barchart1'
import Linechart1 from '../components/charts/Linechart1'
import DataGrid1 from '../components/grid/DataGrid1'

function ChartContainer() {
    const [height, setHeight] = useState<number>(200)
    const [width, setWidth] = useState<number>(250)

    useEffect(() => {
        const handleResize = () => {
            console.log(window.innerWidth)
            if (window.innerHeight >= 635 && window.innerWidth <=671) {
                setHeight(150)
            }
            if (window.innerWidth >= 930 && window.innerWidth <=1215) {
                setWidth(350)
            }
            
            if(window.innerWidth >1215){
                setWidth(500)
            }


            
        }

        if (window.innerHeight >= 635 && window.innerWidth <=671) {
            setHeight(200)
        }
        if (window.innerWidth > 671 && window.innerWidth <=1215) {
            setWidth(350)
        }
        if (window.innerWidth >= 930 && window.innerWidth <=1215) {
            setWidth(350)
        }
        
        if(window.innerWidth >1215){
            setWidth(500)
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    return (
        <div className='  h-fit pb-3 w-full grid grid-cols-2 gap-1 justify-items-center pt-3 md:grid-cols-2'>
            <BarChart1 height={height} width={width} />
            <Linechart1 height={height} width={width} />
        </div>
    )
}

export default ChartContainer