/**
 * 公共js操作
 */
import storage from '@/js/utils/storage';
import { _http } from '@/js/utils/http';
import selectOpt from '@/js/utils/selectOpt';

export default {
    init: function () {},
    /**取值地址值
     *
     * @param key
     * @returns {*}
     */
    querystring: function (key) {
        let qss = location.href.replace(location.hash, '').split('?').length > 1 ? location.href.replace(location.hash, '').split('?')[1].split('&') : [];
        for (let i = 0; i < qss.length; i++) {
            if (qss[i].split('=').length > 0 && qss[i].split('=')[0].toString().toLowerCase() == key.toLowerCase()) {
                return qss[i].split('=')[1];
            }
        }
        return '';
    },
    /**
     * @description 获取某月份总天数
     * @Author      HHQ
     * @DateTime    2019-11-06
     * @return      {[type]}   [description]
     */
    getNowMonthManyDay: function (year, month) {
        if (year && month) {
            let d = new Date(year, month, 0);
            return d.getDate();
        } else {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let d = new Date(year, month, 0);
            return d.getDate();
        }
    },
    /**
     * [getTwoFloat 获取两位浮点数]
     * @param  {[Number]} floatNum [传入浮点数]
     * @return {[type]}          [description]
     */
    getTwoDecimal: function (floatNum) {
        floatNum = String(floatNum);
        if (floatNum.indexOf('.') === -1) {
            return floatNum + '.00';
        } else {
            let _interger = floatNum.split('.')[0];
            let _decimal = floatNum.split('.')[1];
            if (_decimal.length === 1) {
                return _interger + '.' + _decimal + '0';
            } else if (_decimal.length >= 2) {
                return _interger + '.' + _decimal.slice(0, 2);
            }
        }
        return Number(floatNum);
    },
    /**
     * [sortBy 排序方法]
     * @param  {[type]} attr [制定排序属性]
     * @param  {[type]} rev  [不传为升序，传false为降序]
     * @return {[type]}      [description]
     */
    sortBy: function (attr, rev) {
        //第二个参数没有传递 默认升序排列
        if (rev == undefined) {
            rev = 1;
        } else {
            rev = rev ? 1 : -1;
        }
        return function (a, b) {
            a = a[attr];
            b = b[attr];
            if (a < b) {
                return rev * -1;
            }
            if (a > b) {
                return rev * 1;
            }
            return 0;
        };
    },
    /**
     * @description 优化显示日期
     * @Author      HHQ
     * @DateTime    2017-11-03
     * @param       {[type]}   buyDateTime [description]
     * @return      {[type]}               [今天、昨天]
     */
    showDate: function (buyDateTime) {
        let tempDate = new Date(buyDateTime.replace(/-/g, '/')),
            nowDate = new Date(),
            startDate,
            endDate,
            dateStr = buyDateTime,
            yesterdayDateStart,
            yesterdayDateEnd,
            time = '',
            hour = '',
            min = '';

        // 今天
        startDate = +new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
        endDate = +new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 23, 59, 59);
        //昨天
        yesterdayDateStart = +new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() - 1);
        yesterdayDateEnd = +new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() - 1, 23, 59, 59);

        // 设置时间显示为双位数
        hour = tempDate.getHours() < 10 ? '0' + tempDate.getHours() : tempDate.getHours();
        min = tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes();
        if (startDate <= +tempDate && +tempDate <= endDate) {
            dateStr = '今天&nbsp;' + hour + ':' + min;
        } else if (yesterdayDateStart <= +tempDate && +tempDate <= yesterdayDateEnd) {
            dateStr = '昨天&nbsp;' + hour + ':' + min;
        }
        return dateStr;
    },
    /**
     * [getVisibleArea 获取可视区域元素；PS:如果当前元素或其父元素中包含"position:relative;"或是其它定位值，则不能有效的返回可视区域的元素]
     * @param  {[type]} _Elements [数组元素]
     * @param  {[type]} diffY   [y轴差值]
     * @return {[type]}           [返回可视元素数组]
     */
    getVisibleAreaEle: function (_Elements, diffY) {
        var _visibleEles = [];
        diffY = diffY ? diffY : 0;
        for (var i = 0; i < _Elements.length; i++) {
            var _cOffTop = _Elements[i].offsetTop;
            var isShow = _cOffTop - (document.documentElement.scrollTop || document.body.scrollTop);
            if (diffY <= isShow && isShow <= document.documentElement.offsetHeight) {
                _visibleEles.push(_Elements[i]);
            }
        }
        return _visibleEles;
    },

    // 时间倒退一个月(29天即可,29 * 24 * 60 * 60 * 1000)
    Reduce: function (data) {
        data = data.replace(/-/g, '/');
        return new Date(new Date(data).getTime() - 29 * 24 * 60 * 60 * 1000).Format('yyyy-MM-dd 00:00:00');
    },
    /**
     * @description 显示可视区域元素图片
     * @Author      HHQ
     * @DateTime    2018-10-16
     * @param       {[type]}   currImgEleArr [当前图片dom对象数组]
     * @return      {[type]}                 [description]
     */
    showVisibleEleImg(currImgEleArr, otherCB) {
        let _self = this;
        let visibleImgEleArr = _self.getVisibleAreaEle(currImgEleArr);
        visibleImgEleArr.forEach((currItem, index) => {
            if (!currItem.getAttribute('src')) {
                currItem.setAttribute('src', currItem.getAttribute('data-img'));
            }
        });

        window.onscroll = function () {
            let visibleImgEleArr = _self.getVisibleAreaEle(currImgEleArr);
            visibleImgEleArr.forEach((currItem, index) => {
                if (!currItem.getAttribute('src')) {
                    currItem.setAttribute('src', currItem.getAttribute('data-img'));
                }
            });
            // 其它回调函数
            otherCB && otherCB();
        };
    },
    /* 编辑url参数
     * url 目标url
     * arg 需要替换的参数名称
     * arg_val 替换后的参数的值
     * return url 参数替换后的url
     */
    editParams(url, arg, arg_val) {
        let pattern = arg + '=([^&]*)';
        let replaceText = arg + '=' + arg_val;
        if (url.match(pattern)) {
            let tmp = '/(' + arg + '=)([^&]*)/gi';
            tmp = url.replace(eval(tmp), replaceText);
            return tmp;
        } else {
            if (url.match('[?]') && !location.href.indexOf('platform') > 0) {
                return url + '&' + replaceText;
            } else {
                return url + '?' + replaceText;
            }
        }
        return url + '\n' + arg + '\n' + arg_val;
    },
    //base64转文件流blob
    convertBase64UrlToBlob: function (b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data.substring(b64Data.indexOf(',') + 1));
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, {
            type: contentType
        });

        return blob;
    },
    /**
     *判断手机机型
     *
     * @returns  【android,ios】
     */
    userAgent() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return 'android';
        }
        if (isiOS) {
            return 'ios';
        }
    },
    /**
     * @description 监听微信浏览器返回
     * @Author      HHQ
     * @DateTime    2018-11-02
     * @param       {[type]}   callBack [description]
     * @return      {[type]}            [description]
     */
    historyBack: function (callBack) {
        pushHistory();
        window.addEventListener(
            'popstate',
            function (e) {
                callBack && callBack();
            },
            false
        );

        function pushHistory() {
            var state = {
                title: 'title',
                url: '#'
            };
            window.history.pushState(state, 'title', location.hash);
        }
    },
    /**
     * @description 清除用户信息
     * @Author      HHQ
     * @DateTime    2018-12-14
     * @return      {[type]}   [description]
     */
    clearUser() {
        // seesionStorage
        storage.SStorage.remove('_u');
        storage.SStorage.remove('_t');
        storage.SStorage.remove('udata');
        storage.SStorage.remove('_is_uid');
        storage.SStorage.remove('_read');
        storage.SStorage.remove('uid');
        // localStorage
        storage.LStorage.remove('_t');
        storage.LStorage.remove('tokenAge');
    },
    /**
     * @description 预览图片
     * @Author      HHQ
     * @DateTime    2018-12-06
     * @param       {[type]}   currImg [description]
     * @param       {[type]}   imgList [description]
     * @return      {[type]}           [description]
     */
    previewImageFn(currImg, imgList) {
        previewImage && previewImage.start({ urls: imgList, current: currImg });
    },
    /**
     * [getVisibleArea 获取可视区域元素
     * @param  {[type]} _Elements [数组元素]
     * @param  {[type]} diffY   [y轴差值]
     * @return {[type]}           [返回可视元素数组]
     */
    getVisibleAreaEleRe: function (_Elements, diffY) {
        let _visibleEles = [];
        diffY = diffY ? diffY : 0;
        for (let i = 0; i < _Elements.length; i++) {
            let _cOffTop = _Elements[i].getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
            let isShow = _cOffTop - (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
            if (diffY <= isShow && isShow <= document.documentElement.offsetHeight) {
                _visibleEles.push(_Elements[i]);
            }
        }
        return _visibleEles;
    },
    /**
     * @description 参数转换
     * @Author      HHQ
     * @DateTime    2019-11-07
     * @param       {[type]}   data [description]
     * @return      {[type]}        [description]
     */
    convertParams(data) {
        let tempData = {};
        for (let key in data) {
            // 字符创首位去空
            if (isClass(data[key]).toLowerCase() == 'string') {
                // 表情正则
                let emojiReg = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\uD800-\uDBFF]|[\uDC00-\uDFFF]|[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
                // 过滤表情字符
                tempData[key] = data[key].replace(emojiReg, '').trim();
            } else {
                tempData[key] = data[key];
            }
        }
        return tempData;
    },
    /**
     * @description 过滤空数据
     * @Author      HHQ
     * @DateTime    2019-11-07
     * @return      {[type]}   [description]
     */
    filterNullPramas(data) {
        let tempData = {};
        for (let key in data) {
            if (data[key] !== '' && data[key] !== null) {
                tempData[key] = data[key];
            }
        }
        return tempData;
    },
    getStatusClass(statusName) {
        let allStatusClass = {
            1: 'normal-c',
            9: 'fire-warning-c',
            4: 'early-warning-c',
            2: 'break-down-c',
            3: 'offline-c',
            在线: 'normal-c',
            异常: 'break-down-c',
            撞击: 'break-down-c',
            开启: 'fire-warning-c',
            低压预警: 'early-warning-c'
        };
        return allStatusClass[statusName];
    },

    getStatusIconClass(statusName) {
        //         <i class="iconfont iconhuojing fire-warning-c"></i>
        // <i class="iconfont iconguzhang early-warning-c"></i>
        // <i class="iconfont iconyujing break-down-c"></i>

        let allStatusIconClass = {
            火警: 'iconhuojing',
            预警: 'iconyujing',
            故障: 'iconguzhang'
        };
        return allStatusIconClass[statusName];
    },
    /**
     * @description 获取全局唯一标识符
     * @Author      HHQ
     * @DateTime    2019-12-17
     * @return      {[type]}   [description]
     */
    getUUID() {
        var s = [];
        var hexDigits = '0123456789abcdef';
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = '-';

        var uuid = s.join('');
        return uuid;
    },
    /**
     * @description 获取表单中key对应的数据
     * @Author      HHQ
     * @DateTime    2019-12-17
     * @param       {[type]}   dataForm [description]
     * @param       {[type]}   resData  [description]
     * @return      {[type]}            [description]
     */
    getKeysData(dataForm, resData) {
        Object.keys(dataForm).forEach((item, index) => {
            if (resData[item] != undefined) {
                dataForm[item] = resData[item];
            }
        });
    },
    /**
     * @description 退出登录
     * @Author      HHQ
     * @DateTime    2019-12-20
     * @return      {[type]}   [description]
     */
    logout(callback) {
        if (storage.LStorage.get('_t')) {
            // 调用退出登录接口
            _http({
                url: '/api/Account/LogOut',
                type: 'post',
                data: {},
                success: function (res) {
                    callback && callback();
                }
            });
        } else {
            callback && callback();
        }
        // 移除当前已存在标签
        storage.SStorage.remove('RouterTab:restore:');
        storage.LStorage.remove('_t');
        storage.LStorage.remove('_EID');
        storage.LStorage.remove('_E');
        storage.LStorage.remove('_menu');
    },
    /**
     * @description 设置空的参数为指定值
     * @Author      HHQ
     * @DateTime    2019-12-20
     * @param       {[type]}   dataObj [description]
     * @param       {[type]}   data    [description]
     */
    setParam(dataObj, data) {
        Object.keys(dataObj).map((item, index) => {
            if (dataObj[item]) {
                return dataObj[item];
            } else {
                dataObj[item] = 0;
                return dataObj[item];
            }
        });
    },
    /**
     * @description 验证表单数据
     * @Author      HHQ
     * @DateTime    2019-12-24
     * @param       {[type]}   dataForm     [description]
     * @param       {[type]}   valiDataForm [description]
     * @return      {[type]}                [description]
     */
    verifyDataForm(dataForm, valiDataForm, $this) {
        let _self = $this;
        let tempKeys = Object.keys(valiDataForm);
        for (let i = 0; i < tempKeys.length; i++) {
            if (isClass(dataForm[tempKeys[i]]).toLowerCase() == 'array' && dataForm[tempKeys[i]].length == 0) {
                _self.$message({
                    type: 'warning',
                    message: valiDataForm[tempKeys[i]]
                });
                return false;
            } else if (!dataForm[tempKeys[i]]) {
                _self.$message({
                    type: 'warning',
                    message: valiDataForm[tempKeys[i]]
                });
                return false;
            }
        }
        return true;
    },
    /**
     * @description 表单提示
     * @Author      HHQ
     * @DateTime    2019-12-27
     * @param       {[type]}   $this [description]
     * @return      {[type]}         [description]
     */
    formTips($this, tips) {
        $this.$message({
            type: 'warning',
            message: tips
        });
    },
    /**
     * @description 是否存在该按钮
     * @Author      HHQ
     * @DateTime    2020-01-03
     * @param       {[type]}   optCode [可为string/array;为array时，array中的所有按钮权限都不包含在页面按钮权限列表中时，则返回false]
     * @param       {[type]}   btnList [description]
     * @return      {Boolean}          [description]
     */
    isExistBtn(optCode, btnList) {
        if (btnList && btnList.length > 0) {
            let btnItem = btnList.find((item) => {
                if (isClass(optCode).toLowerCase() === 'string') {
                    return optCode === item.BtnId;
                } else if (isClass(optCode).toLowerCase() === 'array') {
                    let _isExistBtn = optCode.find((itemChild) => {
                        return itemChild === item.BtnId;
                    });
                    if (_isExistBtn) return true;
                }
            });
            // 存在该按钮时，返回true
            if (btnItem) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    /**
     * @description 设置html元素字体大小
     * @Author      HHQ
     * @DateTime    2020-01-10
     */
    setHtmlPx() {
        let designSize = 1920; // 设计图尺寸

        let html = document.documentElement;

        let wW = html.clientWidth; // 窗口宽度
        if (wW >= designSize) {
            let rem = (designSize * 100) / designSize;
            document.documentElement.style.fontSize = rem + 'px';
        } else if (wW >= 1366) {
            let rem = (wW * 100) / designSize;
            document.documentElement.style.fontSize = rem + 'px';
        } else {
            let rem = (1366 * 100) / designSize;
            document.documentElement.style.fontSize = rem + 'px';
        }
    },
    /**
     * @description 设置离线数据为【--】
     * @Author      HHQ
     * @DateTime    2020-03-13
     * @return      {[type]}   [description]
     */
    settingOfflineData(dataList) {
        if (isClass(dataList).toLowerCase() === 'array') {
            dataList.map((item) => {
                if (item.State == 3) {
                    for (let childKey in item) {
                        if (childKey != 'StateName' && childKey != 'CDate' && childKey != 'UDate') {
                            item[childKey] = '--';
                        }
                    }
                }
                return item;
            });
        } else if (isClass(dataList).toLowerCase() === 'object') {
            for (let key in dataList) {
                if (key != 'StateName' && key != 'CDate' && key != 'UDate') {
                    dataList[key] = '--';
                }
            }
        }
    },
    /**
     * @description 根据状态获取状态icon图片
     * @Author      HHQ
     * @DateTime    2020-03-11
     * @param       {[type]}   status [description]
     * @return      {[type]}          [description]
     */
    getImgByStatus(status, statusType) {
        status = String(status);
        if (status == '--') {
            return require('@/assets/images/status_icon_grey.png');
        }
        switch (statusType) {
            // 交流指示、直流指示
            case 1:
                if (status === '0') {
                    return require('@/assets/images/status_icon_red.png');
                } else if (status === '1') {
                    return require('@/assets/images/status_icon_green.png');
                }
                break;
            case 2:
                // 检修阀、安全检修阀
                if (status === '01') {
                    return require('@/assets/images/status_icon_grey.png');
                } else if (status === '10') {
                    return require('@/assets/images/status_icon_red.png');
                } else if (status === '00' || status === '11') {
                    return require('@/assets/images/status_icon_yellow.gif');
                }
                break;
            // 故障报警、超压报警、低压报警、低液位报警、充电断路
            case 3:
                if (status === '1') {
                    return require('@/assets/images/status_icon_red.png');
                } else if (status === '0') {
                    return require('@/assets/images/status_icon_grey.png');
                }
                break;
            // 选择阀、总控阀、制冷机
            case 4:
                if (status === '1') {
                    return require('@/assets/images/status_icon_green.png');
                } else if (status === '0') {
                    return require('@/assets/images/status_icon_grey.png');
                }
                break;
        }
    },
    /**
     * @description 获取设备状态颜色css
     * @Author      HHQ
     * @DateTime    2020-03-24
     * @return      {[type]}   [description]
     */
    getTextClassByStatus(status, statusType) {
        status = String(status);
        switch (statusType) {
            // 故障报警、低液位报警、充电断路、压缩机电流
            case 1:
                if (status === '1') {
                    return 'break-down-c';
                }
                break;
            // 压力
            case 2:
                if (status === '-2' || status === '2') {
                    return 'early-warning-c';
                }
                break;
            // 超压报警、低压报警、液位
            case 3:
                if (status === '1') {
                    return 'early-warning-c';
                }
                break;
            // 检修阀、安全检修阀
            case 4:
                if (status === '10' || status === '00' || status === '11') {
                    return 'early-warning-c';
                }
            // 直流指示
            case 5:
                if (status === '0') {
                    return 'break-down-c';
                }
                break;
            // 交流指示
            case 6:
                if (status === '0') {
                    return 'early-warning-c';
                }
                break;
            // 总控阀
            case 7:
                if (status === '1') {
                    return 'fire-warning-c';
                }
                break;
        }
    },
    /**
     * @description 根据设备实时数据状态值获取文字显示
     * @Author      HHQ
     * @DateTime    2020-03-24
     * @param       {[type]}   status     [description]
     * @param       {[type]}   statusType [description]
     * @return      {[type]}              [description]
     */
    getTextByStatus(status, statusType) {
        status = String(status);
        switch (statusType) {
            /*// 制冷机
             case 1:
                 if (status === '1') {
                     return '正常';
                 }
                 break;*/
            // 检修阀、安全检修阀
            case 2:
                if (status === '10' || status === '00' || status === '11') {
                    return '预警';
                }
                break;
            // 故障报警、低液位报警
            case 3:
                if (status === '1') {
                    return '故障';
                }
                break;
            // 超压报警、低压报警
            case 4:
                if (status === '1') {
                    return '预警';
                }
                break;
            // 充电断路
            case 5:
                if (status === '1') {
                    return '故障';
                }
                break;
            // 交流指示
            case 6:
                if (status === '0') {
                    return '预警';
                }
                break;
            // 直流指示
            case 7:
                if (status === '0') {
                    return '故障';
                }
                break;
        }
    },
    /**
     * @description      判断状态颜色
     * @author           Forrest
     * @DateTime         2021/11/01 星期一
     */
    getEquipmentClassByState(state) {
        if (state !== 0) {
            return 'early-warning-c';
        } else if (state == 0) {
            return 'normal-c';
        }
    },
    /**
     * @description      通过设备状态的名称判断颜色
     * @author           Forrest
     * @DateTime         2021/11/01 星期一
     */
    byJudgeEquipmentColor(name) {
        if (name == '正常') {
            return 'normal-c';
        } else {
            return 'early-warning-c';
        }
    },
    /**
     * @description 获取报警icon图片
     * @Author      HHQ
     * @DateTime    2020-03-17
     * @param       {[type]}   state     [description]
     * @return      {[type]}             [description]
     */
    getAlarmIconImg(state) {
        switch (state) {
            // 火警
            case 9:
                return require('@/assets/images/alarm_icon_start.png');
                break;
            // 故障
            case 2:
                return require('@/assets/images/alarm_icon_fault.png');
                break;
            // 离线
            case 3:
                return require('@/assets/images/alarm_icon_offline.png');
                break;
            // 预警
            case 4:
                return require('@/assets/images/alarm_icon_warning.png');
                break;
        }
    },
    /**
     * @description 获取预览文件
     * @Author      HHQ
     * @DateTime    2020-03-12
     * @param       {[type]}   sourceUrl [description]
     * @param       {Function} callback  [description]
     * @return      {[type]}             [description]
     */
    getPreviewFile(_self, sourceUrl, callback) {
        _self._http({
            url: _self._config.managmentApi + '/api/UploadFiles/PreviewDocument',
            type: 'get',
            isLoading: true,
            data: {
                sourceFileUrl: sourceUrl
            },
            success: function (res) {
                callback && callback(res);
            }
        });
    },
    /**
     * @description 是否存在备设备
     * @Author      HHQ
     * @DateTime    2020-03-24
     * @param       {[type]}   _self         [description]
     * @param       {[type]}   equipmentCate [当前设备cate]
     * @return      {Boolean}                [description]
     */
    isExistBackUpEquipment(_self, equipmentCate) {
        // 只存在主设备
        if (
            _self._config.mainEquipmentList.find((item) => {
                return item === equipmentCate;
            })
        ) {
            return false;
        }
        // 存在主、备设备
        else if (
            _self._config.mainAddBackUpEquipmentList.find((item) => {
                return item === equipmentCate;
            })
        ) {
            return true;
        }
        // 默认只存在主设备
        else {
            return false;
        }
    },
    /**
     * @description 手机号、座机验证规则
     * @Author      HHQ
     * @DateTime    2020-03-26
     * @param       {[type]}   rule     [description]
     * @param       {[type]}   value    [description]
     * @param       {Function} callback [description]
     * @return      {[type]}            [description]
     */
    ruleTelephone(rule, value, callback) {
        if (!(/^1[3456789]\d{9}$/.test(value) || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value))) {
            callback(new Error('电话号码格式不正确'));
        } else {
            callback();
        }
    },
    /**
     * @description 删除无效的key
     * @Author      HHQ
     * @DateTime    2020-04-15
     * @return      {}   [description]
     */
    deleteInvalidKeys(obj) {
        for (let key in obj) {
            !obj[key] && delete obj[key];
        }
    },
    // 数组去重
    arrayReduce(arr) {
        let newArr = [arr[0]];
        for (let i = 1; i < arr.length; i++) {
            let repeat = false;
            for (let j = 0; j < newArr.length; j++) {
                if (arr[i].Id === newArr[j].Id) {
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    },
    // 判断元素类型
    isClass(o) {
        if (o === null) return 'Null';
        if (o === undefined) return 'Undefined';
        return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
    },
    /**
     * @description 公用文件上传
     * @Author      HHQ
     * @DateTime    2020-06-08
     * @param       {[type]}   api        [上传APi URL]
     * @param       {[type]}   _vue       [当前vm对象]
     * @param       {[type]}   fileList   [文件列表array]
     * @param       {[type]}   uploadData [附加参数object]
     * @param       {Function} callback   [上传成功回调函数]
     * @return      {[type]}              [description]
     */
    uploadFilesFn(api, _vue, fileList, uploadData, callback) {
        let fileDataForm = new FormData();
        // 组装所有文件
        fileList.forEach((item) => {
            // 只上传本地文件
            if (item.raw) {
                fileDataForm.append(item.raw.name, item.raw);
            }
        });
        // 上传额外参数
        if (uploadData) {
            Object.keys(uploadData).forEach((item) => {
                fileDataForm.append(item, uploadData[item]);
            });
        }
        // 调用接口上传图片
        _vue._http({
            url: api,
            type: 'post',
            isLoading: true,
            isFormData: true,
            data: fileDataForm,
            success(res) {
                callback && callback(res);
            }
        });
    },
    /**
     * @description 根据设备状态获取class
     * @Author      HHQ
     * @DateTime    2020-09-25
     * @param       {[type]}   status [description]
     * @return      {[type]}          [description]
     */
    getStatusClassByType(status) {
        let statusClass = {
            1: 'normal-c',
            9: 'fire-warning-c',
            4: 'early-warning-c',
            2: 'break-down-c',
            3: 'offline-c'
        };
        return statusClass[status];
    },
    /**
     * @description 获取地图marker
     * @Author      HHQ
     * @DateTime    2020-09-24
     * @param       {[type]}   dataType [description]
     * @return      {[type]}            [description]
     */
    getMarkerObj(marker) {
        let _marker = {
            vid: marker.vid,
            position: marker.position || [],
            content: '',
            events: marker.events || {},
            extData: marker.extData || {},
            visible: marker.visible !== undefined ? marker.extData : true,
            draggable: marker.draggable !== undefined ? marker.draggable : false
        };

        // 单位（1）、建筑物图标（2）
        if (marker.dataType === 1 || marker.dataType === 2) {
            _marker.content = `<img src="${require(`@/assets/images/mapMarkers/datatype_img_${marker.dataType}.png`)}" class="svg-img-other" />`;
        }
        // 设备（5）、网关（6）,svgInjector（svg注入器）
        else if (marker.dataType === 5 || marker.dataType === 6) {
            _marker.content = `<img src="${marker.contentUrl}" class="svg-img ${this.getStatusClassByType(marker.status)}" onload="svgInjector(this)" />`;
        }
        return _marker;
    },
    /**
     * mqtt数据返回操作
     */
    mqttResOpt(opt, mqttClient, callback) {
        let _self = this;
        let __mqttRes = mqttClient._mqttRes;
        if (mqttClient._mqttStatus) {
            // 解析topic参数
            let topicArr = __mqttRes.topic.split('/');
            switch (opt[2]) {
                // 设备报警
                case 'alarm':
                    callback && callback();
                    break;
            }
        }
    },
    /**
     * @description 设备状态EventDesc隐藏长度
     * @Author      Forrest
     * @DateTime    2021-04-26
     * @param       {[type]}   [description]
     */
    hiddenStrLength(data, len) {
        if (data && typeof data === 'string') {
            if (data.length > len) {
                data = data.substring(0, len) + '...';
            }
        }
        return data;
    },
    //根据设备状态枚举返回状态名
    getEuipmentNameByCode(code) {
        let res = '';
        selectOpt.equipStateOpt.forEach((item) => {
            if (item.value == code) {
                res = item.label;
                return;
            }
        });
        return res;
    },
    //根据设备状态枚举返回状态名
    getAlarmTypeByCode(code) {
        let res = '';
        selectOpt.alarmTypeOpt.forEach((item) => {
            if (item.value == code) {
                res = item.label;
                return;
            }
        });
        return res;
    }
};

/**
 * [deleteParams 删除url参数]
 * @param  {[type]} names [Array类型]
 * @return {[type]}       [description]
 */
window.location.deleteParams = function (names) {
    let loca = this;
    let baseUrl = loca.origin + loca.pathname + '?';
    let query = loca.search.substr(1);
    for (let j = 0; j < names.length; j++) {
        if (query.indexOf(names[j]) > -1) {
            let obj = {};
            let arr = query.split('&');
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split('=');
                obj[arr[i][0]] = arr[i][1];
            }
            delete obj[names[j]];
            let url =
                baseUrl +
                JSON.stringify(obj)
                    .replace(/[\"\{\}]/g, '')
                    .replace(/\:/g, '=')
                    .replace(/\,/g, '&')
                    .replace(loca.hash, '');
            if (loca.href.indexOf('&') < 0) {
                url = url.replace('?', '');
            }
            return url;
        }
    }
};
/* 编辑url参数
 * url 目标url
 * arg 需要替换的参数名称
 * arg_val 替换后的参数的值
 * return url 参数替换后的url
 */
window.location.editParams = function (url, arg, arg_val) {
    let pattern = arg + '=([^&]*)';
    let replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        let tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + arg + '\n' + arg_val;
};

// 对象深度clone
function clone(obj) {
    let result = {},
        oClass = isClass(obj);
    // if(oClass==="Object"){
    //     result={};
    // }else if(oClass==="Array"){
    //     result=[];
    // }else{
    //     return obj;
    // }
    for (key in obj) {
        let copy = obj[key];
        if (isClass(copy) == 'Object') {
            result[key] = arguments.callee(copy);
        } else if (isClass(copy) == 'Array') {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}
// 判断元素类型
window.isClass = function (o) {
    if (o === null) return 'Null';
    if (o === undefined) return 'Undefined';
    return Object.prototype.toString.call(o).slice(8, -1);
};
// 解决精度丢失
window.floatObj = (function () {
    /*
     * 判断obj是否为一个整数
     */
    function isInteger(obj) {
        return Math.floor(obj) === obj;
    }

    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    function toInteger(floatNum) {
        let ret = {
            times: 1,
            num: 0
        };
        let isNegative = floatNum < 0;
        if (isInteger(floatNum)) {
            ret.num = floatNum;
            return ret;
        }
        let strfi = floatNum + '';
        let dotPos = strfi.indexOf('.');
        let len = strfi.substr(dotPos + 1).length;
        let times = Math.pow(10, len);
        let intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10);
        ret.times = times;
        if (isNegative) {
            intNum = -intNum;
        }
        ret.num = intNum;
        return ret;
    }

    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    function operation(a, b, digits, op) {
        let o1 = toInteger(a);
        let o2 = toInteger(b);
        let n1 = o1.num;
        let n2 = o2.num;
        let t1 = o1.times;
        let t2 = o2.times;
        let max = t1 > t2 ? t1 : t2;
        let result = null;
        switch (op) {
            case 'add':
                if (t1 === t2) {
                    // 两个小数位数相同
                    result = n1 + n2;
                } else if (t1 > t2) {
                    // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2);
                } else {
                    // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2;
                }
                return result / max;
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2;
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2);
                } else {
                    result = n1 * (t2 / t1) - n2;
                }
                return result / max;
            case 'multiply':
                result = (n1 * n2) / (t1 * t2);
                return result;
            case 'divide':
                result = (n1 / n2) * (t2 / t1);
                return result;
        }
    }
    // 加减乘除的四个接口
    function add(a, b, digits) {
        return operation(a, b, digits, 'add');
    }

    function subtract(a, b, digits) {
        return operation(a, b, digits, 'subtract');
    }

    function multiply(a, b, digits) {
        return operation(a, b, digits, 'multiply');
    }

    function divide(a, b, digits) {
        return operation(a, b, digits, 'divide');
    }

    // exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    };
})();
// 时间格式化
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    let _weekDay = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        0: '日'
    };
    let o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'w+': _weekDay[this.getDay()], //周
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return fmt;
};

// 针对safari浏览器处理Date问题
window._Date = function () {
    if (arguments.length === 0) {
        return new Date();
    }
    // 当前传入参数只有一个且为字符串时，将 - 替换成 /
    else if (arguments.length === 1) {
        if (typeof arguments[0] === 'string') {
            arguments[0] = arguments[0].replace(/-/g, '/');
        }
        return new Date(arguments[0]);
    } else {
        return new Date(...arguments);
    }
};
