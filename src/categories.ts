import { defineGkdCategories } from '@gkd-kit/define';

// 规则分类:在 GKD 订阅界面的「分类」里可以批量开启某一类规则
// 修改建议:只保留你需要的分类,新增分类时 key 用递增数字即可
export default defineGkdCategories([
  {
    key: 0,
    name: '开屏广告',
    enable: true, // 唯一默认开启的分类
  },
  {
    key: 1,
    name: '青少年模式',
    enable: false,
  },
  {
    key: 2,
    name: '更新提示',
    enable: false,
  },
  {
    key: 3,
    name: '评价提示',
    enable: false,
  },
  {
    key: 4,
    // 软件用于告知用户信息的弹窗,具体表现为公告弹窗一类
    name: '通知提示',
    enable: false,
  },
  {
    key: 5,
    // 各种权限请求,如定位权限、通知权限等
    name: '权限提示',
    enable: false,
  },
  {
    key: 6,
    // 不影响使用的广告, 所有的广告卡片及悬浮广告按钮
    name: '局部广告',
    enable: false,
  },
  {
    key: 7,
    // 不关闭广告就无法进行其他操作的广告弹窗, 它阻碍用户操作
    name: '全屏广告',
    enable: false,
  },
  {
    key: 8,
    // 如微信朋友圈广告/酷安帖子广告/贴吧帖子广告
    // 需要分阶段多步操作才能关闭, 会造成屏幕闪烁, 影响用户体验
    name: '分段广告',
    enable: false,
  },
  {
    key: 9,
    // 非广告, 点击某些功能按钮
    name: '功能类',
    enable: false,
  },
  {
    key: 10,
    // 分类不明确
    name: '其他',
    enable: false,
  },
]);
