### `$argc`

* <!-- .element: class="fragment" --> # of arguments
* <!-- .element: class="fragment" --> Also includes script name!

```php
$ php -r "var_export(\$argc);" foo bar

3
# Script name, "foo", and "bar"
```
<!-- .element: class="fragment" -->

Note:

* ARGC === ARGument Count
* Like $argv, Should never be empty, since the script name is 0
