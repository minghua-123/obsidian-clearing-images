import OzanClearImages from './main';
import { PluginSettingTab, Setting, App } from 'obsidian';

export interface OzanClearImagesSettings {
    deleteOption: string;
    logsModal: boolean;
    excludedFolders: string;
    ribbonIcon: boolean;
    excludeSubfolders: boolean;
}

export const DEFAULT_SETTINGS: OzanClearImagesSettings = {
    deleteOption: '.trash',
    logsModal: true,
    excludedFolders: '',
    ribbonIcon: false,
    excludeSubfolders: false,
};

export class OzanClearImagesSettingsTab extends PluginSettingTab {
    plugin: OzanClearImages;

    constructor(app: App, plugin: OzanClearImages) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: '清理图片设置' });

        new Setting(containerEl)
            .setName('侧边栏图标')
            .setDesc('开启后将在左侧侧边栏显示清理图片的图标。')
            .addToggle((toggle) =>
                toggle.setValue(this.plugin.settings.ribbonIcon).onChange((value) => {
                    this.plugin.settings.ribbonIcon = value;
                    this.plugin.saveSettings();
                    this.plugin.refreshIconRibbon();
                })
            );

        new Setting(containerEl)
            .setName('删除日志')
            .setDesc(
                '关闭后，删除完成后将不会弹出删除日志模态框。如果没有删除任何图片，则不会显示。'
            )
            .addToggle((toggle) =>
                toggle.setValue(this.plugin.settings.logsModal).onChange((value) => {
                    this.plugin.settings.logsModal = value;
                    this.plugin.saveSettings();
                })
            );

        new Setting(containerEl)
            .setName('删除图片的目标位置')
            .setDesc('选择图片删除后移动到的位置')
            .addDropdown((dropdown) => {
                dropdown.addOption('permanent', '永久删除');
                dropdown.addOption('.trash', '移动到 Obsidian 回收站');
                dropdown.addOption('system-trash', '移动到系统回收站');
                dropdown.setValue(this.plugin.settings.deleteOption);
                dropdown.onChange((option) => {
                    this.plugin.settings.deleteOption = option;
                    this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName('排除文件夹完整路径')
            .setDesc(
                `提供要排除清理的文件夹完整路径（区分大小写），多个路径用逗号（,）分隔。
					例如：对于 Personal/Files/Zodiac 下的图片，应使用 Personal/Files/Zodiac 作为排除路径`
            )
            .addTextArea((text) =>
                text.setValue(this.plugin.settings.excludedFolders).onChange((value) => {
                    this.plugin.settings.excludedFolders = value;
                    this.plugin.saveSettings();
                })
            );

        new Setting(containerEl)
            .setName('排除子文件夹')
            .setDesc('开启此选项后，将同时排除上述文件夹路径下的所有子文件夹。')
            .addToggle((toggle) =>
                toggle.setValue(this.plugin.settings.excludeSubfolders).onChange((value) => {
                    this.plugin.settings.excludeSubfolders = value;
                    this.plugin.saveSettings();
                })
            );

        const coffeeDiv = containerEl.createDiv('coffee');
        coffeeDiv.addClass('oz-coffee-div');
        const coffeeLink = coffeeDiv.createEl('a', { href: 'https://ko-fi.com/L3L356V6Q' });
        const coffeeImg = coffeeLink.createEl('img', {
            attr: {
                src: 'https://cdn.ko-fi.com/cdn/kofi2.png?v=3',
            },
        });
        coffeeImg.height = 45;
    }
}
