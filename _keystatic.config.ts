import { config, collection, fields } from '@keystatic/core';

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

const isDev = process.env.NODE_ENV === 'development';

export default config({
  storage: isDev ? { kind: 'local' } : {
    kind: 'github',
    repo: {
      owner: "Dominicannard",
      name: "dominicanna-blog"
    }
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
