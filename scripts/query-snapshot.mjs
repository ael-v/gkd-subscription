// 本地验证选择器:用官方 @gkd-kit/selector 引擎在 GKD 快照 json 上执行查询
//
// 用法:
//   node scripts/query-snapshot.mjs <快照.json> <选择器>
// 示例:
//   node scripts/query-snapshot.mjs ./snapshot.json 'TextView[vid="ads_label"] +(n) ImageView[vid="feedback_close"]'
//
// 快照 json 来自 GKD 导出的 zip(解压后的 <时间戳>.json)
import { Selector, Transform, MatchOption } from '@gkd-kit/selector';
import { readFileSync } from 'node:fs';

const [snapPath, selectorStr] = process.argv.slice(2);
if (!snapPath || !selectorStr) {
  console.error(
    'usage: node scripts/query-snapshot.mjs <snapshot.json> <selector>',
  );
  process.exit(1);
}

const snap = JSON.parse(readFileSync(snapPath, 'utf8'));
const nodes = snap.nodes;
const byId = new Map(nodes.map((n) => [n.id, n]));
const children = new Map();
for (const n of nodes) {
  if (!children.has(n.pid)) children.set(n.pid, []);
  children.get(n.pid).push(n);
}
const root = byId.get(0);

// 引擎有时传入 QueryContext 包装对象,统一解包成原始节点
const unwrap = (x) => {
  while (x && typeof x === 'object' && !('attr' in x) && 'current' in x) {
    x = x.current;
  }
  return x;
};

const transform = Transform.Companion.multiplatformBuild(
  (raw, key) => {
    const node = unwrap(raw);
    if (node == null) return null;
    if (typeof node === 'string') return key === 'length' ? node.length : null;
    if (typeof node === 'number' || typeof node === 'boolean') return null;
    const v = node.attr?.[key];
    return v === undefined ? null : v;
  },
  // 方法调用,如 childCount.minus(1)
  (raw, name, args) => {
    const node = unwrap(raw);
    const first = Number(args?.get ? args.get(0) : args?.[0]);
    if (typeof node === 'number') {
      if (name === 'minus') return node - first;
      if (name === 'plus') return node + first;
    }
    return null;
  },
  (raw) => unwrap(raw)?.attr?.name ?? null,
  (raw) => children.get(unwrap(raw)?.id) ?? [],
  (raw) => {
    const node = unwrap(raw);
    return node && node.pid !== -1 ? (byId.get(node.pid) ?? null) : null;
  },
);

const selector = Selector.Companion.parse(selectorStr);
const option = new MatchOption(false); // false = 完整树查询;fastQuery 快查由设备端执行
const results = transform.querySelectorAllArray(root, selector, option);

console.log(`snapshot: ${snap.appId} / ${snap.activityId}`);
console.log(`selector: ${selectorStr}`);
console.log(`fastQuery 可快查: ${!selector.isSlow(new MatchOption(true))}`);
console.log(`matched ${results.length} node(s)`);
for (const r of results) {
  const a = r.attr;
  console.log(
    `  -> id=${r.id} ${a.name?.split('.').pop()} vid=${a.vid ?? ''} text=${(a.text ?? '').slice(0, 30)} [${a.left},${a.top},${a.right},${a.bottom}]`,
  );
}
