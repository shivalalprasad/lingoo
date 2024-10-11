"use client";

import { courses, UserProgress } from "@/db/schema";
import { Card } from "./Card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof UserProgress.$inferSelect.activeCourseId;
};

export function List({ courses, activeCourseId }: Props) {
  const router = useRouter();

  const [penning, startTransition] = useTransition();

  const OnClick = (id: number) => {
    if (penning) return;

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      console.log("triggered");
      upsertUserProgress(id)
        // .catch(() => toast.error("something went wrong"))
        .then(() => {
          toast.info("sucsessful");
        });
      // console.log("after triggered");
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repear(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.ImageSrc}
          onClick={OnClick}
          disabled={false}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
}
