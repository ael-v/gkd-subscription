import { defineGkdApp } from '@gkd-kit/define';

// 懂球帝
// 提炼自 AIsouler/GKD_subscription(该仓库已停止维护)
export default defineGkdApp({
  id: 'com.dongqiudi.news',
  name: '懂球帝',
  groups: [
    {
      key: 0,
      name: '开屏广告',
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      actionMaximumKey: 0,
      priorityTime: 10000,
      rules: [
        {
          // 点击方式为 clickNode 时会误触广告,更改点击方式为 clickCenter
          key: 0,
          fastQuery: true,
          action: 'clickCenter',
          matches:
            '[text*="跳过"][text.length<10][width<500 && height<300][visibleToUser=true]',
          exampleUrls: 'https://e.gkd.li/74db13f0-d87d-41a3-bbbb-1b075d8ae7d6',
          snapshotUrls: 'https://i.gkd.li/i/20218520',
        },
        {
          key: 1,
          fastQuery: true,
          matches:
            '@View[clickable=true] - [text="互动广告"][visibleToUser=true]',
          exampleUrls: 'https://e.gkd.li/3b636c88-23de-4e2a-86fd-2846a0f0274b',
          snapshotUrls: 'https://i.gkd.li/i/20262129',
        },
        {
          key: 2,
          fastQuery: true,
          anyMatches: [
            '@View[text=null][clickable=true][childCount=0][visibleToUser=true][width<200&&height<200] +(1,2) TextView[index=parent.childCount.minus(1)][childCount=0] <n FrameLayout[childCount>2][text=null][desc=null] >(n+6) [text*="第三方应用" || text*="扭动手机" || text*="点击或上滑" || text*="省钱好物" || text*="扭一扭"][visibleToUser=true]',
            'FrameLayout > FrameLayout[childCount>2][text=null][desc=null] > @View[text=null][clickable=true][childCount=0][visibleToUser=true][width<200&&height<200] +(1,2) TextView[index=parent.childCount.minus(1)][childCount=0][visibleToUser=true]',
          ],
          exampleUrls: 'https://e.gkd.li/940ce4e2-da5f-4a43-b319-4131a22cb1e0',
          snapshotUrls: 'https://i.gkd.li/i/20262130',
        },
      ],
    },
    {
      key: 2,
      name: '更新提示',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          activityIds: '.DownloadActivity',
          matches: 'TextView[text*="新版本"] +3 TextView[text="下次提醒"]',
          snapshotUrls: 'https://i.gkd.li/i/12620586',
        },
      ],
    },
    {
      key: 4,
      name: '分段广告-首页信息流广告',
      desc: '点击卡片广告x关闭按钮-关闭反馈理由弹窗',
      activityIds: 'com.dongqiudi.news.MainActivity',
      fastQuery: true,
      rules: [
        {
          preKeys: [1, 2],
          name: '首页信息流广告-反馈理由',
          matches:
            'TextView[text="诱导点击"][id="com.dongqiudi.news:id/text_item"]',
          snapshotUrls: 'https://i.gkd.li/i/12620656',
        },
        {
          key: 1,
          matches:
            'TextView[id="com.dongqiudi.news:id/ads_label"] +(n) ImageView[id="com.dongqiudi.news:id/feedback_close"]',
          snapshotUrls: 'https://i.gkd.li/i/12620654',
        },
        {
          key: 2,
          matches:
            'TextView[id="com.dongqiudi.news:id/ads_title"] +(2) RelativeLayout > ImageView[id="com.dongqiudi.news:id/feedback_close"]',
          snapshotUrls: 'https://i.gkd.li/i/12620788',
        },
        {
          // 模板-优量汇视频广告(首页),本地快照 1795394917814(懂球帝 8.7.5):
          // ads_download_close[1147,1455,1218,1526] 是 ads_download"点击下载"的相邻兄弟
          key: 3,
          name: '点击广告卡片右下角x(视频广告)',
          matches:
            'TextView[id="com.dongqiudi.news:id/ads_download"] + ImageView[id="com.dongqiudi.news:id/ads_download_close"]',
        },
      ],
    },
    {
      key: 5,
      name: '全屏广告-弹窗广告',
      desc: '点击关闭',
      rules: [
        {
          key: 0,
          fastQuery: true,
          matchTime: 10000,
          actionMaximum: 1,
          resetMatch: 'app',
          activityIds: 'com.dongqiudi.news.MainActivity',
          matches: '[id="com.dongqiudi.news:id/iv_close"]',
          snapshotUrls: 'https://i.gkd.li/i/13260467',
        },
        {
          key: 1,
          activityIds:
            'com.bytedance.sdk.openadsdk.stub.activity.Stub_Standard_Portrait_Activity',
          matches:
            '[text="反馈"] +(1,2) View[childCount=1] > Image[childCount=0][text=""][width<60 && height<60]',
          exampleUrls: 'https://e.gkd.li/87e47cae-fa83-4d25-879c-728a1519ee55',
          snapshotUrls: 'https://i.gkd.li/i/20403710',
        },
        {
          // 汇量 Windmill SDK 插屏广告,本地快照 1795586517165(懂球帝 8.7.5):
          // StubActivityStandard_TL_Portrait 右上角 [跳过｜4]
          // activityIds 用前缀匹配,覆盖该 SDK 的所有 StubActivity 变体
          key: 2,
          name: '汇量SDK插屏-点击[跳过]',
          fastQuery: true,
          actionMaximum: 1,
          activityIds: 'com.windmill.sdk.host.stub.',
          matches:
            '[id="com.windmill.sdk.core:id/tobid_interstitial_skip_ll"][clickable=true]',
        },
      ],
    },
    {
      key: 8,
      name: '全屏广告-数据页弹窗广告',
      actionMaximum: 1,
      resetMatch: 'app',
      activityIds: 'com.dongqiudi.news.MainActivity',
      rules: [
        {
          key: 1,
          name: '腾讯广告SDK',
          fastQuery: true,
          matches:
            '@ImageView[childCount=0][text=null][desc=null][id=null][visibleToUser=true][width<90 && height<90] < FrameLayout[childCount=1][text=null][desc=null][id=null][parent.childCount>3] <n FrameLayout >(2,3) [text^="立即" || text$="详情" || text^="了解" || text="去微信看看" || text$="应用" || text="进入小程序" || text="领取优惠" || text="跳转微信"]',
          snapshotUrls: 'https://i.gkd.li/i/13626900',
        },
        {
          key: 2,
          name: '快手广告磁力智投SDK',
          fastQuery: true,
          matches:
            'ImageView[childCount=0][text=null] < @ViewGroup[childCount=1][clickable=true][visibleToUser=true] < ViewGroup +n ViewGroup[childCount=2] > [text="广告"]',
          snapshotUrls: 'https://i.gkd.li/i/13627105',
        },
        {
          key: 3,
          name: '字节广告穿山甲SDK-1',
          matches: 'View[text="反馈"] -2 @View > Image',
          snapshotUrls: 'https://i.gkd.li/i/13627106',
        },
        {
          key: 4,
          name: '字节广告穿山甲SDK-2', //合并key3
          matches: 'FrameLayout[desc^="webview-close"] > View[clickable=true]',
          snapshotUrls: 'https://i.gkd.li/i/12620588',
        },
      ],
    },
    {
      key: 9,
      name: '权限提示-通知权限',
      desc: '点击关闭',
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          fastQuery: true,
          activityIds: '.MainActivity',
          matches: '[vid="notification_button_close"][visibleToUser=true]',
          exampleUrls: 'https://e.gkd.li/81cea4de-9288-4ec8-97ea-7c4a9b19fd08',
          snapshotUrls: 'https://i.gkd.li/i/19666282',
        },
      ],
    },
    {
      key: 10,
      name: '分段广告-帖子详情页信息流广告',
      desc: '点击广告卡片右下角x关闭-关闭反馈理由弹窗',
      // 三条规则的锚点(feedback_close/诱导点击/ads_download_close)均快查兼容,
      // 关闭 fastQuery 会导致慢查询 5-10 秒才响应
      // ScorePlayerCommentActivity(球员评分评论页)同样是信息流广告卡片,
      // 本地快照 1795394905235: ads_download_close[1159,1889,1222,1952]
      activityIds: [
        'com.dongqiudi.news.NewsDetailActivity',
        'com.dongqiudi.news.ScorePlayerCommentActivity',
      ],
      fastQuery: true,
      rules: [
        {
          // 模板1-图文广告,本地快照 1795241661737 / 1795243708797(懂球帝 8.7.5):
          // feedback_close 是 ads_common_bottom_container 的直接子节点
          // 该容器有两种变体: 带 ads_label"广告"文字 / 换成 d_plus_options 会员推广,
          // 因此用容器而非 ads_label 作锚点
          key: 0,
          name: '点击广告卡片右下角x(图文广告)',
          matches:
            'RelativeLayout[id="com.dongqiudi.news:id/ads_common_bottom_container"] > ImageView[id="com.dongqiudi.news:id/feedback_close"]',
        },
        {
          // 关闭广告后弹出的举报/反馈理由弹窗,本地快照 1795243503808(懂球帝 8.7.5):
          // 底部弹窗 content_view 内同时有 d_plus_options(会员推广)和 recycler_view(理由九宫格),
          // 选择"诱导点击"提交反馈并移除广告卡片
          // 注意: 不要用 preKeys 依赖上一条规则,弹窗内容异步加载可能超出"刚刚执行"的时间窗
          // 用 d_plus_options 锚定广告反馈弹窗,避免误触普通举报弹窗
          key: 1,
          name: '关闭反馈理由弹窗',
          matches:
            '[vid="d_plus_options"] +(n) GridView[id="com.dongqiudi.news:id/recycler_view"] > TextView[text="诱导点击"][clickable=true]',
        },
        {
          // 模板2-优量汇视频广告,本地快照 1795243165826(懂球帝 8.7.5):
          // ad_layout > adBox > adView > ... > ads_download_bottom_container
          // ads_download_close[1147,2048,1218,2119] 是 ads_download 的相邻兄弟
          key: 2,
          name: '点击广告卡片右下角x(视频广告)',
          matches:
            'TextView[id="com.dongqiudi.news:id/ads_download"] + ImageView[id="com.dongqiudi.news:id/ads_download_close"]',
        },
      ],
    },
  ],
});
