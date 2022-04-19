/*
 * @Author: 挺子
 * @Description: 推荐歌单
 */

import { defineComponent, onMounted, ref } from 'vue';
import Styles from './index.module.scss';
import Subhead from '../../../../../components/common/Subhead';
import Cover from '../../../../../components/common/Cover';
import { requestRecommendSongList } from '../../../../../api/DiscoverApi';
import { DiscoverTypes } from '../../../../../types/discover';
import { formatCount } from '../../../../../utils/Tools';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: 'RecommendSongList',
	setup() {
		const songList = ref<DiscoverTypes.RecommendSongList>([]);
		const router = useRouter();

		onMounted(() => {
			getSongList();
		});

		async function getSongList() {
			try {
				const res = await requestRecommendSongList();
				songList.value = res;
			} catch (e) {
				//
			}
		}

		function toDetailPage(id: number) {
			router.push({ name: 'SongListDetail', params: { id } });
		}

		return {
			songList,
			toDetailPage,
		};
	},
	render() {
		if (!this.songList.length) {
			return null;
		}

		const getSongListCovers = () => {
			return this.songList.map(item => {
				return (
					<Cover
						playButton
						playButtonAnim
						playButtonPostion="right-bottom"
						imageUrl={item.picUrl}
						title={item.name}
						onClick={() => this.toDetailPage(item.id)}
					>
						{{
							header: () => <div>{formatCount(item.playCount)}</div>,
						}}
					</Cover>
				);
			});
		};

		return (
			<>
				<Subhead to={{ name: 'songList' }}>推荐歌单</Subhead>
				<div class={Styles.container}>
					<Cover
						description="根据您的音乐口味生成每日推荐"
						playButton
						playButtonAnim
						playButtonPostion="right-bottom"
						title="每日歌曲推荐"
					>
						<div class="absolute top-0 right-0 bottom-0 left-0 bg-gray-400">
							{new Date().getDate()}
						</div>
					</Cover>
					{getSongListCovers()}
				</div>
			</>
		);
	},
});
