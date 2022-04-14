import service from "../utils/request";


const userBaseUrl = "/user"

export async function getAccountInfo() {
  try {
    const res = await service.get<any>(`${userBaseUrl}/account`)
    console.log(res)
    return res
  } catch(e) {
    // 
  }
}