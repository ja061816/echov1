import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { VMaskInput } from 'vuetify/labs/VMaskInput'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  components: {
    VMaskInput,
  },
})

export default vuetify


