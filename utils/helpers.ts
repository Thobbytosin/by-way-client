import { CourseData } from "@/types/course.types";

export function getLastViewedProgress(
  progress: { videoId: string; viewed: boolean }[],
  courseData: CourseData[]
): { activeIndex: number; completedIndexes: number[] } {
  const sortedProgress = [...progress].sort(
    (a, b) => Number(b.viewed) - Number(a.viewed)
  );

  const completedIndexes: number[] = [];

  sortedProgress.forEach((entry) => {
    if (!entry.viewed) return;

    const courseIndex = courseData.findIndex(
      (video) => video._id === entry.videoId
    );

    if (courseIndex !== -1 && !completedIndexes.includes(courseIndex)) {
      completedIndexes.push(courseIndex);
    }
  });

  const activeIndex =
    completedIndexes.length > 0
      ? completedIndexes[completedIndexes.length - 1]
      : 0;

  return { activeIndex, completedIndexes };
}

export function contentTotalDuration(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.ceil((duration % 3600) / 60);

  // Return formatted time
  return `${
    hours >= 1
      ? `${hours === 1 ? `${hours} hr.` : `${hours} hr.`} ${
          minutes < 1
            ? ""
            : `${minutes === 1 ? `${minutes} min.` : `${minutes} min.`}`
        } `
      : duration < 60
      ? `${duration} sec.`
      : `${minutes} min.`
    // : `${minutes} min.`
  }`;
}
