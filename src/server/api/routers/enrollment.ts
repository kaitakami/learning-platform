import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const enrollmentRouter = createTRPCRouter({
  enrollments: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      return await ctx.prisma.enrollment.findMany({
        where: {
          userId: id,
        },
        include: {
          completedLessons: true,
          course: {
            select: {
              _count: {
                select: {
                  lessons: true,
                },
              },
            },
          },
        },
      });
    }),
});
