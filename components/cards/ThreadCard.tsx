// "use client";

import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteThread from "../forms/DeleteThread";

interface Props {
  postId: string;
  currentUserId: string | null;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  } | null;
  createAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const ThreadCard = ({
  postId,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createAt,
  comments,
  isComment,
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="profile image"
                fill
                className="cussor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex flex-col w-full">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            <p className="text-small-regular text-light-2">{content}</p>
            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image
                  className="cursor-pointer ogject-contain"
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                />
                <Link href={`/thread/${postId}`}>
                  <Image
                    className="cursor-pointer ogject-contain"
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                  />
                </Link>
                {!isComment && (
                  <Image
                    className="cursor-pointer ogject-contain"
                    src="/assets/repost.svg"
                    alt="repost"
                    width={24}
                    height={24}
                  />
                )}
                {!isComment && (
                  <Image
                    className="cursor-pointer ogject-contain"
                    src="/assets/share.svg"
                    alt="share"
                    width={24}
                    height={24}
                  />
                )}
              </div>
              {isComment && comments.length > 0 && (
                <Link
                  href={`thread/${postId}`}
                  className="mt-1 text-subtle-medium text-gray-1"
                >
                  <p>{comments.length} replies</p>
                </Link>
              )}
            </div>
          </div>
        </div>
        <DeleteThread
          threadId={JSON.stringify(postId)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${postId}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && (
        <div className="mt-5 flex items-center">
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createAt)} -
          </p>

          <Image
            src={author.image}
            alt="author"
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </div>
      )}
    </article>
  );
};

export default ThreadCard;
