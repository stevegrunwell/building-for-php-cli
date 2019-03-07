### Environment Variables

```php
$apiKey = getenv('API_KEY');

// It wasn't provided via environment variable.
if (! $apiKey && ! empty($argv[1])) {
    $apiKey = $argv[1];
}

// Neither environment nor argument.
if (! $apiKey) {
    echo 'An API key must be provided!';
    exit(1);
}

echo "API Key: $apiKey";
```

Note:

Another neat trick is the ability to access environment variables from within your PHP script.

Can use both getenv() and putenv().
