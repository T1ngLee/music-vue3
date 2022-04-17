/*
 * @Author: 挺子
 * @Description: 登录相关的接口
 */

import service from '../utils/request';

/**
 * @description: 二维码key生成接口
 * @param {*}
 * @return {*}
 */
export async function getQRCodeKey() {
	try {
		const { data } = await service.get(`/api/login/qr/key`, {
			params: {
				timestamp: getTimestamp(),
			},
		});
		return data.unikey || '';
	} catch (e) {
		//
	}
}

/**
 * @description: 生成二维码图片Base64
 * @param {*}
 * @return {*}
 */
export async function createQRCode(unikey: string) {
	// TODO 因为目前服务器不会返回图片Base64，所以暂时不用
	const { data } = await service.get(`/api/login/qr/create`, {
		params: {
			key: unikey,
		},
	});
}

function getTimestamp() {
	return Date.now();
}

// 二维码的状态
export enum ScanQRCodeStatus {
	/**
	 * 二维码过期
	 */
	expired = 800,
	/**
	 * 等待扫码
	 */
	wait = 801,
	/**
	 * 待确认
	 */
	confirm = 802,
	/**
	 * 授权登录成功
	 */
	success = 803,
}

/**
 * @description: 二维码检测扫码状态接口
 * @param {*}
 * @return {*}
 */
export async function checkQRCode(unikey: string) {
	try {
		const res = await service.get(`/api/login/qr/check`, {
			params: {
				key: unikey,
				timestamp: getTimestamp(),
			},
		});

		return res;
	} catch (e) {
		//
	}
}

interface SentCaptchaBody {
	/**手机号 */
	phone: string;
	/**区号 */
	ctcode?: string;
}
/**
 * @description: 获取验证码
 * @param {SentCaptchaBody} body
 * @return {*}
 */
export async function sentCaptcha(body: SentCaptchaBody) {
	try {
		const res = await service.post('/api/captcha/sent', body);

		if (res.code !== 200) {
			return Promise.reject(res);
		}

		return res;
	} catch (e) {
		//
	}
}

export interface LoginCellphoneBody {
	/**手机号 */
	phone: string;
	/**密码 */
	password?: string;
	/**签名后密码 */
	md5_password?: string;
	/**区号 */
	countrycode?: string;
	/**验证码 */
	captcha?: string;
}

/**
 * @description: 通过手机号登录
 * @param {LoginCellphoneBody} body
 * @return {*}
 */
export async function loginCellphone(body: LoginCellphoneBody) {
	try {
		// const res = await service.post('/login/cellphone', body)
		const res = await service.get('/api/login/cellphone', {
			params: body,
		});
		console.log(res);
	} catch (e) {
		//
	}
}
