import service from "../utils/request";
/**
 * 一级分类添加
 */
export function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data,
  });
}

/**
 * 获取信息分类
 */
export function GetCategoryAll(data) {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data,
  });
}
/**
 * 获取分类
 */
export function GetCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data,
  });
}
/**
 * 删除分类
 */
export function DeleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data,
  });
}
/**
 * 修改分类
 */
export function EditCategory(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data,
  });
}

/**
 * 添加子级分类
 */
export function AddChildrenCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addChildrenCategory/",
    data,
  });
}
/**
 * 新增信息
 */
export function AddInfo(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data,
  });
}
/**
 * 删除信息
 */
export function DeleteInfo(data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
    data,
  });
}
/**
 * 获取列表
 */
export function GetList(data) {
  return service.request({
    method: "post",
    url: "/news/getList/",
    data,
  });
}
/**
 * 修改信息
 */
export function EditInfo(data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data,
  });
}
/**
 * 信息详情
 */
export function Detailed(data) {
  return service.request({
    method: "get",
    url: "/news/detailed/",
    data,
  });
}
