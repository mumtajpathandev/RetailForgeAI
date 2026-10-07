import { describe, expect, it } from "vitest";
import { getDashboardData } from "./db";

describe("dashboard data", () => {
  it("returns a complete safe workspace shape when the tenant has no rows", async () => {
    const data = await getDashboardData(999999);
    expect(data.tenant.name).toBeTruthy();
    expect(data.metrics.activeProducts).toBeGreaterThan(0);
    expect(data.products.length).toBeGreaterThan(0);
    expect(data.reviewItems.every((item) => item.status === "needs_review")).toBe(true);
    expect(data.integrations.every((item) => item.capabilities.length > 0)).toBe(true);
  });
});
