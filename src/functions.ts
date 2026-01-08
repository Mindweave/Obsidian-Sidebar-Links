import { LinkTemplate } from "./types";

// Function to filter links based on a search string
export function filterLinks(links: LinkTemplate[], filter: string): LinkTemplate[] {
    return links.filter(link =>
        !filter || link.name_and_topics.toLowerCase().includes(filter.toLowerCase())
    ).sort((a, b) => // Sort by earliest match index
            a.name_and_topics.toLowerCase().indexOf(filter.toLowerCase()) -
            b.name_and_topics.toLowerCase().indexOf(filter.toLowerCase())
        );
}