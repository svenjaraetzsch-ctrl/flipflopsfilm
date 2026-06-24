<template>
  <div class="hamenu valign">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="menu-links">
            <ul class="main-menu rest">
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/')" class="link animsition-link" @click="handleNav(localePath('/'))">
                    <span class="nm">01.</span>{{ $t('nav.home') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/services')" class="link animsition-link" @click="handleNav(localePath('/services'))">
                    <span class="nm">02.</span>{{ $t('nav.services') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/tax-incentives')" class="link animsition-link" @click="handleNav(localePath('/tax-incentives'))">
                    <span class="nm">03.</span>{{ $t('nav.tax_incentives') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/locations')" class="link animsition-link" @click="handleNav(localePath('/locations'))">
                    <span class="nm">04.</span>{{ $t('nav.locations') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/about')" class="link animsition-link" @click="handleNav(localePath('/about'))">
                    <span class="nm">05.</span>{{ $t('nav.about') }}
                  </NuxtLink>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-4 valign">
          <div class="cont-info">
            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">{{ $t('menu.our_offices') }}</h6>
              <p class="fw-400 fz-18">{{ $t('menu.offices') }}</p>
            </div>

            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">{{ $t('menu.contact') }}</h6>
              <p class="fw-400 fz-18">
                <a
                  href="mailto:info@flipflopsfilm.com"
                  style="color: inherit; pointer-events: auto; position: relative; z-index: 9999;"
                >info@flipflopsfilm.com</a>
              </p>
            </div>

            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">{{ $t('menu.socials') }}</h6>
              <ul class="rest social-text d-flex fz-13">
                <li class="mr-20">
                  <a href="https://www.instagram.com/flipflopsfilm/" target="_blank" rel="noopener noreferrer" style="pointer-events: auto; position: relative; z-index: 9999;">
                    <span>Instagram</span>
                  </a>
                </li>
                <li class="mr-20">
                  <a href="https://www.linkedin.com/posts/david-turpin-production_producciones-audiovisuales-canarias-flip-activity-7301559594177200130-EhoR" target="_blank" rel="noopener noreferrer" style="pointer-events: auto; position: relative; z-index: 9999;">
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>

            <div class="bottom">
              <CommonLangSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
const route = useRoute()

const closeMenu = () => {
  document.querySelector('.hamenu').classList.remove('open')
  document.querySelector('.topnav').classList.remove('navlit')
  document.querySelector('.topnav .menu-icon').classList.remove('open')
}

const handleNav = (targetPath) => {
  closeMenu()
  if (route.path === targetPath) {
    window.location.reload()
  }
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
</script>
