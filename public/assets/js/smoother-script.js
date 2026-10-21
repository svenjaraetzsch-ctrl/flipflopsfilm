(function () {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  var isDesktop = window.innerWidth > 991;

  if (isDesktop) {
    ScrollTrigger.normalizeScroll(true);
    var smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: false,
    });
    // No scrolling while the intro loader covers the page; Loader.vue lets go
    // once it has gone. (Phones have no smoother: globals.css locks them.)
    var loader = document.querySelector('.loader-wrap');
    if (loader && !loader.classList.contains('is-done')) smoother.paused(true);
  }

})()
