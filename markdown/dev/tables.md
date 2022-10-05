---
title: Описание схемы БД
order: 3
---

Для вставки описания таблицы БД используйте конструкцию `[db-table:<таблица>:<путь>]`, где:

- `таблица` -- имя таблицы

- `путь` -- путь к YAML-файлу с моделью таблицы относительно файла статьи

**Структура таблицы.** Описание и примеры значений:

```yaml
code: Contract # наименование таблицы в БД. Может быть указан как ключ объекта
title: Договор # заголовок. Необязательное
subtitle: # подзаголовок. Необязательное
description: # описание в формате markdown. Необязательное
    Все договоры организации.

    Является **головной таблицей** для таких договоров как *Трудовой договор* `ContractLabour` и *Договор аренды* `ContractRent`
icon: file-contract # иконка. Необязательное
fields: # перечень полей. Пример, см. ниже
```

**Поля таблицы.** Описание и примеры значений:

```yaml
code: ID_Contract # наименование поля в БД. Может быть указан как ключ объекта
title: Договор # заголовок. Необязательное
description: # описание в формате markdown. Необязательное
    Ссылка на Договор `Contract`
sqlType: int # тип данных
default: GETDATE() # значение по умолчанию. Необязательное
primary: boolean # поле является первичным ключом. Необязательное, по умолчанию false
nullable: false # может ли иметь значение NULL. Необязательное, по умолчанию true
refObject: Contract # наименование таблицы в БД, на которую поле ссылается по внешнему ключу FK
```

Для того, чтобы исключить дублирование одинаковых полей, используется корневое свойство `$fields`. В этом свойстве перечисляются поля. Если какое то поле из таблицы имеет поле с таким же именем(`code`), как и поле из `$fields`, то для этого поля берутся значения поля из `$fields`. В описании таблицы можно добавлять новые или перезаписывать старые свойства поля.

## Пример

### YAML-файл описания модели данных

```yaml
$fields:
    CommonField:
        title: title
        description: commonField
        sqlType: char
Contract:
    title: Договор
    description: Базовая **сущность** для всех *договоров*.
        Содержит общие поля
    fields:
        CommonField: # Поле берется полностю из $fields
        ID:
            sqlType: int
            primary: true
        Number:
            title: Номер договора
            sqlType: varchar(100)
            nullable: false
        ID_Author:
            title: Кем создано
            refObject: User
            nullable: false
        ID_Contractor:
            refObject: Contractor
            sqlType: int
User:
    title: Пользователь
    fields:
        CommonField: # Поле из $fields с новым title
            title: newTitle
        Login:
            title: Логин
            sqlType: varchar(100)
            nullable: false
        Email:
            title: E-mail
            sqlType: varchar(1000)
```

### Код вставки описания таблицы

Для отображения таблицы `Contract` из файла `./schema.yaml` напишите:

```md
[db-table:Contract:./schema.yaml]
```

### Результат

---

[db-table:Contract:./schema.yaml]