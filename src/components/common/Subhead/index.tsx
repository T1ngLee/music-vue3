/*
 * @Author: 挺子
 * @Description: 小标题
 */

import { defineComponent, renderSlot, PropType } from 'vue';
import { useRouter, RouteLocationRaw } from 'vue-router';

export default defineComponent({
	name: 'Subhead',
	props: {
		to: [String, Object] as PropType<RouteLocationRaw>,
	},
	setup(props) {
		const router = useRouter();

		function toRoute() {
			if (!props.to) {
				return;
			}

			router.push(props.to);
		}

		return {
			toRoute,
		};
	},
	render() {
		return (
			<h3 class="text-lg font-bold">
				<span class={[this.to && 'cursor-pointer']} onClick={this.toRoute}>
					{renderSlot(this.$slots, 'default')}
					{this.to && <i class="iconfont icon-arrow-right align-middle text-2xl font-thin"></i>}
				</span>
			</h3>
		);
	},
});
