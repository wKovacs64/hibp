import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";

const requireFromConsumer = createRequire(`${process.cwd()}/`);

const hibp = /** @type {typeof import("../src/hibp.js")} */ (
  await import(pathToFileURL(requireFromConsumer.resolve("hibp")).href)
);

const { version } = /** @type {{ version: string }} */ (
  requireFromConsumer("hibp/package.json")
);

assert.equal(hibp.breach.name, "breach");

const requiredHibp = /** @type {typeof hibp} */ (requireFromConsumer("hibp"));

assert.equal(requiredHibp.breach, hibp.breach, "require(esm)");

const password = "password";
const sha1 = createHash("sha1").update(password).digest("hex").toUpperCase();

let userAgent;

const server = createServer((req, res) => {
  void respond(req, res);
});

/**
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 */
async function respond(req, res) {
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
}

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
