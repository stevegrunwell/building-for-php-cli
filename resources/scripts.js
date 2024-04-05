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
