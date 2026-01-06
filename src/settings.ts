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

        const allLinks = this.plugin.settings.userLinks;

        allLinks.forEach((link, index) => {
            const setting = new Setting(containerEl)
                .setName(link.name_and_topics || link.name)
                .setDesc(link.template);
            //TODO add edit functionality later. This should be a button that removes the link and passes the link properties to the edit form
            setting.addButton(btn =>
                btn.setButtonText("Remove").onClick(async () => {
                    this.plugin.settings.userLinks.splice(index, 1);
                    await this.plugin.saveSettings();
                    this.display();
                })
            );
        });

        containerEl.createEl("h3", { text: "Add New Link" });
        containerEl.createEl("p", { text: "Fill in the fields below to create a new link. Use {query} in the URL template." });
        
        let inputName: HTMLInputElement, inputTemplate: HTMLInputElement, inputTopics: HTMLInputElement, inputSpace: HTMLInputElement;

        const addSettingDispayName = new Setting(containerEl).addTextArea(text => {
                inputName = text.inputEl;
                text.setPlaceholder("Wikipedia");
                text.inputEl.title = "Display name of the link";
            }).setName("Name").setDesc("Display name of the link");
            // Template
            const addSettingTemplate = new Setting(containerEl).addTextArea(text => {
                inputTemplate = text.inputEl;
                text.setPlaceholder("https://en.wikipedia.org/wiki/{query}");
                text.inputEl.title = "URL template with {query} as placeholder";
            }).setName("Template").setDesc("URL template with {query} as placeholder");
            // Topics
            const addSettingTopics = new Setting(containerEl).addTextArea(text => {
                inputTopics = text.inputEl;
                text.setPlaceholder("encyclopedia, reference");
                text.inputEl.title = "Comma-separated topics for filtering/searching";
            }).setName("Topics").setDesc("Comma-separated topics for filtering/searching");
            // Space replacement
            const addSettingSpaceReplacement = new Setting(containerEl).addTextArea(text => {
                inputSpace = text.inputEl;
                text.setPlaceholder("_");
                text.inputEl.title = "What character(s) to replace spaces with e.g. _ or -";
            }).setName("Space Replacement").setDesc("What character(s) to replace spaces with e.g. _ or -");
            // Add button
            const addSettingConfirmationButton = new Setting(containerEl).addButton(btn =>
                btn.setButtonText("Add").onClick(async () => {
                    const newLink: LinkTemplate = {
                        name: inputName.value.trim(),
                        template: inputTemplate.value.trim(),
                        name_and_topics: inputName.value.trim() + ": " + inputTopics.value.trim(),
                        spaceReplacement: inputSpace.value.trim() || "_"
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
                    inputSpace.value = "";
                })
            );

        addSetting.setName("New Link").setDesc("Fill Name, Template ({query}), Topics, Space Replacement");
    }
}
