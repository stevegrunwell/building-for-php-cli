### [`getopt()`](http://php.net/manual/en/function.getopt.php)

```php
# myscript.php
var_export(getopt(
	'a:bc',
	['foo:', 'verbose']
));
```

```bash
$ myscript -a=hello -b -d --foo=bar --verbose

array(
  'a' => 'hello'
  'b' => false,
  'foo' => 'bar',
  'verbose' => false,
)
```
<!-- .element: class="fragment" -->

[php.net/manual/en/function.getopt.php](http://php.net/manual/en/function.getopt.php)<!-- .element: class="fragment" -->

Note:

* Retrieves options passed via CLI
* Hold-over from C, and most frameworks have their own abstraction for this
* Define expected arguments, returns array of those arguments that are present
* Best to refer to the manual, as it's needlessly complicated
