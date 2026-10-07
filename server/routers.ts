import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getDashboardData } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  dashboard: router({
    overview: publicProcedure.query(({ ctx }) => {
      // MVP tenant resolution: use the authenticated user id as the demo tenant key.
      // Production replaces this with active membership resolution and server-side policy checks.
      const tenantId = ctx.user?.id ?? 1;
      return getDashboardData(tenantId);
    }),
  }),
});

export type AppRouter = typeof appRouter;
