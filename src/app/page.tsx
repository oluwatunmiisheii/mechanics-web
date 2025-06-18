import {
  getCountries,
  getCountryLocations,
} from "@/services/countries.service";
import { Hero } from "./_components/hero";
import { Locations } from "./_components/locations";


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const HomePage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const country = searchParams.country as string

  const countries = await getCountries().catch(() => {
    return [];
  });

  const userCountry = countries.find(
    (c) => c.iso2 === country
  )

  const defaultCountry = countries.find((c) => c.iso2 === 'GB') || countries[0];
  const selectedCountry = userCountry || defaultCountry;


  const locations = await getCountryLocations(selectedCountry.slug, 1).catch(
    () => {
      return [];
    }
  );

  return (
    <>
      <Hero countries={countries} initialCountry={selectedCountry} />
      <Locations
        initialLocations={locations}
        initialCountry={selectedCountry.name}
      />
    </>
  );
};

export default HomePage;
