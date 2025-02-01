---
title: "Indonesia Postal Code"
date: 2025-02-02T00:12:17+07:00
description: A visualization of Indonesia's postal code regions in hierarichal manner.
tags:
  - "software-development"
  - "data"
---

Today, I watch a video from CGP Grey on postal code patterns.

{{< youtube 1K5oDtVAYzk >}}

I was curious about the postal code pattern in Indonesia, so I decided to visualize it in  <a href="https://kodepos.adhikasp.my.id/">Kodepos</a>.

![kodepos-1](/images/kodepos-1.png)

I built it with help of [Cursor](https://www.cursor.com/). Lately I found it making producing code and exploring new ideas much more fun. As I can focus on what I want to do instead of how to do it and figuring out how to use this random Python library or trying to understand how pandas dataframe works.

Some interesting observations I had while reading the data is the postal code do have pattern of hierarchy, but still have its exceptions. The Wikipedia article for [Postal Code in Indonesia](https://id.wikipedia.org/wiki/Daftar_kode_pos_di_Indonesia) mentioned that the postal code is divided into 5 levels:

1. First digit represents the postal office region code
2. Second digit represents the regency/city code
3. Third digit (also) represents the regency/city code
4. Fourth digit represents the district code within the regency/city
5. Fifth digit represents the village/subdistrict code

But those rule doesn't apply for Jakarta capital region and its Bodetabek area.

Another interesting things is the granualarity and coverage of area. More populated area like Java island have more unique code count and each code cover smaller area.

![kodepos-java](/images/kodepos-java.png)

In more sparse area like Sulawesi, the density is concentrated in cities and inland region is more spares.

![kodepos-sulawesi](/images/kodepos-sulawesi.png)

The dataset is taken from [sooluh/kodepos](https://github.com/sooluh/kodepos).

In total it has 83761 data point and 10671 unique postal code in Indonesia.

On average, an area is sharing its postal code with 7 different place.

![kodepos-distribution](/images/kodepos-distribution.png)

Few more things that I want to explore:

- Learning up statistics. Can I quantify the correlation between postal code distribution and population density?
- Data visualization. Current map plotting is very basic, building a convex hull. Can I make it map directly with the city area and have more seamless blending when transitioning between different hierarchy level?