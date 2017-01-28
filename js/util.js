'use strict';

function sanitizeUrl(url) {
    const regex = /([\w\:\/\.]+)({\W\w+})?/g;
    let result = regex.exec(url);

    return result[1];
}

export {sanitizeUrl}
