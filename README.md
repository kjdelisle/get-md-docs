# get-repo

![](https://travis-ci.org/kjdelisle/get-docs.svg?branch=master)

Retrieve all of the Markdown docs (including README) from a repository.

## Usage

```
npm i -g get-docs
get-docs --org your-org --repo your-repo --dest ./folder-for-docs
```

## Features

* Recursive traversal of a target repository; leave no Markdown file un-found!
* Preserves directory structure of located documents (no need to rework your
  internal links between docs)
* Language-and-framework agnostic; doesn't read any metadata from package.json,
  Gemfile, or any other manifests specific to a community, framework, or
  language.

## Why?

I needed to rip Markdown docs from a bunch of repositories for use in a
Jekyll-based page; if you find another use for it, that's awesome!
