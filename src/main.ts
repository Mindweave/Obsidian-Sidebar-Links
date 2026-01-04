/**
 * main.ts
 * Main plugin logic for the selection sidebar
 * Shows links for selected text or active file title
 * Includes search, copy buttons, and merges default + user links
 */

import { App, Plugin, WorkspaceLeaf, ItemView, Editor, Notice } from "obsidian";
import { defaultLinks } from "./links";
import { LinkTemplate, SelectionSidebarSettings } from "./types";
import { SelectionSidebarSettingsTab } from "./settings";

/** Sidebar view ID */
const VIEW_TYPE_SELECTION = "selection-sidebar-view";

/** Main plugin class */
export default class SelectionSidebarPlugin extends Plugin {
    view: SelectionView | null = null;
    settings: SelectionSidebarSettings;

    async onload() {
        await this.loadSettings();

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

    /** Show sidebar in right panel if not open */
    async activateView() {
        const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_SELECTION);
        if (!leaves.length) {
            await this.app.workspace.getRightLeaf(false).setViewState({ type: VIEW_TYPE_SELECTION, active: true });
        }
    }

    /** Update links based on editor selection */
    updateFromEditor(editor: Editor) {
        if (!this.view) return;
        const selection = editor.getSelection().trim();
        this.view.setLinks(selection || this.getActiveFileName());
    }

    /** Update links based on active file title */
    updateFromActiveFile() {
        if (!this.view) return;
        this.view.setLinks(this.getActiveFileName());
    }

    /** Get active file name */
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
    getIcon(): string { return "book"; } // Lucide icon

    async onOpen() {
        this.contentEl.empty();

        // Display current search text
        this.searchTitleEl = this.contentEl.createEl("div", { cls: "selection-view-title", text: "Search Text: None" });

        // Input for filtering links
        this.searchInputEl = this.contentEl.createEl("input", { attr: { placeholder: "Filter links..." }, cls: "link-search-input" });

        // Container for links
        this.contentElRef = this.contentEl.createEl("div", { cls: "selection-view-content" });

        // Re-render links when user types in search box
        this.searchInputEl.addEventListener("input", () => {
            this.renderLinks(this.currentText, this.searchInputEl.value);
        });
    }

    /** Set links based on selected text or file title */
    setLinks(text: string) {
        this.currentText = text;
        this.searchTitleEl.setText(`Search Text: ${text}`);
        this.renderLinks(text, this.searchInputEl.value);
    }

    /** Render links, filtering by search input */
    private renderLinks(text: string, filter: string) {
        this.contentElRef.empty();

        // Merge default + user links
        const allLinks: LinkTemplate[] = [...defaultLinks, ...this.plugin.settings.userLinks];

        // Filter links using fuzzy search (simple includes)
        let filtered = allLinks.filter(link =>
            !filter || link.name_and_topics.toLowerCase().includes(filter.toLowerCase())
        );

        // Sort by earliest match index
        filtered.sort((a, b) =>
            a.name_and_topics.toLowerCase().indexOf(filter.toLowerCase()) -
            b.name_and_topics.toLowerCase().indexOf(filter.toLowerCase())
        );

        // Render each link
        filtered.forEach(link => {
            const container = this.contentElRef.createEl("div", { cls: "link-container" });

            // Clickable link
            const a = container.createEl("a", {
                text: link.name,
                href: link.template.replace("{query}", text),
                attr: { target: "_blank", rel: "noopener", title: link.template.replace("{query}", text) }
            });

            // Copy button
            const copyBtn = container.createEl("button", { text: "📋", cls: "copy-link-btn", attr: { title: "Copy URL" } });
            copyBtn.addEventListener("click", evt => {
                evt.preventDefault();
                evt.stopPropagation();
                navigator.clipboard.writeText(link.template.replace("{query}", text)).then(() => {
                    new Notice(`Copied URL to clipboard:\n${link.template.replace("{query}", text)}`);
                });
            });
        });
    }
}
