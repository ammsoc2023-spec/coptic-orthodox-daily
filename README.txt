Coptic Orthodox Daily – offline PWA (EN / عربي / Coptic). Developed by ZB.
Static files only: drag this folder (or Coptic_Calendar_App.zip) onto Netlify Deploys. Nothing has been published.
Open the URL on the phone once (it caches the whole calendar), then:
 iPhone (Safari): Share → Add to Home Screen.   Android (Chrome): menu ⋮ → Install app / Add to Home screen.
Data: data/YYYY-MM.json (one per month 2026-11 … 2027-12), data/index.json (grid + search), data/prayers.json (Agpeya), data/about.json.
Rebuild (in /workspace/coptic): python3 tools/build_base.py ; python3 content/src/build_content.py ; python3 tools/export.py ; python3 tools/mksw.py
Coverage: 416/416 days with all readings in full EN+AR, commentary + notes (EN+AR) on 416/416 days, Teaching + "What we should remember" (EN+AR) for 1,016/1,016 Synaxarium entries (868 stories), Agpeya 147 prayers (Prime, Vespers, Compline, Midnight) EN/AR, Coptic 146. Sources and gaps: ../SOURCES.md (also in the zip).

Bible tabs (need internet; text is not copied or stored): see PROGRESS.md 2026-11-20.
