// links.ts
/** Type definition for link templates */
export type LinkTemplate = {
    name: string;                  // Display name of the site
    template: string;              // URL template with {query} placeholder
    name_and_topics: string;       // Comma-separated list of name and topics for searching
    formatter?: (text: string) => string; // Optional formatter for site-specific URL rules
};

/** Array of link templates for generating URLs */
export const linkTemplates: LinkTemplate[] = [
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
