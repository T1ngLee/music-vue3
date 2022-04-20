/*
 * @Author: 挺子
 * @Description: 歌单详情页
 */

import { defineComponent } from 'vue';
import SongListInfo from './components/SongListInfo';

export default defineComponent({
	name: 'SongListDetail',
	setup() {
		return {};
	},
	render() {
		return (
			<div>
				<SongListInfo />
			</div>
		);
	},
});
