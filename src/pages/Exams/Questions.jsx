import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router-dom";
import QuestionModal from "./QuestionModal";
import { useEffect, useState } from "react";
import { deleteQuestion, getExam, getTestQuestions } from "../../utils/Exams";

const Questions = () => {
  let params = useParams();
  const [questionModal, setQuestionModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState({});
  useEffect(() => {
    const fetchExam = async () => {
      let { data } = await getExam(params?.id);
      setExam(data);
      let questions = await getTestQuestions(params?.id);
      setQuestions(questions?.data);
    };
    fetchExam();
  }, [params?.id]);
  const handleDeleteQuestion = async (id) => {
    let res = await deleteQuestion(id);
    if (res?.isSuccess) {
      setQuestions(questions.filter((question) => question?.id !== id));
    }
  };
  return (
    <>
      {questionModal && <QuestionModal setQuestionModal={setQuestionModal} />}
      <div className="px-6 max-w-[1000px]">
        <div className="flex font-bold text-lg flex-col md:flex-row">
          <div className="flex-1 line-clamp-1 mb-3">
            Exam title: <span className="font-normal">{exam?.title}</span>
          </div>
          <div className="flex-1 mb-3">
            Duration (Minutes):{" "}
            <span className="font-normal">{exam?.durationInMinutes}</span>
          </div>
        </div>
        <div className="flex font-bold text-lg flex-col md:flex-row">
          <div className="flex-1 mb-3">
            Difficulty:{" "}
            <span className="font-normal">{exam?.difficultyName}</span>
          </div>
          <div className="flex-1 mb-3">
            Full Marks: <span className="font-normal">{exam?.fullmark}</span>
          </div>
        </div>
        <hr className="mb-3" />
        <h2 className="font-bold text-lg mb-3">
          Exam Questions {`(${questions?.length})`}
        </h2>
        <div className=" flex flex-wrap flex-col sm:flex-row items-center justify-between gap-8 w-auto mb-6">
          <div className="bg-white flex w-full sm:max-w-md p-1 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search By question Title here"
              className="rounded-full w-full outline-none bg-white border-none pl-4 text-sm"
            />
            <button
              type="button"
              className="bg-[#FBE1EC] hover:bg-primary hover:text-white transition-all text-black text-sm rounded-full px-5 py-2.5"
            >
              Search
            </button>
          </div>
          <div>
            <button
              onClick={() => setQuestionModal(true)}
              className="border border-pink-600 text-pink-600 text-sm px-4 py-3 flex items-center gap-2 rounded-xl w-full sm:w-auto"
            >
              <Icon icon="octicon:plus-circle-16" />
              Add a question
            </button>
          </div>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-scroll pink-sc pr-3">
          {questions?.map((question, i) => {
            return (
              <li
                key={i}
                className={`bg-white shadow-sm select-none rounded-lg flex items-center justify-between border border-transparent hover:border-[#E2508D] soft`}
              >
                <span className="flex-1 line-clamp-1 px-4 py-3">
                  {i + 1}. {question?.description}
                </span>
                <span>
                  <Icon
                    icon="bx:edit"
                    onClick={() => console.log("edit")}
                    className="bg-[#FEF6FF] w-8 h-8 p-2 mr-4 text-primary
                  rounded-lg cursor-pointer"
                  />
                </span>
                <span>
                  <Icon
                    icon="fluent:delete-28-regular"
                    onClick={() => handleDeleteQuestion(question?.id)}
                    className="bg-[#FFF2F7] w-8 h-8 p-2 mr-4 text-[#E23F3F] rounded-lg cursor-pointer"
                  />
                </span>
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Questions;
