import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from './plugins/font-awesome'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import Card from 'primevue/card'
import FileUpload from 'primevue/fileupload'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Toast from 'primevue/toast'

import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(PrimeVue)
app.use(ToastService)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('PCard', Card)
app.component('PFileUpload', FileUpload)
app.component('PTabView', TabView)
app.component('PTabPanel', TabPanel)
app.component('PToast', Toast)

app.mount('#app')
