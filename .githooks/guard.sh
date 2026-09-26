#!/bin/bash
# Git-Guard für das öffentliche YT-OS-Repo (rules/never.md 2).
# Läuft als pre-commit (gestagte Dateien) und pre-push (alle zu pushenden Dateien).
# Greift für jedes Werkzeug: Claude Code, Codex und Handarbeit.
set -uo pipefail
MODE="${1:-commit}"
if [ "$MODE" = "push" ]; then
  FILES=""
  while read -r _ local_sha _ remote_sha; do
    [ -z "${local_sha:-}" ] && continue
    [[ "$local_sha" =~ ^0+$ ]] && continue
    if [[ "$remote_sha" =~ ^0+$ ]]; then RANGE="$local_sha"; else RANGE="$remote_sha..$local_sha"; fi
    FILES+="$(git log --name-only --diff-filter=ACMR --format= "$RANGE")"$'\n'
  done
else
  FILES="$(git diff --cached --name-only --diff-filter=ACMR)"
fi
FILES="$(printf '%s\n' "$FILES" | sed '/^$/d' | sort -u)"
[ -z "$FILES" ] && exit 0
BAD=""
while IFS= read -r f; do
  case "$f" in
    *.mp4|*.mov|*.mkv|*.m4a|*.wav|*.mp3|*.braw|*.drp|*.vtt|*.srt) BAD+="$f (Video/Audio/Untertitel)"$'\n' ;;
    *transkript*|*transcript*|*Transkript*|*Transcript*) BAD+="$f (Transkript)"$'\n' ;;
    .env|.env.*|*/.env|*.pem|*credentials*|*secret*) BAD+="$f (Zugangsdaten)"$'\n' ;;
    */private/*|substrate/raw/*) BAD+="$f (privater Ordner)"$'\n' ;;
  esac
  if [ -f "$f" ]; then
    SIZE=$(wc -c < "$f" | tr -d ' ')
    [ "$SIZE" -gt 10000000 ] && BAD+="$f (größer als 10 MB)"$'\n'
    if grep -EIq '(sk-(ant-)?[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|apify_api_[A-Za-z0-9]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)' "$f"; then
      BAD+="$f (sieht nach API-Schlüssel aus)"$'\n'
    fi
  fi
done <<< "$FILES"
if [ -n "$BAD" ]; then
  echo "YT-OS Guard: $MODE blockiert. Das Repo ist öffentlich, diese Dateien gehören nicht hinein:" >&2
  printf '%s' "$BAD" | sed 's/^/  - /' >&2
  echo "Regel: rules/never.md 2. Datei aus dem Commit nehmen oder nach .gitignore verschieben." >&2
  exit 1
fi
exit 0
