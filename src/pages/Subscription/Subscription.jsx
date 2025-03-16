import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import LocalEnrollModal from "./LocalEnrollModal";
import { getPendingLocalEnrolls } from "../../utils/localSubscription";
import empty from "../../assets/Empty-amico.svg";

const Subscription = () => {
  const [enrolls, setEnrolls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnroll, setSelectedEnroll] = useState(null);
  useEffect(() => {
    const fetchEnrolls = async () => {
      let res = await getPendingLocalEnrolls();
      setEnrolls(res?.data);
    };
    fetchEnrolls();
  }, []);
  return (
    <>
      {isModalOpen && (
        <LocalEnrollModal
          setIsModalOpen={setIsModalOpen}
          enroll={selectedEnroll}
        />
      )}
      <div className="overflow-x-auto px-6">
        <table className="min-w-full bg-gray-100 rounded-lg">
          <thead className="bg-white  whitespace-nowrap">
            <tr>
              <td className="size-10 bg-gray-50"></td>
              {["Student Name", "Student ID", "Accept / Reject"].map(
                (item, index) => (
                  <th
                    key={index}
                    className="text-center px-4 py-2 text-secondary"
                  >
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="text-center whitespace-nowrap divide-y bg-white divide-gray-200">
            {enrolls?.map((enroll, index) => (
              <tr key={index}>
                <td className="size-10 bg-gray-100">{index + 1}</td>
                <td className="p-4 text-sm">{enroll?.userFullName}</td>
                <td className="px-6 py-3">{enroll?.userId}</td>
                <td className="py-3 flex items-center gap-2 justify-center">
                  <button
                    onClick={() => {
                      setSelectedEnroll(enroll);
                      setIsModalOpen(true);
                    }}
                    className="bg-[#FEF8FF] text-[#984D9F] px-2 justify-center py-1 rounded-md flex items-center gap-1"
                  >
                    <Icon icon="ph:eye" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {enrolls?.length < 1 && (
          <div className="center flex-col">
            <img
              src={empty}
              alt="Empty state"
              className="w-full h-full max-w-[500px]"
            />
            <h2 className="text-2xl text-center font-bold">No Results found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Subscription;
