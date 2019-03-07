### Exit codes

```php
if (! isset($argv['1'])) {
	echo "Missing required argument!";
	exit(1);
}

echo "Script ran!";
```

```sh
$ php my-script.php foo && echo "Success"
> Script ran!
> Success
```
<!-- .element: class="fragment" -->

```sh
$ php my-script.php && echo "You will never see this"
> Missing required argument!
```
<!-- .element: class="fragment" -->

Note:

* We may have a line like this, exiting with an exit code of 1 if we're missing an argument
* If we pass "foo", we'll run the script and exit with 0, so the && will run
* If we miss it, we exit with 1 and the shell won't execute the echo statement
