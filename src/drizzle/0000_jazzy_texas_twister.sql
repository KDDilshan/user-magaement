CREATE TABLE `posts` (
	`postId` serial AUTO_INCREMENT NOT NULL,
	`description` text,
	`createdAt` timestamp DEFAULT (now()),
	`authorId` varchar(128) NOT NULL,
	CONSTRAINT `posts_postId` PRIMARY KEY(`postId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`userID` varchar(128) NOT NULL,
	`userName` varchar(256) NOT NULL,
	`age` int NOT NULL,
	`password` varchar(256),
	`email` varchar(256) NOT NULL,
	`gender` enum('male','female'),
	CONSTRAINT `users_userID` PRIMARY KEY(`userID`)
);
--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_authorId_users_userID_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`userID`) ON DELETE cascade ON UPDATE no action;