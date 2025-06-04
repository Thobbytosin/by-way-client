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
} from "../../../icons/icons";
import { styles } from "../../../styles/style";
import CoursePlayer from "../../../utils/CoursePlayer";
import { useLoadUserQuery } from "../../../redux/api/apiSlice";
import {
  useAddQuestionMutation,
  useAddReplyToQuestionMutation,
  useAddReplyToReviewMutation,
  useAddReviewMutation,
  useGetCourseContentDataQuery,
  useGetCourseDetailsQuery,
} from "../../../redux/course/courseApi";
import {
  useGetUserLatestQuery,
  useUpdateUserVideosViewedMutation,
} from "../../../redux/user/userApi";
import React, { useEffect, FC, useState } from "react";
import toast from "react-hot-toast";
import SimpleLoader from "../../SimpleLoader/SimpleLoader";
import { format } from "timeago.js";
import Ratings from "../../../utils/Ratings";
import Image from "next/image";
import congratulationsGif from "../../../../public/assets/congratulations.gif";
import { useRouter } from "next/navigation";

import socketID from "socket.io-client";
import CourseClassContentList from "./CourseClassContentList";
import { useSocketNotification } from "@/hooks/useSocketNotification";

const subTags = ["Details", "Qs & As", "Reviews"];

type Props = {
  data: any;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  setVisibleSection: (visibleSection: any) => void;
  visibleSection: any;
  setProgressCounter: (progress: number) => void;
  progressCounter: number;
  user: any;
  courseId: string;
  activeTag: number;
  setActiveTag: (tag: number) => void;
  admin: any;
};

