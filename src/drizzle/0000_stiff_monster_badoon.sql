CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`age` int,
	`password` varchar(256),
	`email` varchar(256),
	`gender` enum('male','female'),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
