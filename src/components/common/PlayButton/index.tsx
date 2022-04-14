/*
 * @Author: 挺子
 * @Description: 首页列表中的播放图标
 */

import { defineComponent, PropType, computed } from 'vue';
import Styles from './index.module.scss';

export type PlayButtonSize = 'tiny' | 'small' | 'medium' | 'large';

export default defineComponent({
	name: 'PlayButton',
	props: {
		size: {
			default: 'medium',
			type: String as PropType<PlayButtonSize>,
		},
	},
	setup(props) {
		const btnSize = computed(() => {
			switch (props.size) {
				case 'tiny':
					return 'transform scale-75';
				case 'small':
					return 'transform scale-90';
				case 'large':
					return 'transform scale-125';
				default:
					return 'transform scale-100';
			}
		});

		return {
			btnSize,
		};
	},
	render() {
		return (
			<div class={[Styles.playButtonContainer, this.btnSize]}>
				<span class={['iconfont', 'icon-bofang', Styles.icon]}></span>
			</div>
		);
	},
});
