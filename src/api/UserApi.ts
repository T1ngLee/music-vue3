import service from '../utils/request';

export async function getAccountInfo() {
	try {
		const res = await service.get<any>(`/api/user/account`);
		console.log(res);
		return res;
	} catch (e) {
		//
	}
}
