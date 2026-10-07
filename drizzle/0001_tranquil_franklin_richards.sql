CREATE TABLE `activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tenantId` int NOT NULL,
	`actorName` varchar(120) NOT NULL,
	`action` varchar(160) NOT NULL,
	`subject` varchar(180) NOT NULL,
	`tone` enum('neutral','positive','warning','critical') NOT NULL DEFAULT 'neutral',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `auditEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tenantId` int NOT NULL,
	`actorId` int,
	`eventType` varchar(100) NOT NULL,
	`entityType` varchar(80) NOT NULL,
	`entityId` int,
	`payloadHash` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `integrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tenantId` int NOT NULL,
	`kind` varchar(40) NOT NULL,
	`provider` varchar(80) NOT NULL,
	`state` enum('connected','demo','needs_attention','unavailable') NOT NULL DEFAULT 'demo',
	`capabilities` json NOT NULL,
	`lastCheckedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `integrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tenantId` int NOT NULL,
	`name` varchar(180) NOT NULL,
	`category` varchar(100) NOT NULL,
	`status` enum('draft','in_development','review','approved','blocked') NOT NULL DEFAULT 'draft',
	`ownerName` varchar(120) NOT NULL,
	`completion` int NOT NULL DEFAULT 0,
	`confidence` int NOT NULL DEFAULT 0,
	`attributes` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviewItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tenantId` int NOT NULL,
	`productId` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`reasonCode` varchar(80) NOT NULL,
	`reason` text NOT NULL,
	`severity` enum('low','medium','high','critical') NOT NULL DEFAULT 'medium',
	`confidence` int NOT NULL DEFAULT 0,
	`status` enum('needs_review','approved','rejected','changes_requested','expired') NOT NULL DEFAULT 'needs_review',
	`evidence` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviewItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tenantMemberships` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tenantId` int NOT NULL,
	`userId` int NOT NULL,
	`role` enum('owner','admin','editor','reviewer','viewer') NOT NULL DEFAULT 'viewer',
	`status` enum('active','invited','suspended') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tenantMemberships_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tenants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`slug` varchar(80) NOT NULL,
	`plan` varchar(40) NOT NULL DEFAULT 'pilot',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tenants_id` PRIMARY KEY(`id`),
	CONSTRAINT `tenants_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE INDEX `activities_tenant_created_idx` ON `activities` (`tenantId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `audit_events_tenant_created_idx` ON `auditEvents` (`tenantId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `integrations_tenant_kind_idx` ON `integrations` (`tenantId`,`kind`);--> statement-breakpoint
CREATE INDEX `products_tenant_status_idx` ON `products` (`tenantId`,`status`);--> statement-breakpoint
CREATE INDEX `products_tenant_updated_idx` ON `products` (`tenantId`,`updatedAt`);--> statement-breakpoint
CREATE INDEX `review_items_tenant_status_idx` ON `reviewItems` (`tenantId`,`status`);--> statement-breakpoint
CREATE INDEX `tenant_membership_tenant_user_idx` ON `tenantMemberships` (`tenantId`,`userId`);