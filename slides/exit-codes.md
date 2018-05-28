### Exit codes

* The way we exit scripts is significant:
	* <!-- .element: class="fragment" --> `0` = successful
	* <!-- .element: class="fragment" --> `1` = error
    * <!-- .element: class="fragment" --> `2-255` = special meaning
* <!-- .element: class="fragment" --> Will always use last exit code

Note:

* Opposite of booleans, so think of it as "were there any errors?"
* Values 2-255 have special meanings in *nix
* If no exit code is provided, scripts will exit with the status of the last command run
    - Can lead to undesired results, so always provide an exit code!
