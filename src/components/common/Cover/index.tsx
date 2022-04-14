/*
 * @Author: 挺子
 * @Description: 通用封面
 */

import { defineComponent, PropType } from 'vue';
import ElasticBox from '../ElasticBox';
import ImageView from '../ImageView';
import PlayButton from '../PlayButton';

export default defineComponent({
	name: 'Cover',
	props: {
		playButton: {
			default: true,
			type: Boolean,
		},
		playButtonPostion: {
			default: 'right-bottom',
			type: String as PropType<'center' | 'right-bottom'>,
		},
	},
	setup() {},
	render() {
		return (
			<div>
				<ElasticBox>
					<div class="w-full h-full bg-red-500">
						<ImageView hover />
						<div class="w-full h-full">{this.playButton && PlayButton}</div>
					</div>
				</ElasticBox>
				<span>234234234234234</span>
			</div>
		);
	},
});
