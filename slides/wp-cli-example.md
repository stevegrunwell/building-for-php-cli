### WP-CLI: Register Command

```php
/**
 * Example WP-CLI script.
 */
class Example_WP_CLI_Command extends WP_CLI_Command {
	// At least one public method.
}

WP_CLI::add_command( 'example-command', 'Example_WP_CLI_Command' );
```
