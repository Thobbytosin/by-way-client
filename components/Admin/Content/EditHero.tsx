import CameraAlt from "@mui/icons-material/CameraAlt";
import React, { useState, FC, useEffect } from "react";
import SimpleLoader from "../../SimpleLoader/SimpleLoader";
import Image from "next/image";
import {
  useContentMutations,
  useContentQueries,
} from "@/hooks/api/content.api";

type Props = {};

const EditHero: FC<Props> = () => {
  const [showHoverCamera, setShowHoverCamera] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { contentDomainData } = useContentQueries({
    hero: true,
  });
  const { hero } = contentDomainData;

  const { updateHeroDomain } = useContentMutations();
  const { updateHero, updateHeroPending } = updateHeroDomain;

  useEffect(() => {
    if (hero) {
      setTitle(hero.title);
      setSubTitle(hero.subTitle);
      setImage(hero.image?.url);
    }
  }, [hero]);

  // change banner image
  const handleBannerChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // check if image is changed
  const isBannerImageChanged = (
    oldImage: string | undefined,
    newImage: string
  ) => {
    if (!oldImage) return null;
    return JSON.stringify(oldImage) === JSON.stringify(newImage);
  };

  // submit changes
  const handleSubmitChanges = () => {
    updateHero({ type: "Banner", image, title, subTitle });
  };

  return (
    <>
      <div className=" w-full min-h-[90vh] flex items-center justify-center mt-10">
        <div className=" relative w-[80%] mx-auto flex items-center justify-center flex-row-reverse gap-10">
          {/* image */}
          <div className=" hero_animation w-full h-full overflow-hidden p-10 rounded-full flex justify-center items-center">
            <Image
              src={image}
              alt="banner_image"
              // layout="fill"
              // objectFit="cover"
              width={200}
              height={200}
              className=" w-full"
            />

            <input
              type="file"
              accept="image/*"
              id="banner"
              name="banner"
              className=" hidden"
              onChange={handleBannerChange}
            />
          </div>
          {/* CAMERA */}
          <label
            onMouseEnter={() => setShowHoverCamera(true)}
            onMouseLeave={() => setShowHoverCamera(false)}
            aria-disabled={updateHeroPending}
            htmlFor="banner"
            className={`${
              updateHeroPending ? "cursor-not-allowed" : "cursor-pointer"
            } absolute bottom-0 right-10 bg-secondary text-white dark:bg-white dark:text-black p-4 rounded-full shadow-lg shadow-slate-500 dark:shadow-black`}
          >
            <CameraAlt color="inherit" />
          </label>

          {showHoverCamera && (
            <button
              disabled={updateHeroPending}
              className=" z-[99] absolute right-20 bottom-10 dark:bg-white dark:text-secondary bg-secondary text-white p-2 rounded-md "
            >
              Change banner
            </button>
          )}

          {/* content */}
          <div className=" w-full ">
            <textarea
              className=" w-full text-3xl font-semibold outline-none bg-gray-200 dark:bg-dimDark p-4"
              placeholder="Write hero title here"
              disabled={updateHeroPending}
              rows={6}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className=" text-md w-full outline-none bg-gray-200 dark:bg-slate-900 mt-2 p-4"
              placeholder="Write hero subtitle here"
              disabled={updateHeroPending}
              rows={6}
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* button */}
      <div className=" w-[80%] flex justify-start ml-[10rem] mt-4 mb-8">
        {updateHeroPending ? (
          <SimpleLoader isAdmin />
        ) : (
          <button
            onClick={
              isBannerImageChanged(hero?.image.url, image)
                ? () => null
                : handleSubmitChanges
            }
            disabled={updateHeroPending}
            className={`text-lg px-6 py-2 ${
              isBannerImageChanged(hero?.image.url, image)
                ? "bg-secondary dark:bg-white dark:text-secondary text-white opacity-70 cursor-not-allowed "
                : "cursor-pointer bg-primary text-white"
            } rounded-md text-center`}
          >
            Save
          </button>
        )}
      </div>
    </>
  );
};

export default EditHero;
