import { App, PluginSettingTab, Setting, Notice } from "obsidian";
import { SelectionSidebarPlugin } from "./main";
import { LinkTemplate } from "./types";
import { defaultLinks } from "./links";

/**
 * Settings tab with duplicate fix.
 * Default links can be removed by marking them as deleted,
 * avoiding duplicates in userLinks.
 */
export class SelectionSidebarSettingsTab extends PluginSettingTab {
    plugin: SelectionSidebarPlugin;

    constructor(app: App, plugin: SelectionSidebarPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Links Configuration" });

        // Helper: user deleted defaults
        const deletedDefaults = new Set(
            this.plugin.settings.userLinks
                .filter(l => (l as any).deleted)
                .map(l => l.name)
        );

        // Merge defaults + user links, skipping deleted defaults
        const allLinks: (LinkTemplate & { isDefault?: boolean })[] = [
            ...defaultLinks
                .filter(l => !deletedDefaults.has(l.name))
                .map(l => ({ ...l, isDefault: true })),
            ...this.plugin.settings.userLinks.filter(l => !(l as any).deleted)
        ];

        allLinks.forEach((link, index) => {
            const setting = new Setting(containerEl)
                .setName(link.name)
                .setDesc(link.isDefault ? `${link.template} (default)` : link.template);

            // Remove button
            setting.addButton(btn =>
                btn.setButtonText("Remove").onClick(async () => {
                    if (link.isDefault) {
                        // Only mark as deleted once
                        if (!this.plugin.settings.userLinks.some(l => (l as any).deleted && l.name === link.name)) {
                            this.plugin.settings.userLinks.push({ ...link, deleted: true });
                        }
                    } else {
                        // Remove user-added link
                        const userIndex = this.plugin.settings.userLinks.findIndex(l => l.name === link.name);
                        if (userIndex >= 0) this.plugin.settings.userLinks.splice(userIndex, 1);
                    }
                    await this.plugin.saveSettings();
                    this.display(); // refresh UI
                })
            );
        });

        // Section to add new link
        containerEl.createEl("h3", { text: "Add New Link" });
        let inputName: HTMLInputElement, inputTemplate: HTMLInputElement, inputTopics: HTMLInputElement;

        const addSetting = new Setting(containerEl)
            .addText(text => inputName = text.inputEl)
            .addText(text => inputTemplate = text.inputEl)
            .addText(text => inputTopics = text.inputEl)
            .addButton(btn =>
                btn.setButtonText("Add").onClick(async () => {
                    const newLink: LinkTemplate = {
                        name: inputName.value.trim(),
                        template: inputTemplate.value.trim(),
                        name_and_topics: inputTopics.value.trim()
                    };
                    if (!newLink.name || !newLink.template) {
                        new Notice("Name and template are required!");
                        return;
                    }
                    this.plugin.settings.userLinks.push(newLink);
                    await this.plugin.saveSettings();
                    this.display();
                    inputName.value = "";
                    inputTemplate.value = "";
                    inputTopics.value = "";
                })
            );

        addSetting.setName("New Link").setDesc("Fill Name, Template ({query}), Topics");
    }
}
