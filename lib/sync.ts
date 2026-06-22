import { supabase } from "./supabase";
import { curriculum } from "./curriculum";
import { isCertificateEarned, type ProgressMap } from "./progress";

// Remote persistence for signed-in users. All of this no-ops when Supabase
// isn't configured (supabase === null), so guests are unaffected.

/** Read a user's progress blob from the `user_progress` table. */
export async function fetchRemoteProgress(
  userId: string,
): Promise<ProgressMap | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("user_progress")
    .select("data")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return (data.data as ProgressMap) ?? {};
}

/** Upsert a user's progress blob. */
export async function saveRemoteProgress(
  userId: string,
  map: ProgressMap,
): Promise<void> {
  if (!supabase) return;
  await supabase
    .from("user_progress")
    .upsert(
      { user_id: userId, data: map, updated_at: new Date().toISOString() },
      { onConflict: "user_id" },
    );
}

/** Deterministic, shareable verification code for a certificate. */
export function certificateCode(userId: string, projectId: string): string {
  const seed = `${userId}|${projectId}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return `DLP-${hash.toString(36).toUpperCase().padStart(8, "0").slice(0, 8)}`;
}

/**
 * Persist any newly-earned certificates for this user. Idempotent: the table
 * has a unique (user_id, project_id) constraint, so re-issuing is ignored.
 */
export async function syncCertificates(
  userId: string,
  learnerName: string,
  map: ProgressMap,
): Promise<void> {
  if (!supabase) return;
  const earned = curriculum.projects.filter((p) =>
    isCertificateEarned(map, p.id),
  );
  if (earned.length === 0) return;
  const rows = earned.map((p) => ({
    user_id: userId,
    project_id: p.id,
    learner_name: learnerName || "Anonymous",
    code: certificateCode(userId, p.id),
  }));
  await supabase
    .from("certificates")
    .upsert(rows, { onConflict: "user_id,project_id" });
}

export interface VerifiedCertificate {
  project_id: string;
  learner_name: string;
  code: string;
  issued_at: string;
}

/** Public lookup used by the /verify page. Backed by a SECURITY DEFINER RPC. */
export async function verifyCertificate(
  code: string,
): Promise<VerifiedCertificate | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("verify_certificate", {
    lookup_code: code,
  });
  if (error || !data || (Array.isArray(data) && data.length === 0)) return null;
  return Array.isArray(data) ? (data[0] as VerifiedCertificate) : (data as VerifiedCertificate);
}
