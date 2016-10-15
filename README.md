# fsdb

fsdb is an un-opinionated library that lets you use the filesystem as an awesome document/graph database. It supports:

- Directories as nodes with an `index` file
- Common keys for all nodes in a directory with a `common` file
- Files in folders get linked as children
- Relationships (*in progress*)(by referencing other files and transparently linking them in memory)


## Example

Run fsdb on a directory:

```
data
└─ books
   ├─ index.yaml
   └─ zen koans.md
```

It will return a list of files as an array, with children, and parsed data:

```javascript
[
  {
    _: {
      sources: [ "./" ],
      isFile: false,
      isDirectory: true,
      parent: this,
      root: this,
      children: [...]
    }
    slug: "",
    path: [""]
  },
  {
    _: {
      sources: [
        "./books",
        "./books/index.yaml"
      ],
      isFile: true,
      isDirectory: true,
      ...
    }
    slug: "books",
    path: [""]
  },
  {
    _: {
      sources: [
        "./books/zen koans.md"
      ],
      isFile: true,
      isDirectory: false,
      ...
    }
    slug: "zen koans",
    path: ["books"],
    // from the front-matter & body of markdown file
    title: "Zen Koans",
    author: "Shasekishū",
    body: ...
  },
]
```

## Installation

```shell
npm install @alizain/fsdb
```

or

```shell
yarn add @alizain/fsdb
```

## Usage

```javascript
import fsdb from "fsdb"

fsdb("./", config)
  .then((data) => { console.log(data) })
```

## API

```javascript
fsdb(dataDir, config) -> Promise
```

- `dataDir` the directory to parse
- `config` an object
  - `commonFile` (*default: "common"*) the filename that contains common properties, for each directory

## Cool Features

### Index Files

Folders can be nodes with data too! Either use an `index` file inside the folder or use a file with the exact same name as a sibling to the folder

**content/shasekishu/index.md**

```yaml
title: Shasekishū
```

**content/shasekishu.yaml**
```yaml
author: Muju
```

**in memory**
```javascript
{
  title: "Shasekishū",
  author: "Muju",
  slug: "shasekishu",
  path: ["content"],
  _: {
    sources: [
      "./content/shasekishu",
      "./content/shasekishu.yaml",
      "./content/shasekishu/index.md"
    ],
    isFile: true,
    isDirectory: true
  }
}
```

### Common Properties

All children of a node can inherit properties from a common file. This is especially useful when all the files in a directory are related in some way.

By default, common properties are extracted from any file with the name `common`. This can be configured in `config.commonFile`.

**content/shasekishu/common.yaml**
``` yaml
author: Muju
source: Shasekishū
```

**content/shasekishu/a-cup-of-tea.md**
``` markdown
---
title: A Cup of Tea
---

Twenty monks and one nun, who was named Eshun...
```

**in memory**
```javascript
{
  title: "A Cup of Tea",
  author: "Muju",
  source: "Shasekishū",
  body: "\nTwenty monks and one nun, who was named Eshun..."
  slug: "a-cup-of-tea",
  path: ["content", "shasekishu"],
  _: {
    sources: [
      "./content/shasekishu/a-cup-of-tea.md",
      "./content/shasekishu/common.yaml"
    ],
    isFile: true,
    isDirectory: false
  }
}
```

## Supported Files

### JSON

Absolutely!

### YAML

Yup

### Markdown

Yes, yes, and yes.

**Note:** Front-matter is treated as root level data, and all content is saved to the `body` key:

```markdown
---
title: The Lord of the Rings
---

In a hole in the ground there lived a hobbit.
```

Which gets compiled to:

```javascript
{
  title: "The Lord of the Rings",
  body: "\nIn a hole in the ground there lived a hobbit.",
  ...
}
```

## Node Properties

Each node has a few properties that are provided by default.

```javascript
{
  _: {
    sources: Array(String),   // the raw files that provided the data for this node
    isFile: Boolean,          // if this node has an associated file with it (for directories, this is only true if there is an index file)
    isDirectory: Boolean,     // if this node has children
    parent: Object,           // the parent node
    root: Object,             // the root node
    children: Array(Object)   // any child nodes
  },
  path: Array(String),        // the slugs of all parents in the correct order
  slug: String                // the filename of the primary source
}
```

Only `slug` and `path` can be redefined by the file itself.
