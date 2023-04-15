import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { enrollmentRouter } from "./routers/enrollment";
import { lessonRouter } from "./routers/lesson";
import { gamificationRouter } from "./routers/gamification";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */

export const appRouter = createTRPCRouter({
  user: userRouter,
  enrollment: enrollmentRouter,
  lesson: lessonRouter,
  gamification: gamificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
