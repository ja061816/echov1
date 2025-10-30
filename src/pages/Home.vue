<script setup>
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { useCollection } from "vuefire"
import { firebaseApp } from "@/main"
import { ref } from "vue"
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()

const db = getFirestore(firebaseApp);
const todos = useCollection(collection(db, "todos"));

const newTodoTitle = ref("")
const newTodoCompleted = ref(false)
const newTodoImage = ref("")
const fileInputRef = ref(null) // Create a ref for the file input

const addTodo = async () => {
	if (newTodoTitle.value.trim()) {
		await addDoc(collection(db, "todos"), {
			title: newTodoTitle.value,
			completed: newTodoCompleted.value,
			image: newTodoImage.value,
		});
		newTodoTitle.value = ""
		newTodoCompleted.value = false;
		newTodoImage.value = ""
		
		// Reset the file input
		if (fileInputRef.value) {
			fileInputRef.value.value = null; // Reset the file input
		}
	}
};

const handleFileChange = (event) => {
	const file = event.target.files[0]
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader()
		reader.onload = (e) => {
			newTodoImage.value = e.target.result
		};
		reader.readAsDataURL(file)
		console.log(newTodoImage,'file')
	} else {
		newTodoImage.value = ""
		alert("Please select a valid image file.")
	}
};

</script>

<template>
  	<v-container fluid>
		<!-- Loading state -->
		<div v-if="authStore.loading" class="d-flex justify-content-center align-items-center" style="height: 200px;">
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		
		<!-- Main content -->
		<div v-else>
			<div style="display: flex; align-items: center; gap: 10px;">
				<input
					type="text"
					v-model="newTodoTitle"
					placeholder="Project Title"
					class="form-control"
					style="width: 300px;"
				/>
				<input
					type="file"
					@change="handleFileChange"
					class="form-control"
					style="width: 300px;"
					accept="image/*"
					ref="fileInputRef"
				/>
				<input
					type="checkbox"
					v-model="newTodoCompleted"
					class="form-check-input"
					placeholder="Completed"
					id="checkDefault"
				/>
				<label class="form-check-label" for="checkDefault">Completed</label>

				<button type="button" class="mt-2 btn btn-success" @click="addTodo">Add</button>
			</div>

			<table class="table table-bordered" style="width: 650px; margin-top: 10px;">
				<thead>
					<tr>
					<th>No.</th>
					<th>Project</th>
					<th>Completed</th>
					<th style="text-align: center;">Image</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, i) in todos" :key="i">
					<td>{{ i + 1 }}</td>
					<td>{{ item.title }}</td>
					<td>{{ item.completed }}</td>
					<td v-if="item.image" style="text-align: center;">
						<img :src="item.image" alt="Todo Image" style="width: 50px; height: auto; object-fit: contain;" />
					</td>
					<td v-else>No Image</td>
					</tr>
				</tbody>
			</table>
		</div>
	</v-container>
</template>