import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "../../packages/types/api.json",
    output: {
      mode: "tags-split",
      target: "src/api/generated",
      schemas: "src/api/generated/model",
      client: "swr",
    },
  },
});
