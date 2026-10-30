import assert from "node:assert/strict";
import { test } from "node:test";
import {
  expectReportedVersion,
  reportedVersion,
} from "@fungi.computer/cli-version";

test("accepts the complete installed Fungi version handshake", () => {
  assert.deepEqual(reportedVersion("fungi 0.7.0\n"), {
    label: "fungi",
    version: "0.7.0",
  });
  assert.equal(expectReportedVersion("fungi 0.7.0\n", "0.7.0"), true);
});

test("reads the previous installed label without accepting a new install", () => {
  assert.deepEqual(reportedVersion("Spore 0.5.0\n"), {
    label: "Spore",
    version: "0.5.0",
  });
  assert.equal(expectReportedVersion("Spore 0.7.0\n", "0.7.0"), false);
});

test("rejects incomplete, decorated, malformed and mismatched output", () => {
  for (const stdout of [
    "",
    "fungi",
    "prefix fungi 0.7.0\n",
    "fungi 0.7.0 extra\n",
    "fungi nightly\n",
    "fungi 0.7.1\n",
  ])
    assert.equal(expectReportedVersion(stdout, "0.7.0"), false);
  assert.equal(reportedVersion("fungi nightly\n"), undefined);
});

test("retains maintained semver validation and the version-token bound", () => {
  assert.equal(
    expectReportedVersion("fungi 0.7.0-candidate.1\n", "0.7.0-candidate.1"),
    true,
  );
  assert.equal(reportedVersion(`fungi 0.7.0-${"a".repeat(128)}\n`), undefined);
});
