import { styles } from "@/styles/style";
import React, { FC } from "react";
import Loader from "../Loader/Loader";
import CategoriesCard from "../Categories/CategoriesCard";

type Props = {
  isLoading: boolean | undefined;
  data: { title: string; _id: string }[] | undefined;
  coursesData: any[];
};

const Categories: FC<Props> = ({ isLoading, data, coursesData }) => {
  return (
    <div className={`${styles.paddingX} ${styles.paddingY}`}>
      <div className=" w-full flex items-center xl:justify-between justify-center">
        <h2 className={styles.sectionTitle}>Top Categories</h2>
        <p className="xl:inline-block hidden text-warning  cursor-pointer transition duration-300 hover:text-black hover:dark:text-white font-medium">
          See All
        </p>
      </div>

      {/* categories */}
      <div className=" w-full flex justify-center gap-6 mt-[3rem] flex-wrap ">
        {isLoading ? (
          <Loader />
        ) : (
          data
            ?.slice(0, 4)
            ?.map((category: any, i: number) => (
              <CategoriesCard
                key={i}
                category={category}
                index={i}
                coursesData={coursesData}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Categories;
