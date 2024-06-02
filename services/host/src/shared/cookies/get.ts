/**
 * Функция, возвращающая куки по имени
 * @param name имя требующихся кук
 *
 * @return {cookie} string при наличии кук или undefined в случае их отсутсвия
 */
export function getCookie(name: string): string | undefined {
   const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
   return matches ? decodeURIComponent(matches[1]) : undefined;
}
