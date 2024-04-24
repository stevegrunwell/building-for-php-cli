# Building for the PHP Command Line Interface

Executing PHP from the command line enables us to interact with our applications in new and interesting ways: from performing site maintenance to scaffolding new projects, CLI tools like [WP-CLI](http://wp-cli.org/), [Artisan](https://laravel.com/docs/5.1/artisan), and [Drush](http://www.drush.org/en/master/) make it easy to interface with our code without ever opening a browser.

Attendees will be introduced to popular PHP CLI tools and their default capabilities. We'll discuss characteristics of good CLI scripts, strong use-cases for writing custom commands, then write several CLI programs across different platforms.

:sparkles: **[View slides](https://stevegrunwell.github.io/building-for-php-cli)** :sparkles:

This presentation also has [a companion repository, full of executable examples from this presentation](https://github.com/stevegrunwell/php-cli-examples).

### Demonstrated Tools

* [Symfony Console Component](http://symfony.com/doc/current/components/console/introduction.html)
* [PHP-CLI Tools](https://github.com/wp-cli/php-cli-tools)
* [CLImate](https://climate.thephpleague.com/)

### Platform-specific CLI tools

* [WP-CLI](https://wp-cli.org)
* [Laravel Artisan](https://laravel.com/docs/master/artisan)
* [Drush](https://www.drush.org)
* [Joomlatools Console](https://www.joomlatools.com/developer/tools/console)

### Additional Resources

* [Building PHP Daemons and Long Running Processes](https://prezi.com/pymsnzwlieqt/building-php-daemons-and-long-running-processes-tek15/) - Talk from php[tek] 2015 by [Tim Lytle](http://timlytle.net)
* [Writing WP-CLI Commands That Work!](https://stevegrunwell.com/slides/wp-cli) - Sister talk focused on writing WP-CLI commands
* [What are Exit Codes in Linux?](https://itsfoss.com/linux-exit-codes/) - Explanation of standard exit codes and their meanings
* [Understanding Exit Codes and How to Use Them in Bash Scripts](http://bencane.com/2014/09/02/understanding-exit-codes-and-how-to-use-them-in-bash-scripts/) - Article by Benjamin Cane
* [Flysystem](https://flysystem.thephpleague.com) - Popular package for filesystem operations across environments
* [Cropping and Resizing Animated Gifs with Gifsicle](https://stevegrunwell.com/blog/cropping-resizing-gifsicle/) - Blog post explaining how to create animated thumbnails for gifs, which relies on calling [Gifsicle](https://www.lcdf.org/gifsicle/) via [`passthru()`](https://www.php.net/manual/en/function.passthru.php)

## Presentation History

* [php[tek] 2024](https://tek.phparch.com) — April 24, 2024 ([Joind.in](https://joind.in/event/phptek-2024/building-for-the-php-command-line-interface), [PDF](https://github.com/stevegrunwell/building-for-php-cli/releases/download/phptek-2024/slides.pdf))
* [Midwest PHP 2019](https://2019.midwestphp.org/) — March 8, 2019 ([Joind.in](https://joind.in/talk/b9a05), [PDF](https://github.com/stevegrunwell/building-for-php-cli/releases/download/midwest-php/slides.pdf))
* [WavePHP 2018](https://wavephp.com/) — September 20, 2018 ([Joind.in](https://joind.in/talk/6908c), [PDF](https://github.com/stevegrunwell/building-for-php-cli/releases/download/wavephp-2018/slides.pdf))
* [Southeast PHP](https://southeastphp.com/) - August 17, 2018 ([Joind.in](https://joind.in/talk/ed2e4), [PDF](https://github.com/stevegrunwell/building-for-php-cli/releases/download/southeastphp-2018/slides.pdf))
* [PHPDetroit](https://phpdetroit.io/) - July 28, 2018 ([Joind.in](https://joind.in/talk/e6d00), [PDF](https://github.com/stevegrunwell/building-for-php-cli/releases/download/phpdetroit-2018/slides.pdf))
* [php[tek] 2018](https://tek18.phparch.com/speakers/steve-grunwell/) - May 31, 2018 ([Joind.in](https://joind.in/talk/c6025), [PDF](https://github.com/stevegrunwell/building-for-php-cli/releases/download/phptek-2018/slides.pdf))
* [Music City Code 2017](https://www.musiccitycode.com/) - June 3, 2017
* [CodeMash 2017](http://www.codemash.org/) - January 13, 2017
* [Nomad PHP (EU)](https://nomadphp.com/nomadphp-2016-12-eu/) – December 15, 2016 ([Joind.in](https://joind.in/talk/dce28))
* [php[tek] 2016](https://tek16.phparch.com/speakers/#66432) – May 27, 2016 ([Joind.in](https://joind.in/talk/ce9a4))
* [Columbus PHP Meetup](http://www.meetup.com/phpphp/events/229434721/) – April 13, 2016 ([Joind.in](https://joind.in/talk/e9465))
