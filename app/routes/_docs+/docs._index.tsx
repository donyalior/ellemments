// #app/routes/_blog+/blog._index.tsx

import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, type MetaFunction } from "@remix-run/react";
import * as React from "react";
import { getContentElemmentListings } from "#app/utils/content/content.server";

export const loader = async (_: LoaderFunctionArgs) => {
  return { posts: await getContentElemmentListings() };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Blog" },
    {
      name: "description",
      content: "Thoughts about building excellent user experiences with Remix.",
    },
  ];
};

export default function Docs() {
  const data = useLoaderData<typeof loader>();
  const [latestPost, ...posts] = data.posts;

  let featuredPosts = data.posts.filter((post) => post.featured);

  if (!latestPost) {
    return <div>No blog posts available.</div>;
  }

  return (
    <main
      className="mt-8 flex max-w-full flex-1 flex-col px-6 sm:container"
      tabIndex={-1}
    >
      <div className="md:grid md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="mb-14">
            <Link to={latestPost.slug} prefetch="intent">
              <div className="mb-6 aspect-[16/9]">
                <img
                  className="mb-6 h-full w-full object-cover object-top shadow md:rounded-md"
                  src={latestPost.image}
                  alt={latestPost.imageAlt}
                />
              </div>
              <p className="text-sm lg:text-base">{latestPost.dateDisplay}</p>
              <p className="text-2xl font-bold lg:text-5xl lg:leading-normal">
                {latestPost.title}
              </p>
              <p className="text-sm lg:text-base">{latestPost.summary}</p>
            </Link>
          </div>
          <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-6">
            {posts.map((post) => (
              <div key={post.slug}>
                <Link to={post.slug} prefetch="intent">
                  <div className="mb-6 aspect-[16/9]">
                    <img
                      className="h-full w-full object-cover object-top shadow md:rounded-md"
                      src={post.image}
                      alt={post.imageAlt}
                    />
                  </div>
                  <p className="text-sm lg:text-base">{post.dateDisplay}</p>
                  <p className="text-lg font-bold lg:text-xl">{post.title}</p>
                  <p className="mb-12 text-sm lg:text-base">{post.summary}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="h-24 md:hidden" />
        <div className="md:col-span-4 md:col-start-9">
          {featuredPosts.length ? (
            <>
              <h3 className="mb-8 text-xl font-bold lg:text-3xl">
                Featured Articles
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {featuredPosts.map((post, index, array) => (
                  <React.Fragment key={post.slug}>
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <Link
                          to={post.slug}
                          prefetch="intent"
                          className="text-sm lg:text-base"
                        >
                          {post.title}
                        </Link>
                      </div>
                    </div>
                    {index !== array.length - 1 && <hr className="my-4" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="h-24" />
            </>
          ) : null}
          <div>
          </div>
        </div>
      </div>
    </main>
  );
}