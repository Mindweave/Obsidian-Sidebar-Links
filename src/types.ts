/**
 * types.ts
 * Shared type definitions for the plugin
 */

/** Represents a link template */
export interface LinkTemplate {
    name: string;                  // Display name of the link
    template: string;              // URL template with {query} placeholder
    name_and_topics: string;       // Comma-separated list for search/fuzzy filtering
    formatter?: (text: string) => string; // Optional formatter for the query string
}

/** Plugin settings interface */
export interface SelectionSidebarSettings {
    userLinks: LinkTemplate[];     // All links saved by the user (including defaults initially)
}
