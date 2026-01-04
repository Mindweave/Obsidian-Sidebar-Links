/**
 * links.ts
 * Default link templates for the plugin.
 * Users can see these in settings and remove them if desired.
 */

import { LinkTemplate } from "./types";

/** Default links for common resources */
export const defaultLinks: LinkTemplate[] = [
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
    },
    {
        name: "DeviantArt",
        template: "https://www.deviantart.com/search?q={query}",
        name_and_topics: "DeviantArta, illustrations, drawings, art, creative, community",
        formatter: (text) => text.replace(/ /g, "+")
    },
    {
        name: "Pixiv",
        template: "https://www.pixiv.net/tags/{query}/artworks?s_mode=s_tag_{query}",
        name_and_topics: "Pixiv, illustrations, drawings, creative, art, community",
        formatter: (text) => text.replace(/ /g, "%20")
    }
];
