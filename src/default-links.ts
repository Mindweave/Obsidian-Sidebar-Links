import { LinkTemplate } from "types";

/** Array of link templates for generating URLs */
export const DEFAULT_LINKS: LinkTemplate[] = [
    {
        name: "Wikipedia",
        topics: "encyclopedia, reference",
        template: "https://en.wikipedia.org/wiki/{query}",
        name_and_topics: "Wikipedia: encyclopedia, reference",
        spaceReplacement: "_"
    },
    {
        name: "Stanford Encyclopedia",
        topics: "philosophy, reference",
        template: "https://plato.stanford.edu/entries/{query}/",
        name_and_topics: "Stanford Encyclopedia: philosophy, reference",
        spaceReplacement: "-"
    },
    {
        name: "Academia Lab",
        topics: "research, reference",
        template: "https://academia-lab.com/encyclopedia/{query}/",
        name_and_topics: "Academia Lab: research, reference",
        spaceReplacement: "-"
    },
    {
        name: "Wikiwand",
        topics: "encyclopedia, general knowledge",
        template: "https://www.wikiwand.com/en/articles/{query}",
        name_and_topics: "Wikiwand: encyclopedia, general knowledge",
        spaceReplacement: "_"
    }
];
