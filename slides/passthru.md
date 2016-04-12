### Passthru

*Executes a system command and returns the raw output.*

(Well-suited for things like binary file returns)

```php
echo "Let's edit passthru.tmp!" . PHP_EOL;

passthru('vim passthru.tmp');
```
