# Obsidian 清理未使用图片插件

本插件帮助您保持库的整洁，删除 Markdown 笔记中不再引用的图片。

插件会从所有 Markdown 文档中获取所有图片链接，并将这些图片与库中所有图片文件进行比较。

如果任何图片文件未在库中的任何文档中被引用，它们将被自动删除。

## 设置

### 删除图片的目标位置

请确保在"清理图片设置"选项卡中选择删除图片的目标位置。您有 3 个选项：

<img src="https://github.com/ozntel/oz-clear-unused-images-obsidian/blob/master/images/delete-destination.png?raw=true">

1. **移动到 Obsidian 回收站** - 文件将被移动到 Obsidian 库下的 `.trash` 文件夹。

2. **移动到系统回收站** - 文件将被移动到操作系统的回收站。

3. **永久删除** - 文件将被永久销毁，无法恢复。

### 排除文件夹

您可以排除不想在扫描期间删除图片的文件夹。如果有多个文件夹需要排除，可以用逗号分隔。请确保提供库中的完整路径：

<img src="https://github.com/ozntel/oz-clear-unused-images-obsidian/blob/master/images/excluded-folders.png?raw=true">

您现在可以排除上述文件夹路径下的所有子文件夹：

<img src="https://github.com/ozntel/oz-clear-unused-images-obsidian/blob/master/images/exclude-subfolders.png?raw=true">

## 使用方法

1. 从社区插件中激活插件

2. 您可以：

    - 从插件设置中激活侧边栏图标，然后点击左侧侧边栏的图标运行清理：

    <img src="https://user-images.githubusercontent.com/55187568/118400231-0ceeed80-b661-11eb-9b07-7e22fab02694.png">

    - 或使用侧边栏图标或打开命令面板（使用 `Ctrl/Cmd + P` 或从侧边栏）运行"清理未使用的图片"。

    <img src="https://github.com/ozntel/oz-clear-unused-images-obsidian/raw/master/images/Clear-Command.png">

3. 如果您在插件设置中开启了"删除日志"选项，您将看到一个弹窗，显示从库中删除了哪些图片：

<img src="https://github.com/ozntel/oz-clear-unused-images-obsidian/raw/master/images/logs-modal.png">

如果所有图片都在使用中，您将看到如下提示：

<img src="https://github.com/ozntel/oz-clear-unused-images-obsidian/raw/master/images/nothing-deleted.png">

**支持的图片格式**：jpg、jpeg、png、gif、svg、bmp、webp

## 计划功能

-   [x] 创建设置供用户选择删除文件的目标位置
-   [x] 扫描排除文件夹设置
-   [ ] 如果用户选择，在库加载时清理图片
-   [ ] 根据用户选择每隔 X 分钟清理图片

## 支持

如果您喜欢这个插件，可以请我喝杯咖啡来支持我的工作和热情：

<a href='https://ko-fi.com/L3L356V6Q' target='_blank'>
    <img height='48' style='border:0px;height:48px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' />
</a>
