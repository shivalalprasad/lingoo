import { courses } from '@/db/schema';
import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs";
import { UserProgress } from "./schema";
import { eq } from "drizzle-orm";

export const getUserProgress= cache(async()=>{
  const {userId} =await auth();
  if(!userId){
    return null;
  }

  const data = await db.query.UserProgress.findFirst({
    where: eq(UserProgress.userId,userId),
    with:{
      activeCourse:true,
    },
  });
  return data;
})

export const getCourses = cache(async ()=>{
  const data = await db.query.courses.findMany();

  return data;
});



export const getCourseById = cache(async(courseId:number)=>{
  const data = await db.query.courses.findFirst({
    where: eq(courses.id,courseId),

  })

  return data;
})
