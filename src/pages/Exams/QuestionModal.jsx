import { useState } from "react";
import { addQuestion } from "../../utils/Exams";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const QuestionModal = ({ setQuestionModal, fetchExam }) => {
  let params = useParams();
  const [option, setOption] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [questionTitle, setQuestionTitle] = useState("");
  const [answers, setAnswers] = useState({
    A: { description: "", reason: "", isCorrect: false },
    B: { description: "", reason: "", isCorrect: false },
    C: { description: "", reason: "", isCorrect: false },
    D: { description: "", reason: "", isCorrect: false },
  });
  const handleAddQuestion = async () => {
    const data = {
      description: questionTitle,
      answers: Object.values(answers),
    };
    let res = await addQuestion(params?.id, data);
    if (res?.isSuccess) {
      setQuestionModal(false);
      fetchExam();
      Swal.fire({
        icon: "success",
        title: "Question Added Successfully",
      });
    }
  };
  return (
    <>
      <div
        className="fixed soft top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-40"
        onClick={() => setQuestionModal(false)}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white px-10 py-6 rounded-3xl w-[90%] md:w-[500px] ">
          <h2 className="font-bold text-lg mb-3">Add Your Question</h2>
          <label className="text-primary mb-1 block text-sm" htmlFor="question">
            Question
          </label>
          <input
            type="text"
            id="question"
            placeholder="Enter Question here"
            className="input"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
          <p className="mt-3 mb-2 text-primary text-sm">Available Options</p>
          {Object.keys(answers).map(
            (key, index) =>
              option === index && (
                <div key={key} className="flex gap-5">
                  <div className="pt-3">{key}</div>
                  <div>
                    <input
                      type="text"
                      placeholder={`option ${index + 1}`}
                      className="input mb-3"
                      value={answers[key].description}
                      onChange={(e) =>
                        setAnswers({
                          ...answers,
                          [key]: {
                            ...answers[key],
                            description: e.target.value,
                          },
                        })
                      }
                    />
                    <textarea
                      className="input"
                      placeholder="Explanation"
                      value={answers[key].reason}
                      onChange={(e) =>
                        setAnswers({
                          ...answers,
                          [key]: { ...answers[key], reason: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              )
          )}
          <p className="mt-3 mb-2 text-primary text-sm">Correct Answer</p>
          <div className="flex gap-5 select-none">
            {Object.keys(answers).map((key) => (
              <label key={key} className=" cursor-pointer">
                <input
                  type="radio"
                  className="cursor-pointer"
                  value={key}
                  checked={correctAnswer === key}
                  onChange={() => {
                    setCorrectAnswer(key);
                    setAnswers({
                      A: { ...answers.A, isCorrect: key === "A" },
                      B: { ...answers.B, isCorrect: key === "B" },
                      C: { ...answers.C, isCorrect: key === "C" },
                      D: { ...answers.D, isCorrect: key === "D" },
                    });
                  }}
                />{" "}
                {key}
              </label>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            {option == 3 ? (
              <div
                onClick={() => handleAddQuestion()}
                className="main-btn !px-10 text-sm select-none cursor-pointer"
              >
                Finish
              </div>
            ) : (
              <div
                onClick={() => {
                  if (option < 3) setOption(option + 1);
                }}
                className="main-btn !px-10 text-sm select-none cursor-pointer"
              >
                Next
              </div>
            )}

            <div
              onClick={() => {
                if (option > 0) setOption(option - 1);
              }}
              className="second-btn !px-10 text-sm select-none cursor-pointer"
            >
              Prev
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionModal;
