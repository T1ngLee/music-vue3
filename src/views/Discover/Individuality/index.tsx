/*
 * @Author: 挺子
 * @Description: 发现音乐 - 个性推荐
 *        推荐歌单
 *        热门播客
 *        独家放送
 *        最新音乐
 *        主题播客
 *        推荐MV
 *        听听
 *        看看
 */
import { defineComponent, onMounted, ref } from 'vue'
import Swiper from '../../../components/Banner'
import { requestBanner } from '../../../api/DiscoverApi'
import { DiscoverTypes } from '../../../types/discover'
import PlayButton from '../../../components/common/PlayButton'
import Subhead from '../../../components/common/Subhead'
import Square from '../../../components/common/ElasticBox'
import RecommendSongList from './components/RecommendSongList'

export default defineComponent({
  name: 'Individuality',
  setup() {
    const bannerList = ref<DiscoverTypes.BannerItem[]>([])

    onMounted(() => {
      getBannerList()
    })

    // 获取轮播图
    async function getBannerList() {
      try {
        // bannerList.value = await requestBanner()
      } catch(e) {
        // return []
      }
    }
    
    return {
      bannerList
    }
  },
  render() {
    const {
      bannerList
    } = this

    return (
      <div>
        <Swiper list={ bannerList }/>
        {/* <PlayButton /> */}
        <RecommendSongList />
      </div>
    )
  }
})