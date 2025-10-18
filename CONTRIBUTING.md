# How to Contribute

PomoTask welcomes your contributions. There are several ways to help out:

- Create an issue on GitHub, if you have found a bug
- Write test cases or provide examples for open bug issues
- Write patches for open bug/feature issues

There are a few guidelines that we need contributors to follow so that we have a chance of keeping on top of things.

## Getting Started

- Make sure you have a GitHub account.
- Submit an issue, assuming one does not already exist.
  - Clearly describe the issue including steps to reproduce when it is a bug.
  - Make sure you fill in the earliest version that you know has the issue.
- Fork the repository on GitHub.

## Suggesting and Adding New Features

- Open an issue or discussion describing your proposed feature before beginning implementation. This helps us review, provide guidance, and avoid duplicate work.
- Follow the "Making Changes" and "Submitting Changes" guidelines below when contributing features.
- When submitting a pull request for a new feature, please include usage documentation or examples.

## Making Changes

- Create a topic branch from where you want to base your work.
  - This is usually the main branch.
  - Only target release branches if you are certain your fix must be on that branch.
  - To quickly create a topic branch based on main: `git branch main/my_contribution main` then checkout the new branch with `git checkout main/my_contribution`. Better avoid working directly on the `main` branch, to avoid conflicts if you pull in updates from origin.
- Make commits of logical units.
- Check for unnecessary whitespace with `git diff --check` before committing.
- Use descriptive commit messages and reference the #issue number if your change relates to an existing issue.

## Submitting Changes

- Push your changes to a topic branch in your fork of the repository.
- Submit a pull request to the repository.
