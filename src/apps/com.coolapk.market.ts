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
