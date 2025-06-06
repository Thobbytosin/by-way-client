/* eslint-disable react-hooks/exhaustive-deps */
import {
  AccessTimeIcon,
  LockIcon,
  NotInterestedIcon,
  PlayArrowIcon,
  ReplyIcon,
  SchoolIcon,
  StarOutlineIcon,
  StarRateIcon,
  VerifiedIcon,
  WorkspacePremiumIcon,
} from "@/icons/icons";
import { styles } from "@/styles/style";
import CoursePlayer from "@/utils/CoursePlayer";
import React, { useEffect, FC, useState } from "react";
import toast from "react-hot-toast";
import SimpleLoader from "../../SimpleLoader/SimpleLoader";
import { format } from "timeago.js";
import Ratings from "@/utils/Ratings";
import Image from "next/image";
import congratulationsGif from "@/../public/assets/congratulations.gif";
import { useRouter } from "next/navigation";
import CourseClassContentList from "./CourseClassContentList";
import { useSocketNotification } from "@/hooks/useSocketNotification";
import { useUserMutations, useUserQueries } from "@/hooks/api/user.api";
import { useCourseMutations, useCourseQueries } from "@/hooks/api/course.api";
import avatarFallback from "@/public/assets/avatar.png";
import { CourseData } from "@/types/course";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LessonStatus } from "@/types/user";

const subTags = ["Details", "Qs & As", "Reviews"];

type Props = {
  data: CourseData[];
  setActiveVideo: (value: CourseData | null) => void;
  activeVideo: CourseData | null;
  setActiveIndex: (value: number) => void;
  activeIndex: number;
  courseId: string;
  courseData: CourseData[];
  selectedCourse: LessonStatus | null;
  setSelectedCourse: (value: LessonStatus | null) => void;
};

