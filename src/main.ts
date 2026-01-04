import {
	App,
	ItemView,
	Plugin,
	WorkspaceLeaf
} from "obsidian";

const VIEW_TYPE_TITLE = "file-title-sidebar";

export default class FileTitleSidebarPlugin extends Plugin {
	async onload() {
		this.registerView(
			VIEW_TYPE_TITLE,
			(leaf) => new FileTitleView(leaf)
		);

		this.addRibbonIcon("file-text", "Show File Title", () => {
			this.activateView();
		});
	}

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;

		workspace.getLeavesOfType(VIEW_TYPE_TITLE).forEach((l) => {
			leaf = l;
		});

		if (!leaf) {
			leaf = workspace.getRightLeaf(false);
			await leaf.setViewState({
				type: VIEW_TYPE_TITLE,
				active: true
			});
		}

		workspace.revealLeaf(leaf);
	}
}

class FileTitleView extends ItemView {
	private linkEl!: HTMLAnchorElement;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_TITLE;
	}

	getDisplayText() {
		return "Active File Wikipedia Link";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();


		this.linkEl = container.createEl("a", {
			text: "No file open",
			href: "",
		});

		this.linkEl.style.fontSize = "1.2em";
		this.linkEl.style.fontWeight = "600";
		this.linkEl.setAttr("target", "_blank");

		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				this.updateLink();
			})
		);

		this.updateLink();
	}

	updateLink() {
		const file = this.app.workspace.getActiveFile();

		if (!file) {
			this.linkEl.setText("No file open");
			this.linkEl.removeAttribute("href");
			return;
		}

		const title = file.basename;

		// Convert spaces to underscores for Wikipedia URLs
		const wikiTitle = title.replace(/ /g, "_");

		// Encode for safety (handles special characters)
		const wikiUrl =
			"https://en.wikipedia.org/wiki/" +
			encodeURIComponent(wikiTitle);

		this.linkEl.setText(title);
		this.linkEl.setAttr("href", wikiUrl);
	}

	async onClose() {
		// Cleanup handled automatically
	}
}
