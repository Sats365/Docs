---
title: Диаграммы PlantUML
order: 3
---
[PlantUML](https://plantuml.com/ru/) это удобный инстумент для создания диаграмм. Он поддерживает разные форматы -- от PUML до SDL и JSON Data. Полный список форматов можно посмотреть [тут](https://plantuml.com/ru/guide).

PUML является промежуточным стандартом для специфических форматов, таких как Structurizr.

Для того, чтобы в статью добавить PUML диаграмму, достаточно прописать `[plant-uml:{путь}]` , где `путь` -- путь к puml-файлу, относительно статьи.
Или же можно использовать следующую конструкцию:

```
```plant-uml
<описание диаграммы>
```

```

### Пример

Есть файл `plantUml.puml` с содержимым:
```

@startuml
Bob -> Alice : hello
@enduml

```

При добавлении в статью:

```md
[plant-uml:./resources/plantUml.puml]
```

или же

```
```plant-uml
@startuml
Bob -> Alice : hello
@enduml
```

```

В статье отобразится:

{%plant-uml path="./resources/plantUml.puml" /%}
```