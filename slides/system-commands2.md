#### Executing System Commands

<dl>
	<dt class="fragment" data-fragment-index="0"><code>exec()</code></dt>
	<dd class="fragment" data-fragment-index="0">Returns the <u>last line</u> of output as a string.</dd>
	<dt class="fragment" data-fragment-index="1"><code>shell_exec()</code></dt>
	<dd class="fragment" data-fragment-index="1">Returns <u>full</u> output as a string.</dd>
	<dd class="fragment" data-fragment-index="2">Same as backtick operator:
		<pre><code class="lang-php">\`ls -al` === shell_exec('ls -al')</code></pre>
	</dd>
</dl>


Note:

If you require multiple lines of output, use shell_exec()
