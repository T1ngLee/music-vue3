/*
 * @Author: 挺子
 * @Description: 图片容器
 */

import { defineComponent, onMounted, PropType, ref } from 'vue';
import Styles from './index.module.scss';

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
		hover: {
			// hover时的缩放效果
			type: Boolean,
			default: false,
		},
		'object-fit': {
			type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
			default: 'cover',
		},
	},
	setup() {
		const img = ref<HTMLImageElement>();
		const loadStatus = ref(LoadStatus.NOT_LOAD);

		const observer = new IntersectionObserver(changes => {
			changes.forEach(change => {
				if (change.isIntersecting) {
					(change.target as HTMLImageElement).src =
						'https://p1.music.126.net/yvnBtrhnohwW0oo8M4_hjg==/109951165744483190.jpg';
				}
			});
		});

		onMounted(() => {
			observer.observe(img.value!);
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
				<img
					ref="img"
					class={{ [Styles.hover]: this.hover }}
					style={{
						'object-fit': this.$props['object-fit'],
					}}
					onLoad={this.handLoad}
					onError={this.handError}
				/>
			</>
		);
	},
});
