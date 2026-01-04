/**
 * settings.ts
 * Obsidian plugin settings tab.
 * Users can view, add, or remove links stored in userLinks.
 * Add New Link section now includes helper text, placeholders, and tooltips.
 * TODO: In the future, consider showing full link details (template + topics) per entry.
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

        const allLinks = this.plugin.settings.userLinks;

        // Display all existing links with remove button
        allLinks.forEach((link, index) => {
            const setting = new Setting(containerEl)
                .setName(link.name)
                .setDesc(link.template);

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
        containerEl.createEl("p", {
            text: "Fill in the fields below to create a new link. Use {query} in the URL template where the selected text should be inserted."
        });

        let inputName: HTMLInputElement, inputTemplate: HTMLInputElement, inputTopics: HTMLInputElement, inputFormatter: HTMLInputElement;

        const addSetting = new Setting(containerEl)
            // Name input
            .addText(text => {
                inputName = text.inputEl;
                text.setPlaceholder("Wikipedia");
                text.setValue("");
                text.inputEl.title = "This is the display name of the link (e.g., Wikipedia, Stanford Encyclopedia)";
            })
            // Template input
            .addText(text => {
                inputTemplate = text.inputEl;
                text.setPlaceholder("https://en.wikipedia.org/wiki/{query}");
                text.setValue("");
                text.inputEl.title = "The URL template. Use {query} to insert the selected text dynamically.";
            })
            // Topics input
            .addText(text => {
                inputTopics = text.inputEl;
                text.setPlaceholder("encyclopedia, reference, research");
                text.setValue("");
                text.inputEl.title = "Comma-separated topics or keywords used for filtering/searching links.";
            })
            // Optional formatter input
            .addText(text => {
                inputFormatter = text.inputEl;
                text.setPlaceholder("text => text.replace(/ /g, '_')");
                text.setValue("");
                text.inputEl.title = "Optional JavaScript function to format the {query} text (e.g., replace spaces with underscores).";
            })
            // Add button
            .addButton(btn =>
                btn.setButtonText("Add").onClick(async () => {
                    const newLink: LinkTemplate = {
                        name: inputName.value.trim(),
                        template: inputTemplate.value.trim(),
                        name_and_topics: inputTopics.value.trim(),
                        formatter: inputFormatter.value ? inputFormatter.value.trim() : undefined
                    };

                    if (!newLink.name || !newLink.template) {
                        new Notice("Name and template are required!");
                        return;
                    }

                    this.plugin.settings.userLinks.push(newLink);
                    await this.plugin.saveSettings();
                    this.display();

                    // Reset inputs
                    inputName.value = "";
                    inputTemplate.value = "";
                    inputTopics.value = "";
                    inputFormatter.value = "";
                })
            );

        addSetting.setName("New Link").setDesc("Fill Name, Template ({query}), Topics, Formatter (optional JS function)");
    }
}
