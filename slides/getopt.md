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

Note:

* Retrieves options passed via CLI
* Define expected arguments, returns array of those arguments that are present
    - Only options specified will be included
    - Flags will be FALSE, but present!
