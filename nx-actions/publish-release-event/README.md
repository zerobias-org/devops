# Publish Release Event

## Inputs
- `packageDirs`: JSON array of published package directories

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
