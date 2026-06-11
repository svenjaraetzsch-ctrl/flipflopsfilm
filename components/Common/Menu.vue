<template>
  <div class="hamenu valign">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="menu-links">
            <ul class="main-menu rest">
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/" class="link animsition-link" @click="closeMenu">
                    <span class="nm">01.</span>Home
                  </a>
                </div>
                <!--
                <div class="sub-menu">
                  <ul class="rest">
                    <li>
                      <div class="o-hidden">
                        <span class="sub-link back" @click="handleCloseDMenu">
                          <i class="pe-7s-angle-left"></i> Go Back
                        </span>
                      </div>
                    </li>
                  </ul>

                  <ul class="rest">
                    <li>
                      <div class="o-hidden">
                        <a href="/" class="sub-link animsition-link" @click="closeMenu">
                          Flip Flops Film
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
                -->
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/services" class="link animsition-link" @click="closeMenu">
                    <span class="nm">02.</span>Services
                  </a>
                </div>
              </li>

              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/tax-incentives" class="link animsition-link" @click="closeMenu">
                    <span class="nm">03.</span>Tax Incentives
                  </a>
                </div>
              </li>

              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/locations" class="link animsition-link" @click="closeMenu">
                    <span class="nm">04.</span>Locations
                  </a>
                </div>
              </li>

              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <a href="/about" class="link animsition-link" @click="closeMenu">
                    <span class="nm">05.</span>About
                  </a>
                </div>
              </li>

              
            </ul>
          </div>
        </div>

        <div class="col-lg-4 valign">
          <div class="cont-info">
            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">Our Offices</h6>
              <p class="fw-400 fz-18">
                Canary Islands · Madrid · Almería · Bilbao
              </p>
            </div>

            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">Contact</h6>
              <p class="fw-400 fz-18">
                <a
                  href="mailto:info@flipflopsfilm.com"
                  style="color: inherit; pointer-events: auto; position: relative; z-index: 9999;"
                >
                  info@flipflopsfilm.com
                </a>
              </p>
            </div>

            <div class="bottom">
              <h6 class="text-u fw-600 mb-20">Follow Us</h6>
              <ul class="rest social-text d-flex fz-13">
                <li class="mr-20">
                  <a
                    href="https://www.instagram.com/flipflopsfilm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="pointer-events: auto; position: relative; z-index: 9999;"
                  >
                    <span>Instagram</span>
                  </a>
                </li>

                <li class="mr-20">
                  <a
                    href="https://www.linkedin.com/posts/david-turpin-production_producciones-audiovisuales-canarias-flip-activity-7301559594177200130-EhoR"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="pointer-events: auto; position: relative; z-index: 9999;"
                  >
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const closeMenu = () => {
  document.querySelector('.hamenu').classList.remove('open')
}

const handleMouseEnter = (event) => {
  Object.values(event.currentTarget.parentElement.children).forEach(
    el => el.style.opacity = '0.5'
  )
  event.currentTarget.style.opacity = '1'
}

const handleMouseLeave = (event) => {
  Object.values(event.currentTarget.parentElement.children).forEach(
    el => el.style.opacity = '1'
  )
}

const handleOpenDMenu = (event) => {
  document.querySelector('.main-menu').classList.add('gosub')
  event.currentTarget.parentElement.parentElement
    .querySelector('.sub-menu')
    .classList.add('sub-open')
}

const handleCloseDMenu = () => {
  document.querySelector('.main-menu').classList.remove('gosub')
  document.querySelector('.main-menu .sub-menu').classList.remove('sub-open')
}
</script>