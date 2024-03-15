import { relations } from "drizzle-orm";
import { bigint, date, int, mysqlEnum, mysqlSchema, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createId } from '@paralleldrive/cuid2';

export const users=mysqlTable("users",{
    userId:varchar("userID",{length:128}).$defaultFn(()=>createId()).primaryKey(),
    userName:varchar("userName",{length:256}).notNull(),
    age:int("age").notNull(),
    password:varchar("password",{length:256}),
    email:varchar("email",{length:256}).notNull(),
    gender:mysqlEnum('gender',['male','female'])
})

export const usersRelations=relations(users,({many})=>({
    posts:many(posts)
}))

export const posts=mysqlTable("posts",{
    postId:serial("postId").primaryKey(),
    description:text("description"),
    createdAt:timestamp('createdAt').defaultNow(),
    authorId: varchar("authorId",{length:128}).notNull().references(() => users.userId,{onDelete:"cascade"})
})

export const postRelations=relations(posts,({one})=>({
    author:one(users,{
        fields:[posts.authorId],
        references:[users.userId]
    })
}))

