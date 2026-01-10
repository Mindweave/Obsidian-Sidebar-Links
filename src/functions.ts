import { LinkTemplate } from "./types";

// Function to filter links based on a search string
export function filterLinks(links: LinkTemplate[], filter: string): LinkTemplate[] {
    return links.filter(link =>
        !filter || (link.name.toLowerCase()+" : "+link.topics.toLowerCase()).includes(filter.toLowerCase())
    ).sort((a, b) => // Sort by earliest match index
            (a.name.toLowerCase()+" : "+a.topics.toLowerCase()).indexOf(filter.toLowerCase()) -
            (b.name.toLowerCase()+" : "+b.topics.toLowerCase()).indexOf(filter.toLowerCase())
        );
}