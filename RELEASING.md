# Releasing

This package is released automatically using
[semantic-release](https://github.com/semantic-release/semantic-release).

### Workflow:

- Commit all changes to the `develop` branch

- When ready to release, merge `develop` into `master` and push:

  ```
  git checkout master
  git merge develop
  git push origin master
  ```

- A new commit will be automatically added to `master` during the release, so
  pull that change into local `master`:

  ```
  git pull origin master
  ```

- Change to `develop`, make sure you are in sync with the remote, merge `master`
  into `develop` to pick up the automatically generated commit, then push:

  ```
  git checkout develop
  git pull origin develop
  git merge master
  git push origin develop
  ```
