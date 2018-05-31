#### `escapeshellarg()`

Escape individual command arguments.

```php
$name = 'steve && rm -rf /';

# Oh no, $name isn't being escaped!
exec('greet-user ' . $name);
```
<!-- .element: class="fragment" data-fragment-index="0" -->

```php
> Hello, steve # proceeded by your system being destroyed
```
<!-- .element: class="fragment" data-fragment-index="1" -->

##### Much Better:
<!-- .element: class="fragment" data-fragment-index="2" -->

```php
$name = 'steve && rm -rf /';

# Nice try, user!
exec('greet-user ' . escapeshellarg($name));
```
<!-- .element: class="fragment" data-fragment-index="2" -->

```php
> Hello, steve && rm -rf / # What an odd name!
```
<!-- .element: class="fragment" data-fragment-index="3" -->

Note:

* Imagine we have a 'greet-user' script, which accepts a name and prints a greeting
* If we call that script via exec(), we need to make sure we're escaping arguments, especially if they're user-provided!
