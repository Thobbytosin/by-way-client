import { styles } from "../../styles/style";
import React from "react";
import features from "@/public/assets/features.png";
import gridsIcon from "@/public/assets/grids.png";
import windowsIcon from "@/public/assets/windows.png";
import usersIcon from "@/public/assets/users.png";
import waveIcon from "@/public/assets/wave.png";
import featuresIcon2 from "@/public/assets/features2.png";
import featuresIcon3 from "@/public/assets/features3.png";
import featuresIcon4 from "@/public/assets/features4.png";
import featuresIcon5 from "@/public/assets/features5.png";

import Image from "next/image";

const data = [
  {
    icon: gridsIcon,
    title:
      "Teachers don’t get lost in the grid view and have a dedicated Podium space.",
  },
  {
    icon: windowsIcon,
    title: "Teachers and presenters can be moved to the front of the class.",
  },
  {
    icon: usersIcon,
    title: "Teachers can easily see all students and class data at one time.",
  },
];
type Props = {};

const Features = (props: Props) => {
  return (
    <div className={`${styles.paddingX} ${styles.paddingY} `}>
      <h2 className={`font-semibold sm:text-3xl text-2xl text-center `}>
        Our <span className=" text-lightGreen">Features</span>
      </h2>
      <p className=" text-center mt-2 ">
        This very extraordinary feature, can make learning activities more
        efficient
      </p>

      {/* first feature */}
      <div className="w-full flex xl:flex-row flex-col items-center justify-between gap-10 mt-20">
        <div className="w-full flex justify-center items-center ">
          <Image
            src={features}
            alt="feature_image"
            className=" lg:w-full sm:w-[80%]"
          />
        </div>

        <div className=" w-full lg:mt-0 mt-8">
          <h2 className={styles.featuresHeading}>
            A <span className=" text-lightGreen">user interface</span> designed
            for the classroom.
          </h2>
          <div className=" w-full mt-10">
            {data?.map((item: any, index: number) => (
              <div
                key={index}
                className=" w-full flex gap-5 sm:gap-10 items-center mb-6"
              >
                <div className=" bg-white rounded-full flex justify-center items-center w-8 h-8 shadow-sm">
                  <Image src={item.icon} alt="icon" className=" w-full" />
                </div>

                <p className=" text-sm sm:text-lg">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools for teachers */}
      <div className=" w-full flex sm:flex-row flex-col-reverse justify-center gap-10 items-center mt-20">
        <div className=" relative">
          <h2 className={styles.featuresHeadingLeft}>
            <span className=" text-lightGreen">Tools</span> for Instructors and
            Learners
          </h2>
          <p className={styles.featuresDescription}>
            Class has a dynamic set of teaching tools built to be deployed and
            used during class. Teachers can handout assignments in real-time for
            students to complete and submit.
          </p>
          <div className=" absolute bottom-0 right-[14rem]">
            <Image src={waveIcon} alt="wave_icon" />
          </div>
        </div>
        <div>
          <Image src={featuresIcon2} alt="feature_icon" />
        </div>
      </div>

      {/* assignments, quizzes*/}
      <div className=" w-full flex flex-col-reverse sm:flex-row-reverse justify-center  items-center mt-20">
        <div>
          <h2 className={styles.featuresHeadingLeft}>
            Assessments,
            <span className=" text-lightGreen"> Quizzes</span>, Tests
          </h2>
          <p className={styles.featuresDescription}>
            Easily launch live assignments, quizzes, and tests. Student results
            are automatically entered in the online gradebook.
          </p>
        </div>
        <div>
          <Image src={featuresIcon3} alt="feature_icon" />
        </div>
      </div>

      {/* class managements*/}
      <div className=" w-full flex sm:flex-row flex-col-reverse  justify-center  items-center mt-20">
        <div>
          <h2 className={styles.featuresHeadingLeft}>
            <span className=" text-lightGreen">Class Management</span>
          </h2>
          <h2 className={styles.featuresHeadingLeft}>Tools for Educators</h2>
          <p className={styles.featuresDescription}>
            Class provides tools to help run and manage the class such as Class
            Roster, Attendance, and more. With the Gradebook, teachers can
            review and grade tests and quizzes in real-time.
          </p>
        </div>
        <div>
          <Image src={featuresIcon4} alt="feature_icon" />
        </div>
      </div>

      {/* one-on-one*/}
      <div className=" w-full flex flex-col-reverse sm:flex-row-reverse justify-center  items-center mt-20">
        <div>
          <h2 className={styles.featuresHeadingLeft}>One-on-One</h2>
          <h2 className={styles.featuresHeadingLeft}>
            <span className=" text-lightGreen">Discussions</span>
          </h2>
          <p className={styles.featuresDescription}>
            Teachers and teacher assistants can talk with students privately
            without leaving the Zoom environment.
          </p>
        </div>
        <div>
          <Image src={featuresIcon5} alt="feature_icon" />
        </div>
      </div>
    </div>
  );
};

export default Features;
