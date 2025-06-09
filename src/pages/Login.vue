<script setup>
import { ref } from "vue"

const loginEmail = ref("")
const loginPassword = ref("")
const regName = ref("")
const regEmail = ref("")
const regPassword = ref("")
const revealSignUp = ref(false)

const resetForm = () => {
	loginEmail.value = ""
	loginPassword.value = ""
	regName.value = ""
	regEmail.value = ""
	regPassword.value = ""
}
</script>

<template>
	<section class="vh-100">
		<div class="container-fluid h-custom">
			<div class="row d-flex justify-content-center align-items-center h-100">
				<div class="col-md-9 col-lg-6 col-xl-5">
				<!-- <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid"
					alt="Sample image"> -->
				</div>
				<div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

					<form v-if="!revealSignUp">
						<div class="divider d-flex align-items-center my-4">
							<p class="text-center fw-bold mx-3 mb-0">LOGIN</p>
						</div>

						<!-- Email input -->
						<div class="mb-3">
							<div class="input-group">
								<span class="input-group-text" id="basic-addon3">Email</span>
								<input type="email" class="form-control" v-model="loginEmail">
							</div>
						</div>

						<!-- Password input -->
						<div class="mb-3">
							<div class="input-group">
								<span class="input-group-text" id="basic-addon3">Password</span>
								<input type="password" class="form-control" v-model="loginPassword">
							</div>
						</div>

						<!-- <div class="d-flex justify-content-between align-items-center">
							<div class="form-check mb-0">
							<input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
							<label class="form-check-label" for="form2Example3">
								Remember me
							</label>
							</div>
							<a href="#!" class="text-body">Forgot password?</a>
						</div> -->

						<div class="text-center text-lg-start mt-4 pt-2">
							<button type="button" class="btn btn-primary" style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
							<p class="mt-3 pt-1 mb-0">Don't have an account? 
								<span class="p-0 mb-2 btn btn-link link-success fw-bold" @click="revealSignUp = true, resetForm()">Register</span>
							</p>
						</div>
					</form>

					<form v-else>
						<div class="divider d-flex align-items-center my-4">
							<p class="text-center fw-bold mx-3 mb-0">REGISTER</p>
						</div>

						<!-- name input -->
						<div class="mb-3">
							<div class="input-group">
								<span class="input-group-text" id="basic-addon3">Name</span>
								<input type="text" class="form-control" v-model="regName">
							</div>
						</div>

						<!-- Email input -->
						<div class="mb-3">
							<div class="input-group">
								<span class="input-group-text" id="basic-addon3">Email</span>
								<input type="email" class="form-control" v-model="regEmail">
							</div>
						</div>

						<!-- Password input -->
						<div class="mb-3">
							<div class="input-group">
								<span class="input-group-text" id="basic-addon3">Password</span>
								<input type="password" class="form-control" v-model="regPassword">
							</div>
						</div>

						<div class="text-center text-lg-start mt-4 pt-2">
							<button type="button" class="btn btn-primary" style="padding-left: 2.5rem; padding-right: 2.5rem;">Register</button>
							<p class="mt-3 pt-1 mb-0">Already have an account? 
								<span class="p-0 mb-2 btn btn-link link-success fw-bold" @click="revealSignUp = false, resetForm()">Login</span>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<style>
.divider:after,
.divider:before {
	content: "";
	flex: 1;
	height: 1px;
	background: #eee;
	padding: 2px;
}
.h-custom {
  	height: calc(100% - 73px);
}
@media (max-width: 450px) {
	.h-custom {
		height: 100%;
	}
}
</style>