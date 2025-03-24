export interface Country {
    id: number
    name: string;
    flag_unicode: string;
    iso2: string;
    slug: string;
}

export interface CountriesApiResponse {
    results: Country[]
    count: number
    next: string | null
    previous: string | null
}


interface Location {
    id: number;
    name: string;
    slug: string;
    population: number | null;
    country: number;
}

export interface LocationApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Location[];
}
