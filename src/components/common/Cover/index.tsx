/*
 * @Author: 挺子
 * @Description: 通用封面
 */

import { defineComponent, PropType, renderSlot } from 'vue';
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
		const { $slots, playButton } = this;

		const getPlayButton = () => {
			return (
				<PlayButton
					class={[
						Styles.playButton,
						this.playButtonPostion === 'center' ? Styles.center : Styles.rightBottom,
						Styles.animal,
					]}
					size={this.playButtonSize}
				/>
			);
		};

		return (
			<div class={Styles.coverContainer}>
				<ElasticBox>
					<ImageView hoverZoom>
						<div class={Styles.slotsContainer}>
							{$slots.header && renderSlot($slots, 'header')}
							{$slots.footer && renderSlot($slots, 'footer')}
							{playButton && getPlayButton()}
						</div>
					</ImageView>
				</ElasticBox>
				<span>234234234234234</span>
			</div>
		);
	},
});
