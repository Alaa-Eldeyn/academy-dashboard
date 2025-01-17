import Pending from "./Pending";
import Totals from "./Totals";
import soon from "../../assets/soon.png";

const Dashboard = () => {
  return (
    <>
      <Totals />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5">
        <div className="bg-white rounded-xl p-5 shadow h-[400px] center">
          <img src={soon} alt="Coming soon" className="w-1/2" />
        </div>
        <Pending />
      </div>
    </>
  );
};

export default Dashboard;
