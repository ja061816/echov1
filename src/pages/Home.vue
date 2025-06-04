<script setup>
import { getFirestore, collection, addDoc  } from "firebase/firestore"
import { useCollection } from "vuefire"
import { firebaseApp } from "@/main"
import { ref } from "vue"

const db = getFirestore(firebaseApp);
const todos = useCollection(collection(db, "todos"));

const newTodoTitle = ref("")
const newTodoCompleted = ref(false)

const addTodo = async () => {
	if (newTodoTitle.value.trim()) {
		await addDoc(collection(db, "todos"), {
			title: newTodoTitle.value,
			completed: newTodoCompleted.value,
		});
		// set the form inputs back to initial state
		newTodoTitle.value = ""
		newTodoCompleted.value = false
	}
};
</script>

<template>
	<div class="m-2">
		<div style="display: flex; align-items: center; gap: 10px;">
		<input type="text" v-model="newTodoTitle" placeholder="Title" class="form-control" style="width: 300px;"/>
		<input type="checkbox" v-model="newTodoCompleted" placeholder="Title"/>
		<button type="button" class="btn btn-success" @click="addTodo">Add</button>
	</div>
		<table class="table" style="width: 500px;">
			<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Completed</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,i) in todos" :key="i">
					<td>{{ i + 1 }}</td>
					<td>{{ item.title }}</td>
					<td>{{ item.completed }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
