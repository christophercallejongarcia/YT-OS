#!/bin/bash
# PreToolUse-Hook für YT-OS: blockiert harte KI-Marker in Publikumstexten.
# Nutzt die deterministische Stufe des globalen slop-check-Skills.
set -uo pipefail
LINT="$HOME/.claude/skills/slop-check/scripts/slop-lint.sh"
[ -x "$LINT" ] || exit 0
INPUT="$(cat)"
FP="$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty')"
case "$FP" in
  */YT-OS/videos/*.md|*/YT-OS/substrate/playbooks/*.md) ;;
  *) exit 0 ;;
esac
CONTENT="$(printf '%s' "$INPUT" | jq -r '.tool_input.content // .tool_input.new_string // ([.tool_input.edits[]?.new_string] | join("\n")) // empty')"
[ "$(printf '%s' "$CONTENT" | wc -c)" -lt 200 ] && exit 0
REPORT="$(printf '%s' "$CONTENT" | "$LINT" --block 2>/dev/null)"
[ $? -ne 2 ] && exit 0
FINDINGS="$(printf '%s' "$REPORT" | grep 'HART' | sort -u | head -5 | paste -sd ';' -)"
jq -n --arg r "slop-gate (YT-OS rules/always.md 1): harte KI-Marker gefunden: $FINDINGS. Umschreiben und neu speichern." \
  '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'
