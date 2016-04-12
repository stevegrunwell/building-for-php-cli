### Symfony Console

```php
/**
 * Execute the command.
 *
 * @param InputInterface  $input  The input interface.
 * @param OutputInterface $output The output interface.
 */
protected function execute($input, $output)
{
	$output->writeln(sprintf(
		'<comment>Symfony says "hello", %s!</comment>',
		$input->getArgument('name')
	));
}
```