const CourseClassContent: FC<Props> = ({
  data,
  activeVideo,
  setActiveVideo,
  setVisibleSection,
  setProgressCounter,
  progressCounter,
  user,
  courseId,
  activeTag,
  setActiveTag,
  admin,
  visibleSection,
}) => {
  // to set the active video in the array
  // let [active, setActive] = useState<any>({});
  const { emitNotification } = useSocketNotification();
  const [showCompletedModal, setShowCompletedModal] = useState(true);
  const router = useRouter();
  const [rating, setRating] = useState(1);
  const active = data[activeVideo];
  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [updateUserVideosViewed, { data: videoViewedData, error }] =
    useUpdateUserVideosViewedMutation();
  const { refetch, data: userData } = useLoadUserQuery({});
  const initialValues = {
    question: "",
    contentId: active._id,
    courseId: courseId,
  };
  const initialReplyValues = {
    answer: "",
    questionId: questionId,
    contentId: active._id,
    courseId: courseId,
  };
  const initialReviewValues = {
    courseId: courseId,
    rating: rating,
    review: "",
  };
  const initialReplyReviewValues = {
    courseId: courseId,
    reply: "",
    reviewId: reviewId,
  };

  const [form, setForm] = useState(initialValues);
  const [replyForm, setReplyForm] = useState(initialReplyValues);
  const [reviewForm, setReviewForm] = useState(initialReviewValues);
  const [replyReviewForm, setReplyReviewForm] = useState(
    initialReplyReviewValues
  );
  const [addQuestion, { isSuccess, error: questionError, isLoading }] =
    useAddQuestionMutation();
  const { refetch: courseContentRefetch } = useGetCourseContentDataQuery(
    courseId,
    {}
  );
  const [
    addReplyToQuestion,
    {
      isSuccess: addReplySuccess,
      error: addReplyError,
      isLoading: addReplyLoading,
    },
  ] = useAddReplyToQuestionMutation();
  const [showMore, setShowMore] = useState(false);
  const { data: usersLatestData, refetch: refetchusersLatestData } =
    useGetUserLatestQuery({});
  const [
    addReview,
    {
      isSuccess: addReviewSuccess,
      error: addReviewError,
      isLoading: addReviewLoading,
    },
  ] = useAddReviewMutation();
  const [
    addReplyToReview,
    {
      isSuccess: addReplyReviewSuccess,
      error: addReplyReviewError,
      isLoading: addReplyReviewLoading,
    },
  ] = useAddReplyToReviewMutation();
  const { data: courseData, refetch: courseRefetch } =
    useGetCourseDetailsQuery(courseId);
  const [showMoreReview, setShowMoreReview] = useState(false);
  // fetch user latest role
  const fetchUserLatestData = (userId: string) => {
    const updatedUser = usersLatestData?.users?.filter(
      (user: any) => user._id === userId
    );

    return {
      role: updatedUser[0].role,
      name: updatedUser[0].name,
      avatar: updatedUser[0].avatar,
    };
  };

  // refetch the user latest data when page loads
  useEffect(() => {
    refetchusersLatestData();
  }, [data]);

  // to update form contentId
  useEffect(() => {
    setForm({ ...form, contentId: active._id });
    setReplyForm({ ...replyForm, contentId: active._id });
    setReviewForm({ ...reviewForm, rating: rating });
  }, [active, rating]);

  // for view videos
  useEffect(() => {
    if (videoViewedData) {
      refetch(); // refetch user info anytime the user view a video
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [videoViewedData, error]);

  // update questions in the course
  useEffect(() => {
    if (isSuccess) {
      courseContentRefetch();
      toast.success("Question Submitted");
      emitNotification({
        title: "New Question Received",
        message: `You have a new question in ${active.title} course.`,
        userId: user?._id,
      });
    }

    if (questionError) {
      if ("data" in questionError) {
        const errorData = questionError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, questionError]);

  // update replies to questions
  useEffect(() => {
    if (addReplySuccess) {
      courseContentRefetch();
      toast.success("Answer Submitted");
      // if the answer is not from an admin, send notification again
      if (user?.role !== "admin") {
        emitNotification({
          title: "New Reply to Question Received",
          message: `You have a new reply to a question in ${active.title} course.`,
          userId: user?._id,
        });
      }
    }

    if (addReplyError) {
      if ("data" in addReplyError) {
        const errorData = addReplyError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [addReplySuccess, addReplyError]);

  // add review to course
  useEffect(() => {
    if (addReviewSuccess) {
      refetch(); // user info refresh
      courseRefetch(); // refetch course
      toast.success("Thanks for your feedback");
      emitNotification({
        title: "New Review Received",
        message: `You have a new review in ${active.title} course.`,
        userId: user?._id,
      });
    }

    if (addReviewError) {
      if ("data" in addReviewError) {
        const errorData = addReviewError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [addReviewSuccess, addReviewError]);

  // update replies to reviews
  useEffect(() => {
    if (addReplyReviewSuccess) {
      courseRefetch();
      toast.success("Reply Submitted");
    }

    if (addReplyReviewError) {
      if ("data" in addReplyReviewError) {
        const errorData = addReplyReviewError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [addReplyReviewSuccess, addReplyReviewError]);

  // go back to prev section
  const prevSection = (section: string) => {
    setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1);

    {
      section === active.videoSection &&
        setVisibleSection((prevVisibleSections: any) => ({
          ...prevVisibleSections,
          [active.videoSection]: true,
        }));
    }
  };

  // go to next section

  const nextSection = async (section: string) => {
    // update active video
    setActiveVideo(
      activeVideo === data.length - 1 ? activeVideo : activeVideo + 1
    );

    // update active section
    {
      section === active.videoSection &&
        setVisibleSection((prevVisibleSections: any) => ({
          ...prevVisibleSections,
          [active.videoSection]: true,
        }));
    }

    // update progress counter
    const correspondVideo = user?.courses?.filter(
      (c: any) => c?.courseId === courseId
    );
    const filterVideo = correspondVideo[0]?.progress?.find(
      (item: any) => item?.videoId === data[activeVideo]?._id
    );

    if (filterVideo) {
      if (filterVideo?.viewed) {
        return null;
      } else {
        await updateUserVideosViewed({
          courseId,
          videoId: filterVideo?.videoId,
        });
      }
    }
  };

  // finish course btn
  const handleFinishCourse = async () => {
    // update progress counter
    const correspondVideo = user?.courses?.filter(
      (c: any) => c?.courseId === courseId
    );
    const filterVideo = correspondVideo[0]?.progress?.find(
      (item: any) => item?.videoId === data[activeVideo]?._id
    );

    if (filterVideo) {
      if (filterVideo?.viewed) {
        return null;
      } else {
        await updateUserVideosViewed({
          courseId,
          videoId: filterVideo?.videoId,
        });
      }
    }
  };

  const activeCourseFromUsersCourses = userData?.user?.courses?.find(
    (c: any) => c.courseId === courseId
  );

  const viewedVideo = activeCourseFromUsersCourses?.progress?.filter(
    (v: any) => v.viewed === true
  );

  setProgressCounter(viewedVideo?.length);

  // submit questions
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.question.length === 0) {
      toast.error("Question cannot be empty");
    } else {
      await addQuestion(form);

      setForm({ ...form, question: "" });
    }
  };

  // submit review form
  const handleSubmitReview = async (e: any) => {
    e.preventDefault();

    if (reviewForm.review.length === 0) {
      toast.error("Review cannot be empty");
    } else {
      await addReview(reviewForm);

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
      await addReplyToQuestion(replyForm);

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
      await addReplyToReview(replyReviewForm);

      setReplyReviewForm({ ...replyReviewForm, reply: "" });
    }
  };

  // check if user has reviewed course
  const checkIfUserHasReviewCourse = () => {
    const course = user?.courses?.find((c: any) => c.courseId === courseId);

    return course.reviewed;
  };

  return (
    <>
      {active && (
        <div
          className={`${styles.paddingLeft} ${styles.paddingY} w-full h-full  lg:col-span-7 col-span-10 `}
        >
          {/* video title */}
          <h2 className=" font-semibold text-[1rem] sm:text-[1.4rem] mb-6">
            Lesson {activeVideo + 1}. {active.title}
          </h2>

          {/* video player */}

          <CoursePlayer key={active?._id} link={active?.videoUrl} isClass />

          {/* buttons */}
          <div className=" w-full mt-5 flex justify-between items-center">
            {/* prev button */}
            <button
              disabled={activeVideo === 0}
              onClick={() => prevSection(active.videoSection)}
              className={`${
                activeVideo === 0 && "cursor-no-drop opacity-40"
              } text-xs sm:text-sm font-medium min-w-[8rem] px-4 text-center py-2 rounded-full bg-warning text-white`}
            >
              Previous Class
            </button>

            {/* finish course / next course btn */}
            {activeVideo === data.length - 1 ? (
              <button
                onClick={handleFinishCourse}
                className={`text-xs sm:text-sm font-medium min-w-[8rem] text-center py-2 px-4 rounded-full bg-success text-white`}
              >
                Finish Course
              </button>
            ) : (
              <button
                onClick={() => nextSection(active.videoSection)}
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
                      <img
                        src={admin?.avatar?.url}
                        alt="admin_image"
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

              <CourseClassContentList
                data={data}
                courseId={courseId}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                visibleSection={visibleSection}
                setVisibleSection={setVisibleSection}
                progressCounter={progressCounter}
                // hideForLargeTrue
              />
            </div>
          )}

          {/* details */}
          {activeTag === 0 && (
            <div className=" w-full border-t border-gray-300 dark:border-gray-800 mt-8 py-8">
              <h2 className={styles.detailsSubTagHeading}>Overview</h2>
              <p className={styles.detailsDescription}>
                {active.videoDescription}
              </p>

              <br />

              {active.objectives[0] && (
                <h2 className={styles.detailsSubTagHeading}>
                  Learning Objectives
                </h2>
              )}

              {active.objectives[0] &&
                active.objectives.map((objective: any, index: number) => (
                  <p key={index} className=" mt-4 flex gap-2 items-center">
                    <span className=" w-2 h-2 rounded-full bg-slate-900 dark:bg-slate-200" />
                    <span className={styles.detailsDescription}>
                      {objective.title}
                    </span>
                  </p>
                ))}

              <br />

              <h2 className={styles.detailsSubTagHeading}>Resources</h2>
              {active.links.map((link: any, index: number) => (
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
                  <img
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
                    <button className=" mt-4 bg-primary text-white px-8 py-3 rounded-full text-xs font-medium sm:text-sm">
                      Post Question
                    </button>
                  )}
                </form>
              </div>

              <br />

              {/* DISCUSSIONS */}
              {active?.questions[0] ? (
                <div className="w-full border-t border-gray-300 dark:border-gray-800 mt-8 py-8">
                  <h3 className={styles.detailsSubTagHeading}>
                    Join the discussion
                  </h3>
                  {active.questions
                    ?.slice(0, showMore ? active.questions.length : 6)
                    ?.map((question: any, i: number) => (
                      // each question content
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
                        <div className=" w-[2.6rem] h-[2.3rem] rounded-full border-2 border-primary overflow-hidden">
                          <img
                            src={
                              fetchUserLatestData(question?.user?._id).avatar
                                .url
                            }
                            alt="admin_image"
                            className=" w-full h-full object-cover"
                          />
                        </div>

                        {/* content */}
                        <div className=" w-full">
                          <h4 className=" font-semibold flex items-center gap-2 text-sm">
                            <span>
                              {fetchUserLatestData(question?.user?._id).name}
                            </span>
                            {fetchUserLatestData(question?.user?._id).role ===
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
                                    className=" flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg w-full mt-4"
                                  >
                                    {/* image profile */}
                                    <div className=" w-[1.6rem] h-[1.6rem] rounded-full border-2 border-success overflow-hidden">
                                      <img
                                        src={
                                          fetchUserLatestData(reply?.user?._id)
                                            .avatar.url
                                        }
                                        alt="admin_image"
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
                                            ).name
                                          }
                                        </span>
                                        {fetchUserLatestData(reply?.user?._id)
                                          .role === "admin" && (
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
              {active?.questions[0] && active.questions.length > 3 && (
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
              {!checkIfUserHasReviewCourse() && (
                <h3 className={styles.detailsSubTagHeading}>Post a review</h3>
              )}

              {/* check if user has already reviewed this course */}

              {checkIfUserHasReviewCourse() ? (
                <p className="mb-10 sm:mb-20 text-base lg:text-lg">
                  Thanks for your feedback,{" "}
                  <span className=" text-primary font-medium">
                    {user.name}.
                  </span>
                </p>
              ) : (
                // ratings and image
                <div className=" flex gap-4 items-start mt-6 mb-20">
                  {/* image */}
                  <div className=" w-[2.6rem h-[2.3rem] sm:w-[3.4rem] sm:h-[3rem] rounded-full border-2 border-primary overflow-hidden">
                    <img
                      src={user?.avatar?.url}
                      alt="admin_image"
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
                        placeholder="Post a reiview about this course..."
                        value={reviewForm.review}
                        onChange={(e: any) =>
                          setReviewForm({
                            ...reviewForm,
                            review: e.target.value,
                          })
                        }
                        className={`${styles.inputStyle} mb-4 w-full`}
                      ></textarea>
                      {addReviewLoading ? (
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
                      rating={courseData?.course?.ratings}
                      color="text-[#EAB308]"
                    />
                    <h2>
                      <span className="font-semibold text-2xl sm:text-3xl ml-2">
                        {(courseData?.course?.ratings).toFixed(1)}
                      </span>
                      <span className="ml-3 text-sm sm:text-base font-normal">
                        ({courseData?.course?.reviews?.length}{" "}
                        {courseData?.course?.reviews?.length === 1
                          ? "review"
                          : "reviews"}
                        )
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
                  {!courseData?.course?.reviews[0] && (
                    <h3 className={"font-medium text-xl ml-10 "}>
                      No review yet.
                    </h3>
                  )}

                  {/* when there is a review */}
                  {courseData?.course?.reviews[0] && (
                    <div className="h-fit w-full bg-gray-200 dark:bg-gray-900 rounded-lg">
                      {courseData?.course?.reviews
                        ?.slice(
                          0,
                          showMoreReview
                            ? courseData?.course?.reviews.length
                            : 5
                        )
                        ?.map((review: any, i: number) => (
                          <div
                            key={i}
                            className={`w-full ${
                              i === courseData?.course?.reviews.length - 1
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
                                        .avatar.url
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
                                          .name
                                      }
                                    </span>
                                    {fetchUserLatestData(review?.user?._id)
                                      .role === "admin" && (
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
                                  {addReplyReviewLoading ? (
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
                                        <img
                                          src={
                                            fetchUserLatestData(
                                              reply?.user?._id
                                            ).avatar.url
                                          }
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
                                              ).name
                                            }{" "}
                                          </span>
                                          {fetchUserLatestData(reply?.user?._id)
                                            .role === "admin" && (
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
                  {courseData?.course?.reviews[0] &&
                    courseData?.course?.reviews.length > 5 && (
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
          {showCompletedModal && progressCounter === data?.length && (
            <div className="  fixed left-0 top-0 w-screen h-screen bg-transparent z-[99] flex justify-center items-center">
              <div
                onClick={() => setShowCompletedModal(false)}
                className="fixed bg-opacity-30 dark:bg-opacity-60 bg-black w-screen h-screen left-0 top-0"
              />
              <div className=" w-full sm:w-[80%] mx-auto  sm:h-[70%] lg:h-screen dark:bg-white bg-dimDark dark:text-black text-white flex flex-col justify-center items-center p-6 z-[100]">
                <Image
                  src={congratulationsGif}
                  alt="completed"
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
