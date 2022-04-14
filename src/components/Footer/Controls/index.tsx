/*
 * @Author: 挺子
 * @Description: 播放器控制器页面部分
 */
import { defineComponent, computed } from 'vue';
import MyAudio from '../../../utils/MyAudio';
import Styles from './index.module.scss';
import { useAudioState } from '../../../store/Audio';
import ProgressBar from '../../common/ProgressBar';

const PLAY_MODE_ICON = [
	'icon-shunxubofang',
	'icon-liebiaoxunhuan',
	'icon-danquxunhuan',
	'icon-suijibofang',
];

export default defineComponent({
	name: 'Controls',
	setup() {
		const audioState = useAudioState();

		function onPlayOrPause() {
			audioState.playOrPause();

			console.dir(audioState.audio);
		}

		function getPaused() {
			console.log(MyAudio.audio.paused);
		}

		function handleProgressChange(time: number) {
			audioState.setCurrentTime(time);
		}

		/**
		 * @description: 将数字补零到指定长度，如果原始数据大于指定长度，则直接返回
		 * @param {number} data
		 * @param {number} length
		 * @return {*}
		 */
		function repairZero(data: number | string, length: number = 2) {
			const tempData = String(data);
			const dataLength = tempData.length;

			if (!/^[0-9]*$/.test(tempData) || dataLength >= length) {
				return data;
			}

			return (Array(length).join('0') + tempData).slice(-length);
		}

		function formatTime(seconds: number) {
			const str = String(seconds / 60);
			const arr = str.split('.');
			const minutesStr = repairZero(arr[0], 2);
			const secondsStr = repairZero(Math.floor(Number('0.' + (arr[1] || 0)) * 60), 2);
			return `${minutesStr}:${secondsStr}`;
		}

		const showCurrentTime = computed(() => {
			return formatTime(audioState.currentTime);
		});

		const showTargetTime = computed(() => {
			return formatTime(audioState.duration);
		});

		return {
			onPlayOrPause,
			getPaused,
			handleProgressChange,
			audioState,
			showCurrentTime,
			showTargetTime,
		};
	},
	render() {
		const { onPlayOrPause, getPaused, audioState } = this;

		return (
			<div class={Styles.controlContainer}>
				<div>
					<button class={Styles.modeBtn} onClick={audioState.togglePlayMode}>
						<i class={['iconfont', PLAY_MODE_ICON[audioState.playMode], Styles.icon]}></i>
					</button>
					<button class={Styles.cutBtn}>
						<i class={['iconfont', 'icon-shangyishou', Styles.icon]}></i>
					</button>
					<button class={Styles.playBtn} onClick={onPlayOrPause}>
						{audioState.isPaused ? (
							<i class={['iconfont', 'icon-bofang', Styles.icon]}></i>
						) : (
							<i class={['iconfont', 'icon-zanting', Styles.icon]}></i>
						)}
					</button>
					<button class={Styles.cutBtn}>
						<i class={['iconfont', 'icon-xiayishou', Styles.icon]}></i>
					</button>
					<button class={Styles.lyricBtn}>
						<i class={['iconfont', 'icon-geci', Styles.icon]}></i>
					</button>
				</div>
				<div class={Styles.progress}>
					<span>{this.showCurrentTime}</span>
					{/* <ProgressBar
            class="progressBar"
            target={ this.audioState.duration } 
            current={ this.audioState.currentTime } 
            onProgressChange={ this.handleProgressChange }
            /> */}
					<ProgressBar
						class={Styles.progressBar}
						target={this.audioState.duration}
						current={this.audioState.currentTime}
						onProgressChange={this.handleProgressChange}
					/>
					<span>{this.showTargetTime}</span>
				</div>
			</div>
		);
	},
});
