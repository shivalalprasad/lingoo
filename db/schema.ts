import { relations } from "drizzle-orm";
import { integer, pgTable, text,serial } from "drizzle-orm/pg-core";



export const courses = pgTable("courses",{
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  ImageSrc: text("Image_src").notNull()
})

export const courcesRelations = relations(courses,({many})=>({
  UserProgress:many(UserProgress)
}))


export const UserProgress = pgTable("user_progress",{
  userId: text("user_id").primaryKey(),
  userName : text("user_name").notNull().default("User"),
  userIamgeSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId:integer("active_course_id").references(()=>courses.id,{onDelete:"cascade"}),
  hearts:integer("hearts").notNull().default(5),
  points:integer("points").notNull().default(2),
})

export const UserProgressRelations = relations(UserProgress,({one})=>({
  activeCourse : one(courses,{
    fields:[UserProgress.activeCourseId],
    references:[courses.id],
  }),
}));
