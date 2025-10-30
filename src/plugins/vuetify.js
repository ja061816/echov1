import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { VMaskInput } from 'vuetify/labs/VMaskInput'
import VueTheMask from 'vue-the-mask'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  components: {
    VMaskInput,
    VueTheMask
  },
})

export default vuetify


