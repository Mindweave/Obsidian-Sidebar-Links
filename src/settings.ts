import { App, PluginSettingTab, Setting, Notice } from "obsidian";
import { SelectionSidebarPlugin } from "./main";
import { LinkTemplate } from "./types";
import { filterLinks } from "./functions";

export class SelectionSidebarSettingsTab extends PluginSettingTab {
    plugin: SelectionSidebarPlugin;

    constructor(app: App, plugin: SelectionSidebarPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(searchText = "", defaultSettingText: LinkTemplate = {
                        name: "",
                        topics: "",
                        template: "",
                        spaceReplacement: ""
                    }): void {
        const { containerEl } = this;
        containerEl.empty();

        
        containerEl.createEl("h3", { text: "Add New Link" });
        containerEl.createEl("p", { text: "Fill in the fields below to create a new link. Use {query} in the URL template." });
        
        // Input fields for new link
        let inputName: HTMLInputElement, inputTemplate: HTMLInputElement, inputTopics: HTMLInputElement, inputSpace: HTMLInputElement;
        
        // Input field for filtering existing links
        let inputFilterText: HTMLInputElement;

        const addSettingDispayName = new Setting(containerEl).addTextArea(text => {
                inputName = text.inputEl;
                text.setPlaceholder("Wikipedia");
                text.setValue(defaultSettingText.name);
                text.inputEl.title = "Display name of the link";
            }).setName("Name").setDesc("Display name of the link");
            // Topics
            const addSettingTopics = new Setting(containerEl).addTextArea(text => {
                inputTopics = text.inputEl;
                text.setPlaceholder("encyclopedia, reference");
                text.setValue(defaultSettingText.topics);
                text.inputEl.title = "Comma-separated topics for filtering/searching";
            }).setName("Topics").setDesc("Comma-separated topics for filtering/searching");
            // Template
            const addSettingTemplate = new Setting(containerEl).addTextArea(text => {
                inputTemplate = text.inputEl;
                text.setPlaceholder("https://en.wikipedia.org/wiki/{query}");
                text.setValue(defaultSettingText.template);
                text.inputEl.title = "URL template with {query} as placeholder";
            }).setName("Template").setDesc("URL template with {query} as placeholder");
            // Space replacement
            const addSettingSpaceReplacement = new Setting(containerEl).addTextArea(text => {
                inputSpace = text.inputEl;
                text.setPlaceholder("_");
                text.setValue(defaultSettingText.spaceReplacement);
                text.inputEl.title = "What character(s) to replace spaces with e.g. _ or -";
            }).setName("Space Replacement").setDesc("What character(s) to replace spaces with e.g. _ or -");
            // Add button
            const addSettingConfirmationButton = new Setting(containerEl).addButton(btn =>
                btn.setButtonText("Add").onClick(async () => {
                    const newLink: LinkTemplate = {
                        name: inputName.value.trim(),
                        topics: inputTopics.value.trim(),
                        template: inputTemplate.value.trim(),
                        spaceReplacement: inputSpace.value.trim() || "_"
                    };

                    if (!newLink.name || !newLink.topics || !newLink.template || !newLink.spaceReplacement) {
                        new Notice("Name, topics, template, and space replacement are all required!");
                        return;
                    }

                    this.plugin.settings.userLinks.push(newLink);
                    await this.plugin.saveSettings();
                    this.display(inputFilterText.value); // Refresh display with current filter and remove edit defaults

                    inputName.value = "";                    
                    inputTopics.value = "";
                    inputTemplate.value = "";
                    inputSpace.value = "";
                })
            );

        // Current links section
        // Source links
        const allLinks = this.plugin.settings.userLinks;
        const filteredLinks = filterLinks(allLinks, searchText);
        containerEl.createEl("h2", { text: "Current Links (" + filteredLinks.length + ")" });

        //Input text for filtering existing links
        const filterInput = new Setting(containerEl).addText(text => {
            inputFilterText = text.inputEl;
            text.setPlaceholder("Filter links...");
            text.setValue(searchText);
            text.inputEl.title = "Filter existing links by name and topics";
        }).addButton(btn =>
            btn.setButtonText("Search").onClick(() => {
                this.display(inputFilterText.value, defaultSettingText);
            })
        );

        // Display message if no links
        if (allLinks.length === 0) {
            containerEl.createEl("p", { text: "No links added yet." });
            return;
        } else if (filteredLinks.length === 0) {
            containerEl.createEl("p", { text: "No links match the filter." });
     } else {
        // List existing links with remove & edit buttons
        filterLinks(allLinks, inputFilterText.value).forEach((link, index) => {
            const setting = new Setting(containerEl)
                .setName(link.name+": "+link.topics)
                .setDesc(link.template);
            //TODO review removal functionality after links are filtered
            setting.addButton(btn =>
                btn.setButtonText("Remove & Edit").onClick(async () => {
                    //Remove link
                    this.plugin.settings.userLinks = this.plugin.settings.userLinks.filter(item => item !== link);
                    await this.plugin.saveSettings();
                    //Add to edit area
                    defaultSettingText.name = link.name;
                    defaultSettingText.topics = link.topics;
                    defaultSettingText.template = link.template;
                    defaultSettingText.spaceReplacement = link.spaceReplacement;
                    //Refresh display
                    this.display(searchText, defaultSettingText);
                })
            );
        });
    }
    }
}
