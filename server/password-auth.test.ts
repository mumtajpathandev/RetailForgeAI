import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { getDemoUser } from "./passwordAuth";
import type { TrpcContext } from "./_core/context";

describe("demo password authentication", () => {
  it("verifies a seeded demo role without storing plaintext", () => {
    const user = getDemoUser("owner@demo.retailforge.local", "RF-Demo-Owner-2026!");
    expect(user?.email).toBe("owner@demo.retailforge.local");
    expect(user?.loginMethod).toBe("password-demo");
    expect(user?.passwordHash).toBeTruthy();
    expect(user?.passwordHash).not.toContain("RF-Demo-Owner");
  });

  it("rejects an incorrect password", () => {
    expect(getDemoUser("owner@demo.retailforge.local", "wrong-password")).toBeNull();
  });

  it("issues the shared secure session cookie", async () => {
    const cookies: Array<{ name: string; value: string }> = [];
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { cookie: (name: string, value: string) => cookies.push({ name, value }) } as TrpcContext["res"],
    };
    const result = await appRouter.createCaller(ctx).auth.passwordLogin({ email: "owner@demo.retailforge.local", password: "RF-Demo-Owner-2026!" });
    expect(result.success).toBe(true);
    expect(cookies).toHaveLength(1);
    expect(cookies[0]?.value.split(".")).toHaveLength(3);
  });
});
