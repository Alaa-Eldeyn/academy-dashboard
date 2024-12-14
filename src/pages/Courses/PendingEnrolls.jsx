import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { getPendingEnrolls } from "../../utils/courses";
import EnrollModal from "./EnrollModal";

const PendingEnrolls = () => {
  const [enrolls, setEnrolls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnroll, setSelectedEnroll] = useState(null);
  useEffect(() => {
    const fetchEnrolls = async () => {
      let res = await getPendingEnrolls();
      setEnrolls(res?.data);
    };
    fetchEnrolls();
  }, []);
  return (
    <>
      {isModalOpen && (
        <EnrollModal setIsModalOpen={setIsModalOpen} enroll={selectedEnroll} />
      )}
      <div className="overflow-x-auto px-6">
        <table className="min-w-full bg-gray-100 rounded-lg">
          <thead className="bg-white  whitespace-nowrap">
            <tr>
              <td className="size-10 bg-gray-50"></td>
              {[
                "Student Name",
                "Course Name",
                "Instructor Name",
                "Accept / Reject",
              ].map((item, index) => (
                <th
                  key={index}
                  className="text-center px-4 py-2 text-secondary"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center whitespace-nowrap divide-y bg-white divide-gray-200">
            {enrolls?.map((enroll, index) => (
              <tr key={index}>
                <td className="size-10 bg-gray-100">{index + 1}</td>
                <td className="p-4 text-sm">{enroll?.studentName}</td>
                <td className="px-6 py-3">{enroll?.courseName}</td>
                <td className="px-6 py-3">{enroll?.instructorName}</td>
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
      </div>
    </>
  );
};

export default PendingEnrolls;
