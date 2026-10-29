import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { fieldErrors, quoteSchema } from "@/lib/quote-schema";

const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "quote-requests.ndjson");

/**
 * Records quote requests until the business email inbox exists.
 * Each submission is logged to the server console and appended to
 * .data/quote-requests.ndjson (git-ignored). Swap `deliver` for an email
 * or CRM integration once those details are confirmed.
 */
async function deliver(entry: Record<string, unknown>) {
  console.info("[quote-request]", JSON.stringify(entry));
  await mkdir(STORE_DIR, { recursive: true });
  await appendFile(STORE_FILE, JSON.stringify(entry) + "\n", "utf8");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please fix the highlighted fields.", fields: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const { website, ...data } = parsed.data;
  if (website) {
    return Response.json({ ok: true });
  }

  const entry = { receivedAt: new Date().toISOString(), ...data };

  try {
    await deliver(entry);
  } catch (err) {
    console.error("[quote-request] failed to record submission", err);
    return Response.json(
      { ok: false, error: "We couldn't save your request. Please try again in a moment." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
