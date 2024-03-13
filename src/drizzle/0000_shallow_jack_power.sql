CREATE TABLE `users` (
	`userId` serial AUTO_INCREMENT NOT NULL,
	`userName` varchar(256) NOT NULL,
	`age` int NOT NULL,
	`password` varchar(256),
	`email` varchar(256) NOT NULL,
	`gender` enum('male','female'),
	CONSTRAINT `users_userId` PRIMARY KEY(`userId`)
);
