#!/usr/bin/env bash
# Commit only dist/ to gh-pages, without changing the source checkout/index.
set -euo pipefail
branch=gh-pages
test -f dist/index.html
test -f dist/.nojekyll
if test -n "$(find dist -type l -print -quit)"; then
  echo 'Static output must not contain symlinks' >&2
  exit 1
fi
scratch=$(mktemp -d)
trap 'rm -rf "$scratch"' EXIT
export GIT_INDEX_FILE="$scratch/index"
export GIT_AUTHOR_NAME='github-actions[bot]'
export GIT_AUTHOR_EMAIL='41898282+github-actions[bot]@users.noreply.github.com'
export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
parent=""
remote_status=0
git ls-remote --exit-code --heads origin "$branch" > "$scratch/remote" || remote_status=$?
if test "$remote_status" = 0; then
  git fetch origin "refs/heads/$branch"
  parent=$(git rev-parse FETCH_HEAD)
elif test "$remote_status" != 2; then
  exit "$remote_status"
fi
git read-tree --empty
GIT_WORK_TREE="$PWD/dist" git add --all --force
static_tree=$(git write-tree)
if test -n "$parent" && test "$static_tree" = "$(git rev-parse "${parent}^{tree}")"; then
  echo 'Static branch already up to date'
  exit 0
fi
message="Build static site from $(git rev-parse HEAD)"
if test -n "$parent"; then
  static_commit=$(printf '%s\n' "$message" | git commit-tree "$static_tree" -p "$parent")
else
  static_commit=$(printf '%s\n' "$message" | git commit-tree "$static_tree")
fi
git push origin "$static_commit:refs/heads/$branch"
