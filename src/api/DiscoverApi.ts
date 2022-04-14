import service from "../utils/request";
import { DiscoverTypes } from "../types/discover";

/**
 * @description: 获取轮播图
 * @param {*}
 * @return {*}
 */
export async function requestBanner(): Promise<DiscoverTypes.BannerItem[]> {
  try {
    const data = await service.get('/banner')
    let banners = []
    if (data.banners != undefined) {
      banners = data.banners
      // return data.banners as DiscoverTypes.BannerItem[]
    }
    return banners
  } catch (e) {
    //
    return []
  }
}

// export async function request