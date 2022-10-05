---
title: Модель хранения
---

[ts-diagram:storage.ts]

### Версии

- **Бренчи** -- это не версия. Это ветка развития, отдельный набор отдельных маленьких версий.
- **Версия** -- конкретный слепок в истории, который не может меняться. Отдельное состояние на момент времени.

Примеры хранилищ:
- *Git* -- поддерживает бренчи и поддерживает версии. Версия хранит все состояние хранилища.
- *Google Drive* -- не поддерживает бренчи, но поддерживает версии. Версия хранит только один элемент.
- *Файлы на диске* -- не поддерживает бренчи и версии.

### Уровни абстракции

Важно не перемешивать разные уровни абстракции:
- **Storage** (Хранилище) -- абстракция, оперирующая подключением к хранилищу. Что дает возможность получать элементы из него по идентификаторам хранилища и их содержимое. Он ничего не знает о том, как эти элементы могут быть логически структурированы и как отображены. Ничего не знает о внутренностях объекта и их формате -- YAML это, markdown или бинарный формат -- для него все это просто бинарные данные.
- **StorageStructure** (Структура хранилища) -- надстройка над Storage, которая задает структуру набору элементов, которые в него входят. Ничего не знает о том, какая реализация внутри Storage по получению объектов. Но хранит логику, по обработке некоторых файлов, метаинформации, может опираться на storageItemRef и выстраивать структуру по ним. Это слой после которого пропадают `.doc-root.yaml`, `.catalog.yaml`, frontmattier превращается в meta, у StorageItem возникает структура и дочерние элементы. 

### Безопасность

Слой **Security** (безопасность) -- фильтр, через который нужно пропускать все действия и получение данных, выполняемые для конкретного пользователя, т.е. в контексте текущего пользователя.

### Примеры

```js
// SNIPPET: Клонирование репозитория

// Gitlab
interface GitConnection extends StorageConnection<{ repositoryUrl: Url; folderName: string; }> {}
let gitlabConnection: GitConnection;
let storage = gitlabConnection.getStorage({ folderName: "someCatalog", repositoryUrl: "git@xxxx" });

// Google Drive
interface GoogleDriveConnection extends StorageConnection<{ folderRef: string }> {}
let googleDriveConnection: GoogleDriveConnection;
storage = googleDriveConnection.getStorage({ folderRef: "safqeqjkcfa" })


// SNIPPET: По itemRef получить историю изменений

let storageItemRef: StorageItemRef;
let itemVersions = storage.getItem(storageItemRef).getVersionedItem().getVersions();
let change = itemVersions[0].getChanges()[0];
```