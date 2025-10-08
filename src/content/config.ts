import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    description: z.string(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  }),
});

export const collections = { blog };