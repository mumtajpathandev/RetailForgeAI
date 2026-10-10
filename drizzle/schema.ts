import { index, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  passwordHash: varchar("passwordHash", { length: 255 }),
  mustResetPassword: int("mustResetPassword").default(0).notNull(),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const tenants = mysqlTable("tenants", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  plan: varchar("plan", { length: 40 }).default("pilot").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const tenantMemberships = mysqlTable("tenantMemberships", {
  id: int("id").autoincrement().primaryKey(),
  tenantId: int("tenantId").notNull(),
  userId: int("userId").notNull(),
  role: mysqlEnum("role", ["owner", "admin", "editor", "reviewer", "viewer"]).default("viewer").notNull(),
  status: mysqlEnum("status", ["active", "invited", "suspended"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  tenantUserIdx: index("tenant_membership_tenant_user_idx").on(table.tenantId, table.userId),
}));

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  tenantId: int("tenantId").notNull(),
  name: varchar("name", { length: 180 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["draft", "in_development", "review", "approved", "blocked"]).default("draft").notNull(),
  ownerName: varchar("ownerName", { length: 120 }).notNull(),
  completion: int("completion").default(0).notNull(),
  confidence: int("confidence").default(0).notNull(),
  attributes: json("attributes").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  tenantStatusIdx: index("products_tenant_status_idx").on(table.tenantId, table.status),
  tenantUpdatedIdx: index("products_tenant_updated_idx").on(table.tenantId, table.updatedAt),
}));

export const reviewItems = mysqlTable("reviewItems", {
  id: int("id").autoincrement().primaryKey(),
  tenantId: int("tenantId").notNull(),
  productId: int("productId").notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  reasonCode: varchar("reasonCode", { length: 80 }).notNull(),
  reason: text("reason").notNull(),
  severity: mysqlEnum("severity", ["low", "medium", "high", "critical"]).default("medium").notNull(),
  confidence: int("confidence").default(0).notNull(),
  status: mysqlEnum("status", ["needs_review", "approved", "rejected", "changes_requested", "expired"]).default("needs_review").notNull(),
  evidence: json("evidence").$type<Array<{ label: string; value: string }>>().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  tenantStatusIdx: index("review_items_tenant_status_idx").on(table.tenantId, table.status),
}));

export const integrations = mysqlTable("integrations", {
  id: int("id").autoincrement().primaryKey(),
  tenantId: int("tenantId").notNull(),
  kind: varchar("kind", { length: 40 }).notNull(),
  provider: varchar("provider", { length: 80 }).notNull(),
  state: mysqlEnum("state", ["connected", "demo", "needs_attention", "unavailable"]).default("demo").notNull(),
  capabilities: json("capabilities").$type<string[]>().notNull(),
  lastCheckedAt: timestamp("lastCheckedAt").defaultNow().notNull(),
}, (table) => ({
  tenantKindIdx: index("integrations_tenant_kind_idx").on(table.tenantId, table.kind),
}));

export const activities = mysqlTable("activities", {
  id: int("id").autoincrement().primaryKey(),
  tenantId: int("tenantId").notNull(),
  actorName: varchar("actorName", { length: 120 }).notNull(),
  action: varchar("action", { length: 160 }).notNull(),
  subject: varchar("subject", { length: 180 }).notNull(),
  tone: mysqlEnum("tone", ["neutral", "positive", "warning", "critical"]).default("neutral").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  tenantCreatedIdx: index("activities_tenant_created_idx").on(table.tenantId, table.createdAt),
}));

export const auditEvents = mysqlTable("auditEvents", {
  id: int("id").autoincrement().primaryKey(),
  tenantId: int("tenantId").notNull(),
  actorId: int("actorId"),
  eventType: varchar("eventType", { length: 100 }).notNull(),
  entityType: varchar("entityType", { length: 80 }).notNull(),
  entityId: int("entityId"),
  payloadHash: varchar("payloadHash", { length: 128 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  tenantCreatedIdx: index("audit_events_tenant_created_idx").on(table.tenantId, table.createdAt),
}));

export const importRuns = mysqlTable("importRuns", {
  id: int("id").autoincrement().primaryKey(),
  tenantId: int("tenantId").notNull(),
  actorId: int("actorId"),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  template: varchar("template", { length: 80 }).notNull(),
  format: mysqlEnum("format", ["csv", "json"]).notNull(),
  rowCount: int("rowCount").default(0).notNull(),
  status: mysqlEnum("status", ["validated", "committed", "failed"]).default("validated").notNull(),
  source: varchar("source", { length: 40 }).default("demo_upload").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  tenantCreatedIdx: index("import_runs_tenant_created_idx").on(table.tenantId, table.createdAt),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Tenant = typeof tenants.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ReviewItem = typeof reviewItems.$inferSelect;
export type Integration = typeof integrations.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type ImportRun = typeof importRuns.$inferSelect;
