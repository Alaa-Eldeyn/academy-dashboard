import { useNavigate } from "react-router-dom";
import {
  approveLocalEnroll,
  rejectLocalEnroll,
} from "../../utils/localSubscription";

const LocalEnrollModal = ({ setIsModalOpen, enroll }) => {
  const navigate = useNavigate();
  const handleAcceptEnroll = async (id) => {
    let res = await approveLocalEnroll(id);
    if (res?.isSuccess) {
      setIsModalOpen(false);
      navigate(0);
    }
  };
  const handleRejectEnroll = async (id) => {
    let res = await rejectLocalEnroll(id);
    if (res?.isSuccess) {
      setIsModalOpen(false);
      navigate(0);
    }
  };

  return (
    <>
      <div
        className="fixed soft top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-40"
        onClick={() => setIsModalOpen(false)}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white px-6 p-4 rounded-3xl w-[90%] md:w-[700px] lg:w-[900px] space-y-4 text-center relative">
          <button
            className="absolute top-2 right-2 w-10 text-white bg-red-500 rounded-2xl p-2"
            onClick={() => setIsModalOpen(false)}
          >
            X
          </button>
          <h1 className="text-2xl font-bold text-[#E2508D]">Enroll Details</h1>
          <p className="text-sm max-w-[400px] mx-auto text-[#434343]">
            Details of the student&apos;s enrollment in the course.
            <br />
            Please make sure to review the details before proceeding.
          </p>
          <div className="flex gap-2">
            <div className="max-w-xs border rounded-lg max-h-72 overflow-auto">
              <img
                src={
                  import.meta.env.VITE_BASE_URL +
                  "/" +
                  enroll.transactionImageURL
                }
                alt="Transaction"
                className="h-fit rounded-lg"
              />
            </div>
            <table className="w-full text-start text-sm text-gray-500 flex-1 mb-10">
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className=" ps-5 rounded-lg font-medium text-gray-900">
                    Student Name
                  </td>
                  <td className="">{enroll.userFullName}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className=" ps-5 rounded-lg font-medium text-gray-900">
                    Student ID
                  </td>
                  <td className="">{enroll.userId}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="center gap-5">
            <button
              onClick={() => handleRejectEnroll(enroll.id)}
              className="px-8 py-3 rounded-full text-sm border bg-red-500 text-white"
            >
              Reject
            </button>
            <button
              onClick={() => handleAcceptEnroll(enroll.id)}
              className="px-8 py-3 rounded-full text-sm border bg-green-600 text-white"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default LocalEnrollModal;
