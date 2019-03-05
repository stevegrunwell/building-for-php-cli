### Environment Variables

```sh
$ API_KEY=abc123 php my-script.php

API Key: abc123
```
<!-- .element: class="fragment" -->

```sh
$ php my-script.php xyz789

API Key: xyz789
```
<!-- .element: class="fragment" -->

```sh
$ API_KEY=abc123 php my-script.php xyz789

API Key: abc123
```
<!-- .element: class="fragment" -->

Note:

Since the script was checking for the environment variable first, that will take precedence when the script is run.
