###  PHP-CLI Tools

```php
#!/usr/bin/env php
<?php

// Require dependencies.
require_once __DIR__ . '/../vendor/autoload.php';

$limit  = cli\prompt('How high should I count?', 10);
$loud   = cli\choose('Shall I shout it');
$suffix = 'y' === $loud ? '!' : '.';

for ($i = 1; $i <= $limit; $i++) {
	cli\line($i . $suffix);
}
```
