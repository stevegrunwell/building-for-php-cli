/**
 * Custom scripting for Reveal.js
 */

/**
 * Construct a persistent footer.
 *
 * This is largely based on the reveal.js-titlebar package:
 * @link https://www.npmjs.com/package/reveal.js-titlebar
 */
const footer = document.createElement('footer');
footer.classList.add('presentation-footer');
footer.innerHTML = '<a href="https://phpc.social/@stevegrunwell">phpc.social/@stevegrunwell</a> - <a href="https://stevegrunwell.com/slides/php-cli">stevegrunwell.com/slides/php-cli</a>';
footer.setAttribute('hidden', true);
document.getElementsByClassName('reveal')[0].appendChild(footer);

/**
 * When changing to a slide with data-hide-footer, hide the presentation footer.
 *
 * @param Event event The Reveal event object.
 *
 * @return void
 */
const toggleFooter = e => {
    if (e.currentSlide.dataset.hasOwnProperty('hideFooter')) {
        footer.setAttribute('hidden', true);
    } else {
        footer.removeAttribute('hidden');
    }
}

// Never show the footer in frame embeds
if (window.self === window.top) {
    Reveal.on('ready', toggleFooter);
    Reveal.on('slidechanged', toggleFooter);
}

/**
 * Inject our custom highlight.js language (cli).
 *
 * This relies on the window.options variable defined in {@see reveal-md/lib/template/reveal.html}.
 */
if (typeof window.options !== undefined) {
    window.options.highlight.beforeHighlight = (hljs) => hljs.registerLanguage('cli', (hljs) => {
        return {
            name: 'CLI',
            case_insensitive: true,
            contains: [
                hljs.HASH_COMMENT_MODE,
                hljs.QUOTE_STRING_MODE,
                // Bash prompt ($ or ~)
                {
                    scope: 'title',
                    match: /^\s*[\$~]\s+/,
                },
                // Boolean operators (&&, ||)
                {
                    scope: 'built_in',
                    match: /(&&|\|\|)/
                },
                // Escape characters at the end of a line
                {
                    scope: 'built_in',
                    match: /\\s*$/,
                },
                // Single pipes, redirection
                {
                    scope: 'built_in',
                    match: /[\|>]/,
                },
                // Command options
                {
                    scope: 'variable',
                    match: /\s-{1,2}[a-z0-9-_]+=?/,
                },
            ],
        };
    });
}
