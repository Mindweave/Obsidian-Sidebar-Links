/**
 * types.ts
 * Shared type definitions for the plugin
 */

/** Represents a link template */
export interface LinkTemplate {
    name: string;                  // Display name of the site
    template: string;              // URL template with {query} placeholder
    name_and_topics: string;       // Comma-separated list for search
    formatter?: (text: string) => string; // Optional formatter for {query}
}

/** Plugin settings interface */
export interface SelectionSidebarSettings {
    userLinks: LinkTemplate[];     // Array of user-added links
}
