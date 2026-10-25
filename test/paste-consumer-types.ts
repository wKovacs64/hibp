import { pasteAccount, search } from "../src/hibp.js";

// Compile-only consumer checks, included by pnpm typecheck.
export async function pasteAccountConsumer() {
  const pastes = await pasteAccount("pasted@example.com");
  return pastes?.map((paste) => {
    // @ts-expect-error Consumers must handle an absent title.
    paste.Title.trim();
    // @ts-expect-error Consumers must handle a null date before parsing it.
    Date.parse(paste.Date);
    return {
      title: paste.Title === undefined ? undefined : paste.Title.trim(),
      date: paste.Date === null ? null : new Date(paste.Date),
    };
  });
}

export async function searchConsumer() {
  const { pastes } = await search("pasted@example.com");
  return pastes?.map((paste) => {
    // @ts-expect-error Consumers must handle an absent title.
    paste.Title.trim();
    // @ts-expect-error Consumers must handle a null date before parsing it.
    Date.parse(paste.Date);
    return {
      title: paste.Title === undefined ? undefined : paste.Title.trim(),
      date: paste.Date === null ? null : new Date(paste.Date),
    };
  });
}
