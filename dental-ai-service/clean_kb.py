import sys

with open('src/data/clinic_kb.txt', 'r') as f:
    lines = f.readlines()

with open('src/data/clinic_kb.txt', 'w') as f:
    for i, line in enumerate(lines):
        if i >= 13 and '\t' in line:
            parts = line.split('\t')
            if len(parts) >= 10:
                # Keep Treatment, India price, Specifications, Description
                new_line = f"{parts[0]}\t{parts[1]}\t{parts[8]}\t{parts[9]}"
                if not new_line.endswith('\n'):
                    new_line += '\n'
                f.write(new_line)
            else:
                f.write(line)
        else:
            f.write(line)
