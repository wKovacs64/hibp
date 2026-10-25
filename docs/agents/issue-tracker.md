# Issue tracker: GitHub

Issues and specs live in [wKovacs64/hibp](https://github.com/wKovacs64/hibp/issues). Use `gh` for all GitHub operations.

## Conventions

- Create: `gh issue create --title "..." --body-file <file>`. Write multiline bodies to a temporary file.
- Read: `gh issue view <number> --json number,title,body,labels,comments`.
- List: `gh issue list --state open --json number,title,body,labels,comments`, with relevant label and state filters.
- Link a sub-issue: `gh issue create --parent <parent> ...`, or `gh issue edit <parent> --add-sub-issue <child>`.
- Comment: `gh issue comment <number> --body-file <file>`.
- Labels: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`.
- Close: `gh issue close <number> --comment "..."`.

Run inside this clone so `gh` infers the repository from its remote.

## Pull requests as a triage surface

**PRs as a request surface: no.**

When enabled, use the same triage labels and states for external PRs:

- Read: `gh pr view <number> --comments` and `gh pr diff <number>`.
- List external PRs: `gh api --paginate 'repos/{owner}/{repo}/pulls?state=open' --jq '.[] | select(.author_association | IN("OWNER","MEMBER","COLLABORATOR") | not) | {number, title, author: .user.login, author_association, labels: [.labels[].name]}'`.
- Comment, label, close: `gh pr comment`, `gh pr edit`, `gh pr close`.

Issues and PRs share a number space. Resolve the resource type before operating on a bare number.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Read its full body and comments.

## Wayfinding operations

Used by `/wayfinder`:

- Map: one issue labelled `wayfinder:map`, containing notes, decisions and unresolved questions.
- Child ticket: a sub-issue labelled `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling` or `wayfinder:task`.
- Blocking: use native issue dependencies. Get a blocker's database ID with `gh api repos/{owner}/{repo}/issues/<number> --jq .id`. Add the edge with `gh api --method POST repos/{owner}/{repo}/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-database-id>`.
- Frontier: list the map's open children, exclude assigned issues and those with open blockers (`issue_dependencies_summary.blocked_by > 0`), then take the first in map order.
- Claim: `gh issue edit <number> --add-assignee @me` before starting the ticket.
- Resolve: comment with the answer, close the ticket, then add a context pointer to the map's decisions.
