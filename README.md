# Fungi CLI version output (`@fungi.computer/cli-version`)

Read and check the installed Fungi CLI's version-output contract. The Spore
updater and deployment launch smoke use the same root export, without reaching
into an App's source or build directory.

## Quickstart

Requires Node.js 24 or later.

```sh
npm install @fungi.computer/cli-version
```

```ts
import { expectReportedVersion } from "@fungi.computer/cli-version";

expectReportedVersion("fungi 0.7.0\n", "0.7.0"); // true
```

## Core concepts

`reportedVersion(stdout)` returns the complete `fungi <semver>` or
`Spore <semver>` line's label and version, or `undefined` for invalid output.
`expectReportedVersion(stdout, expected)` requires the current `fungi` label and
the exact expected version. The rollback reader still recognizes the previous
installed command's `Spore` label.

Zod owns the bounded tuple and semver owns version validation. This package adds
no new version grammar and does not run, download, or install a CLI.

## Examples

```ts
import {
  expectReportedVersion,
  reportedVersion,
} from "@fungi.computer/cli-version";

reportedVersion("Spore 0.5.0\n"); // { label: "Spore", version: "0.5.0" }
expectReportedVersion("Spore 0.7.0\n", "0.7.0"); // false
reportedVersion("fungi nightly\n"); // undefined
```

## API reference

The [API reference](docs/api/README.md) documents both functions.

## Status and limits

Spore bundles this module into its CLI, but its public source still imports the
package. An independent public package gives a standalone Spore checkout a
declared installable dependency. This release preparation does not itself
publish the package.

The parser trims surrounding whitespace, rejects extra output, validates the
version token with semver, and bounds that token to 128 characters. It does not
compare version ordering or decide when to update.

## Development

Run `pnpm build`, `pnpm typecheck`, and `pnpm test` from this package's
checkout. Tests use its built root export in native Node, without a TypeScript
loader.

In the monorepo, `pnpm --filter @fungi.computer/cli-version docs:write`
regenerates the API reference through the maintained docs owner;
`pnpm --filter @fungi.computer/cli-version run docs` checks it against source.
The shared stranger command tests the packed install and consumer types.

## License

MIT. See [LICENSE](LICENSE).
