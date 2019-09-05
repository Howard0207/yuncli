/***************日志**************
* V 1.0.6
* 2018/3/20 yhy 新增控制打印机打印printer
* 2018/3/15 yhy 新增扫描枪扫描docScan
* 2018/3/12 yhy 新增接口手机通讯录选择器phoneSelector
* 2018/3/8 yhy fileSelector增加showDownloadFile
* 2018/3/6 yhy camera&ystCamera增加dateFormat和fontSize参数
* 2018/2/7 tcl camera&ystCamera增加crop参数

* V 1.0.5
* 2017/12/11 tcl 新增addOrRemoveHomeItem/checkHomeItemAdded接口

* V 1.0.4
* 2017/10/31 tcl checkGesturePwd接口增加timeOut属性

* V 1.0.3
* 2017/10/09 tcl 新增URL分享到招乎功能

* V 1.0.2
* 2017/06/13 tcl 新增人脸识别功能

* V 1.0.1
* 2017/04/26 tcl 增加webWaterMark水印API，修改extend方法bug

* V 1.0.0
* 2016/08/10 lwx 改进iframe内回调方法的执行，主要增加全局callbacks参数处理回调方法集合
* 2016/06/10 fkl 使用extend方法，合并默认参数
* 2015/06/01 tcl 包含基本的JSAPI方法，格式统一
*/

