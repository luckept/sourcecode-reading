# cac 库的 package.json 里面的字段都是干嘛的｜催学社 @ 源码共读 @cac

# 简述本文

这是一篇催学社源码共读活动的产出，活动意在通过组织大家有方向有目的地阅读小而精的 npm 库，来综合提升大家的实力

活动的第一期，我们选读的是 [cac](https://github.com/cacjs/cac) 这个库，它的全称是 `Command And Conquer`，可以实现用 javascript 快速构建 CLI 程序

CLI，也即是命令行界面（Command-Line Interface）用户能够通过与该界面交互操作一些预设的功能，打个比方，当你在终端中输入 `node -h` 的时候，终端会将 node 的帮助信息呈现给你，而这种场景，我们经常会碰到，比如查看某个工具的版本，操作其内置的功能等等，一旦我们自己的业务中遇到类似的需求，就可以考虑使用 cac 这个工具，毕竟它支持了 TS，有良好的调用提示，同时 API 又比较简单，学习成本较低

当然本篇内容分享的主干并不在 cac 的核心实现及详细使用，相关信息可以查看催学社其他同学的分享，我主要是在本篇内容中逐行探索了一下 cac 这个库的 `package.json` 配置，至于我为什么选择了这个命题，我想原因有二

- 第一：我在实际参与工作开发的过程中，对 `package.json` 的内容并不够敏感，所以借此机会简单了解一下
- 第二：第一次参加共读，选择一个相对好入手的方向去展开是理智的

# cac 库的 package.json 结构（为方便阅读，我将一些不重要的数据用省略号替代了）

```json
{
  "name": "cac",
  "version": "6.0.0",
  "description": "Simple yet powerful framework for building command-line apps.",
  "repository": {
    "url": "egoist/cac",
    "type": "git"
  },
  "main": "index-compat.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./index-compat.js"
    },
    "./package.json": "./package.json",
    "./": "./"
  },
  "files": [
    "dist",
    "!**/__test__/**",
    "/mod.js",
    "/mod.ts",
    "/deno",
    "/index-compat.js"
  ],
  "scripts": {
    "test": "jest",
    ...
  },
  "author": "egoist <0x142857@gmail.com>",
  "license": "MIT",
  "devDependencies": {
    ...
  },
  "engines": {
    "node": ">=8"
  },
  "release": {
    "branch": "master"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "lint-staged": {
    "linters": {
      "*.{js,json,ts}": [
        "prettier --write",
        "git add"
      ],
      "*.md": [
        "markdown-toc -i",
        "prettier --write",
        "git add"
      ]
    },
    "ignore": [
      "dist/**",
      "mod.js"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm t && lint-staged"
    }
  }
}
```

# 逐行结合网络资料学习

## name

- 设置了应用程序/软件包的名称

## version

- 表明了当前的版本

## description

- 是应用程序/软件包的简短描述

## repository

- 此属性指定了此程序包仓库所在的位置，可以显式地设置版本控制系统

  ```json
  "repository": {
    "url": "egoist/cac", // 表示是 egoist 这个 github 用户的 cac 仓库
    "type": "git" // 表示版本控制系统的类型是 git，如果是用的 svn 则此处填写 svn
  },
  ```

## main

- 设置软件包的入口点，当在应用程序中导入此软件包时，应用程序会在该位置搜索模块的导出

  ```json
  // 以 cac 为例，其入口文件导出了如下内容供用户使用
  const { cac, CAC, Command } = require('./dist/index')
  module.exports = cac
  Object.assign(module.exports, {
    default: cac,
    cac,
    CAC,
    Command,
  })
  ```

## module

- 定义 npm 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用

## types

- 设置 types 属性指向捆绑在一起的声明文件

## exports

- 该字段提供了一种方法来为不同的环境和  JavaScript  风格公开您的包模块，同时限制对其内部部分的访问

## files

- 该字段是一个包含在你项目里的文件的数组，里面的内容是文件名或者文件夹名。如果是文件夹，那么里面的文件也会被包含进来，除非你设置了 ignore 规则

## script

- 该字段是一个对象。它的每一个属性，对应一段脚本，命令行下使用 npm run 命令，就可以执行这段脚本

## author

- 该字段是一个对象。它的每一个属性，对应一段脚本，命令行下使用 npm run 命令，就可以执行这段脚本。

  ```json
  // 对象形式
  {
    "author": {
    "name" : "Barney Rubble",
    "email" : "b@rubble.com",
    "url" : "http://barnyrubble.tumblr.com/"
  }

  // 字符串形式
  {
    "author": "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"
  }
  ```

## license

- 该字段为软件包指定一个许可证，以便人们知道他们如何被允许使用它，以及您对其施加的任何限制

## devDependencies

- 该字段表示开发依赖，开发依赖是仅用于开发的程序包，在生产环境中并不需要。 例如测试的软件包、webpack 或 Babel

## engines

- 该字段用于指定 node 的版本

## release

- 该字段没有找到相关定义，似乎是已经不支持

## config

- 该字段用于添加命令行的环境变量
- cac 中使用的 commitizen 是用于创建遵循约定式提交规范的提交信息，用户安装 commitizen 后可以通过 `git cz` 来使用

## lint-staged 与 husky

- husky 配置了相关的钩子去拦截操作，比如 cac 中配置了一个 `pre-commit`，pre-commit  钩子在键入提交信息前运行，它用于检查即将提交的快照，例如，检查是否有所遗漏，确保测试运行，以及核查代码。 如果该钩子以非零值退出，Git 将放弃此次提交

- 该钩子的运行将依照配置交给 lint-staged 接手，而 lint-staged  定义了对 Git 暂存区的文件要执行的操作

- 比如 cac 中对不同文件定义了不同的操作，如果在操作执行的过程中发生了错误，pre-commit 钩子也会出错，最终 Git 将放弃这次提交

  ```json
  "linters": {
    "*.{js,json,ts}": [
      "prettier --write",
      "git add"
    ],
    "*.md": [
      "markdown-toc -i",
      "prettier --write",
      "git add"
    ]
  },
  "ignore": [
    "dist/**",
    "mod.js"
  ]
  ```
