# /// script
# requires-python = ">=3.11"
# dependencies = ["matplotlib"]
# ///
"""Vals RSI Index post-training chart for the RSI post. Usage: uv run scripts/rsi-vals-chart.py static/images
Data: vals.ai/benchmarks/rsi_index, task table in Raw mode, Post column (read 2026-11-18 in Chrome).
Same style rules as rsi-charts.py: 5.2 in wide, title + short labels + big numbers, no sentences."""
import sys, logging
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
logging.getLogger("matplotlib.font_manager").setLevel(logging.ERROR)

OUT = sys.argv[1]
SURF = "#fcfcfb"; INK = "#1f2328"; INK2 = "#4b5260"; MUTED = "#6b7280"; GRID = "#ebebe6"
BLUE = "#2a78d6"; ORANGE = "#eb6834"; GREY = "#8b919c"
plt.rcParams.update({
    "svg.fonttype": "none", "font.family": ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
    "font.size": 10.5, "axes.edgecolor": GRID, "axes.labelcolor": INK2, "xtick.color": INK2,
    "ytick.color": INK2, "axes.facecolor": SURF, "figure.facecolor": SURF, "text.color": INK,
    "xtick.major.size": 0, "ytick.major.size": 0, "xtick.major.pad": 6,
})

PARENT, REF = 35.38, 59.42
POST = {  # finance-agent accuracy of the submitted model, %
    "Claude Fable 5.2": 40.13, "Claude Opus 5.5": 44.53, "Claude Fable 5.1": 39.99, "Claude Opus 5": 42.20,
    "Gemini 4 Argon": 36.11, "GPT-6.2 Astra": 33.46, "GPT-6 Sol": 36.23, "Gemini 4 Carbon": 34.74,
    "GPT-6 Astra": 35.46, "GPT-6.1 Sol": 29.11, "Grok 4.6": 22.06, "Wonder Full": 7.01,
    "Claude Fable 5": 34.30, "Claude Opus 4.8": 35.38, "GPT-5.6 Sol": 33.83, "GLM 5.3": 33.63,
    "Qwen 3.8 Max": 32.07, "Kimi K3": 35.38, "Grok 4.7": 24.73, "Gemini 3.8 Flash": 3.54,
    "Muse Spark 1.3 Max": 2.37, "Claude Opus 4.7": 17.42, "Gemini 3.7 Flash": 31.51, "GPT 5.5": 1.50,
    "GPT 5.2": 9.75, "GPT 5.4": 34.52, "Claude Opus 4.5": 0.00, "Kimi K2.5": 8.10,
}
assert len(POST) == 28
below = sorted(v for v in POST.values() if v < PARENT)
same = [v for v in POST.values() if v == PARENT]
above = sorted(v for v in POST.values() if v > PARENT)
assert (len(below), len(same), len(above)) == (19, 2, 7)

fig, ax = plt.subplots(figsize=(5.2, 3.5))
fig.subplots_adjust(left=0.04, right=0.96, top=0.62, bottom=0.13)

# dot strip: stack dots that sit within 1.6 points of each other
placed = []
for v in sorted(POST.values()):
    level = 0
    while any(abs(v - pv) < 1.6 and pl == level for pv, pl in placed):
        level += 1
    placed.append((v, level))
for v, level in placed:
    c = ORANGE if v < PARENT else (GREY if v == PARENT else BLUE)
    ax.scatter([v], [level], s=70, color=c, zorder=3, linewidth=0)

top = max(l for _, l in placed)
ax.set_ylim(-0.8, top + 1.6)
ax.set_xlim(-2, 63)
for x, lab, col in ((PARENT, "starting model\n35.4%", INK), (REF, "reference\n59.4%", MUTED)):
    ax.axvline(x, color=col, linewidth=1.2, linestyle=(0, (3, 2)) if col == MUTED else "-", zorder=2)
    ax.text(x, top + 1.5, lab, ha="center", va="bottom", fontsize=10, color=col, linespacing=1.15)
ax.text(46.3, 0, "best 44.5%", ha="left", va="center", fontsize=10, color=BLUE)

ax.set_yticks([])
ax.set_xticks([0, 20, 40, 60]); ax.set_xticklabels(["0%", "20%", "40%", "60%"])
for s in ("top", "right", "left"):
    ax.spines[s].set_visible(False)

# big counts
fig.text(0.035, 0.955, "Fine-tuning a model: most runs made it worse", fontsize=14, fontweight="bold", color=INK, ha="left", va="top")
for x, n, lab, col in ((0.035, "19", "worse", ORANGE), (0.30, "2", "same", GREY), (0.50, "7", "better", BLUE)):
    fig.text(x, 0.80, n, fontsize=26, fontweight="bold", color=col, ha="left", va="center")
    fig.text(x + (0.085 if len(n) == 2 else 0.05), 0.795, lab, fontsize=12, color=col, ha="left", va="center")

fig.savefig(f"{OUT}/rsi-vals-post-training.svg", format="svg", metadata={"Date": None})
print("wrote", f"{OUT}/rsi-vals-post-training.svg")
