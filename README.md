# 通用图灵机

[点击浏览通用图灵机](https://wjbfks.github.io/UniversalTuringMachine/Web-UTM.html)

### 文件说明

###### Sourse

> 包含UniversalTuringMachine.html网页源代码
>
> 包含style.css样式表源代码
>
> 包含UTM.js脚本文件源代码
>
> 包含jQuery源代码（此为[外部库](https://code.jquery.com/jquery-3.5.1.min.js)）
>
> 将该文件下载下来后可以直接点击html文件本地运行
>
> html文件本地运行会调用本地css和js文件夹中的文件
>
> html文件本地运行完全不需要联网

###### rules

> 该文件包含三套预制规则
>
> 分别为：![0^n1^n](http://latex.codecogs.com/svg.latex?0^n1^n\)、![log_2n](http://latex.codecogs.com/svg.latex?log_2n\)、![wcw](http://latex.codecogs.com/svg.latex?wcw\)
>
> 可以按以下格式添加自定义规则
>
> 1.文件名必须是以$.txt$结尾的文本文件
>
> 2.每一个状态或字符用空格相隔
>
> 3.第一行表示初始状态和终止状态集合，第一行的第一个参数为初始状态，第二个参数及以后的参数为终止状态集合
>
> 4.除了第一行的每一行都为一条状态转移五元组
>
> 5.五元组为：$状态_{old}$  $字符_{old}$  $状态_{new}$  $字符_{new}$  $方向_{(L/R/S)}$
>
> 6.每一行只能写一个五元组
>
> 7.尽量使用纯英文+数字的文本文件，否则请使用utf-8编码，以免出现乱码
>
> 8.不符合格式的文件导入后可能会导致程序出现不可预料的错误

###### Web-UTM.html

> 该文件下载到本地后可以直接联网运行
>
> 该文件使用的css和js均远程连接到了本仓库中
>
> 使用链接访问可以起到一样的作用
>
> 由于链接会实时更新，因此建议使用链接进行访问
>
> https://wjbfks.github.io/UniversalTuringMachine/Web-UTM.html

## master

最新版本

1.不再支持用户手动调节窗口大小

2.改用rem进行布局，解决PC端适配问题

3.删除了刷新按钮

4.优化了布局和按钮排布

5.改用强制刷新

## V0.1

1.最初版本，拥有基础功能

2.使用px进行布局

3.支持用户手动调节窗口大小

4.但不同设备适配问题比较大，今后版本不再支持用户手动调节窗口大小

## Designed by WJBFks

NEU-CSE
