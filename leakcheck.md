* * *

API v2 documentation

* * *

Page Contents

Getting API key

Authorization

Sample query

Result explained

What you can search

Errors

Limitations

Commercial usage

Differences between V1

Last edited by

LeakCheck Team

04/25/2024

## [¶](https://wiki.leakcheck.io/en/api/api-v2-pro\#getting-api-key) Getting API key

You can obtain your personal API key in account settings.

## [¶](https://wiki.leakcheck.io/en/api/api-v2-pro\#authorization) Authorization

After getting a key, pass it in "X-API-Key" header:

``` language-none
Accept: application/json
X-API-Key: 8cb2237d0679ca88db6464eac60da96345513964
```

Copy

## [¶](https://wiki.leakcheck.io/en/api/api-v2-pro\#sample-query) Sample query

↪️ GET `https://leakcheck.io/api/v2/query/example@example.com`

```yaml
{
    "success": true,
    "found": 1,
    "quota": 400,
    "result": [\
        {\
            "email": "example@example.com",\
            "source": {\
                "name": "BreachedWebsite.net",\
                "breach_date": "2019-07",\
                "unverified": 0,\
                "passwordless": 0,\
                "compilation": 0\
            },\
            "first_name": "Example",\
            "last_name": "Example",\
            "username": "leakcheck",\
            "fields": ["first_name", "last_name", "username"]\
        }\
    ]
}
```

Copy

Or, if nothing found:

```yaml
{
    "success": true,
    "found": 0,
    "quota": 400,
    "result": []
}
```

Copy

## [¶](https://wiki.leakcheck.io/en/api/api-v2-pro\#result-explained) Result explained

| Column | Description |
| --- | --- |
| found | Number of rows found and returned |
| quota | The number of queries remaining on your account |
| result | Array of associative arrays containing the results of the search |

> There can be various data from breached databases, the list includes but is not limited to: `username`, `password`, `first_name`, `last_name`, `dob`, `address`, `zip`, `phone`, `name`.

## [¶](https://wiki.leakcheck.io/en/api/api-v2-pro\#what-you-can-search) What you can search

By default, the type of search is determined automatically. If you prefer, you can specify it explicitly using query parameter `?type=`.

| Type | Sample | Notes |
| --- | --- | --- |
| auto | [example@example.com](mailto:example@example.com), example, 12345678, 31c5543c1734d25c7206f5fd | Only email, username, phone number and hash can be detected automatically. For other data you should set type explicitly. |
| email | [example@example.com](mailto:example@example.com) |  |
| domain | [gmail.com](https://gmail.com/) |  |
| keyword | example |  |
| username | example |  |
| phone | 12063428631 |  |
| hash | 31c5543c1734d25c7206f5fd | SHA256 hash of lower-cased email. You can also truncate it to 24 characters |
| phash | 31c5543c1734d25c7206f5fd | SHA256 hash of password. You can also truncate it to 24 characters (Enterprise only) |
| origin | [example.com](http://example.com/) | Enterprise only |
| password | example | Enterprise only |

You can also specify limit and offset using query parameters. As now, limit can't be bigger than 1000 and offset than 2500.

## [¶](https://wiki.leakcheck.io/en/api/api-v2-pro\#errors) Errors

| Error | Status code |
| --- | --- |
| Missing X-API-Key header | 401 |
| Invalid X-API-Key | 400 |
| Invalid type | 400 |
| Invalid email | 400 |
| Invalid query | 400 |
| Invalid domain | 400 |
| Too short query (< 3 characters) | 400 |
| Invalid characters in query | 400 |
| Too many requests | 429 |
| Active plan required | 403 |
| Limit reached | 403 |
| Could not determine search type automatically | 422 |

## [¶](https://wiki.leakcheck.io/en/api/api-v2-pro\#limitations) Limitations

By default, the LeakCheck Pro API is limited to 3 requests per second on any plan. You can increase this limit in the settings.

## [¶](https://wiki.leakcheck.io/en/api/api-v2-pro\#commercial-usage) Commercial usage

You're free to use our Public API for commercial purposes. If you wish to use our Pro API, please [contact our support team](mailto:the@leakcheck.net) and describe your project.

## [¶](https://wiki.leakcheck.io/en/api/api-v2-pro\#differences-between-v1) Differences between V1

In v2 we have combined all the data together, so there are no search types like "pass\_login" or "domain\_email". Just use "password" or "domain".

1. 🚀 **1.5x faster** for regular queries and **3x** for domain queries, expect almost no latency.
2. 📄 Filled with data compiled from all leaked databases.
3. 🦠 It's now possible to search the data from stealer logs by their origin.
4. 🔍 REST complaint and simplified search.
5. 🔓 **No more IP linking**. Hooray!