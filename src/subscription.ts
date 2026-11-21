import { defineGkdSubscription } from '@gkd-kit/define';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups, { OPEN_AD_ORDER } from './globalGroups';
import { RawApp, RawAppGroup } from '@gkd-kit/api';

// 自用 GKD 订阅
//
// ⚠️ id 字段必须保持唯一(较大的随机数),与其他订阅冲突会导致规则互相干扰
// 修改 name/author/supportUri 即可自定义订阅信息

const apps = await batchImportApps(`${import.meta.dirname}/apps`);
const rawApps: RawApp[] = [];
apps.forEach((appConfig) => {
  appConfig.groups?.forEach((g: RawAppGroup) => {
    // 所有"开屏广告"组统一设最高优先级,保证进入 app 时最先执行
    if (g.name.startsWith('开屏广告')) {
      g.order = OPEN_AD_ORDER;
    }
  });
  rawApps.push(appConfig);
});

export default defineGkdSubscription({
  id: 38429,
  name: '自用订阅',
  version: 0,
  author: 'CChaha',
  checkUpdateUrl: './gkd.version.json5',
  supportUri: '',
  categories,
  globalGroups,
  apps: rawApps,
});
