/*
 * @Author: 挺子
 * @Description: 推荐歌单
 */

import { defineComponent } from 'vue';
import Styles from './index.module.scss';
import Subhead from '../../../../../components/common/Subhead';
import Cover from '../../../../../components/common/Cover';

export default defineComponent({
	name: 'RecommendSongList',
	render() {
		return (
			<>
				<Subhead to={{ name: 'rankingList' }}>推荐歌单</Subhead>
				<div class={Styles.container}>
					<Cover></Cover>
					<Cover></Cover>
					<Cover></Cover>
					<Cover></Cover>
					<Cover></Cover>
					<Cover></Cover>
					<Cover></Cover>
					<Cover></Cover>
					<Cover></Cover>
					<Cover></Cover>
				</div>
			</>
		);
	},
});
