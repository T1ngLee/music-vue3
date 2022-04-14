/*
 * @Author: 挺子
 * @Description: 搜索建议
 */

import { defineComponent, ref } from 'vue'
import Styles from './SearchSuggest.module.scss'
import { joinArtists, matchKeyword } from '../../../utils/Tools'
import { requestSearchSuggest } from '../../../api/Search'
import { SearchSuggest, SearchType } from '../../../types/Search'
import { AlbumItem, ArtistItem, SongItem, PlayList } from '../../../types/Base'

type DataFormatItem = {
  name: string,
  type: SearchType,
  title: string,
  icon: string,
  keywords?: string[]
}

export default defineComponent({
  name: 'SearchSuggest',
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  emits: ['changeSuggestShow'],
  setup(props, { emit }) {
    const result = ref<DataFormatItem[]>([])

    const moduleFormat: {
      [key: string]: DataFormatItem
    } = {
      albums: {
        name: 'albums',
        type: SearchType.ALBUM,
        title: '专辑',
        icon: 'icon-music-albums',
        keywords: []
      },
      artists: {
        name: 'artists',
        type: SearchType.SINGER,
        title: '歌手',
        icon: 'icon-bofangzhuye-geshoutubiao',
        keywords: []
      },
      songs: {
        name: 'songs',
        type: SearchType.SONG,
        title: '歌曲',
        icon: 'icon-yinle1',
        keywords: []
      },
      playlists: {
        name: 'playlists',
        type: SearchType.PLAY_LIST,
        title: '歌单',
        icon: 'icon-gedan',
        keywords: []
      }
    }
    

    // 生成模块元素
    function generateModuleElements() {
      return result.value.map(item => {
        return (
          <>
            <section class={ Styles.classifyTitle }>
              <span class={['iconfont', item.icon, Styles.icon]}></span>
              <span class={ Styles.title }>{ item.title }</span>
            </section>
            {
              item.keywords?.length && 
              <ul class={ Styles.content }>
                { generateLiElements(item.keywords) }
              </ul>
            }
          </>
        )
      })
    }

    function generateLiElements(strList: string[]) {
      return strList.map(str => {
        return (
          <li v-html={ matchKeyword(props.keywords, str) }></li>
        )
      })
    }

    function formatData(data: SearchSuggest) {
      for (let i = 0; i < result.value.length; i++) {
        const resultItem = result.value[i]
        const name = resultItem.name
        const temp = data[name as keyof typeof data]
        if (!temp || temp.length === 0) {
          continue
        }

        switch(resultItem.type) {
          case SearchType.ALBUM:
            console.log(resultItem);
            (temp as AlbumItem[]).forEach(album => {
              let str = album.name
              if (album.artist.name) {
                str = str + ' - ' + album.artist.name
              }
              resultItem.keywords?.push(str)
            })
            break
          case SearchType.SINGER:
            (temp as ArtistItem[]).forEach(artist => {
              let str = artist.name
              resultItem.keywords?.push(str)
            })
            break
          case SearchType.SONG:
            (temp as SongItem[]).forEach(song => {
              let str = song.name
              let artistsStr = joinArtists(song.artists)
              if (artistsStr) {
                str = str + ' - ' + artistsStr
              }
              resultItem.keywords?.push(str)
            })
            break
          case SearchType.PLAY_LIST:
            (temp as PlayList[]).forEach(playList => {
              resultItem.keywords?.push(playList.name)
            })
            break
        }
      }
    }

    // 获取搜索建议
    async function getSearchSuggest(keywords: string) {
      if (!keywords) {
        result.value = []
        emit('changeSuggestShow', false)
        return
      }

      try {
        const res = await requestSearchSuggest(keywords)
        result.value = []
        console.log(result.value)
        if (res.order) {
          // 根据order将数据排序
          res.order.forEach((classifyTitle) => {
            if (moduleFormat[classifyTitle as keyof typeof moduleFormat]) {
              result.value.push(moduleFormat[classifyTitle as keyof typeof moduleFormat])
            }
          })
        }
        if (result.value.length) {
          formatData(res)
          emit('changeSuggestShow', true)
        }
      } catch (e) {
        result.value = []
        emit('changeSuggestShow', false)
      }
    }

    return {
      generateModuleElements,
      getSearchSuggest,
    }
  },
  render() {
    return (
      <div class={ Styles.searchSuggest }>
        <div class={ Styles.classify }>
          { this.generateModuleElements() }
        </div>
      </div>
    )
  }
})