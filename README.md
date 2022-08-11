# zheqi-template

1. auto import
2. vitest + cypress
3. i18n + unocss
4. 如果你写过nuxt3那么一定很熟悉这套写法

antfu的vitesse还是太重了，然后eslint-config我不太喜欢
这个不是ssg而是spa应用
去掉了docker镜像和netlify配置文件
去掉了markdown解析和.idetorconfig文件，更好的支持eslint，建议同步设置里的prettier设置以获得更好的eslint支持
取消末尾分号，对象结尾逗号等等prettier默认配置，或者额外添加.prettierrc文件进行配置
