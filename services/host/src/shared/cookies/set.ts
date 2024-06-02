interface SetCookieProps {
   path?: string;
   expires?: Date | string | number;
   [propName: string]: any;
}

/**
 * Функция, сохраняющая куки
 * @param name имя кук
 * @param value значение кук
 * @param props SetCookieProps, в которых можно указать время жизни кук
 */
export function setCookie(name: string, value: string, props?: SetCookieProps) {
   props = props || {};
   let exp = props.expires;
   if (typeof exp == "number" && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
   }
   if (exp && exp instanceof Date && exp.toUTCString) {
      props.expires = exp.toUTCString();
   }
   value = encodeURIComponent(value);
   let updatedCookie = name + "=" + value;
   for (const propName in props) {
      updatedCookie += "; " + propName;
      const propValue = props[propName];
      if (propValue !== true) {
         updatedCookie += "=" + propValue;
      }
   }
   console.log(updatedCookie);
   document.cookie = updatedCookie;
}
