import semver from "semver";
import { z } from "zod";

// One boundary for the installed command's version output. The previous
// release can still say Spore during rollback; a new install must say fungi
// because the published 0.3.1/0.4.0 updaters compare that exact line.
const versionLine = z.tuple([
  z.enum(["fungi", "Spore"]),
  z
    .string()
    .max(128)
    .refine((value) => semver.valid(value) !== null),
]);

/**
 * Read an installed CLI's complete version line for update and rollback checks.
 *
 * @param stdout - Captured command output, trimmed before validation.
 * @returns The `fungi` or previous `Spore` label and valid semver token, or
 * `undefined` when the complete output does not match the bounded contract.
 */
export function reportedVersion(stdout: string) {
  const parsed = versionLine.safeParse(stdout.trim().split(" "));
  if (!parsed.success) return undefined;
  const [label, version] = parsed.data;
  return {
    /** Installed command label, including the previous label used for rollback. */
    label,
    /** Complete version token accepted by semver validation. */
    version,
  };
}

/**
 * Check that a newly installed CLI reports the current label and exact version.
 *
 * @param stdout - Captured command output.
 * @param expected - Exact version expected by the updater or launch proof.
 * @returns Whether the output reports `fungi` with exactly the expected version.
 */
export function expectReportedVersion(stdout: string, expected: string) {
  const reported = reportedVersion(stdout);
  return reported?.label === "fungi" && reported.version === expected;
}
