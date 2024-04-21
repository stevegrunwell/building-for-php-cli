<!-- .slide: class="title-slide" data-hide-footer -->
# Building for the PHP \\<br>Command Line Interface

Steve Grunwell <!-- .element: class="byline" -->
<span class="role">Staff Software Engineer, Mailchimp</span>

[@stevegrunwell@phpc.social](https://phpc.social/@stevegrunwell)
[stevegrunwell.com/slides/php-cli](https://stevegrunwell.com/slides/php-cli)
<!-- .element: class="slides-link" -->

---

## Why the CLI?

Note:

Before we talk about how, let's discuss *why* you might use PHP on the command line

----

### PHP Everywhere!

* <!-- .element: class="fragment" --> Re-use application code
* <!-- .element: class="fragment" --> Reduce language sprawl
* <!-- .element: class="fragment" --> PHP ❤️ Scripting

Note:

* The biggest benefit of PHP on the CLI is that we're still working in PHP:
    * Speaking the same language as the rest of your application
    * No alternate implementations, duplicative services, etc.
* Keeps codebase tighter and prevents every PHP dev on your team from *also* having to write Bash or Python
* PHP is a scripting language at heart
    * The tools we use every day (Composer, PHP_CodeSniffer, PHPUnit, PHPStan, et al) are written in PHP and interacted with solely through the command line (no GUI required!)

----

### Invoking PHP on the CLI

Via the PHP binary: <!-- .element: class="fragment" data-fragment-index="0" -->

```sh
$ php my-command.php
```
<!-- .element: class="fragment" data-fragment-index="0" -->

With the PHP shebang:<!-- .element: class="fragment" data-fragment-index="1" -->

```sh
#!/usr/bin/env php
```
<!-- .element: class="fragment" data-fragment-index="1" -->

```cli [1|2]
$ chmod +x my-command.php
$ ./my-command.php
```
<!-- .element: class="fragment hide-line-numbers" -->

Note:

Two ways of running PHP scripts on the command line:

1. Explicitly passing the script as an argument to the `php` binary
2. Using the PHP shebang
    * Probably familiar if you've done shell scripting before
    * Tells the shell how to interpret the script (literally "php from the user's $PATH")
    * Only required if you want to be able to run it without explicitly calling the PHP binary

As long as the script has an executable bit in its permissions, we can run it like any other command

----

### When might I use them?

* <!-- .element: class="fragment" --> Data migrations & transformations
* <!-- .element: class="fragment" --> Maintenance scripts
* <!-- .element: class="fragment" --> Dev-only actions
	* Scaffolding
	* Other code changes
* <!-- .element: class="fragment" -->"#YOLO scripts"

Note:

Great places for PHP command line scripts include:

* Data migrations, transformations, schema updates, table seeding, etc.
* Maintenance scripts and scheduled jobs
    * Cron jobs, queues
* Operations that are not meant to be customer facing
    * Scaffolding new models
    * Generating new migrations
* YOLO scripts: scripts you're only going to run once (or a small number) of times.

---

## <span class="no-transform">CLIs</span> for your Favorite Frameworks

Note:

If you're working with a framework or CMS, chances are you already have the ability to talk to it via the CLI

----

### [Drush](https://www.drush.org)

* <!-- .element: class="fragment" --> "Drupal Shell"
    * One of the OG CLI tools for PHP CMSs
* <!-- .element: class="fragment" --> Manage themes, modules, system updates, etc.

Note:

Credit where credit is due, Drush ("Drupal Shell") is one of the earliest CLI tools for managing a PHP application

----

### [WP-CLI](https://wp-cli.org)

* <!-- .element: class="fragment" --> Install core, themes, plugins, etc.
* <!-- .element: class="fragment" --> Manage posts, terms, users, and more
* <!-- .element: class="fragment" --> Inspect and maintain cron, caches, and transients
* <!-- .element: class="fragment" --> Extensible for themes + plugins

Note:

Heavily inspired by Drush, WP-CLI lets you perform most operations on a WordPress site without touching the GUI:

Before my current job, I spent five years working at a WordPress-oriented web host. We used WP-CLI for *everything*, including as part of our provisioning scripts

----

### [Laravel Artisan](https://laravel.com/docs/master/artisan)

* <!-- .element: class="fragment" --> The underlying CLI for Laravel
    * Built atop the Symfony Console
* <!-- .element: class="fragment" --> Scaffold <img src="resources/all-the-things.png" alt="all the things" style="max-height: 1.4em; margin: -.2em 0;" />
* <!-- .element: class="fragment" --> Allows packages to register new commands

Note:

* Artisan is the command line interface for Laravel
    * Built on top of Symfony Console (more in a minute)
* Easily scaffold models, controllers, console commands, and more!
* Third-party packages can register new commands

----

### Joomlatools Console

* <!-- .element: class="fragment" --> CLI framework for Joomla
* <!-- .element: class="fragment" --> Manage sites, extensions, databases, etc.
    * Includes virtual host management

Note:

* Joomla counterpart of WP-CLI or Drush
* Similar kinds of features: managing sites, users, extensions, etc.
    * Kind of neat: has the "vhost" command for managing Apache + nginx virtual hosts

---

## CLI Concepts

Note:

While it's not any more difficult than building anything else in PHP, there are some concepts that you need to understand if you're going to build for the CLI

----

### Composability

Good CLI commands should be **composable!**

Note:

Composability is one of the major tenents of *nix operating systems.

Who can tell me what this means?

----

### Rule of Composability

> Developers should write programs that can communicate easily with other programs. This rule aims to allow developers to break down projects into small, simple programs rather than overly complex monolithic programs.

<cite>Eric S. Raymond, [*The Art of Unix Programming*](https://en.wikipedia.org/wiki/The_Art_of_Unix_Programming)</cite>

Note:

Small programs that can communicate with each other through common interfaces (data streams) and be combined to do most anything

----

### Data Streams

Three default data streams:

0. <!-- .element: class="fragment" --> STDIN - <u>in</u>put
1. <!-- .element: class="fragment" --> STDOUT - <u>out</u>put
2. <!-- .element: class="fragment" --> STDERR - <u>err</u>ors

Note:

Think of a data stream as a channel that can be read from and/or written to.

Generally, there are three data streams to concern yourself with:

1. STDIN represents the data coming into your command
2. STDOUT is where you're sending data out
3. STDERR is where we collect any error information

Streams can be redirected (e.g. write errors to a log file, send the output of one command as the input into another)

----

### Data Streams in Practice

```cli [|2-3|4|5|6|7]
# Get the number of unique IP addresses in access.log
$ grep -Eo "([0-9]{1,3}[\.]){3}[0-9]{1,3}" \
    /var/log/nginx/access.log \
    | uniq \
    | wc -l \
    | xargs printf "%d unique IP addresses detected"
43282 unique IP addresses detected
```
<!-- .element: class="hide-line-numbers" -->

Note:

Counting the number of IP addresses in access.log:

1. Use `grep` to match anything that looks like an IP, returning only that part
    * STDOUT would be a series of IP addresses, one per line
2. Pipe that list of addresses into `uniq` to remove duplicates
    * STDOUT from grep became STDIN to uniq
3. Pipe the filtered list into `wc` (word count) with the `-l` option (count the number of lines)
    * STDOUT becomes an integer representing the number of lines
4. Use `xargs` to append that number to printf to give a summary

Five commands (grep, uniq, wc, xargs, and printf), each playing their part

----

### Exit Codes

Exit codes tell us how everything went:

| Code | Meaning |
| --- | --- |
| 0 | All good! |
| 1 | Generic error |
| 2 | Incorrect command/arg usage |
| 3–255 | Specific errors |

Note:

When a command exits, we do so with an exit code.

* 0 means that no errors occurred
* 1–255 represent some sort of error
    * 1 is generally a catch-all for errors
    * 2 is typically meant to indicate incorrect command/arg usage
    * 3–255 may have special meaning; there are a few conventions in the 120s for permissions errors
* You might use 3 for filesystem issues, 4 for network connectivity issues, etc.

Most scripts you come across will generally use 0 or 1: did it succeed or fail (respectively)?

----

### Exit Codes & Boolean Operators

```cli [1-2|4-5|7-8|10-11]
# Celebrate a non-zero exit code!
$ do-something && celebrate

# Hang your head in shame if something fails
$ do-something || hang-head-in-shame

# Put the operators together
$ (do-something && celebrate) || hang-head-in-shame

# Semi-colons don't care, they just separate commands
$ do-something; celebrate; hang-head-in-shame
```
<!-- .element: class="hide-line-numbers" -->

Note:

We can chain operations based on the exit code of the previous command:

* Double-ampersand ("and") will proceed if the previous operation had an exit code of zero
* Double pipes ("or") will proceed if we encountered a non-zero exit code
* Both can be used, but use parentheses if you want the "or" to be tied to the "and" sequence
* Semi-colons can chain multiple commands with no attention paid to exit codes

----

### Arguments + Options

```cli [1-3|5-8|10-12]
# Arguments
$ cd /var/www
$ grep "Some text" file.txt

# Options
$ git commit -m "This is my commit message"
$ ls -a -l
$ ls -al

# Long options
$ composer outdated --format=json
$ git push --force-with-lease
```
<!-- .element: class="hide-line-numbers" -->

Note:

* Arguments: positional parameters, passed in order
* Options: Can optionally have values, single dash + single letter. Can usually be combined
    * e.g. `ls -a -l` is the same as `ls -al`
* Long options: Same as regular options, but with two dashes + multiple letters
    * Often easier to read or decode at a glance

----

### Conventions for Options

```plaintext
OPTIONS:

  -h|--help     Print usage instructions
  -q|--quiet    Silence all output
  -v|--version  Print version information
  --verbose     Print additional output
```

Note:

While these aren't mandatory, there are a few common patterns you'll come across:

* Many scripts will reserve `-h` and/or `--help` for displaying usage instructions
* `-q` or `--quiet` is generally used to silence output
    * Especially useful for commands that may be run on a cron job, where you only want output if something goes wrong
* `-v` has two common uses: either as a short-hand for version or verbose (print additional information)

Notice that most of these options have both short and long versions!

----

### Environment Variables

Set and read variables in the current environment

```cli [1-2|4-5|7-8|]
# Export from shell files
export CURRENT_CITY="Bowling Green"

# Set directly in shell
$ CURRENT_CITY="Chicago"

# Set as you call a command
$ CURRENT_CITY="Rosemont" some-script
```
<!-- .element: class="hide-line-numbers" -->

Note:

There are three ways to set environment variables:

1. Export them from within a file like `.bash_profile`, which is sourced as your start your shell
    * Persists for all sessions
2. Explicitly set the variable in the shell
    * Persists for remainder of session
3. Set them as you're calling a command
    * Only set for the single command invocation

If I set it all three of these ways, what would some-script get for the value of CURRENT_CITY? (Rosemont)

----

### Environment Variables in PHP

```php [1-2|4-5|7-8|10-11]
# Get array of all environment variables
getenv();

# Retrieve a specific variable (false if unset)
getenv('SOMEVAR');

# Set an environment variable
putenv('SOMEVAR=some_value');

# Delete an environment variable
putenv('SOMEVAR=');
```
<!-- .element: class="hide-line-numbers" -->

Note:

There are two primary functions for working with environment variables in PHP:

1. `getenv()` reads from the environment variables
2. `putenv()` writes to the environment variables

There's also the `$_ENV` superglobal, but writing to this array has no impact on the environment.

----

### The cli SAPI

Additional **S**erver **API** for PHP

```php
// Check the current SAPI. We can also use PHP_SAPI here.
if (php_sapi_name() === 'cli') {
    // We're on the command line!!
}
```

Note:

* PHP has a number of server APIs that can introduce alternate functionality; cli is one of them
* Other SAPIs include apache, cgi-fcgi, fpm-fcgi, litespeed, phpdbg, etc.
* We can determine what SAPI we're using with the `php_sapi_name()` function or `PHP_SAPI` constant.

----

### Special CLI globals

<dl>
    <dt class="fragment" data-fragment-index="0"><code><span class="typehint">int</span> $argc</code></dt>
    <dd class="fragment" data-fragment-index="0">Argument <u>c</u>ount</dd>
    <dt class="fragment" data-fragment-index="1"><code><span class="typehint">array</span> $argv</code></dt>
    <dd class="fragment" data-fragment-index="1">Argument <u>v</u>alues</dd>
</dl>

Both will always have at least one value! <!-- .element: class="fragment" -->

Note:

The CLI SAPI exposes two CLI-specific global variables: argc and argv.

* $argc tells us the number of arguments passed to the script
* $argv is an array of those values

These will never be empty, because the script name is the first argument (even if just "Standard input code")

----

#### What will we see?

```cli
$ php -r 'echo "{$argc} arg(s):\n"; var_export($argv);' \
    PHP "is great"
```

```
3 arg(s):
array (
  0 => 'Standard input code',
  1 => 'PHP',
  2 => 'is great',
)
```
<!-- .element: class="fragment" -->

Note:

To demonstrate argc and argv, let's pass a simple script to the CLI PHP interpreter:

Can anyone guess the values of argc and argv?

----

### Daemons

A process that continually runs in the background

```php
while (true) {
    // do something!
}
```

<figure class="fragment beardhawk">
    <img src="resources/tim-lytle.jpg" alt="Tim Lytle" />
    <figcaption><a href="https://prezi.com/0l3a7q5dywc6/building-php-daemons-and-long-running-processes">Building PHP Daemons and<wbr> Long Running Processes</a></figcaption>
</figure>

Note:

* Not the best use of PHP, but useful for things like workers
* Talk that really got me into PHP CLI: "Building PHP Daemons and Long Running Processes" by Tim Lytle
    * php[tek] 2015

---

## Writing CLI Commands

[github.com/stevegrunwell/php-cli-examples](https://github.com/stevegrunwell/php-cli-examples)

Note:

Now that we have a foundation, let's get into writing our own commands!

Sample repo available with these examples and more!

----

### A simple greeter

```php [|4|6]
#!/usr/bin/env php
<?php

$name = $argv[1] ?? 'there';

printf("Hello, %s!\n", $name);
```
<!-- .element: class="hide-line-numbers" -->

Note:

Let's start with a bare-bones greeter script:

* First we'll grab the first argument and, if not present, fall back to "there"
* Then `printf()` "hello, $name"

----

```cli
$ php hello.php Ben
Hello, Ben!
```

```cli
$ php hello.php
Hello, there!
```
<!-- .element: class="fragment" -->

Note:

In practice, our script works like this:

Calling the script with "Ben" as an argument makes it say "Hello, Ben!"

No argument means it falls back to "Hello, there!"

----

### Accepting Options

```php [|8-10|11|12|14]
#!/usr/bin/env php
#
# USAGE:
#
#     hello.php [-g|--greeting=<greeting>] <name>
<?php

$opts = getopt('g:', [
    'greeting:',
], $index);
$greeting = $opts['greeting'] ?? $opts['g'] ?? 'Hello';
$name = $argv[$index] ?? 'there';

printf("%s, %s!\n", $greeting, $name);
```
<!-- .element: class="hide-line-numbers" -->

Note:

Let's take our script from earlier and let a custom greeting be passed via either `-g` or `--greeting`.

* The `getopt()` function parses the given options out of `$argv`
    * `g:` means `-g` with a value
    * `greeting` means `--greeting`, also with a value
    * The third argument is a variable that will be set by reference and tell you where `getopt()` stopped parsing options
* Since we're accepting `--greeting` and `-g`, one should take precedence if both are present
    * In this case, our greeting will be `--greeting` if present, otherwise `-g`. If no greeting is passed, default to "hello"
* The arguments come after any options, so we'll take advantage of `$index` to determine where the actual name is passed
    * If we can't find one, default to "there"
* Finally, print the greeting along with the name:

----

```cli
$ php hello.php --greeting="Salutations" Dylan
Salutations, Dylan!
```

```cli
$ php hello.php -g="Salutations" Dylan
Salutations, Dylan!
```
<!-- .element: class="fragment" -->

Note:

Running the new version, we can pass `--greeting` or `-g` with an equal sign. If both are present, we'll favor `--greeting`

However, the format can be rather restrictive:

* All options must come before arguments
* Messing up the $rest_index (third arg of `getopt()`, set by reference) means that option keys can easily slip in as values
* No validation, so you have to handle that yourself

----

### We can do better than `getopt()`!

!["Exit 12 offramp" meme, with a car labeled "PHP Developers" swerving hard away from "using getopt()" onto the "literally anything else" offramp](resources/exit-12.jpg)

Note:

Honestly, `getopt()` is a pain to work with and, as a result, a pain to use scripts that use it.

In a minute, we'll take a look at some libraries and frameworks we can use to make handling all of these things easier

----

### Performing system operations

<ul>
    <li class="fragment">
        PHP has built-in functions for things like <a href="https://www.php.net/manual/en/function.chmod.php"><code>chmod()</code></a>, <a href="https://www.php.net/manual/en/function.mkdir.php"><code>mkdir()</code></a>, etc.
        <ul>
            <li>Even more with <a href="https://flysystem.thephpleague.com">Flysystem</a></li>
        </ul>
    </li>
    <li class="fragment">Can also execute arbitrary system commands!</li>
</ul>

Note:

When writing CLI scripts, it's not uncommon to need to do something on the filesystem.

* PHP has built-in functions for things like `chmod()`, `mkdir()`, and other common Unix operations
    * If you're using Flysystem, there are even more options for filesystem manipulation
* PHP can also execute arbitrary system commands:

----

### Calling other scripts

<dl>
    <dt class="fragment" data-fragment-index="0"><a href="https://www.php.net/manual/en/function.exec.php"><code>exec()</code></a><dt>
    <dd class="fragment" data-fragment-index="0">Execute, return the <u>last line</u> of output</dd>
    <dd class="fragment" data-fragment-index="0">Can capture full output as array, exit code</dd>
    <dt class="fragment" data-fragment-index="1"><a href="https://www.php.net/manual/en/function.shell-exec.php"><code>shell_exec()</code></a></dt>
    <dd class="fragment" data-fragment-index="1">Execute, return the <u>full output</u> as string</dd>
</dl>

Note:

The most common ways you'll see PHP call other scripts

* `exec()` lets us execute a command and capture both the exit code and each line of output into an array
* `shell_exec()` will return the full output as a string
    * No exit code, but perhaps the easiest way to call another script
    * The same as wrapping the command in backticks

----

### Calling other scripts

<dl>
    <dt class="fragment" data-fragment-index="0"><a href="https://www.php.net/manual/en/function.system.php"><code>system()</code></a></dt>
    <dd class="fragment" data-fragment-index="0">Returns last line of output</dd>
    <dd class="fragment" data-fragment-index="0">Flushes buffer as it goes</dd>
    <dt class="fragment" data-fragment-index="1"><a href="https://www.php.net/manual/en/function.passthru.php"><code>passthru()</code></a></dt>
    <dd class="fragment" data-fragment-index="1">Best choice for binary files</dd>
</dl>

Note:

* `system()`
    * Works the same as its C equivalent
    * Will attempt to flush the output buffer as it goes, but only returns the last line
        * Can also capture the exit code to a variable by reference
* `passthru()` doesn't attempt to transform the output, so this is really useful when working within binary files like images, video, etc.
    * Link in slides' README explaining how I used it to generate animated thumbnails for gifs

----

<!-- .slide: data-background-image="resources/spidey-sense.png" data-background-position="left bottom" data-background-size="contain" data-hide-footer -->

Note:

If the thought of executing arbitrary system commands sets off your security sense: congratulations, your instincts are dead-on!

If we're going to call other system commands, we need to make sure that we're properly escaping everything, _especially_ if there's any user-provided input!

----

### Escaping commands & arguments

<dl>
    <dt class="fragment" data-fragment-index="0"><a href="https://php.net/manual/en/function.escapeshellcmd.php"><code>escapeshellcmd()</code></a></dt>
    <dd class="fragment" data-fragment-index="0">Escape an entire command</dd>
    <dt class="fragment" data-fragment-index="1"><a href="https://php.net/manual/en/function.escapeshellarg.php"><code>escapeshellarg()</code></a></dt>
    <dd class="fragment" data-fragment-index="1">Escape an individual argument</dd>
</dl>

Note:

There are two major functions you should be aware of:

1. `escapeshellcmd()` escapes any meta-characters that could be used to chain other commands
2. `escapeshellarg()` escapes individual arguments and options and should *always* be used with user data

----

### Without escaping

```php
$name = 'Larry && rm -rf /';

# Uh oh, $name isn't being escaped!
exec('greet-user ' . $name);
```

```text
# You're about to have a very bad day...
Hello, Larry!
```
<!-- .element: class="fragment" -->

Note:

For example, imagine we have a greet-user script, which accepts a name (maybe from a database or user input) and spits out "Hello, $name!"

If the `$name` is coming from an untrusted source (like $_POST data), we could easily inject and execute arbitrary commands on our system! 😬

----

### With proper escaping

```php
$name = 'Larry && rm -rf /';

# Escape the argument with escapeshellarg()
exec('greet-user ' . escapeshellarg($name));
```

```text
# Weird name, but no harm done
Hello, Larry && rm -rf /!
```
<!-- .element: class="fragment" -->

Note:

Same as before, but wrapping `$name` in `escapeshellarg()`

The ampersands are escaped, so this just looks like a really weird name (but doesn't hose our system)

---

## Libraries & Frameworks

Note:

With the fundamentals out of the way, we can start looking at some of the available libraries and frameworks to make writing PHP for the CLI way nicer

----

### [Symfony Console](https://symfony.com/doc/current/components/console.html)

* <!-- .element: class="fragment" --> CLI framework of choice
* <!-- .element: class="fragment" --> Handlers for input & output
* <!-- .element: class="fragment" --> Built-in help screen, validation
* <!-- .element: class="fragment" --> Born to be tested

Note:

Component from the Symfony framework

* De facto tool for writing PHP CLI scripts
    * Powers Artisan, Composer, Behat, and more
* Ships with methods for all sorts of input and output handling
* Commands allow you to register accepted arguments and options, including validation
    * Will then generate a help screen automatically
* Designed from the ground-up to be easily tested
    * Also integrates well with other Symfony components

----

#### Building a Symfony Console Command

```php [|1|3,6|4,7-9]
namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;

#[AsCommand(name: 'app:create-user')]
class CreateUserCommand extends Command
{
    // ...
```
<!-- .element: class="hide-line-numbers" -->

Note:

Each Symfony Console command is its own class, which extends `Symfony\Component\Console\Command\Command`

1. First, define our namespace (we'll just use `App\Command`)
2. Set the command name (app:create-user) using the AsCommand attribute
    * Newer feature, can also be set in `configure()` method
4. Construct the class, extending that base Command

----

#### Configuring the command

```php
protected function configure(): void
{
    $this->setDescription('Creates a new user.')
        ->setHelp(/* Full help text goes here... */)
        ->addArgument(/* ... */)
        ->addOption(/* ... */);
}
```

Note:

* The `configure()` method lets us set things like the description, help text, and define any arguments and/or options our command might take.
    * Inputs can be specified as required or optional, be configured to support multiple values, and even given defaults.
    * If we didn't use the `AsCommand` attribute, we could set the command name here

----

#### The execute() method

```php [1-7,11|10]
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

protected function execute(
    InputInterface $input,
    OutputInterface $output
): int {
    // Do something in here!

    return Command::SUCCESS;
}
```
<!-- .element: class="hide-line-numbers" -->

Note:

* The main entry point for your command is the `execute()` method.
* Receives implementations of the `InputInterface` and `OutputInterface` interfaces
    * Input lets us retrieve arguments and options
    * Output lets is write to the console, and includes ways to color output, format in different ways, and more
* Method returns an exit code
    * Three exit code constants available on Command class: `Command::SUCCESS` (0), `Command::ERROR` (1), `Command::INVALID` (2)

----

#### Arguments + options

```php [1|3-5|7]
$user = new User($input->getArgument('email'));

if ($input->getOption('admin')) {
    $user->makeAdmin();
}

$user->save();
```
<!-- .element: class="hide-line-numbers" -->

Note:

Within `execute()`, we can create our new user.

* Let's say our `User` model accepts an email address in its constructor:
    * We can retrieve this via `$input->getArgument('email')` because we registered it in `configure()`
    * If this argument has been marked required, Symfony will have already thrown an error before getting to this point
* If the `--admin` option is present, we might call `$user->makeAdmin()`
* Finally, call `$user->save()` to persist our model to the database

----

#### Bootstrap our command(s)

```php [|7-9|6,10|11]
#!/usr/bin/env php
<?php

require __DIR__ . '/vendor/autoload.php';

use App\Command\CreateUserCommand;
use Symfony\Component\Console\Application;

$app = new Application();
$app->add(CreateUserCommand());
$app->run();
```
<!-- .element: class="hide-line-numbers" -->

Note:

A Symfony command by itself doesn't do much, it needs to be registered within a Symfony console application.

Think of this like a video game console: the app is our Nintendo/Xbox/Playstation, while each command is a game in our library.

This is essentially what the main Composer and Artisan files look like:

* Create a new application
* Register our `CreateUserCommand`
* Call `run()`

----

#### Calling our command

```cli [1|3-4|6-7]
$ php console.php app:create-user beth@example.com --admin

# If we've made console.php executable
$ console.php app:create-user andy@example.com

# Produce the help documentation
$ php console.php app:create-user --help
```
<!-- .element: class="hide-line-numbers" -->

Note:

Assuming we've named our bootstrap file "console.php", we can now call our new command in a few ways:

1. We can pass the filename to the PHP binary, and create a User for Beth with admin privileges
2. If we've made console.php executable, we can just call console.php directly
3. We can add the `--help` option, which will automatically generate help docs for us

----

### [PHP-CLI Tools](https://github.com/wp-cli/php-cli-tools)

* <!-- .element: class="fragment" --> Maintained by the WP-CLI team
* <!-- .element: class="fragment" --> Simplify input + output
    * Prompts, menus, and more
    * Output formatting: tables, trees,<br>progress bars, and more!

Note:

* Library full of helper functions maintained by the WP-CLI team
* Functions to handle input + output:
    * Prompt users for data or present menus of options
    * Formatters for coloring text, plus more advanced formats like tables or trees
    * Includes progress indicators

----

#### PHP-CLI Tools

```php [|6|7-8|10-12]
#!/usr/bin/env php
<?php

require_once __DIR__ . '/vendor/autoload.php';

$limit  = cli\prompt('How high should I count?', 10);
$loud   = cli\choose('Shall I shout it');
$suffix = $loud === 'y' ? '!' : '.';

for ($i = 1; $i <= $limit; $i++) {
	cli\line($i . $suffix);
}
```
<!-- .element: class="hide-line-numbers" -->

Note:

An example program using PHP-CLI tools:

* Ask how high we should count (with a default of 10)
* Prompt "shall I shout it?", which accepts y or n (yes or no)
    * Depending on the value, assign either an exclamation mark or period
* Then, from 1 until we reach the value of $limit, print out the number with the given suffix

----

####  PHP-CLI Tools

```cli [1|2|3|4-9]
$ php Counter.php
How high should I count? [10]: 5
Shall I shout it? [y/N]y
1!
2!
3!
4!
5!
```
<!-- .element: class="hide-line-numbers" -->

----

### [CLImate](https://climate.thephpleague.com/) <!-- .element: style="text-transform: none;" -->

* <!-- .element: class="fragment" --> The League of Extraordinary Packages
* <!-- .element: class="fragment" --> More focused on output
    * Progress bars, borders, JSON, and more
* <!-- .element: class="fragment" --> Includes helpers for ASCII art and animations!
!["Oh Hello" as animated ASCII art, rising from the bottom of the screen](resources/climate-animation.gif) <!-- .element: class="seamless" -->

Note:

* Maintained by The League of Extraordinary Packages
* More output options than PHP-CLI Tools
    * Includes some experimental inputs, including radio buttons and check-boxes
* Favorite feature: support for animations and ASCII art

---

## CLI Best Practices

Note:

As we wrap up, I'd like to share a few pieces of advice as you enter the world of building for the PHP CLI

----

### Check Your Assumptions

* <!-- .element: class="fragment" --> Check that commands exist before using them
* <!-- .element: class="fragment" --> Don't hard-code system paths

Note:

Everybody's machine is different, and you don't want your script to fail because someone has a different implementation of grep.

If you remember from the shebang, we use `/usr/bin/env` to get the path to the PHP binary from the environment. Even on the same platform, different versions or installation methods may install to different spots.

Good example: the location of where Homebrew installs things varies between Apple Silicon and Intel chips

----

### Rule of Silence

> Developers should design programs so that they do not print unnecessary output. This rule aims to allow other programs and developers to pick out the information they need from a program's output without having to parse verbosity.

<cite>Eric S. Raymond, [*The Art of Unix Programming*](https://en.wikipedia.org/wiki/The_Art_of_Unix_Programming)</cite>

Note:

The amount of output will vary depending on the purpose of your script: some scripts give little to no feedback, while others just barf all over the console. The trick is to get your default output level _just right_.

* A major platform migration might call for very detailed output
* A maintenance script may only need to print something if there was an error.

----

```cli [1-3|5-6|8-12]
# Default behavior
$ some-command
Command completed successfully!

# Only produce output if something went wrong
$ some-command --quiet

# Be more verbose
$ some-command --verbose
Reindexing database...OK
Reticulating splines...OK
Command completed successfully!
```
<!-- .element: class="hide-line-numbers" -->

Note:

Know your audience, and only print the bare minimum by default. Use options like --verbose for when users need more.

----

### Garbage Collection

* <!-- .element: class="fragment" --> Clean up objects when you're done
* <!-- .element: class="fragment" --> Be judicious with caching
* <!-- .element: class="fragment" --> Watch for ballooning objects & arrays!

Note:

Not something we normally need to think about in PHP

The garbage collector frees up memory that was previously allocated but no longer needed. This is normally handled by PHP automatically @ end of request

Big difference between a 2s request and a 24hr command execution:

* Help the garbage collector by explicitly unsetting variables
    * Done with an object? Call `unset()` to hint to the gc that this can be cleaned
* Cache everything you can...
* But be aware that if (for example) you're tracking the results of each record changed these arrays can get **huge**
    * Determine a reasonable batch size and reset things once you reach that number
    * Maybe write out details to a log file, then reset the array

----

### Ignore Web Requests

If your commands live within the web root, prevent them from being run outside the CLI!

```php
// Only allow this script to run on the CLI!
if (PHP_SAPI !== 'cli') {
    exit;
}
```

Note:

Modern frameworks keep most app code out of the web root, but if you're writing commands that will live under the web root **be sure that they can't be executed by a web request!**

Exit code doesn't really matter here, you just don't want it to run.

----

### Swanson on Commands

![Ron Swanson (Nick Offerman) advising "Never half-ass two things. Whole-ass one thing."](resources/whole-ass.gif)

Note:

A common mistake is trying to build a single CLI command that can do it all.

Remember composability: build small, single-purpose commands and then use those to compose sophisiticated pipelines

---

<!-- .slide: class="thank-you" data-hide-footer -->

## Thank You!

Steve Grunwell <!-- .element: class="byline" -->
<span class="role">Staff Software Engineer, Mailchimp</span>

[@stevegrunwell@phpc.social](https://phpc.social/@stevegrunwell)
[stevegrunwell.com/slides/php-cli](https://stevegrunwell.com/slides/php-cli)
[github.com/stevegrunwell/php-cli-examples](https://github.com/stevegrunwell/php-cli-examples)
<!-- .element: class="slides-link" -->

Note:

REMEMBER TO REPEAT THE QUESTION!!
