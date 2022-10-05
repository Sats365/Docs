---
title: OpenAPI
order: 5
terms:
  openapi:
    title: OpenAPI
    summary: The OpenAPI Specification
    description: >-
      Формализованная спецификация и экосистема множества инструментов,
      предоставляющая интерфейс между front-end системами, кодом библиотек
      низкого уровня и коммерческими решениями в виде API.
    url: >-
      https://ru.wikipedia.org/wiki/OpenAPI_(%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F)
---

Вы можете отобразить на странице документ со спецификацией [term:openapi]. Для этого вам нужно добавить в документ следующую конструкцию `[openapi:<путь>]`, где

- `путь` -- это путь до YAML-файла со спецификацией относительно файла страницы

## Пример

```md
[openapi:./openapi.yaml]
```

Результат:

---

[openapi:./openapi.yaml]