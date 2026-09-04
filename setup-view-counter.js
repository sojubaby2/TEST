// One-time setup for the real view-counter feature.
// Creates a Cloudflare KV namespace and wires it into wrangler.toml automatically.
// Safe to run more than once - it skips itself if already configured.

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const wranglerPath = path.join(__dirname, "wrangler.toml");
let toml = fs.readFileSync(wranglerPath, "utf8");

if (toml.includes("VIEW_COUNTS")) {
  console.log("Already set up. Nothing more to do here.");
  console.log("You can close this window.");
  process.exit(0);
}

console.log("Setting up storage for the view counter (one-time step)...");
console.log("");

let output;
try {
  output = execSync("npx --yes wrangler kv namespace create VIEW_COUNTS", {
    encoding: "utf8",
  });
} catch (e) {
  console.log("Something went wrong while creating storage:");
  console.log((e.stdout || "") + (e.stderr || "") + e.message);
  console.log("");
  console.log("Please copy this whole window and show it to Claude.");
  process.exit(1);
}

console.log(output);

const idMatch = output.match(/id\s*=\s*"([a-f0-9]+)"/i);
if (!idMatch) {
  console.log("Could not find the new storage ID in the output above.");
  console.log("Please copy this whole window and show it to Claude.");
  process.exit(1);
}
const kvId = idMatch[1];

toml = toml.trimEnd() + '\n\n[[kv_namespaces]]\nbinding = "VIEW_COUNTS"\nid = "' + kvId + '"\n';
fs.writeFileSync(wranglerPath, toml);

console.log("");
console.log("Done! View counter storage is now connected.");
console.log("Next: double-click the update file you've used before to deploy this.");
console.log("You can close this window.");
