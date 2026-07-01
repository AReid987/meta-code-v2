import os
import sys

def count_files(start_path):
    counts = []
    for entry in os.listdir(start_path):
        full_path = os.path.join(start_path, entry)
        if os.path.isdir(full_path):
            total_files = 0
            for root, dirs, files in os.walk(full_path):
                total_files += len(files)
            counts.append((total_files, entry))
    
    counts.sort(key=lambda x: x[0], reverse=True)
    for count, name in counts[:20]:
        print(f"{count:8} {name}")

count_files(".")
