# 幻梦术力口 wiki 工具

## 简介

利用 [vocaDB](https://vocadb.org) 的数据。

除此之外还放了一些额外功能，比如查看 [billboard](https://www.billboard-japan.com/charts/detail?a=niconico)。尚未完成的小功能而已。

从之前的 Electron 应用 [](https://github.com/SnowDream39/MGP-VS-Tool) 迁移而来。迁移未完成。

## 可能可以优化的地方

歌手名称翻译。

## 关于 STAFF 标注

vocaDB 上的 STAFF 标注有 `categories` 和 `effectiveRoles` 两个字段，这两者要么相同，要么其中一个是 `Default` 或者 `Other`。

如果 `categories` 中包含 `Producer`，那么实际的角色可能会完整标注，也可能省略掉。如果省略了，程序会默认生成“词·曲”，请自行看情况修改。

## 技术

- [Vue](https://cn.vuejs.org) 作为前端框架。
- 日语注音工具是 [kuroshiro](https://kuroshiro.org/README.zh-cn.html)。

把仓库 clone 一份是不能直接使用的，因为 public 文件夹不提供。
