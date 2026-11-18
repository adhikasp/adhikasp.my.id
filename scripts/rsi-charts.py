# /// script
# requires-python = ">=3.11"
# dependencies = ["matplotlib", "pyyaml"]
# ///
"""Charts for the RSI blog post. Usage: uv run rsi_charts.py <metr_yaml> <outdir>
5.2 in wide so text stays readable on a 390 px phone. Title + labels + big direct numbers only:
no subtitles, footnotes or explanatory sentences in a chart (Adhika, 2026-11-18); the post text explains."""
import sys, datetime as dt, logging
import yaml
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
logging.getLogger("matplotlib.font_manager").setLevel(logging.ERROR)

YAML, OUT = sys.argv[1], sys.argv[2]
SURF = "#fcfcfb"; INK = "#1f2328"; INK2 = "#4b5260"; MUTED = "#6b7280"; GRID = "#ebebe6"
BLUE = "#2a78d6"; BLUE_L = "#cfe0f6"; BLUE_XL = "#e6eefa"; BLUE_D = "#1d5aa8"
ORANGE = "#eb6834"; ORANGE_L = "#fbd9c9"; ORANGE_XL = "#fdece4"; ORANGE_D = "#c4501f"; GREY = "#8b919c"
X = "×"
plt.rcParams.update({
    "svg.fonttype": "none", "font.family": ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
    "font.size": 10.5, "axes.edgecolor": GRID, "axes.labelcolor": INK2, "xtick.color": INK2,
    "ytick.color": INK2, "axes.facecolor": SURF, "figure.facecolor": SURF, "text.color": INK,
    "xtick.major.size": 0, "ytick.major.size": 0, "xtick.major.pad": 6,
})
W = 5.2


def finish(fig, ax, title, name):
    fig.text(0.035, 1 - 0.14 / fig.get_figheight(), title, fontsize=14, fontweight="bold", color=INK, ha="left", va="top")
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    fig.savefig(f"{OUT}/{name}", format="svg", metadata={"Date": None})
    plt.close(fig)


def rbar(ax, fig, y, x0, x1, lw, color, z=2):
    """Round-capped bar whose visible ends sit exactly on x0 and x1."""
    pos = ax.get_position()
    lo, hi = ax.get_xlim()
    r = (lw / 2) / (pos.width * fig.get_figwidth() * 72) * (hi - lo)
    if x1 - x0 <= 2 * r:
        ax.scatter([(x0 + x1) / 2], [y], s=lw ** 2, color=color, zorder=z, linewidth=0)
    else:
        ax.plot([x0 + r, x1 - r], [y, y], color=color, linewidth=lw, solid_capstyle="round", zorder=z)


# 1. METR time horizons -------------------------------------------------------
d = yaml.safe_load(open(YAML))["results"]
rows = []
for k, v in d.items():
    m = v["metrics"]
    rd = v["release_date"]
    rd = rd if isinstance(rd, dt.date) else dt.date.fromisoformat(str(rd))
    rows.append((rd, k, m["p50_horizon_length"]["estimate"], m["p80_horizon_length"]["estimate"]))
rows.sort()
fig, ax = plt.subplots(figsize=(W, 4.8))
fig.subplots_adjust(left=0.15, right=0.97, top=0.89, bottom=0.075)
xs = [r[0] for r in rows]
ax.axhspan(480, 2600, color=BLUE_XL, linewidth=0, zorder=0)
ax.axhline(480, color=BLUE_D, linewidth=1, linestyle=(0, (4, 3)), zorder=1)
ax.text(dt.date(2019, 2, 1), 560, "a full working day", fontsize=10, color=BLUE_D, fontweight="bold")
for col, idx in ((BLUE, 2), (ORANGE, 3)):
    ys = [r[idx] for r in rows]
    ax.plot(xs, ys, color=col, linewidth=1.8, alpha=0.5, zorder=2)
    ax.scatter(xs, ys, s=22, color=col, zorder=3, edgecolor=SURF, linewidth=1)
ax.set_yscale("log")
ax.set_yticks([1, 10, 60, 480], ["1 min", "10 min", "1 hour", "8 hours"])
ax.yaxis.set_minor_locator(matplotlib.ticker.NullLocator())
ax.set_ylim(0.008, 2600)
ax.grid(axis="y", color=GRID, linewidth=0.8); ax.set_axisbelow(True)
for k, t, o in (("gpt2", "GPT-2", (-6, 8)), ("gpt_4", "GPT-4", (-14, 9))):
    r = next(r for r in rows if r[1] == k)
    ax.annotate(t, (r[0], r[2]), xytext=o, textcoords="offset points", fontsize=10, color=INK2)
