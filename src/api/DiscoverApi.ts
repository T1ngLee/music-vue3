import service from '../utils/request';
import { DiscoverTypes } from '../types/discover';

/**
 * @description: 获取轮播图
 * @param {*}
 * @return {*}
 */
export async function requestBanner(): Promise<DiscoverTypes.BannerItem[]> {
	try {
		const data = await service.get('/api/banner');
		let banners = [];
		if (data.banners != undefined) {
			banners = data.banners;
			// return data.banners as DiscoverTypes.BannerItem[]
		}
		return banners;
	} catch (e) {
		//
		return Promise.reject(e);
	}
}

export async function requestRecommendSongList(
	limit: number = 9
): Promise<DiscoverTypes.RecommendSongList> {
	try {
		const data = await service.get(`/api/personalized?limit=${limit}`);
		if (data.result) {
			return data.result;
		}
		return Promise.reject('获取数据失败');
	} catch (e) {
		return Promise.reject(e);
	}
}
