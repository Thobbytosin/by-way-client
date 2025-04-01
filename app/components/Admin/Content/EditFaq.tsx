import {
  AddCircleIcon,
  AddIcon,
  DeleteIcon,
  RemoveIcon,
} from "../../../icons/icons";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/layout/layoutApi";
import React, { useEffect, useState, FC } from "react";
import toast from "react-hot-toast";
import SimpleLoader from "../../SimpleLoader/SimpleLoader";

type Props = {};

const EditFaq: FC<Props> = () => {
  const { data, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
  const [editLayout, { isSuccess, isLoading, error }] = useEditLayoutMutation();

  // fetch data
  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }

    if (isSuccess) {
      refetch();
      toast.success("Faqs Updated");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  // Handle toggle functionality
  const handleToggleAnswer = (id: any) => {
    setActiveQuestionId((prev) => (prev === id ? null : id));
  };

  // add new faq
  const handleAddNewFaqs = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  // delete a faaq
  const handleDeleteFaq = (id: any) => {
    const updatedFaq = questions?.filter((_, index) => index !== id);
    setQuestions(updatedFaq);
  };

  // handle edit question / answer
  const handleChangeQuestionOrAnswer = (
    id: any,
    key: "question" | "answer",
    value: string
  ) => {
    setQuestions((prevFaqs) =>
      prevFaqs.map((faq, index) =>
        index === id ? { ...faq, [key]: value } : faq
      )
    );
  };

  // check if quesions are unchanged
  const areFaqsUnchanged = (oldFaqs: any[], newFaqs: any[]) => {
    return JSON.stringify(oldFaqs) === JSON.stringify(newFaqs);
  };

  // check if any faq is empty
  const isAnyFaqEmpty = (faqs: any[]) => {
    return faqs.some((q) => q.question === "" || q.answer === "");
  };

  // save faqs
  const handleSave = async () => {
    await editLayout({ type: "FAQ", faq: questions });
  };

  // console.log(questions);
  // console.log(activeQuestionId);

  return (
    <div className="my-[8rem] w-[80%] mx-auto">
      {questions?.map((faq: any, i: number) => (
        <div key={i} className=" w-full  mt-10 ">
          <div className=" flex items-center gap-10 ">
            <div
              onClick={() => handleToggleAnswer(i)}
              aria-disabled={isLoading}
              className={`flex items-center justify-between w-full ${
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              } pb-10 border-b-2 border-secondary dark:border-white mr-10"`}
            >
              <input
                type="text"
                disabled={isLoading}
                value={faq.question}
                placeholder="Enter a question..."
                onChange={(e) =>
                  handleChangeQuestionOrAnswer(i, "question", e.target.value)
                }
                className={`w-[90%] text-2xl outline-none border-none bg-transparent ${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              />
              {activeQuestionId === i ? (
                <RemoveIcon fontSize="large" />
              ) : (
                <AddIcon fontSize="large" />
              )}
            </div>

            {/* delete button */}
            {questions.length > 1 && !isLoading && (
              <DeleteIcon
                onClick={() => handleDeleteFaq(i)}
                color="warning"
                fontSize="large"
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

          {/* show answer */}
          {activeQuestionId === i && (
            <textarea
              className={`w-full mt-3 bg-gray-300 dark:bg-dimDark p-3 text-lg outline-none ${
                isLoading ? "cursor-not-allowed" : null
              }`}
              disabled={isLoading}
              placeholder="Enter the reply..."
              rows={2}
              value={faq.answer}
              onChange={(e) =>
                handleChangeQuestionOrAnswer(i, "answer", e.target.value)
              }
            />
          )}
        </div>
      ))}

      <AddCircleIcon
        style={{ marginTop: "42px", fontSize: "50px", cursor: "pointer" }}
        onClick={handleAddNewFaqs}
      />

      {/* button */}
      <div className=" w-full  flex justify-end mt-20 ">
        {isLoading ? (
          <SimpleLoader isAdmin />
        ) : (
          <button
            className={` text-lg px-6 py-2 ${
              areFaqsUnchanged(data?.layout.faq, questions) ||
              isAnyFaqEmpty(questions)
                ? "bg-secondary dark:bg-white dark:text-secondary text-white opacity-70 cursor-not-allowed "
                : "cursor-pointer bg-primary text-white"
            }  rounded-md text-center`}
            onClick={
              areFaqsUnchanged(data?.layout.faq, questions) ||
              isAnyFaqEmpty(questions)
                ? () => null
                : handleSave
            }
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default EditFaq;

// const handleToggle = (id: number) => {
//   setActiveQuestion((prev) => (prev === id ? null : id));
// };

// // Handle edit functionality for question and answer
// const handleEdit = (
//   id: number,
//   key: "question" | "answer",
//   value: string
// ) => {
//   setQuestions((prevFaqs) =>
//     prevFaqs.map((faq) => (faq._id === id ? { ...faq, [key]: value } : faq))
//   );
// };

// {/* <div key={faq._id} style={{ marginBottom: "20px" }}>
//           {/* Editable Question */}
//           <input
//             type="text"
//             value={faq.question}
//             onChange={(e) => handleEdit(faq._id, "question", e.target.value)}
//             style={{ fontWeight: "bold", cursor: "pointer" }}
//             onClick={() => handleToggle(faq._id)}
//           />

//           {/* Toggle Answer */}
//           {activeQuestion === faq._id && (
//             <textarea
//               value={faq.answer}
//               onChange={(e) => handleEdit(faq._id, "answer", e.target.value)}
//               style={{ display: "block", width: "100%", marginTop: "10px" }}
//             />
//           )}
//         </div> */}
