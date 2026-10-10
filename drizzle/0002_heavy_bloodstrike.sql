CREATE TABLE `importRuns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tenantId` int NOT NULL,
	`actorId` int,
	`fileName` varchar(255) NOT NULL,
	`template` varchar(80) NOT NULL,
	`format` enum('csv','json') NOT NULL,
	`rowCount` int NOT NULL DEFAULT 0,
	`status` enum('validated','committed','failed') NOT NULL DEFAULT 'validated',
	`source` varchar(40) NOT NULL DEFAULT 'demo_upload',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `importRuns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `passwordHash` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `mustResetPassword` int DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE INDEX `import_runs_tenant_created_idx` ON `importRuns` (`tenantId`,`createdAt`);