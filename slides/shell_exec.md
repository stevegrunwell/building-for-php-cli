#### `shell_exec()`

*Executes an external program and returns its full output as a string.*

```php
echo 'Running `shell_exec(\'ls -a\')`...' . PHP_EOL;

$ls = shell_exec('ls -a');
echo $ls;
```
<!-- .element: class="fragment" -->

```html
Running `shell_exec('ls -a')`...
.
..
.git
.gitignore
README.md
composer.json
composer.lock
examples
examples.php
vendor
```
<!-- .element: class="fragment" -->