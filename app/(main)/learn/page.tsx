import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { Header } from "./Header";
import { UserProgress } from "@/components/UserProgress";
import { redirect } from "next/navigation";
import Unit from "./Unit";

export default async function LearnPage() {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPersentageData = getLessonPercentage();
  const unitsData = getUnits();

  const [userProgress, units, courseProgress, lessonPersentage] =
    await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPersentageData,
    ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Spanish", imageSrc: "/es.svg" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Spanish" />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            {/* {JSON.stringify(unit)} */}
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPersentage={lessonPersentage}
            />
          </div>
        ))}
        {/* <div className="space-y-4">
          <div />
        </div> */}
      </FeedWrapper>
    </div>
  );
}
