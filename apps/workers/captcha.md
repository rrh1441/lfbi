Go up

[Captcha Solver API](https://2captcha.com/2captcha-api) [Proxy API](https://2captcha.com/proxy/api)

# 2Captcha API v1

![New JSON API](https://2captcha.com/dist/web/assets/new-json-api-CYnesebS.svg)

## Try new API. API v2 is built on JSON

The earlier API v1 continues to be stable and supported. If you do not plan to use the new API v2, no action is required. We support both versions of the API.

[Try API v2](https://2captcha.com/api-docs)

Close notification and continue reading API v1

2Captcha is a human-powered image and CAPTCHA recognition service. 2Captcha's main purpose is solving your CAPTCHAs in a quick and accurate way by human employees, but the service is not limited only to CAPTCHA solving. You can convert to text any image that a human can recognize.

### [Introduction](https://2captcha.com/2captcha-api\#introduction)

We provide an API that allows you to automate the process and integrate your software with our service.

There are few simple steps to solve your captcha or recognize the image:

1. Send your image or captcha to our server.
2. Get the ID of your task.
3. Start a cycle that checks if your task is completed.
4. Get the result.

### [Recent Changes](https://2captcha.com/2captcha-api\#recent-changes)

**April 28, 2025**

Added [CaptchaFox](https://2captcha.com/2captcha-api#captchafox) support

**December 12, 2024**

Added [Prosopo Procaptcha](https://2captcha.com/2captcha-api#prosopo-procaptcha) support

**April 22, 2024**

Added [Tencent captcha](https://2captcha.com/2captcha-api#tencent) support

**April 12, 2024**

Added [atbCAPTCHA](https://2captcha.com/2captcha-api#atb-captcha) support

**December 19, 2023**

Added [Friendly Captcha](https://2captcha.com/2captcha-api#friendly-captcha) support

**November 14, 2023**

Added [Cutcaptcha](https://2captcha.com/2captcha-api#cutcaptcha) support

**September 21, 2023**

Added support for [CyberSiARA](https://2captcha.com/2captcha-api#cybersiara), [MTCaptcha](https://2captcha.com/2captcha-api#mtcaptcha) and [DataDome](https://2captcha.com/2captcha-api#datadome)

**March 16, 2023**

Added [Audio](https://2captcha.com/2captcha-api#audio) recognition method

**January 27, 2023**

Added [Amazon WAF](https://2captcha.com/2captcha-api#amazon-waf) support

**December 7, 2022**

Added [Cloudflare Turnstile](https://2captcha.com/2captcha-api#turnstile) support

**October 13, 2022**

Temporary removed [TikTok](https://2captcha.com/2captcha-api#solving_tiktok) method

**July 29, 2022**

Added [Lemin method](https://2captcha.com/2captcha-api#lemin)

**March 24, 2022**

Added [Geetest v4](https://2captcha.com/2captcha-api#geetest-v4) support

**July 6, 2021**

Added recaptcha.net domain support for reCAPTCHA

**January 21, 2021**

Updated [reCAPTCHA Enterprise](https://2captcha.com/2captcha-api#solving_recaptcha_enterprise) method

**December 22, 2020**

Added [Demo](https://2captcha.com/2captcha-api#demo) page

**September 1, 2020**

Added [reCAPTCHA Enterprise method](https://2captcha.com/2captcha-api#solving_recaptcha_enterprise)

**July 27, 2020**

Added [TikTok method](https://2captcha.com/2captcha-api#solving_tiktok)

**June 1, 2020**

Added [Capy method](https://2captcha.com/2captcha-api#solving_capy)

**May 29, 2020**

Added support of data-s, cookies and userAgent for [reCAPTCHA V2](https://2captcha.com/2captcha-api#solving_recaptchav2_new)

**July 4, 2019**

Added `surl` parameter support for [FunCaptcha](https://2captcha.com/2captcha-api#solving_funcaptcha_new)

**June 18, 2019**

Added [pingback management](https://2captcha.com/setting/pingback) interface. [More info here](https://2captcha.com/2captcha-api#manage_pingback)

**May 31, 2019**

ReportGOOD method added and it is recommended to use it. [More info here](https://2captcha.com/2captcha-api#complain)

**February 11, 2019**

Added Geetest API. [More info here](https://2captcha.com/2captcha-api#solving_geetest)

**February 1, 2019**

Added debugging method. [More info here](https://2captcha.com/2captcha-api#debugging)

**December 19, 2018**

Added reCAPTCHA V3 method description. [More info here](https://2captcha.com/2captcha-api#solving_recaptchav3)

**September 21, 2018**

Updated pingback logic. Now you only need to register a domain/IP instead of full URL. [More info here](https://2captcha.com/2captcha-api#pingback)

**April 17, 2018**

New parameter added for extended language support [More info here](https://2captcha.com/2captcha-api#language)

**January 18, 2018**

New parameter added for invisible reCAPTCHA [More info here](https://2captcha.com/2captcha-api#invisible)

**January 17, 2018**

New method for FunCaptcha implemented! [More info here](https://2captcha.com/2captcha-api#solving_funcaptcha_new)

**December 25, 2017**

KeyCaptcha method is available again! [More info here](https://2captcha.com/2captcha-api#solving_keycaptcha)

**December 12, 2017**

AudioCaptcha method is now deprecated as non effective and unpolular method.

**September 6, 2017**

KeyCaptcha method is currenly unavailable .

**February 24, 2017**

Added some notes on Invisible reCAPTCHA solving. [More info here](https://2captcha.com/2captcha-api#invisible).

**November 24, 2016**

We've added new error codes to our API corresponding to requests limits. [More info here](https://2captcha.com/2captcha-api#limits).

**November 9, 2016**

We've added some new examples for reCAPTCHA V2 API check them out [here](https://2captcha.com/2captcha-api#examples).

**November 9, 2016**

At the moment reCAPTCHA V2 can be solved for any website. It's required to [send us the full URL of the page](https://2captcha.com/2captcha-api#pageurl) where you get reCAPTCHA (it wasn't required before). [Sending the proxy information](https://2captcha.com/2captcha-api#proxies) is not obligatory yet but it's recommended.

### [Our rates](https://2captcha.com/2captcha-api\#our-rates)

Our rates can be found on [Pricing](https://2captcha.com/pricing) page.

### [Demo page](https://2captcha.com/2captcha-api\#demo-page)

You may visit this [Demo page](https://2captcha.com/demo) to learn examples of how you can bypass different captcha types using PHP, Java and Python.

### [Solving Captchas](https://2captcha.com/2captcha-api\#solving-captchas)

Our API is based on HTTP requests and supports both HTTP and HTTPS protocols.

API endpoints:

- `https://2captcha.com/in.php` is used to submit a captcha
- `https://2captcha.com/res.php` is used to get the captcha solution

The process of solving captchas with 2Captcha is really easy and it's mostly the same for all types of captchas:

1. Get your API key from [your account settings page](https://2captcha.com/setting). Each user is given a unique authentication token, we call it _API key_. It's a 32-characters string that looks like:

`1abc234de56fab7c89012d34e56fa7b8`


This key will be used for all your requests to our server.
2. Submit a _HTTP POST_ request to our API URL: `https://2captcha.com/in.php` with parameters corresponding to the type of your captcha.


Server will return captcha ID or an [error code](https://2captcha.com/2captcha-api#error_handling) if something went wrong.
3. Make a timeout: 20 seconds for reCAPTCHA, 5 seconds for other types of captchas.
4. Submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.


If captcha is already solved server will return the answer in format corresponding to the type of your captcha.


By default answers are returned as plain text like: _OK\|Your answer_. But answer can also be returned as JSON _{"status":1,"request":"TEXT"}_ if _json_ parameter is used.


If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.


If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

#### [Normal Captcha](https://2captcha.com/2captcha-api\#normal-captcha)

> Normal Captcha is an image that contains distored but human-readable text. To solve the captcha user have to type the text from the image.

To solve the captcha with our service you have to submit the image with _HTTP POST_ request to our API URL: `https://2captcha.com/in.php`

Server accepts images in _multipart_ or _base64_ format.

**Multipart sample form**

```
<form method="post" action="https://2captcha.com/in.php" enctype="multipart/form-data">
<input type="hidden" name="method" value="post">
Your key:
<input type="text" name="key" value="YOUR_APIKEY">
The CAPTCHA file:
<input type="file" name="file">
<input type="submit" value="Upload and get the ID">
</form>

```

_YOUR\_APIKEY_ is [Your API key](https://2captcha.com/2captcha-api#solving_captchas).

**Base64 sample form**

```
<form method="post" action="https://2captcha.com/in.php">
<input type="hidden" name="method" value="base64">
Your key:
<input type="text" name="key" value="YOUR_APIKEY">
The CAPTCHA file body in base64 format:
<textarea name="body">BASE64_FILE</textarea>
<input type="submit" value="Upload and get the ID">
</form>

```

_YOUR\_APIKEY_ is [your API key](https://2captcha.com/2captcha-api#solving_captchas).

_BASE64\_FILE_ is base64-encoded image body.

You can provide additional parameters with your request to define what kind of captcha you're sending and to help workers to solve your captcha correctly. You can find the full list of parameters in the [table below.](https://2captcha.com/2captcha-api#normal_post)

If everything is fine server will return the ID of your captcha as plain text, like: _OK\|2122988149_ or as JSON _{"status":1,"request":"2122988149"}_ if json parameter was used.

If something went wrong server will return an error. See [Error Handling](https://2captcha.com/2captcha-api#error_handling) chapter for the list of errors.

Make a 5 seconds timeout and submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` providing the captcha ID. The list of parameters is in the [table below](https://2captcha.com/2captcha-api#normal_get).

If everything is fine and your captcha is solved server will return the answer as plain text, like: _OK\|TEXT_ or as JSON _{"status":1,"request":"TEXT"}_ if _json_ parameter was used.

Otherwise server will return _CAPCHA\_NOT\_READY_ that means that your captcha is not solved yet. Just repeat your request in 5 seconds.

If something went wrong server will return an error. See [Error Handling](https://2captcha.com/2captcha-api#error_handling) chapter for the list of errors.

**List of _POST_ request parameters for https://2captcha.com/in.php**

| **POST parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | post - defines that you're sending an image with multipart form <br>base64 - defines that you're sending a base64 encoded image |
| file | File | Yes\* | Captcha image file. <br>\\* \- required if you submit image as a file (method=post) |
| body | String | Yes\* | Base64-encoded captcha image <br>\\* \- required if you submit image as Base64-encoded string (method=base64) |
| phrase | Integer <br>Default: 0 | No | 0 - captcha contains one word <br>1 - captcha contains two or more words |
| regsense | Integer <br>Default: 0 | No | 0 - captcha in not case sensitive <br>1 - captcha is case sensitive |
| numeric | Integer <br>Default: 0 | No | 0 - not specified <br>1 - captcha contains only numbers <br>2 - captcha contains only letters <br>3 - captcha contains only numbers OR only letters <br>4 - captcha MUST contain both numbers AND letters |
| calc | Integer <br>Default: 0 | No | 0 - not specified <br>1 - captcha requires calculation (e.g. type the result 4 + 8 = ) |
| min\_len | Integer <br>Default: 0 | No | 0 - not specified <br>1..20 - minimal number of symbols in captcha |
| max\_len | Integer <br>Default: 0 | No | 0 - not specified <br>1..20 - maximal number of symbols in captcha |
| language | Integer <br>Default: 0 | No | 0 - not specified <br>1 - Cyrillic captcha <br>2 - Latin captcha |
| lang | String | No | Language code. [See the list of supported languages.](https://2captcha.com/2captcha-api#language) |
| textinstructions | String <br>Max 140 characters <br>Endcoding: UTF-8 | No | Text will be shown to worker to help him to solve the captcha correctly. <br>For example: type red symbols only. |
| imginstructions | Image <br>Max 400x150px, 100 kB | Yes | Image with instruction for solving reCAPTCHA. <br>**Not required** if you're sending instruction as text with _textinstructions_. |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `res.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [Text Captcha](https://2captcha.com/2captcha-api\#text-captcha)

> Text Captcha is a type of captcha that is represented as text and doesn't contain images. Usually you have to answer a question to pass the verification.
>
> **For example:** "If tomorrow is Saturday, what day is today?".

To solve text captcha with our service you have to submit the text as a value of _textcaptcha_ parameter with _HTTP POST_ request to our API URL: `https://2captcha.com/in.php`

**Sample form for Text Captcha**

```
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>

<body>
<form method="post" action="https://2captcha.com/in.php" enctype="multipart/form-data" accept-charset="UTF-8">
Your key:
<input type="text" name="key" value="YOUR_APIKEY">
<input type="text" name="textcaptcha" value="If tomorrow is Saturday, what day is today?">
<input type="submit" value="Send and get the ID">
</form>
</body>
</html>

```

_YOUR\_APIKEY_ is [your API key](https://2captcha.com/2captcha-api#solving_captchas).

You can provide additional parameters with your request to tell us more about your captcha and to help workers to solve it correctly. You can find the full list of parameters in the [table below.](https://2captcha.com/2captcha-api#text_post)

If everything is fine server will return the ID of your captcha as plain text, like: _OK\|2122988149_ or as JSON _{"status":1,"request":"2122988149"}_ if json parameter was used.

If something went wrong server will return an error. See [Error Handling](https://2captcha.com/2captcha-api#error_handling) chapter for the list of errors.

Make a 5 seconds timeout and submit a _GET_ request to our API URL: `https://2captcha.com/res.php` providing the captcha ID. The list of parameters is in the [table below](https://2captcha.com/2captcha-api#text_get).

If everything is fine and your captcha is solved server will return the answer as plain text, like: _OK\|TEXT_ or as JSON _{"status":1,"request":"TEXT"}_ if _json_ parameter was used.

Otherwise server will return _CAPCHA\_NOT\_READY_ that means that your captcha is not solved yet. Just repeat your request in 5 seconds.

If something went wrong server will return an error. See [Error Handling](https://2captcha.com/2captcha-api#error_handling) chapter for the list of errors.

**List of _POST_ request parameters for https://2captcha.com/in.php**

| **POST parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| language | Integer <br>Default: 0 | No | 0 - not specified <br>1 - Cyrillic (Russian) captcha <br>2 - Latin captcha |
| lang | String | No | Language code. [See the list of supported languages.](https://2captcha.com/2captcha-api#language) |
| textcaptcha | String <br>Max 140 characters <br>Endcoding: UTF-8 | No | Text will be shown to worker to help him to solve the captcha correctly. <br>For example: type red symbols only. |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `res.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [reCAPTCHA V2](https://2captcha.com/2captcha-api\#recaptcha-v2)

> reCAPTCHA V2 also known as I'm not a robot reCAPTCHA is a very popular type of captcha that looks like this:
>
> ![reCAPTCHA V2](https://2captcha.com/assets/captcha-api-docs/img/recaptchav2.gif)

Solving reCAPTCHA V2 with our new method is pretty simple:

01. Look at the element's code at the page where you found reCAPTCHA.

02. ![Inspect reCAPTCHA V2 widget source code](https://2captcha.com/assets/captcha-api-docs/img/inspectelement.png)
03. Find a link that begins with _www.google.com/recaptcha/api2/anchor_ or find _data-sitekey_ parameter.

04. Copy the value of _k_ parameter of the link (or value of _data-sitekey_ parameter).

05. ![Find 'data-sitekey' parameter](https://2captcha.com/assets/captcha-api-docs/img/sitekey_recaptcha.png)
06. Submit a _HTTP GET_ or _POST_ request to our API URL: `https://2captcha.com/in.php` with method set to _userrecaptcha_ and provide the value found on previous step as value for _googlekey_ and full page URL as value for _pageurl_. [Sending proxies](https://2captcha.com/2captcha-api#proxies) is not obligatory ar the moment but it's recommended.


    You can find the full list of parameters in the [table below.](https://2captcha.com/2captcha-api#recaptchav2new_post)

    **Request URL example:**


    ```
    https://2captcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8&method=userrecaptcha&googlekey=6Le-wvkSVVABCPBMRTvw0Q4Muexq1bi0DJwx_mJ-&pageurl=http://mysite.com/page/with/recaptcha
    ```

07. If everything is fine server will return the ID of your captcha as plain text, like: _OK\|2122988149_ or as JSON _{"status":1,"request":"2122988149"}_ if _json_ parameter was used.


    Otherwise server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

08. Make a 15-20 seconds timeout then submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.


    The full list of parameters is in the [table below](https://2captcha.com/2captcha-api#recaptchav2new_get).

    If captcha is already solved server will respond in plain text or JSON and return the answer token that looks like:


    ```
    03AHJ_Vuve5Asa4koK3KSMyUkCq0vUFCR5Im4CwB7PzO3dCxIo11i53epEraq-uBO5mVm2XRikL8iKOWr0aG50sCuej9bXx5qcviUGSm4iK4NC_Q88flavWhaTXSh0VxoihBwBjXxwXuJZ-WGN5Sy4dtUl2wbpMqAj8Zwup1vyCaQJWFvRjYGWJ_TQBKTXNB5CCOgncqLetmJ6B6Cos7qoQyaB8ZzBOTGf5KSP6e-K9niYs772f53Oof6aJeSUDNjiKG9gN3FTrdwKwdnAwEYX-F37sI_vLB1Zs8NQo0PObHYy0b0sf7WSLkzzcIgW9GR0FwcCCm1P8lB-50GQHPEBJUHNnhJyDzwRoRAkVzrf7UkV8wKCdTwrrWqiYDgbrzURfHc2ESsp020MicJTasSiXmNRgryt-gf50q5BMkiRH7osm4DoUgsjc_XyQiEmQmxl5sqZP7aKsaE-EM00x59XsPzD3m3YI6SRCFRUevSyumBd7KmXE8VuzIO9lgnnbka4-eZynZa6vbB9cO3QjLH0xSG3-egcplD1uLGh79wC34RF49Ui3eHwua4S9XHpH6YBe7gXzz6_mv-o-fxrOuphwfrtwvvi2FGfpTexWvxhqWICMFTTjFBCEGEgj7_IFWEKirXW2RTZCVF0Gid7EtIsoEeZkPbrcUISGmgtiJkJ_KojuKwImF0G0CsTlxYTOU2sPsd5o1JDt65wGniQR2IZufnPbbK76Yh_KI2DY4cUxMfcb2fAXcFMc9dcpHg6f9wBXhUtFYTu6pi5LhhGuhpkiGcv6vWYNxMrpWJW_pV7q8mPilwkAP-zw5MJxkgijl2wDMpM-UUQ_k37FVtf-ndbQAIPG7S469doZMmb5IZYgvcB4ojqCW3Vz6Q

    ```


    If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

    If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

09. Locate the element with id _g-recaptcha-response_ and make it visible deleting _display:none_ parameter.
    ![Find html element with 'g-recaptcha-response' id](https://2captcha.com/assets/captcha-api-docs/img/g_recaptcha_response.png)

    > **Please note:** sometimes content on the page is generated dynamically and you will not see this element in html source.
    >
    > In such cases you have to explore javascript code that generates the content. "Inspect" option in Google Chrome can help in that.


    As an alternative you can just use javascript to set the value of g-recaptcha-response field:


    ```
    document.getElementById("g-recaptcha-response").innerHTML="TOKEN";

    ```

10. An input field will appear on the page. And you just have to paste the answer token to that field and submit the form.

11. ![Past received token into the field](https://2captcha.com/assets/captcha-api-docs/img/answer.png)
12. Congratulations, you've passed the recaptcha

13. ![Success](https://2captcha.com/assets/captcha-api-docs/img/hooray.png)

#### [reCAPTCHA Callback](https://2captcha.com/2captcha-api\#recaptcha-callback)

Sometimes there's no submit button and a callback function is used isntead. The function is executed when reCAPTCHA is solved.

Callback function is usually defined in `data-callback` parameter of reCAPTCHA, for example:

```
data-callback="myCallbackFunction"

```

Or sometimes it's defined as `callback` parameter of `grecaptcha.render` function, for example:

```
grecaptcha.render('example', {
'sitekey' : 'someSitekey',
'callback' : myCallbackFunction,
'theme' : 'dark'
});

```

Also there's another way to find the callback function - open javascript console of your browser and explore reCAPTCHA configuration object:

```
___grecaptcha_cfg.clients[0].aa.l.callback

```

Note that **aa.l** may change and there can be multiple clients so you have to check **clients\[1\], clients\[2\]** too.

Or just use [the script that finds reCAPTCHA parameters](https://gist.github.com/2captcha/2ee70fa1130e756e1693a5d4be4d8c70)

Finally all you have to do is to call that function:

```
myCallbackFunction();

```

Or even this way:

```
___grecaptcha_cfg.clients[0].aa.l.callback();

```

Sometimes it is required to provide an argument and in most cases you should put the token there. For example:

```
myCallbackFunction('TOKEN');

```

#### [Invisible reCAPTCHA V2](https://2captcha.com/2captcha-api\#invisible-recaptcha-v2)

reCAPTCHA V2 also has an invisible version.

You may check how it looks like here: [https://www.google.com/recaptcha/api2/demo?invisible=true](https://www.google.com/recaptcha/api2/demo?invisible=true)

Recently we noticed some changes in invisible reCAPTCHA algorithms on few websites and added [new parameter](https://2captcha.com/2captcha-api#recaptchav2new_post) `invisible=1` that should be used for invisible reCAPTCHA.

Read more about invisible reCAPTCHA below.

Invisible reCAPTCHA is located on a DIV layer positioned -10 000 px from top that makes it invisible for user.

reCAPTCHA is activated on page load or on user's actions like click somewhere or submit a form - that depends on the website. If user's cookies are good enough then he will just pass it automatically and no additional actions will be required. Otherwise user will see standard reCAPTCHA form with a challenge.

In most cases when challenge is completed a callback function is executed. You can read more about callback [here](https://2captcha.com/2captcha-api#callback).

If you are still not sure — there are few ways to determine that reCAPTCHA is in invisible mode:

- You don't see "I'm not a robot" checkbox on the page but getting recaptcha challenge when making some actions there
- reCAPTCHA's iframe link contains parameter `size=invisible`
- reCAPTCHA's configuration object contains parameter size that is set to invisible, for example `___grecaptcha_cfg.clients[0].aa.l.size` is equal to `invisible`

**How to bypass invisible reCAPTCHA in browser?**

**Method 1: using javascript:**

1. Change the value of g-recaptcha-response element to the token you received from our server:

document.getElementById("g-recaptcha-response").innerHTML="TOKEN";

2. Execute the action that needs to be performed on the page after solving reCAPTCHA.


Usually there's a form that should be submitted and you need to identify the form by id or name or any other attribute and then submit the form. Here are few examples:

```
document.getElementById("recaptcha-demo-form").submit(); //by id "recaptcha-demo-form"
document.getElementsByName("myFormName")[0].submit(); //by element name "myFormName"
document.getElementsByClassName("example").submit(); //by class name "example"

```

Or sometimes there's a callback function executed when reCAPTCHA is solved.

Callback function is usually defined in `data-callback` parameter of reCAPTCHA, for example:

```
data-callback="myCallbackFunction"

```

Or sometimes it's defined as `callback` parameter of `grecaptcha.render` function, for example:

```
grecaptcha.render('example', {
'sitekey' : 'someSitekey',
'callback' : myCallbackFunction,
'theme' : 'dark'
});

```

And all you have to do is to call that function:

```
myCallbackFunction();

```

13. Voila! You've done that with just 2 strings of code.

**Method 2: changing HTML:**

1. Cut the div containing reCAPTCHA from page body.


```html
<div style="visibility: hidden; position: absolute; width:100%; top: -10000px; left: 0px; right: 0px; transition: visibility 0s linear 0.3s, opacity 0.3s linear; opacity: 0;">
<div style="width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; z-index: 2000000000; background-color: #fff; opacity: 0.5;  filter: alpha(opacity=50)">
</div>
<div style="margin: 0 auto; top: 0px; left: 0px; right: 0px; position: absolute; border: 1px solid #ccc; z-index: 2000000000; background-color: #fff; overflow: hidden;">
<iframe src="https://www.google.com/recaptcha/api2/bframe?hl=en&amp;v=r20170213115309&amp;k=6LfP0CITAAAAAHq9FOgCo7v_fb0-pmmH9VW3ziFs#zglq3yifgkmj" title="recaptcha challenge" style="width: 100%; height: 100%;" scrolling="no" name="zglq3yifgkmj" frameborder="0"></iframe>
</div>
</div>
```

2. Cut the whole block:


```html
<div class=""><!-- BEGIN: ReCAPTCHA implementation example. -->
<div id="recaptcha-demo" class="g-recaptcha" data-sitekey="6LfP0CITAAAAAHq9FOgCo7v_fb0-pmmH9VW3ziFs" data-callback="onSuccess" data-bind="recaptcha-demo-submit"><div class="grecaptcha-badge" style="width: 256px; height: 60px; transition: right 0.3s ease 0s; position: fixed; bottom: 14px; right: -186px; box-shadow: 0px 0px 5px gray;"><div class="grecaptcha-logo"><iframe src="https://www.google.com/recaptcha/api2/anchor?k=6LfP0CITAAAAAHq9FOgCo7v_fb0-pmmH9VW3ziFs&amp;co=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbTo0NDM.&amp;hl=en&amp;v=r20170213115309&amp;size=invisible&amp;cb=uror1hlow5a" title="recaptcha widget" scrolling="no" name="undefined" width="256" height="60" frameborder="0"></iframe></div><div class="grecaptcha-error"></div><textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid #c1c1c1; margin: 10px 25px; padding: 0px; resize: none;  display: none; "></textarea></div></div>
<script>
var onSuccess = function (response) {
var errorDivs = document.getElementsByClassName("recaptcha-error");
if (errorDivs.length) {
       errorDivs[0].className = "";
}
var errorMsgs = document.getElementsByClassName("recaptcha-error-message");
if (errorMsgs.length) {
       errorMsgs[0].parentNode.removeChild(errorMsgs[0]);
}
document.getElementById("recaptcha-demo-form").submit();
};
</script><!-- Optional noscript fallback. --><!-- END: ReCAPTCHA implementation example. --></div>
```

3. Put the following code instead of the block you've just cut:


```html
<input type="submit">
<textarea name="g-recaptcha-response">%g-recaptcha-response%</textarea>
```


Where _%g-recaptcha-response%_ \- is an answer token you’ve got from our service.8. You will see “Submit query” button.

Press the button to submit the form with g-recaptcha-response and all other form data to the website.

**List of GET/POST request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | userrecaptcha - defines that you're sending a reCAPTCHA V2 with new method |
| enterprise | String <br>Default: 0 | No | 1 - defines that you're sending reCAPTCHA Enterpise V2 |
| googlekey | String | Yes | Value of _k_ or _data-sitekey_ parameter you found on page |
| pageurl | String | Yes | Full URL of the page where you see the reCAPTCHA |
| domain | String <br>Default: google.com | No | Domain used to load the captcha: google.com or recaptcha.net |
| invisible | Integer <br>Default: 0 | No | 1 - means that reCAPTCHA is invisible. 0 - normal reCAPTCHA. |
| data-s | String | No | Value of _data-s_ parameter you found on page. Curenttly applicable for Google Search and other Google services. |
| cookies | String | No | Your _cookies_ that will be passed to our worker who solve the captha. We also return worker's cookies in the response if you use `json=1`. <br>Format: KEY:Value, separator: semicolon, example: `KEY1:Value1;KEY2:Value2;` |
| userAgent | String | No | Your _userAgent_ that will be passed to our worker and used to solve the captcha. |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |
| proxy | String | No | Format: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies). |
| proxytype | String | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [reCAPTCHA V3](https://2captcha.com/2captcha-api\#recaptcha-v3)

> reCAPTCHA V3 is the newest type of captcha from Google. It has no challenge so there is no need for user interaction. Instead it uses a "humanity" rating - score.

reCAPTCHA V3 technically is quite similar to reCAPTCHA V2: customer receives a token from reCAPTCHA API which is then sent inside a POST request to the target website and verified via reCAPTCHA API.

The difference is now reCAPTCHA API returns rating of a user detecting whether he was a real human or a bot. This rating is called score and could be a number from 0.1 to 0.9. This score is passed to the website which then decides what to do with the user request.

Also there is a new parameter _action_ allowing to process user actions on the website differently. After the verification of token reCAPTCHA API returns the name of the action user performed.

**Our approach for solving reCAPTCHA V3**

We've performed many experiments and figured out that if a user got score 0.1 on some website then he is likely to get the same score on other websites.

We are detecting the scores of our workers. Then when we've got a request for solving reCAPTCHA V3 with the minimal rating _min\_score_ we pass the captcha to the worker with the requested rating or higher. Most of the requests will get the requested rating on targer websites with reCAPTCHA V3.

How to solve reCAPTCHA V3 using 2Captcha:

1. First you've got to be sure the target website is actually using reCAPTCHA V3

There should be V3 if:
   - there is no captcha and no images to click on
   - api.js script is loading with the _render=sitekey_ parameter, for example:

     _https://www.google.com/recaptcha/api.js?render=6LfZil0UAAAAAAdm1Dpzsw9q0F11-bmervx9g5fE_
   - clients array of \_\_\_grecaptcha\_cfg object is using index 100000: _\_\_\_grecaptcha\_cfg.clients\[100000\]_
2. To start solving reCAPTCHA V3 using our API first you've got to find three parameters:

**sitekey** \- this parameter could be obtained from the URI of api.js as a value of _render_ parameter. It could also be found inside URI of iframe with reCAPTCHA, in javascript code of the website where it's calling grecaptcha.execute function or in \_\_\_grecaptcha\_cfg configuration object.

**action** \- you've got to find this inspecting javascript code of the website looking for call of grecaptcha.execute function. Example: _grecaptcha.execute('6LfZil0UAAAAAAdm1Dpzsw9q0F11-bmervx9g5fE', {action: do\_something})_.


Sometimes it's really hard to find it and you've got to dig through all js-files loaded by website. You may also try to find the value of action parameter inside \_\_\_grecaptcha\_cfg configuration object but usually it's undefined. In that case you have to call grecaptcha.execute and inspect javascript code. If you can't find it try to use the default value "verify" - our API will use it if you don't provide action in your request.

**pageurl** \- full URL of the page where you see the reCAPTCHA V3.

Now you need to understand the _score_ you need to solve V3. You can't predict what score is acceptable for the website you want to solve at. It can only be figured out by trial and error. The lowest score is 0.1 which means "robot", the highest is 0.9 which means "human". But most sites uses thresholds from 0.2 to 0.5 because real humans receive a low score oftenly. Our service is able to provide solutions which requires the score of 0.3. Higher score is extreamly rare among workers.

3. Having all necessary parameters stated above you may send request to our API.

4. Submit a _HTTP GET_ or _POST_ request to our API URL:

`https://2captcha.com/in.php`


with _method_ set to _userrecaptcha_ and _version_ set to _v3_ along with _min\_score_ set to score website requires, sitekey inside _googlekey_ parameter and full page URL as value for _pageurl_. You have to include _action_ parameter to or else we will use default value _verify_.

List of request parameters [below](https://2captcha.com/2captcha-api#recaptchav3_post).

**URL request sample:**


```
https://2captcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8&method=userrecaptcha&version=v3&action=verify&min_score=0.3
&googlekey=6LfZil0UAAAAAAdm1Dpzsw9q0F11-bmervx9g5fE&pageurl=http://mysite.com/page/

```

5. If everything is fine server will return the ID of your captcha as plain text, like: _OK\|2122988149_ or as JSON _{"status":1,"request":"2122988149"}_ if json parameter was used.

If something went wrong server will return an error. See [Error Handling](https://2captcha.com/2captcha-api#error_handling) chapter for the list of errors.

6. Make a 10-15 seconds timeout and submit a _HTTP GET_ request to our API `https://2captcha.com/res.php` providing the captcha ID. The list of parameters is in the [table below](https://2captcha.com/2captcha-api#recaptchav3_get).

If everything is fine and your captcha is solved server will return the answer as plain text or as JSON. The answer is a token like this:


```
03AHJ_Vuve5Asa4koK3KSMyUkCq0vUFCR5Im4CwB7PzO3dCxIo11i53epEraq-uBO5mVm2XRikL8iKOWr0aG50sCuej9bXx5qcviUGSm4iK4NC_Q88flavWhaTXSh0VxoihBwBjXxwXuJZ-WGN5Sy4dtUl2wbpMqAj8Zwup1vyCaQJWFvRjYGWJ_TQBKTXNB5CCOgncqLetmJ6B6Cos7qoQyaB8ZzBOTGf5KSP6e-K9niYs772f53Oof6aJeSUDNjiKG9gN3FTrdwKwdnAwEYX-F37sI_vLB1Zs8NQo0PObHYy0b0sf7WSLkzzcIgW9GR0FwcCCm1P8lB--gf50q5BMkiRH7osm4DoUgsjc_XyQiEmQmxl5sqZP7aKsaE-EM00x59XsPzD3m3YI6SRCFRUevSyumBd7KmXE8VuzIO9lgnnbka4-eZynZa6vbB9cO3QjLH0xSG3--o-fxrOuphwfrtwvvi2FGfpTexWvxhqWICMFTTjFBCEGEgj7_IFWEKirXW2RTZCVF0Gid7EtIsoEeZkPbrcUISGmgtiJkJ_KojuKwImF0G0CsTlxYTOU2sPsd5o1JDt65wGniQR2IZufnPbbK76Yh_KI2DY4cUxMfcb2fAXcFMc9dcpHg6f9wBXhUtFYTu6pi5LhhGuhpkiGcv6vWYNxMrpWJW_pV7q8mPilwkAP-zw5MJxkgijl2wDMpM-UUQ_k37FVtf-ndbQAIPG7S469doZMmb5IZYgvcB4ojqCW3Vz6Q

```


If the captcha is not solved yet server will return _CAPCHA\_NOT\_READY_. Just repeat your request in 5 seconds.

If something went wrong server will return an error. See [Error Handling](https://2captcha.com/2captcha-api#error_handling) chapter for the list of errors.

**Sample request:**


```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&json=1&id=2122988149

```

7. After receiving the token from our API you've got to use it properly on the target website. Best way to understant that is to check the requests sent to site when you act as a normal user. Most browsers has developer's console tool where you should check Network tab.

Usually token is sent using POST request. It could be _g-recaptcha-response_ just like reCAPTCHA V2 does or _g-recaptcha-response-100000_. It could be other parameter too. So you've got to inspect the requests and find out how exactly the token supposed to be sent. Then you have to compose your request accordingly.

8. Now when you have successfully submit the token you may tell us if it worked or not. If not we will refund the money you spent on this token. If it was successfully accepted we will set the worker who solved this captcha as the priority solver for you. Besides we will gather statistics regarding V3 solution which will help us to further investigate this new type of captchas and make our service better.

To let us know whether it worked or not please send the request to `https://2captcha.com/res.php` with your API Key in _key_ parameter with ID of the captcha in _id_ parameter and indicating _action_ parameter. Next to mention is _reportgood_ if token was accepted successfully or _reportbad_ if token wasn't accepted respectfully.

**Request examples:**

ReportBAD


```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=reportbad&id=2122988149

```


ReportGOOD


```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=reportgood&id=2122988149

```


Important: complains for captcha types solved with token are not shown on the website. But we proceed with every report and gather the statistics. We will implement this complain display feature in future.


**List of GET/POST request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | userrecaptcha — defines that you're sending a reCAPTCHA |
| version | String | Yes | v3 — defines that you're sending a reCAPTCHA V3 |
| enterprise | String <br>Default: 0 | No | 1 - defines that you're sending reCAPTCHA Enterpise V3 |
| googlekey | String | Yes | Value of sitekey parameter you found on page |
| pageurl | String | Yes | Full URL of the page where you see the reCAPTCHA |
| domain | String <br>Default: google.com | No | Domain used to load the captcha: google.com or recaptcha.net |
| action | String <br>Default: verify | No | Value of action parameter you found on page |
| min\_score | Integer <br>Default: 0.4 | No | The score needed for resolution. Currently it's almost impossible to get token with score higher than 0.3 |
| header\_acao | Integer <br>Default: 0 | No | 0 — disabled <br>1 — enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_: header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. URL should be registered on the server. More info [here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 — server will send the response as plain text <br>1 — tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |

**List of GET request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get — get the asnwer for your captcha <br>reportgood — - report the asnwer was accepted <br>reportbad — - report the asnwer was declined |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 — server will send the response as plain text <br>1 — tells the server to send the response as JSON |
| header\_acao | Integer <br>Default: 0 | No | 0 — disabled <br>1 — enabled. <br>If enabled res.php will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. |

#### [reCAPTCHA Enterprise](https://2captcha.com/2captcha-api\#recaptcha-enterprise)

> reCAPTCHA Enterprise is the newest type of captcha from Google. It can be used as V2 and V3 and provides website administrators an option to report the interaction result - was it a human or not.

How to solve reCAPTCHA Enterprise using 2Captcha:

1. First step is to determine that Enterpise version of reCAPTCHA is used. The main Enterprise attributes are:
   - `enterprise.js` script instead of `api.js` is included on the page <script src="https://recaptcha.net/recaptcha/enterprise.js" async="" defer=""></script>
   - `grecaptcha.enterprise.METHOD` calls in javascript code of the website instead of `grecaptcha.METHOD`
2. Then you need to determine which implementation is used: V2, V2 Invisible or V3. It is quite easy, just follow the flowchart below, it works in 99% of cases.
![reCAPTCHA Enterprise flow](https://2captcha.com/assets/captcha-api-docs/img/recap_ver_flow.png)
3. Find captcha parameters the same way it is done for V2 or V3.

For V2 implementations there can be **optional** additional data used: in most cases that is a custom string value defined in `s` or `data-s` parameter. You can pass this data inside `data-s` request parameter.

For V3 you may also need the `action` value. To find it you need to dive into javascript code of the website and find the `grecaptcha.enterprise.execute` call. Action is passed to this call. But keep in mind that action is optional and can remain undefined.

4. Add an additional parameter `enterprise=1` to your request to `in.php` endpoint and interact with our API the same way it is done when [solving V2](https://2captcha.com/2captcha-api#solving_recaptchav2_new) or [solving V3](https://2captcha.com/2captcha-api#solving_recaptchav3) to get the token, then use the token in the same way it is used on your target website.


#### [Grid method](https://2captcha.com/2captcha-api\#grid-method)

This method allows to solve any captcha where image can be divided into equal parts like reCAPTCHA V2. A grid is applied above the image. And you receive the numbers clicked boxes.

To solve the captcha you have to:

1. Prepare the image and the instruction what to click. The instruction can be sent as text or as image. Don't forget to indicate the instruction [language](https://2captcha.com/2captcha-api#language)!

2. **Optionally:** determine the grid and define it in your request with _recaptchacols_ and _recaptcharows_ parameters.


If not defined we'll check the size of the image. If it's 300x300px we put 3x3 grid on it. If the size is different we put 4x4 grid.

3. Submit a _HTTP POST_ request to our API URL: `https://2captcha.com/in.php` including _recaptcha_ parameter set to _1_.

Server accepts images in multipart or base64 format.

Also you can provide instructions as an image using _imginstructions_ parameter. For more info please check the full list of parameters in the [table below.](https://2captcha.com/2captcha-api#grid_post)

4. Server will return captcha ID or an [error code](https://2captcha.com/2captcha-api#error_handling) if something went wrong.

5. Make a 5 seconds timeout and submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.

If captcha is already solved server will return the answer with numbers of grid cells that you need to click like: _OK\|click:3/8/9_.

Grid cells are numbered starting from number 1 from left to right and from top to bottom.

If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

6. You simulate clicks on cells from the answer.

7. If reCAPTCHA updates the set of images you can send us new request with an additional parameter _previousID_ and the ID of previous request as a value. Then our worker will check only new images that were not selected by previous worker.

8. Also you can proivde additional parameter _can\_no\_answer_ in case if there's no images to click left. Worker will see a button to confirm that there's no corresponding images and API will return _No\_matching\_images_ as answer.


**Canvas method**

If you need to solve challenges that ask to **select around object** you can pass _canvas_ parameter set to _1_.

Server will return the result in the following format: _canvas:x,y,x,y,x,y;x,y,x,y,x,y;_

Where each pair of x and y are coordinates of points you need to click to select an area around object. If there are more than one area, coordininates of areas will be separated by semicolon.

For example:

_canvas:5,5,3,91,93,90,90,7,8,6;_ \- one area

_canvas:5,5,3,91,93,90,90,7,8,6;208,211,208,287,294,294,293,209,207,210;_ \- two areas

Point **0,0** is **top left** corner of the image.

You need to click on these points one by one to pass the challenge.

**Multipart sample form for Grid method**

```
<form method="post" action="https://2captcha.com/in.php" enctype="multipart/form-data">
<input type="hidden" name="method" value="post">
<input type="hidden" name="recaptcha" value="1"><br>
<input type="hidden" name="canvas" value="0"><br>
Your key:
<input type="text" name="key" value="YOUR_APIKEY">
reCAPTCHA file:
<input type="file" name="file">
Image with instruction:
<input type="file" name="imginstructions">
<input type="submit" value="Upload and get the ID">
</form>

```

_YOUR\_APIKEY_ is [Your API key](https://2captcha.com/2captcha-api#solving_captchas).

**Base64 sample form for Grid method**

```
<form method="post" action="https://2captcha.com/in.php">
<input type="hidden" name="method" value="base64">
<input type="hidden" name="recaptcha" value="1"><br>
<input type="hidden" name="canvas" value="0"><br>
Your key:
<input type="text" name="key" value="YOUR_APIKEY">
reCAPTCHA file body in base64 format:
<textarea name="body">BASE64_RECAPTCHA_FILE</textarea>
Image with instruction body in base64 format:
<textarea name="imginstructions">BASE64_INSTRUCTION_FILE</textarea>
<input type="submit" value="Upload and get the ID">
</form>

```

_YOUR\_APIKEY_ is [your API key](https://2captcha.com/2captcha-api#solving_captchas).

_BASE64\_RECAPTCHA\_FILE_ is base64-encoded image body of reCAPTCHA V2.

_BASE64\_INSTRUCTION\_FILE_ is base64-encoded image body of image with instruction.

**List of _POST_ request parameters for https://2captcha.com/in.php**

| **POST parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | post - defines that you're sending an image with multipart form <br>base64 - defines that you're sending a base64 encoded image |
| recaptcha | Integer | Yes | 1 - defines that you're sending recatcha as image |
| canvas | Integer <br>Default: 0 | No | 1 - defines that you want to use [canvas method](https://2captcha.com/2captcha-api#canvas) |
| file | File | Yes\* | Captcha image file. <br>\\* \- required if you submit image as a file (method=post) |
| body | String | Yes\* | Base64-encoded captcha image <br>\\* \- required if you submit image as Base64-encoded string (method=base64) |
| textinstructions | String <br>Max 140 characters <br>Endcoding: UTF-8 | Yes | Text with instruction for solving reCAPTCHA. <br>For example: select images with trees. <br>**Not required** if you're sending instruction as an image with _imginstructions_. |
| imginstructions | Image <br>Max 400x150px, 100 kB | Yes | Image with instruction for solving reCAPTCHA. <br>**Not required** if you're sending instruction as text with _textinstructions_. |
| img\_type | String | No | The image will be recognized using Computer Vision, which significantly reduces the time needed to solve the captcha. Supported value options: <br>`funcaptcha` \- sending FunCaptcha, the version in which you need to click on the square matching the requirements. [More info here](https://2captcha.com/blog/funcaptcha-bypass-2-ways-solutions).<br>`funcaptcha_compare` \- sending FunCaptcha, a version in which you need to use the arrows to select the desired square. [More info here](https://2captcha.com/blog/funcaptcha-bypass-2-ways-solutions).<br>`recaptcha` \- sending reCAPTCHA. [More info here](https://2captcha.com/blog/recaptcha-recognition-using-grid-method).<br>**Important:** when using the `image_type` parameter, it is required to send the `textinstructions` parameter containing the original instructions for the captcha in English, and you also need to send the original image files and not screenshots. |
| recaptcharows | Integer | No | Number of rows in reCAPTCHA grid. |
| recaptchacols | Integer | No | Number of columns in reCAPTCHA grid. |
| min\_clicks | Integer <br>Default: 1 | No | The minimum number of tiles that must be selected. Can't be more than `recaptcharows * recaptchacols` |
| max\_clicks | Integer <br>Default: `recaptcharows * recaptchacols` | No | The maximum number of tiles that can be selected on the image |
| previousID | String | No | Id of your previous request with the same captcha challenge |
| can\_no\_answer | Integer <br>Default: 0 | No | 0 - not specified <br>1 - possibly there's no images that fit the instruction. <br>Set the value to 1 only if it's possible that there's no images matching the instruction. <br>We'll provide a button "No matching images" to worker and you will receive _No\_matching\_images_ as answer. |
| language | Integer <br>Default: 0 | No | 0 - not specified <br>1 - Cyrillic captcha <br>2 - Latin captcha |
| lang | String | No | Language code. [See the list of supported languages.](https://2captcha.com/2captcha-api#language) |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |

> **Please note:** you have to send the reCAPTCHA image itself, not its screenshot. And you dont have to combine that image with anything you like, just send it as it is.
>
> Max size for reCAPTCHA image is 600 kB.
>
> Max size for _imginstructions_ is 100 kB.

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [Coordinates method](https://2captcha.com/2captcha-api\#coordinates-method)

> This method allows you to solve any captcha that requires clicking on images, like reCAPTCHA V2.

To solve the captcha you have to:

1. Get an image and an instruction that tells you what to click.

2. Submit a _HTTP POST_ request to our API URL: `https://2captcha.com/in.php` providing _coordinatescaptcha_ parameter set to _1_.


Server accepts images in multipart or base64 format.

You can provide instruction as text using _textinstructions_ parameter, but it's not obligatory if the instruction is already indicated on the image.


But don't forget to indicate the [language](https://2captcha.com/2captcha-api#language)

The full list of parameters is in the [table below.](https://2captcha.com/2captcha-api#coordinates_post)

3. Server will return captcha ID or an [error code](https://2captcha.com/2captcha-api#error_handling) if something went wrong.

4. Make a 5 seconds timeout and submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.

If captcha is already solved server will return the answer with coordinates of points where you have to click, for example: _OK\|coordinate:x=39,y=59;x=252,y=72_. Where the point with x=0,y=0 is the upper left corner of the image.

If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

5. You simulate clicks on coordinates from the answer.


**Multipart sample form for Coordinates method**

```
<form method="post" action="https://2captcha.com/in.php" enctype="multipart/form-data">
<input type="hidden" name="method" value="post">
<input type="hidden" name="coordinatescaptcha" value="1">
Your key:
<input type="text" name="key" value="YOUR_APIKEY">
Captcha image file:
<input type="file" name="file">
Instruction:
<input type="text" name="textinstructions" value="Click on ghosts">
<input type="submit" value="Upload and get the ID">
</form>

```

_YOUR\_APIKEY_ is [Your API key](https://2captcha.com/2captcha-api#solving_captchas).

Base64 sample form for Coordinates method

```
<form method="post" action="https://2captcha.com/in.php">
<input type="hidden" name="method" value="base64">
<input type="hidden" name="coordinatescaptcha" value="1">
Your key:
<input type="text" name="key" value="YOUR_APIKEY">
Captcha image body in base64 format:
<textarea name="body">BASE64_FILE</textarea>
Instruction
<input type="text" name="textinstructions" value="Click on ghosts">
<input type="submit" value="Upload and get the ID">
</form>

```

_YOUR\_APIKEY_ is [your API key](https://2captcha.com/2captcha-api#solving_captchas).

_BASE64\_FILE_ is base64-encoded image body of the captcha.

**List of _POST_ request parameters for https://2captcha.com/in.php**

| **POST parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | post - defines that you're sending an image with multipart form <br>base64 - defines that you're sending a base64 encoded image |
| coordinatescaptcha | Integer | Yes | 1 - defines that you're sending recatcha as image |
| file | File | Yes\* | Captcha image file. <br>\\* \- required if you submit image as a file (method=post) |
| body | String | Yes\* | Base64-encoded captcha image <br>\\* \- required if you submit image as Base64-encoded string (method=base64) |
| textinstructions | String <br>Max 140 characters <br>Endcoding: UTF-8 | Yes | Text with instruction for solving the captcha. <br>For example: click on images with ghosts. <br>**Not required** if the image already contains the instruction. |
| imginstructions | Image <br>Max 400x150px, 100 kB | Yes | Image with instruction for solving reCAPTCHA. <br>**Not required** if you're sending instruction as text with _textinstructions_. |
| min\_clicks | Integer <br>Default: 1 | No | The minimum number of clicks to perform on the image |
| max\_clicks | Integer | No | The maximum number of clicks that can be performed on the image |
| language | Integer <br>Default: 0 | No | 0 - not specified <br>1 - Cyrillic captcha <br>2 - Latin captcha |
| lang | String | No | Language code. [See the list of supported languages.](https://2captcha.com/2captcha-api#language) |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [RotateCaptcha](https://2captcha.com/2captcha-api\#rotatecaptcha)

> RotateCaptcha is a type of captcha where you have to rotate images to solve it. The most popular is FunCaptcha by Arkose Labs.

![FunCaptcha](https://2captcha.com/assets/captcha-api-docs/img/funcaptcha.gif)

To solve RotateCaptcha you have to:

1. Get an image or several images that should be rotated.

2. **Optionally:** determine the angle for one rotation step and provide it as a value for _angle_ parameter.


If not defined we'll use the default value for FunCaptcha: 40 degrees.

The full list of parameters is in the [table below.](https://2captcha.com/2captcha-api#rotatecaptcha_post)

3. Submit images to our server with _HTTP POST_ request to our API URL: `https://2captcha.com/in.php` setting _method_ parameter to _rotatecaptcha_. Server accepts images only in multipart format.

Server will return captcha ID or an [error code](https://2captcha.com/2captcha-api#error_handling) if something went wrong.

4. Make a 5 seconds timeout and submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.

If captcha is already solved server will return the answer with angles for each image like: _OK\|40\|200\|-120_.


Positive values mean that images should be rotated clockwise.


Negative values mean that images should be rotated counter-clockwise.

If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.


If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

5. Rotate images to given angles to solve your RotateCaptcha.


**Sample form for RotateCaptcha**

```
<form method="post" action="https://2captcha.com/in.php" enctype="multipart/form-data">
KEY:<br>
<input  name="key" value="YOUR_APIKEY"><br>
Type<br>
<input  name="method" value="rotatecaptcha"><br>
Angle<br>
<input  name="angle" value="40"><br>
Files:<br>
<input type="file" name="file"><br>
<input type="submit" value="Upload and get the ID">
</form>

```

**Sample form for RotateCaptcha in base64 format**

```
<form method="post" action="https://2captcha.com/in.php">
KEY:<br>
<input  name="key" value="YOUR_APIKEY"><br>
Type<br>
<input  name="method" value="rotatecaptcha"><br>
Angle<br>
<input  name="angle" value="40"><br>
Files:<br>
<textarea name="body">BASE64_FILE</textarea>
<input type="submit" value="Upload and get the ID">
</form>

```

_YOUR\_APIKEY_ is [your API key](https://2captcha.com/2captcha-api#solving_captchas).

**List of _POST_ request parameters for https://2captcha.com/in.php**

| **POST parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | Captcha solving method. <br>rotatecaptcha - defines that you're sending RotateCaptcha |
| angle | Integer <br>Default: 40 | No | Angle for one rotation step in degrees. <br>If not defined we'll use the default value for FunCaptcha: 40 degrees. |
| file | File | Yes\* | Captcha image file. <br>\\* \- required if you submit image as a file |
| body | String | Yes\* | Base64-encoded captcha image <br>\\* \- required if you submit image as Base64-encoded string |
| lang | String | No | Language code. [See the list of supported languages.](https://2captcha.com/2captcha-api#language) |
| imginstructions | String | No | Image with instruction for worker to help him to solve captcha correctly. |
| textinstructions | String | No | Text will be shown to worker to help him to to solve captcha correctly. |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include `Access-Control-Allow-Origin:*` header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [Arkose Labs FunCaptcha](https://2captcha.com/2captcha-api\#arkose-labs-funcaptcha)

> Now we provide a method to solve Arkose Labs captcha (ex. FunCaptcha) with a token.

The method is pretty simple:

1. You need to locate two values on the page with Arkose Labs captcha


   - \- Public key
   - \- Service URL (surl)

Public key can be found inside `data-pkey` parameter of funcaptcha's div element or inside an input element with name `fc-token` \- just extract the key indicated after `pk` from the value of this element.

Service Url can be also found in `fc-token` \- that is a value of `surl` parameter.

Service Url is optional parameter and if you don't provide it we use a default value that is valid for most cases, but we recommend you to provide it.

2. Submit a _HTTP GET_ or _POST_ request to our API URL: `https://2captcha.com/in.php` with method set to _funcaptcha_, provide values found on previous step for _publickey_ and _surl_ parameter and full page URL as value for _pageurl_.


You can find the full list of parameters in the [table below.](https://2captcha.com/2captcha-api#funcaptcha_new_post)

**Request URL example:**


```
https://2captcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8&method=funcaptcha&publickey=12AB34CD-56F7-AB8C-9D01-2EF3456789A0&surl=https://client-api.arkoselabs.com&pageurl=http://mysite.com/page/with/funcaptcha/

```

3. If everything is fine server will return the ID of your captcha as plain text, like: _OK\|2122988149_ or as JSON _{"status":1,"request":"2122988149"}_ if _json_ parameter was used.


Otherwise server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

4. Make a 10-20 seconds timeout then submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.


The full list of parameters is in the [table below](https://2captcha.com/2captcha-api#funcaptcha_new_get).

If captcha is already solved server will respond in plain text or JSON and return the answer token that looks like:


```
3084f4a302b176cd7.96368058|r=ap-southeast-1|guitextcolor=%23FDD531|metabgclr=%23FFFFFF|metaiconclr=%23202122|meta=3|lang=en|pk=12AB34CD-56F7-AB8C-9D01-2EF3456789A0|cdn_url=https://cdn.funcaptcha.com/fc|surl=https://funcaptcha.com

```


If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

5. Locate the element with id _fc-token_ and put the token into value of this element.

6. Do the rest what you need to do on the website: submit a form or click on a button or something else.


**List of GET/POST request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | funcaptcha - defines that you're sending a FunCaptcha with token method |
| publickey | String | Yes | Value of _pk_ or _data-pkey_ parameter you found on page |
| surl | String | No | Value of _surl_ parameter you found on page |
| pageurl | String | Yes | Full URL of the page where you see the FunCaptcha |
| data\[key\] | String | No | Custom data to pass to FunCaptcha. <br>For example: data\[blob\]=stringValue |
| userAgent | String | No | Tells us to use your user-agent value. |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |
| proxy | String | No | Format: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies). |
| proxytype | String | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [KeyCaptcha](https://2captcha.com/2captcha-api\#keycaptcha)

> KeyCaptcha is a type of captcha where you have to solve a simple puzzle.

To solve KeyCaptcha with our service you have to:

1. Find the following KeyCaptcha parameters in page's source code:


```
s_s_c_user_id
s_s_c_session_id
s_s_c_web_server_sign
s_s_c_web_server_sign2

```

2. Submit a _HTTP GET_ or _POST_ request to our API URL: `https://2captcha.com/in.php` with method set to _keycaptcha_ and provide values found on previous step in your request as values for corresponding request parameters and also full page URL as value for _pageurl_.


You can find the full list of parameters in the [table below.](https://2captcha.com/2captcha-api#keycaptcha_post)

**Request URL example:**


```
    https://2captcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8&s_s_c_user_id=10&s_s_c_session_id=493e52c37c10c2bcdf4a00cbc9ccd1e8&s_s_c_web_server_sign=9006dc725760858e4c0715b835472f22-pz-&s_s_c_web_server_sign2=2ca3abe86d90c6142d5571db98af6714&method=keycaptcha&pageurl=https://www.keycaptcha.ru/demo-magnetic/

```

3. If everything is fine server will return the ID of your captcha as plain text, like: _OK\|2122988149_ or as JSON _{"status":1,"request":"2122988149"}_ if _json_ parameter was used.


Otherwise server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

4. Make a 15-20 seconds timeout then submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.


The full list of parameters is in the [table below](https://2captcha.com/2captcha-api#keycaptcha_get).

If captcha is already solved server will respond in plain text or JSON and return the answer that looks like:


```
ebdb5a6bf76da6887db60ef2041ab946|9006dc725760858e4c0715b835472f22|http://back10.keycaptcha.com/swfs/ckc/5bded85426de3c57a7529a84bd0d4d08-|493e52c37c10c2bcdf4a00cbc9ccd1e8|1

```


If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

5. Locate and delete the following block which inclides keycaptcha JavaScript file:


```
<script language="JavaScript" src="http://backs.keycaptcha.com/swfs/cap.js"></script>

```


Locate and delete the div with id="div\_for\_keycaptcha":


```
<div id="div_for_keycaptcha"...>...</div>

```



> **Please note:** sometimes content on the page is generated dynamically and you will not see these elements in HTML source or they can differ a little bit.
>
> In such cases you have to explore the source of the page and find JavaScript code that generates the content. "Inspect" option in Google Chrome can help in that.

6. Locate the element with id="capcode" and change it's value to the response received from our server.


```
<input name="capcode" id="capcode" value="1|2|3|4|5" type="hidden">

```

7. Click on submit button.


**Multipart sample form for KeyCaptcha**

```
<form method="post" action="https://2captcha.com/in.php" enctype="multipart/form-data">
Your API-KEY from 2captcha.com:
<input  name="key" value="YOUR_APIKEY"><br>
s_s_c_user_id:<br>
<input  name="s_s_c_user_id" value=""><br>
s_s_c_session_id:<br>
<input  name="s_s_c_session_id" value=""><br>
s_s_c_web_server_sign:<br>
<input  name="s_s_c_web_server_sign" value=""><br>
s_s_c_web_server_sign2:<br>
<input  name="s_s_c_web_server_sign2" value=""><br>
pageurl:<br>
<input  name="pageurl" value=""><br>
It's keycaptcha:<br>
<input type="text" value="keycaptcha" name="method"><br>
<input type="submit" value="UPLOAD AND GET ID">
</form>

```

_YOUR\_APIKEY_ is [Your API key](https://2captcha.com/2captcha-api#solving_captchas).

**List of _GET/POST_ request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | keycaptcha - defines that you're sending a KeyCaptcha |
| s\_s\_c\_user\_id | String | Yes | Value of _s\_s\_c\_user\_id_ parameter you found on page |
| s\_s\_c\_session\_id | String | Yes | Value of _s\_s\_c\_session\_id_ parameter you found on page |
| s\_s\_c\_web\_server\_sign | String | Yes | Value of _s\_s\_c\_web\_server\_sign_ parameter you found on page |
| s\_s\_c\_web\_server\_sign2 | String | Yes | Value of _s\_s\_c\_web\_server\_sign2_ parameter you found on page |
| pageurl | String | Yes | Full URL of the page where you see the KeyCaptcha |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |
| proxy | String | No | Format: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies). |
| proxytype | String | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [Geetest](https://2captcha.com/2captcha-api\#geetest)

> Geetest is a type of captcha where you have to move a piece of a puzzle or select some figures in the order.

To solve Geetest captcha with our service you have to:

1. Find the following Geetest captcha parameters on the target website (usually you can find them inside initGeetest function).
   - `gt` \- public website key (static)
   - `challenge` \- dynamic challenge key
   - `api_server` \- API domain (optional)

> **Important:** you should get a new challenge value for each request to our API. Once captcha was loaded on the page the challenge value becomes invalid. You should inspect requests made to the website when page is loaded to identify a request that gets a new challenge value. Then you should make such request each time to get a valid challenge value.

3. Submit a _HTTP GET_ or _POST_ request to our API URL: `https://2captcha.com/in.php` with method set to _geetest_ providing values found on previous step in your request as values for corresponding request parameters and also full page URL as value for _pageurl_.


You can find the full list of parameters in the [table below.](https://2captcha.com/2captcha-api#geetest_post)

**Request URL example:**


```
https://2captcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8&method=geetest&gt=f1ab2cdefa3456789012345b6c78d90e&challenge=12345678abc90123d45678ef90123a456b&api_server=api-na.geetest.com&pageurl=https://www.site.com/page/

```

4. If everything is fine server will return the ID of your captcha as plain text, like: _OK\|2122988149_ or as JSON _{"status":1,"request":"2122988149"}_ if _json_ parameter was used.


Otherwise server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

5. Make a 15-20 seconds timeout then submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.


The full list of parameters is in the [table below](https://2captcha.com/2captcha-api#geetest_get).

If captcha is already solved server will return the response in JSON. The response contains three values: `challenge`, `validate` and `seccode`:


```
{
"challenge":"1a2b3456cd67890e12345fab678901c2de",
"validate":"09fe8d7c6ba54f32e1dcb0a9fedc8765",
"seccode":"12fe3d4c56789ba01f2e345d6789c012|jordan"
}

```


If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

6. Use the values received from our API to submit your request to the target website placing the values into corresponding request fields:
   - `geetest_challenge`
   - `geetest_validate`
   - `geetest_seccode`

**List of _GET/POST_ request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | geetest - defines that you're sending a Geetest captcha |
| gt | String | Yes | Value of _gt_ parameter you found on target website |
| challenge | String | Yes | Value of _challenge_ parameter you found on target website |
| api\_server | String | No | Value of _api\_server_ parameter you found on target website |
| offline | Number <br>Default: 0 | No | In rare cases initGeetest can be called with _offline_ parameter. If the call uses _offline: true_, set the value to 1. |
| new\_captcha | Number <br>Default: 0 | No | In rare cases initGeetest can be called with _new\_captcha_ parameter. If the call uses _new\_captcha: true_, set the value to 1. Mostly used with _offline_ parameter. |
| pageurl | String | Yes | Full URL of the page where you see Geetest captcha |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |
| proxy | String | No | Format: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies). |
| proxytype | String | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5. |
| userAgent | String | No | Your _userAgent_ that will be passed to our worker and used to solve the captcha. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 1 | No | Server will alsways return the response as JSON for Geetest captcha. |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [Geetest v4 captcha](https://2captcha.com/2captcha-api\#geetest-v4-captcha)

> Geetest v4 is a new version of puzzle challenge, but you still have to move a piece of a puzzle to bypass it.

To solve Geetest v4 captcha with our service you need to:

1. find the `captcha_id` value in the page HTML source. Normally you will find the value inside script tag that include Geetest v4 javascript code on the page.

2. Submit a _HTTP GET_ or _POST_ request to our API URL: `https://2captcha.com/in.php` with method set to _geetest\_v4_ providing the `captcha_id` found on the page and full page URL as value for _pageurl_.

**Request URL example:**


```
https://2captcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8&method=geetest_v4&captcha_id=f1ab2cdefa3456789012345b6c78d90e&pageurl=https://www.site.com/page/

```

3. If everything is fine server will return the ID of your captcha as plain text, like: _OK\|2122988149_ or as JSON _{"status":1,"request":"2122988149"}_ if _json_ parameter was used.


Otherwise server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

4. Make a 15-20 seconds timeout then submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.

If captcha is already solved server will return the response in JSON. The response example is shown below:


```
{
"captcha_id": "e392e1d7fd421dc63325744d5a2b9c73",
"lot_number": "7fafac97a43d4701aee908afa49c73ba",
"pass_token": "6f1c27bd15777d5e9e6e1ba94604c28e7b13b94eed3f7c8b79ceaf4660da6320",
"gen_time": "1648112802",
"captcha_output": "FEB0Fyp2UEcHdeFQ0PEN-BHenkuCzlpmfX_OLXuf49iF_rPvbjYc9whxQg-sYOCPSzX_19HF0gCPgSoAZ-JPxE46ddE7L6y0J-D_5CcMnT0IYKHFK-NdcBo_m6nISKrpSH3QE9l5r53UTChJdR-bOJPO20gA0bgPEMvDCew7UkQ="
}

```


If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

5. Use the values received from our API to submit your request to the target website the same way it is done when you bypass the captcha manually.


**List of _GET/POST_ request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | geetest\_v4 - defines that you're sending the Geetest v4 |
| captcha\_id | String | Yes | Value of _captcha\_id_ parameter you found on target website |
| pageurl | String | Yes | Full URL of the page where you see Geetest captcha |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |
| proxy | String | No | Format: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies). |
| proxytype | String | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 1 | No | Server will alsways return the response as JSON for Geetest v4 captcha. |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [Capy Puzzle](https://2captcha.com/2captcha-api\#capy-puzzle)

> Capy is a Puzzle captcha
>
> ![Capy Puzzle captcha](https://2captcha.com/assets/captcha-api-docs/img/capy_puzzle.png)

Solving Capy is really simple:

1. Find the value of _capy\_captchakey_ parameter in the source code of the page or in the script source link that looks like: https://api.capy.me/puzzle/get\_js/?k= **PUZZLE\_Abc1dEFghIJKLM2no34P56q7rStu8v**.

Also find the root part of the script URL, for example: _https://api.capy.me/_ and use it in `api_server` parameter.

2. Submit a _HTTP GET_ or _POST_ request to our API URL: `https://2captcha.com/in.php` with method set to _capy_ and provide the values found on previous step as _captchakey_ and _api\_server_ and the full page URL as value for _pageurl_.


You can find the full list of parameters in the [table below.](https://2captcha.com/2captcha-api#capy_post)

**Request URL example:**


```
https://2captcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8&method=capy&captchakey=PUZZLE_Abc1dEFghIJKLM2no34P56q7rStu8v&pageurl=http://mysite.com/

```

3. If everything is fine server will return the ID of your captcha as plain text, like: _OK\|2122988149_ or as JSON _{"status":1,"request":"2122988149"}_ if _json_ parameter was used.


Otherwise server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

4. Make a 15-20 seconds timeout then submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.


The full list of parameters is in the [table below](https://2captcha.com/2captcha-api#capy_get).

If captcha is already solved server will respond in JSON and return the answer containing three values: `captchakey`, `challengekey` and `answer`


```
{
"captchakey": "PUZZLE_Abc1dEFghIJKLM2no34P56q7rStu8v",
"challengekey": "y1Pu234nCwq56WnqB7y8TSZq0Qzp0ltK",
"answer": "0xax8ex0xax84x0xkx7qx0xux7qx0xux7gx0x18x7gx0x1sx76x0x26x6ix0x2qx6ix0x3ex68x0"
}

```


If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

5. Use the values returned in your request to the target website passing them in the corresponding request fields:
   - `capy_captchakey`
   - `capy_challengekey`
   - `capy_answer`

**List of GET/POST request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | capy - defines that you're sending Capy |
| captchakey | String | Yes | Value of _captchakey_ parameter you found on page |
| api\_server | String | No | The domain part of script URL you found on page. Default value: `https://jp.api.capy.me/` |
| version | String <br>Default: `puzzle` | No | The version of captcha task: `puzzle` (assemble a puzzle) or `avatar` (drag an object). |
| pageurl | String | Yes | Full URL of the page where you see the captcha |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |
| proxy | String | No | Format: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies). |
| proxytype | String | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [TikTok](https://2captcha.com/2captcha-api\#tiktok)

This method is temporary disabled.

#### [Lemin Cropped Captcha](https://2captcha.com/2captcha-api\#lemin-cropped-captcha)

> Lemin is a Puzzle captcha

To solve Lemin:

1. Find the value of _captcha\_id_ parameter in the source code of the page or in the script source link that looks like: https://api.leminnow.com/captcha/v1/cropped/ **CROPPED\_1abcd2f\_a1234b567c890d12ef3a456bc78d901d**/js.

Also find the root part of the script URL, for example: _https://api.leminnow.com/_ and use it in `api_server` parameter.

And finally find the id of parent div element of the captcha script tag and use the id as value for `div_id` parameter.

2. Submit a _HTTP GET_ or _POST_ request to our API URL: `https://2captcha.com/in.php` with method set to _lemin_ and provide the values found on previous step as _captcha\_id_, _div\_id_ and _api\_server_ and the full page URL as value for _pageurl_.


You can find the full list of parameters in the [table below.](https://2captcha.com/2captcha-api#lemin_post)

**Request example:**


```
{
"key": "1abc234de56fab7c89012d34e56fa7b8",
"method": "lemin",
"captcha_id": "CROPPED_3dfdd5c_d1872b526b794d83ba3b365eb15a200b",
"div_id": "lemin-cropped-captcha",
"api_server": "https://api.leminnow.com/",
"pageurl": "https://2captcha.com/demo/lemin",
"json":1
}

```

3. If everything is fine server will return the ID of your captcha


```
{
"status": 1,
"request": "2122988149"
}

```


Otherwise server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

4. Make a 15-20 seconds timeout then submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.


The full list of parameters is in the [table below](https://2captcha.com/2captcha-api#lemin_get).

If captcha is already solved server will respond in JSON and return the answer containing the following values: `answer`, `challenge_id`


```
{
"answer":"0x0xcgx0x0xbsx0xaxb8x0xkxakx0xux92x0x1sx76x0x2gx5ux0x34x4mx0x3ox3ex0x42x34x0x4cx2qx0x4mx2gx0x50x26x0x5ax26x0x5ax1sx0x50x1sx0x50x1ix0x50x18x0x50xux0x5axux0x5axkx0x5axax0x5ax0x_?_gAAAAABi4-Efd-oTDcTyTsnv7vbHGJW_ucw7GmoYCUxjfbvfMChlne2EIKYrVNV_TfBDN68WX_TDAEQ90xbWjatuYGkaUHsC1lzf7pM7dS8J-WhKQK1rBYaSOgAzGuNVhYX_zrNWHFFr",
"challenge_id":"a33515c5-9095-4c2a-b2eb-c86214d62f98"
}

```


If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

5. Use the values returned in your request to the target website passing them in the corresponding request fields:
   - `answer`
   - `challenge_id`

**List of GET/POST request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | lemin - defines that you're sending Lemin |
| captcha\_id | String | Yes | Value of _captcha\_id_ parameter you found on page |
| div\_id | String | No | The id of captcha parent div element |
| api\_server | String | No | The domain part of script URL you found on page. Default value: `https://api.leminnow.com/` |
| pageurl | String | Yes | Full URL of the page where you see the captcha |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |
| proxy | String | No | Format: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies). |
| proxytype | String | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [Cloudflare Turnstile](https://2captcha.com/2captcha-api\#cloudflare-turnstile)

> Cloudflare Turnstile - is a captha made by Cloudflare

There are two cases for Turnstile:

1 - standalone captcha widget placed on a page of a website, protecting a form from automated submission. For this case just need to extract the _sitekey_ and send it to our API with full page URL. Then just place the token into `cf-turnstile-response` and `g-recaptcha-response` fields and submit the form. Also, there can be a callback defined in `turnstile.render` call.

2 - captcha on Turnstile Challenge page on websites proxied proxied through Cloudflare. In this case you MUST extract the values of `cData`, `chlPageData` and `action` parameters and use the User-Agent value returned from our API. See more info on this case below.

##### Standalone Turnstile captcha

**Request example:**

```
{
"method": "turnstile",
"key": "YOUR_API_KEY",
"sitekey": "3x00000000000000000000FF",
"pageurl": "https://2captcha.com/demo/cloudflare-turnstile",
"json": 1
}

```

**Response example:**

```
{
"status": 1,
"request": "74327409378"
}

```

Use the returned ID to request the result from `res.php` endpoint of our API

##### Turnstile captcha on Cloudflare Challenge pages

![Turnstile Challege Page](https://2captcha.com/assets/captcha-api-docs/img/turnstile-challege-page.png)

If you need to bypass the Turnstile on Cloudflare Challenge pages you also MUST provide the following additional parameters:

- action
- data
- pagedata

And also you MUST set the User-Agent of your browser or HTTP client to the value returned from our API together with the token.

For cases when Turnstile is used standalone on a website, it is not required.

###### How to extract the required parameters

To extract the parameters you can redefine the `turnstile.rended` method to intercept the parameters passed when the method is called. For example, you can inject the following JavaScript code to the page. The code should be executed before the Turnstile widget is loaded.

```
const i = setInterval(()=>{
if (window.turnstile) {
clearInterval(i)
window.turnstile.render = (a,b) => {
let p = {
method: "turnstile",
key: "YOUR_API_KEY",
sitekey: b.sitekey,
pageurl: window.location.href,
data: b.cData,
pagedata: b.chlPageData,
action: b.action,
userAgent: navigator.userAgent,
json: 1
}
console.log(JSON.stringify(p))
window.tsCallback = b.callback
return 'foo'
}
}
},50)

```

**Request example:**

```
{
"key": "YOUR_API_KEY",
"method": "turnstile",
"sitekey": "0x0AAAAAAADnPIDROzbs0Aaj",
"data": "7fab0000b0e0ff00",
"pagedata": "3gAFo2...0ME1UVT0=",
"pageurl": "https://2captcha.com/",
"action": "managed",
"json": 1
}

```

**Response example:**

```
{
"status": 1,
"request": "74327409378"
}

```

Use the returned id to request the result from `res.php` endpoint of our API

\`

https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=74327409378&json=1

\`

**Result example:**

```
{
"status": 1,
"request": "0.4uMMZZdSfsVM8...610cd090",
"useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

```

**List of GET/POST request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **method** | String | Yes | turnstile - defines that you're sending Cloudflare Turnstile |
| **sitekey** | String | Yes | Value of _sitekey_ parameter you found on page |
| **pageurl** | String | Yes | Full URL of the page where you see the captcha |
| **_action_** | String | No\* | Value of optional _action_ parameter you found on page, can be defined in `data-action` attribute or passed to `turnstile.render` call |
| **_data_** | String | No\* | The value of `cData` passed to `turnstile.render` call. Also can be defined in `data-cdata` attribute |
| **_pagedata_** | String | No\* | The value of `chlPageData` passed to `turnstile.render` call |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |
| proxy | String | No | Format: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies). |
| proxytype | String | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5. |

\\* \- parameters required to bypass Turnstile on Cloudflare Challenge pages

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | Yes | Always set to 1 for turnstile to get the response as JSON containing the User-Agent value |

#### [Amazon WAF Captcha](https://2captcha.com/2captcha-api\#amazon-waf-captcha)

> Amazon WAF Captcha also known as AWS WAF Captcha is a part of Intelligent threat mitigation for Amazon AWS

To bypass the captcha you need to grab the following parameters:

- `sitekey` \- is a value of `key` parameter in the page source
- `iv` \- is a value of `iv` parameter in the page source
- `context` \- is a value of `context` parameter in the page source
- `challenge_script` \- the URL of `challenge.js` script
- `captcha_script`\- the URL of `captcha.js` script
- `pageurl` \- is the full URL of page where you were challenged by the captcha

**Request body example:**

```
{
"key":"1abc234de56fab7c89012d34e56fa7b8",
"method":"amazon_waf",
"sitekey":"AQIDAHjcYu/GjX+QlghicBgQ/7bFaQZ+m5FKCMDnO+vTbNg96AHMDLodoefdvyOnsHMRtEKQAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMUX+ZqwwuANRnZujSAgEQgDvHSxUQmVBuyUtumoW2n4ccTG7xQN1r3X/zz41qmQaYv9SSSvQrjIoDXKaUQ23tVb4ii8+uljuRdz/HPA==",
"pageurl":"https://non-existent-example.execute-api.us-east-1.amazonaws.com/latest",
"context":"9BUgmlm48F92WUoqv97a49ZuEJJ50TCk9MVr3C7WMtQ0X6flVbufM4n8mjFLmbLVAPgaQ1Jydeaja94iAS49ljb+sUNLoukWedAQZKrlY4RdbOOzvcFqmD/ZepQFS9N5w15Exr4VwnVq+HIxTsDJwRviElWCdzKDebN/mk8/eX2n7qJi5G3Riq0tdQw9+C4diFZU5E97RSeahejOAAJTDqduqW6uLw9NsjJBkDRBlRjxjn5CaMMo5pYOxYbGrM8Un1JH5DMOLeXbq1xWbC17YSEoM1cRFfTgOoc+VpCe36Ai9Kc=",
"challenge_script":"https://41bcdd4fb3cb.610cd090.us-east-1.token.awswaf.com/41bcdd4fb3cb/0d21de737ccb/cd77baa6c832/challenge.js",
"captcha_script":"https://41bcdd4fb3cb.610cd090.us-east-1.captcha.awswaf.com/41bcdd4fb3cb/0d21de737ccb/cd77baa6c832/captcha.js",
"iv":"CgAHbCe2GgAAAAAj",
"json":1
}

```

If everything is OK you will receive the response with your captcha ID `{"status":1,"request":"2122988149"}` or an [error code](https://2captcha.com/2captcha-api#error_handling) if your request was incorrect.

Make a 15-20 seconds timeout then submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.

The full list of parameters is in the [table below](https://2captcha.com/2captcha-api#amazon-waf-get).

If captcha is already solved server will respond in the following format:

```
{
"status": 1,
"request": {
"captcha_voucher":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lc3RhbXAiOiIyMDIzLTAzLTIwVDEzOjM2OjM3Ljg1Nzk5MjEyMFoiLCJjbGllbnRfaWQiOiIxOTI4NTIzMi1jMTRiLTRlMDUtYjQ2OC02ODBiYjE3ZWNhM2MiLCJkb21haW4iOiJlZnc0N2ZwYWQ5LmV4ZWN1dGUtYXBpLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tIiwiZXhwIjoxNjc5MzE5Mzk3LCJwcm9ibGVtIjoiYmlmdXJjYXRlZHpvbyIsInByb2JsZW1fb3ZlcnJpZGUiOmZhbHNlLCJudW1fc29sdXRpb25zX3Byb3ZpZGVkIjoxfQ.qgSX4tZqZQwXNzVQgVe3OsUMR3vf7-fLWNzZKIHXN-4",
"existing_token":"25b7ee41-2d4e-46f7-a52e-2d53d10c199a:EQoAf2Zd5kEWAAAA:qGp2oQxLMEny1L7qBP6uRYJ/DRDRL2v50309/M/O7Gul+k1zh6ZqDVGNbrG6LYmUD+4dSYJMNM2IuxgQYbVHp83OwF8p/BgolBwp45CulWxzCjyEGy1/degDo5ivZ8AjFVymUJI/vCq0BOhD4GGZqR8oveOYcUN7OIJy5mtE2reNI92qCiRCqEr8ccZo02DsBDBDQEQOR+q17gQn2vn0Hp3Ss7A="
}
}

```

If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

Use the values returned in your interaction with the target website. Normally the values are sent in the corresponding fields of the POST request, but you definetly need to check how it is used on your case.

**List of GET/POST request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | `amazon_waf` \- defines that you're sending Amazon WAF Captcha |
| sitekey | String | Yes | Value of `key` parameter you found on the page |
| iv | String | Yes | Value of `iv` parameter you found on the page |
| context | String | Yes | Value of optional `context` parameter you found on page |
| pageurl | String | Yes | Full URL of the page where you see the captcha |
| challenge\_script | String | No | The source URL of `challenge.js` script on the page |
| captcha\_script | String | No | The source URL of `captcha.js` script on the page |
| header\_acao | Integer <br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. Also supported by `res.php`. |
| pingback | String | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | Integer | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users. |
| proxy | String | No | Format: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies). |
| proxytype | String | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5. |

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [CyberSiARA](https://2captcha.com/2captcha-api\#cybersiara)

Token-based method for automated solving of CyberSiARA.

**Method specification**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | _String_ | **Yes** | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **method** | _String_ | **Yes** | `cybersiara` |
| **master\_url\_id** | _String_ | **Yes** | The value of `MasterUrlId` parameter obtained from the request to the endpoint `API/CyberSiara/GetCyberSiara` |
| **pageurl** | _String_ | **Yes** | Full URL of the page where you solve the captcha |
| **userAgent** | _String_ | **Yes** | Your User-Agent that will be passed to our worker and used to solve the captcha. |
| proxy | _String_ | No | Your proxy: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies) |
| proxytype | _String_ | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5 |
| json | _Number_ | No | Set to `1` to get the response as JSON. Default: `0` |

##### Request example

Endpoint: `https://2captcha.com/in.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "method": "cybersiara",
    "master_url_id": "tpjOCKjjpdzv3d8Ub2E9COEWKt1vl1Mv",
    "pageurl": "https://demo.mycybersiara.com/",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "json": 1
}
```

Request will return the id of your captcha. Use it to get the result.

**Getting the result**

##### Request example

Endpoint: `https://2captcha.com/res.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "action": "get",
    "id": 2122988149,
    "json": 1
}
```

##### Result example

```json
{
    "status": 1,
    "request": "eyJhbGciOiJIUzUxMi..MjEzODYwMjE="
}
```

#### [MTCaptcha method](https://2captcha.com/2captcha-api\#mtcaptcha-method)

Token-based method for automated solving of MTCaptcha.

**Method specification**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | _String_ | **Yes** | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **method** | _String_ | **Yes** | `mt_captcha` |
| **sitekey** | _String_ | **Yes** | The value of `sitekey` parameter found on the page |
| **pageurl** | _String_ | **Yes** | Full URL of the page where you solve the captcha |
| proxy | _String_ | No | Your proxy: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies) |
| proxytype | _String_ | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5 |
| json | _Number_ | No | Set to `1` to get the response as JSON. Default: `0` |
| soft\_id | _Number_ | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users |
| pingback | _String_ | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |

##### Request example

Endpoint: `https://2captcha.com/in.php`

Method: `POST`

```json
{
    "key":"YOUR_API_KEY",
    "method":"mt_captcha",
    "sitekey":"MTPublic-KzqLY1cKH",
    "pageurl":"https://2captcha.com/demo/mtcaptcha",
    "json": 1
}
```

Request will return the id of your captcha. Use it to get the result.

**Getting the result**

##### Request example

Endpoint: `https://2captcha.com/res.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "action": "get",
    "id": 2122988149,
    "json": 1
}
```

##### Result example

```json
{
    "status": 1,
    "request": "v1(fa78e9fe,c64ca2f..8e476cd94a6a,Hx3jMg3)"
}
```

#### [Cutcaptcha method](https://2captcha.com/2captcha-api\#cutcaptcha-method)

Token-based method for automated solving of Cutcaptcha.

The token received must be set as the `value` attribute of the `input#cap_token` element and/or passed to the callback function.

**Method specification**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | _String_ | **Yes** | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **method** | _String_ | **Yes** | `cutcaptcha` |
| **misery\_key** | _String_ | **Yes** | The value of `CUTCAPTCHA_MISERY_KEY` variable defined on page |
| **api\_key** | _String_ | **Yes** | The value of `data-apikey` attribute of iframe's body. Also the name of javascript file included on the page |
| **pageurl** | _String_ | **Yes** | Full URL of the page where you solve the captcha |
| proxy | _String_ | No | Your proxy: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies) |
| proxytype | _String_ | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5 |
| json | _Number_ | No | Set to `1` to get the response as JSON. Default: `0` |
| soft\_id | _Number_ | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users |
| pingback | _String_ | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |

##### Request example

Endpoint: `https://2captcha.com/in.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "method": "cutcaptcha",
    "misery_key": "a1488b66da00bf332a1488993a5443c79047e752",
    "api_key": "SAb83IIB",
    "pageurl": "https://example.cc/foo/bar.html",
    "json": 1
}
```

Request will return the id of your captcha. Use it to get the result.

**Getting the result**

##### Request example

Endpoint: `https://2captcha.com/res.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "action": "get",
    "id": 2122988149,
    "json": 1
}
```

##### Result example

```json
{
    "status": 1,
    "request": "BazM23cpFUUyAAAdqPwNEDZx0REtH3ss"
}
```

##### Using the token

Use the returned token as a value for `input` with `id = cap_token`, then submit it's parent form, for example:

```js
document.querySelector('input#cap_token').value='BazM23cpFUUyAAAdqPwNEDZx0REtH3ss'
document.querySelector('form').submit()
```

If there's a callback function defined, you can call it passing the token as argument:

```js
capResponseCallback('BazM23cpFUUyAAAdqPwNEDZx0REtH3ss')
```

#### [Friendly Captcha method](https://2captcha.com/2captcha-api\#friendly-captcha-method)

Token-based method for automated solving of Friendly Captcha.

The token received must be set as the `value` attribute of the `input#cap_token` element and/or passed to the callback function.

> **Important:** To successfully use the received token, the captcha widget must not be loaded on the page. To do this, you need to abort request to `/friendlycaptcha/...module.min.js` on the page. When the captcha widget is already loaded on the page, there is a high probability that the received token will not work.

**Method specification**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | _String_ | **Yes** | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **method** | _String_ | **Yes** | `friendly_captcha` |
| **sitekey** | _String_ | **Yes** | The value of `data-sitekey` attribute of captcha's `div` element on page. |
| **pageurl** | _String_ | **Yes** | Full URL of the page where you solve the captcha |
| proxy | _String_ | No | Your proxy: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies) |
| proxytype | _String_ | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5 |
| json | _Number_ | No | Set to `1` to get the response as JSON. Default: `0` |
| soft\_id | _Number_ | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users |
| pingback | _String_ | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |

##### Request example

Endpoint: `https://2captcha.com/in.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "method": "friendly_captcha",
    "sitekey": "2FZFEVS1FZCGQ9",
    "pageurl": "https://example.com",
    "json": 1
}
```

Request will return the id of your captcha. Use it to get the result.

**Getting the result**

##### Request example

Endpoint: `https://2captcha.com/res.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "action": "get",
    "id": 2122988149,
    "json": 1
}
```

##### Result example

```json
{
    "status": 1,
    "request": "f8b10f4ad796484bae963b1ebe3ce2bb.ZXL8Z...AAAAAA.AgAD"
}
```

##### Using the token

Use the returned token as a value for `input` with `name = frc-captcha-solution`, then submit it's parent form, for example:

```js
document.querySelector('input.frc-captcha-solution').value='f8b10f4ad796484bae963b1ebe3ce2bb.ZXL8Z...AAAAAA.AgAD'
document.querySelector('form').submit()
```

Please note, that form name can be customized with `data-solution-field-name` attribute, then you need to use the name set as the attribute's value.

If there's a callback function defined, you can call it passing the token as argument. For example, if `data-callback="doneCallback"` you should run it as:

```js
doneCallback('f8b10f4ad796484bae963b1ebe3ce2bb.ZXL8Z...AAAAAA.AgAD')
```

#### [atbCAPTCHA method](https://2captcha.com/2captcha-api\#atbcaptcha-method)

Token-based method for automated solving of atbCAPTCHA.

**Method specification**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | _String_ | **Yes** | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **method** | _String_ | **Yes** | `atb_captcha` |
| **app\_id** | _String_ | **Yes** | The value of `appId` parameter in the website source code. |
| **api\_server** | _String_ | **Yes** | The value of `apiServer` parameter in the website source code. |
| **pageurl** | _String_ | **Yes** | The full URL of target web page where the captcha is loaded. We do not open the page, not a problem if it is available only for authenticated users |
| proxy | _String_ | No | Your proxy: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies) |
| proxytype | _String_ | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5 |
| json | _Number_ | No | Set to `1` to get the response as JSON. Default: `0` |

##### Request example

Endpoint: `https://2captcha.com/in.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "method": "atb_captcha",
    "app_id": "af23e041b22d000a11e22a230fa8991c",
    "api_server": "https://cap.aisecurius.com",
    "pageurl": "https://www.example.com/",
    "json": 1
}
```

Request will return the id of your captcha. Use it to get the result.

**Getting the result**

##### Request example

Endpoint: `https://2captcha.com/res.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "action": "get",
    "id": 2122988149,
    "json": 1
}
```

##### Result example

```json
{
    "status": 1,
    "request": "sl191suxzluwxxh6f:"
}
```

##### Using the token

The token is passed to a callback function defined in `success` property during the captcha initialization. This function is usually used to make a request to the website backend where the token is verified. You can execute the callback function passing the token as an argument or build a request to the backend using passing the token.

```javascript
const myCallbackFunction = (token) {
    // verify the token
}
var myCaptcha = as.Captcha(document.getElementById('demo'), {
    appId: 'af23e041b22d000a11e22a230fa8991c',
    success: myCallbackFunction
})
```

#### [Tencent method](https://2captcha.com/2captcha-api\#tencent-method)

Token-based method for automated solving of Tencent captcha.

**Method specification**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | _String_ | **Yes** | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **method** | _String_ | **Yes** | `tencent` |
| **app\_id** | _String_ | **Yes** | The value of `appId` parameter in the website source code. |
| **pageurl** | _String_ | **Yes** | The full URL of target web page where the captcha is loaded. We do not open the page, not a problem if it is available only for authenticated users |
| captcha\_script | _String_ | **No** | Captcha script URL from the page source code. Default: `https://turing.captcha.qcloud.com/TCaptcha.js` |
| proxy | _String_ | No | Your proxy: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies) |
| proxytype | _String_ | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5 |
| json | _Number_ | No | Set to `1` to get the response as JSON. Default: `0` |

##### Request example

Endpoint: `https://2captcha.com/in.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "method": "tencent",
    "app_id": "190014885",
    "pageurl": "https://www.example.com/",
    "json": 1
}
```

Request will return the id of your captcha. Use it to get the result.

**Getting the result**

##### Request example

Endpoint: `https://2captcha.com/res.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "action": "get",
    "id": 2122988149,
    "json": 1
}
```

##### Result example

```json
{
    "status": 1,
    "request": {
        "appid": "190014885",
        "ret": 0,
        "ticket": "tr0344YjJASGmJGtohyWS_y6tJKiqVPIdFgl87vWlVaQoueR8D6DH28go-i-VjeassM31SXO7D0*",
        "randstr": "@KVN"
    }
}
```

### [Using the token](https://2captcha.com/2captcha-api\#using-the-token)

The token is passed to a callback function defined in 2nd argument of `TencentCaptcha` constructor call during the captcha initialization.

```js
new TencentCaptcha(CaptchaAppId, callback, options);
```

This function is usually used to make a request to the website backend where the token is verified. You can execute the callback function passing the token as an argument or build a request to the backend using passing the token.

For example, if the captcha is initialized like this:

```js
const myCallbackFunction = (token) {
    // verify the token
}
var captcha = new TencentCaptcha('190014885', myCallbackFunction, {});
captcha.show();
```

You need to call:

```js
let data = JSON.parse(res)
myCallbackFunction(res.request)
```

Where `res` is the JSON response from the API.

#### [DataDome](https://2captcha.com/2captcha-api\#datadome)

Cookies-based method for automated solving of DataDome.

Set the returned cookie in your browser to bypass the captcha.

To solve the `DataDome` captcha, you must use a proxy.

> **Attention**, you need to check the value of the parameter `t` in `captcha_url` if it is contained. The value of `t` must be equal to `fe`.
>
> If `t=bv`, it means that your ip is banned by the captcha and you need to change the ip address.

> **Attention**, you need to monitor the quality of the proxy used. If your proxy is blocked by the captcha `DataDome`, then when solving you will receive errors `ERR_PROXY_CONNECTION_FAILED` or `ERROR_CAPTCHA_UNSOLVABLE`, in which case you need to change the proxy server used.

> **Attention**, you should provide your User-Agent that was used to interact with target website, it will be used to load and solve the captcha. Always use User-Agents of modern browsers.

**Method specification**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | _String_ | **Yes** | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **method** | _String_ | **Yes** | `datadome` |
| **captcha\_url** | _String_ | **Yes** | The value of the `src` parameter for the `iframe` element containing the captcha on the page. |
| **pageurl** | _String_ | **Yes** | Full URL of the page where you solve the captcha |
| **userAgent** | _String_ | **Yes** | User-Agent of your browser will be used to load the captcha. |
| proxy | _String_ | **Yes** | Your proxy: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies) |
| proxytype | _String_ | **Yes** | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5 |
| json | _Number_ | No | Set to `1` to get the response as JSON. Default: `0` |

##### Request example

Endpoint: `https://2captcha.com/in.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "method": "datadome",
    "captcha_url": "https://geo.captcha-delivery.com/captcha/?initialCid=AHrlqAAA...P~XFrBVptk&t=fe&referer=https%3A%2F%2Fhexample.com&s=45239&e=c538be..c510a00ea",
    "pageurl": "https://example.com/",
    "proxy":"username:password@1.2.3.4:5678",
    "proxytype":"http",
    "userAgent":"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.3",
    "json": 1
}
```

Request will return the id of your captcha. Use it to get the result.

**Getting the result**

##### Request example

Endpoint: `https://2captcha.com/res.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "action": "get",
    "id": 2122988149,
    "json": 1
}
```

##### Result example

```json
{
    "status": 1,
    "request": "datadome=G4TdaXfDqz0B..OJDxGGtKDktILJQEDxM; Max-Age=31536000; Domain=.example.com; Path=/; Secure; SameSite=Lax"
}
```

#### [Audio Recognition](https://2captcha.com/2captcha-api\#audio-recognition)

We provide a speech recognition method that allows you to convert an audio record to text. The method can be used to bypass audio captchas or to recognize any audio record. The limitations are:

- Max file size: **1 MB**
- Audio duration: **not limited**
- Supported audio format: **mp3 only**
- Supported speech languages: English, French, German, Greek, Portuguese, Russian

The recognition is fully automated and performed by a neural network trained for speech recognition.

To recognize an audio you need to:

- Encode the mp3 file to base64
- Submit a request to our API with the base64 string and the language parameter

**Request body example:**

```
{
"key":"1abc234de56fab7c89012d34e56fa7b8",
"method":"audio",
"body":"",
"lang":"pt",
"json":1
}

```

If everything is OK you will receive the response with your request ID `{"status":1,"request":"2122988149"}` or an [error code](https://2captcha.com/2captcha-api#error_handling) if your request was incorrect.

Make a 15-20 seconds timeout then submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.

The full list of parameters is in the [table below](https://2captcha.com/2captcha-api#audio-get).

If audio is already recognized server will return the text in the following format:

```
{
"status": 1,
"request": "hello world"
}

```

If the recognition process is not finished yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).

Use the recognition result the way you need it.

**List of request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| method | String | Yes | `audio` \- indicates that you're sending audio |
| body | String | Yes | Base64 encoded audio file in mp3 format. Max file size: 1 MB |
| lang | String | Yes | The language of audio record. Supported languages are: `en, fr, de, el, pt, ru`. |

**List of request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | get - get the asnwer for your captcha |
| id | Integer | Yes | ID of captcha returned by in.php. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

**Request URL example:**

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get&id=2122988149

```

#### [Bounding Box Method](https://2captcha.com/2captcha-api\#bounding-box-method)

The method can be used to solve tasks where you need to select a specific object or draw a box around an object shown on an image.

The limitations are:

- Supported image formats: **JPEG**, **PNG**, **GIF**
- Max file size: **600 kB**
- Max image size: **1000px** pixels in height or width

To use the Bounding Box method, you must:

1. Get an image and instructions on which objects to select in the image.

2. Submit a _HTTP POST_ request to our API URL: `https://2captcha.com/in.php` specify _bounding\_box_ as the value of the parameter _method_.


Server accepts images in base64 format.

You must be sure to send additional instructions in the form of text or image. As text using the _textinstructions_ parameter, or as an image using the _imginstructions_ parameter.

The full list of parameters is in the table below.

3. Server will return captcha ID or an [error code](https://2captcha.com/2captcha-api#error_handling) if something went wrong.

4. Make a 5 seconds timeout and submit a _HTTP GET_ request to our API URL: `https://2captcha.com/res.php` to get the result.

If the task is completed, the server will return the coordinates of the frame in which the object specified in the description is located, for example: _OK\|\[{"xMin":559,"xMax":797,"yMin":164,"yMax":430}\]_. The response contains the coordinates of two points of the rectangle located diagonally. Counting coordinates from the upper-left corner of the image.

If captcha is not solved yet server will return _CAPCHA\_NOT\_READY_ result. Repeat your request in 5 seconds.

If something went wrong server will return an [error code](https://2captcha.com/2captcha-api#error_handling).


**Base64 sample form for bounding\_box method**

```
<form method="post" action="http://2captcha.com/in.php">
<input type="hidden" name="method" value="bounding_box">
Your key:
<input type="text" name="key" value="YOUR_APIKEY">
The body of the bounding_box image in base64 format:
<textarea name="image">BASE64_IMAGE</textarea>
Instructions for markup data:
<input type="textinstructions" name="textinstructions" value="Select cars in the image">
<input type="submit" value="Upload and get ID">
</form>

```

The _YOUR\_APIKEY_ parameter should be replaced with [your API key](https://2captcha.com/2captcha-api#solving_captchas).

_BASE64\_IMAGE_ — the body of the image file encoded in base64 format.

**List of request parameters for https://2captcha.com/in.php**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | _String_ | **Yes** | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **method** | _String_ | **Yes** | `bounding_box` |
| **image** | _String_ | **Yes** | Image containing data for markup.<br>The image must be encoded in Base64 format. |
| textinstructions | _String_ | Yes\* | Text will be shown to worker to help him to select object on the image correctly. <br>For example: Select cars in the image.<br>**Optional parameter**, if the instruction already exists in the form of the `imginstructions`. |
| imginstructions | _String_ | Yes\* | Image with instruction for worker to help him to select object on the image correctly. <br>The image must be encoded in Base64 format.<br>**Optional parameter**, if the instruction already exists in the form of the `textinstructions`. |
| json | _Number_<br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| soft\_id | _Number_ | No | ID of software developer. Developers who integrated their software with 2Captcha get reward: 10% of spendings of their software users |
| lang | _String_ | No | Language code. [See the list of supported languages.](https://2captcha.com/2captcha-api#language) |
| can\_no\_answer | Integer <br>Default: 0 | No | 0 - not specified <br>1 - possibly there's no objects to select.<br>Set the value to 1 only if it's possible that there's no objects matching the instruction. <br>We'll provide a button "No matching images" to worker and you will receive _No\_matching\_images_ as answer. |
| header\_acao | _Number_<br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. |
| pingback | _String_ | No | URL for pingback (callback) response that will be sent when captcha is solved. <br>URL should be registered on the server. [More info here](https://2captcha.com/2captcha-api#pingback). |

**List of request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | _String_ | **Yes** | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **action** | _String_ | **Yes** | `get` \- get the asnwer for your captcha |
| **id** | _Number_ | **Yes** | ID of captcha returned by in.php. |
| json | _Number_<br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |
| header\_acao | _Number_<br>Default: 0 | No | 0 - disabled <br>1 - enabled. <br>If enabled `in.php` will include _Access-Control-Allow-Origin:\*_ header in the response. <br>Used for cross-domain AJAX requests in web applications. |

##### Request example

Endpoint: `https://2captcha.com/in.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "method": "bounding_box",
    "image": "/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2Q...",
    "textinstructions": "Select cars in the image",
    "json": 1
}
```

Request will return the id of your captcha. Use it to get the result.

**Getting the result**

##### Request example

Endpoint: `https://2captcha.com/res.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "action": "get",
    "id": 2122988149,
    "json": 1
}
```

##### Result example

```json
{
    "status": 1,
    "request": "[{\"xMin\":100,\"xMax\":316,\"yMin\":66,\"yMax\":210}]"
}
```

#### [Prosopo Procaptcha](https://2captcha.com/2captcha-api\#prosopo-procaptcha)

Token-based method for automated solving of Prosopo Procaptcha.

**Method specification**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | _String_ | **Yes** | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **method** | _String_ | **Yes** | `prosopo` |
| **sitekey** | _String_ | **Yes** | The value of `siteKey` parameter found on the page |
| **pageurl** | _String_ | **Yes** | The full URL of target web page where the captcha is loaded. We do not open the page, not a problem if it is available only for authenticated users |
| proxy | _String_ | No | Your proxy: _login:password@123.123.123.123:3128_<br>You can find more info about proxies [here](https://2captcha.com/2captcha-api#proxies) |
| proxytype | _String_ | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5 |
| json | _Number_ | No | Set to `1` to get the response as JSON. Default: `0` |

##### Request example

Endpoint: `https://2captcha.com/in.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "method": "prosopo",
    "sitekey": "5EPQoMZEDc5LpN7gtxMMzYPTzA6UeWqL2stk1rso9gy4Ahqt",
    "pageurl": "https://www.example.com/",
    "json": 1
}
```

Request will return the id of your captcha. Use it to get the result.

**Getting the result**

##### Request example

Endpoint: `https://2captcha.com/res.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "action": "get",
    "id": 2122988149,
    "json": 1
}
```

##### Result example

```json
{
    "status": 1,
    "request": "0x00016c68747470733a2f2f70726f6e6f6465372e70726f736f706f2e696fc0354550516f4d5a454463354c704e376774784d4d7a5950547a4136556557714c..."
}
```

#### [CaptchaFox](https://2captcha.com/2captcha-api\#captchafox)

A token-based method for automatically solving CaptchaFox captchas.

**Method specification**

| **Parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| **key** | _String_ | **Yes** | [Your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| **method** | _String_ | **Yes** | `captchafox` |
| **sitekey** | _String_ | **Yes** | The value of the `sitekey` parameter found on the page or captured in network requests. |
| **pageurl** | _String_ | **Yes** | The full URL of the page containing the captcha. |
| **proxy** | _String_ | **Yes** | Your proxy in the format: _login:password@123.123.123.123:3128_<br>[Learn more](https://2captcha.com/2captcha-api#proxies) |
| **proxytype** | _String_ | **Yes** | Proxy type: `HTTP`, `HTTPS`, `SOCKS4`, `SOCKS5` |
| **useragent** | _String_ | **Yes** | The `User-Agent` of the browser used to access the page with the captcha. |
| json | _Integer_ | No | Pass `1` to receive the response in JSON format. <br> Default: `0` |

##### Request example

**Endpoint:** `https://2captcha.com/in.php`

**Method:** `POST`

```json
{
  "key": "YOUR_API_KEY",
  "method": "captchafox",
  "sitekey": "sk_xtNxpk6fCdFbxh1_xJeGflSdCE9tn99G",
  "pageurl": "https://mysite.com/page/with/captchafox",
  "proxy": "login:password@1.2.3.4:8080",
  "proxytype": "http",
  "useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
  "json": 1
}
```

The request will return the ID of your captcha task, which should be used to retrieve the solution.

* * *

#### [Get task result](https://2captcha.com/2captcha-api\#get-task-result)

##### Request example

Endpoint: `https://2captcha.com/res.php`

Method: `POST`

```json
{
    "key": "YOUR_API_KEY",
    "action": "get",
    "id": 2122988149,
    "json": 1
}
```

##### Response example

```json
{
    "status": 1,
    "request": "177f50c25b845601e5c779cdb51b040d523e8ab69efb4d5b343e28df07d05076"
}
```

### [Language support](https://2captcha.com/2captcha-api\#language-support)

Our API allows you to set the language of captcha with `lang` parameter.

Each our worker can tell us which languages he speaks. When you submit a captcha with `lang` parameter we will distribute your captcha to workers who speak the language. That allows you to solve non-latin and non-cyrillic captchas, for example chinese or vietnamese.

The list of supported languages is available in the table below.

| **Language code ( `lang` value)** | **Language** |
| --- | --- |
| en | English |
| ru | Russian |
| es | Spanish |
| pt | Portuguese |
| uk | Ukrainian |
| vi | Vietnamese |
| fr | French |
| id | Indonesian |
| ar | Arab |
| ja | Japanese |
| tr | Turkish |
| de | German |
| zh | Chinese |
| fil | Philippine |
| pl | Polish |
| th | Thai |
| it | Italian |
| nl | Nederlands (Dutch) |
| sk | Slovak |
| bg | Bulgarian |
| ro | Romanian |
| hu | Hungarian (Magyar) |
| ko | Korean |
| cs | Czech |
| az | Azerbaijani |
| fa | Persian (Farsi) |
| bn | Bengali |
| el | Greek |
| lt | Lithuanian |
| lv | Latvian |
| sv | Swedish |
| sr | Serbian |
| hr | Croatian |
| he | Hebrew |
| hi | Hindi |
| nb | Norwegian |
| sl | Slovenian |
| da | Danish |
| uz | Uzbek |
| fi | Finnish |
| ca | Catalan |
| ka | Georgian |
| ms | Malay |
| te | Telugu |
| et | Estonian |
| ml | Malayalam |
| be | Belorussian |
| kk | Kazakh |
| mr | Marathi |
| ne | Nepali |
| my | Burmese |
| bs | Bosnian |
| hy | Armenian |
| mk | Macedonian |
| pa | Punjabi (Punjabi) |

### [Error Handling](https://2captcha.com/2captcha-api\#error-handling)

It's very important to use proper error handling in your code to avoid suspension of your account and service interruption.

Take a look on [debugging method](https://2captcha.com/2captcha-api#debugging) provided by our API. It can help you to identify the root or the error.

Normally if something is wrong with your request server will return an error.

Below you can find tables with lists of errors with descriptions:

- [errors returned by https://2captcha.com/ **in.php**](https://2captcha.com/2captcha-api#in_errors)
- [errors returned by https://2captcha.com/ **res.php**](https://2captcha.com/2captcha-api#res_errors)

You can also get the list of all errors returned from in.php by making this [call](https://2captcha.com/in.php?method=get_server_errors).

Errors can be returned as plain text or as JSON if you provided _json=1_ parameter.

In very rare cases server can return HTML page with error text like 500 or 502 - please keep it in mind and handle such cases correctly.

If you received anything that doesn't looks like the answer or error code - make a 5 seconds timeout and then retry your request.

#### [List of in.php errors](https://2captcha.com/2captcha-api\#list-of-inphp-errors)

| **Error code** | **Description** | **Action** |
| --- | --- | --- |
| ERROR\_WRONG\_USER\_KEY | You've provided _key_ parameter value in incorrect format, it should contain 32 symbols. | Stop sending requests. Check [your API key](https://2captcha.com/2captcha-api#solving_captchas). |
| ERROR\_KEY\_DOES\_NOT\_EXIST | The key you've provided does not exists. | Stop sending requests. Check [your API key](https://2captcha.com/2captcha-api#solving_captchas). |
| ERROR\_ZERO\_BALANCE | You don't have funds on your account. | Stop sending requests. Deposit your account to continue solving captchas. |
| ERROR\_PAGEURL | _pageurl_ parameter is missing in your request. | Stop sending requests and change your code to provide valid _pageurl_ parameter. <br>[More info.](https://2captcha.com/2captcha-api#recaptchav2new_post) |
| ERROR\_NO\_SLOT\_AVAILABLE | You can receive this error in two cases: <br>1\. **If you solve Normal Captcha or ArkoseLabs FunCaptcha:** your maximum rate is lower than current rate on the server. <br>You can change your maximum rate in [your account's settings](https://2captcha.com/setting). <br>2\. **If you solve token-based captchas:** the queue of your captchas that are not distributed to workers is too long. Queue limit changes dynamically and depends on total amount of captchas awaiting solution and usually it’s between 50 and 100 captchas. | If you have received this error, don't try to submit your request again immediately. Instead, 1. **Adjust your maximum rate** in [your account's settings](https://2captcha.com/setting). <br>or <br>2\. **Make 2-3 seconds timeout** and then retry to submit your request. |
| ERROR\_ZERO\_CAPTCHA\_FILESIZE | Image size is less than 100 bytes. | Check the image file. |
| ERROR\_TOO\_BIG\_CAPTCHA\_FILESIZE | Image size is more than 600 kB or image is bigger than 1000px on any side. | Check the image file. |
| ERROR\_WRONG\_FILE\_EXTENSION | Image file has unsupported extension. Accepted extensions: jpg, jpeg, gif, png. | Check the image file. |
| ERROR\_IMAGE\_TYPE\_NOT\_SUPPORTED | Server can't recognize image file type. | Check the image file. |
| ERROR\_UPLOAD | Server can't get file data from your POST-request. <br>That happens if your POST-request is malformed or base64 data is not a valid base64 image. | You got to fix your code that makes POST request. |
| ERROR\_IP\_NOT\_ALLOWED | The request is sent from the IP that is not on the list of your allowed IPs. | Check the list of your [allowed IPs](https://2captcha.com/iplist). |
| IP\_BANNED | Your IP address is banned due to many frequent attempts to access the server using wrong authorization keys. | Ban will be automatically lifted after 5 minutes. |
| ERROR\_BAD\_TOKEN\_OR\_PAGEURL | You can get this error code when sending reCAPTCHA V2. That happens if your request contains invalid pair of googlekey and pageurl. The common reason for that is that reCAPTCHA is loaded inside an iframe hosted on another domain/subdomain. | Explore code of the page carefully to find valid pageurl and sitekey values. |
| ERROR\_GOOGLEKEY | You can get this error code when sending reCAPTCHA V2. That means that sitekey value provided in your request is incorrect: it's blank or malformed. | Check your code that gets the sitekey and makes requests to our API. |
| ERROR\_PROXY\_FORMAT | You use incorrect proxy format in your request to `in.php` | Use proper format as described in section [Using proxies](https://2captcha.com/2captcha-api#proxies). |
| ERROR\_WRONG\_GOOGLEKEY | `googlekey` parameter is missing in your request | Check your code that gets the sitekey and makes requests to our API. |
| ERROR\_CAPTCHAIMAGE\_BLOCKED | You've sent an image that is marked in our database as unrecognizable. <br>Usually that happens if the website where you found the captcha stopped sending you captchas and started to send "deny access" image. | Try to override website's limitations. |
| TOO\_MANY\_BAD\_IMAGES | You are sending too many unrecognizable images | Make sure that your [last captchas](https://2captcha.com/statistics/uploads) are visible and check [unrecognizable images](https://2captcha.com/setting/not_captcha) we saved for analisys. Then fix your software to submit images properly. |
| MAX\_USER\_TURN | You made more than 60 requests to _in.php_ within 3 seconds. <br>Your account is banned for 10 seconds. Ban will be lifted automatically. | Set at least 100 ms timeout between requests to _in.php_. |
| ERROR: NNNN | Where NNNN is numeric error code. <br>You exceeded request limit and your account is temporary suspended. | You should set proper timeouts. Please refer to [Request limits](https://2captcha.com/2captcha-api#limits) for more info. |
| ERROR\_BAD\_PARAMETERS | The error code is returned if some required parameters are missing in your request or the values have incorrect format. Or in case if you have SandBox mode and 100% recognition options enabled at the same time. <br>For example if you submit [Grid images](https://2captcha.com/2captcha-api#grid) but your request is missing an instruction for workers. Or if you submit [reCAPTCHA V2](https://2captcha.com/2captcha-api#solving_recaptchav2_new) or [TikTok](https://2captcha.com/2captcha-api#solving_tiktok) captcha with cookies string that has incorrect format. | Check that your request contains all the required parameters and the values are in proper format. <br>Use [debug mode](https://2captcha.com/2captcha-api#debugging) to see which values you send to our API. |
| ERROR\_BAD\_PROXY | You can get this error code when sending a captcha via proxy server which is marked as _BAD_ by our API. | Use a different proxy server in your requests. |

#### [List of res.php errors](https://2captcha.com/2captcha-api\#list-of-resphp-errors)

| **Error code** | **Description** | **Action** |
| --- | --- | --- |
| CAPCHA\_NOT\_READY | Your captcha is not solved yet. | **Make 5 seconds timeout** and repeat your request. |
| ERROR\_CAPTCHA\_UNSOLVABLE | We are unable to solve your captcha - three of our workers were unable solve it or we didn't get an answer within 90 seconds (300 seconds for reCAPTCHA V2). <br>We will not charge you for that request. | You can retry to send your captcha. |
| ERROR\_WRONG\_USER\_KEY | You've provided _key_ parameter value in incorrect format, it should contain 32 symbols. | Stop sending requests. Check [your API key](https://2captcha.com/2captcha-api#solving_captchas). |
| ERROR\_KEY\_DOES\_NOT\_EXIST | The key you've provided does not exists. | Stop sending requests. Check [your API key](https://2captcha.com/2captcha-api#solving_captchas). |
| ERROR\_WRONG\_ID\_FORMAT | You've provided captcha ID in wrong format. The ID can contain numbers only. | Check the ID of captcha or your code that gets the ID. |
| ERROR\_WRONG\_CAPTCHA\_ID | You've provided incorrect captcha ID. | Check the ID of captcha or your code that gets the ID. |
| ERROR\_BAD\_DUPLICATES | Error is returned when 100% accuracy feature is enabled. The error means that max numbers of tries is reached but min number of matches not found. | You can retry to send your captcha again. |
| ERROR\_REPORT\_NOT\_RECORDED | Error is returned to your [report request](https://2captcha.com/2captcha-api#complain) if you already complained lots of correctly solved captchas (more than 40%). Or if more than 15 minutes passed after you submitted the captcha. | Make sure that you're sending [complain requests](https://2captcha.com/2captcha-api#complain) only for incorrectly solved captchas. |
| ERROR\_DUPLICATE\_REPORT | Error is returned to your [report request](https://2captcha.com/2captcha-api#complain) if you are trying to report the same captcha more than once. | Make sure that you're sending only one report for each captcha. |
| ERROR: NNNN | Where NNNN is numeric error code. <br>You exceeded request limit and your account is temporary suspended. | You should set proper timeouts. Please refer to [Request limits](https://2captcha.com/2captcha-api#limits) for more info. |
| ERROR\_IP\_ADDRES | You can receive this error code when registering a [pingback (callback)](https://2captcha.com/2captcha-api#pingback) IP or domain. <br>That happes if your request is coming from an IP address that doesn't match the IP address of your pingback IP or domain. | Make the request from the IP address matching your IP or domain for pingback. |
| ERROR\_TOKEN\_EXPIRED | You can receive this error code when sending [Geetest](https://2captcha.com/2captcha-api#solving_geetest). <br>That error means that `challenge` value you provided is expired. | If you always receive this error code that means that we're unable to solve Geetest on this website. |
| ERROR\_EMPTY\_ACTION | Action parameter is missing or no value is provided for `action` parameter. | Check your request parameters and add the neccessary value, e.g. `get` or `getbalance`. |
| ERROR\_PROXY\_CONNECTION\_FAILED | You can get this error code if we were unable to load a captcha through your proxy server. The proxy will be marked as _BAD_ by our API and we will not accept requests with the proxy during 10 minutes. <br>You will recieve ERROR\_BAD\_PROXY code from _in.php_ API endpoint in such case. | Use a different proxy server in your requests. |

### [Debugging API](https://2captcha.com/2captcha-api\#debugging-api)

Sometimes it can be hard to find to undrestand why our API returns an [error code](https://2captcha.com/2captcha-api#error_handling) when you make a request that looks correct.

We provide a debugging method that can help you to find the root of the problem showing what exactly our API recevied from you.

The method can be used both on `in.php` and `res.php` API endpoints for any request.

Add an additional parameter `debug_dump=1` to your request and our server will return a dump of request parameters that received by our API.

Request example:

```
https://2captcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8&method=userrecaptcha&googlekey=6Le-wvkSVVABCPBMRTvw0Q4Muexq1bi0DJwx_mJ-&json=1&header_acao=1&pageurl=http://mysite.com/page/with/recaptcha/&pingback=http://1.2.3.4/pingback_handler/&debug_dump=1

```

Response example:

```
array(8) {
["key"]=>
string(32) "1abc234de56fab7c89012d34e56fa7b8"
["method"]=>
string(13) "userrecaptcha"
["googlekey"]=>
string(40) "6Le-wvkSVVABCPBMRTvw0Q4Muexq1bi0DJwx_mJ-"
["json"]=>
string(1) "1"
["header_acao"]=>
string(1) "1"
["pageurl"]=>
string(38) "http://mysite.com/page/with/recaptcha/"
["pingback"]=>
string(32) "http://1.2.3.4/pingback_handler/"
["debug_dump"]=>
string(1) "1"
}
array(0) {
}
array(0) {
}
{"status":0,"request":"ERROR_KEY_DOES_NOT_EXIST"}

```

Using this method you will be able to easily identify cases when your request contains invalid data or missing required parameters.

### [Request limits](https://2captcha.com/2captcha-api\#request-limits)

Please remember and understand that each of your requests to our API generates multuple requests to our databases. That's why we ask to set proper timeouts for your requests and use proper [error handling](https://2captcha.com/2captcha-api#error_handling) for cases when server returns an error (error message, HTTP error or HTML page with error).

For example:

- If server returns ERROR\_NO\_SLOT\_AVAILABLE make a 5 seconds timeout before sending next request.
- If server returns ERROR\_ZERO\_BALANCE set the timeout to 60 seconds.
- After uploading a captcha wait a least 5 seconds (10-20 for recaptcha) and only then try to get the answer.
- If captcha is not solved yet - retry in 5 seconds.

If your timeouts are configured incorrectly your account or IP address will be temporary blocked and server will return an error. See the list of error codes in the [table below](https://2captcha.com/2captcha-api#limit_errors).

#### [List of error codes for request limitations](https://2captcha.com/2captcha-api\#list-of-error-codes-for-request-limitations)

| **Error code** | **Blocking time** | **Blocking reason** |
| --- | --- | --- |
| ERROR: 1001 | 10 minutes | You received 120 ERROR\_NO\_SLOT\_AVAILABLE errors in one minute because your current bid is lower than current bid on the server |
| ERROR: 1002 | 5 minutes | You received 120 ERROR\_ZERO\_BALANCE errors in one minute because your balance is out |
| ERROR: 1003 | 30 seconds | You are getting ERROR\_NO\_SLOT\_AVAILABLE because you are uploading many captchas and server has a long queue of your captchas that are not distributed to workers. <br>You received three times more errors than amount of captchas you sent (but not less than 120 errors). Increase the timeout if you see this error. |
| ERROR: 1004 | 10 minutes | Your IP address is blocked because there were 5 requests with incorrect API key from your IP. |
| ERROR: 1005 | 5 minutes | You are making too many requests to res.php to get answers. <br>We use the following rule to block your account: R > C \* 20 + 1200 <br>Where: <br>R - the amount of your requests <br>C - the amount of captchas you've uploaded <br>That means that you don't have to make more than 20 requests to res.php per each captcha. <br>Please remember that balance request sent to res.php also counts! <br>To get your answer faster without a risk to be blocked you can use [pingback feature](https://2captcha.com/2captcha-api#pingback) and we will send you the answer when your captcha is solved. |
| MAX\_USER\_TURN | 10 seconds | You made more than 60 requests to _in.php_ within 3 seconds. Set at least 100 ms timeout between requests to _in.php_. |

### [Using proxies](https://2captcha.com/2captcha-api\#using-proxies)

Proxies can be used to solve most types of javascript-based captchas:

- [reCAPTCHA V2](https://2captcha.com/2captcha-api#solving_recaptchav2_new)
- [reCAPTCHA Enterpise V2](https://2captcha.com/2captcha-api#solving_recaptcha_enterprise)
- [Arkose Labs FunCaptcha](https://2captcha.com/2captcha-api#solving_funcaptcha_new)
- [Geetest](https://2captcha.com/2captcha-api#solving_geetest)
- [Geetest v4](https://2captcha.com/2captcha-api#geetest-v4)
- [TikTok](https://2captcha.com/2captcha-api#solving_tiktok)

Proxy allows to solve the captcha from the same IP address as you load the page.

Using proxies is not obligatory in most cases. But for some kind of protection you should use it. For example: Cloudflare and Datadome protection pages require IP matching.

Also good proxies with regular rotation can raise the speed and success rate for [Arkose Labs FunCaptcha](https://2captcha.com/2captcha-api#solving_funcaptcha_new).

Proxies are not supported for reCAPTCHA V3 and Enterprise V3 as proxies dramatically decrease the success rate for this types of captcha.

If you send us the proxy, we check it's availability trying to open the website through you proxy, and if we can't do that we will not use your proxy.

If we're able to use your proxy - we'll load the reCAPTCHA through it for solving.

We have our own proxies that we can offer you. [Buy residential proxies](https://2captcha.com/proxy/residential-proxies) for avoid restrictions and blocks. [Quick start](https://2captcha.com/proxy?openAddTrafficModal=true).

We support the following proxy types: SOCKS4, SOCKS5, HTTP, HTTPS with authentication by IP address or login and password.

If your proxy uses IP authentication you have to add our IP addresses to the list of allowed IPs of the proxy:

138.201.188.166

Then provide your proxy IP address and port as a value for _proxy_ parameter.

And the type of your proxy as a value for _proxytype_ parameter.

If your proxy uses login/password authentication you have to include your credentials in _proxy_ parameter.

#### [POST parameters for proxies](https://2captcha.com/2captcha-api\#post-parameters-for-proxies)

| **POST parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| proxy | String | No | Format for IP authentication: _IP\_address:PORT_<br>Example: _proxy=123.123.123.123:3128_<br>Format for login/password authentication: _login:password@IP\_address:PORT_<br>Example: _proxy=proxyuser:strongPassword@123.123.123.123:3128_ |
| proxytype | String | No | Type of your proxy: HTTP, HTTPS, SOCKS4, SOCKS5. <br>Example: _proxytype=SOCKS4_ |

### [Cookies param](https://2captcha.com/2captcha-api\#cookies-param)

Our API provides extended Cookies support for reCAPTCHA V2 and reCAPTCHA V2 Enterpise.

You can provide your cookies using the format below as the value of `json_cookies` parameter. We will set the cookies on our worker's browser.

After the captcha was solved succesfully, we will return all the cookies set for domains: `google.com` and the domain of your target website from `pageurl` parameter value.

You should use `json=1` parameter in your request to res.php endpoint to get the cookies.

#### [Cookies format:](https://2captcha.com/2captcha-api\#cookies-format)

```
{
"json_cookies": [\
{\
    "name": "my-cookie-name-1",\
    "value": "my-cookie-val-1",\
    "domain": "example.com",\
    "hostOnly": true,\
    "path": "\/",\
    "secure": true,\
    "httpOnly": false,\
    "session": false,\
    "expirationDate": 1665434653,\
    "sameSite": "strict"\
},\
{\
    "name": "my-cookie-name-2",\
    "value": "my-cookie-val-2",\
    "domain": ".google.com",\
    "hostOnly": false,\
    "path": "\/",\
    "secure": true,\
    "httpOnly": false,\
    "session": false,\
    "expirationDate": 1668015805.8028,\
    "sameSite": "no_restriction"\
}\
]
}

```

The following properties are required for each cookie:

- `domain` (String) - the domain for cookie
- `name` (String) - the cookie name
- `value` (String) - the cookie value
- `secure` (Boolean) - should we set secure attribute?

### [Pingback (callback)](https://2captcha.com/2captcha-api\#pingback-callback)

We provide a pingback (callback) option that allows you to get the answer for your captcha automatically when it's ready.

It allows you to get answers without making requests to https://2captcha.com/res.php and also allows you to avoid account suspension.

To receive automated pingback you have to:

- [Register your pingback domain/IP address.](https://2captcha.com/2captcha-api#manage_pingback)
- Provide your pingback URL as a value for _pingback_ parameter of your request to https://2captcha.com/in.php.
- Process _HTTP POST_ request with URLencoded form data (application/x-www-form-urlencoded) coming from our server to your pingback URL. The request contains two parameters: `id` \- captcha ID and `code` \- the answer.

Incoming pingback request example:

```
id=51555263943&code=ANSWER

```

You can use any pingback URL pointing to your registered domain/IP address so your URL can include custom parameters.

But there's one limitation: if you will submit your captcha with GET request and use URL that contains multiple parameters like `http://mysite.com/pingback/?myId=1&myCat=2&something_else=test` then you will receive pingback to URL with only the first parameter `?myId=1`. To avoid that use POST request with multipart/form-data.

#### [Manage pingback addresses](https://2captcha.com/2captcha-api\#manage-pingback-addresses)

You can manage your pingback addresses on [pingback management page](https://2captcha.com/setting/pingback) or making _HTTP GET_ requests to `https://2captcha.com/res.php`

Request parameters are described in the table below.

**Important:** pingback domain/IP address can be registered only from the same IP address so you got to send register request from your server.

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | add\_pingback - register new pingback URL <br>get\_pingback - get the list of your pingback URLs <br>del\_pingback - delete pingback URL |
| addr | String | - | Your pingback URL. <br>For example: _http://mysite.com/pingback/url/_ or _123.123.123.123/pingback/url/_<br>You can use 'all' value together with del\_pingback to delete all your URLs. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

#### [Request examples](https://2captcha.com/2captcha-api\#request-examples)

Register pingback domain/IP:

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=add_pingback&addr=mysite.com

```

List pingback domains/IPs:

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get_pingback&json=1

```

Delete all pingback domains/IP:

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=del_pingback&addr=all

```

### [Reporting answers](https://2captcha.com/2captcha-api\#reporting-answers)

Reporting answers is not required to solve capthcas. But it can help you to cut expenses and increase the accuracy. We described why it is important to report answers in [our blog](https://2captcha.com/blog/reportgood-reportbad).

We recommend to report both correct and incorrect asnwers for all types of captchas.

If the answer is not accepted by target website use `reportbad` method to inform us about that. The answer will be rechecked and you will receive a refund for incorrect answer.

If the answer was accepted successfully use `reportgood` method to indicate that. That will allow us to increase the accuracy for future requests.

> **Important:** don't try to report correct answers with `reportbad`. If you will do that then we will block this method for your account.

> Reports for captchas with token like reCAPTCHA V2/V3, KeyCaptcha, FunCaptcha are not visible in the user interface or the dashboard. But we gather the statistics on these reports to increase the success rate for these captchas.

> Reports can not be used if 100% recognition feature is enabled.

**Request examples:**

ReportBAD

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=reportbad&id=2122988149

```

ReportGOOD

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=reportgood&id=2122988149

```

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | reportbad - report incorrectly solved captcha <br>reportgood - confirm correct answer |
| id | String | Yes | captcha ID |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

Server will return `OK_REPORT_RECORDED` response to your request. Or an [error code](https://2captcha.com/2captcha-api#error_handling) if something went wrong.

If you're getting too many incorrectly solved captchas you may provide [additional parameters](https://2captcha.com/2captcha-api#normal_post) with your captcha to help wokers to solve it correctly

### [Additional methods](https://2captcha.com/2captcha-api\#additional-methods)

You can also get some additional information with our API, like balance, current rate, etc.

Please check available parameters in the table below.

**List of _GET_ request parameters for https://2captcha.com/res.php**

| **GET parameter** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| key | String | Yes | [your API key](https://2captcha.com/2captcha-api#solving_captchas) |
| action | String | Yes | getbalance — get your balance <br>get — get answers for multiple captchas with one request. <br>Requires the list of captcha IDs in _ids_ parameter. <br>get2 — get the price of sent captcha and the answer. <br>Requires captcha ID in _id_ parameter. |
| ids | String | - | Comma separated IDs of your captchas. |
| json | Integer <br>Default: 0 | No | 0 - server will send the response as plain text <br>1 - tells the server to send the response as JSON |

Example request (plain text):

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get2&id=2122988149

```

Example response (plain text):

```
OK|ABCDE|0.00085

```

Example request (JSON):

```
https://2captcha.com/res.php?key=1abc234de56fab7c89012d34e56fa7b8&action=get2&id=2122988149&json=1

```

Example response (JSON):

```
{
"status":1,
"request":"ABCDE",
"price":"0.00085"
}

```

### [Code Examples](https://2captcha.com/2captcha-api\#code-examples)

We invite you to explore our [GitHub repository](https://github.com/2captcha/) where you can find libraries and modules for easy integration with our API:

- PHP [\[GitHub\]](https://github.com/2captcha/2captcha-php) [\[Packageist\]](https://packagist.org/packages/2captcha/2captcha)
- Java [\[GitHub\]](https://github.com/2captcha/2captcha-java) [\[Maven\]](https://search.maven.org/artifact/com.github.2captcha/2captcha-java)
- C# [\[GitHub\]](https://github.com/2captcha/2captcha-csharp) [\[Nuget\]](https://www.nuget.org/packages/2captcha-csharp/)
- Python [\[GitHub\]](https://github.com/2captcha/2captcha-python) [\[PyPi\]](https://pypi.org/project/2captcha-python/)
- JavaScript [\[GitHub\]](https://github.com/2captcha/2captcha-javascript) [\[NPM\]](https://www.npmjs.com/package/@2captcha/captcha-solver)
- GO [\[GitHub\]](https://github.com/2captcha/2captcha-go)
- Ruby [\[GitHub\]](https://github.com/2captcha/2captcha-ruby) [\[RubyGems\]](https://rubygems.org/gems/ruby-2captcha)
- C++ [\[GitHub\]](https://github.com/2captcha/2captcha-cpp)

You can find even more code examples and libraries simply searching [2captcha OR rucaptcha](https://github.com/search?q=2captcha+OR+rucaptcha) on GitHub. If code is made for rucaptcha.com just replace the URL to 2captcha.com, API is the same.

### [Sandbox mode](https://2captcha.com/2captcha-api\#sandbox-mode)

We provide Sandbox mode that allows you to see and solve your captchas by yourself.

You can enable Sandbox mode in your [settings](https://2captcha.com/setting)

When Sandbox mode is enabled your captchas will not be distributed to wokers.

Normal captchas will be availble in [Workers Cabinet](https://2captcha.com/cabinet/)

Token-based captchas like reCAPTCHA V2, Geetest, etc are available in [Workers' software](https://2captcha.com/workers-software)

**Important:** to use wokers' software you need to switch to "Worker" mode using the top right dropdown menu. Then copy workers' key and use it in the software.

**reCAPTCHA V3 is not supported** in SandBox and will be distributed to workers.

Toggle API docs navigation

API version:

[API v1](https://2captcha.com/2captcha-api) [API v2](https://2captcha.com/api-docs)

- [API v1](https://2captcha.com/2captcha-api)
- [Introduction](https://2captcha.com/2captcha-api#intro)
- [Recent Changes](https://2captcha.com/2captcha-api#recent_changes)
- [Rates](https://2captcha.com/2captcha-api#rates)
- [Demo page](https://2captcha.com/2captcha-api#demo)
- [Solving Captchas](https://2captcha.com/2captcha-api#solving_captchas)
  - [Normal Captcha](https://2captcha.com/2captcha-api#solving_normal_captcha)
  - [Text Captcha](https://2captcha.com/2captcha-api#solving_text_captcha)
  - [reCAPTCHA V2](https://2captcha.com/2captcha-api#solving_recaptchav2_new)
  - [reCAPTCHA Callback](https://2captcha.com/2captcha-api#callback)
  - [Invisible reCAPTCHA V2](https://2captcha.com/2captcha-api#invisible)
  - [reCAPTCHA V3](https://2captcha.com/2captcha-api#solving_recaptchav3)
  - [reCAPTCHA Enterprise](https://2captcha.com/2captcha-api#solving_recaptcha_enterprise)
  - [Grid](https://2captcha.com/2captcha-api#grid)
  - [Coordinates](https://2captcha.com/2captcha-api#coordinates)
  - [RotateCaptcha](https://2captcha.com/2captcha-api#solving_rotatecaptcha)
  - [Arkose Labs FunCaptcha](https://2captcha.com/2captcha-api#solving_funcaptcha_new)
  - [KeyCaptcha](https://2captcha.com/2captcha-api#solving_keycaptcha)
  - [Geetest](https://2captcha.com/2captcha-api#solving_geetest)
  - [Geetest v4](https://2captcha.com/2captcha-api#geetest-v4)
  - [Capy Puzzle](https://2captcha.com/2captcha-api#solving_capy)
  - [TikTok](https://2captcha.com/2captcha-api#solving_tiktok)
  - [Lemin Cropped Captcha](https://2captcha.com/2captcha-api#lemin)
  - [Cloudflare Turnstile](https://2captcha.com/2captcha-api#turnstile)
  - [Amazon WAF](https://2captcha.com/2captcha-api#amazon-waf)
  - [CyberSiARA](https://2captcha.com/2captcha-api#cybersiara)
  - [MTCaptcha](https://2captcha.com/2captcha-api#mtcaptcha)
  - [Cutcaptcha](https://2captcha.com/2captcha-api#cutcaptcha)
  - [Friendly Captcha](https://2captcha.com/2captcha-api#friendly-captcha)
  - [atbCAPTCHA](https://2captcha.com/2captcha-api#atb-captcha)
  - [Tencent](https://2captcha.com/2captcha-api#tencent)
  - [DataDome](https://2captcha.com/2captcha-api#datadome)
  - [Audio Recognition](https://2captcha.com/2captcha-api#audio)
  - [Bounding Box Method](https://2captcha.com/2captcha-api#bounding_box)
  - [Prosopo Procaptcha](https://2captcha.com/2captcha-api#prosopo-procaptcha)
  - [CaptchaFox](https://2captcha.com/2captcha-api#captchafox)
- [Language support](https://2captcha.com/2captcha-api#language)
- [Error Handling](https://2captcha.com/2captcha-api#error_handling)
  - [List of in.php errors](https://2captcha.com/2captcha-api#in_errors)
  - [List of res.php errors](https://2captcha.com/2captcha-api#res_errors)
- [Debugging & Sandbox](https://2captcha.com/2captcha-api#debugging)
- [Request limits](https://2captcha.com/2captcha-api#limits)
  - [List of error codes for request limitations](https://2captcha.com/2captcha-api#limit_errors)
- [Using proxies](https://2captcha.com/2captcha-api#proxies)
  - [POST parameters for proxies](https://2captcha.com/2captcha-api#recaptchav2new_proxy)
- [Cookies](https://2captcha.com/2captcha-api#cookies)
- [Pingback (callback)](https://2captcha.com/2captcha-api#pingback)
  - [Manage pingback addresses](https://2captcha.com/2captcha-api#manage_pingback)
  - [Request examples](https://2captcha.com/2captcha-api#pingback_examples)
- [Reporting answers](https://2captcha.com/2captcha-api#complain)
- [Additional methods](https://2captcha.com/2captcha-api#additional)
- [Code Examples](https://2captcha.com/2captcha-api#examples)
- [Sandbox](https://2captcha.com/2captcha-api#sandbox)

[![Logo of «GitHub»](https://2captcha.com/dist/web/assets/github-BOoOh1jp.svg)](https://github.com/2captcha)

- [![We support API for «PHP» language](https://2captcha.com/dist/web/assets/php-B5Spy0Zq.svg)](https://github.com/2captcha/2captcha-php)
- [![We support API for «Python» language](https://2captcha.com/dist/web/assets/python-DZkSH86L.svg)](https://github.com/2captcha/2captcha-python)
- [![We support API for «Go» language](https://2captcha.com/dist/web/assets/go-z3vmMuLB.svg)](https://github.com/2captcha/2captcha-go)
- [![We support API for «Ruby» language](https://2captcha.com/dist/web/assets/ruby-DOiKe3HT.svg)](https://github.com/2captcha/2captcha-ruby)
- [![We support API for «C#» language](https://2captcha.com/dist/web/assets/csharp-chqx7xWE.svg)](https://github.com/2captcha/2captcha-csharp)
- [![We support API for «Java» language](https://2captcha.com/dist/web/assets/java-BduKJu7K.svg)](https://github.com/2captcha/2captcha-java)
- [![We support API for «JavaScript» language](https://2captcha.com/dist/web/assets/javascript-BdgrMxXT.svg)](https://github.com/2captcha/2captcha-javascript)