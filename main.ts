import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the entrant's own make.fun username, one word, nothing else.
const ENTRY = "ono10";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, ENTRY);

// Read-back self-check: the file must be exactly the entry, no trailing
// newline, within the 1-30 character gate, a single word with no spaces or
// padding — the judge reads it as one username and nothing else.
const written = readFileSync(outFile, "utf8");
if (written !== ENTRY) throw new Error("entry.txt read-back mismatch");
if (written.length < 1 || written.length > 30)
  throw new Error("entry.txt length out of gate range");
if (written.endsWith("\n")) throw new Error("trailing newline");
if (written.trim() !== written) throw new Error("padded entry");
if (/\s/.test(written)) throw new Error("entry is not a single word");
if (!/^[A-Za-z0-9_-]+$/.test(written))
  throw new Error("entry is not a plain handle");
