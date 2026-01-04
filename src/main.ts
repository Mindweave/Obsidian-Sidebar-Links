/**
 * main.ts
 * Main plugin logic for the selection sidebar
 * Shows links for selected text or active file title
 * Includes search, copy buttons, and populates default links on first load
 */

import { App, Plugin, WorkspaceLeaf, Editor, Notice, ItemView } from "obsidian";
import { SelectionSidebarSettings, LinkTemplate } from "./types";
import { SelectionSidebarSettingsTab } from "./settings";

const VIEW_TYPE_SELECTION = "selection-sidebar-view";

/** Default links preloaded on first activation */
const DEFAULT_LINKS: LinkTemplate[] = [
    {
        name: "Wikipedia",
        template: "https://en.wikipedia.org/wiki/{query}",
        name_and_topics: "Wikipedia, encyclopedia, general knowledge, reference",
        formatter: (text) => text.replace(/ /g, "_")
    },
    {
        name: "Stanford Encyclopedia",
        template: "https://plato.stanford.edu/entries/{query}/",
        name_and_topics: "Stanford Encyclopedia, philosophy, reference, academia",
        formatter: (text) => text.toLowerCase().replace(/ /g, "-")
    },
    {
        name: "Academia Lab",
        template: "https://academia-lab.com/encyclopedia/{query}/",
        name_and_topics: "Academia Lab, research, reference, encyclopedia",
        formatter: (text) => text.toLowerCase().replace(/ /g, "-")
    },
    {
        name: "Wikiwand",
        template: "https://www.wikiwand.com/en/articles/{query}",
        name_and_topics: "Wikiwand, encyclopedia, general knowledge",
        formatter: (text) => text.replace(/ /g, "_")
    }
];

export default class SelectionSidebarPlugin extends Plugin {
    view: SelectionView | null = null;
    settings: SelectionSidebarSettings;

    async onload() {
        await this.loadSettings();

        // Prepopulate defaults on first activation
        if (!this.settings.userLinks || this.settings.userLinks.length === 0) {
            this.settings.userLinks = DEFAULT_LINKS;
            await this.saveSettings();
        }

        // Register settings tab
        this.addSettingTab(new SelectionSidebarSettingsTab(this.app, this));

        // Register sidebar view
        this.registerView(VIEW_TYPE_SELECTION, leaf => this.view = new SelectionView(leaf, this));

        // Activate sidebar
        this.activateView();

        // Listen for editor selection changes
        this.registerEvent(this.app.workspace.on("editor-selection-change", editor => {
            this.updateFromEditor(editor);
        }));

        // Listen for active file changes
        this.registerEvent(this.app.workspace.on("active-leaf-change", () => {
            this.updateFromActiveFile();
        }));
    }

    async onunload() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_SELECTION);
    }

    async loadSettings() {
        const defaultSettings: SelectionSidebarSettings = { userLinks: [] };
        this.settings = Object.assign({}, defaultSettings, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async activateView() {
        const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_SELECTION);
        if (!leaves.length) {
            await this.app.workspace.getRightLeaf(false).setViewState({ type: VIEW_TYPE_SELECTION, active: true });
        }
    }

    updateFromEditor(editor: Editor) {
        if (!this.view) return;
        const selection = editor.getSelection().trim();
        this.view.setLinks(selection || this.getActiveFileName());
    }

    updateFromActiveFile() {
        if (!this.view) return;
        this.view.setLinks(this.getActiveFileName());
    }

    private getActiveFileName(): string {
        const file = this.app.workspace.getActiveFile();
        return file ? file.basename : "No file open";
    }
}

/** Sidebar view class */
class SelectionView extends ItemView {
    private plugin: SelectionSidebarPlugin;
    private contentElRef: HTMLElement;
    private searchTitleEl: HTMLElement;
    private searchInputEl: HTMLInputElement;
    private currentText: string = "";

    constructor(leaf: WorkspaceLeaf, plugin: SelectionSidebarPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType(): string { return VIEW_TYPE_SELECTION; }
    getDisplayText(): string { return "Selection Links"; }
    getIcon(): string { return "book"; }

    async onOpen() {
        this.contentEl.empty();

        this.searchTitleEl = this.contentEl.createEl("div", { cls: "selection-view-title", text: "Search Text: None" });
        this.searchInputEl = this.contentEl.createEl("input", { attr: { placeholder: "Filter links..." }, cls: "link-search-input" });
        this.contentElRef = this.contentEl.createEl("div", { cls: "selection-view-content" });

        this.searchInputEl.addEventListener("input", () => {
            this.renderLinks(this.currentText, this.searchInputEl.value);
        });
    }

    setLinks(text: string) {
        this.currentText = text;
        this.searchTitleEl.setText(`Search Text: ${text}`);
        this.renderLinks(text, this.searchInputEl.value);
    }

    private renderLinks(text: string, filter: string) {
        this.contentElRef.empty();

        const allLinks: LinkTemplate[] = this.plugin.settings.userLinks;

        // Filter links by name_and_topics using simple fuzzy search
        let filtered = allLinks.filter(link =>
            !filter || link.name_and_topics.toLowerCase().includes(filter.toLowerCase())
        );

        // Sort by earliest match index
        filtered.sort((a, b) =>
            a.name_and_topics.toLowerCase().indexOf(filter.toLowerCase()) -
            b.name_and_topics.toLowerCase().indexOf(filter.toLowerCase())
        );

        filtered.forEach(link => {
            const container = this.contentElRef.createEl("div", { cls: "link-container" });

            const url = link.formatter ? link.template.replace("{query}", link.formatter(text)) : link.template.replace("{query}", text);

            const a = container.createEl("a", {
                text: link.name,
                href: url,
                attr: { target: "_blank", rel: "noopener", title: url }
            });

            const copyBtn = container.createEl("button", { text: "📋", cls: "copy-link-btn", attr: { title: "Copy URL" } });
            copyBtn.addEventListener("click", evt => {
                evt.preventDefault();
                evt.stopPropagation();
                navigator.clipboard.writeText(url).then(() => {
                    new Notice(`Copied URL to clipboard:\n${url}`);
                });
            });
        });
    }
}
