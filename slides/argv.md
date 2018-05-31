### [`$argv`](http://php.net/manual/en/reserved.variables.argv.php)

* <!-- .element: class="fragment" --> Arguments passed to script as array
* <!-- .element: class="fragment" --> Includes script name!

```php
$ php -r "var_export(\$argv);" foo bar

array (
    0 => 'Standard input code',
    1 => 'foo',
    2 => 'bar',
)
```
<!-- .element: class="fragment" -->

Note:

* ARGV === ARGument Values
* Should never be empty, since the script name is 0
