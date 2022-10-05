---
title: Поисковая оптимизация
order: 1
---

:::hotfixes
Статья в разработке
:::

**Поисковая оптимизация (SEO)** -- комплекс мер по правильному индексированию в поисковых движках, а также поднятию сайта в результатах поиска.

Сейчас в Site Builder доступны следующие настройки для SEO:

-   [Sitemap](#sitemap) -- информация о структуре сайта.
-   [Meta-теги](#metatags) -- мета-информации по странице для поисков и браузеров.

## Sitemap {#sitemap}

Содержит информацию о том, как организован контент на сайте. Данный файл будет находить по адресу `<site-name>/api/sitemap`.
Например, [ics-it.ru/api/sitemap](https://ics-it.ru/api/sitemap).
Sitemap создается на основе меню сайта, который задается в файле `site.yaml`, в настройках верхнего меню `topMenu`, в поле `pages`.

Для каждой страницы задается два обязательных поля и два опциональных поля.

-   `text` -- название страницы, которое выводится в верхнем меню.
    -   Обязательно поле.
    -   Не попадает в sitemap.
-   `location` -- расположение страницы в адресной строке.
    -   Обязательно поле.
    -   Попадает в sitemap, в значение тега `<loc/>`.
-   `priority` -- приоритет страницы на сайте. никак не отображается в верхнем меню. Может принимать значения от 0 до 1. Главная страница всегда имеет приоритет 1
    -   Опциональное поле.
    -   Попадает в sitemap, в значение тега `<priority/>`.
-   `subparagraphs` -- смысловая группировка страниц.
    -   Опциональное поле.
    -   Не попадает в sitemap.

#### Пример настройки для сайта ICS-IT

```yaml
title: ICS-IT # Название вкладки в браузере для всех страниц, устанавливается если meta.title не установлен

topMenu: # Настройки верхнего меню
    buttonText: Связаться с нами # Текст правкой кнопки
    buttonLink: /about # Ссылка для правой кнопки
    pages: # Настройки страницы
        - text: Продукты и сервисы
          location: /products
          subparagraphs:
              - text: MDT
                location: /mdt
                priority: 0.8
              - text: SellOut+
                location: /sellout
                priority: 0.8
        - text: Студентам
          location: /welcome/student
        - text: О компании
          location: /about
          priority: 0.9
```

#### Пример Sitemap на основе верхней настройки

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https:/ics-it.ru</loc>
        <lastmod>2022-03-24</lastmod>
        <priority>1</priority>
    </url>
    <url>
        <loc>https:/ics-it.ru/products</loc>
        <lastmod>2022-03-24</lastmod>
    </url>
    <url>
        <loc>https:/ics-it.ru/products/mdt</loc>
        <lastmod>2022-03-24</lastmod>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https:/ics-it.ru/products/sellout</loc>
        <lastmod>2022-03-24</lastmod>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https:/ics-it.ru/welcome/student</loc>
        <lastmod>2022-03-24</lastmod>
    </url>
    <url>
        <loc>https:/ics-it.ru/about</loc>
        <lastmod>2022-03-24</lastmod>
        <priority>0.9</priority>
    </url>
</urlset>
```

## Meta-теги {#metatags}

### Для поисковых роботов

Данный вид тегов предназначен для того, чтобы задавать поисковым роботам те настройки, которые вы хотите.
Общий перечень настроек для Google-ботов доступен по [ссылке](https://developers.google.com/search/docs/advanced/crawling/special-tags#other-points-to-note).

Теги задаются для каждой страницы сайта в файлах `./<page-location>/_index.yaml`, в meta-настройках страницы `meta`, в поле `searchBot`.

#### Пример поисковой настройки заголовка и описания страницы

```yaml
title: Используйте данные на 100% # Заголовок отображающийся в заголовке
description: Управляйте бизнесом на основе онлайн-данных. Визуализируйте результаты. Совершенствуйте процессы. Переходите в облако. # Описание отображающийся в заголовке
image: images/cover.jpeg # Картинка отображающийся в заголовке
theme: blue # Тема страницы

meta:
    title: ICS-IT # Название вкладки в браузере
    searchBot:
        title: ICS-IT # Название страницы в выдаче поисковиков
        description: Управляйте бизнесом на основе онлайн-данных. Визуализируйте результаты. Совершенствуйте процессы. Переходите в облако. # Описание страницы в выдаче поисковиков
```

#### Пример заголовка и описания на основе верхней настройки

![](./images/google-ics-it.png)

### Автоподстановка

Если вы не укажете напрямую meta-теги:

-   `meta.searchBot.title` и `meta.openGraph.title` -- вместо них установятся значение из `meta.title`. А если и оно не установлено, то возьмется значение из поля `title`.
-   `meta.searchBot.description` и `meta.openGraph.description` -- вместо них установятся значения из поля `description`.
-   `meta.openGraph.url` -- вставляется автоматически.

## Google Search Console

Google Search Console – это бесплатный сервис, с помощью которого вы можете получать информацию о том, как ваш сайт представлен в результатах поиска Google, оптимизировать контент и устранять возможные неполадки. [Подробнее](https://support.google.com/webmasters/answer/9128668)
