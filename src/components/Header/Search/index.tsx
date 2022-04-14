import { defineComponent, ref, watch, onMounted } from 'vue'
import Styles from './index.module.scss'
import { storeToRefs } from 'pinia'
import { useSearchState } from '../../../store/Search'
import Dropdown from '../../common/Dropdown'
import { requestHotSearch, requestSearchSuggest } from '../../../api/Search'
import { HotSearchItem } from '../../../types/Search'
import HotSearch from './HotSearch'
import SearchHistory from './SearchHistory'
import SearchSuggest from './SearchSuggest'
import { debounce } from '../../../utils/Tools'
// import { debounce } from 'lodash'

export default defineComponent({
  name: 'Search',
  setup() {
    const dropdownShow = ref(false)
    const searchRef = ref<HTMLElement>()
    // 用户输入的搜索关键词
    const userKeyword = ref('')
    const searchState = useSearchState()
    const { defaultSearch } = storeToRefs(searchState)
    const hotSearchList = ref<HotSearchItem[]>([])
    const searchHistoryRef = ref<InstanceType<typeof SearchHistory>>()
    const searchSuggestRef = ref<InstanceType<typeof SearchSuggest>>()
    // 是否显示搜索建议
    const suggestShow = ref(false)

    // 搜索框回车事件
    function onInputEnter(e: KeyboardEvent) {
      if (e.code !== 'Enter') {
        return
      }

      if (userKeyword.value) {
        // 用户关键词发起搜索
      } else if (defaultSearch.value.realkeyword) {
        // 默认关键词发起搜索
        userKeyword.value = defaultSearch.value.realkeyword
        console.log(defaultSearch.value.realkeyword)
      }

      searchHistoryRef.value?.setHistory(userKeyword.value)
    }

    async function inputFocus() {
      try {
        searchHistoryRef.value?.getHistory()

        hotSearchList.value = await requestHotSearch()
        dropdownShow.value = true
      } catch(e) {
        //
      }
    }


    function inputEvent(e: Event) {
      // if (!userKeyword.value) {
      //   suggestShow.value = false
      //   return
      // }
      searchSuggestRef.value?.getSearchSuggest(userKeyword.value)
    }

    onMounted(() => {
      searchState.getDefaultSearch()
    })

    function changeSuggestShow(state: boolean) {
      suggestShow.value = state
    }

    return {
      onInputEnter,
      inputFocus,
      inputEvent,
      debounceInputEvent: debounce(inputEvent, 300),
      changeSuggestShow,
      defaultSearch,
      userKeyword,
      dropdownShow,
      searchRef,
      hotSearchList,
      searchHistoryRef,
      searchSuggestRef,
      suggestShow
    }
  },
  render() {
    return (
      <div class={ Styles.container }>
        {/* 搜索框 - begin */}
        <div class={ Styles.searchContainer }>
          <span class={['iconfont', 'icon-sousuo', Styles.icon]}></span>
          <input 
            placeholder={ this.defaultSearch.showKeyword }
            v-model={ this.userKeyword }
            onKeydown={ this.onInputEnter }
            onFocus={ this.inputFocus }
            ref="searchRef"
            onInput={ this.debounceInputEvent }
            />
            {/* 搜索框的下拉框 - begin */}
            <Dropdown 
              v-model:show={ this.dropdownShow } 
              trigger={ this.searchRef }
              destroy={ false }
              class={ Styles.searchDropdown }
              >
              <SearchHistory 
                ref="searchHistoryRef" 
                style={{ display: this.suggestShow ? 'none' : 'block' }} />
              <HotSearch 
                hotSearchList={ this.hotSearchList } 
                style={{ display: this.suggestShow ? 'none' : 'block' }} />
              <SearchSuggest 
                ref="searchSuggestRef" 
                keywords={ this.userKeyword } 
                style={{ display: this.suggestShow ? 'block' : 'none' }}
                onChangeSuggestShow={ this.changeSuggestShow } />
            </Dropdown>
            {/* 搜索框的下拉框 - end */}
        </div>
        {/* 搜索框 - end */}

        {/* 听歌识曲 */}
        <span class={['iconfont', 'icon-tinggeshiqu', Styles.tinggeshiqu]}></span>
      </div>
    )
  }
})