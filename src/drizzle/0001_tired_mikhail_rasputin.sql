CREATE TABLE `comments` (
	`commentId` varchar(128) NOT NULL,
	`comment` text,
	`authorId` varchar(128) NOT NULL,
	`postsId` varchar(128) NOT NULL,
	CONSTRAINT `comments_commentId` PRIMARY KEY(`commentId`)
);
--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `postId` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_authorId_users_userID_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`userID`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_postsId_posts_postId_fk` FOREIGN KEY (`postsId`) REFERENCES `posts`(`postId`) ON DELETE cascade ON UPDATE no action;