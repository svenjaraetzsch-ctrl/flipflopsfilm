<template>
  <div class="hamenu">
    <div class="container h-100 d-flex flex-column">
      <div class="row flex-grow-1">
        <div class="col-lg-8 d-flex flex-column justify-content-center">
          <div class="menu-links">
            <ul class="main-menu rest">
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('index')" class="link animsition-link" @click="handleNav(localePath('index'))">
                    {{ $t('nav.home') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/services')" class="link animsition-link" @click="handleNav(localePath('/services'))">
                    {{ $t('nav.services') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/services/tax-incentives')" class="link animsition-link" @click="handleNav(localePath('/services/tax-incentives'))">
                    {{ $t('nav.tax_incentives') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/services/locations')" class="link animsition-link" @click="handleNav(localePath('/services/locations'))">
                    {{ $t('nav.locations') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/about')" class="link animsition-link" @click="handleNav(localePath('/about'))">
                    {{ $t('nav.about') }}
                  </NuxtLink>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-4 d-none d-lg-flex align-items-center">
          <div class="cont-info">
            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">{{ $t('menu.our_offices') }}</h6>
              <p class="fw-400 fz-18">{{ $t('menu.offices') }}</p>
            </div>

            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">{{ $t('menu.contact') }}</h6>
              <p class="fw-400 fz-18">
                <a href="mailto:info@flipflopsfilm.com" style="color: inherit; pointer-events: auto; position: relative; z-index: 9999;">
                  info@flipflopsfilm.com
                </a>
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
                  <a href="https://www.linkedin.com/company/flip-flops-film-sl" target="_blank" rel="noopener noreferrer" style="pointer-events: auto; position: relative; z-index: 9999;">
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

      <!-- Mobile-only bottom bar -->
      <div class="mobile-bottom d-lg-none">
        <ul class="rest social-text d-flex">
          <li class="mr-20">
            <a href="https://www.instagram.com/flipflopsfilm/" target="_blank" rel="noopener noreferrer" style="pointer-events: auto; position: relative; z-index: 9999;">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/flip-flops-film-sl" target="_blank" rel="noopener noreferrer" style="pointer-events: auto; position: relative; z-index: 9999;">
              LinkedIn
            </a>
          </li>
        </ul>
        <CommonLangSwitcher />
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

<style scoped>
.hamenu {
  display: flex;
  flex-direction: column;
}

.hamenu .container {
  flex: 1;
  padding-top: 100px;
  padding-bottom: 32px;
}

/* Mobile bottom bar: socials + lang side by side */
.mobile-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-bottom .social-text {
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.6;
}

.mobile-bottom :deep(.lang-switcher) {
  font-size: 12px;
  letter-spacing: 1.5px;
  pointer-events: auto;
  position: relative;
  z-index: 9999;
}

.mobile-bottom :deep(.lang-item),
.mobile-bottom :deep(.lang-sep) {
  pointer-events: auto;
  position: relative;
  z-index: 9999;
}
</style>
