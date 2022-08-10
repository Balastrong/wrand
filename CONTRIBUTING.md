# Contributing

- [Contributing](#contributing)
- [Creating an issue](#creating-an-issue)
- [Setup](#setup)
- [Versioned dist](#versioned-dist)
- [Debug](#debug)
- [Submitting a PR](#submitting-a-pr)
  <br/>

Thank you for sharing your interest in contributing to the project! You can find here some useful information.

## Creating an issue

If you have ideas, feature requests or want to report a bug, feel free to submit an issue. I will get back with feedback as soon as possible.

## Setup

After fork/clone of the project, you can install the dependencies with the usual

```sh
npm install
```

This will also install the pre-commit hook with husky. What it basically does is making sure everything is ok before commit (format & lint).
In particular, it updates the `deno_lib` folder with the port for [Deno.land](https://deno.land/).

## Testing

You can run the tests with

```sh
npm run test
```

When writing new code, please make sure it's properly tested!

## Submitting a PR

When you have the code pushed on your branch, feel free to open a Pull Request.
