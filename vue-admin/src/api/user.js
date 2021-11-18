import service from "../utils/request";
/**
 * 一用户列表
 */
export function userList(data) {
  return service.request({
    method: "post",
    url: "/user/getList/",
    data,
  });
}
