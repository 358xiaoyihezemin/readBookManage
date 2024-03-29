const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx80ca612b9abd0690',

    // 微信小程序 App Secret
    appSecret: '8567e558e8d0750ddba2f659f3f9f0f3',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        // pass: 'Hzm08854',
        pass: 'wx80ca612b9abd0690',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh',
    // serverHost: 'localhost',
    // tunnelServerUrl: '',
    // tunnelSignatureKey:'27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // qcloudAppId: '1256885042',
    // qcloudSecretId: 'AKIDZx62lGTdVDiz2sv2MXWHpCMPL2Vn5mW5',
    // qcloudSecretKey: 'TloeFgxyynQr68vUoumQpzvd7MM6aomW',
    // wxMessageToken: 'weixinmsgtoken',
    // networkTimeout: 30000
}

module.exports = CONF
