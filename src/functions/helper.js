export async function fetchData(query = null, region = null, page = 1) {
  let flags = await getData();
  flags = await filter(query, region, flags);

  const to = page * 20;
  const from = to - 20;
  const maxLength = flags.length;

  flags = flags.slice(from, to < maxLength ? to : maxLength);
  return { flags, maxLength };
}

export async function findId(id) {
  try {
    const resp = await fetch("../data.json");
    const data = await resp.json();
    const flag = data.find(
      (flag) => flag.alpha3Code.toLowerCase().trim() === id.toLowerCase().trim()
    );
    const returnFlag =
      flag.borders === undefined ? flag : setBorderCountries(data, flag);
    return returnFlag;
  } catch (error) {
    console.log(error.message);
  }
}

function setBorderCountries(data, flag) {
  let borderCountries = [];
  borderCountries = flag.borders.map((border) => {
    return data.filter((c) => c.alpha3Code === border)[0];
  });

  let reducedFlags = [];
  for (const borderC of borderCountries) {
    reducedFlags.push({ name: borderC.name, id: borderC.alpha3Code });
  }
  flag.borderCountries = reducedFlags;

  return flag;
}

export async function filter(query, region, flags) {
  let resp = flags;
  if (query) {
    resp = await filterByName(query, resp);
  }
  if (region) {
    resp = await filterByRegion(region, resp);
  }
  return resp;
}

function filterByRegion(region, flags) {
  const filteredByRegionCountries = flags.filter((flag) => {
    return flag.region === region;
  });
  return filteredByRegionCountries;
}

export async function filterByName(query, flags) {
  if (!query) return flags;
  const input = query.toLowerCase().trim();
  const filteredFlags = flags.filter((flag) => {
    return (
      flag.name.toLowerCase().includes(input) ||
      flag.nativeName.toLowerCase().includes(input)
    );
  });
  return filteredFlags;
}

export async function getData() {
  try {
    const resp = await fetch("../data.json");
    const data = await resp.json();
    const response = parseCountries(data);
    return await response;
  } catch (error) {
    console.log(error.message);
  }
}

async function parseCountries(countries) {
  let newFlags = [];
  for (const country of countries) {
    let newCountry = {
      alpha3Code: country.alpha3Code,
      name: country.name,
      population: country.population,
      region: country.region,
      capital: country.capital,
      subregion: country.subregion,
      nativeName: country.nativeName,
      topLevelDomain: country.topLevelDomain,
      currencies: country.currencies,
      languages: country.languages,
      borderCountries: country.borders,
      img: country.flag,
    };

    newFlags = [...newFlags, newCountry];
  }
  return newFlags;
}
