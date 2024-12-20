import { getPosts } from "@/lib/posts";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  if (!context.site) {
    throw new Error("No site specified in config");
  }

  const posts = await getPosts();

  return rss({
    title: "Thico memo",
    description: "Peaceful blog about software engineering",
    site: context.site,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      content: `<p> ${post.data.description} </p>
      <div style="margin-top: 50px; font-style: italic;"> <strong><a href="${context.site}/blog/${post.slug}">Keep reading here 👻</a></strong>
      </div> <br /> <br />`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
};
