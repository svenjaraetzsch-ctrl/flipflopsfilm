(function () {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  ScrollTrigger.normalizeScroll(true);

  ScrollSmoother.create({
    smooth: window.innerWidth > 991 ? 2 : 1,
    effects: true,
    normalizeScroll: true,
  });

})()
