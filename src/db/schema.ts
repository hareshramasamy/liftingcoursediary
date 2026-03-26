import { relations } from 'drizzle-orm';
import {
  integer,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// ─── exercises_catalog ───────────────────────────────────────────────────────

export const exercisesCatalog = pgTable('exercises_catalog', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const exercisesCatalogRelations = relations(exercisesCatalog, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

// ─── workouts ────────────────────────────────────────────────────────────────

export const workouts = pgTable('workouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const workoutsRelations = relations(workouts, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

// ─── workout_exercises ───────────────────────────────────────────────────────

export const workoutExercises = pgTable('workout_exercises', {
  id: uuid('id').primaryKey().defaultRandom(),
  workoutId: uuid('workout_id')
    .notNull()
    .references(() => workouts.id, { onDelete: 'cascade' }),
  exerciseId: uuid('exercise_id')
    .notNull()
    .references(() => exercisesCatalog.id, { onDelete: 'restrict' }),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const workoutExercisesRelations = relations(workoutExercises, ({ one, many }) => ({
  workout: one(workouts, {
    fields: [workoutExercises.workoutId],
    references: [workouts.id],
  }),
  exercise: one(exercisesCatalog, {
    fields: [workoutExercises.exerciseId],
    references: [exercisesCatalog.id],
  }),
  sets: many(sets),
}));

// ─── sets ────────────────────────────────────────────────────────────────────

export const sets = pgTable('sets', {
  id: uuid('id').primaryKey().defaultRandom(),
  workoutExerciseId: uuid('workout_exercise_id')
    .notNull()
    .references(() => workoutExercises.id, { onDelete: 'cascade' }),
  setNumber: integer('set_number').notNull(),
  reps: integer('reps'),
  weightKg: numeric('weight_kg', { precision: 6, scale: 2 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const setsRelations = relations(sets, ({ one }) => ({
  workoutExercise: one(workoutExercises, {
    fields: [sets.workoutExerciseId],
    references: [workoutExercises.id],
  }),
}));
