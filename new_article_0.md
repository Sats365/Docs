---
order: 4
title: Path и LogicPath
---
**Почему надо различать Path и LogicPath**

Допустим есть статья которая находится по пути `doc-reader/docs/markdown/article.md`, и файл      \
`.doc-root.yaml` находиться в  `doc-reader/docs`, тогда **LogicPath** будет `doc-reader/markdown/article`.

Предлагаю реализовать класс **LogicPath**, который будет наследоваться от **Path**, и инициализироваться так:

```
let logicPath = new LogicPath(basePath, path);
```

где:

- **basePath** - это `doc-reader/docs`

- **path** - `doc-reader/markdown/article.md`