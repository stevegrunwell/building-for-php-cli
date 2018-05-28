### Types of input

[Positional] Arguments<!-- .element: class="fragment" data-fragment-index="0" -->

```
$ my-command foo bar
```
<!-- .element: class="fragment" data-fragment-index="0" -->

Options ("associative args")<!-- .element: class="fragment" data-fragment-index="1" -->

```
$ my-command -n=100 --type foo --verbose
```
<!-- .element: class="fragment" data-fragment-index="1" -->

Note:

* Arguments (a.k.a. "associative arguments")
* Options (sometimes called "associative arguments") have one or two dashes before them
    - Act as either key:value pairs or as flags (e.g. --verbose)
