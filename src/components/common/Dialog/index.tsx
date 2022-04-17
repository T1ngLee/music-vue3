import { defineComponent, renderSlot, watch } from 'vue';

export default defineComponent({
	name: 'Dialog',
	props: {
		show: {
			type: Boolean,
			default: false,
		},
		// TODO 实现传入普通的css值和tailwind参数
		width: {
			type: String,
			default: 'w-90',
		},
		title: {
			type: String,
		},
	},
	emits: ['update:show', 'closed'],
	setup(props, context) {
		function onClose() {
			context.emit('update:show', false);
		}

		watch(
			() => props.show,
			newVal => {
				if (!newVal) {
					context.emit('closed');
				}
			}
		);

		return {
			onClose,
		};
	},
	render() {
		const { $slots, show, onClose, width, title } = this;
		return (
			show && (
				<div
					class={[
						'fixed',
						'bg-white',
						'top-1/2',
						'left-1/2',
						'transform',
						'-translate-x-1/2',
						'-translate-y-1/2',
						'z-50',
						'shadow-dialog',
						'flex',
						'flex-col',
						'z-50',
						width,
					]}
				>
					{/* 标题区域 */}
					<div class="h-8 px-2 leading-8 flex-none">
						{title && <h2 class="inline-block">{title}</h2>}
						{/* 关闭按钮 */}
						<span
							class="iconfont icon-guanbi text-xl cursor-pointer text-gray-400 hover:text-gray-500 float-right leading-8"
							onClick={onClose}
						></span>
					</div>

					{/* 内容区域 */}
					<div class="p-2 flex-1">{$slots.default && renderSlot($slots, 'default')}</div>
				</div>
			)
		);
	},
});
