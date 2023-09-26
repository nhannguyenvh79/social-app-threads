import { fetchUserPosts } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let res = await fetchUserPosts(accountId);

  if (!res) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {res.threads.map((post: any) => (
        <ThreadCard
          key={post._id}
          postId={post._id}
          currentUserId={currentUserId}
          parentId={post.parentId}
          content={post.text}
          author={
            accountType === "User"
              ? { name: res.name, image: res.image, id: res.id }
              : {
                  name: post.auhor.name,
                  image: post.auhor.image,
                  id: post.auhor.id,
                }
          }
          community={post.community}
          createAt={post.createAt}
          comments={post.children}
        />
      ))}
    </section>
  );
};

export default ThreadTab;
