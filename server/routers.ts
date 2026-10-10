import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getDashboardData, createImportRun, listImportRuns } from "./db";
import { getDemoUser } from "./passwordAuth";
import { sdk } from "./_core/sdk";
import { ENV } from "./_core/env";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    passwordLogin: publicProcedure.input(z.object({ email: z.string().email(), password: z.string().min(8) })).mutation(async ({ input, ctx }) => {
      const user = getDemoUser(input.email, input.password);
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid demo credentials" });
      const token = await sdk.signSession({ openId: user.openId, appId: ENV.appId, name: user.name ?? user.email ?? "RetailForge user" });
      ctx.res.cookie(COOKIE_NAME, token, { ...getSessionCookieOptions(ctx.req), maxAge: 1000 * 60 * 60 * 24 * 30 });
      return { success: true, user: { name: user.name, email: user.email, role: user.role, mustResetPassword: user.mustResetPassword === 1 } } as const;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  dashboard: router({
    overview: publicProcedure.query(({ ctx }) => getDashboardData(ctx.user?.id ?? 1)),
  }),
  imports: router({
    list: publicProcedure.query(({ ctx }) => listImportRuns(ctx.user?.id ?? 1)),
    create: publicProcedure.input(z.object({ fileName: z.string().min(1).max(255), template: z.string().min(1).max(80), format: z.enum(["csv", "json"]), rowCount: z.number().int().min(0).max(10_000), status: z.enum(["validated", "committed", "failed"]).default("validated") })).mutation(({ input, ctx }) => createImportRun({ ...input, tenantId: ctx.user?.id ?? 1, actorId: ctx.user?.id ?? undefined })),
  }),
  connectors: router({
    health: publicProcedure.query(() => ({ mode: "demo", providers: [{ kind: "commerce", provider: "generic-rest", state: "ready_for_credentials" }, { kind: "returns", provider: "generic-rest", state: "ready_for_credentials" }, { kind: "plm", provider: "generic-rest", state: "ready_for_credentials" }, { kind: "erp", provider: "generic-rest", state: "ready_for_credentials" }] as const })),
    runDemoSync: publicProcedure.input(z.object({ provider: z.string().min(1) })).mutation(({ input }) => ({ success: true, provider: input.provider, mode: "demo", records: 6, status: "validated" as const })),
  }),
});

export type AppRouter = typeof appRouter;
