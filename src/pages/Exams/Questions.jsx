import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router-dom";
import QuestionModal from "./QuestionModal";
import { useEffect, useState } from "react";
import {
  deleteQuestion,
  editQuestion,
  getExam,
  getTestQuestions,
} from "../../utils/Exams";
import EditQuestionModal from "./EditQuestionModal";

const Questions = () => {
  let params = useParams();
  const [questionModal, setQuestionModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState({});
  const [editQuestionModal, setEditQuestionModal] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [answers, setAnswers] = useState({
    A: { description: "", reason: "", isCorrect: false },
    B: { description: "", reason: "", isCorrect: false },
    C: { description: "", reason: "", isCorrect: false },
    D: { description: "", reason: "", isCorrect: false },
  });
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const handleEditQuestion = async () => {
    let data = {
      description: questionTitle,
      answers: Object.values(answers),
    };
    let res = await editQuestion(questionId, data);
    if (res?.isSuccess) {
      fetchExam();
      setEditQuestionModal(false);
      setQuestionTitle("");
      setAnswers({
        A: { description: "", reason: "", isCorrect: false },
        B: { description: "", reason: "", isCorrect: false },
        C: { description: "", reason: "", isCorrect: false },
        D: { description: "", reason: "", isCorrect: false },
      });
      setCorrectAnswer(null);
    }
  };

  const fetchExam = async () => {
    let { data } = await getExam(params?.id);
    setExam(data);
    let questions = await getTestQuestions(params?.id);
    setQuestions(questions?.data);
  };
  useEffect(() => {
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
      {editQuestionModal && (
        <EditQuestionModal
          setEditQuestionModal={setEditQuestionModal}
          questionTitle={questionTitle}
          setQuestionTitle={setQuestionTitle}
          answers={answers}
          setAnswers={setAnswers}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          handleEditQuestion={handleEditQuestion}
        />
      )}
      {questionModal && (
        <QuestionModal
          setQuestionModal={setQuestionModal}
          fetchExam={fetchExam}
        />
      )}
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
                className={`bg-white shadow-sm select-none rounded-lg flex items-center justify-between gap-5 border border-transparent hover:border-[#E2508D] soft px-4 py-3`}
              >
                <div className="flex-1 line-clamp-1 ">
                  {i + 1}. {question?.description}
                </div>
                <div className="flex gap-4">
                  <span>
                    <Icon
                      icon="bx:edit"
                      onClick={() => {
                        setQuestionId(question?.id);
                        setQuestionTitle(question?.description);
                        setAnswers({
                          A: question?.answers[0],
                          B: question?.answers[1],
                          C: question?.answers[2],
                          D: question?.answers[3],
                        });
                        const answerMap = { 0: "A", 1: "B", 2: "C", 3: "D" };
                        const correctAnswerKey = Object.keys(answerMap).find(
                          (key) => question?.answers[key]?.isCorrect
                        );
                        setCorrectAnswer(answerMap[correctAnswerKey]);
                        setEditQuestionModal(true);
                      }}
                      className="bg-[#FEF6FF] w-8 h-8 p-2  text-primary rounded-lg cursor-pointer"
                    />
                  </span>
                  <span>
                    <Icon
                      icon="fluent:delete-28-regular"
                      onClick={() => handleDeleteQuestion(question?.id)}
                      className="bg-[#FFF2F7] w-8 h-8 p-2 text-[#E23F3F] rounded-lg cursor-pointer"
                    />
                  </span>
                </div>
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Questions;
