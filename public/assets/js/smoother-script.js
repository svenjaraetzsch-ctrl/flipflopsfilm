(function () {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const isDesktop = window.innerWidth > 991;

  if (isDesktop) {
    ScrollTrigger.normalizeScroll(true);
  }

  ScrollSmoother.create({
    smooth: isDesktop ? 2 : 0,
    effects: isDesktop,
    normalizeScroll: false,
  });

})()
