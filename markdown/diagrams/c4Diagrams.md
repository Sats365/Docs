---
title: C4 Structurizr
order: 2
---

Для описания моделей [C4](https://c4model.com/) можно использовать формат [PlantUML с расширением C4](https://github.com/plantuml-stdlib/C4-PlantUML).

Однако для полного описания сложных схем больше подходит специальный формат [Structurizr DSL](https://structurizr.com/). Он более компактный и наглядный, тажке предоставляет возможность описывать всю архитектуру в одном файле. А для пользователя дает возможность интерактивно просматривать диаграмму, "проваливаясь" по иерархии вниз.

### Как использовать

Для того, чтобы в статью добавить C4-диаграмму, достаточно прописать `[c4-diagram:{путь}]` , где `путь` -- путь к С4-файлу, указываемый относительно статьи.
Также можно включать исходный код диаграммы прямо в статью используя следующую конструкцию

```
```c4-diagram
{исходный код диаграммы}
```
```

### Пример

Есть файл `c4DiagramTest.dsl` с содержимым:

```
workspace {

    model {
        user = person "User"
        softwareSystem = softwareSystem "Software System" {
        }

        user -> softwareSystem "Uses"
    }

    views {
        systemContext softwareSystem "Diagram1" {
            include *
            autoLayout
        }

        theme default
    }

}
```

При добавлении в статью можно использовать:

```md
[c4-diagram:./resources/c4DiagramTest.dsl]
```

Также можно использовать:

```
```c4-diagram
{содержимое файла c4DiagramTest.dsl}
```
```

В статье отобразится:

[c4-diagram:./resources/c4DiagramTest.dsl]

C4-диаграммы позволяют использовать вложенные диаграммы. В примере ниже обратите внимание на элементы с подчеркиванием, на них можно нажать:

[c4-diagram:./resources/c4DiagramTestNested.dsl]