const CourseClassContent: FC<Props> = ({
  data,
  activeVideo,
  setActiveVideo,
  activeIndex,
  setActiveIndex,
  courseId,
  courseData,
  selectedCourse,
  setSelectedCourse,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  // NEXT PACKAGES
  const router = useRouter();

  // SOCKET IO
  const { emitNotification } = useSocketNotification();

  // API CALLS
  const { adminDomainData } = useUserQueries({ type: "admin" });
  const { admin } = adminDomainData;
  const { userInfo } = useUserMutations();
  const { updateViewedLesson } = userInfo;
  const { usersDomainData } = useUserQueries({ type: "user-lists" });
  const { usersList } = usersDomainData;
  const { courseDomain } = useCourseQueries({
    type: "auth-course",
    courseId,
  });
  const { course } = courseDomain;
  const { courseInfo, courseInfoPending, courseInfoSuccess } =
    useCourseMutations(courseId);
  const {
    submitQuestion,
    submitRepyToQuestion,
    submitReview,
    submitReviewReply,
  } = courseInfo;
  const {
    submitQuestionPending,
    submitRepyToQuestionPending,
    submitReviewPending,
    submitReviewReplyPending,
  } = courseInfoPending;
  const {
    submitQuestionSuccess,
    submitRepyToQuestionSuccess,
    submitReviewSuccess,
  } = courseInfoSuccess;

  // INTIAL STATES
  const [rating, setRating] = useState(1);
  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");

  // initial form values
  const initialFormValues = {
    question: "",
    contentId: activeVideo?._id,
    courseId: courseId,
  };
  const initialReplyValues = {
    answer: "",
    questionId: questionId,
    contentId: activeVideo?._id,
    courseId: courseId,
  };
  const initialReviewValues = {
    rating: rating,
    review: "",
  };

  const initialReplyReviewValues = {
    reply: "",
    reviewId: reviewId,
  };

  // STATES VARIABLES
  const [activeTag, setActiveTag] = useState(0);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // STATES FORMS
  const [form, setForm] = useState(initialFormValues);
  const [replyForm, setReplyForm] = useState(initialReplyValues);
  const [reviewForm, setReviewForm] = useState(initialReviewValues);
  const [replyReviewForm, setReplyReviewForm] = useState(
    initialReplyReviewValues
  );

  const [showMoreReview, setShowMoreReview] = useState(false);

  // fetch user latest role

  const fetchUserLatestData = (userId: string) => {
    if (!usersList) return null;
    const updatedUser = usersList?.filter((user: any) => user._id === userId);

    return {
      role: updatedUser?.[0]?.role,
      name: updatedUser?.[0]?.name,
      avatar: updatedUser?.[0]?.avatar,
    };
  };

  // to update form contentId
  useEffect(() => {
    if (activeVideo) {
      setForm({ ...form, contentId: activeVideo?._id });
      setReplyForm({ ...replyForm, contentId: activeVideo?._id });
      setReviewForm({ ...reviewForm, rating: rating });
    }
  }, [activeVideo, rating]);

  // update questions in the course
  useEffect(() => {
    if (user) {
      if (submitQuestionSuccess) {
        emitNotification({
          title: "New Question Received",
          message: `You have a new question in ${activeVideo?.title} course.`,
          userId: user?._id,
        });
      }
    }
  }, [submitQuestionSuccess]);

  // update replies to questions
  useEffect(() => {
    if (user) {
      if (submitRepyToQuestionSuccess) {
        // if the answer is not from an admin, send notification again
        if (user?.role !== "admin") {
          emitNotification({
            title: "New Reply to Question Received",
            message: `You have a new reply to a question in ${activeVideo?.title} course.`,
            userId: user?._id,
          });
        }
      }
    }
  }, [submitRepyToQuestionSuccess]);

  // add review to course
  useEffect(() => {
    if (user) {
      if (submitReviewSuccess) {
        emitNotification({
          title: "New Review Received",
          message: `You have a new review in ${activeVideo?.title} course.`,
          userId: user?._id,
        });
      }
    }
  }, [submitReviewSuccess]);

  // submit question
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.question.length === 0) {
      toast.error("Question cannot be empty");
    } else {
      submitQuestion(form);

      setForm({ ...form, question: "" });
    }
  };

  // submit review form
  const handleSubmitReview = async (e: any) => {
    e.preventDefault();

    if (reviewForm.review.length === 0) {
      toast.error("Review cannot be empty");
    } else {
      submitReview(reviewForm);
      // update UI

      if (selectedCourse) {
        setSelectedCourse({ ...selectedCourse, reviewed: true });
      }

      setReviewForm({ ...reviewForm, review: "" });
    }
  };

  interface VisibleQuestionState {
    [key: string]: boolean;
  }

  const [visibleQuestion, setVisibleQuestion] = useState<VisibleQuestionState>(
    {}
  );

  // show and hide reply text area
  const toggleReplyBox = (questionId: any) => {
    setVisibleQuestion((prevQuestionIds) => ({
      ...prevQuestionIds,
      [questionId]: !prevQuestionIds[questionId],
    }));
  };

  const [visibleReply, setVisibleReply] = useState<VisibleQuestionState>({});

  // show and hide reply text area
  const toggleReplies = (questionId: any) => {
    setVisibleReply((prevReplies) => ({
      ...prevReplies,
      [questionId]: !prevReplies[questionId],
    }));
  };

  const [visibleReplyReview, setVisibleReplyReview] =
    useState<VisibleQuestionState>({});

  const toggleReplyReview = (reviewId: any) => {
    setVisibleReplyReview((prevReviewReplies) => ({
      ...prevReviewReplies,
      [reviewId]: !prevReviewReplies[reviewId],
    }));
  };

  // handle ReplyChange
  const handleReplyChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    question: any
  ) => {
    const { _id } = question;
    setQuestionId(_id);

    setReplyForm({ ...replyForm, questionId: _id, answer: e.target.value });
  };

  // submit reply to question
  const handleSubmitReply = async () => {
    if (replyForm.answer.length === 0) {
      toast.error("Reply cannot be empty");
    } else {
      submitRepyToQuestion(replyForm);

      setReplyForm({ ...replyForm, answer: "" });
    }
  };

  // handle reply review chnage
  const handleReplyReviewChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    review: any
  ) => {
    const { _id } = review;
    setReviewId(_id);

    setReplyReviewForm({
      ...replyReviewForm,
      reviewId: _id,
      reply: e.target.value,
    });
  };

  // submit reply to question
  const handleSubmitReviewReply = async () => {
    if (replyReviewForm.reply.length === 0) {
      toast.error("Reply cannot be empty");
    } else {
      submitReviewReply(replyReviewForm);

      setReplyReviewForm({ ...replyReviewForm, reply: "" });
    }
  };

  // next button
  const handleNext = () => {
    if (activeIndex < courseData.length - 1) {
      const currentVideo = courseData[activeIndex];

      const hasBeenViewed = selectedCourse?.progress.find(
        (c) => c.videoId === currentVideo._id
      )?.viewed;

      if (!hasBeenViewed) {
        // update UI

        if (selectedCourse) {
          const updatedProgress = selectedCourse?.progress.map((p) =>
            p.videoId === currentVideo._id ? { ...p, viewed: true } : p
          );

          setSelectedCourse({ ...selectedCourse, progress: updatedProgress });
        }

        // sent to backend
        updateViewedLesson({ courseId, videoId: currentVideo._id });
      }

      const nextIndex = activeIndex + 1;
      const nextVideo = courseData[nextIndex];
      setActiveIndex(nextIndex);
      setActiveVideo(nextVideo);
    }
  };

  // prev button
  const handlePrev = () => {
    if (activeIndex > 0) {
      const prevIndex = activeIndex - 1;
      const prevVideo = courseData[prevIndex];
      setActiveIndex(prevIndex);
      setActiveVideo(prevVideo);
    }
  };

  // finish course btn
  const handleFinishCourse = () => {
    const currentVideo = courseData[activeIndex];

    const hasBeenViewed = selectedCourse?.progress.find(
      (c) => c.videoId === currentVideo._id
    )?.viewed;

    if (!hasBeenViewed) {
      // update UI

      if (selectedCourse) {
        const updatedProgress = selectedCourse?.progress.map((p) =>
          p.videoId === currentVideo._id ? { ...p, viewed: true } : p
        );

        setSelectedCourse({ ...selectedCourse, progress: updatedProgress });
      }

      // sent to backend
      updateViewedLesson({ courseId, videoId: currentVideo._id });

      setShowCompletedModal(true);
    }
  };

  return (
    <>
      {activeVideo && (
        <div
          className={`${styles.paddingLeft} ${styles.paddingY} w-full h-full  lg:col-span-7 col-span-10 `}
        >
          {/* video title */}
          <h2 className=" font-semibold text-[1rem] sm:text-[1.4rem] mb-6">
            Lesson {activeIndex + 1}. {activeVideo.title}
          </h2>

          {/* video player */}

          <CoursePlayer
            key={activeVideo._id}
            link={activeVideo.videoUrl}
            isClass
          />

          {/* buttons */}
          <div className=" w-full mt-5 flex justify-between items-center">
            {/* prev button */}
            <button
              disabled={activeIndex === 0}
              onClick={handlePrev}
              className={`${
                activeIndex === 0 && "cursor-no-drop opacity-40"
              } text-xs sm:text-sm font-medium min-w-[8rem] px-4 text-center py-2 rounded-full bg-warning text-white`}
            >
              Previous Class
            </button>

            {/* finish course / next course btn */}
            {activeIndex === data.length - 1 ? (
              <button
                onClick={handleFinishCourse}
                className={`text-xs sm:text-sm font-medium min-w-[8rem] text-center py-2 px-4 rounded-full bg-success text-white`}
              >
                Finish Course
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`text-xs sm:text-sm min-w-[8rem] text-center py-2 px-4 rounded-full font-medium  bg-primary text-white`}
              >
                Next Class
              </button>
            )}
          </div>

          {/* *************************************** */}
          <div className=" sm:flex gap-3 sm:gap-6 mt-10">
            {/* course content subtag */}
            <div
              key={3}
              className={` lg:hidden cursor-pointer w-full sm:w-fit px-4 h-10 flex justify-center items-center rounded-md text-center font-medium border-2 dark:border-gray-800 sm:text-sm text-xs  ${
                activeTag == 3
                  ? "bg-primary text-white border-none"
                  : "bg-transparent"
              }`}
              onClick={() => setActiveTag(3)}
            >
              <h3>Course Content</h3>
            </div>

            {/* rest of sub tags */}
            {subTags.map((tag: string, index: number) => (
              <div
                key={index}
                className={`cursor-pointer w-full mt-2 sm:mt-0 sm:w-fit px-4 h-10 flex justify-center items-center rounded-md text-center font-medium border-2 dark:border-gray-800 text-xs sm:text-sm  ${
                  activeTag == index
                    ? "bg-primary text-white border-none"
                    : "bg-transparent"
                }`}
                onClick={() => setActiveTag(index)}
              >
                <h3>{tag}</h3>
              </div>
            ))}
          </div>

          {/* mobile and tablet - course content */}
          {activeTag === 3 && (
            <div className="block lg:hidden my-10">
              {/* instructor */}
              <div className=" w-full border-t border-gray-300 dark:border-gray-800 mt-8 py-8">
                {/* instructor */}
                <div className=" border-b border-gray-300 dark:border-gray-800 pb-8 mb-8">
                  {/* descriptions */}
                  <h3 className={styles.detailsSubTagHeading}>Instructor</h3>

                  <h3 className=" text-base font-medium text-primary leading-7">
                    {admin?.name}
                  </h3>
                  <p className="text-sm font-semibold">Teacher</p>

                  {/* teacher avatar */}
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-primary overflow-hidden">
                      <Image
                        src={admin?.avatar?.url || avatarFallback}
                        alt="admin_image"
                        width={100}
                        height={100}
                        className=" w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className=" text-xs sm:text-sm  font-medium">
                        <WorkspacePremiumIcon fontSize="inherit" />{" "}
                        <span className="">1732 Reviews</span>
                      </p>
                      <p className="text-xs sm:text-sm font-medium mt-1.5">
                        <SchoolIcon fontSize="inherit" />{" "}
                        <span className="">805 Students</span>
                      </p>
                      <p className=" text-xs sm:text-sm  font-medium mt-1.5">
                        <PlayArrowIcon fontSize="inherit" />{" "}
                        <span className="">64 Courses</span>
                      </p>
                    </div>
                  </div>

                  {/* about */}
                  <p className={`${styles.detailsDescription} mt-4`}>
                    With over a decade of industry experience, Ronald brings a
                    wealth of practical knowledge to the classroom. He has
                    played a pivotal role in designing user-centric interfaces
                    for renowned tech companies, ensuring seamless and engaging
                    user experiences.
                  </p>
                </div>
              </div>

              {/* tablets and mobile */}
              {/* <CourseClassContentList
                data={data}
                courseId={courseId}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                // hideForLargeTrue
              /> */}
            </div>
          )}

          {/* details */}
          {activeTag === 0 && (
            <div className=" w-full border-t border-gray-300 dark:border-gray-800 mt-8 py-8">
              <h2 className={styles.detailsSubTagHeading}>Overview</h2>
              <p className={styles.detailsDescription}>
                {activeVideo.videoDescription}
              </p>

              <br />

              {activeVideo.objectives[0] && (
                <h2 className={styles.detailsSubTagHeading}>
                  Learning Objectives
                </h2>
              )}

              {activeVideo.objectives[0] &&
                activeVideo.objectives.map((objective: any, index: number) => (
                  <p key={index} className=" mt-4 flex gap-2 items-center">
                    <span className=" w-2 h-2 rounded-full bg-slate-900 dark:bg-slate-200" />
                    <span className={styles.detailsDescription}>
                      {objective.title}
                    </span>
                  </p>
                ))}

              <br />

              <h2 className={styles.detailsSubTagHeading}>Resources</h2>
              {activeVideo.links.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  className=" mt-4  flex gap-2 items-center"
                >
                  <span className="">{index + 1}.</span>
                  <span className="underline text-primary font-medium">
                    {link.title}
                  </span>
                </a>
              ))}
            </div>
          )}

          {/* Q&A */}
          {activeTag === 1 && (
            <div className=" w-full border-t border-gray-300 dark:border-gray-800 mt-8 py-8">
              <h3 className={styles.detailsSubTagHeading}>Discussions</h3>

              {/* form container */}
              <div className=" w-full gap-4 flex justify-between items-start mt-8">
                {/* image */}
                <div className="w-[2.8rem] h-[2.4rem] sm:w-[3.4rem] sm:h-[3rem] rounded-full border-2 border-primary overflow-hidden">
                  <Image
                    src={user?.avatar?.url || avatarFallback}
                    alt="admin_image"
                    width={100}
                    height={100}
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
                    className={`${styles.inputStyle} dark:bg-gray-900 bg-white text-sm mb-4`}
                  ></textarea>
                  {submitQuestionPending ? (
                    <SimpleLoader isAdmin />
                  ) : (
                    <button className=" mt-4 bg-primary text-white px-8 py-3 rounded-full text-xs font-medium sm:text-sm">
                      Post Question
                    </button>
                  )}
                </form>
              </div>

              <br />

              {/* DISCUSSIONS */}
              {activeVideo?.questions[0] ? (
                <div className="w-full border-t border-gray-300 dark:border-gray-800 mt-8 py-8">
                  <h3 className={styles.detailsSubTagHeading}>
                    Join the discussion
                  </h3>
                  {activeVideo.questions
                    ?.slice(0, showMore ? activeVideo.questions.length : 6)
                    ?.map((question: any, i: number) => (
                      // each question content
                      <div
                        key={i}
                        className={`flex gap-2 items-start w-full  ${
                          i === activeVideo.questions.length - 1
                            ? "py-6"
                            : "py-6 border-b border-gray-200 dark:border-gray-800"
                        }`}
                      >
                        {/* QUESTIONS */}

                        {/* image profile */}
                        <div className=" w-[2.6rem] h-[2.3rem] rounded-full border-2 border-primary overflow-hidden">
                          <Image
                            src={
                              fetchUserLatestData(question?.user?._id)?.avatar
                                .url || avatarFallback
                            }
                            alt="admin_image"
                            width={100}
                            height={100}
                            className=" w-full h-full object-cover"
                          />
                        </div>

                        {/* content */}
                        <div className=" w-full">
                          <h4 className=" font-semibold flex items-center gap-2 text-sm">
                            <span>
                              {fetchUserLatestData(question?.user?._id)?.name}
                            </span>
                            {fetchUserLatestData(question?.user?._id)?.role ===
                              "admin" && (
                              <span className=" text-[14px] text-primary">
                                <VerifiedIcon fontSize="inherit" />
                              </span>
                            )}
                          </h4>
                          <p className="text-xs mt-1 dark:text-gray-200 text-gray-800">
                            {question?.question}
                          </p>
                          <span className=" text-[12px] text-gray-500">
                            {format(question?.createdAt)}
                          </span>

                          {/* REPLIES */}

                          {/* reply button & view replies button */}
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
                            <div className="  my-4 w-full flex sm:flex-row flex-col sm:gap-4 items-end">
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
                                className={`${styles.inputStyle} dark:bg-black bg-white w-full`}
                              ></textarea>
                              {submitRepyToQuestionPending ? (
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
                                    className=" flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg w-full mt-4"
                                  >
                                    {/* image profile */}
                                    <div className=" w-[1.6rem] h-[1.6rem] rounded-full border-2 border-success overflow-hidden">
                                      <Image
                                        src={
                                          fetchUserLatestData(reply?.user?._id)
                                            ?.avatar.url || avatarFallback
                                        }
                                        alt="admin_image"
                                        width={100}
                                        height={100}
                                        className=" w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className=" ml-2">
                                      <h5 className=" text-xs sm:text-sm font-semibold flex gap-2 items-center">
                                        <span>
                                          {" "}
                                          {
                                            fetchUserLatestData(
                                              reply?.user?._id
                                            )?.name
                                          }
                                        </span>
                                        {fetchUserLatestData(reply?.user?._id)
                                          ?.role === "admin" && (
                                          <span className=" text-[14px] text-primary">
                                            <VerifiedIcon fontSize="inherit" />
                                          </span>
                                        )}
                                      </h5>
                                      <p className="text-[10px] sm:text-[12px]">
                                        {reply?.answer}
                                      </p>
                                    </div>
                                    {/* time */}
                                    <p className="text-[10px] sm:text-[12px] ml-8 text-gray-500">
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
              {activeVideo?.questions[0] &&
                activeVideo.questions.length > 3 && (
                  <>
                    {!showMore ? (
                      <button
                        onClick={() => setShowMore((prev) => !prev)}
                        className=" text-primary underline font-medium text-sm sm:text-base transition duration-300 hover:dark:text-white hover:text-black"
                      >
                        Show more
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowMore((prev) => !prev)}
                        className=" text-primary underline font-medium text-sm sm:text-base  transition duration-300 hover:dark:text-white hover:text-black"
                      >
                        Show Less
                      </button>
                    )}
                  </>
                )}
            </div>
          )}

          {/* Reviews */}
          {activeTag === 2 && (
            <div className=" w-full border-t border-gray-300 dark:border-gray-800 mt-8 py-8">
              {/* heading */}
              {!selectedCourse?.reviewed && (
                <h3 className={styles.detailsSubTagHeading}>Post a review</h3>
              )}

              {/* check if user has already reviewed this course */}

              {selectedCourse?.reviewed ? (
                <p className="mb-10 sm:mb-20 text-base lg:text-lg">
                  Thanks for your feedback,{" "}
                  <span className=" text-primary font-medium">
                    {user?.name}.
                  </span>
                </p>
              ) : (
                // ratings and image
                <div className=" flex gap-4 items-start mt-6 mb-20">
                  {/* image */}
                  <div className=" w-[2.6rem h-[2.3rem] sm:w-[3.4rem] sm:h-[3rem] rounded-full border-2 border-primary overflow-hidden">
                    <Image
                      src={user?.avatar?.url || avatarFallback}
                      alt="admin_image"
                      width={100}
                      height={100}
                      className=" w-full h-full object-cover"
                    />
                  </div>

                  <div className=" w-full">
                    {/* title */}
                    <h5 className=" font-medium">
                      Choose a rating <span className=" text-warning">*</span>
                    </h5>
                    {/* ratings */}
                    <div className=" flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <StarRateIcon
                            key={i}
                            className="text-[#EAB308] cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <StarOutlineIcon
                            key={i}
                            className="text-[#EAB308] cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>

                    {/* review form */}

                    <form
                      onSubmit={handleSubmitReview}
                      className=" w-full flex flex-col items-end mt-4"
                    >
                      <textarea
                        id="review"
                        name="review"
                        cols={30}
                        rows={3}
                        placeholder="Post a review about this course..."
                        value={reviewForm.review}
                        onChange={(e: any) =>
                          setReviewForm({
                            ...reviewForm,
                            review: e.target.value,
                          })
                        }
                        className={`${styles.inputStyle} dark:bg-gray-900 bg-white text-sm mb-4 w-full`}
                      ></textarea>
                      {submitReviewPending ? (
                        <SimpleLoader isAdmin />
                      ) : (
                        <button className=" mt-4 bg-primary text-white px-8 py-3 rounded-full">
                          Submit Review
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              )}

              {/* all reviews */}
              <h3 className={styles.detailsSubTagHeading}>
                Learners&apos; Reviews
              </h3>

              <div className=" flex sm:flex-row gap-10 sm:gap-0 flex-col mt-5 sm:mt-10">
                {/* left */}
                <div className="sm:min-w-[20rem] w-full ">
                  <div className=" flex items-center">
                    <Ratings
                      rating={course?.ratings || 0}
                      color="text-[#EAB308]"
                    />
                    <h2>
                      <span className="font-semibold text-2xl sm:text-3xl ml-2">
                        {(course?.ratings || 0).toFixed(1)}
                      </span>
                      <span className="ml-3 text-sm sm:text-base font-normal">
                        ({course?.reviews?.length}{" "}
                        {course?.reviews?.length === 1 ? "review" : "reviews"})
                      </span>
                    </h2>
                  </div>

                  <div className="w-full sm:w-[65%] flex items-center mt-8 border-t border-gray-300 pt-4">
                    <Ratings rating={5} color="text-[#EAB308]" />
                    <span className=" font-medium text-sm sm:text-lg ml-3">
                      5.0
                    </span>
                  </div>

                  {/* ratings from 5.0 - 1.0 */}

                  <div className=" flex items-center mt-2">
                    <Ratings rating={4} color="text-[#EAB308]" />
                    <span className=" font-medium text-sm sm:text-lg ml-3">
                      4.0
                    </span>
                  </div>
                  <div className=" flex items-center mt-2">
                    <Ratings rating={3} color="text-[#EAB308]" />
                    <span className=" font-medium text-sm sm:text-lg ml-3">
                      3.0
                    </span>
                  </div>
                  <div className=" flex items-center mt-2">
                    <Ratings rating={2} color="text-[#EAB308]" />
                    <span className=" font-medium text-sm sm:text-lg ml-3">
                      2.0
                    </span>
                  </div>
                  <div className=" flex items-center mt-2">
                    <Ratings rating={1} color="text-[#EAB308]" />
                    <span className=" font-medium text-sm sm:text-lg ml-3">
                      1.0
                    </span>
                  </div>
                </div>

                {/* right */}
                <div className=" w-full">
                  {/* when there is no review yet */}
                  {!course?.reviews[0] && (
                    <h3 className={"font-medium text-xl ml-10 "}>
                      No review yet.
                    </h3>
                  )}

                  {/* when there is a review */}
                  {course?.reviews[0] && (
                    <div className="h-fit w-full bg-gray-200 dark:bg-gray-900 rounded-lg">
                      {course?.reviews
                        ?.slice(0, showMoreReview ? course?.reviews.length : 5)
                        ?.map((review: any, i: number) => (
                          <div
                            key={i}
                            className={`w-full ${
                              i === course?.reviews.length - 1
                                ? "sm:p-10 p-5"
                                : "sm:p-10 p-5 border-b border-gray-400"
                            }`}
                          >
                            <div className=" w-full flex items-center justify-between">
                              {/* image and user div */}
                              <div className=" flex gap-2 items-start">
                                {/* image */}
                                <div className="w-[2.2rem] h-[2.2rem]  rounded-full border-2 border-primary overflow-hidden">
                                  <Image
                                    src={
                                      fetchUserLatestData(review?.user?._id)
                                        ?.avatar?.url || avatarFallback
                                    }
                                    width={200}
                                    height={200}
                                    alt="admin_image"
                                    className=" w-full h-full object-cover"
                                  />
                                </div>
                                {/* name and ratings */}
                                <div>
                                  <h4 className="text-sm  font-semibold flex gap-2 items-center mb-1">
                                    <span>
                                      {
                                        fetchUserLatestData(review?.user?._id)
                                          ?.name
                                      }
                                    </span>
                                    {fetchUserLatestData(review?.user?._id)
                                      ?.role === "admin" && (
                                      <span className=" text-[14px] text-primary">
                                        <VerifiedIcon fontSize="inherit" />
                                      </span>
                                    )}
                                  </h4>
                                  <Ratings
                                    rating={review.rating}
                                    color="text-[#EAB308]"
                                  />
                                </div>
                              </div>

                              {/* time */}
                              <div className=" text-gray-400 text-sm ">
                                <AccessTimeIcon fontSize="inherit" />
                                <span className=" ml-2">
                                  {format(review?.createdAt)}
                                </span>
                              </div>
                            </div>
                            {/* comment */}
                            <p className=" mt-4 text-xs sm:text-sm">
                              {review.comment}.
                            </p>

                            {/* reply review button & view replies to review button */}
                            <div className=" flex items-center">
                              {user?.role === "user" && (
                                <p className=" text-gray-500 text-[20px] mr-4">
                                  <LockIcon
                                    color="inherit"
                                    fontSize="inherit"
                                  />
                                </p>
                              )}

                              {/* only admins can reply a review */}
                              {user?.role === "admin" && (
                                <p
                                  onClick={() => toggleReplyReview(review._id)}
                                  className=" text-xs sm:text-sm  cursor-pointer mt-2 mr-4"
                                >
                                  {!visibleReplyReview[review._id] ? (
                                    <span className=" text-primary">
                                      <ReplyIcon fontSize="inherit" /> Reply
                                    </span>
                                  ) : (
                                    <span className=" text-warning">
                                      <NotInterestedIcon fontSize="inherit" />{" "}
                                      Not Interested
                                    </span>
                                  )}
                                </p>
                              )}

                              <p className="text-xs sm:text-sm cursor-pointer mt-2 text-gray-500 ">
                                {review?.commentReplies?.length === 0 && (
                                  <span>No reply yet</span>
                                )}

                                {/* show replies */}
                                {review?.commentReplies?.length >= 1 &&
                                  !visibleReplyReview[review._id] && (
                                    <span
                                      onClick={() =>
                                        toggleReplyReview(review._id)
                                      }
                                    >{`View Replies (${review?.commentReplies?.length})`}</span>
                                  )}

                                {/* hide replies */}
                                {review?.commentReplies?.length >= 1 &&
                                  visibleReplyReview[review._id] && (
                                    <span
                                      onClick={() =>
                                        toggleReplyReview(review._id)
                                      }
                                    >{`Hide Replies (${review?.commentReplies?.length})`}</span>
                                  )}
                              </p>
                            </div>

                            {/* show reply review text box */}
                            {user?.role === "admin" &&
                              visibleReplyReview[review._id] && (
                                <div className="  my-4 w-full flex sm:flex-row flex-col sm:gap-4 items-end">
                                  <textarea
                                    id="reply-review"
                                    name="reply-review"
                                    cols={40}
                                    rows={2}
                                    placeholder="Enter Reply..."
                                    value={
                                      replyReviewForm.reviewId === review._id
                                        ? replyReviewForm.reply
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleReplyReviewChange(e, review)
                                    }
                                    className={`${styles.inputStyle} w-full`}
                                  ></textarea>
                                  {submitReviewReplyPending ? (
                                    <SimpleLoader isAdmin />
                                  ) : (
                                    <button
                                      onClick={handleSubmitReviewReply}
                                      className=" mt-4 bg-primary text-white px-6 py-1.5 rounded-full text-sm"
                                    >
                                      Submit
                                    </button>
                                  )}
                                </div>
                              )}
                            <br />

                            {/* show all replies to reviews */}
                            {visibleReplyReview[review._id] && (
                              <div className=" w-full  rounded-lg ">
                                {review?.commentReplies.map(
                                  (reply: any, replyIndex: number) => (
                                    <div
                                      key={replyIndex}
                                      className=" flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg w-full mt-4"
                                    >
                                      {/* image profile */}
                                      <div className=" w-[1.6rem] h-[1.6rem] rounded-full border-2 border-success overflow-hidden">
                                        <Image
                                          src={
                                            fetchUserLatestData(
                                              reply?.user?._id
                                            )?.avatar.url || avatarFallback
                                          }
                                          width={100}
                                          height={100}
                                          alt="admin_image"
                                          className=" w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className=" ml-2">
                                        <h5 className="text-xs sm:text-sm font-semibold flex gap-2 items-center">
                                          <span>
                                            {
                                              fetchUserLatestData(
                                                reply?.user?._id
                                              )?.name
                                            }{" "}
                                          </span>
                                          {fetchUserLatestData(reply?.user?._id)
                                            ?.role === "admin" && (
                                            <span className=" text-[14px] text-primary">
                                              <VerifiedIcon fontSize="inherit" />
                                            </span>
                                          )}
                                        </h5>
                                        <p className=" text-[10px] sm:text-[12px]">
                                          {reply?.reply}
                                        </p>
                                      </div>
                                      {/* time */}
                                      <p className="text-[10px] sm:text-[12px] ml-8 text-gray-500">
                                        {format(reply.createdAt)}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}

                  {/* SHOW MORE / SHOW LESS REVIEWS*/}
                  {course?.reviews[0] && course?.reviews.length > 5 && (
                    <>
                      {!showMoreReview ? (
                        <button
                          onClick={() => setShowMoreReview((prev) => !prev)}
                          className=" text-primary underline font-medium text-sm sm:text-base transition duration-300 hover:dark:text-white hover:text-black mt-4"
                        >
                          Show more
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowMoreReview((prev) => !prev)}
                          className=" text-primary underline font-medium text-sm sm:text-base transition duration-300 hover:dark:text-white hover:text-black mt-4"
                        >
                          Show Less
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* COMPLETED MODAL */}
          {/* if user has finish course */}
          {showCompletedModal && (
            <div className="  fixed left-0 top-0 w-screen h-screen bg-transparent z-[99] flex justify-center items-center">
              <div
                onClick={() => setShowCompletedModal(false)}
                className="fixed bg-opacity-30 dark:bg-opacity-60 bg-black w-screen h-screen left-0 top-0"
              />
              <div className=" w-full sm:w-[80%] mx-auto  sm:h-[70%] lg:h-screen dark:bg-white bg-dimDark dark:text-black text-white flex flex-col justify-center items-center p-6 z-[100]">
                <Image
                  src={congratulationsGif}
                  alt="completed"
                  width={100}
                  height={100}
                  className=" lg:w-[50%]"
                />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mt-6">
                  Congratulations! You have come to the end of this course
                </h2>
                <p className="text-center text-lg sm:text-xl mt-4 font-medium.">
                  You can check our other{" "}
                  <span
                    onClick={() => router.push("/courses")}
                    className=" text-lightGreen cursor-pointer font-semibold"
                  >
                    courses.
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CourseClassContent;