last = rows[-1]
ax.annotate("Mythos Preview", (last[0], last[2]), xytext=(-8, 6), textcoords="offset points",
            fontsize=10, color=INK2, ha="right", va="bottom")
ax.annotate(f"{last[2]/60:.0f} h", (last[0], last[2]), xytext=(7, 0), textcoords="offset points",
            fontsize=13, color=BLUE_D, fontweight="bold", ha="left", va="center")
ax.annotate(f"{last[3]/60:.0f} h", (last[0], last[3]), xytext=(7, 0), textcoords="offset points",
            fontsize=13, color=ORANGE_D, fontweight="bold", ha="left", va="center")
ax.text(dt.date(2021, 7, 1), 0.075, "● succeeds half the time", color=BLUE, fontsize=10.5, fontweight="bold")
ax.text(dt.date(2021, 7, 1), 0.032, "● succeeds 4 times in 5", color=ORANGE, fontsize=10.5, fontweight="bold")
ax.xaxis.set_major_locator(mdates.YearLocator(2)); ax.xaxis.set_major_formatter(mdates.DateFormatter("%Y"))
ax.set_xlim(dt.date(2018, 12, 1), dt.date(2027, 5, 1))
ax.set_xticks([dt.date(y, 1, 1) for y in (2020, 2022, 2024, 2026)])
ax.spines["bottom"].set_color(GRID)
finish(fig, ax, "How long a task an AI agent finishes alone", "rsi-horizon.svg")

# 2. Acceleration: bars grow from "same pace" -----------------------------------
est = [("Anthropic · METR", 1.9, BLUE), ("Anthropic · Mythos 5.2 card", 1.88, BLUE),
       ("All frontier labs · METR", 1.4, GREY),
       ("Google · public Gemini", 0.118 / 0.091, ORANGE), ("Google · incl. internal", 0.107 / 0.097, ORANGE)]
fig, ax = plt.subplots(figsize=(W, 4.5))
fig.subplots_adjust(left=0.035, right=0.965, top=0.83, bottom=0.11)
n = len(est)
ax.set_xlim(0.97, 2.32); ax.set_ylim(-0.55, n - 0.2)
ax.axvline(1, color=INK2, linewidth=1.3, zorder=1)
ax.axvline(2, color=BLUE_D, linewidth=1.1, linestyle=(0, (4, 3)), zorder=1)
ax.text(2.0, n - 0.12, f"Anthropic's 2{X} threshold", fontsize=10, color=BLUE_D, fontweight="bold",
        ha="center", va="bottom", clip_on=False)
for i, (lab, p, c) in enumerate(est):
    y = n - 1 - i
    ax.text(1.015, y + 0.33, lab, fontsize=10.5, color=INK, va="center")
    rbar(ax, fig, y, 1.0, 2.25, 13, GRID, z=1)
    rbar(ax, fig, y, 1.0, p, 13, c)
    ax.text(p + 0.03, y, f"{p:.1f}{X}", fontsize=13, color=INK, fontweight="bold", va="center", zorder=4,
            bbox=dict(facecolor=GRID, edgecolor="none", pad=0.6))
ax.set_yticks([])
ax.set_xticks([1, 1.5, 2], [f"1{X}  same pace", f"1.5{X}", f"2{X}"])
ax.get_xticklabels()[0].set_ha("left")
ax.spines["bottom"].set_visible(False)
finish(fig, ax, "Is AI progress speeding up?", "rsi-acceleration.svg")

# 3. OpenAI evals: GPT-6 Astra -> GPT-6.2 Astra, change in a pill --------------
evals = [("Research debugging", 78.05, 81.85), ("Kernel writing", 66.72, 76.92),
         ("NanoGPT training speedup", 7.73, 42.87), ("Post-training", 76.97, 74.79),
         ("MLE-Bench percentile", 93.80, 96.06)]
