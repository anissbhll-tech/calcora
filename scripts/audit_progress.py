import re

with open('CALCORA_BATCH_PROGRESS.md', 'r') as f:
    progress_lines = f.readlines()

tracked_ids = []
for line in progress_lines:
    m = re.search(r'\|\s*\d+\s*\|\s*`([^`]+)`', line)
    if m:
        tracked_ids.append(m.group(1))

with open('src/data/calculatorsList.ts', 'r') as f:
    calcs_text = f.read()

all_ids = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"]', calcs_text)

with open('src/components/calculators/index.ts', 'r') as f:
    index_text = f.read()

mapped_ids = re.findall(r'[\'"]?([a-zA-Z0-9_-]+)[\'"]?:\s*([A-Za-z0-9]+)', index_text)
mapped_dict = dict(mapped_ids)

print(f"Total in CALCORA_BATCH_PROGRESS.md: {len(tracked_ids)}")
print(f"Total in calculatorsList.ts: {len(all_ids)}")
print(f"Total in calculatorMap (index.ts): {len(mapped_dict)}")

remaining = [cid for cid in all_ids if cid not in tracked_ids]
print(f"\nRemaining count in calculatorsList.ts: {len(remaining)}")
print("Next 15 remaining IDs:")
for i, cid in enumerate(remaining[:15]):
    comp = mapped_dict.get(cid, 'MISSING')
    print(f"  #{len(tracked_ids) + i + 1}: {cid} -> {comp}")
