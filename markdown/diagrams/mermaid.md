---
title: Диаграммы mermaid
order: 5
hidden: true
---

Mermaid — специализированный синтаксис, для создания и визуализации диаграмм. Полное описание его возможностей можно посмотреть по [ссылке](https://mermaid-js.github.io/mermaid/#/)

Для того чтобы отобразить диаграмму достаточно прописать `[mermaid:{путь}]` , где `путь` — путь к mermaid-файлу, относительно статьи.
Или же можно использовать следующую конструкцию:

````
```mermaid
<описание диаграммы>
```
````

-   Синтаксис `mermaid` можно посмотреть [тут](https://mermaid-js.github.io/mermaid/#/flowchart?id=flowcharts-basic-syntax)
-   Визуальный редактор диаграмм находится [тут](https://mermaid-js.github.io/mermaid-live-editor/#/edit/).

## Примеры

```
[mermaid:./resources/sample.mermaid]
```

[mermaid:./resources/sample.mermaid]

````
```mermaid
sequenceDiagram
	Alice->>+John: Hello John, how are you?
	Alice->>+John: John, can you hear me?
	John-->>-Alice: Hi Alice, I can hear you!
	John-->>-Alice: I feel great!
```
````

```mermaid
sequenceDiagram
	Alice->>+John: Hello John, how are you?
	Alice->>+John: John, can you hear me?
	John-->>-Alice: Hi Alice, I can hear you!
	John-->>-Alice: I feel great!
```

````
```mermaid
graph LR;
    id1(Start)-->id2(Stop);
    style id1 fill:#f9f,stroke:#333,stroke-width:4px;
    style id2 fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
```
````

```mermaid
graph LR;
    id1(Start)-->id2(Stop);
    style id1 fill:#f9f,stroke:#333,stroke-width:4px;
    style id2 fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
```
