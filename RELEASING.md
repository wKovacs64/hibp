# Releasing

1. Update the version in `package.json` to a non-dev version in the `develop`
   branch.

        # Patch
        semver -i patch 1.0.1-dev.0 # 1.0.1

        # Minor
        semver -i minor 1.0.1-dev.0 # 1.1.0

        # Major
        semver -i major 1.0.1-dev.0 # 2.0.0

2. Update the `CHANGELOG.md` for the impending release.
3. Update the `README.md` to use the new version in the CDN `<script>` tag.
4. `git commit -am "X.Y.Z"` (where X.Y.Z is the new version)
5. `npm publish` (ensure this succeeds before proceeding)
6. `git checkout master && git merge develop`
7. `git tag vX.Y.Z` (where X.Y.Z is the new version)
8. `git push && git push --tags`
9. `git checkout develop`
10. Update the version in `package.json` to the next dev version in the
    `develop` branch.

        semver -i prerelease --preid dev 1.0.1 # 1.0.2-dev.0

11. `git commit -am "Prepare next development version"`
12. `git push`
13. Update `gh-pages` branch if necessary.
