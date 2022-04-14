/*
 * @Author: 挺子
 * @Description: 弹性盒子，设定高度比例后高度会跟随宽度变化，默认正方形
 */

import { defineComponent, renderSlot, computed } from 'vue';

export default defineComponent({
	name: 'ElasticBox',
	props: {
		heightScale: {
			type: [Number, String],
			default: 1,
		},
	},
	setup(props) {
		// 获取高度相对于宽度的比例 返回百分比形式
		function getHeightScale() {
			const tempStr = String(props.heightScale);
			const tempNum = Number(tempStr);

			if (!isNaN(tempNum)) {
				return Math.abs(tempNum) * 100 + '%';
			}

			if (/^[0-9]+\.?[0-9]+%$/.test(tempStr)) {
				return tempStr;
			}

			return '100%';
		}

		return {
			getHeightScale,
		};
	},
	render() {
		return (
			<div>
				<div class="relative w-full" style={{ paddingBottom: this.getHeightScale() }}>
					<div class="absolute w-full h-full overflow-hidden">
						{this.$slots.default && renderSlot(this.$slots, 'default')}
					</div>
				</div>
			</div>
		);
	},
});
