import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import wrap from '@vue/web-component-wrapper';
import DeveloperOverlay from './components/DeveloperOverlay.vue';

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

const DeveloperOverlayElement = wrap(Vue, DeveloperOverlay);

window.customElements.define('developer-overlay', DeveloperOverlayElement);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
