import ChartContainer from "./ChartContainer"
import DataGridContainer from "./DataGridContainer"
import "./dashboard.css";

function DashboardContainer() {
    return (
        <div className=" h-full w-full bg-slate-700 bg-opacity-60 rounded-3xl dashboard overflow-auto lg:p-4" >
            <section className=" flex justify-center font-extrabold text-red-400">
                <h3>DASHBOARD</h3>
            </section>
            <section className="chart-grid-container">
                <section className=" bg-gray-900 bg-opacity-60 rounded-3xl p-2">
                    <ChartContainer /> 
                </section>
                <section className=" bg-gray-900 p-3 rounded-3xl bg-opacity-60">
                    <DataGridContainer />
                </section>
            </section>
        </div>
    )
}

export default DashboardContainer