var MobileJS = {
    PreviewPolicy: {
        SaveToDevice: Number('0b1'),
        ShareToZH: Number('0b10'),
        ShareToWX: Number('0b100'),
        RecognizeQRCode: Number('0b1000'),
        ShareToWXMoments: Number('0b10000')
    },
    uniqueID: 0,
    callbacks: {},
    callbackInString: function (callback) {
        if (callback == '') { // 为空 直接返回
            return callback
        }
        var that = top.MobileJS;
        if (that == undefined) {
            top.MobileJS = this
            that = top.MobileJS
        }
        var callbackID = 'cb_' + (that.uniqueID++) + '_' + new Date().getTime();
        if (typeof callback === 'function') {
            that.callbacks[callbackID] = callback;
        } else if (typeof callback === 'string') {
            that.callbacks[callbackID] = window[callback];
        }
        return encodeURIComponent('MobileJS.callbacks["' + callbackID + '"]');
    },
    extend: function (a, b) {
        for (var key in a) {
            if (!!b && b.hasOwnProperty(key)) {
                a[key] = b[key];
            };
            if (key === 'callback') {
                a[key] = this.callbackInString(a[key]);
            }
        };
        return a;
    },
    //摄像头调用模式
    //20170306增加dateFormat、fontSize
    //20161128增加recordUserInfo、recordAddress
    camera: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            mode: "photo",   //模式，包括photo和video
            returnType: "0",  //photo参数，返回类型
            maxSize: 500,   //photo参数，照片压缩到的最大大小，单位KB（0表示不限制）
            recordGPS: false,   //photo参数，是否记录GPS信息，需打开GPS权限
            recordDate: false,   //photo参数，是否记录拍照时间，取服务器时间，需实时联网
            recordUserInfo: false,   //photo参数，是否记录拍照者姓名和id
            recordAddress: false,   //photo参数，是否记录拍照地理位置
            dateFormat: "yyyy-MM-dd",   //photo参数，记录的时间格式
            fontSize: "S",   //photo参数，记录的时间格式
            maxTime: 600,    //video参数，视频录制的最长拍摄时间，单位秒（0表示不限制）
            orientation: "",  //photo参数, 限制照片方向
            crop: false,
            enhanceMode: ""  //photo参数, 图片增强模式
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=camera',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
                    '&mode=', cfg.mode,
                    '&returnType=', cfg.returnType,
                    '&maxSize=', cfg.maxSize,
                    '&recordGPS=', cfg.recordGPS,
                    '&recordDate=', cfg.recordDate,
                    '&recordUserInfo=', cfg.recordUserInfo,
                    '&recordAddress=', cfg.recordAddress,
                    '&dateFormat=', cfg.dateFormat,
                    '&fontSize=', cfg.fontSize,
                    '&maxTime=', cfg.maxTime,
                    '&orientation=', cfg.orientation,
                    '&crop=', cfg.crop,
                    '&enhanceMode=', cfg.enhanceMode].join('');
        window.location = uri;
    },
    //一事通自定义摄像头，支持品管、连拍、压缩等功能，只支持拍照
    //20170306增加dateFormat、fontSize
    //20161128增加recordUserInfo、recordAddress
    cameraYst: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            mode: "photo",
            returnType: "0",
            text: "提示文字",
            start: 0,
            end: 100,
            maxSize: 500,
            recordGPS: false,   //photo参数，是否记录GPS信息，需打开GPS权限
            recordDate: false,   //photo参数，是否记录拍照时间，取服务器时间，需实时联网
            recordUserInfo: false,   //photo参数，是否记录拍照者姓名和id
            recordAddress: false,   //photo参数，是否记录拍照地理位置
            dateFormat: "yyyy-MM-dd",   //photo参数，记录的时间格式
            fontSize: "S",   //photo参数，记录的字体大小
            maxTime: 600,    //video参数，视频录制的最长拍摄时间，单位秒（0表示不限制）
            orientation: "",  //photo参数, 限制照片方向
            crop: false,
            enhanceMode: ""  //photo参数, 图片增强模式
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=cameraYst',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
                    '&mode=', cfg.mode,
                    '&returnType=', cfg.returnType,
                    '&text=', encodeURIComponent(cfg.text),
                    '&start=', cfg.start,
                    '&end=', cfg.end,
                    '&maxSize=', cfg.maxSize,
                    '&recordGPS=', cfg.recordGPS,
                    '&recordDate=', cfg.recordDate,
                    '&recordUserInfo=', cfg.recordUserInfo,
                    '&recordAddress=', cfg.recordAddress,
                    '&dateFormat=', cfg.dateFormat,
                    '&fontSize=', cfg.fontSize,
                    '&maxTime=', cfg.maxTime,
                    '&orientation=', cfg.orientation,
                    '&crop=', cfg.crop,
                    '&enhanceMode=', cfg.enhanceMode].join('');
        window.location = uri;
    },

    //获取文件-20160811增加source：0/1
    queryFile: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            source: "",
            id: "",
            returnType: "1"
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=queryFile',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&id=', encodeURIComponent(cfg.id),
					'&source=', cfg.source,
					'&returnType=', cfg.returnType].join('');
        window.location = uri;
    },
    //上传文件-20160526
    uploadFile: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            data: []
        }
        var cfg = this.extend(defaultOption, option);
        var dataStr = JSON.stringify(cfg.data);
        var uri = ['ystMO:///?schema=uploadFile',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&data=', encodeURIComponent(dataStr)].join('');
        window.location = uri;
    },
    //下载文件-20160301
    downloadFile: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            fileName: "",    //version=1时的参数
            fileUrl: "",    //version=1时的参数
            fileSize: "",    //version=1时的参数
            fileHash: "",    //version=1时的参数
            data: []    //version=2时的参数
        }
        var cfg = this.extend(defaultOption, option);
        if (cfg.version == "1") {
            var uri = ['ystMO:///?schema=downloadFile',
                        '&version=', cfg.version,
                        '&callback=', cfg.callback,
                        '&asyncData=', encodeURIComponent(cfg.asyncData),
                        '&fileName=', encodeURIComponent(cfg.fileName),
                        '&fileUrl=', encodeURIComponent(cfg.fileUrl),
                        '&fileSize=', cfg.fileSize,
                        '&fileHash=', cfg.fileHash].join('');
            window.location = uri;
        }
        else if (cfg.version == "2") {
            var dataStr = JSON.stringify(cfg.data);
            var uri = ['ystMO:///?schema=downloadFile',
                        '&version=', cfg.version,
                        '&callback=', cfg.callback,
                        '&asyncData=', encodeURIComponent(cfg.asyncData),
                        '&data=', encodeURIComponent(dataStr)].join('');
            window.location = uri;
        }
    },
    //删除文件
    deleteFile: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            //			mode: "photo",
            id: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=deleteFile',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
