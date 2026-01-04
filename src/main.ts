import {
	App,
	Editor,
	MarkdownView,
	Plugin,
	WorkspaceLeaf,
	ItemView
} from "obsidian";

/** Unique view type ID */
const VIEW_TYPE_SELECTION = "selection-sidebar-view";

/** Sidebar View */
class SelectionView extends ItemView {
	private contentElRef: HTMLElement;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return VIEW_TYPE_SELECTION;
	}

	getDisplayText(): string {
		return "Selection Viewer";
	}

	async onOpen() {
		this.contentEl.empty();
		this.contentElRef = this.contentEl.createEl("div", {
			cls: "selection-view-content",
			text: "No file open"
		});
	}

	setText(text: string) {
		this.contentElRef.setText(text);
	}
}

/** Main Plugin */
export default class SelectionSidebarPlugin extends Plugin {
	private view: SelectionView | null = null;

	async onload() {
		// Register the view
		this.registerView(
			VIEW_TYPE_SELECTION,
			(leaf) => (this.view = new SelectionView(leaf))
		);

		// Add view to right sidebar
		this.activateView();

		// Listen for selection changes
		this.registerEvent(
			this.app.workspace.on("editor-selection-change", (editor) => {
				this.updateFromEditor(editor);
			})
		);

		// Listen for file changes
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				this.updateFromActiveFile();
			})
		);
	}

	async onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_SELECTION);
	}

	/** Create or reveal the sidebar view */
	async activateView() {
		const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_SELECTION);
		if (leaves.length === 0) {
			await this.app.workspace.getRightLeaf(false).setViewState({
				type: VIEW_TYPE_SELECTION,
				active: true
			});
		}
	}

	/** Update sidebar from editor selection */
	updateFromEditor(editor: Editor) {
		if (!this.view) return;

		const selection = editor.getSelection().trim();

		if (selection.length > 0) {
			this.view.setText(selection);
		} else {
			this.updateFromActiveFile();
		}
	}

	/** Fallback: show active file title */
	updateFromActiveFile() {
		if (!this.view) return;

		const file = this.app.workspace.getActiveFile();
		if (file) {
			this.view.setText(file.basename);
		} else {
			this.view.setText("No file open");
		}
	}
}
