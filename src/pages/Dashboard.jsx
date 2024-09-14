import { TbBrandWindows } from "react-icons/tb";


function Dashboard() {
  return (
    <div className="flex-1 flex">
        {/* to genrate space  */}
        <div className=" bg-white w-60  flex-col hidden md:flex sm:hidden" id="sideNav">
        </div>

        <div className="flex-1 -ml-[65px] sm:ml-72 md:ml-5 lg:ml-4 ">
            <h1 className="flex font-bold items-center gap-2">
              <TbBrandWindows  className="text-xl" />
              Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-2">
            
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-gray-500 text-lg font-semibold pb-1">Usuarios</h2>
                        <div className="my1-"></div> 
                        <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px  mb-6"></div> 
                        <div className="chart-container" >
                            <canvas id="usersChart"></canvas>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-gray-500 text-lg font-semibold pb-1">Comercios</h2>
                        <div className="my-1"></div>
                        <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 
                        <div className="chart-container" >
                            <canvas id="commercesChart"></canvas>
                        </div>
                    </div>

             <div className="bg-white p-4 rounded-md">
              <h1>left box</h1>
                <div className="w-full table-auto text-sm">
                  
                </div>
                    <div className="text-right mt-4">
                     buttons
                    </div>
                </div>

                 <div className="bg-white p-4 rounded-md mt-4">
                      <h2 className="text-gray-500 text-lg font-semibold pb-4">righ box</h2>
                        <div className="text-right mt-4">
                            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                               butotns
                            </button>
                        </div>
                  </div>

                </div>
            </div>
      </div>
  )
}

export default Dashboard