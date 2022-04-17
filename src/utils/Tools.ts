/*
 * @Author: 挺子
 * @Description: 一些工具函数
 */

import { ArtistItem } from '../types/Base';

/**
 * @description: 匹配关键词
 * @param {string} keyword 关键词
 * @param {string} target 被匹配的字符串
 * @param {boolean} isAll 是否匹配出所有符合的内容
 * @param {string} color 匹配的强调色
 * @return {*}
 */
export function matchKeyword(
	keyword: string,
	target: string,
	isAll: boolean = false,
	color: string = '#507daf'
) {
	const reg = new RegExp(keyword, `i${isAll ? 'g' : ''}`);
	return target.replace(reg, `<font color="${color}">$&</font>`);
}

/**
 * @description: 防抖
 * @param {Function} fn 回调方法
 * @param {number} wait 防抖等待时间
 * @return {*}
 */
export function debounce(fn: Function, wait: number) {
	let timer: NodeJS.Timeout;
	return function (this: any) {
		// TODO 这里的this
		if (timer != undefined) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn.apply(this, arguments);
		}, wait);
	};
}

/**
 * @description: 拼接歌手列表为字符串
 * @param {ArtistItem} artistsList 歌手列表
 * @return {*}
 */
export function joinArtists(artistsList: ArtistItem[]): string {
	let str = '';
	if (artistsList && artistsList.length) {
		str = artistsList.reduce((target, item) => {
			return target + item.name + ' ';
		}, str);
	}

	return str;
}

/**
 * @description: 格式化数量
 * @param {number} count
 * @return {*}
 */
export function formatCount(count: number) {
	if (count < 100000) {
		return count;
	} else if (count < 100000000) {
		return Math.floor(count / 10000) + '万';
	} else {
		return Math.floor(count / 100000000) + '亿';
	}
}
