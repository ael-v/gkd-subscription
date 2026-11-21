# GKD 自用订阅

个人自用的 GKD 规则订阅,基于官方 [subscription-template](https://github.com/gkd-kit/subscription-template) 构建。

## 订阅链接

```txt
https://raw.githubusercontent.com/<username>/gkd-subscription/main/dist/gkd.json5
```

大陆镜像加速:

```txt
https://fastly.jsdelivr.net/gh/<username>/gkd-subscription@main/dist/gkd.json5
```

## 规则内容

- 全局规则:开屏广告-全局、更新提示-全局、青少年模式-全局(防误触黑白名单见 `src/globalDefaultApps.ts`)
- 应用规则:`src/apps/` 下按包名分文件(当前:懂球帝)

## 如何修改

1. 环境:`D:\CChaha\tools\nodejs`(Node v24)+ pnpm,依赖安装用镜像:
   ```sh
   pnpm install --registry=https://registry.npmmirror.com
   ```
2. 加新 app:在 `src/apps/` 新建 `包名.ts`(参考懂球帝文件)
3. 误触:把包名加进 `src/globalDefaultApps.ts` 对应黑名单
4. 校验与构建:
   ```sh
   pnpm run check   # 校验规则格式
   pnpm run build   # 生成 dist/gkd.json5
   ```
5. 推送后手动运行 Actions 里的 `build_release` 工作流即可发布更新
