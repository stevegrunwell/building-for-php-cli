### `system()`

*Execute a system command, flushing the output buffer for each line.*

```php
echo 'Current directory contents:' . PHP_EOL;

system('ls -a', $status);

printf( '`ls` command exited with status "%d"' . PHP_EOL, $status );
```

```html
Current directory contents:
.
..
.git
.gitignore
vendor
`ls` command exited with status "0"
```
<!-- .element: class="fragment" -->
