# /// script
# requires-python = ">=3.11"
# dependencies = ["requests"]
# ///
"""Run image jobs on OpenRouter. Usage: uv run gen.py jobs.json outdir [--n 2] [--only substr]"""
import base64, json, os, sys, concurrent.futures as cf, pathlib, time
import requests

jobs_path, out = sys.argv[1], pathlib.Path(sys.argv[2])
n = int(sys.argv[sys.argv.index("--n") + 1]) if "--n" in sys.argv else 2
only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else ""
model = os.environ.get("MODEL", "google/gemini-nano-banana-2.1")
out.mkdir(parents=True, exist_ok=True)
key = os.environ["OPENROUTER_API_KEY"]
jobs = [j for j in json.load(open(jobs_path, encoding="utf-8")) if only in j["name"]]


def b64(p):
    return "data:image/png;base64," + base64.b64encode(open(p, "rb").read()).decode()


def run(job, i):
    content = [{"type": "text", "text": job["prompt"]}]
    for p in job.get("images", []):
        content.append({"type": "image_url", "image_url": {"url": b64(p)}})
    body = {"model": model, "modalities": ["image", "text"],
            "messages": [{"role": "user", "content": content}],
            "image_config": {"aspect_ratio": job.get("aspect", "1:1"), "image_size": "2K"}}
    for attempt in range(3):
        try:
            r = requests.post("https://openrouter.ai/api/v1/chat/completions", timeout=300,
                              headers={"Authorization": f"Bearer {key}"}, json=body)
            r.raise_for_status()
            d = r.json()
            msg = d["choices"][0]["message"]
            imgs = msg.get("images") or []
            if not imgs:
                raise RuntimeError(f"no image: {str(msg.get('content'))[:200]}")
            url = imgs[0]["image_url"]["url"]
            raw = base64.b64decode(url.split(",", 1)[1])
            ext = "png" if url.startswith("data:image/png") else "jpg"
            f = out / f"{job['name']}-{i}.{ext}"
            f.write_bytes(raw)
            cost = d.get("usage", {}).get("cost")
            return f"{f.name} ok cost={cost}"
        except Exception as e:  # noqa: BLE001
            err = str(e)[:300]
            time.sleep(3)
    return f"{job['name']}-{i} FAILED {err}"


with cf.ThreadPoolExecutor(8) as ex:
    futs = [ex.submit(run, j, i) for j in jobs for i in range(1, n + 1)]
    for f in cf.as_completed(futs):
        print(f.result(), flush=True)
