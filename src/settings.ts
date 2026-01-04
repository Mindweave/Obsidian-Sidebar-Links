/**
 * settings.ts
 * Obsidian plugin settings tab.
 * Users can view, add, or remove links stored in userLinks.
 */

import { App, PluginSettingTab, Setting, Notice } from "obsidian";
import { SelectionSidebarPlugin } from "./main";
import { LinkTemplate } from "./types";

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

        // Display all current links
        const allLinks = this.plugin.settings.userLinks;

        allLinks.forEach((link, index) => {
            const setting = new Setting(containerEl)
                .setName(link.name)
                .setDesc(link.template);

            // Remove button for each link
            setting.addButton(btn =>
                btn.setButtonText("Remove").onClick(async () => {
                    this.plugin.settings.userLinks.splice(index, 1);
                    await this.plugin.saveSettings();
                    this.display();
                })
            );
        });

        // Section to add a new link
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
