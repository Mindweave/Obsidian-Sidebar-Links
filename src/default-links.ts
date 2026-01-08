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
    },
    {
        name: "Internet Archive",
        topics: "books, archives, general knowledge",
        template: "https://archive.org/search?query={query}&tab=fulltext",
        name_and_topics: "Internet Archive: books, archives, general knowledge",
        spaceReplacement: "+"
    },
    {
        name: "dblp computer science bibliography",
        topics: "computer science, research, academic papers",
        template: "https://dblp.org/search?q={query}",
        name_and_topics: "dblp computer science bibliography: computer science, research, academic papers",
        spaceReplacement: "%20"
    },
    {
        name: "Open Shadow Library Uptime Monitor",
        topics: "uptime monitoring, infrastructure, open texts, books",
        template: "https://open-slum.org/",
        name_and_topics: "Open Shadow Library Uptime Monitor: uptime monitoring, infrastructure, open texts, books",
        spaceReplacement: "%20"
    },
    {
        name: "Project Gutenberg",
        topics: "books, literature, general knowledge",
        template: "https://www.gutenberg.org/ebooks/search/?query={query}",
        name_and_topics: "Project Gutenberg: books, literature, general knowledge",
        spaceReplacement: "+"
    },
    {
        name: "Google Books",
        topics: "books, literature, general knowledge",
        template: "https://www.google.com/search?tbm=bks&q={query}",
        name_and_topics: "Google Books: books, literature, general knowledge",
        spaceReplacement: "%20"
    },
    {
        name: "Open Library",
        topics: "books, literature, general knowledge",
        template: "https://openlibrary.org/search?q={query}",
        name_and_topics: "Open Library: books, literature, general knowledge",
        spaceReplacement: "+"
    },
    {
        name: "DOAJ",
        topics: "academic papers, research, journals",
        template: "https://doaj.org/search/articles?ref=quick-search&source=%7B%22query%22%3A%7B%22query_string%22%3A%7B%22query%22%3A%22{query}%22%2C%22default_operator%22%3A%22AND%22%7D%7D%2C%22track_total_hits%22%3Atrue%7D",
        name_and_topics: "DOAJ: academic papers, research, journals",
        spaceReplacement: "%20"
    },
    {
        name: "BASE",
        topics: "academic papers, research, journals, Bielefeld University Library",
        template: "https://www.base-search.net/Search/Results?type=all&lookfor={query}",
        name_and_topics: "BASE: academic papers, research, journals, Bielefeld University Library",
        spaceReplacement: "+"
    },
    {
        name: "CORE",
        topics: "academic papers, research, journals",
        template: "https://core.ac.uk/search/?q={query}",
        name_and_topics: "CORE: academic papers, research, journals",
        spaceReplacement: "%20"
    },
    {
        name: "PubMed",
        topics: "academic papers, research, journals, biology, medicine",
        template: "https://pubmed.ncbi.nlm.nih.gov/?term={query}",
        name_and_topics: "PubMed: academic papers, research, journals, biology, medicine",
        spaceReplacement: "+"
    },
    {
        name: "JURN",
        topics: "academic papers, research, journals",
        template: "https://www.jurn.link/#gsc.tab=0&gsc.q={query}&gsc.sort=",
        name_and_topics: "JURN: academic papers, research, journals",
        spaceReplacement: "%20"
    },
    {
        name: "RefSeek",
        topics: "academic papers, research, journals",
        template: "https://www.refseek.com/search?q={query}",
        name_and_topics: "RefSeek: academic papers, research, journals",
        spaceReplacement: "+"
    },
    {
        name: "CiteSeerX",
        topics: "academic papers, research, journals",
        template: "https://citeseerx.ist.psu.edu/search_result?query={query}&pdf=false",
        name_and_topics: "CiteSeerX: academic papers, research, journals",
        spaceReplacement: "%20"
    },
    {
        name: "SagePub",
        topics: "academic papers, research, journals",
        template: "https://journals.sagepub.com/action/doSearch?filterOption=allJournal&AllField={query}&access=18",
        name_and_topics: "SagePub: academic papers, research, journals",
        spaceReplacement: "+"
    },
    {
        name: "Google Scholar",
        topics: "academic papers, research, journals",
        template: "https://scholar.google.com/scholar?hl=en&q={query}",
        name_and_topics: "Google Scholar: academic papers, research, journals",
        spaceReplacement: "%20"
    },
    {
        name: "Royal Society Publishing",
        topics:"academic papers, research", 
         template:"https://royalsocietypublishing.org/search-results?q={query}&access_openaccess=true",
         name_and_topics:"Royal Society Publishing : academic papers , research ",
         spaceReplacement:"+"
     },
     {
         name:"Science Open", 
         topics:"academic papers , research , journals ", 
         template:"https://www.scienceopen.com/search#('v'~4_'id'~''_'queryType'~1_'context'~null_'kind'~77_'order'~0_'orderLowestFirst'~false_'query'~'{query}'_'filters'~!('kind'~84_'openAccess'~true)*_'hideOthers'~false)", 
         name_and_topics:"Science Open : academic papers , research , journals ", 
         spaceReplacement:"%20"
     },
     {
         name:"FrontiersIn", 
         topics:"academic papers , research , journals ", 
         template:"https://www.frontiersin.org/search?query={query}&tab=top-results", 
         name_and_topics:"FrontiersIn : academic papers , research , journals ", 
         spaceReplacement:"+"
     },
     {
         name:"Semantic Scholar", 
         topics:"academic papers , research , journals ", 
         template:"https://www.semanticscholar.org/search?q={query}&sort=relevance", 
         name_and_topics:"Semantic Scholar : academic papers , research , journals ", 
         spaceReplacement:"%20"
     },
     {
         name:"PubHub", 
         topics:"academic papers , research , journals ", 
         template:"https://www.pubpub.org/search?q={query}", 
         name_and_topics:"PubHub : academic papers , research , journals ", 
         spaceReplacement:"+"
     },
     {
          name :"ResearchGate" ,
          topics :"academic paper s,research,journals" ,
          template :"https://www.researchgate.net/search/publication?q={query}" ,
          name_and_topics :"ResearchGate : academic paper s,research,journals" ,
          spaceReplacement :"+"
     },
     {
        name: "ArXiv",
        topics: "academic papers, research, journals, physics, computer science",
        template: "https://arxiv.org/search/?query={query}&searchtype=all&source=header",
        name_and_topics: "ArXiv: academic papers, research, journals, physics, computer science",
        spaceReplacement: "+"
     },
     {
        name: "bioRxiv",
        topics: "academic papers, research, journals, biology, life sciences",
        template: "https://www.biorxiv.org/search/{query}",
        name_and_topics: "bioRxiv: academic papers, research, journals, biology, life sciences",
        spaceReplacement: "%252B"
     },
     {
        name: "ChemRxiv",
        topics: "academic papers, research, journals, chemistry",
        template: "https://chemrxiv.org/engage/chemrxiv/search-dashboard?text={query}",
        name_and_topics: "ChemRxiv: academic papers, research, journals, chemistry",
        spaceReplacement: "%20"
     },
     {
        name: "medRxiv",
        topics: "academic papers, research, journals, medicine, health sciences",
        template: "https://www.medrxiv.org/search/{query}",
        name_and_topics: "medRxiv: academic papers, research, journals, medicine, health sciences",
        spaceReplacement: "%252B"
     },
     {
        name: "SocArXiv",
        topics: "academic papers, research, journals, social sciences",
        template: "https://osf.io/preprints/socarxiv/discover?search={query}",
        name_and_topics: "SocArXiv: academic papers, research, journals, social sciences",
        spaceReplacement: "%20"
     },
     {
        name: "PsyArXiv",
        topics: "academic papers, research, journals, psychology",
        template: "https://osf.io/preprints/psyarxiv/discover?search={query}",
        name_and_topics: "PsyArXiv: academic papers, research, journals, psychology",
        spaceReplacement: "%20"
     },
     {
        name: "EconStor",
        topics: "academic papers, research, journals, economics, business",
        template: "www.econstor.eu/econbiz-search?query={query}",
        name_and_topics: "EconStor: academic papers, research, journals, economics, business",
        spaceReplacement: "+"
     },
     {
        name: "SSRN",
        topics: "academic papers, research, journals, social sciences, humanities",
        template: "https://papers.ssrn.com/searchresults.cfm?term={query}",
        name_and_topics: "SSRN: academic papers, research, journals, social sciences, humanities",
        spaceReplacement: "+"
     }
];
