import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { ENV } from "./_core/env";
import { activities, Activity, InsertUser, integrations, Integration, products, Product, reviewItems, ReviewItem, users } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  for (const field of ["name", "email", "loginMethod"] as const) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  values.lastSignedIn = user.lastSignedIn ?? new Date();
  updateSet.lastSignedIn = values.lastSignedIn;
  if (user.role !== undefined || user.openId === ENV.ownerOpenId) {
    values.role = user.role ?? "admin";
    updateSet.role = values.role;
  }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export type DashboardData = {
  tenant: { name: string; plan: string; demo: boolean };
  metrics: { activeProducts: number; needsReview: number; weeklySignals: number; readiness: number };
  products: Array<Pick<Product, "id" | "name" | "category" | "status" | "ownerName" | "completion" | "confidence" | "updatedAt">>;
  reviewItems: Array<Pick<ReviewItem, "id" | "title" | "reason" | "severity" | "confidence" | "status" | "createdAt">>;
  integrations: Array<Pick<Integration, "kind" | "provider" | "state" | "capabilities" | "lastCheckedAt">>;
  activities: Array<Pick<Activity, "actorName" | "action" | "subject" | "tone" | "createdAt">>;
};

const fallback: DashboardData = {
  tenant: { name: "Northstar Athletics", plan: "Pilot workspace", demo: true },
  metrics: { activeProducts: 24, needsReview: 7, weeklySignals: 148, readiness: 82 },
  products: [
    { id: 101, name: "AeroFlex Recovery Hoodie", category: "Performance apparel", status: "review", ownerName: "Maya Chen", completion: 86, confidence: 94, updatedAt: new Date(Date.now() - 1000 * 60 * 24) },
    { id: 102, name: "Contour Knit Legging", category: "Women’s active", status: "in_development", ownerName: "Jordan Lee", completion: 64, confidence: 91, updatedAt: new Date(Date.now() - 1000 * 60 * 95) },
    { id: 103, name: "Terrain Run Shell", category: "Outdoor", status: "blocked", ownerName: "Sam Rivera", completion: 48, confidence: 72, updatedAt: new Date(Date.now() - 1000 * 60 * 240) },
    { id: 104, name: "Pulse Court Short", category: "Training", status: "approved", ownerName: "Maya Chen", completion: 100, confidence: 98, updatedAt: new Date(Date.now() - 1000 * 60 * 420) },
  ],
  reviewItems: [
    { id: 201, title: "AeroFlex Recovery Hoodie", reason: "Material composition conflicts with the tenant taxonomy rule.", severity: "high", confidence: 88, status: "needs_review", createdAt: new Date(Date.now() - 1000 * 60 * 18) },
    { id: 202, title: "Terrain Run Shell", reason: "Waterproof rating was inferred from incomplete source evidence.", severity: "critical", confidence: 71, status: "needs_review", createdAt: new Date(Date.now() - 1000 * 60 * 55) },
    { id: 203, title: "Contour Knit Legging", reason: "Suggested size curve needs merchant confirmation.", severity: "medium", confidence: 93, status: "needs_review", createdAt: new Date(Date.now() - 1000 * 60 * 110) },
  ],
  integrations: [
    { kind: "PLM", provider: "Generic REST adapter", state: "needs_attention", capabilities: ["product sync", "attribute mapping"], lastCheckedAt: new Date(Date.now() - 1000 * 60 * 12) },
    { kind: "Design", provider: "SVG artboard", state: "connected", capabilities: ["vector preview", "spec export"], lastCheckedAt: new Date(Date.now() - 1000 * 60 * 8) },
    { kind: "AI routing", provider: "Safe structured demo", state: "demo", capabilities: ["schema validation", "review intercept"], lastCheckedAt: new Date(Date.now() - 1000 * 60 * 3) },
    { kind: "ERP", provider: "Not configured", state: "unavailable", capabilities: ["margin sync", "inventory handoff"], lastCheckedAt: new Date(Date.now() - 1000 * 60 * 75) },
  ],
  activities: [
    { actorName: "Maya Chen", action: "submitted a brief for review", subject: "AeroFlex Recovery Hoodie", tone: "positive", createdAt: new Date(Date.now() - 1000 * 60 * 18) },
    { actorName: "System", action: "intercepted an AI suggestion", subject: "Terrain Run Shell", tone: "warning", createdAt: new Date(Date.now() - 1000 * 60 * 55) },
    { actorName: "Jordan Lee", action: "updated the size curve", subject: "Contour Knit Legging", tone: "neutral", createdAt: new Date(Date.now() - 1000 * 60 * 110) },
  ],
};

export async function getDashboardData(tenantId: number): Promise<DashboardData> {
  const db = await getDb();
  if (!db) return fallback;
  try {
    const [productRows, reviewRows, integrationRows, activityRows] = await Promise.all([
      db.select({ id: products.id, name: products.name, category: products.category, status: products.status, ownerName: products.ownerName, completion: products.completion, confidence: products.confidence, updatedAt: products.updatedAt }).from(products).where(eq(products.tenantId, tenantId)).orderBy(desc(products.updatedAt)).limit(8),
      db.select({ id: reviewItems.id, title: reviewItems.title, reason: reviewItems.reason, severity: reviewItems.severity, confidence: reviewItems.confidence, status: reviewItems.status, createdAt: reviewItems.createdAt }).from(reviewItems).where(and(eq(reviewItems.tenantId, tenantId), eq(reviewItems.status, "needs_review"))).orderBy(desc(reviewItems.createdAt)).limit(6),
      db.select({ kind: integrations.kind, provider: integrations.provider, state: integrations.state, capabilities: integrations.capabilities, lastCheckedAt: integrations.lastCheckedAt }).from(integrations).where(eq(integrations.tenantId, tenantId)).limit(8),
      db.select({ actorName: activities.actorName, action: activities.action, subject: activities.subject, tone: activities.tone, createdAt: activities.createdAt }).from(activities).where(eq(activities.tenantId, tenantId)).orderBy(desc(activities.createdAt)).limit(6),
    ]);
    if (productRows.length === 0 && reviewRows.length === 0 && integrationRows.length === 0) return fallback;
    const activeProducts = productRows.filter((p) => p.status !== "approved").length;
    const needsReview = reviewRows.length;
    const readiness = productRows.length ? Math.round(productRows.reduce((sum, p) => sum + p.completion, 0) / productRows.length) : fallback.metrics.readiness;
    return { tenant: { ...fallback.tenant, demo: false }, metrics: { activeProducts, needsReview, weeklySignals: fallback.metrics.weeklySignals, readiness }, products: productRows, reviewItems: reviewRows, integrations: integrationRows, activities: activityRows };
  } catch (error) {
    console.warn("[Dashboard] Falling back to demo data:", error);
    return fallback;
  }
}
