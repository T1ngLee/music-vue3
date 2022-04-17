import service from '../utils/request';
import Judge from '../utils/judge';

export interface CountrieCodeItem {
	/** 中文名称 */
	zh: string;
	/** 英文名称 */
	en: string;
	/** 代码 */
	locale: string;
	/** 区号 */
	code: string;
}

/**
 * @description: 区号列表
 * @param {*}
 * @return {*}
 */
export async function requestCountriesCode(): Promise<CountrieCodeItem[]> {
	let resultList: CountrieCodeItem[] = [];
	try {
		const { data } = await service.post('/api/countries/code/list');
		if (!Judge.isArray(data)) {
			return Promise.reject('数据获取失败');
		} else {
			for (let item of data) {
				if (Judge.isArray(item.countryList)) {
					resultList = resultList.concat(item.countryList);
				}
			}
		}
	} catch {
		//
	} finally {
		return resultList;
	}
}
