#!/bin/bash
# PreToolUse-Hook für YT-OS: alles, was öffentlich macht, braucht Chris' Bestätigung.
# Gibt "ask" zurück, damit Claude Code nachfragt statt still auszuführen.
set -uo pipefail
CMD="$(jq -r '.tool_input.command // empty')"
if printf '%s' "$CMD" | grep -Eiq 'youtube.*(upload|insert|publish)|videos\.insert|youtubeuploader|gh repo edit.*visibility|gh repo create.*--public|gh gist create.*--public|(linkedin|instagram|skool).*(post|publish)'; then
  jq -n '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"ask",permissionDecisionReason:"publish-gate (YT-OS rules/never.md 1): Das macht etwas öffentlich. Chris muss es vorher gesehen und freigegeben haben."}}'
fi
exit 0
