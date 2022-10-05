---
title: Тикет аутентификации
order: 1
---

В DocReader можно предоставить доступ неавторизованным пользователям к приватным статьям вашего каталога.

Для этого нужно сформировать специальный ключ авторизации -- тикет, и передать его в параметрах ссылки: `{URL докпортала}?t={тикет}`. Тикет шифрует время, когда он истекает, текстовым ключом (токеном), который указывается в файле `.doc-root.yaml` вашего каталога, в следующем виде:

```yaml
auth:
    accessToken: testToken # ключ, которым шифруется тикет
    groups: # список групп, которые даются пользователю. Может не указываться
        - test
```

Подробнее о группах и ограничении прав на чтение можно прочитать в этой [статье](../catalog/private.md).

:::note
Учтите, что пользователи с помощью токена получат доступ ко всем статьям со свойством `private: true`, т.к. эти статьи доступны для всех авторизированных пользователей.
:::

## Алгоритм генерации тикета

1. Берется время, когда истекает тикет, в миллисекундах прошедших с 1 января 1970г в UTC (`DateTime.now()` в JavaScript).
2. Вычисляется 256-битный ключ из текстового ключа (в кодировке UTF-8), алгоритмом SHA256.
3. Время преобразуется из кодировки UTF-8 в набор байт.
4. Время шифруется алгоритмом AES-256 с помощью 256-битного ключа и сгенерированного вами вектора инициализации `IV`.
5. Возвращается строка следующего вида: `{IV в кодировке Base64}:{полученная зашифрованная строка в кодировке Base64}`.

:::note
Не забудьте выполнить экранирование специальных символов в строке, перед передачей ее в URL.
:::

:::info Автоматическая генерация в MDT
В MDT настроен готовый модуль для генерация тикета. Подробнее можно узнать по [ссылке](https://docs.ics-it.ru/mdt/content/help)
:::

## Пример кода, генерирующего тикет на C#

```cs
using System.Security.Cryptography;
using System.Text;
using System;
using System.Globalization;

public static class UrlProvider
{
	public static string GetHelpUrl()
	{
		var helpUrl = Settings.GetValue<string>("mdt.help.helpUrl"); // ссылка на портал документации
		var accessToken = Settings.GetValue<string>("mdt.help.docPortalCatalogAccessToken"); // текстовый ключ
		var jsTime = GetJsTimeSpanNow()
			.Add(TimeSpan.FromMinutes(1))
			.TotalMilliseconds;
		var (iv, encrypted) = Encrypt(jsTime.ToString(CultureInfo.InvariantCulture), accessToken);
		return helpUrl + "?t=" + Uri.EscapeDataString(iv + ":" + encrypted);
	}

	private static (string iv, string encrypted) Encrypt(string data, string key)
	{
		var bdata = Encoding.UTF8.GetBytes(data);
		byte[] bkey = null;
		string iv = null;
		string encrypted = null;
		using (var sha256 = SHA256.Create())
		{
			bkey = sha256.ComputeHash(Encoding.UTF8.GetBytes(key));
		}

		using (var aes = Aes.Create())
		{
			aes.Key = bkey;
			iv = Convert.ToBase64String(aes.IV);
			using (var encryptor = aes.CreateEncryptor())
			{
				encrypted = Convert.ToBase64String(encryptor.TransformFinalBlock(bdata, 0, bdata.Length));
			}

		}

		return (iv, encrypted);
	}

	private static TimeSpan GetJsTimeSpanNow()
	{
		return DateTime.UtcNow
			.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc));
	}
}
```
