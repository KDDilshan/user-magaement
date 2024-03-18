import { relations } from "drizzle-orm";
import { bigint, date, int, mysqlEnum, mysqlSchema, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createId } from '@paralleldrive/cuid2';
import exp from "constants";

export const users=mysqlTable("users",{
    userId:varchar("userID",{length:128}).$defaultFn(()=>createId()).primaryKey(),
    userName:varchar("userName",{length:256}).notNull(),
    age:int("age").notNull(),
    password:varchar("password",{length:256}),
    email:varchar("email",{length:256}).notNull(),
    gender:mysqlEnum('gender',['male','female'])
})

export const usersRelations=relations(users,({many})=>({
    posts:many(posts),//userta godk post thiynne puluwan
    comments:many(comments)
}))

export const posts=mysqlTable("posts",{
    postId:varchar("postId",{length:128}).$defaultFn(()=>createId()).primaryKey(),
    description:text("description"),
    createdAt:timestamp('createdAt').defaultNow(),
    authorId: varchar("authorId",{length:128}).notNull().references(() => users.userId,{onDelete:"cascade"})
})

export const postRelations=relations(posts,({one,many})=>({
    author:one(users,{//eka post ekata eka user kenai
        fields:[posts.authorId],
        references:[users.userId]
    }),
    comments:many(posts)//post ekata goak comments thiynne puluwan
}))

export const comments=mysqlTable("comments",{
    commentId:varchar("commentId",{length:128}).$defaultFn(()=>createId()).primaryKey(),
    comment:text("comment"),
    authorId:varchar("authorId",{length:128}).notNull().references(()=>users.userId,{onDelete:"cascade"}),
    postsId:varchar("postsId",{length:128}).notNull().references(()=>posts.postId,{onDelete:"cascade"})
})

export const commentsRelations=relations(comments,({one ,many})=>({
    creator:one(users,{//eka comment ekat eka user ekai
        fields:[comments.authorId],
        references:[users.userId],
    }),
    posts:one(posts,{
        fields:[comments.postsId],
        references:[posts.postId]
    })
}))
