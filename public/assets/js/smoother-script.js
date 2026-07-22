(function () {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  var isDesktop = window.innerWidth > 991;

  if (isDesktop) {
    ScrollTrigger.normalizeScroll(true);
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: false,
    });
  }

})()
