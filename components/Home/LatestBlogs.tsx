import { styles } from "../../styles/style";
import React from "react";

type Props = {};

const LatestBlogs = (props: Props) => {
  return (
    <div className={`${styles.paddingX} ${styles.paddingY}`}>
      <h2 className={`font-semibold sm:text-3xl text-2xl text-center `}>
        Latest <span className=" text-lightGreen">News</span> and{" "}
        <span className=" text-lightGreen">Resources</span>
      </h2>
      <p className=" text-center mt-2">
        See the developments that have occurred to ByWay in the modern day world
      </p>

      <br />

      <div className=" mt-10 flex lg:flex-row flex-col gap-12">
        <div className=" w-full">
          {/* blog banner */}
          <div
            className=" w-full sm:h-[300px] h-[200px] rounded-xl"
            style={{
              backgroundImage: `url(/assets/blog1.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* category tag */}
          <div className=" inline-block rounded-full my-4 px-6 py-1 sm:py-2 bg-lightGreen text-white font-medium uppercase">
            News
          </div>

          {/* title */}
          <h2 className=" font-medium text-lg sm:text-xl my-3 sm:my-4 lg:max-w-[35rem] sm:leading-9 leading-7">
            Class adds $30 million to its balance sheet for a Zoom-friendly
            edtech solution
          </h2>

          {/* description */}
          <p className="lg:mt-6 mt-4 leading-[1.6rem] sm:leading-[1.9rem] text-gray-400 sm:text-base text-sm">
            Class, launched less than a year ago by Blackboard co-founder
            Michael Chasen, integrates exclusively...
          </p>

          <p className=" underline text-sm mt-6 cursor-pointer transition duration-300 hover:text-primary">
            Read more
          </p>
        </div>

        <div className=" w-full">
          {/* blog2 */}
          <div className=" flex sm:flex-row flex-col sm:items-start gap-6">
            <div
              className="sm:w-[400px] lg:w-[300px] w-full h-[200px] rounded-xl relative"
              style={{
                backgroundImage: `url(/assets/blog2.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* category tag */}
              <div className="absolute right-6 bottom-6 inline-block rounded-full  px-4 py-1 bg-lightGreen text-white font-medium uppercase text-sm">
                News
              </div>
            </div>

            <div className="w-full sm:w-[50%]">
              {/* title */}
              <h2 className=" font-medium text-lg sm:text-xl lg:text-lg my-3 sm:my-4 lg:max-w-[35rem] sm:leading-9 leading-">
                Class adds $30 million to its balance sheet for a Zoom-friendly
                edtech solution
              </h2>

              {/* description */}
              <p className="mt-3 text-sm leading-[1.9rem] text-gray-400">
                Class, launched less than a year ago by Blackboard co-founder
                Michael Chasen, integrates exclusively...
              </p>
            </div>
          </div>

          {/* blog3 */}
          <div className=" flex sm:flex-row flex-col sm:items-start gap-6 my-8">
            <div
              className="sm:w-[400px] lg:w-[300px] w-full h-[200px] rounded-xl relative"
              style={{
                backgroundImage: `url(/assets/blog3.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* category tag */}
              <div className="absolute right-6 bottom-6 inline-block rounded-full  px-4 py-1 bg-lightGreen text-white font-medium uppercase text-sm">
                News
              </div>
            </div>

            <div className="w-full sm:w-[50%]">
              {/* title */}
              <h2 className=" font-medium text-lg sm:text-xl lg:text-lg my-3 sm:my-4 lg:max-w-[35rem] sm:leading-9 leading-">
                Class adds $30 million to its balance sheet for a Zoom-friendly
                edtech solution
              </h2>

              {/* description */}
              <p className="mt-3 text-sm leading-[1.9rem] text-gray-400">
                Class, launched less than a year ago by Blackboard co-founder
                Michael Chasen, integrates exclusively...
              </p>
            </div>
          </div>

          {/* blog4 */}
          <div className=" flex sm:flex-row flex-col sm:items-start gap-6 ">
            <div
              className="sm:w-[400px] lg:w-[300px] w-full h-[200px] rounded-xl relative"
              style={{
                backgroundImage: `url(/assets/blog4.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* category tag */}
              <div className="absolute right-6 bottom-6 inline-block rounded-full  px-4 py-1 bg-lightGreen text-white font-medium uppercase text-sm">
                News
              </div>
            </div>

            <div className="w-full sm:w-[50%]">
              {/* title */}
              <h2 className=" font-medium text-lg sm:text-xl lg:text-lg my-3 sm:my-4 lg:max-w-[35rem] sm:leading-9 leading-">
                Class adds $30 million to its balance sheet for a Zoom-friendly
                edtech solution
              </h2>

              {/* description */}
              <p className="mt-3 text-sm leading-[1.9rem] text-gray-400">
                Class, launched less than a year ago by Blackboard co-founder
                Michael Chasen, integrates exclusively...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlogs;
