# DaVinci Resolve Free mit MCP: welche Version, was geht?

Type: research
Status: resolved

## Question

Mit welcher Version von DaVinci Resolve Free funktioniert https://github.com/samuelgursky/davinci-resolve-mcp auf macOS? Chris vermutet, dass neuere Free-Versionen die externe Scripting-API sperren und 21.0.4 (oder eine andere ältere Version) nötig ist. Ist diese Version noch offiziell ladbar, was kann der MCP in der Free-Version (Timeline bauen, Clips platzieren, Marker, Render), und wo sind die Grenzen gegenüber Studio?

## Answer

Recherche vom 2026-09-26.

- **Version:** DaVinci Resolve 21.0.4 Free (Build 21.0.4.5), Direkt-Download von Blackmagic, nicht App Store. Chris' "21.04" ist 21.0.4, die Vermutung stimmt.
- **Warum:** Externes Scripting war in Free schon immer gesperrt. Der MCP läuft in Free über eine In-App-Bridge (Python-Skript über Workspace > Scripts). Resolve 21.1 (08.09.2026) hat Python-Scripting in Free abgeschaltet, damit ist die Bridge dort tot. Belegt durch Release Notes 21.1 und MCP-Issue #203. 21.0.4.5 Free läuft laut Issue #143 auf macOS 15 Apple Silicon.
- **Verfügbar:** 21.0.4 steht weiter im offiziellen Download-Archiv (Registrierung nötig). Chris' Mac (M4 Pro, macOS 15.6.1) erfüllt die Anforderungen, Resolve ist noch nicht installiert, python.org 3.13 für die Bridge ist schon da.
- **Was geht in Free:** Timeline anlegen, Clips anhängen, Marker, Fusion-Text, Render-Queue, lokale Whisper-Analyse. Nicht: Studio-only-Funktionen wie Voice Isolation, Magic Mask, AI-Rauschreduzierung. Export bis 4K/60 fps, H.264/H.265 in 8-bit oder ProRes.
- **Risiken:** Nie auf 21.1 updaten, Projekte aus 21.1 öffnen nicht mehr in älteren Versionen. Bridge muss pro Sitzung von Hand gestartet werden. macOS-Upgrades können 21.0.4 brechen.
- Details, Versionsmatrix und Install-Schritte: `assets/davinci-free-mcp.md`
