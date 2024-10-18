"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";

type Props = {
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription: any; // TODO: replace with subscription DB type
};

const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscription,
}: Props) => {
  const [hearts, SetHearts] = useState(initialHearts);
  const [percentage, SetPercentage] = useState(initialPercentage);
  return (
    <Header
      hearts={hearts}
      percentage={percentage}
      hasActiveSubscription={!!userSubscription?.isActive}
    />
    // <div>
    //   <p> initialLessonId:{initialLessonId}</p>
    //   {/* <p>{initialLessonChallenges}</p> */}
    //   <p> initialHearts :{initialHearts}</p>
    //   <p> initialPercentage:{initialPercentage}</p>
    //   <p>userSubscription:{userSubscription}</p>
    // </div>
  );
};

export default Quiz;
