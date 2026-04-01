# NX Reusable Workflow Improvements

## Overview

Profiling and cleanup of the three NX reusable workflows used by content repos (schema, collectorbot, vendor, etc.).

### Workflows in scope

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `publish-reusable-nx.yml` | push to main | Version, test, publish, sync branches |
| `pull-request-target-reusable-nx.yml` | PR to dev | Test changed packages |
| `publish-merged-pull-request-reusable-nx.yml` | push to dev/qa | Test + pre-release publish |

### Composite actions in scope

| Action | Used by |
|--------|---------|
| `content-publish` | publish-reusable-nx |
| `content-test` | publish-merged-pull-request-reusable-nx |
| `content-test-fork` | pull-request-target-reusable-nx |

---

## Issues & Improvements

### 1. Remove local DB services (HIGH PRIORITY)

**Status:** TODO

**Problem:** All three reusable workflows spin up `postgres` (supabase/postgres:14.1.0) and `dynamodb` service containers. With Neon adoption complete, these are dead weight — adding ~30-60s startup time per run.

**Fix:**
- Remove `services` block from all three reusable workflows
- Set `use-neon` default to `true`
- Remove local PG env vars (`PGHOST: localhost`, `PGPORT: 15432`, etc.)
- Keep `use-neon` input for backwards compatibility but default to true

**Files:**
- `.github/workflows/publish-reusable-nx.yml` (lines 68-83)
- `.github/workflows/pull-request-target-reusable-nx.yml` (lines 63-79)
- `.github/workflows/publish-merged-pull-request-reusable-nx.yml` (lines 60-79)

**Estimated time saved:** ~30-60s per run

---

### 2. Hardcoded `timeout 300` in actions (MEDIUM PRIORITY)

**Status:** TODO

**Problem:** `test-timeout` input exists but several steps ignore it:
- `content-test-fork/action.yml:115` — `timeout 300 nx nx:build`
- `content-test/action.yml:96` — `timeout 300 nx nx:build`
- `content-test-fork/action.yml:175` — `timeout 300 npm run test:unit`
- `content-test-fork/action.yml:178` — `timeout 300 npm run test:integration`

**Fix:** Replace all hardcoded `timeout 300` with `timeout ${{ inputs.test-timeout }}`.

**Files:**
- `nx-actions/content-test-fork/action.yml`
- `nx-actions/content-test/action.yml`

---

### 3. Sequential dataloader runs (MEDIUM PRIORITY)

**Status:** TODO

**Problem:** Build step uses `xargs -P4` (parallel) but dataloader/prepublish step runs in a sequential `for` loop. For repos with many packages, this is the main bottleneck.

**Fix:** Parallelize dataloader with `xargs -P4`:
```bash
echo "$CHANGED_DIRS" | tr ' ' '\n' | \
xargs -P4 -I{} bash -c '
  pkg="{}"
  if [ -f "$pkg/package.json" ]; then
    echo "Running dataloader for $pkg"
    (cd "$pkg" && timeout ${{ inputs.test-timeout }} dataloader -d . --skip-pgboss --force-direct)
  fi
'
```

**Files:**
- `nx-actions/content-publish/action.yml` (prepublish step)
- `nx-actions/content-test/action.yml` (test:prepublish step)
- `nx-actions/content-test-fork/action.yml` (test:prepublish step)

**Risk:** Neon must handle concurrent connections. With `--force-direct`, each dataloader runs its own transaction — should be safe.

---

### 4. Add `::group::` log grouping (MEDIUM PRIORITY)

**Status:** TODO

**Problem:** Composite actions log per-package operations as a wall of text. With 20+ packages, debugging is painful.

**Fix:** Wrap per-package operations in GitHub Actions log groups:
```bash
echo "::group::Building $PROJECT_NAME"
# ... build commands ...
echo "::endgroup::"
```

**Files:**
- `nx-actions/content-publish/action.yml` (build, prepublish, publish, tags, dist-tags steps)
- `nx-actions/content-test/action.yml` (build, prepublish steps)
- `nx-actions/content-test-fork/action.yml` (build, prepublish, tests steps)

---

### 5. Build failures silently swallowed (LOW PRIORITY)

**Status:** TODO

**Problem:** Build step treats failures as warnings:
```bash
timeout 300 nx nx:build "$PROJECT_NAME" || echo "Warning: build failed for $PROJECT_NAME"
```

A broken build proceeds to dataloader/publish.

**Fix:** Add `fail-on-build-error` input (default: true). When true, build failures exit with error.

---

### 6. Unify `content-test` and `content-test-fork` (LOW PRIORITY)

**Status:** TODO

**Problem:** Two nearly identical composite actions with drift:
- `content-test` is missing `test:tests` step (unit/integration tests per-package)
- `content-test-fork` has extra changed-files security check
- Different detection baselines (`origin/main` vs parameterized)

**Fix:** Merge into a single `content-test` action with `is-fork` input.

---

### 7. Remove Ruby/sem setup (LOW PRIORITY)

**Status:** TODO

**Problem:** `ruby/setup-ruby@v1` + `gem install schema-evolution-manager` runs on every PR/merge, even for repos that don't use SQL migrations (~15-20s).

**Fix:** Make conditional — only run if repo contains `.sql` files or `sem` config.

---

### 8. Duplicate dataloader install (LOW PRIORITY)

**Status:** TODO

**Problem:** `npm i -g @zerobias-com/platform-dataloader@latest` runs in every workflow, adding network latency.

**Fix:** Move to `Install dependencies` step or cache on self-hosted runners.

---

## Implementation Order

1. Remove local DB services + set `use-neon: true` default
2. Fix hardcoded timeouts
3. Add `::group::` logging
4. Parallelize dataloader
5. Fix build failure handling
6. Unify test actions
7. Conditional Ruby setup
8. Cache dataloader install
