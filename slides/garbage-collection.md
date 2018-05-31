### Garbage Collection

* <!-- .element: class="fragment" --> Clean up objects when you're done <!-- .element: class="fragment" -->
* <!-- .element: class="fragment" --> Be judicious with caching
* <!-- .element: class="fragment" --> Watch for ballooning objects & arrays!

Note:

* Garbage collector frees up memory that was previously allocated but no longer needed.
* PHP normally handles this automatically @ end of request
* Help the garbage collector by explicitly unsetting variables
* Cache in variables when appropriate, but be aware the size can balloon
