import {
  expectReportedVersion,
  reportedVersion,
} from "@fungi.computer/cli-version";

console.log(reportedVersion("Spore 0.5.0\n"));
console.log(expectReportedVersion("fungi 0.7.0\n", "0.7.0"));
