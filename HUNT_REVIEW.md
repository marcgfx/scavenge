# Hunt review and update summary

## Main issues found

- Most `*-hunt.js` files had a JavaScript syntax error around stop 3, so those hunts could fail to load.
- Many stop 4/5 entries looked auto-generated, such as generic “Viewpoint” or “Old Town” names that did not match meaningful real-world places.
- Tasks were repetitive: most were variations of “take a photo or note one detail.”
- Several routes did not clearly guide the player through a place; the revised versions are arranged as short one-way walks or compact loops.

## Update approach

- Local Zug-area towns keep 5 stops each.
- Larger city hunts now have more stops: Zug has 8, Brussels and Luxembourg City have 10.
- Tasks now vary between observation, photo framing, counting, sound/listening, imagination, mini roleplay, and quick team choices.
- Routes are written to reduce run-back by moving outward, along a waterfront, through a centre, or in a loose loop.
- GPS radii were adjusted slightly per hunt to account for parks, viewpoints, rural edges, and mobile GPS accuracy.

## Route overview

| Hunt | Stops | Approx. route | Character |
|---|---:|---:|---|
| Baar | 5 | 2.9 km | Village centre to Lorze / Höllgrotten approach |
| Brussels | 10 | 3.5 km | Central icons, royal area, comics, oddities |
| Cham | 5 | 1.3 km | Station to parks and lakeside |
| Hünenberg | 5 | 2.6 km | Village, hamlet, and Reuss landscape |
| Luxembourg City | 10 | 2.1 km | Fortress, viewpoints, old town, valley edge |
| Menzingen | 5 | 2.0 km | Village, quiet institutions, hill viewpoint |
| Neuheim | 5 | 1.3 km | Village core to countryside and forest edge |
| Oberägeri | 5 | 1.3 km | Village, church, lake, and lakeside path |
| Risch-Rotkreuz | 5 | 1.8 km | Station, centre, park, modern quarter |
| Steinhausen | 5 | 1.3 km | Station, village centre, church, park |
| Unterägeri | 5 | 1.5 km | Village, Lorze, lake, and Badi side |
| Walchwil | 5 | 1.1 km | Station, shore, slope, and lake finish |
| Zug | 8 | 2.2 km | Station, old town, castle, lake promenade |

## Files changed

- Rewrote all `*-hunt.js` files.
- Updated `index.html` copy and bumped version to `0.1.4`.
- Updated the Luxembourg page title spelling while preserving the existing `luxemburg.html` filename.
