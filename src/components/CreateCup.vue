<template>
	<div id="CreateCup">
		<form v-on:submit="submitCup" id="cupForm">
			<div class="center-text">Submit a Cup</div>
			<div class="form">
				<div class="form-right">
					<div class="mb-3">
						<label for="name" class="form-label">Name</label>
						<input type="text" class="form-control" name="name" v-model="name" id="name" required>
					</div>
					<div class="mb-3">
						<label for="description" class="form-label">Description</label>
						<input type="text" class="form-control" name="description" v-model="description" id="description" required>
					</div>
					<div class="mb-3" id="logoSelect">
						<div>
							<label for="logo" class="form-label">logo URL</label>
							<br>
						<input
							id="logo"
							type="hidden"
							role="uploadcare-uploader"
							data-public-key="c9d6990c50ebb5b39b90"
							data-tabs="file camera url facebook gdrive gphotos"
							data-effects="crop"/>
						</div>
						<img id="logoImage" :src="'https://ucarecdn.com/'+this.logo+'/-/quality/smart/-/preview/640x640/image.jpg'" type="text/html">
					</div>
					<div class="mb-3">
						<label for="prize" class="form-label">Prize</label>
						<input type="text" class="form-control" name="prize" v-model="prize" id="prize" required>
					</div>
					<div class="mb-3">
						<label for="startDate" class="form-label">Start Date</label>
						<input type="date" class="form-control" name="startDate" v-model="startDate" id="startDate" :min="this.minDate()" required>
					</div>
					<button type="submit" style="margin-top: auto;" class="btn btn-primary">Submit</button>
				</div>
				<div class="form-left">
					<div class="mb-3">
						<label for="maps" class="form-label">Maps</label>
						<select class="form-control mb-3" id="mapOption" name="mapOption" v-model="mapOption" required>
							<option value="" disabled selected>Select Option</option>
							<option>All Maps</option>
							<option>Native Maps Only</option>
							<option>Halo Maps Only</option>
							<option>Black List Maps</option>
							<option>White List Maps</option>
						</select>
						<div id="mapHide" style="display: none;">
							<label for="maps" class="form-label" id="blackMaps" style="display: none;">Black Listed Maps</label>
							<label for="maps" class="form-label" id="whiteMaps" style="display: none;">White Listed Maps</label>
							<textarea style="resize: none;" type="text" class="form-control" name="maps" v-model="maps" id="maps" required></textarea>
							<small id="mapsText" class="form-text text-muted">Please list maps one map per line.</small>
						</div>
					</div>
					<div class="form-group mb-3">
						<label for="teamSize">Team Size</label>
						<select class="form-control" id="teamSize" name="teamSize" v-model="teamSize" required>
							<option value="" disabled selected>Select Size</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
							<option>7</option>
							<option>8</option>
						</select>
					</div>
					<div class="mb-3">
						<label for="prizeDistribution" class="form-label">Prize Distribution</label>
						<textarea style="resize: none;" type="text" class="form-control" name="prizeDistribution" v-model="prizeDistribution" id="prizeDistribution" required></textarea>
					</div>
					<div class="form-group mb-3">
						<label for="matchGeneration">Match Generation</label>
						<select class="form-control" id="matchGeneration" name="matchGeneration" v-model="matchGeneration" required>
							<option value="" disabled selected>Select Generation</option>
							<option>Truly Random</option>
						</select>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>


<script>
import { useStore } from 'vuex';
// import { useRoute } from 'vue-router';
// import { ref, onMounted } from 'vue';
import moment from 'moment'
import uploadcare from 'uploadcare-widget/uploadcare.lang.en.min.js'
import uploadcareTabEffects from 'uploadcare-widget-tab-effects/dist/uploadcare.tab-effects.lang.en.min.js'




