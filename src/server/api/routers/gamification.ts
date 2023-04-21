import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const gamificationRouter = createTRPCRouter({
  ["get-user-gamification"]: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      return await ctx.prisma.gamification.findUnique({
        where: {
          userId: id,
        },
      });
    }),
});
