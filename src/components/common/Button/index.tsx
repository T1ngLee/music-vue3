import { defineComponent, renderSlot } from 'vue';

export default defineComponent({
	name: 'Button',
	emits: ['click'],
	setup(props, { emit }) {
		function onClick() {
			emit('click');
		}

		return {
			onClick,
		};
	},
	render() {
		const { $slots } = this;

		return (
			<button
				class="px-6 py-2 border rounded bg-wy-red text-white hover:bg-wy-deep-red"
				onClick={this.onClick}
			>
				{/* <span class="iconfont icon-aixin-solid"></span> */}
				{$slots.icon && renderSlot($slots, 'icon')}
				{$slots.default && renderSlot($slots, 'default')}
			</button>
		);
	},
});
