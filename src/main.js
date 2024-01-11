import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'
import Card from 'primevue/card';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(PrimeVue)
app.use(ToastService)
app.component('PCard', Card)
app.component('PTabView', TabView)
app.component('PTabPanel', TabPanel)
app.component('PToast', Toast)
app.mount('#app')
