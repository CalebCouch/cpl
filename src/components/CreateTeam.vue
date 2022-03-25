<template>
	<div id="CreateTeam">
		<form v-on:submit="submitTeam" id="teamForm">
			<div class="center-text">Create A Team</div>
			<div class="form">
				<div class="form-right">
					<div class="mb-3">
						<label for="name" class="form-label">Name</label>
						<input type="text" class="form-control" name="name" v-model="name" id="name" required>
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
					<div class="form-group mb-3">
						<div class="form-check form-switch">
							<input class="form-check-input" type="checkbox" name="dual" v-model="dual">
							<label class="form-check-label" for="flexSwitchCheckDefault">Major leauge</label>
						</div>
					</div>
					<button type="submit" style="margin-top: auto;" class="btn btn-primary">Submit</button>
				</div>
				<div class="form-left">
					
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
import { AuthenticationState } from 'vue-auth0-plugin';





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
			dual: false
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
	name: "CreateTeam",
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
		CreateTeam() {
			console.log(this.store)
			this.store.commit('SubmitTeam', {name: this.name, description: this.description, logo: this.logo, prize: this.prize, startDate: this.startDate, mapOption: this.mapOption, maps: this.maps, teamSize: this.teamSize, prizeDistribution: this.prizeDistribution, matchGeneration: this.matchGeneration, status: "pending", createdBy: AuthenticationState.user.sub, createdAt: moment(), teams: {}, winner: {}, dual: this.dual});
			this.$router.push('/team?name='+this.name)
		},
		UpdateTextArea() {
			const tx = document.getElementsByTagName("textarea");
			for (let i = 0; i < tx.length; i++) {
				tx[i].style.height = tx[i].scrollHeight+"px";
			}
		},
		submitTeam(evt) {
			evt.preventDefault()
			this.CreateTeam()
		}
	}
};
</script>

<style scoped>
	#CreateTeam {
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	#teamForm {
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