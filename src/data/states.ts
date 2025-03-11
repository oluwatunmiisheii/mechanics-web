import { State } from "@/components/location-card";

export const statesByCountry: Record<string, State[]> = {
    usa: [
        {
            id: "california",
            name: "California",
            image: "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=500&auto=format&fit=crop",
            cityCount: 482,
            description: "The Golden State with tech hubs, beaches, and Hollywood. Home to San Francisco, Los Angeles, and San Diego."
        },
        {
            id: "new-york",
            name: "New York",
            image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=500&auto=format&fit=crop",
            cityCount: 62,
            description: "The Empire State with NYC, the Finger Lakes, and Niagara Falls. A cultural and financial powerhouse."
        },
        {
            id: "texas",
            name: "Texas",
            image: "https://images.unsplash.com/photo-1566954268351-368716ee0476?q=80&w=500&auto=format&fit=crop",
            cityCount: 1210,
            description: "The Lone Star State with Houston, Dallas, and Austin. Known for BBQ, live music, and sprawling landscapes."
        },
        {
            id: "florida",
            name: "Florida",
            image: "https://images.unsplash.com/photo-1596443686116-d2443145aa89?q=80&w=500&auto=format&fit=crop",
            cityCount: 411,
            description: "The Sunshine State with Miami, Orlando, and the Keys. Beaches, theme parks, and vibrant nightlife."
        },
        {
            id: "colorado",
            name: "Colorado",
            image: "https://images.unsplash.com/photo-1589819482385-08ca455b9425?q=80&w=500&auto=format&fit=crop",
            cityCount: 271,
            description: "The Centennial State with Denver, Aspen, and Boulder. Mountains, skiing, and outdoor recreation."
        },
        {
            id: "washington",
            name: "Washington",
            image: "https://images.unsplash.com/photo-1538490270180-dbbbcbdbb1a5?q=80&w=500&auto=format&fit=crop",
            cityCount: 281,
            description: "The Evergreen State with Seattle, Spokane, and Olympic National Park. Tech, coffee, and natural beauty."
        }
    ],
    uk: [
        {
            id: "england",
            name: "England",
            image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=500&auto=format&fit=crop",
            cityCount: 51,
            description: "Home to London, Manchester, and Liverpool. Rich history, modern culture, and iconic landmarks."
        },
        {
            id: "scotland",
            name: "Scotland",
            image: "https://images.unsplash.com/photo-1572958642760-e4f05032774d?q=80&w=500&auto=format&fit=crop",
            cityCount: 7,
            description: "Land of Edinburgh, Glasgow, and the Highlands. Castles, whisky, and breathtaking landscapes."
        },
        {
            id: "wales",
            name: "Wales",
            image: "https://images.unsplash.com/photo-1591634616938-1dfa7ee2e617?q=80&w=500&auto=format&fit=crop",
            cityCount: 6,
            description: "Home to Cardiff, Swansea, and Snowdonia National Park. Dragons, rugby, and scenic coastlines."
        },
        {
            id: "northern-ireland",
            name: "Northern Ireland",
            image: "https://images.unsplash.com/photo-1609945648638-bba27daa6193?q=80&w=500&auto=format&fit=crop",
            cityCount: 5,
            description: "Land of Belfast, Giant's Causeway, and Titanic history. Rich heritage and stunning landscapes."
        }
    ],
    canada: [
        {
            id: "ontario",
            name: "Ontario",
            image: "https://images.unsplash.com/photo-1503814921915-3be3fd8bfb0e?q=80&w=500&auto=format&fit=crop",
            cityCount: 52,
            description: "Home to Toronto, Ottawa, and Niagara Falls. Canada's most populous province with diverse attractions."
        },
        {
            id: "british-columbia",
            name: "British Columbia",
            image: "https://images.unsplash.com/photo-1519831647073-7cf8e7ccfcb2?q=80&w=500&auto=format&fit=crop",
            cityCount: 53,
            description: "Land of Vancouver, Victoria, and Whistler. Mountains, oceans, and stunning natural beauty."
        },
        {
            id: "quebec",
            name: "Quebec",
            image: "https://images.unsplash.com/photo-1580507898034-bb01b8e8a702?q=80&w=500&auto=format&fit=crop",
            cityCount: 88,
            description: "Home to Montreal, Quebec City, and Mont-Tremblant. French culture, architecture, and gastronomy."
        },
        {
            id: "alberta",
            name: "Alberta",
            image: "https://images.unsplash.com/photo-1619982142995-6baf83cc1304?q=80&w=500&auto=format&fit=crop",
            cityCount: 19,
            description: "Land of Calgary, Edmonton, and Banff National Park. Rocky Mountains, prairies, and outdoor adventures."
        },
        {
            id: "nova-scotia",
            name: "Nova Scotia",
            image: "https://images.unsplash.com/photo-1610878553195-d22206932884?q=80&w=500&auto=format&fit=crop",
            cityCount: 30,
            description: "Home to Halifax, Cape Breton, and Peggy's Cove. Maritime culture, seafood, and scenic coastlines."
        }
    ]
};
