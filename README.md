## 简介

将数据库导出的表设计数据转成对应的model文件。

## 关联仓库
· react-admin: https://github.com/southliu/react-admin

## 案例
将src/data.txt对应数据生成到dist/model.tsx。<br>
src/data.txt数据结构：
```
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `name` varchar(64) DEFAULT '' COMMENT '名称',
```