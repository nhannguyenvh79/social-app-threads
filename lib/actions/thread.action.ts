"use server"

import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { connectToDB } from "../mongoose"

interface Params {
    text: string,
    author: string,
    communityId:string | null,
    path: string
}

export async function createThread({text, author, communityId,path}:Params) {
    try {
        connectToDB()

        const createThread = await Thread.create({
            text,
            author,
            community: null,
        })

        await User.findByIdAndUpdate(author, {
            $push: {threads: createThread._id}
        })

        revalidatePath(path)
    } catch (error:any) {
        console.log(`fail to create thread: ${error.message}`)
    }
}

export async function fetchPost(pageNumber=1,pageSize =20) {
    try {
        connectToDB()

        const skipAmount = (pageNumber-1)*pageSize

        const postQueury = Thread.find({parentId:{$in: [null,undefined]}})
        .sort({createAt:"desc"})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path: 'author', model: User})
        .populate({path: 'children', populate:{
            path:"author",
            model: User,
            select: "_id name parentId image"
        }})

        const totalPostCount = await Thread.countDocuments({parentId:{$in: [null,undefined]}})

        const posts = await postQueury.exec()

        const isNext = totalPostCount > skipAmount +posts.length
        return {posts, isNext}

    } catch (error:any) {
        console.log(`fail to fetch thread: ${error.message}`)
    }
}

export async function fetchPostById(id:string) {
    try {
        connectToDB()

        const post = await Thread.findById(id)
        .populate({path: 'author', model: User,select: "_id id name parentId image"})
        .populate({path: 'children', populate:[{
            path:"author",
            model: User,
            select: "_id id name parentId image"
        },{
            path: 'children',
            model: Thread,
            populate:{
                path:"author",
                model: User,
                select: "_id id name parentId image"
            }
        }]
    })

    return post
    } catch (error:any) {
        console.log(`fail to fetch thread: ${error.message}`)
    }
}


export async function addCommentToThread(threadId:string, commentText:string, userId:string,path:string ) {

    try {
        connectToDB()

        const originalThread = await Thread.findById(threadId)

        if (!originalThread) {
            throw new Error("Thread not found")
        }

        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        })

        const saveCommentThread = await commentThread.save()
        originalThread.children.push(saveCommentThread._id)
        await originalThread.save()

        revalidatePath(path)
    } catch (error:any) {
        console.log(`fail to create thread: ${error.message}`)
    }
}