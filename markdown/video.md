---
title: Видео
order: 1
private: true
---

Для того, чтобы разместить видео в статье, в первую очередь нужно его разместить в SharePoint по следующей [ссылке](https://icsitru.sharepoint.com/sites/docreader9/Shared%20Documents/Forms/AllItems.aspx).

Порядок действий:

1. Создайте директорию в корневой директории SharePoint. Имя этой директории должно быть указано в `.doc-root.yaml` файле вашего каталога, в качестве свойства `sharePointDirectory`.
2. Разместите файл в SharePoint. Путь к файлу должен совпадать с путем к статье из вашей корневой категории (категории, где располагается `.doc-root.yaml`).
   Пример: путь до статьи -- `docs/markdown/<статья>`, где docs -- это корневая категория, тогда путь в SharePoint будет -- `<sharePointDirectory>/markdown/<файл_видео>`.
3. Теперь, чтобы отобразить видео в статье, добавьте в статью следующую строку: `[video:<имя_файла>:<описание>]`, где `имя_файла` -- это имя файла с видео с расширением, `описание` -- текст, который будет выводиться под видео.

:::info
Для записи скринкастов вы можете воспользоваться [ActivePresenter](https://atomisystems.com/download/)
:::

### Пример использования

`[video:sample-mp4-file.mp4:Очень интересное видео]`

**Результат:**

[video:sample-mp4-file.mp4:Очень интересное видео]

[ActivePresenter](https://atomisystems.com/download/)

[Root](.../markdown/variables.md)

[Context](./variables.md)

[Root](.../markdown/variables)

[Context](./variables)

[Root](.../markdown/.category.yaml)

[Context](./.category.yaml)
