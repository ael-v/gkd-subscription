import { defineGkdApp } from '@gkd-kit/define';

// 酷安
// 快照依据:
// - 1795257622218(酷安 16.7.3, FeedDetailActivityV8): 信息流广告卡片
// - 1795258120764: 点击关闭后的反馈菜单(无法关闭/不感兴趣/举报广告/其他问题)
export default defineGkdApp({
  id: 'com.coolapk.market',
  name: '酷安',
  groups: [
    {
      // 来源: AIsouler/GKD_subscription(开屏广告组整体移植)
      key: -1,
      name: '开屏广告',
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      actionMaximumKey: 0,
      priorityTime: 10000,
      excludeActivityIds: [
        '.view.search.', // 在搜索页面禁用
        '.view.feed.', // 在动态页面禁用
        '.view.node.DynamicNodePageActivity',
      ],
      rules: [
        {
          key: 0,
          fastQuery: true,
          anyMatches: [
            '@View[text=null][clickable=true][childCount=0][visibleToUser=true][width<200&&height<200] +(1,2) TextView[index=parent.childCount.minus(1)][childCount=0] <n FrameLayout[childCount>2][text=null][desc=null] >(n+6) [text*="第三方应用" || text*="扭动手机" || text*="点击或上滑" || text*="省钱好物" || text*="扭一扭"][visibleToUser=true]',
            'FrameLayout > FrameLayout[childCount>2][text=null][desc=null] > @View[text=null][clickable=true][childCount=0][visibleToUser=true][width<200&&height<200] +(1,2) TextView[index=parent.childCount.minus(1)][childCount=0][visibleToUser=true]',
          ],
          snapshotUrls: [
            'https://i.gkd.li/i/12503773',
            'https://i.gkd.li/i/13247610',
            'https://i.gkd.li/i/13264779',
            'https://i.gkd.li/i/13826359',
            'https://i.gkd.li/i/13827095',
          ],
        },
        {
          key: 1,
          fastQuery: true,
          matches:
            '[!(id="com.coolapk.market:id/item_view") && !(vid="card_view")] > [text*="跳过"][text.length<10][width<500 && height<300][visibleToUser=true]',
          snapshotUrls: [
            'https://i.gkd.li/i/12917990',
            'https://i.gkd.li/i/13211392',
            'https://i.gkd.li/i/23097140',
          ],
          excludeSnapshotUrls: [
            'https://i.gkd.li/i/13247733',
            'https://i.gkd.li/i/13296816',
            'https://i.gkd.li/i/18245546',
          ],
        },
      ],
    },
    {
      key: 0,
      name: '局部广告-动态详情页信息流广告',
      desc: '点击广告卡片右上角[关闭]-弹出的反馈菜单选择[不感兴趣]',
      // 1. 广告卡结构: coolapk_card_view > item_view > ... > close_view(desc=关闭)
      //    用 coolapk_card_view 锚定,避免误触其他页面中同名的 close_view
      // 2. 反馈菜单是独立弹窗窗口,快照中 activityId 为 null,
      //    因此该规则不能带 activityIds(组级别也无法限定,只能放在规则0上)
      //    菜单结构: ListView > 可点击行 > 文本[不感兴趣],文本 textQf=true 可快查
      fastQuery: true,
      rules: [
        {
          key: 0,
          name: '点击广告卡片右上角[关闭]',
          activityIds: 'com.coolapk.market.view.feed.FeedDetailActivityV8',
          matches:
            '@ImageView[vid="close_view"] <<n FrameLayout[vid="coolapk_card_view"]',
        },
        {
          key: 1,
          name: '反馈菜单选择[不感兴趣]',
          matches: '@[clickable=true] >n [text="不感兴趣"][visibleToUser=true]',
        },
      ],
    },
  ],
});
