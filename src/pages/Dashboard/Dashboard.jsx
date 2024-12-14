import Pending from "./Pending";
import Totals from "./Totals";

const Dashboard = () => {
  return (
    <>
      <Totals />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5">
        <div className="bg-white rounded-xl p-5 shadow h-[400px] center">Coming Soon</div>
        <Pending />
      </div>
    </>
  );
};

export default Dashboard;
