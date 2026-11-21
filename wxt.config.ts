import { defineConfig } from "wxt";
import { W3_LAB_EXTENSION_NAME, W3_LAB_HOST_PERMISSIONS } from "./src/w3lab";

// E2E builds talk to a local fake Solidtime server; pre-granting it avoids the
// permission prompt Playwright can't click. Never set for release builds.
const e2e = process.env.E2E === "1";

export default defineConfig({
  srcDir: ".",
  outDir: e2e ? ".output-e2e" : ".output",
  manifest: {
    name: W3_LAB_EXTENSION_NAME,
    description:
      "W3 Lab's build of Solidtime for ClickUp: start Solidtime timers from ClickUp tasks with one click. Not affiliated with Solidtime or ClickUp.",
    homepage_url: "https://github.com/w3-lab-git/solidtime-clickup-bridge",
    // scripting: after start/stop, nudge open tabs of the user's own Solidtime instance to refresh
    // (only possible on the origin the user granted; see refreshSolidtimeTabs in background.ts).
    permissions: ["storage", "scripting"],
    // W3 Lab build: only our Solidtime instance; access is still requested at runtime (Connect).
    optional_host_permissions: W3_LAB_HOST_PERMISSIONS,
    host_permissions: e2e ? ["http://127.0.0.1/*"] : [],
    browser_specific_settings: {
      gecko: {
        id: "solidtime-clickup@w3-lab.com",
        // Task titles/ids and the API token are sent only to the user's own Solidtime instance.
        data_collection_permissions: { required: ["authenticationInfo", "websiteContent"] },
      },
    },
  },
});
