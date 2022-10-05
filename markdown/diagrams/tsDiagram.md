---
title: TS-диаграммы
order: 2
---

Архитектору системы при проектировании нужно описывать верхнеуровневую структуру компонентов системы.
Это делается для того, чтобы разработчикам было легче в ней ориентироваться.
Также такая информация поможет при документировании системы.

Для описания системы удобно использовать TS-диаграммы.
В DocReader их можно добавлять в статьи -- так диаграммы не потеряются, а разработчики смогут их легко находить.

Чтобы добавить диаграмму, достаточно прописать `[ts-diagram:{путь}]` , где `путь` -- путь к TS-файлу, относительно статьи.
Или же можно использовать следующую конструкцию:

```
```ts-diagram
<описание диаграммы>
```
```

Рассмотрим на примере.

Есть файл `DocReader.ts` с содержимым:

```ts
interface DocReader {
	catalogs: Catalog[];
}

interface Catalog {
	articles: Article[];
}

interface Article {
	title: string;
	content: string;
}
```

В самой статье прописываем:

```md
[ts-diagram:./resources/DocReader.ts]
```

Или же

```
```ts-diagram
interface DocReader {
	catalogs: Catalog[];
}

interface Catalog {
	articles: Article[];
}

interface Article {
	title: string;
	content: string;
}
```
```

В итоге в статье отобразится:

[ts-diagram:./resources/ts-diagram.ts]