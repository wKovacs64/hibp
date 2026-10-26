// Smoke tests the packed package on the minimum supported Node.js version,
// without dev dependencies. Run from a directory where the tarball is
// installed (`npm install ./hibp-<version>.tgz`).
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";

// Resolve from the consumer directory, not this repo (package self-reference).
const require = createRequire(`${process.cwd()}/`);
const hibp = await import(pathToFileURL(require.resolve("hibp")).href);
const { version } = require("hibp/package.json");

assert.equal(typeof hibp.breach, "function");
assert.equal(require("hibp").breach, hibp.breach, "require(esm)");

const password = "password";
const sha1 = createHash("sha1").update(password).digest("hex").toUpperCase();

let userAgent;
const server = createServer(async (req, res) => {
  userAgent = req.headers["user-agent"];
  if (req.url.startsWith("/slow")) await delay(1000);
  if (req.url.startsWith("/range/")) {
    res.end(`${sha1.slice(5)}:42\r\n`);
  } else if (req.url.startsWith("/limited")) {
    res.writeHead(429, { "retry-after": "2" }).end();
  } else {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(["Passwords"]));
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;

try {
  assert.deepEqual(await hibp.dataClasses({ baseUrl }), ["Passwords"]);
  assert.equal(userAgent, `hibp ${version}`);

  assert.equal(await hibp.pwnedPassword(password, { baseUrl }), 42);

  await assert.rejects(
    hibp.dataClasses({ baseUrl: `${baseUrl}/slow`, timeoutMs: 50 }),
    {
      name: "TimeoutError",
    },
  );

  await assert.rejects(
    hibp.dataClasses({ baseUrl, timeoutMs: 5000, signal: AbortSignal.abort() }),
    { name: "AbortError" },
  );

  await assert.rejects(
    hibp.dataClasses({ baseUrl: `${baseUrl}/limited` }),
    (error) => {
      assert.ok(error instanceof hibp.RateLimitError);
      assert.equal(error.retryAfterSeconds, 2);
      return true;
    },
  );
} finally {
  server.close();
}

console.log(`hibp ${version} OK on Node.js ${process.version}`);
