type O = Record<string, string[] | number[]>

export const getUrlParams = () => {
    var params: O = {}
    window
        .location
        .search
        .replace('?', '')
        .split('&')
        .reduce(
            (p, e) => {
                var a = e.split('=');
                if (decodeURIComponent(a[0]) && decodeURIComponent(a[1]))
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]).split("|");
                // if (~decodeURIComponent(a[1]).indexOf(",")) {
                //     p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]).split("|");
                // } else
                //     p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            params
        );
    return params

}
export const replaceUri = (value: string, text: string[] | number[]) => {
    console.log(value, text)
    var params = getUrlParams()

    params[value] = text

    let strTmpGet = ""
    for (const iterator in params) {
        if (params[iterator]) {
            strTmpGet += `${iterator}=${params[iterator].join("|")}&`
        }

    }

    var baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    var newUrl = baseUrl + (strTmpGet.slice(0, -1) && '?' + strTmpGet.slice(0, -1));
    // eslint-disable-next-line no-restricted-globals
    history.pushState(null, "", newUrl);

}