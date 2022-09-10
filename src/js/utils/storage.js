export default {
    SStorage: {
        set: function (key, data) {
            data = window.JSON.stringify(data);
            data = encodeURIComponent(data);
            return window.sessionStorage.setItem(key, data);
        },
        get: function (key) {
            var item = window.sessionStorage.getItem(key);
            if (item != 'undefined' && item != '' && item != null) {
                item = decodeURIComponent(item);
                return window.JSON.parse(item);
            } else {
                return null;
            }
        },
        remove: function (key) {
            return window.sessionStorage.removeItem(key);
        },
        clean: function () {
            return window.sessionStorage.clear();
        }
    },
    LStorage: {
        set: function (key, data) {
            data = window.JSON.stringify(data);
            data = encodeURIComponent(data);
            return window.localStorage.setItem(key, data);
        },
        get: function (key) {
            var item = window.localStorage.getItem(key);
            if (item != 'undefined' && item != '' && item != null) {
                item = decodeURIComponent(item);
                return window.JSON.parse(item);
            } else {
                return null;
            }
        },
        remove: function (key) {
            return window.localStorage.removeItem(key);
        },
        clean: function () {
            return window.localStorage.clear();
        }
    }
};
