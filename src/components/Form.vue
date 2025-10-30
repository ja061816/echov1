<template>
    <v-container class="flex-grow-1 d-flex flex-column justify-between" style="height: 92vh;">
        <v-form ref="form" @submit.prevent="submit">
            <v-text-field
                hint="Firstname Middle Initial, Lastname Ext.(if any)"
                persistent-hint
                label="* Fullname"
                v-model="fullname"
                variant="solo"
                :rules="rules"
                density="compact"
                class="mb-4"
            ></v-text-field>

            <v-select
                :items="barangays"
                density="compact"
                v-model="brgy"
                variant="solo"
                :rules="rules"
                label="* Barangay"
                class="mb-4"
            ></v-select>

            <v-mask-input
                placeholder="YYYY-MM-DD"
                persistent-hint
                label="* Birthday"
                v-model="bday"
                variant="solo"
                :rules="rules2"
                density="compact"
                class="mb-4"
                mask="####-##-##"
            ></v-mask-input>

            <v-select
                :items="ids"
                item-title="type"
                density="compact"
                v-model="selectedID"
                variant="solo"
                :rules="rules"
                label="* ID"
                class="mb-4"
                return-object
                single-line
            ></v-select>

            <v-text-field
                hint=""
                persistent-hint
                label="* ID Number"
                v-model="idNum"
                variant="solo"
                :rules="rules"
                density="compact"
                class="mb-4"
            ></v-text-field>

            <v-text-field
                hint=""
                persistent-hint
                label="* Contact Number"
                v-model="contactNum"
                variant="solo"
                :rules="rules3"
                density="compact"
                class="mb-4"
                type="number"
                hide-spin-buttons
                prefix="639"
                counter="9"
            ></v-text-field>

            <v-text-field
                hint=""
                persistent-hint
                label="* Contact Person"
                v-model="contactPerson"
                variant="solo"
                :rules="rules"
                density="compact"
                class="mb-4"
            ></v-text-field>

            <!-- <v-mask-input variant="solo" density="compact" mask="####-##-##"></v-mask-input> -->

            <v-btn class="mt-2" type="submit" block color="success">Submit</v-btn>
        </v-form>
    </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useDataStore } from '@/stores/dataStore'
  import { getFirestore, collection, addDoc } from "firebase/firestore"
  import { useCollection } from "vuefire"
  import { firebaseApp } from "@/main"

  const dba = getFirestore(firebaseApp);
  const assistance = useCollection(collection(dba, "assistance"));

  const dataStore = useDataStore()
  const form = ref(null)
  const fullname = ref('')
  const brgy = ref('')
  const bday = ref('')
  const selectedID = ref(null)
  const idNum = ref('')
  const contactNum = ref('')
  const contactPerson = ref('')

  const barangays = ['Barangay 1', 'Barangay 2', 'Barangay 3', 'Barangay 4']
  const ids = [
    {
        'type' : "National ID",
        'format' : '####-####-####-####'
    },
    {
        'type' : "Driver's License",
        'format' : '####-######-####'
    },
    {
        'type' : "Voter's ID",
        'format' : '####-######-####'
    },
    {
        'type' : "UMID",
        'format' : '####-#######-#'
    },
  ]

  const rules = [
    value => {
      if (value) return true
      return 'Required'
    },
  ]

  const rules2 = [
    value => !!value || 'Required',
    value => (value && value.length >= 8) || 'Incomplete',
  ];

  const rules3 = [
    value => !!value || 'Required',
    value => (value && value.length <= 9) || 'Must be 9 digits only',
    value => (value && value.length >= 9) || 'Must be 9 digits long',
  ]

  const submit = async () => {
    // Ensure the form is valid before proceeding
    const isValid = await form.value.validate();
    
    if (isValid.valid) {
        const newItem = {
            name: fullname.value,
            brgy: brgy.value,
            // bday: bday.value,
            bday: `${bday.value.slice(0, 4)}-${bday.value.slice(4, 6)}-${bday.value.slice(6, 8)}`,
            presentedID: selectedID.value?.type,
            presentedIDnum: idNum.value,
            contactNum: '639' + contactNum.value,
            contactPerson: contactPerson.value,
        };
    
        await addDoc(collection(dba, "assistance"), newItem);
        
        resetForm()
        resetValidation()
    } else {
        console.log('Form is invalid, please fill all required fields.');
    }
  };

  const resetForm = () => {
    fullname.value = ''
    brgy.value = ''
    bday.value = ''
    selectedID.value
    selectedID.value = null
    idNum.value = ''
    contactNum.value = ''
    contactPerson.value = ''
  };

  const resetValidation = () => {
    form.value.reset()
  }

</script>

<style lang="scss" scoped>
</style>
