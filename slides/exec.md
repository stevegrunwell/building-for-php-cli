#### `exec()`

*Executes an external program and returns the last line of output as a string.*

```php
echo 'Running `exec(\'which phpcs\')`...' . PHP_EOL;

$phpcsPath = exec('which phpcs');

if ($phpcsPath) {
	printf('PHP_CodeSniffer was found at %s', $phpcsPath);
} else {
	echo 'PHP_CodeSniffer was not found in your path.';
}
```
<!-- .element: class="fragment" -->

```
Running `exec('which phpcs')`...
PHP_CodeSniffer was found at /Users/steve/.composer/vendor/bin/phpcs
```
<!-- .element: class="fragment" -->