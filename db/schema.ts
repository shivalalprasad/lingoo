import { relations } from "drizzle-orm";
import { integer, pgTable, text,serial, pgEnum, boolean } from "drizzle-orm/pg-core";



export const courses = pgTable("courses",{
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  ImageSrc: text("Image_src").notNull()
})

export const courcesRelations = relations(courses,({many})=>({
  UserProgress:many(UserProgress),
  units: many(units),
}))

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  courseId: integer('course_id')
    .references(() => courses.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  order: integer('order').notNull(),
})

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}))


export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  unitId: integer('unit_id')
    .references(() => units.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  order: integer('order').notNull(),
})

export const lessonsRelations = relations(lessons, ({ many, one }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}))

export const challengesEnum = pgEnum('type', ['SELECT', 'ASSIST'])

export const challenges = pgTable('challenges', {
  id: serial('id').primaryKey(),
  lessonId: integer('lesson_id')
    .references(() => lessons.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  type: challengesEnum('type').notNull(),
  question: text('question').notNull(),
  order: integer('order').notNull(),
})

export const challengesRelations = relations(challenges, ({ many, one }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}))

export const challengeOptions = pgTable('challenge_options', {
  id: serial('id').primaryKey(),
  challengeId: integer('challenge_id')
    .references(() => challenges.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  text: text('text').notNull(),
  correct: boolean('correct').notNull(),
  imageSrc: text('image_src'),
  audioSrc: text('audio_src'),
})

export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  }),
)

export const challengeProgress = pgTable('challenge_progress', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  challengeId: integer('challenge_id')
    .references(() => challenges.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  completed: boolean('completed').notNull().default(false),
})

export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  }),
)

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
