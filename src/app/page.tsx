import { getCountries, getCountryLocations } from "@/services/countries.service";
import { Hero } from "./_components/hero";
import { Locations } from "./_components/locations";

const HomePage = async () => {
  const countries = await getCountries().catch(() => {
    return [];
  });

  if(!countries || countries.length === 0) {
    return <div>No countries available</div>;
  }
  const selectedCountry = countries[2];
  console.log("🚀 ~ HomePage ~ selectedCountry:", selectedCountry)
  const locations = await getCountryLocations(selectedCountry.slug, 1).catch(() => {
    return [];
  });

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
