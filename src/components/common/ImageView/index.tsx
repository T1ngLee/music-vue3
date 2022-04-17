/*
 * @Author: 挺子
 * @Description: 图片容器
 */

import { defineComponent, onMounted, PropType, ref, renderSlot } from 'vue';
import Styles from './index.module.scss';
// import { useIntersectionObserver } from '@vueuse/core';

enum LoadStatus {
	/** 未加载 */
	NOT_LOAD,
	/** 加载成功 */
	LOADED,
	/** 加载失败 */
	FAIL,
}

export default defineComponent({
	name: 'ImageView',
	props: {
		hoverZoom: {
			// hover时的缩放效果
			type: Boolean,
			default: false,
		},
		'object-fit': {
			// 填充模式
			type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
			default: 'cover',
		},
		lazy: {
			// 懒加载
			type: Boolean,
			default: false,
		},
		imageUrl: {
			default: '',
			type: String,
		},
	},
	setup(props) {
		const img = ref<HTMLImageElement>();
		const loadStatus = ref(LoadStatus.NOT_LOAD);

		// TODO 优化监听
		const observer = new IntersectionObserver(
			changes => {
				changes.forEach(change => {
					// console.log(change);
					if (
						change.isIntersecting ||
						(change.rootBounds?.bottom && change.boundingClientRect.top < change.rootBounds?.bottom)
					) {
						if (props.imageUrl) {
							(change.target as HTMLImageElement).src = props.imageUrl;
						}

						// 'https://p1.music.126.net/yvnBtrhnohwW0oo8M4_hjg==/109951165744483190.jpg';
					}

					observer.unobserve(change.target);
				});
			},
			{
				rootMargin: '0px 0px 20px 0px',
			}
		);

		onMounted(() => {
			observer.observe(img.value!);

			// const { stop } = useIntersectionObserver(img.value, (changes, b) => {
			// 	changes.forEach(change => {
			// 		console.log(change);
			// 		if (
			// 			change.isIntersecting
			// 			// (change.rootBounds?.bottom && change.boundingClientRect.top < change.rootBounds?.bottom)
			// 		) {
			// 			(change.target as HTMLImageElement).src =
			// 				'https://p1.music.126.net/yvnBtrhnohwW0oo8M4_hjg==/109951165744483190.jpg';
			// 		}

			// 		// observer.unobserve(change.target);
			// 	});
			// 	// console.log(changes, b);
			// });
		});

		function handLoad(e: Event) {
			console.log('loaded');
			loadStatus.value = LoadStatus.LOADED;
		}

		function handError(e: Event) {
			loadStatus.value = LoadStatus.FAIL;
		}

		return {
			img,
			handLoad,
			handError,
			loadStatus,
		};
	},
	render() {
		return (
			<>
				<div
					class="w-full h-full bg-gray-100 text-center justify-center items-center"
					style={{ display: this.loadStatus === LoadStatus.LOADED ? 'none' : 'flex' }}
				>
					<i
						class={[
							'iconfont',
							'text-3xl',
							'text-gray-300',
							this.loadStatus === LoadStatus.NOT_LOAD ? 'icon-tupian' : 'icon-tupianjiazaishibai',
						]}
					></i>
				</div>
				{/* hover 放到div上 不放在img上，是防止兄弟覆盖在img上方时，img上的hover失效 */}
				<div class={{ [Styles.hover]: this.hoverZoom }}>
					<img
						ref="img"
						style={{
							'object-fit': this.$props['object-fit'],
						}}
						onLoad={this.handLoad}
						onError={this.handError}
					/>
					{this.$slots.default && renderSlot(this.$slots, 'default')}
				</div>
			</>
		);
	},
});
