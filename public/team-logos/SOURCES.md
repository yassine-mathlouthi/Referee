# Team badge sources and rights

Retrieved 17 November 2026. These small badges identify the teams named in Yassine's match log; they are not a sponsor strip, partnership claim or endorsement.

**Ownership:** Club emblems remain the intellectual property and trademarks of their respective clubs. Availability on Wikipedia or a logo archive is not a general reuse license. These assets are not licensed as original portfolio artwork. Consult each source's rights notice and obtain any permissions needed for the deployment jurisdiction or broader promotional use.

**Processing:** Images were resized proportionally to at most 128×128 pixels and encoded as transparent lossless RGBA WebP, without recoloring or redrawing. They are displayed at approximately 22–32 pixels, without white background tiles, and served locally; visitors make no requests to the source websites. White areas within the crest itself remain unchanged.

| Local asset | Identified club | Source / rights information |
| --- | --- | --- |
| `est.webp` | Espérance Sportive de Tunis | [Wikipedia file page](https://en.wikipedia.org/wiki/File:Esp%C3%A9rance_Sportive_de_Tunis_logo.png) |
| `stade-tunisien.webp` | Stade Tunisien | [Wikipedia file page](https://en.wikipedia.org/wiki/File:Enstadetunisien.png) |
| `omrane.webp` | Jeunesse Sportive d'El Omrane | [Wikipedia file page](https://en.wikipedia.org/wiki/File:JSO_Logo.png) |
| `megrine.webp` | Association Mégrine Sport | [Wikipedia file page](https://fr.wikipedia.org/wiki/Fichier:Association_M%C3%A9grine_Sport1.png), sourced there from the club's Facebook profile |
| `ariana.webp` | Association Sportive de l'Ariana | [Wikipedia file page](https://fr.wikipedia.org/wiki/Fichier:Association_sportive_de_l%27Ariana.png) |
| `hammam-lif.webp` | Club Sportif de Hammam Lif | [Football Logos](https://football-logos.cc/tunisia/cs-hammam-lif/), [usage disclaimer](https://football-logos.cc/license/) |
| `soliman.webp` | Avenir Sportif de Soliman | [Football Logos](https://football-logos.cc/tunisia/as-soliman/), [usage disclaimer](https://football-logos.cc/license/) |
| `marsa.webp` | Avenir Sportif de La Marsa | [Football Logos](https://football-logos.cc/tunisia/avenir-de-la-marsa/), [usage disclaimer](https://football-logos.cc/license/) |
| `ben-arous.webp` | Sporting Club de Ben Arous | [Wikipedia file page](https://fr.wikipedia.org/wiki/Fichier:SCBA_logo.png) |
| `oued-ellil.webp` | Avenir Sportif d'Oued Ellil | [Wikipedia file page](https://fr.wikipedia.org/wiki/Fichier:AS-Oued-Ellil.png) |
| `sidi-thabet.webp` | Club Sportif Sidi Thabet | [Transfermarkt club profile](https://www.transfermarkt.com/club-sportif-sidi-thabet/startseite/verein/113638) |
| `khadhra.webp` | El Khadhra Sport | [Transfermarkt club profile](https://www.transfermarkt.com/el-khadhra-sport/startseite/verein/97654) |
| `kalaa-sport.webp` | Kalâa Sport — Kalâa Seghira | [Wikipedia file page](https://fr.wikipedia.org/wiki/Fichier:Kal%C3%A2a_Sport.png), [club identity](https://fr.wikipedia.org/wiki/Kal%C3%A2a_Sport), [KS abbreviation](https://www.footballdatabase.eu/en/club/team/14402-kalaa_sport/2023-2024) |

Football Logos' files are curated, normalized, restored and vectorized by [Leo4815162342](https://github.com/Leo4815162342); the underlying club marks belong to their owners.

## Matching decisions

- Exact match-log aliases are centralized in `src/data/teams.ts`. No generic `ASM` lookup is used, since that abbreviation can refer to different teams.
- Mégrine's registry entry covers the supplied `AMS (Mégrine)` and `Mégrine (ASM)` labels. The club previously used the name Association sportive de Mégrine; see its [identity history](https://fr.wikipedia.org/wiki/Association_M%C3%A9grine_Sport).
- Yassine confirmed that the three original `KAS`/`Kalaa Kobra` entries mean **Kalâa Sport (KS), Kalâa Seghira**. The opponent labels are corrected. The match venues remain Soliman and Mégrine, as originally supplied.
- Borj el Amri, Carthage, Wardia, Dawar Hicher, Union Carthage and Fouchana Sport currently use neutral initials because a sufficiently verified badge was not obtained. No unrelated club badge is substituted.
- If a local badge fails to load, the same-size initials fallback preserves the layout.
