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
  console.log(borderCountries);
  for (const borderC of borderCountries) {
    reducedFlags.push({ name: borderC.name, id: borderC.alpha3Code });
  }
  flag.borderCountries = reducedFlags;

  return flag;
}
