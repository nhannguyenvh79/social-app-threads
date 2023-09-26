import React from "react";
import ThreadCard from "@/components/cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { fetchPostById } from "@/lib/actions/thread.action";
import Comment from "@/components/forms/Comment";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo || !userInfo.onboarded) redirect("/onboarding");

  const post = await fetchPostById(params.id);

  return (
    <section className="relative">
      <ThreadCard
        key={post._id}
        postId={post._id}
        currentUserId={user?.id || ""}
        parentId={post.parentId}
        content={post.text}
        author={post.author}
        community={post.community}
        createAt={post.createAt}
        comments={post.children}
      />

      <div className="mt-7 ">
        <Comment
          postId={post._id}
          currentUserImg={userInfo.image}
          currentUserId={userInfo._id}
        />
      </div>
      <div className="mt-10">
        {post.children.map((child: any) => (
          <ThreadCard
            key={child._id}
            postId={child._id}
            currentUserId={user?.id || ""}
            parentId={child.parentId}
            content={child.text}
            author={child.author}
            community={child.community}
            createAt={child.createAt}
            comments={child.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default page;