fig, ax = plt.subplots(figsize=(W, 4.7))
fig.subplots_adjust(left=0.035, right=0.97, top=0.82, bottom=0.075)
n = len(evals)
ax.set_xlim(-2, 121); ax.set_ylim(-0.55, n - 0.25)
for j, (lab, a, b) in enumerate(evals):
    y = n - 1 - j
    hot = j == 2
    c = ORANGE if hot else BLUE
    ax.text(0, y + 0.36, lab, fontsize=10.5, color=INK, va="center", fontweight="bold" if hot else "normal")
    ax.plot([0, 100], [y, y], color=GRID, linewidth=1.2, zorder=1)
    ax.plot([a, b], [y, y], color=c, linewidth=4 if hot else 3, alpha=0.55, zorder=2, solid_capstyle="round")
    ax.scatter([a], [y], s=60, color=SURF, edgecolor=c, linewidth=2, zorder=3)
    ax.scatter([b], [y], s=70, color=ORANGE_D if hot else BLUE_D, edgecolor=SURF, linewidth=1.5, zorder=4)
    if hot:
        ax.text(a, y - 0.3, f"{a:.0f}", ha="center", fontsize=10, color=INK2)
        ax.text(b, y - 0.3, f"{b:.0f}", ha="center", fontsize=10, color=INK, fontweight="bold")
    delta = b - a
    s = f"+{delta:.0f}" if delta >= 0 else f"−{abs(delta):.0f}"
    ax.text(112, y, s, ha="center", va="center", fontsize=14 if hot else 11.5, fontweight="bold",
            color=ORANGE_D if hot else INK2,
            bbox=dict(boxstyle="round,pad=0.35,rounding_size=0.8", facecolor=ORANGE_L if hot else GRID, edgecolor="none"))
ax.text(112, n - 0.5, "change", ha="center", fontsize=9.5, color=MUTED)
ax.set_yticks([])
ax.set_xticks([0, 25, 50, 75, 100])
ax.spines["bottom"].set_color(GRID)
h1 = plt.Line2D([], [], marker="o", linestyle="", markersize=8, markerfacecolor=SURF, markeredgecolor=BLUE, markeredgewidth=2)
h2 = plt.Line2D([], [], marker="o", linestyle="", markersize=8.5, color=BLUE_D, markeredgecolor=SURF)
fig.legend([h1, h2], ["GPT-6 Astra", "GPT-6.2 Astra"], loc="upper left", bbox_to_anchor=(0.012, 0.905), ncol=2,
           frameon=False, fontsize=10.5, handletextpad=0.2, columnspacing=1.2)
finish(fig, ax, "OpenAI's self-improvement evals", "rsi-openai-evals.svg")

# 4. Doing vs choosing ----------------------------------------------------------
items = [
    ("Doing", "Weak-to-strong gap closed by agents", 97, "97%"),
    ("Doing", "Anthropic tasks done with no corrections", 91, "91%"),
    ("Doing", "Anthropic R&D that Claude works on", 90, "90%+"),
    ("Doing", "DeepMind production code written by AI", 75, "75%+"),
    ("Choosing", "Anthropic R&D that Claude leads", 26, "26%"),
    ("Choosing", "Claude's next step beats a good researcher's", 20, "20%"),
    ("Choosing", "Research gains an agent rediscovered", 15, "15%"),
    ("Choosing", "Google PRs fully handed to an agent", 11.9, "12%"),
]
fig, ax = plt.subplots(figsize=(W, 6.1))
fig.subplots_adjust(left=0.035, right=0.97, top=0.925, bottom=0.02)
n = len(items)
ax.set_xlim(0, 116); ax.set_ylim(-0.5, n + 0.85)
ys = [n - 1 - i + (0.6 if it[0] == "Doing" else 0) for i, it in enumerate(items)]
for i, (y, (g, lab, v, txt)) in enumerate(zip(ys, items)):
    doing = g == "Doing"
    rbar(ax, fig, y, 0, 100, 11, BLUE_XL if doing else ORANGE_XL, z=1)
    rbar(ax, fig, y, 0, v, 11, BLUE if doing else ORANGE)
    ax.text(0, y + 0.36, lab, fontsize=10.2, color=INK, va="center")
    ax.text(102.5, y, txt, va="center", ha="left", fontsize=12, color=BLUE_D if doing else ORANGE_D, fontweight="bold")
    if i == 0:
        ax.plot([23, 23], [y - 0.16, y + 0.16], color=SURF, linewidth=2.2, zorder=3)
        ax.text(23, y - 0.33, "humans: 23%", ha="center", va="center", fontsize=9, color=INK2)
ax.text(0, ys[0] + 0.95, "DOING", fontsize=11, color=BLUE_D, fontweight="bold", va="center")
ax.text(0, ys[4] + 0.95, "CHOOSING", fontsize=11, color=ORANGE_D, fontweight="bold", va="center")
ax.set_yticks([]); ax.set_xticks([])
ax.spines["bottom"].set_visible(False)
finish(fig, ax, "Doing is nearly automated. Choosing is not", "rsi-doing-choosing.svg")
print("ok")
