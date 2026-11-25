import { mkdirSync, writeFileSync } from "node:fs";

// The single sentence that could have replaced the entire pointless meeting:
// the decision was made in Tuesday's email thread, the client already signed
// off, and the meeting itself is just forty-five minutes of nodding at a slide
// that says the same thing — so after this line, there is no meeting left to hold.
const ENTRY =
  "The decision was made in Tuesday's email thread, the client signed off yesterday, and this meeting is just forty-five minutes of nodding at a slide that says the same thing.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const text = ENTRY.trim();

if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (text.includes("\n") || text.trim() !== text) {
  throw new Error("entry must be a single non-blank line");
}
if ((text.match(/\./g) ?? []).length !== 1 || !text.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, text, "utf8");
