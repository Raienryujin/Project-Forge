import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: '../api/api.json',
    output: {
      mode: 'tags-split',
      target: 'src/api/generated',
      schemas: 'src/api/generated/model',
      client: 'swr',
    },
  },
});
