/**
 * types.ts
 * Shared types for the plugin
 */

export interface LinkTemplate {
    name: string;               // Display name
    topics: string;             // Comma-separated search topics
    template: string;           // URL template, use {query} as placeholder
    name_and_topics: string;    // Comma-separated search topics
    spaceReplacement?: string;  // Character(s) to replace spaces with
}

export interface SelectionSidebarSettings {
    userLinks: LinkTemplate[];
}