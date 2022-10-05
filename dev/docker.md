---
title: Развертывание с помощью Docker
order: 1.5
---

## Подготовка

Для развертывания DocReader с помощью докера, вам нужен только сам докер. 

Для Windows 10 установите Docker Desktop по следующей [ссылке](https://hub.docker.com/editions/community/docker-ce-desktop-windows/).

:::note Сложности с Windows Home

Для установки Docker Desktop на Windows Home воспользуйтесь инструкцией из [официальной документации](https://docs.docker.com/docker-for-windows/install-windows-home/).
:::

## Развертывание

Сначала вам нужно загрузить образ DocReader, выполнив в консоли следующие команды:
```shell
docker login gitlab.ics-it.ru:4567
docker pull gitlab.ics-it.ru:4567/ics/doc-reader
```
После выполнения команды `docker login` может быть запрошен логин и пароль, в этом случае используйте логин и пароль от [gitlab.ics-it.ru](https://gitlab.ics-it.ru).

Затем у вас есть два варианта, чтобы развернуть DocReader в докере:
1. Использование докера напрямую.
2. С помощью утилиты `docker-compose` (утилита автоматически устанавливается вместе с Docker Desktop).

### С помощью команды docker

Выполните в консоли команду:
```shell
docker run -v <путь к каталогам>:/app/docs -v <путь к .ssh>:/root/.ssh -p <порт>:80 -e PORT=80 --name docreader -d gitlab.ics-it.ru:4567/ics/doc-reader
```
Где:
* `путь к каталогам` -- путь к директории, где лежат каталоги с документацией.
* `путь к .ssh` -- путь к папке, где лежат файлы `id_rsa` и `id_rsa.pub`(в Windows -- это `C:\Users\<имя пользователя>\.ssh`).
* `порт` - порт, на котором разворачивается DocReader. После выполнения команды приложение станет доступным по адресу `http://localhost:<порт>/`.

В дальнейшем вы можете обращаться напрямую к созданному контейнеру `docreader`:
- Запускать и останавливать контейнер командами `docker start docreader` и `docker stop docreader`. 
- Посмотреть список запущенных контейнеров командой `docker ps`.
- Удалить остановленный контейнер командой `docker rm <имя контейнера>`.

### С помощью команды `docker-compose`

Для начала вам нужно создать файл `docker-compose.yml`, со следующим содержимым:
```yaml
services:
  doc_reader:
    image: gitlab.ics-it.ru:4567/ics/doc-reader:latest
    restart: always
    volumes:
      - <путь к каталогам>:/app/docs
      - <путь к .ssh>:/root/.ssh
    environment:
      - PORT=80
    ports:
      - <порт>:80
```

Значения подставляются такие же, как и в случае запуска с помощью команды `docker run`.

Теперь в папке, где располагается файл `docker-compose.yml` выполните команду `docker-compose up -d`. После выполнения команды DocReader становится доступен по адресу `http://localhost:<порт>/`. 

Для остановки воспользуйтесь командой `docker-compose down`.

## Обновление образа

Для загрузки новой версии DocReader, выполните команду `docker pull gitlab.ics-it.ru:4567/ics/doc-reader`. 

Если вы запускаете контейнер без использования `docker-compose`, то вам нужно затем пересобрать контейнер командой `docker run`, предварительно удалив старый контейнер командой `docker rm docreader`.
