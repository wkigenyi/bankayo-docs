import { defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/help',
  docs: {
    schema: frontmatterSchema.extend({
      youtubeId: z.string().regex(/^[a-zA-Z0-9_-]{11}$/).optional(),
    }),
  },
});

export default defineConfig();
