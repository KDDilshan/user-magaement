import { relations } from "drizzle-orm";
import { bigint, date, int, mysqlEnum, mysqlSchema, mysqlTable, primaryKey, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";
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
    comments:many(comments),//post ekata goak comments thiynne puluwan
    postsToTags:many(postsToTags)
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

export const tags=mysqlTable("Tags",{
    id:varchar("id",{length:128}).$defaultFn(()=>createId()).primaryKey(),
    name:varchar("name",{length:32})
})

export const tagesRelations=relations(tags,({many})=>({
    postsToTags:many(postsToTags),
}))

export const postsToTags=mysqlTable("posts_to_tags",{
    postId:varchar('postId',{length:128}).references(()=>posts.postId).notNull(),
    tagId:varchar('tagId',{length:128}).references(()=>tags.id).notNull(),
},(t)=>({
    pk:primaryKey({columns:[t.postId,t.tagId]}),
    })
)

export const postsToTagsRealations=relations(postsToTags,({one})=>({
    tags:one(tags,{
        fields:[postsToTags.tagId],
        references:[tags.id],
    }),

    posts:one(posts,{
        fields:[postsToTags.postId],
        references:[posts.postId]
    })
}))


export const commentsReplay=mysqlTable("comments_replay",{
    repcommentId:varchar('repcommentId',{length:128}).$defaultFn(()=>createId()).primaryKey()
})