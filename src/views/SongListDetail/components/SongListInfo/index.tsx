/*
 * @Author: 挺子
 * @Description: 歌单的基本信息
 */

import { defineComponent } from 'vue';
import ImageView from '../../../../components/common/ImageView';

export default defineComponent({
	name: 'SongListInfo',
	setup() {
		return {};
	},
	render() {
		return (
			<div class="flex p-8">
				<ImageView
					width="180px"
					height="180px"
					imageUrl="https://p1.music.126.net/yvnBtrhnohwW0oo8M4_hjg==/109951165744483190.jpg"
				/>
				<div class="ml-5">
					<section>
						<span>歌单</span>
						<h2>今天从《这里是杭州（LOVE PARADISE）》听起|私人雷达</h2>
					</section>
					<section>
						<a>云音乐私人雷达</a>2019-12-16创建
					</section>
					<section></section>
					<section>
						<span>标签</span>
						<span>歌曲</span>
						<span>简介</span>
					</section>
				</div>
			</div>
		);
	},
});
