import React, { useContext } from "react";
import styles from "./Flag.module.css";
import { FlagContext } from "../../App";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { findId } from "../../functions/helper";

export async function loader({ params }) {
  const flagId = params.flag;
  const flag = await findId(flagId);
  return flag;
}

function Flag() {
  const flag = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className={styles.outerLayer}>
      <div className={styles.imageCard}>
        <div className={styles.back}>
          <button onClick={() => navigate("/")} className={styles.backButton}>
            <i className="fa-solid fa-arrow-left-long"></i>return
          </button>
          <div className={styles.content}>
            <img src={flag.flag} alt="" />
            <div className={styles.info}>
              <p className={styles.title}>{flag.name}</p>
              <div className={styles["columns-2"]}>
                <div>
                  <p>
                    Native Name: <span>{flag.name}</span>
                  </p>
                  <p>
                    Population: <span>{flag.population}</span>
                  </p>
                  <p>
                    Region: <span>{flag.region}</span>
                  </p>
                  <p>
                    SubRegion: <span>{flag.subregion}</span>
                  </p>
                  <p>
                    Capital: <span>{flag.capital}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Top Level Domain: <span>{flag.topLevelDomain}</span>
                  </p>
                  <p>
                    Currencies:
                    {flag.currencies.map((currency) => (
                      <span key={currency.code}>{currency.name}</span>
                    ))}
                  </p>
                  <p>
                    Languages:
                    {flag.languages.map((lang) => (
                      <span key={lang.name}>
                        {" "}
                        {lang.name} <br />{" "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className={styles.borderCountries}>
                {flag.borderCountries ? <p>Border Countries: </p> : ""}
                {flag.borderCountries === undefined
                  ? ""
                  : flag.borderCountries.map((border) => {
                      return (
                        <Link
                          to={`/flag/${border.id}`}
                          key={border.id}
                          className={styles.linkCountry}
                          href="#"
                        >
                          {border.name}
                        </Link>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flag;
