# Publish Release Event

## Inputs
The published packages come from one of two env vars:
- `PACKAGE_DIRS`: a JSON array, used when set.
- `PUBLISHED_PKGS_FILE`: the path of a JSON file holding such an array.

An entry of the array is either:
- a package directory, announced with the name and version in its package.json; or
- a `{ "name", "version", "location" }` record, announced with that name and version. zbb and the publish actions write these to `/tmp/published-packages.json`. Prefer them: on a branch publish, package.json still holds the last release, not the version that was published.

A record with `"releaseEventSent": true` is skipped. zbb sets it on each package whose release event it already sent during the publish, so a release is announced once.

## Expected env vars
This is meant to be used in conjunction with the gh-get-current-pr action and as part of the `release-announchement` action
```
- uses: 8BitJonny/gh-get-current-pr@2.1.2
  id: pr

```

And mapping those outputs to env vars
```
env:
  PR_ID: ${{ steps.pr.outputs.number }}
  PR_URL: ${{ steps.pr.outputs.pr_url }}
  PR_LABELS: ${{ steps.pr.outputs.pr_labels }}
```

## Development
This must build built before pushing. Please run `npm run build` before committing changes.
