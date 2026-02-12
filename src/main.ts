import { Plugin, TFile, Notice } from 'obsidian';
import { OzanClearImagesSettingsTab } from './settings';
import { OzanClearImagesSettings, DEFAULT_SETTINGS } from './settings';
import { LogsModal } from './modals';
import * as Util from './util';

export default class OzanClearImages extends Plugin {
    settings: OzanClearImagesSettings;
    ribbonIconEl: HTMLElement | undefined = undefined;

    async onload() {
        console.log('清理未使用图片插件已加载...');
        this.addSettingTab(new OzanClearImagesSettingsTab(this.app, this));
        await this.loadSettings();
        this.addCommand({
            id: 'clear-images-obsidian',
            name: '清理未使用的图片',
            callback: () => this.clearUnusedAttachments('image'),
        });
        this.addCommand({
            id: 'clear-unused-attachments',
            name: '清理未使用的附件',
            callback: () => this.clearUnusedAttachments('all'),
        });
        this.refreshIconRibbon();
    }

    onunload() {
        console.log('清理未使用图片插件已卸载...');
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    refreshIconRibbon = () => {
        this.ribbonIconEl?.remove();
        if (this.settings.ribbonIcon) {
            this.ribbonIconEl = this.addRibbonIcon('image-file', '清理未使用的图片', (event): void => {
                this.clearUnusedAttachments('image');
            });
        }
    };

    // Compare Used Images with all images and return unused ones
    clearUnusedAttachments = async (type: 'all' | 'image') => {
        var unusedAttachments: TFile[] = await Util.getUnusedAttachments(this.app, type);
        var len = unusedAttachments.length;
        if (len > 0) {
            let logs = '';
            logs += `[+] ${Util.getFormattedDate()}: 开始清理。</br>`;
            Util.deleteFilesInTheList(unusedAttachments, this, this.app).then(({ deletedImages, textToView }) => {
                logs += textToView;
                logs += '[+] 共删除 ' + deletedImages.toString() + ' 个图片。</br>';
                logs += `[+] ${Util.getFormattedDate()}: 清理完成。`;
                if (this.settings.logsModal) {
                    let modal = new LogsModal(logs, this.app);
                    modal.open();
                }
            });
        } else {
            new Notice(`所有${type === 'image' ? '图片' : '附件'}都在使用中，没有删除任何内容。`);
        }
    };
}
