"use server";

import db from '@/db/drizzle';
import { getCourseById, getUserProgress } from "@/db/queries";
import { UserProgress } from '@/db/schema';
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const upsertUserProgress = async (courseId:number)=>{
  console.log("upsertUserProgress called")
  const {userId} = auth();
  const user = await currentUser();
  if(!userId || !user){
    throw new Error("Unauthorised")
  }
  // throw new Error("test")
  const course = await getCourseById(courseId);

  if(!course){
    throw new Error("Course not found")
  }


  // if(!course.units.length || !course.units[0].lessons.length){
  //   throw new Error("Course is empty");
  // }

  const existingUserProgress = await getUserProgress();

  if(existingUserProgress){
    await db.update(UserProgress).set({
      activeCourseId: courseId,
      userName:user.firstName || "User",
      userIamgeSrc: user.imageUrl || '/mascot.svg',
    });

    revalidatePath('/courses');
    revalidatePath('/learn');
    redirect('/learn');
    console.log("updated")
  }
  await db.insert(UserProgress).values({
    userId,
    activeCourseId:courseId,
    userName:user.firstName || "User",
    userIamgeSrc: user.imageUrl || '/mascot.svg',
  });

  revalidatePath('/courses');
  revalidatePath('/learn');
  redirect('/learn');
  console.log("inserted")

}