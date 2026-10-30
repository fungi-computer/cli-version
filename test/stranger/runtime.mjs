import assert from "node:assert/strict";
import {
  expectReportedVersion,
  reportedVersion,
} from "@fungi.computer/cli-version";

assert.deepEqual(reportedVersion("Spore 0.5.0\n"), {
  label: "Spore",
  version: "0.5.0",
});
assert.equal(expectReportedVersion("fungi 0.7.0\n", "0.7.0"), true);
assert.equal(expectReportedVersion("Spore 0.7.0\n", "0.7.0"), false);
assert.equal(reportedVersion("fungi nightly\n"), undefined);
assert.equal(reportedVersion("fungi 0.7.0 extra\n"), undefined);
