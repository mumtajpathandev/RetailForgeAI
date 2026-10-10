import { scryptSync, timingSafeEqual } from "node:crypto";
import type { User } from "../drizzle/schema";

export type DemoCredential = {
  role: string;
  username: string;
  password: string;
  hash: string;
  salt: string;
};

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

const rawDemoAccounts = [
  ["Platform owner", "owner@demo.retailforge.local", "RF-Demo-Owner-2026!", "owner"],
  ["Tenant admin", "admin@demo.retailforge.local", "RF-Demo-Admin-2026!", "admin"],
  ["Merchandising lead", "merchandising.lead@demo.retailforge.local", "RF-Demo-Merchant-2026!", "editor"],
  ["Product developer", "product.developer@demo.retailforge.local", "RF-Demo-Product-2026!", "editor"],
  ["Designer", "designer@demo.retailforge.local", "RF-Demo-Designer-2026!", "editor"],
  ["Sourcing manager", "sourcing.manager@demo.retailforge.local", "RF-Demo-Sourcing-2026!", "editor"],
  ["Analyst", "analyst@demo.retailforge.local", "RF-Demo-Analyst-2026!", "viewer"],
  ["Reviewer", "reviewer@demo.retailforge.local", "RF-Demo-Reviewer-2026!", "reviewer"],
  ["Read-only viewer", "viewer@demo.retailforge.local", "RF-Demo-Viewer-2026!", "viewer"],
] as const;

const DEMO_SALT = "retailforge-demo-only-2026";
export const DEMO_CREDENTIALS: DemoCredential[] = rawDemoAccounts.map(([role, username, password]) => ({
  role,
  username,
  password,
  salt: DEMO_SALT,
  hash: hashPassword(password, DEMO_SALT),
}));

export function getDemoUser(email: string, password: string): User | null {
  const record = DEMO_CREDENTIALS.find((item) => item.username.toLowerCase() === email.trim().toLowerCase());
  if (!record) return null;
  const candidate = Buffer.from(hashPassword(password, record.salt), "hex");
  const expected = Buffer.from(record.hash, "hex");
  if (candidate.length !== expected.length || !timingSafeEqual(candidate, expected)) return null;
  const now = new Date();
  return {
    id: -(DEMO_CREDENTIALS.indexOf(record) + 1),
    openId: `demo:${record.username}`,
    name: record.role,
    email: record.username,
    loginMethod: "password-demo",
    role: record.role === "Platform owner" || record.role === "Tenant admin" ? "admin" : "user",
    passwordHash: record.hash,
    mustResetPassword: 1,
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
  } as User;
}

export function getDemoUserByOpenId(openId: string): User | null {
  const record = DEMO_CREDENTIALS.find((item) => `demo:${item.username}` === openId);
  if (!record) return null;
  return getDemoUser(record.username, record.password);
}
