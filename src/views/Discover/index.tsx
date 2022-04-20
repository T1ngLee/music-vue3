import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
	name: 'Discover',
	setup() {
		return {};
	},
	render() {
		return (
			<div class="pb-5 px-8">
				<RouterView />
			</div>
		);
	},
});