//					'&mode=', cfg.mode,
					'&id=', cfg.id].join('');
        window.location = uri;
    },
    //预览文件20160704
    previewFile: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            id: "",
            data: [],
            curIndex: 0
        }
        var cfg = this.extend(defaultOption, option);
        if (cfg.version == "1") {
            var uri = ['ystMO:///?schema=previewFile',
                        '&version=', cfg.version,
                        '&callback=', cfg.callback,
                        '&asyncData=', encodeURIComponent(cfg.asyncData),
                        '&id=', cfg.id].join('');
            window.location = uri;
        }
        else if (cfg.version == "2") {
            var dataStr = JSON.stringify(cfg.data);
            var uri = ['ystMO:///?schema=previewFile',
                        '&version=', cfg.version,
                        '&callback=', cfg.callback,
                        '&asyncData=', encodeURIComponent(cfg.asyncData),
                        '&curIndex=', cfg.curIndex,
                        '&data=', encodeURIComponent(dataStr)].join('');
            window.location = uri;
        }
    },
    //20180308增加showDownloadFile
    //文件选择器
    fileSelector: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            type: "",   //photo/video/audio/document/other，默认为空，即列出所有文件，按时间倒序
            maxCount: 1,
            showDownloadFile: true
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=fileSelector',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&type=', cfg.type,
					'&maxCount=', cfg.maxCount,
                    '&showDownloadFile=', cfg.showDownloadFile].join('');
        window.location = uri;
    },
    //获取GPS信息
    getGpsInfo: function (option) {
        var defaultOption = {
            version: "1",
            type: "0",
            callback: {},
            asyncData: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=getGpsInfo',
					'&version=', cfg.version,
					'&type=', cfg.type,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData)].join('');
        window.location = uri;
    },

    //获取位置信息
    getLocationInfo: function (option) {
        var defaultOption = {
            version: "1",
            level: "18",
            callback: {},
            asyncData: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=getLocationInfo',
					'&version=', cfg.version,
                    '&level=', cfg.level,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData)].join('');
        window.location = uri;
    },

    //获取登录用户信息
    getUserInfo: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=getUserInfo',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData)].join('');
        window.location = uri;
    },

    //获取设备信息
    getDeviceInfo: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=getDeviceInfo',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData)].join('');
        window.location = uri;
    },

    //设置是否锁定屏幕
    setIdleTimer: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            disable: "false"
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=setIdleTimer',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&disable=', cfg.disable].join('');
        window.location = uri;
    },


    //* 2018/3/15 yhy 新增扫描枪扫描docScan
    //扫描枪扫描
    docScan: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            operate: "connect"
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=docScan',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
                    '&operate=', cfg.operate].join('');
        window.location = uri;
    },

    //读取条形码/二维码信息
    getCode: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            mode: "multCode"
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=getCode',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
                    '&mode=', cfg.mode].join('');
        window.location = uri;
    },

    //扫描身份证
    scanIDCard: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            maxSize: 0   //扫描后的图片最大大小限制，单位KB，默认为0不限制
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=scanIDCard',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
                    '&maxSize=', cfg.maxSize].join('');
        window.location = uri;
    },

    //人脸识别
    faceRecognition: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            cameraType: "0",   //默认前置摄像头
            faceType: "0",   //识别模式，默认活体检测
            keyNum: 0   //关键数字
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=faceRecognition',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
                    '&cameraType=', cfg.cameraType,
                    '&faceType=', cfg.faceType,
                    '&keyNum=', cfg.keyNum].join('');
        window.location = uri;
    },

    //地址本选择器
    addressBook: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            mode: "user",
            rootOrgId: "100001",
            rootOrgName: "招商银行",
            selected: [],
            maxCount: "20"
        }
        var cfg = this.extend(defaultOption, option);
        var selectedStr = JSON.stringify(cfg.selected);
        var uri = ['ystMO:///?schema=addressBook',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&mode=', cfg.mode,
					'&rootOrgId=', cfg.rootOrgId,
					'&rootOrgName=', cfg.rootOrgName,
					'&selected=', encodeURIComponent(selectedStr),
					'&maxCount=', cfg.maxCount].join('');
        window.location = uri;
    },

    //本机通讯录选择器
    contactBook: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            maxCount: "1"
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=contactBook',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&maxCount=', cfg.maxCount].join('');
        window.location = uri;
    },

    //2018/3/12 yhy 新增接口手机通讯录选择器phoneSelector
    //手机通讯录选择器
    phoneSelector: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=phoneSelector',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData)].join('');
        window.location = uri;
    },

    //打开url文件
    openUrl: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            id: "",
            webType: "",
            title: "",
            url: "",
            webToolBar: "",
            webNavBar: "",
            webOrientation: "",
            query: {},
            hash: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=openUrl',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&id=', cfg.id,
					'&webType=', cfg.webType,
					'&title=', encodeURIComponent(cfg.title),
					'&url=', encodeURIComponent(cfg.url),
					'&webToolBar=', cfg.webToolBar,
					'&webNavBar=', cfg.webNavBar,
					'&webOrientation=', cfg.webOrientation,
                    '&query=', encodeURIComponent(JSON.stringify(cfg.query)),
                    '&hash=', encodeURIComponent(cfg.hash)].join('');
        window.location = uri;
    },

    //新建日程
    newSchedule: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            ref: "",
            subject: "",
            place: "",
            body: "",
            start: "",
            end: "",
            refId: "",  // 来源系统关联ID
            pcUrl: "",  // 来源系统PC端关联URL
            moUrl: "",  // 来源系统移动端关联URL
        }
        var cfg = this.extend(defaultOption, option);
        if (cfg.subject.length > 50)
            cfg.subject = cfg.subject.substring(0, 50);
        if (cfg.place.length > 50)
            cfg.place = cfg.place.substring(0, 50);
        if (cfg.body.length > 50)
            cfg.body = cfg.body.substring(0, 50);
        var query = {
            ref: cfg.ref,
            subject: cfg.subject,
            place: cfg.place,
            body: cfg.body,
            start: cfg.start,
            end: cfg.end,
            refId: cfg.refId,  // 来源系统关联ID
            pcUrl: cfg.pcUrl,  // 来源系统PC端关联URL
            moUrl: cfg.moUrl,  // 来源系统移动端关联URL
        }
        /**
        var uri = ['ystMO:///?schema=newSchedule',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
                    '&query=', encodeURIComponent(JSON.stringify(query))].join('');
        **/

        MobileJS.openUrl({
            version: cfg.version,
            callback: cfg.callback,
            asyncData: encodeURIComponent(cfg.asyncData),
            id: "QUICK2",
            query: query
        });
    },

    //新建邮件
    newEmail: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            toNames: "",
            toAddrs: "",
            ccNames: "",
            ccAddrs: "",
            bccNames: "",
            bccAddrs: "",
            subject: "",
            content: ""
        }
        var cfg = this.extend(defaultOption, option);
        var mailOption = {
            toNames: cfg.toNames,
            toAddrs: cfg.toAddrs,
            ccNames: cfg.ccNames,
            ccAddrs: cfg.ccAddrs,
            bccNames: cfg.bccNames,
            bccAddrs: cfg.bccAddrs,
            subject: cfg.subject,
            content: cfg.content
        }

        var hash = 'jstr=' + JSON.stringify(mailOption)
        /**
        var uri = ['ystMO:///?schema=newEmail',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&hash=', encodeURIComponent(hash)].join('');
        **/

        MobileJS.openUrl({
            version: cfg.version,
            callback: cfg.callback,
            asyncData: encodeURIComponent(cfg.asyncData),
            id: "0003",
            hash: hash
        });
    },

    //退出系统
    quitSys: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=quitSys',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData)].join('');
        window.location = uri;
    },
    //二次校验手势密码
    checkGesturePwd: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            timeOut: 0
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=checkGesturePwd',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
                    '&timeOut=', cfg.timeOut].join('');
        window.location = uri;
    },
    //锁定屏幕
    lockScreen: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=lockScreen',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData)].join('');
        window.location = uri;
    },
    //操作导航栏
    navigationBar: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            hidden: "Y",
            animate: "Y"
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=navigationBar',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&hidden=', cfg.hidden,
					'&animate=', cfg.animate].join('');
        window.location = uri;
    },
    //操作网页水印
    webWaterMark: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            hidden: "Y"
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=webWaterMark',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&hidden=', cfg.hidden].join('');
        window.location = uri;
    },
    //复制文本到剪贴板
    copyText: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            text: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=copyText',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&text=', encodeURIComponent(cfg.text)].join('');
        window.location = uri;
    },
    //2018/3/20 yhy 新增控制打印机打印printer
    //复制文本到剪贴板
    printer: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            ipAddress: "",
            ipPort: "",
            text: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=printer',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
                    '&ipAddress=', cfg.ipAddress,
                    '&ipPort=', cfg.ipPort,
					'&text=', encodeURIComponent(cfg.text)].join('');
        window.location = uri;
    },
    //查看用户详情
    showContactsUserInfo: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            id: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=showContactsUserInfo',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&id=', cfg.id].join('');
        window.location = uri;
    },
    //录音
    audioRecord: function (option) {
        var defaulOption = {
            version: "1",
            callback: {},
            asyncData: ""
        }
        var cfg = this.extend(defaulOption, option);
        var uri = ['ystMO:///?schema=audioRecord',
                   '&version=', cfg.version,
                   '&callback=', cfg.callback,
                   '&asyncData=', encodeURIComponent(cfg.asyncData)].join('');
        window.location = uri;
    },
    //签名
    signPicture: function (option) {
        var defaulOption = {
            version: "1",
            callback: {},
            asyncData: "",
            originImageUrl: "",
            left: "",
            top: "",
            right: "",
            bottom: "",
            maxSize: 0,   //签名后图片压缩到的最大大小，单位KB（0表示不限制）
        }
        var cfg = this.extend(defaulOption, option);
        var uri = ['ystMO:///?schema=signPicture',
                   '&version=', cfg.version,
                   '&callback=', cfg.callback,
                   '&asyncData=', encodeURIComponent(cfg.asyncData),
                   '&left=', cfg.left,
                   '&top=', cfg.top,
                   '&right=', cfg.right,
                   '&bottom=', cfg.bottom,
                   '&originImageUrl=', encodeURIComponent(cfg.originImageUrl),
                   '&maxSize=', cfg.maxSize].join('');
        window.location = uri;
    },
    //通过一事通id唤起招乎单人聊天
    singleChat: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            id: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=singleChat',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&id=', cfg.id].join('');
        window.location = uri;
    },

    //通过群聊id唤起招乎群聊界面
    groupChat: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            groupId: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=groupChat',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&groupId=', cfg.groupId].join('');
        window.location = uri;
    },

    //通过一事通id和SapId唤起招乎群聊界面
    createGroup: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            groupName: "",
            groupMember: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=createGroup',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&groupName=', encodeURIComponent(cfg.groupName),
					'&groupMember=', cfg.groupMember].join('');
        window.location = uri;
    },
    //调用招呼视频播放
    openZHVideo: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            liveId: "",
            mediaType: 0,
            token: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=openZHVideo',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&liveId=', cfg.liveId,
                    '&mediaType=', cfg.mediaType,
                    '&token=', cfg.token].join('');
        window.location = uri;
    },
    //分享url链接到招乎
    shareUrlToZH: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            title: "",//标题（必填）
            subject: "",//摘要（可空）
            image: "",//base64缩略图数据，（可空，使用默认图片）
            url: ""//url或CMBMobileOA协议（必填）

        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=shareUrlToZH',
					'&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
					'&title=', encodeURIComponent(cfg.title),
					'&subject=', encodeURIComponent(cfg.subject),
					'&image=', cfg.image,
					'&url=', encodeURIComponent(cfg.url)].join('');
        window.location = uri;
    },
    //分享到微信
    shareToWeChat: function (option) {
        var defaulOption = {
            version: "1",
            callback: {},
            asyncData: "",
            imageUrl: "",
            title: "",
            description: "",
            url: "",
            scene: "1"
        }
        var cfg = this.extend(defaulOption, option);
        var uri = ['ystMO:///?schema=shareToWeChat',
                   '&version=', cfg.version,
                   '&callback=', cfg.callback,
                   '&asyncData=', encodeURIComponent(cfg.asyncData),
                   '&imageUrl=', encodeURIComponent(cfg.imageUrl),
                   '&title=', encodeURIComponent(cfg.title),
                   '&description=', encodeURIComponent(cfg.description),
                   '&url=', encodeURIComponent(cfg.url),
                   '&scene=', encodeURIComponent(cfg.scene)].join('');
        window.location = uri;
    },
    //添加或移除工作台系统，配合checkHomeItemAdded使用
    addOrRemoveHomeItem: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            sysId: "",
            operation: "",
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=addOrRemoveHomeItem',
                    '&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
                    '&sysId=', cfg.sysId,
                    '&operation=', cfg.operation].join('');
        window.location = uri;
    },
    //检查工作台是否存在某系统
    checkHomeItemAdded: function (option) {
        var defaultOption = {
            version: "1",
            callback: {},
            asyncData: "",
            sysId: ""
        }
        var cfg = this.extend(defaultOption, option);
        var uri = ['ystMO:///?schema=checkHomeItemAdded',
                    '&version=', cfg.version,
                    '&callback=', cfg.callback,
                    '&asyncData=', encodeURIComponent(cfg.asyncData),
                    '&sysId=', cfg.sysId].join('');
        window.location = uri;
    }
}
// window.MobileJS = MobileJS;
// export default MobileJS;