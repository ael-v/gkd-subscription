import { defineGkdApp } from '@gkd-kit/define';

// 酷安
// 快照依据: 本地快照 1795257622218(酷安 16.7.3, FeedDetailActivityV8)
export default defineGkdApp({
  id: 'com.coolapk.market',
  name: '酷安',
  groups: [
    {
      key: 0,
      name: '局部广告-动态详情页信息流广告',
      desc: '点击广告卡片右上角[关闭]',
      // 广告卡结构: coolapk_card_view > item_view > ... > close_view(desc=关闭)
      // 用 coolapk_card_view 锚定,避免误触其他页面中同名的 close_view
      activityIds: 'com.coolapk.market.view.feed.FeedDetailActivityV8',
      fastQuery: true,
      rules: [
        {
          key: 0,
          matches:
            '@ImageView[vid="close_view"] <<n FrameLayout[vid="coolapk_card_view"]',
        },
      ],
    },
  ],
});
