---
title: "Singapore's towers turn sideways to the afternoon sun"
description: "Is \"no west sun\" luck or design? In OpenStreetMap, 73% of Singapore's tall slab blocks run east-west against 8% north-south, and older HDB towns go past 80%."
date: 2026-11-18T16:47:27+07:00
images:
  - singapore-towers-hero.webp
tags:
  - "openstreetmap"
  - "singapore"
  - "data"
  - "maps"
  - "agent-generated"
toc: true
---

If you browse flat listings in Singapore, there is one line you will see over and over: "North-South facing, no west sun". Property agents put it right next to the floor level and the walk to the MRT. It also shows up in every Reddit thread about what to check before buying.

The reasoning goes like this. Singapore is about one degree north of the equator, so the sun rises in the east, goes almost straight overhead, and sets in the west. A window facing west gets the low afternoon sun for hours, and the room behind it turns into an oven. A window facing north or south mostly sees the sky.

I was curious if this is actually true at scale. Is a north-south unit just something a few lucky flats get, or is it something developers and the government plan for when they build a whole estate? From above, the HDB blocks do look oddly tidy, long boxes lying in the same direction, estate after estate. OpenStreetMap has the footprint of almost every building in the country, so I can just measure it.

![A flat illustration of an HDB estate seen from above: long slab blocks all lying parallel, their long window facades in cool blue shadow, while the narrow windowless end walls facing a low orange sun on the left horizon are the only lit faces. Long shadows rake across the grass between the palms and the playground.](/images/singapore-towers-hero.webp)

## How I measured

I cut Singapore out of the OpenStreetMap planet file and took every residential building that:

- is tagged with 10 or more floors, so it is a tower and not a house,
- has a footprint at least 2.5 times longer than it is wide, so it is a slab with a clear "long side".

That leaves 3,502 blocks. For each one I fit the smallest rotated rectangle around the footprint and take the compass bearing of its long side. 90° means the block lies east-west, so the windows on the long sides face north and south. 0° means it lies north-south, and the long sides get the morning and afternoon sun.

If the blocks were placed at random, about a third would land in each of three buckets: east-west (within 30°), north-south (within 30°), or diagonal.

## The map

Each dot is one block, drawn as a short line along its long side. Blue ones face north and south, orange ones face east and west, grey ones are diagonal.

Some things to try:

- Switch on the low-rise layer to compare with landed houses and terraces.
- Zoom into Ang Mo Kio or Bukit Batok and watch the compass rose fill in.
- Press "Spin them randomly" to see what the map would look like if nobody cared.
- Filter by build year and look at what happens after 1995.

<div id="osm-orient-app" data-src="/osm-orient/blocks.json"></div>
<script src="/osm-orient/orient.js?v=3" defer></script>

## The numbers

- **Towers:** 73% lie east-west, 8% lie north-south, the rest are diagonal. Random placement would give about 33% each.
- **Low-rise and landed:** 27% east-west, 41% north-south. Houses and terraces follow their plots, and the plots follow the roads. So the same method over the same island doesn't produce the tower pattern by itself.
- **Ang Mo Kio, Bukit Batok, Bukit Merah:** 83% to 87% of towers lie east-west. Almost none lie north-south.
- **Queenstown, Jurong West, Punggol:** 49% to 59%. Much looser.

## Maybe it's just the roads?

Blocks sit along roads, and a lot of roads in Singapore run east-west. Maybe the blocks just follow the road and the sun has nothing to do with it.

So I checked the nearest road for each of the 1,995 towers with 12 or more floors, and grouped them by which way that road runs. The 190 next to roads at an in-between angle are left out.

![Three bars, one per road direction. Next to east-west roads, 95% of 760 blocks lie east-west. Next to north-south roads, 71% of 390 blocks still lie east-west and only 21% follow the road. Next to diagonal roads, 48% of 655 blocks lie east-west, 45% are diagonal and 6% lie north-south.](/images/singapore-towers-roads.svg)

Next to east-west roads, the road and the sun want the same thing, so that row doesn't tell much.

The interesting row is the north-south roads. If blocks just followed the road, most of them would run north-south too. Only 21% do. The rest mostly sit sideways to the road, still lying east-west. Diagonal roads look similar: almost half of the blocks follow the diagonal, but only 6% turn north-south.

So the road matters when the layout forces it, but when the road and the sun disagree, most blocks still turn east-west.

## Did the planners think about it?

For HDB, yes. A [BiblioAsia article on public housing](https://biblioasia.nlb.gov.sg/all-sections/vol-12-issue-3-oct-dec-2016-public-housing-private-lives/) quotes Liu Thai Ker, HDB's chief planner back then: the typical guiding principle is to "orientate the building towards north-south". He also said you can't have every flat facing that way, so some face east-west, with trees or taller blocks shading them.

There is also an [academic paper on HDB heat and airflow](https://www.mdpi.com/2073-4433/13/12/2118). In the slab blocks they modelled, in Ang Mo Kio and Tampines, the flats sit along the long east-west axis. The end walls facing east or west had no windows in their case, and the rooms behind them stayed cooler.

I couldn't find a written rule in an official HDB or URA document, most of what I found is secondary sources. Wind might be part of it too. The prevailing winds here come from the north/northeast and south/southeast, so an east-west block catches the breeze on its long sides. Sun and wind point the same way in Singapore, so I can't separate the two with footprints alone.

Still, for the older HDB estates, the "no west sun" unit that agents advertise looks like the default layout rather than a lucky one.

## Newer estates are less strict

Only 453 of the 3,502 towers have a build year in OpenStreetMap, so take this with a grain of salt:

| Built | Towers | Lie east-west | Lie north-south |
|---|---|---|---|
| Before 1980 | 248 | 83% | 2% |
| 1980 to 1994 | 144 | 84% | 1% |
| 1995 to 2004 | 36 | 42% | 36% |
| 2005 or later | 25 | 28% | 32% |

Newer towns like Punggol and Sengkang are messier. The paper above mentions later generations moved to point blocks and more complicated floor plans, and a block with a courtyard doesn't have a clear long side anyway. I haven't checked if that explains all of it.

## Caveats

- **The control outside Singapore is too small.** The same file covers southern Johor and Batam, but there are only 69 tower slabs with a floor count there. 57% of them lie east-west, lower than Singapore, but 69 is too few to conclude anything.
- **OpenStreetMap isn't a census.** Not every block has a floor count, and towers without one are left out. Footprints are only as good as the volunteers who traced them.
- **Orientation isn't the same as sun exposure.** Trees, neighbouring blocks and the shade from a long corridor change how much sun a wall actually gets.
- **The town boxes are rectangles I drew by hand**, not official planning areas.
- **This shows what the blocks do, not why.** The sun fits the data and what the planner said, but wind, plot shapes and standard block designs could all push the same way.

The data is OpenStreetMap, © OpenStreetMap contributors, ODbL. I did the analysis with a short Python script (pyosmium and shapely), and an AI agent helped me draft this post.
