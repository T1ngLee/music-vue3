import { defineComponent, onMounted, ref } from 'vue';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import MyAudio from './utils/MyAudio';
import { useAudioState } from './store/Audio';

export default defineComponent({
	name: 'App',
	setup() {
		const app = ref<HTMLElement>();
		const audioState = useAudioState();

		onMounted(() => {
			if (app.value != undefined) {
				audioState.createAudio(app.value);
			}

			audioState.setSrc(
				'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/08/26/26h_lyx/01.mp3'
			);
			// MyAudio.play()
		});

		return {
			app,
		};
	},
	render() {
		return (
			<div
				class="w-screen h-screen overflow-hidden flex flex-col min-w-wy-minWidth min-h-wy-minHeight"
				ref="app"
			>
				<Header />
				<Body />
				<Footer />
			</div>
		);
	},
});
