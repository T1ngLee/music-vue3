/*
 * @Author: 挺子
 * @Description: 通用封面
 */

import { defineComponent, PropType } from 'vue';
import ElasticBox from '../ElasticBox';
import ImageView from '../ImageView';
import PlayButton, { PlayButtonSize as PlayButtonSizeType } from '../PlayButton';
import Styles from './index.module.scss';

export default defineComponent({
	name: 'Cover',
	props: {
		playButton: {
			default: true,
			type: Boolean,
		},
		playButtonPostion: {
			default: 'center',
			type: String as PropType<'center' | 'right-bottom'>,
		},
		playButtonSize: {
			default: 'medium',
			type: String as PropType<PlayButtonSizeType>,
		},
		playButtonAnim: {
			default: true,
			type: Boolean,
		},
	},
	setup() {},
	render() {
		return (
			<div class={Styles.coverContainer}>
				<ElasticBox>
					<div class="w-full h-full bg-red-500 relative">
						// TODO 这里的hover效果
						<ImageView hover />
						<div class="absolute top-0 left-0 right-0 bottom-0">
							{this.playButton && (
								<PlayButton
									class={[
										Styles.playButton,
										this.playButtonPostion === 'right-bottom' ? Styles.rightBottom : Styles.center,
										Styles.animal,
									]}
									size={this.playButtonSize}
								/>
							)}
						</div>
					</div>
				</ElasticBox>
				<span>234234234234234</span>
			</div>
		);
	},
});
