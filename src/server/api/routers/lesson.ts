import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const lessonRouter = createTRPCRouter({
  // Return number of completed lessons
  ["completed-lessons"]: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      return await ctx.prisma.enrollment.findMany({
        where: {
          userId: id,
        },
        select: {
          _count: {
            select: {
              completedLessons: true,
            },
          },
        },
      });
    }),
});
