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
	name: string;                  // Display name of the site
	template: string;              // URL template with {query} placeholder
	name_and_topics: string;       // Comma-separated list of name and topics for searching
	formatter?: (text: string) => string; // Optional formatter for site-specific URL rules
};

/** List of URL templates for generating links */
const linkTemplates: LinkTemplate[] = [
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

/**
 * Generates link objects from a search text.
 */
function generateLinks(text: string) {
	return linkTemplates.map((tpl) => {
		const formatted = tpl.formatter ? tpl.formatter(text) : text;
		const url = tpl.template.replace("{query}", formatted);
		return { name: tpl.name, url, name_and_topics: tpl.name_and_topics };
	});
}

/**
 * Simple fuzzy match function.
 * Returns true if all characters in `query` appear in order in `text`.
 */
function fuzzyMatch(query: string, text: string): boolean {
	query = query.toLowerCase();
	text = text.toLowerCase();
	let qi = 0;
	for (let i = 0; i < text.length && qi < query.length; i++) {
		if (query[qi] === text[i]) qi++;
	}
	return qi === query.length;
}

/**
 * Calculates match "score" for sorting.
 * Lower index of match in text = higher priority.
 */
function matchScore(query: string, text: string): number {
	query = query.toLowerCase();
	text = text.toLowerCase();
	const index = text.indexOf(query);
	return index >= 0 ? index : Number.MAX_SAFE_INTEGER;
}

/**
 * Custom sidebar view displaying links based on selection or file title.
 */
class SelectionView extends ItemView {
	private contentElRef: HTMLElement;   // Container for links
	private searchTitleEl: HTMLElement;  // Displays "Search Text: ..."
	private currentText: string = "";    // Current selection/file text
	private searchInputEl: HTMLInputElement; // Search input for filtering

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
		// Clear previous content
		this.contentEl.empty();

		// Title: shows what text is being used for link generation
		this.searchTitleEl = this.contentEl.createEl("div", {
			cls: "selection-view-title",
			text: "Search Text: None"
		});

		// Search input for filtering links
		this.searchInputEl = this.contentEl.createEl("input", {
			attr: { placeholder: "Filter links..." },
			cls: "link-search-input"
		});

		// Container for links
		this.contentElRef = this.contentEl.createEl("div", {
			cls: "selection-view-content"
		});

		// Listen to input changes and re-render links dynamically
		this.searchInputEl.addEventListener("input", () => {
			this.renderLinks(this.currentText, this.searchInputEl.value);
		});
	}

	/**
	 * Update sidebar links based on the selected text or file title
	 */
	setLinks(text: string) {
		if (!this.contentElRef || !this.searchTitleEl) return;

		this.currentText = text; // store for filtering

		// Update the title showing the search text
		this.searchTitleEl.setText(`Search Text: ${text}`);

		// Initially render all links (no filter)
		this.renderLinks(text, this.searchInputEl.value);
	}

	/**
	 * Render links into the sidebar, optionally filtering via a search string
	 * Fuzzy search and sort by how early the match occurs in name_and_topics
	 */
	renderLinks(text: string, filter: string) {
		if (!this.contentElRef) return;

		// Clear existing links
		this.contentElRef.empty();

		const links = generateLinks(text);

		// Filter and sort links
		let filteredLinks = links.filter((link) =>
			filter ? fuzzyMatch(filter, link.name_and_topics) : true
		);

		if (filter) {
			// Sort by earliest occurrence of the filter in name_and_topics
			filteredLinks.sort(
				(a, b) => matchScore(filter, a.name_and_topics) - matchScore(filter, b.name_and_topics)
			);
		}

		// Render each filtered link
		filteredLinks.forEach((link) => {
			// Container for each link + copy button
			const container = this.contentElRef.createEl("div", { cls: "link-container" });

			// Clickable link
			const a = container.createEl("a", {
				text: link.name,
				href: link.url,
				attr: { target: "_blank", rel: "noopener", title: link.url }
			});

			// Copy button (small icon)
			const copyBtn = container.createEl("button", {
				text: "📋",
				cls: "copy-link-btn",
				attr: { title: "Copy URL to clipboard" }
			});

			copyBtn.addEventListener("click", (evt) => {
				evt.stopPropagation(); // prevent event bubbling
				evt.preventDefault();
				navigator.clipboard.writeText(link.url).then(() => {
					new Notice(`Copied URL to clipboard:\n${link.url}`);
				});
			});
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

		// Activate sidebar in the right panel
		this.activateView();

		// Listen for selection changes in any editor
		this.registerEvent(
			this.app.workspace.on("editor-selection-change", (editor) => {
				this.updateFromEditor(editor);
			})
		);

		// Listen for active file changes to fallback to file title
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				this.updateFromActiveFile();
			})
		);
	}

	async onunload() {
		// Detach sidebar on plugin unload
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_SELECTION);
	}

	/**
	 * Create or reveal the sidebar view in the right panel
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
	 * Update sidebar links based on editor selection
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
	 * Update sidebar links based on active file title (fallback)
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
