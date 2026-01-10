import { LinkTemplate } from "types";

/** Array of link templates for generating URLs */
export const DEFAULT_LINKS: LinkTemplate[] = [
    {
        name: "Wikipedia",
        topics: "encyclopedia, reference",
        template: "https://en.wikipedia.org/wiki/{query}",
        spaceReplacement: "_"
    },
    {
        name: "Stanford Encyclopedia",
        topics: "philosophy, reference",
        template: "https://plato.stanford.edu/entries/{query}/",
        spaceReplacement: "-"
    },
    {
        name: "Internet Archive",
        topics: "books, archives, general knowledge",
        template: "https://archive.org/search?query={query}&tab=fulltext",
        spaceReplacement: "+"
    },
    {
        name: "dblp computer science bibliography",
        topics: "computer science, research, academic papers",
        template: "https://dblp.org/search?q={query}",
        spaceReplacement: "%20"
    },
    {
        name: "Open Shadow Library Uptime Monitor",
        topics: "uptime monitoring, infrastructure, open texts, books",
        template: "https://open-slum.org/",
        spaceReplacement: "%20"
    },
    {
        name: "Project Gutenberg",
        topics: "books, literature, general knowledge",
        template: "https://www.gutenberg.org/ebooks/search/?query={query}",
        spaceReplacement: "+"
    },
    {
        name: "Google Books",
        topics: "books, literature, general knowledge",
        template: "https://www.google.com/search?tbm=bks&q={query}",
        spaceReplacement: "%20"
    },
    {
        name: "Open Library",
        topics: "books, literature, general knowledge",
        template: "https://openlibrary.org/search?q={query}",
        spaceReplacement: "+"
    },
    {
        name: "DOAJ",
        topics: "academic papers, research, journals",
        template: "https://doaj.org/search/articles?ref=quick-search&source=%7B%22query%22%3A%7B%22query_string%22%3A%7B%22query%22%3A%22{query}%22%2C%22default_operator%22%3A%22AND%22%7D%7D%2C%22track_total_hits%22%3Atrue%7D",
        spaceReplacement: "%20"
    },
    {
        name: "BASE",
        topics: "academic papers, research, journals, Bielefeld University Library",
        template: "https://www.base-search.net/Search/Results?type=all&lookfor={query}",
        spaceReplacement: "+"
    },
    {
        name: "CORE",
        topics: "academic papers, research, journals",
        template: "https://core.ac.uk/search/?q={query}",
        spaceReplacement: "%20"
    },
    {
        name: "PubMed",
        topics: "academic papers, research, journals, biology, medicine",
        template: "https://pubmed.ncbi.nlm.nih.gov/?term={query}",
        spaceReplacement: "+"
    },
    {
        name: "JURN",
        topics: "academic papers, research, journals",
        template: "https://www.jurn.link/#gsc.tab=0&gsc.q={query}&gsc.sort=",
        spaceReplacement: "%20"
    },
    {
        name: "RefSeek",
        topics: "academic papers, research, journals",
        template: "https://www.refseek.com/search?q={query}",
        spaceReplacement: "+"
    },
    {
        name: "CiteSeerX",
        topics: "academic papers, research, journals",
        template: "https://citeseerx.ist.psu.edu/search_result?query={query}&pdf=false",
        spaceReplacement: "%20"
    },
    {
        name: "SagePub",
        topics: "academic papers, research, journals",
        template: "https://journals.sagepub.com/action/doSearch?filterOption=allJournal&AllField={query}&access=18",
        spaceReplacement: "+"
    },
    {
        name: "Google Scholar",
        topics: "academic papers, research, journals",
        template: "https://scholar.google.com/scholar?hl=en&q={query}",
        spaceReplacement: "%20"
    },
    {
        name: "Royal Society Publishing",
        topics:"academic papers, research", 
         template:"https://royalsocietypublishing.org/search-results?q={query}&access_openaccess=true",
         spaceReplacement:"+"
     },
     {
         name:"Science Open", 
         topics:"academic papers , research , journals ", 
         template:"https://www.scienceopen.com/search#('v'~4_'id'~''_'queryType'~1_'context'~null_'kind'~77_'order'~0_'orderLowestFirst'~false_'query'~'{query}'_'filters'~!('kind'~84_'openAccess'~true)*_'hideOthers'~false)", 
         spaceReplacement:"%20"
     },
     {
         name:"FrontiersIn", 
         topics:"academic papers , research , journals ", 
         template:"https://www.frontiersin.org/search?query={query}&tab=top-results", 
         spaceReplacement:"+"
     },
     {
         name:"Semantic Scholar", 
         topics:"academic papers , research , journals ", 
         template:"https://www.semanticscholar.org/search?q={query}&sort=relevance", 
         spaceReplacement:"%20"
     },
     {
         name:"PubHub", 
         topics:"academic papers , research , journals ", 
         template:"https://www.pubpub.org/search?q={query}", 
         spaceReplacement:"+"
     },
     {
          name :"ResearchGate" ,
          topics :"academic paper s,research,journals" ,
          template :"https://www.researchgate.net/search/publication?q={query}" ,
          spaceReplacement :"+"
     },
     {
        name: "ArXiv",
        topics: "academic papers, research, journals, physics, astronomy, math, computer science, quantitative biology, statistics",
        template: "https://arxiv.org/search/?query={query}&searchtype=all&source=header",
        spaceReplacement: "+"
     },
     {
        name: "bioRxiv",
        topics: "academic papers, research, journals, biology, life sciences",
        template: "https://www.biorxiv.org/search/{query}",
        spaceReplacement: "%252B"
     },
     {
        name: "ChemRxiv",
        topics: "academic papers, research, journals, chemistry",
        template: "https://chemrxiv.org/engage/chemrxiv/search-dashboard?text={query}",
        spaceReplacement: "%20"
     },
     {
        name: "medRxiv",
        topics: "academic papers, research, journals, medicine, health sciences",
        template: "https://www.medrxiv.org/search/{query}",
        spaceReplacement: "%252B"
     },
     {
        name: "SocArXiv",
        topics: "academic papers, research, journals, social sciences",
        template: "https://osf.io/preprints/socarxiv/discover?search={query}",
        spaceReplacement: "%20"
     },
     {
        name: "PsyArXiv",
        topics: "academic papers, research, journals, psychology",
        template: "https://osf.io/preprints/psyarxiv/discover?search={query}",
        spaceReplacement: "%20"
     },
     {
        name: "EconStor",
        topics: "academic papers, research, journals, economics, business",
        template: "www.econstor.eu/econbiz-search?query={query}",
        spaceReplacement: "+"
     },
     {
        name: "SSRN",
        topics: "academic papers, research, journals, social sciences, humanities",
        template: "https://papers.ssrn.com/searchresults.cfm?term={query}",
        spaceReplacement: "+"
     },
     {
        name: "HAL",
        topics: "academic papers, research, journals, multi-disciplinary",
        template: "https://hal.science/search/index?q={query}",
        spaceReplacement: "+"
     },
     {
        name: "OpenAIRE",
        topics: "academic papers, research, journals, multi-disciplinary",
        template: "https://explore.openaire.eu/search/find?fv0={query}&f0=q",
        spaceReplacement: "%20"
     },
     {
        name: "ScienceDirect",
        topics: "academic papers, research, journals, science, multi-disciplinary",
        template: "https://www.sciencedirect.com/search?qs={query}&accessTypes=openaccess&lastSelectedFacet=accessTypes",
        spaceReplacement: "+"
     },
     {
        name: "Wiley Online Library",
        topics: "academic papers, research, journals, science, health",
        template: "https://onlinelibrary.wiley.com/action/doSearch?AllField={query}",
        spaceReplacement: "+"
     },
     {
        name: "Taylor & Francis Online",
        topics: "academic papers, research, journals, multi-disciplinary",
        template: "https://www.tandfonline.com/action/doSearch?AllField={query}&startPage=&pageSize=10&openAccess=18",
        spaceReplacement: "+"
     },
     {
        name: "SpringerLink",
        topics: "academic papers, research, journals, multi-disciplinary",
        template: "https://link.springer.com/search?query={query}&openAccess=true",
        spaceReplacement: "+"
     },
     {
        name: "EarthArXiv",
        topics: "academic papers, research, journals, earth sciences, geosciences",
        template: "https://eartharxiv.org/repository/search/{query}/",
        spaceReplacement: "%20"
     },
     {
        name: "AgriXiv",
        topics: "academic papers, research, journals, agriculture, life sciences",
        template: "https://www.cabidigitallibrary.org/action/doSearch?AllField={query}&SeriesKey=agrirxiv",
        spaceReplacement: "+"
     },
     {
        name: "ERIC",
        topics: "academic papers, research, journals, education",
        template: "https://eric.ed.gov/?q={query}",
        spaceReplacement: "+"
     },
     {
        name: "African Journals Online",
        topics: "academic papers, research, journals, Africa, multi-disciplinary",
        template: "https://www.ajol.info/index.php/ajol/search/search?query={query}",
        spaceReplacement: "+"
     },
     {
        name: "SciELO",
        topics: "academic papers, research, journals, Latin America, Spanish, Portuguese, multi-disciplinary",
        template: "https://search.scielo.org/?q=&lang=en&count=15&from=0&output=site&sort=&format=summary&fb=&page=1&q={query}&lang=en&page=1",
        spaceReplacement: "+"
     },
     {
        name: "LENS",
        topics: "research, patents, R&D, innovation, intellectual property",
        template: "https://www.lens.org/lens/search/patent/list?q={query}",
        spaceReplacement: "%20"
     },
     {
        name: "NASA ADS",
        topics: "academic papers, research, journals, astronomy, astrophysics, physics",
        template: "https://ui.adsabs.harvard.edu/search/q={query}",
        spaceReplacement: "%20"
     },
     {
        name: "SciXplorer",
        topics: "academic papers, research, astronomy, Earth science, heliophysics, physics, astrophysics, planetary science",
        template: "https://www.scixplorer.org/search?d=general&p=1&q={query}&sort=score+desc&sort=date+desc",
        spaceReplacement: "+"
     },
     {
        name: "IOPScience",
        topics: "academic papers, research, journals, physics, astronomy, materials science",
        template: "https://iopscience.iop.org/nsearch?terms={query}",
        spaceReplacement: "+"
     },
     {
        name: "Europe PMC",
        topics: "academic papers, research, journals, life sciences, biology, medicine, biomedical",
        template: "https://europepmc.org/search?query={query}",
        spaceReplacement: "%20"
     },
     {
        name: "WIPO",
        topics: "research, patents, intellectual property, innovation",
        template: "https://www.wipo.int/search/en/results?q={query}",
        spaceReplacement: "+"
     },
     {
        name: "Espacenet",
        topics: "research, patents, intellectual property, innovation, Europe",
        template: "https://worldwide.espacenet.com/patent/search?q={query}",
        spaceReplacement: "%20"
     },
     {
        name: "Google Patents",
        topics: "research, patents, intellectual property, innovation",
        template: "https://patents.google.com/?oq={query}",
        spaceReplacement: "+"
     },
    {
      "name": "SearchMySite",
      "topics": "website search, blogs, indie web, custom search engine",
      "template": "https://searchmysite.net/search/?q={query}",
      "spaceReplacement": "+"
    },
    {
      "name": "Digital Public Library of America",
      "topics": "digital library, archives, primary sources, united states of america, multimedia, national library",
      "template": "https://dp.la/search?q={query}",
      "spaceReplacement": "+"
    },
    {
      "name": "Europeana",
      "topics": "digital library, archives, primary sources, europe, multimedia",
      "template": "https://www.europeana.eu/en/search?page=1&view=grid&query={query}",
      "spaceReplacement": "%20"
    },
    {
      "name": "HathiTrust Digital Library",
      "topics": "digital library, books, archive, literature, general knowledge",
      "template": "https://babel.hathitrust.org/cgi/ls?q1={query}&field1=ocr&a=srchls&ft=ft&lmt=ft",
      "spaceReplacement": "+"
    },
    {
      "name": "DigitalNZ",
      "topics": "digital library, archives, primary sources, new zealand, multimedia, national library",
      "template": "https://digitalnz.org/records?text={query}",
      "spaceReplacement": "+"
    },
    {
      "name": "Trove",
      "topics": "digital library, archives, primary sources, australia, multimedia, national library",
      "template": "https://trove.nla.gov.au/search?keyword={query}",
      "spaceReplacement": "%20"
    },
    {
      "name": "Canadian Digital Library",
      "topics": "digital library, archives, primary sources, canada, multimedia, national library",
      "template": "https://recherche-collection-search.bac-lac.gc.ca/eng/Home/Result?q_1={query}&SEARCH_TYPE=SEARCH_BASIC&q_type_1=query",
      "spaceReplacement": "+"
    },
    {
      "name": "Austrian National Library Digital Collections",
      "topics": "digital library, archives, primary sources, austria, multimedia, national library",
      "template": "https://search.onb.ac.at/primo-explore/search?institution=43ACC_ONB&vid=ONB&tab=default_tab&search_scope=ONB_gesamtbestand&mode=basic&displayMode=full&bulkSize=10&highlight=true&dum=true&displayField=all&query=any,contains,{query}",
      "spaceReplacement": "%20"
    },
    {
      "name": "National Library of Australia Digital Collections",
      "topics": "digital library, archives, primary sources, australia, multimedia, national library",
      "template": "https://catalogue.nla.gov.au/search?q={query}",
      "spaceReplacement": "+"
    },
    {
      "name": "OOH Blog Directory",
      "topics": "website search, blogs, indie web, custom search engine",
      "template": "https://ooh.directory/search/?q={query}",
      "spaceReplacement": "+"
    },
    {
      "name": "Blogarama",
      "topics": "website search, blogs, indie web, custom search engine",
      "template": "https://www.blogarama.com/search-posts?search={query}",
      "spaceReplacement": "+"
    },
    {
      "name": "MiniFeed",
      "topics": "website search, blogs, indie web, custom search engine, RSS",
      "template": "https://minifeed.net/search?q={query}",
      "spaceReplacement": "+"
    },
    {
      "name": "Feedspot",
      "topics": "website search, blogs, indie web, custom search engine, RSS",
      "template": "https://www.feedspot.com/search?q={query}",
      "spaceReplacement": "+"
    },
    {
      "name": "Wiby",
      "topics": "website search, indie web, minimalist search engine, blogs",
      "template": "https://wiby.me/?q={query}",
      "spaceReplacement": "+"
    },
    {
        "name": "Instructables",
        "topics": "DIY, crafts, tutorials, maker culture",
        "template": "https://www.instructables.com/search?q={query}",
        "spaceReplacement": "+"
    },
    {
        "name": "AllRecipes",
        "topics": "cooking, recipes, food",
        "template": "https://www.allrecipes.com/search?q={query}",
        "spaceReplacement": "+"
    },
    {
        "name": "WikiHow",
        "topics": "how-to guides, tutorials, DIY, crafts",
        "template": "https://www.wikihow.com/wikiHowTo?search=heal+bruise&Search=",
        "spaceReplacement": "+"
    },
    {
        "name": "Arduino Project Hub",
        "topics": "Arduino, electronics, DIY, maker culture, IOT, project tutorials",
        "template": "https://projecthub.arduino.cc/?value={query}",
        "spaceReplacement": "+"
    },
    {
        "name": "PiMyLifeUp",
        "topics": "Raspberry Pi, DIY, electronics, maker culture, IOT, project tutorials",
        "template": "https://pimylifeup.com/?s={query}",
        "spaceReplacement": "+"
    },
    {
        name: "Hackster.io",
        topics: "Arduino, Raspberry Pi, DIY, electronics, maker culture, IOT, project tutorials",
        template: "https://www.hackster.io/search?i=projects&q={query}",
        spaceReplacement: "%20"
    },
    {
        name: "Family Handyman",
        topics: "home improvement, DIY, crafts, tutorials",
        template: "https://www.familyhandyman.com/?s={query}",
        spaceReplacement: "+"
    },
    {
        name: "DoItYourself",
        topics: "home improvement, DIY, crafts, tutorials",
        template: "https://www.doityourself.com/search?dsp=how-to&psearch={query}",
        spaceReplacement: "+"
    },
    {
        name: "DIY Joy",
        topics: "DIY, crafts, home improvement, tutorials",
        template: "https://diyjoy.com/?s={query}",
        spaceReplacement: "+"
    },
    {
        name: "eHow",
        topics: "how-to guides, tutorials, DIY, crafts, home improvement",
        template: "https://www.ehow.com/search?q={query}",
        spaceReplacement: "%20"
    },
    {
        name: "Spruce Crafts",
        topics: "DIY, crafts, tutorials, maker culture, home decor, sewing, knitting",
        template: "https://www.thesprucecrafts.com/search?q={query}",
        spaceReplacement: "+"
    },
    {
        name: "Craftsy",
        topics: "DIY, crafts, tutorials, maker culture, sewing, knitting, quilting",
        template: "https://www.craftsy.com/search?s={query}",
        spaceReplacement: "+"
    },
    {
        name: "Ana White",
        topics: "DIY, woodworking, home improvement, tutorials",
        template: "https://www.ana-white.com/search?search_api_fulltext={query}",
        spaceReplacement: "+"
    },
    {
        name: "Flickr",
        topics: "photography, images, creative commons, visual media",
        template: "https://www.flickr.com/search/?text={query}",
        spaceReplacement: "+"
    },
    {
        name: "Unsplash",
        topics: "photography, images, creative commons, visual media",
        template: "https://unsplash.com/s/photos/{query}",
        spaceReplacement: "-"
    },
    {
        name: "Pexels",
        topics: "photography, images, creative commons, visual media",
        template: "https://www.pexels.com/search/{query}/",
        spaceReplacement: "%20"
    },
    {
        name: "Pixabay Photos",
        topics: "photography, images, creative commons, visual media",
        template: "https://pixabay.com/photos/search/{query}/",
        spaceReplacement: "%20"
    },
    {
        name: "Burst by Shopify",
        topics: "photography, images, creative commons, visual media",
        template: "https://www.shopify.com/stock-photos/photos/search?q={query}",
        spaceReplacement: "+"
    },
    {
        name: "iStockPhoto",
        topics: "photography, images, creative commons, visual media",
        template: "https://www.istockphoto.com/search/2/image-film?phrase={query}&mediatype=photography",
        spaceReplacement: "%20"
    },
    {
        name: "Glass.Photo",
        topics: "photography, images, creative commons, visual media",
        template: "https://glass.photo/explore/photos/{query}",
        spaceReplacement: "-"
    },
    {
        name: "500px Photography",
        topics: "photography, images, creative commons, visual media",
        template: "https://500px.com/search?q={query}&type=photos&sort=relevance",
        spaceReplacement: "%20"
    },
    {
        name: "Imgur",
        topics: "photography, images, memes, visual media",
        template: "https://imgur.com/search/score/all?q={query}",
        spaceReplacement: "%20"
    },
    {
        name: "1x Photography",
        topics: "photography, images, creative commons, visual media",
        template: "https://1x.com/search/{query}",
        spaceReplacement: "%20"
    },
    {
        name: "Adobe Stock",
        topics: "photography, images, creative commons, visual media",
        template: "https://stock.adobe.com/search/images?filters%5Bcontent_type%3Aphoto%5D=1&filters%5Bcontent_type%3Aillustration%5D=0&filters%5Bcontent_type%3Azip_vector%5D=0&filters%5Bcontent_type%3Avideo%5D=0&filters%5Bcontent_type%3Atemplate%5D=0&filters%5Bcontent_type%3A3d%5D=0&filters%5Bcontent_type%3Aaudio%5D=0&filters%5Binclude_stock_enterprise%5D=0&filters%5Bcontent_type%3Aimage%5D=1&filters%5Bgentech%5D=exclude&k={query}&order=relevance&price%5B%24%5D=1&limit=100&search_type=filter-select&search_page=1&get_facets=1",
        spaceReplacement: "+"
    },
    {
        name: "Canva Photos",
        topics: "photography, images, creative commons, visual media",
        template: "https://www.canva.com/photos/search/{query}/",
        spaceReplacement: "-"
    },
    {
        name: "Shutterstock",
        topics: "photography, images, creative commons, visual media",
        template: "https://www.shutterstock.com/search/{query}?image_type=photo",
        spaceReplacement: "-"
    },
    {
        name: "Behance",
        topics: "photography, images, creative commons, visual media, design portfolios",
        template: "https://www.behance.net/search/projects/{query}",
        spaceReplacement: "%20"
    }
];
