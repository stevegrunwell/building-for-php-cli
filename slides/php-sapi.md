### Know the current Server API

```php
// Make sure this script is being run over the PHP CLI!
if ('cli' !== php_sapi_name()) {
	return;
}
```

Note:

* Use the php_sapi_name() function or PHP_SAPI constant to determine the server API being used
