'use server';
import { get } from "@/lib/fetch"
import type { Country, CountriesApiResponse, LocationApiResponse } from "@/model/countries.model"

export const getCountries = async (): Promise<Country[]> => {
    const serverCountries = await get<CountriesApiResponse>("/countries")
    const countryList = serverCountries.results.map<Country>((country) => ({...country}))
    return countryList
}

export const getCountryLocations = async (countrySlug: string, page: number) => {
    const serverLocations = await get <LocationApiResponse>(`/countries/${countrySlug}/locations?page=${page}`)
    return serverLocations
}