export default {
	setup () {
		// const route = useRoute();
		const store = useStore();
		// const quote = ref({});
		
		return {
			// quote,
			store
			// route
		}
	},
	data () {
		return {
			name: '',
			description: '',
			maps: '',
			logo: '',
			mapOption: '',
			mapText: '',
			prize: '',
			startDate: '',
			teamSize: '',
			matchGeneration: '',
			prizeDistribution: '',
			text: '',
			discordText: '',
		}
	},
	watch: {
		prizeDistribution() {
			setTimeout(() => {this.UpdateTextArea()}, 10)
		},
		maps() {
			setTimeout(() => {this.UpdateTextArea()}, 10)
		},
		mapOption (option) {
			if (option == 'Black List Maps')   {
				document.getElementById('mapHide').style.display = 'block'
				document.getElementById('blackMaps').style.display = 'block'
				document.getElementById('whiteMaps').style.display = 'none'
				this.mapText = ' Black Listed:'
				this.maps = ''
			} else if (option == 'White List Maps'){
				document.getElementById('mapHide').style.display = 'block'
				document.getElementById('whiteMaps').style.display = 'block'
				document.getElementById('blackMaps').style.display = 'none'
				this.mapText = ' White Listed:'
				this.maps = ''
			} else {
				document.getElementById('mapHide').style.display = 'none'
				document.getElementById('blackMaps').style.display = 'none'
				document.getElementById('whiteMaps').style.display = 'none'
				this.maps = this.mapOption
				this.mapText = ''
			}
		}
	},
	name: "CreateCup",
	mounted () {
		uploadcare.registerTab('preview', uploadcareTabEffects)
		const widget = uploadcare.Widget("[role=uploadcare-uploader]");

		widget.onUploadComplete(fileInfo => {
			this.logo = fileInfo.uuid
		});
		// const UPLOADCARE_LOCALE_TRANSLATIONS = {
		// 	buttons: {
		// 		choose: {
		// 			files: {
		// 				one: 'Upload Image'
		// 			}
		// 		}
		// 	}
		// }
		
		const tx = document.getElementsByTagName("textarea");
		for (let i = 0; i < tx.length; i++) {
			tx[i].style.height = '20px'
		}
	},
	computed: {
	},
	methods: {
		minDate() {
			return moment().add(1, 'days').format('YYYY-MM-DD')
		},
		CreateCup() {
			console.log(this.store)
			this.store.commit('MakeNewQuote', {name: "me", startDate: "HELELLO", status: "pending"});
		},
		UpdateTextArea() {
			const tx = document.getElementsByTagName("textarea");
			for (let i = 0; i < tx.length; i++) {
				tx[i].style.height = tx[i].scrollHeight+"px";
			}
		},
		submitCup(evt) {
			evt.preventDefault()
			this.CreateCup()
		}
	}
};
</script>

<style scoped>
	#CreateCup {
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	#cupForm {
		width: 90%;
		height: 90%;
		margin: auto;
		margin-top: 4.5%;
		padding: 2.5%;
		background-color: white;
		box-shadow: 0px 0px 3px 3px lightgray;
		display: flex;
		flex-direction: column;
	}
	#logoImage {
		height: 10vh;
		width: 10vh;
		margin-left: auto;
		box-shadow: 0px 0px 1px 1px lightgray;
	}
	#logoSelect {
		display:flex;
		flex-direction: row;
		margin-right: 3%;
		margin-bottom: 0!important;
	}
	.form-right, .form-left {
		width: 50%;
		height: 100%;
		padding: 2.5%;
	}
	.form-left {
		border-left: 1px lightgray solid;
	}
	.form {
		display: flex;
		height: 100%;
	}
	
	.ps {
		height: 90%;
		padding-left:1%;
		padding-right:1%;
	}
	.center-text {
		text-align: center;
		font-weight: bold;
		font-size: 1.4rem;
		margin-bottom: 3%;
	}
	.body-text {
		margin-top: 2.5%;
	}
	.noDis {
		-webkit-writing-mode: horizontal-tb !important;
		color: black;
		display: inline-block;
		text-align: start;
		appearance: auto;
		-webkit-rtl-ordering: logical;
		resize: none;
		white-space: pre-wrap;
		overflow-wrap: break-word;
		background-color: transparent;
		column-count: initial !important;
		margin: 0em;
		border-width: 1px;
		border-style: solid;
		border-color: transparent;
		border-image: initial;
		padding: 0px;
		width: 100%;
		cursor: default;
		user-select: none;
		margin-bottom: 1rem;
	}
	
</style>