import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";
import { fetchPost } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  const res = await fetchPost(searchParams.page ? +searchParams.page : 1, 30);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {res?.posts.length === 0 ? (
          <p className="no-result">No Threads Found</p>
        ) : (
          <>
            {res?.posts.map((post) => (
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
            ))}
          </>
        )}
      </section>
      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={res?.isNext || false}
      />
    </>
  );
}
