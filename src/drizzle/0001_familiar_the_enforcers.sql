ALTER TABLE `users` RENAME COLUMN `id` TO `userId`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `name` TO `userName`;--> statement-breakpoint
ALTER TABLE `users` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `users` ADD PRIMARY KEY(`userId`);