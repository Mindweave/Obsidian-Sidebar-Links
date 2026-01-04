import {
	App,
	Editor,
	MarkdownView,
	Plugin,
	WorkspaceLeaf,
	ItemView,
	Notice
} from "obsidian";

/** Unique view type ID for the sidebar */
const VIEW_TYPE_SELECTION = "selection-sidebar-view";

/** Type definition for link templates */
type LinkTemplate = {
	name: string;
	template: string;
	formatter?: (text: string) => string;
};

/** List of URL templates for generating links */
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

/** Generates links from a search text */
function generateLinks(text: string) {
	return linkTemplates.map((tpl) => {
		const formatted = tpl.formatter ? tpl.formatter(text) : text;
		const url = tpl.template.replace("{query}", formatted);
		return { name: tpl.name, url };
	});
}

/** Sidebar view to display search links */
class SelectionView extends ItemView {
	private contentElRef: HTMLElement;
	private searchTitleEl: HTMLElement;

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
		// Clear any previous content
		this.contentEl.empty();

		// Title showing what text is being searched
		this.searchTitleEl = this.contentEl.createEl("div", {
			cls: "selection-view-title",
			text: "Search Text: None"
		});

		// Container for links
		this.contentElRef = this.contentEl.createEl("div", {
			cls: "selection-view-content"
		});
	}

	/**
	 * Updates the sidebar with links for the given text
	 */
	setLinks(text: string) {
		if (!this.contentElRef || !this.searchTitleEl) return;

		// Update the title at the top
		this.searchTitleEl.setText(`Search Text: ${text}`);

		// Clear previous links
		this.contentElRef.empty();

		const links = generateLinks(text);

		links.forEach((link) => {
			// Create a container for link + copy button
			const container = this.contentElRef.createEl("div", { cls: "link-container" });

			// Create clickable link element
			const a = container.createEl("a", {
				text: link.name,
				href: link.url,
				attr: { target: "_blank", rel: "noopener", title: link.url } // show full URL on hover
			});

			// Create a small copy button next to the link
			const copyBtn = container.createEl("button", {
				text: "Copy",
				cls: "copy-link-btn",
				attr: { title: "Copy URL to clipboard" }
			});

			copyBtn.addEventListener("click", (evt) => {
				evt.stopPropagation(); // prevent bubbling
				evt.preventDefault();
				navigator.clipboard.writeText(link.url).then(() => {
					new Notice(`Copied URL to clipboard:\n${link.url}`);
				});
			});
		});
	}
}

/** Main plugin */
export default class SelectionSidebarPlugin extends Plugin {
	private view: SelectionView | null = null;

	async onload() {
		// Register the sidebar view
		this.registerView(
			VIEW_TYPE_SELECTION,
			(leaf) => (this.view = new SelectionView(leaf))
		);

		// Activate the sidebar view
		this.activateView();

		// Listen for selection changes
		this.registerEvent(
			this.app.workspace.on("editor-selection-change", (editor) => {
				this.updateFromEditor(editor);
			})
		);

		// Listen for active file changes
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				this.updateFromActiveFile();
			})
		);
	}

	async onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_SELECTION);
	}

	/** Create or reveal the sidebar */
	async activateView() {
		const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_SELECTION);
		if (leaves.length === 0) {
			await this.app.workspace.getRightLeaf(false).setViewState({
				type: VIEW_TYPE_SELECTION,
				active: true
			});
		}
	}

	/** Update sidebar based on editor selection */
	updateFromEditor(editor: Editor) {
		if (!this.view) return;

		const selection = editor.getSelection().trim();

		if (selection.length > 0) {
			this.view.setLinks(selection);
		} else {
			this.updateFromActiveFile();
		}
	}

	/** Update sidebar based on active file title */
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
