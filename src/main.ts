import {
	App,
	Editor,
	MarkdownView,
	Plugin,
	WorkspaceLeaf,
	ItemView
} from "obsidian";

/** Unique view type ID for the sidebar */
const VIEW_TYPE_SELECTION = "selection-sidebar-view";

/** 
 * Type definition for link templates.
 * Each template can define a name, URL pattern, and optional formatter
 * that adjusts the selected text to fit the URL requirements.
 */
type LinkTemplate = {
	name: string;
	template: string;
	formatter?: (text: string) => string;
};

/** 
 * List of URL templates for generating links.
 * Adding new links is as simple as pushing a new object here.
 */
const linkTemplates: LinkTemplate[] = [
	{
		name: "Wikipedia",
		template: "https://en.wikipedia.org/wiki/{query}",
		formatter: (text) => text.replace(/ /g, "_")
	},
	{
		name: "Stanford Encyclopedia",
		template: "https://plato.stanford.edu/entries/{query}/",
		formatter: (text) => text.toLowerCase().replace(/ /g, "-")
	},
	{
		name: "Academia Lab",
		template: "https://academia-lab.com/encyclopedia/{query}/",
		formatter: (text) => text.toLowerCase().replace(/ /g, "-")
	},
	{
		name: "Wikiwand",
		template: "https://www.wikiwand.com/en/articles/{query}",
		formatter: (text) => text.replace(/ /g, "_")
	}
];

/** 
 * Helper function: Generates a list of links from the selected text or file title
 */
function generateLinks(text: string) {
	return linkTemplates.map((tpl) => {
		const formatted = tpl.formatter ? tpl.formatter(text) : text;
		const url = tpl.template.replace("{query}", formatted);
		return { name: tpl.name, url };
	});
}

/**
 * Custom sidebar view to display dynamic links.
 */
class SelectionView extends ItemView {
	private contentElRef: HTMLElement;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return VIEW_TYPE_SELECTION;
	}

	getDisplayText(): string {
		return "Selection Links";
	}

	async onOpen() {
		// Clear any existing content
		this.contentEl.empty();
		this.contentElRef = this.contentEl.createEl("div", {
			cls: "selection-view-content",
			text: "No file open"
		});
	}

	/**
	 * Updates the sidebar content with clickable links
	 */
	setLinks(text: string) {
		if (!this.contentElRef) return;

		// Clear old content
		this.contentElRef.empty();

		// Generate links dynamically
		const links = generateLinks(text);

		// Create clickable links in the sidebar
		links.forEach((link) => {
			const a = this.contentElRef.createEl("a", {
				text: link.name,
				href: link.url,
				attr: { target: "_blank", rel: "noopener" }
			});
			// Line break after each link
			this.contentElRef.createEl("br");
		});
	}
}

/**
 * Main plugin class
 */
export default class SelectionSidebarPlugin extends Plugin {
	private view: SelectionView | null = null;

	async onload() {
		// Register the sidebar view
		this.registerView(
			VIEW_TYPE_SELECTION,
			(leaf) => (this.view = new SelectionView(leaf))
		);

		// Activate the view in the right sidebar
		this.activateView();

		// Listen for text selection changes in editors
		this.registerEvent(
			this.app.workspace.on("editor-selection-change", (editor) => {
				this.updateFromEditor(editor);
			})
		);

		// Listen for active file changes (fallback to file title)
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				this.updateFromActiveFile();
			})
		);
	}

	async onunload() {
		// Remove the sidebar view on plugin unload
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_SELECTION);
	}

	/**
	 * Creates or reveals the sidebar view in the right panel
	 */
	async activateView() {
		const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_SELECTION);
		if (leaves.length === 0) {
			await this.app.workspace.getRightLeaf(false).setViewState({
				type: VIEW_TYPE_SELECTION,
				active: true
			});
		}
	}

	/**
	 * Updates sidebar links based on editor selection.
	 * If selection is empty, falls back to active file title.
	 */
	updateFromEditor(editor: Editor) {
		if (!this.view) return;

		const selection = editor.getSelection().trim();

		if (selection.length > 0) {
			this.view.setLinks(selection);
		} else {
			this.updateFromActiveFile();
		}
	}

	/**
	 * Updates sidebar links based on active file title
	 */
	updateFromActiveFile() {
		if (!this.view) return;

		const file = this.app.workspace.getActiveFile();
		if (file) {
			this.view.setLinks(file.basename);
		} else {
			this.view.setLinks("No file open");
		}
	}
}
