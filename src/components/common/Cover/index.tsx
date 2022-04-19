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
			default: false,
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
		description: String, // 描述
		imageUrl: String,
		title: {
			default: '',
			type: String,
		},
		hoverZoom: {
			// hover时的缩放效果
			type: Boolean,
			default: false,
		},
	},
	emits: ['click'],
	setup(props, { emit }) {
		function handleClick() {
			emit('click');
		}

		return {
			handleClick,
		};
	},
	render() {
		const { $slots, playButton, description, handleClick } = this;

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
			<div class={Styles.coverContainer} onClick={handleClick}>
				<ElasticBox class="rounded overflow-hidden">
					<ImageView hoverZoom={this.hoverZoom} imageUrl={this.imageUrl}>
						<div class={Styles.slotsContainer}>
							{$slots.default && renderSlot($slots, 'default')}
							{description && <div class={Styles.description}>{description}</div>}
							{$slots.header && (
								<div class={Styles.header}>{renderSlot($slots, 'header', { haha: 'haha' })}</div>
							)}
							{$slots.footer && <div class={Styles.footer}>{renderSlot($slots, 'footer')}</div>}
							{playButton && getPlayButton()}
						</div>
					</ImageView>
				</ElasticBox>
				<span class="block mt-1 text-sm">{this.title}</span>
			</div>
		);
	},
});
