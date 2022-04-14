import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { useNavigation } from '../store/Navigation'

// “发现音乐”下面的子路由
export const discoverChildren: RouteRecordRaw[] = [
  {
    name: 'individuality',
    path: '/discover/individuality',
    component: () => import('../views/Discover/Individuality'),
    meta: { title: '个性推荐' }
  },
  {
    name: 'exclusive',
    path: '/discover/exclusive',
    component: () => import('../views/Discover/Exclusive'),
    meta: { title: '专属定制' }
  },
  {
    name: 'songList',
    path: '/discover/songList',
    component: () => import('../views/Discover/SongList'),
    meta: { title: '歌单' }
  },
  {
    name: 'rankingList',
    path: '/discover/rankingList',
    component: () => import('../views/Discover/RankingList'),
    meta: { title: '排行榜' }
  },
  {
    name: 'singer',
    path: '/discover/singer',
    component: () => import('../views/Discover/Singer'),
    meta: { title: '歌手' }
  },
  {
    name: 'newSong',
    path: '/discover/newSong',
    component: () => import('../views/Discover/NewSong'),
    meta: { title: '最新音乐' }
  },
]

// “视频”下面的子路由
export const videoChildren: RouteRecordRaw[] = [
  {
    path: '/video/video',
    component: () => import('../views/Video/Video'),
    meta: { title: '视频' }
  },
  {
    path: '/video/mv',
    component: () => import('../views/Video/MV'),
    meta: { title: 'MV' }
  }
]

// “我的收藏”下面的子路由
export const myCollectChildren: RouteRecordRaw[] = [
  {
    path: '/myCollect/album',
    component: () => import('../views/MyCollect/Album'),
    meta: { title: '专辑' }
  },
  {
    path: '/myCollect/singer',
    component: () => import('../views/MyCollect/Singer'),
    meta: { title: '歌手' }
  },
  {
    path: '/myCollect/video',
    component: () => import('../views/MyCollect/Video'),
    meta: { title: '视频' }
  },
  {
    path: '/myCollect/specialColumn',
    component: () => import('../views/MyCollect/SpecialColumn'),
    meta: { title: '专栏' }
  },
]

// “本地与下载”下面的子路由
export const localAndDowloadChildren: RouteRecordRaw[] = [
  {
    path: '/localAndDowload/download',
    component: () => import('../views/LocalAndDownload/Download'),
    meta: { title: '下载管理' }
  },
  {
    path: '/localAndDowload/local',
    component: () => import('../views/LocalAndDownload/Local'),
    meta: { title: '本地音乐' }
  },
]

export const contentRoutes: RouteRecordRaw[] = [
  {
    path: '/discover',
    component: () => import('../views/Discover'),
    meta: { title: '发现音乐' },
    redirect: discoverChildren[0],
    children: discoverChildren
  },
  {
    path: '/podcast',
    component: () => import('../views/Podcast'),
    meta: { title: '播客' }
  },
  {
    path: '/video',
    component: () => import('../views/Video'),
    meta: { title: '视频' },
    redirect: videoChildren[0],
    children: videoChildren
  },
  {
    path: '/friend',
    component: () => import('../views/Friend'),
    meta: { title: '朋友', pageTitle: '动态' }
  },
  {
    path: '/live',
    component: () => import('../views/Live'),
    meta: { title: '直播' }
  },
  {
    path: '/fm',
    component: () => import('../views/FM'),
    meta: { title: '私人FM' }
  },
]

export const myMusicRoutes: RouteRecordRaw[] = [
  {
    path: '/localAndDowload',
    component: () => import('../views/LocalAndDownload'),
    meta: { title: '本地与下载' },
    redirect: localAndDowloadChildren[0],
    children: localAndDowloadChildren
  },
  {
    path: '/recent',
    component: () => import('../views/Recent'),
    meta: { title: '最近播放' }
  },
  {
    path: '/myCloud',
    component: () => import('../views/MyCloud'),
    meta: { title: '我的音乐云盘' }
  },
  {
    path: '/myPodcast',
    component: () => import('../views/MyPodcast'),
    meta: { title: '我的播客' }
  },
  {
    path: '/myCollect',
    component: () => import('../views/MyCollect'),
    meta: { title: '我的收藏' },
    redirect: myCollectChildren[0],
    children: myCollectChildren
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...contentRoutes, 
    ...myMusicRoutes, 
    {
      path: '/:catchAll(.*)', // vue3 通用匹配的新语法
      redirect: contentRoutes[0]
    }
  ]
})

router.afterEach(() => {
  const navigation = useNavigation()
  navigation.getHistoryStatus()
})

export default router