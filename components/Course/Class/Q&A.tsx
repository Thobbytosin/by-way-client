import { styles } from "@/styles/style";
import React, { FC } from "react";
import SimpleLoader from "../../SimpleLoader/SimpleLoader";
import { NotInterestedIcon, ReplyIcon, VerifiedIcon } from "@/icons/icons";
import { format } from "timeago.js";
import Image from "next/image";

type Props = {
  user: any;
  handleSubmit: (e: any) => void;
  form: any;
  setForm: (e: any) => void;
  replyForm: any;
  isLoading: boolean;
  active: any;
  showMore: boolean;
  setShowMore: any;
  toggleReplyBox: (questionId: any) => void;
  visibleQuestion: any;
  visibleReply: any;
  toggleReplies: (questionId: any) => void;
  addReplyLoading: boolean;
  handleReplyChange: any;
  handleSubmitReply: any;
};

const QA: FC<Props> = ({
  user,
  handleSubmit,
  form,
  setForm,
  replyForm,
  isLoading,
  active,
  showMore,
  setShowMore,
  toggleReplyBox,
  visibleQuestion,
  visibleReply,
  toggleReplies,
  addReplyLoading,
  handleReplyChange,
  handleSubmitReply,
}) => {
  return (
    <div className=" w-full border-t border-gray-300 dark:border-gray-800 mt-8 py-8">
      <h3 className={styles.courseSubTagHeading}>Discussions</h3>

      {/* form container */}
      <div className=" w-full gap-4 flex justify-between items-start mt-8">
        {/* image */}
        <div className=" w-[3rem] h-[3rem] rounded-full border-2 border-primary overflow-hidden">
          <Image
            src={user?.avatar?.url}
            alt="admin_image"
            className=" w-full h-full object-cover"
          />
        </div>

        {/* question form */}
        <form
          onSubmit={handleSubmit}
          className=" w-full flex flex-col items-end"
        >
          <textarea
            id="question"
            name="question"
            cols={30}
            rows={3}
            placeholder="Ask your question..."
            value={form.question}
            onChange={(e: any) =>
              setForm({ ...form, question: e.target.value })
            }
            className={`${styles.inputStyle} mb-4`}
          ></textarea>
          {isLoading ? (
            <SimpleLoader isAdmin />
          ) : (
            <button className=" mt-4 bg-primary text-white px-8 py-3 rounded-full">
              Post Question
            </button>
          )}
        </form>
      </div>

      <br />

      {/* CONVERSATIONS */}
      {active?.questions[0] ? (
        <div className="w-full border-t border-gray-300 dark:border-gray-800 mt-8 py-8">
          <h3 className={styles.courseSubTagHeading}>Join the discussion</h3>
          {active.questions
            ?.slice(0, showMore ? active.questions.length : 3)
            ?.map((question: any, i: number) => (
              <div
                key={i}
                className={`flex gap-2 items-start w-full  ${
                  i === active.questions.length - 1
                    ? "py-6"
                    : "py-6 border-b border-gray-200 dark:border-gray-800"
                }`}
              >
                {/* QUESTIONS */}
                {/* image profile */}
                <div className=" w-[2.3rem] h-[2.3rem] rounded-full border-2 border-primary overflow-hidden">
                  <Image
                    src={question?.user?.avatar?.url}
                    alt="admin_image"
                    className=" w-full h-full object-cover"
                  />
                </div>
                {/* content */}
                <div className=" w-full">
                  <h4 className=" font-semibold flex items-center gap-2">
                    <span>{question?.user?.name} </span>
                    {question?.user?.role === "admin" && (
                      <span className=" text-[14px] text-primary">
                        <VerifiedIcon fontSize="inherit" />
                      </span>
                    )}
                  </h4>
                  <p className="text-sm mt-1 dark:text-gray-200 text-gray-800">
                    {question?.question}
                  </p>
                  <span className=" text-[12px] text-gray-500">
                    {format(question?.createdAt)}
                  </span>

                  {/* REPLIES */}

                  {/* reply & view replies */}
                  <div className=" flex gap-6">
                    <p
                      onClick={() => toggleReplyBox(question._id)}
                      className="  text-sm  cursor-pointer mt-2"
                    >
                      {!visibleQuestion[question._id] ? (
                        <span className=" text-primary">
                          <ReplyIcon fontSize="inherit" /> Reply
                        </span>
                      ) : (
                        <span className=" text-warning">
                          <NotInterestedIcon fontSize="inherit" /> Not
                          Interested
                        </span>
                      )}
                    </p>
                    <p className=" text-sm cursor-pointer mt-2 text-gray-500 ">
                      {question?.questionReplies?.length === 0 && (
                        <span>No reply yet</span>
                      )}

                      {/* show replies */}
                      {question?.questionReplies?.length >= 1 &&
                        !visibleReply[question._id] && (
                          <span
                            onClick={() => toggleReplies(question._id)}
                          >{`View Replies (${question?.questionReplies?.length})`}</span>
                        )}

                      {/* hide replies */}
                      {question?.questionReplies?.length >= 1 &&
                        visibleReply[question._id] && (
                          <span
                            onClick={() => toggleReplies(question._id)}
                          >{`Hide Replies (${question?.questionReplies?.length})`}</span>
                        )}
                    </p>
                  </div>

                  {/* show reply text box */}
                  {visibleQuestion[question._id] && (
                    <div className="  my-4 w-full flex gap-4 items-end">
                      <textarea
                        id="reply-question"
                        name="reply-question"
                        cols={40}
                        rows={2}
                        placeholder="Enter Reply..."
                        value={
                          replyForm.questionId === question._id
                            ? replyForm.answer
                            : ""
                        }
                        onChange={(e) => handleReplyChange(e, question)}
                        className={`${styles.inputStyle} w-full`}
                      ></textarea>
                      {addReplyLoading ? (
                        <SimpleLoader isAdmin />
                      ) : (
                        <button
                          onClick={handleSubmitReply}
                          className=" mt-4 bg-primary text-white px-6 py-1.5 rounded-full text-sm"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  )}
                  <br />
                  {/* show all replies to question */}
                  {visibleReply[question._id] && (
                    <div className=" w-full  rounded-lg ">
                      {question?.questionReplies.map(
                        (reply: any, replyIndex: number) => (
                          <div
                            key={replyIndex}
                            className=" flex items-start bg-white dark:bg-gray-900 p-2 w-full mt-2"
                          >
                            {/* image profile */}
                            <div className=" w-[1.6rem] h-[1.6rem] rounded-full border-2 border-success overflow-hidden">
                              <Image
                                src={reply?.user?.avatar?.url}
                                alt="admin_image"
                                className=" w-full h-full object-cover"
                              />
                            </div>
                            <div className=" ml-2">
                              <h5 className="  text-sm font-semibold flex gap-2 items-center">
                                <span>{reply?.user?.name} </span>
                                {reply?.user?.role === "admin" && (
                                  <span className=" text-[14px] text-primary">
                                    <VerifiedIcon fontSize="inherit" />
                                  </span>
                                )}
                              </h5>
                              <p className=" text-[12px]">{reply?.answer}</p>
                            </div>
                            {/* time */}
                            <p className=" text-[12px] ml-8 text-gray-500">
                              {format(reply.createdAt)}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full border-t border-gray-300 dark:border-gray-800 mt-8 py-8">
          <h3 className={"font-medium text-lg "}>
            No ongoing discussion yet. Ask a question to start one.
          </h3>
        </div>
      )}

      {/* SHOW MORE */}
      {active?.questions[0] && active.questions.length > 3 && (
        <>
          {!showMore ? (
            <button
              onClick={() => setShowMore((prev: boolean) => !prev)}
              className=" text-primary underline font-medium text-lg transition duration-300 hover:dark:text-white hover:text-black"
            >
              Show more
            </button>
          ) : (
            <button
              onClick={() => setShowMore((prev: boolean) => !prev)}
              className=" text-primary underline font-medium text-lg transition duration-300 hover:dark:text-white hover:text-black"
            >
              Show Less
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default QA;
