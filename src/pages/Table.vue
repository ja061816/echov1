<template>
    <div class="container-fluid">
        <!-- <table class="table" style="overflow-x: scroll;">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Residence</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">ID</th>
                    <th scope="col">ID Number</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Contact Person</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="(item,i) in arr" :key="i">
                    <th scope="row">{{i + 1}}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.bday }}</td>
                    <td>{{ item.brgy }}</td>
                    <td>{{ item.presentedID }}</td>
                    <td>{{ item.presentedIDnum }}</td>
                    <td>{{ item.contactNum }}</td>
                    <td>{{ item.contactPerson }}</td>
                    <td>
                        <v-hover>
                            <template v-slot:default="{ isHovering, props }">
                                <v-icon
                                v-bind="props"
                                :color="isHovering ? 'red' : undefined"
                                @click="test(item)"
                                class="mr-2"
                                >mdi-trash-can-outline</v-icon>
                            </template>
                        </v-hover>
                        <v-hover>
                            <template v-slot:default="{ isHovering, props }">
                                <v-icon
                                v-bind="props"
                                :color="isHovering ? 'green' : undefined"
                                @click="test(item)"
                                >mdi-cloud-print-outline</v-icon>
                            </template>
                        </v-hover>
                    </td>
                </tr>
            </tbody>
        </table> -->

        <v-data-table
            :headers="headers"
            :items="arr"
            :search="search"
            density="compact"
            items-per-page="50"
        ></v-data-table>

        <v-fab icon="mdi-file-excel" app color="primary" @click="extract"></v-fab>
    </div>
</template>

<script setup>
// import { useDataStore } from '@/stores/dataStore'
import { getFirestore, collection } from "firebase/firestore"
import { useCollection } from "vuefire"
import { firebaseApp } from "@/main"
import { ref } from 'vue'
import exportFromJSON from "export-from-json";

const dba = getFirestore(firebaseApp);
const arr = useCollection(collection(dba, "assistance"));
console.log(arr)
// const dataStore = useDataStore();
// const arr = dataStore.arr
const search = ref('')
const headers = [
  { align: 'start', key: 'name', title: 'Name', },
  { key: 'bday', sortable: false, title: 'Birthday' },
  { key: 'age', title: 'Age' },
  { key: 'gender', title: 'Gender' },
  { key: 'brgy', title: 'Barangay' },
  { key: 'presentedID', sortable: false, title: 'ID' },
  { key: 'presentedIDnum', sortable: false, title: 'ID Number' },
  { key: 'contactNum', sortable: false, title: 'Contact Number' },
  { key: 'contactPerson', sortable: false, title: 'Contact Person' },
]
// const arr = [
//     {
//         "name" : "Mark Otto",
//         "bday" : "1990-05-24",
//         "brgy" : "Barangay 1",
//         "presentedID" : "Driver's License",
//         "presentedIDnum" : "1234-123456-0000",
//         "contactNum" : "09998887777",
//         "contactPerson" : "Mary Otto"
//     }
// ]

const extract = () => {
    let arrr = arr.value.map((a) => {
        return {
            name : a.name,
            brgy : a.brgy,
            bday : a.bday,
            age : a.age,
            gender : a.gender,
            presentedID : a.presentedID,
            presentedIDnum : a.presentedIDnum,
            contactNum : a.contactNum,
            contactPerson : a.contactPerson
        }
    })
    arrr.forEach(function (o) {
        Object.keys(o).forEach(function (k) {
            if (o[k] === null) {
                o[k] = '';
            }
        });
    });

    let filteredData = arrr

    exportFromJSON({
        data : filteredData, 
        fileName: "Assistance Data", 
        exportType : exportFromJSON.types.xls,
        withBOM : true,
        fields : 
        {
            name : 'Name',
            brgy : 'Barangay',
            bday : 'Birthday',
            age : 'Age',
            gender : 'Gender',
            presentedID : 'ID',
            presentedIDnum : 'ID Number',
            contactNum : 'Contact Number',
            contactPerson : 'Contact Person'
        }
    })
}

</script>

<style scoped>
.icon:hover {
    color: red;
}
</style>