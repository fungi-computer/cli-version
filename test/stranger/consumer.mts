import {
  expectReportedVersion,
  reportedVersion,
} from "@fungi.computer/cli-version";

const reported = reportedVersion("fungi 0.7.0\n");
if (reported !== undefined) {
  const label: "fungi" | "Spore" = reported.label;
  const version: string = reported.version;
  console.log(label, version);
}
const matches: boolean = expectReportedVersion("fungi 0.7.0\n", "0.7.0");
console.log(matches);
