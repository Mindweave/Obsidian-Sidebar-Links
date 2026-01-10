/**
 * main.ts
 * Selection Links Sidebar Plugin for Obsidian
 *
 * Features:
 * - Shows links based on selected text or active file title.
 * - Supports multiple link templates with dynamic space replacement.
 * - Search/filter links by name_and_topics.
 * - Copy links to clipboard via button.
 * - Prepopulates default links on first activation.
 */

import { App, Plugin, WorkspaceLeaf, Editor, Notice, ItemView, addIcon } from "obsidian";
import { SelectionSidebarSettings, LinkTemplate } from "./types";
import { SelectionSidebarSettingsTab } from "./settings";
import { DEFAULT_LINKS } from "./default-links";
import { filterLinks } from "./functions";

export const VIEW_TYPE_SELECTION = "selection-sidebar-view";

/** Default links for first activation. From default-links.ts */

export default class SelectionSidebarPlugin extends Plugin {
    settings: SelectionSidebarSettings;
    view: SelectionView | null = null;

    async onload() {
        await this.loadSettings();

        //Create custom icon (not current used)
        addIcon("customSidebarSVGIcon", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="1.75"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 3l7 17 2-6 6-2z"/>
</svg>
`);

        // Prepopulate defaults on first activation
        if (!this.settings.userLinks || this.settings.userLinks.length === 0) {
            this.settings.userLinks = DEFAULT_LINKS;
            await this.saveSettings();
        }

        // Add settings tab
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

/** Sidebar view displaying links */
class SelectionView extends ItemView {
    private plugin: SelectionSidebarPlugin;
    private searchTitleEl: HTMLElement;
    private searchInputEl: HTMLInputElement;
    private currentText: string = "";

    constructor(leaf: WorkspaceLeaf, plugin: SelectionSidebarPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType(): string { return VIEW_TYPE_SELECTION; }
    getDisplayText(): string { return "Selection Links"; }
    getIcon(): string { return "mouse-pointer-click"; }

    async onOpen() {
        this.contentEl.empty();

        // Title showing the text being searched
        this.searchTitleEl = this.contentEl.createEl("div", { cls: "selection-view-title", text: "Search Text: None" });

        // Input for filtering links
        this.searchInputEl = this.contentEl.createEl("input", { cls: "link-search-input", attr: { placeholder: "Filter links..." } });

        // Container for links
        this.contentEl.createDiv({ cls: "selection-view-content" });

        // Filter input event
        this.searchInputEl.addEventListener("input", () => {
            this.renderLinks(this.currentText, this.searchInputEl.value);
        });
    }

    /** Update links based on selected text or file title */
    setLinks(text: string) {
        this.currentText = text;
        if (this.searchTitleEl) this.searchTitleEl.setText(`Search Text: ${text}`);
        this.renderLinks(text, this.searchInputEl.value);
    }

    /** Render filtered links in sidebar */
    private renderLinks(text: string, filter: string) {
        const container = this.contentEl.querySelector(".selection-view-content")!;
        container.empty();

        const allLinks = this.plugin.settings.userLinks;

        //TODO convert this an exported function in another file for reuse in settings.ts
        // Filter links using name_and_topics
        const filtered = filterLinks(allLinks, filter);

        filtered.forEach(link => {
            const linkContainer = container.createDiv({ cls: "link-container" });

            const queryText = link.spaceReplacement ? text.replace(/ /g, link.spaceReplacement) : text;
            const url = link.template.replaceAll("{query}", queryText);

            const a = linkContainer.createEl("a", {
                text: link.name,
                href: url,
                attr: { target: "_blank", title: "Topics: " + link.topics + "\n" + "URL: " + url }
            });

            const copyBtn = linkContainer.createEl("button", { text: "📋", cls: "copy-link-btn", attr: { title: "Copy URL" } });
            copyBtn.addEventListener("click", evt => {
                evt.preventDefault();
                evt.stopPropagation();
                navigator.clipboard.writeText(url).then(() => {
                    new Notice(`Copied URL: ${url}`);
                });
            });
        });
    }
}
