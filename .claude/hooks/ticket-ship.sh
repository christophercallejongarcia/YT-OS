#!/bin/bash
# SessionEnd-Hook für YT-OS (rules/always.md 2): ein Commit und Push pro Ticket.
#
# Greift nur in einem Git-Worktree. Dort arbeitet genau ein Thread, deshalb ist
# "alles hinzufügen" sicher. Im Hauptordner passiert nichts.
#
# Ablauf am Ende der Session:
#   1. alle Änderungen committen (der Git-Guard prüft dabei)
#   2. Branch pushen (Sicherung, auch wenn das Ticket noch nicht fertig ist)
#   3. nur wenn in dieser Arbeit ein Ticket auf "Status: resolved" ging:
#      Pull Request anlegen und per Squash in master übernehmen
#
# Testlauf ohne Wirkung: DRY_RUN=1 bash .claude/hooks/ticket-ship.sh
set -uo pipefail

DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$DIR" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

GIT_DIR_ABS="$(cd "$(git rev-parse --git-dir)" && pwd)"
COMMON_ABS="$(cd "$(git rev-parse --git-common-dir)" && pwd)"
[ "$GIT_DIR_ABS" = "$COMMON_ABS" ] && exit 0   # Hauptordner, kein Worktree

LOG="$COMMON_ABS/ticket-ship.log"
run() { if [ "${DRY_RUN:-0}" = "1" ]; then echo "[dry-run] $*"; else "$@"; fi; }

ship() {
  echo "=== $(date '+%Y-%m-%d %H:%M:%S') $DIR"
  BRANCH="$(git symbolic-ref --short -q HEAD || true)"
  if [ -z "$BRANCH" ]; then
    BRANCH="session/$(date +%Y%m%d-%H%M%S)"
    run git switch -c "$BRANCH" || return 1
  fi

  git fetch -q origin master 2>/dev/null || true

  # Titel des Tickets, das in dieser Arbeit erledigt wurde (falls eins)
  RESOLVED_FILES="$( { git diff origin/master -- '.scratch/*/issues/*.md'; } 2>/dev/null \
    | awk '/^\+\+\+ b\//{f=substr($0,7)} /^\+Status: resolved/{print f}' | sort -u)"
  TITLE=""
  for f in $RESOLVED_FILES; do
    T="$(head -1 "$f" 2>/dev/null | sed 's/^# //')"
    [ -n "$T" ] && TITLE="${TITLE:+$TITLE; }$T"
  done

  if [ -n "$(git status --porcelain)" ]; then
    FILES="$(git status --porcelain | awk '{print $NF}' | head -5 | paste -sd ',' - | sed 's/,/, /g')"
    MSG="${TITLE:-wip: $FILES}"
    run git add -A || return 1
    run git commit -q -m "$MSG" -m "Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>" \
      || { echo "Commit blockiert (Guard?). Nichts gepusht."; return 1; }
  fi

  # nichts Neues gegenüber master: fertig
  [ -z "$(git log --oneline origin/master..HEAD 2>/dev/null)" ] && { echo "Keine neuen Commits."; return 0; }

  run git push -q -u origin "$BRANCH" || { echo "Push blockiert oder fehlgeschlagen."; return 1; }

  if [ -z "$TITLE" ]; then
    echo "Kein Ticket erledigt: Branch $BRANCH gesichert, nicht in master übernommen."
    return 0
  fi

  BODY="$(printf 'Erledigt: %s\n\nDateien:\n%s\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)' \
    "$TITLE" "$(git diff --name-only origin/master..HEAD | sed 's/^/- /')")"
  if ! gh pr view "$BRANCH" >/dev/null 2>&1; then
    run gh pr create --base master --head "$BRANCH" --title "Ticket: $TITLE" --body "$BODY" || return 1
  fi
  run gh pr merge "$BRANCH" --squash --delete-branch=false \
    || { echo "Merge nicht möglich (Konflikt?). PR bleibt offen."; return 1; }
  echo "Ticket in master übernommen: $TITLE"
}

if [ "${DRY_RUN:-0}" = "1" ]; then
  ship
else
  # im Hintergrund, damit das Beenden der Session nicht wartet
  ( ship >>"$LOG" 2>&1 ) </dev/null &
  disown 2>/dev/null || true
fi
exit 0
