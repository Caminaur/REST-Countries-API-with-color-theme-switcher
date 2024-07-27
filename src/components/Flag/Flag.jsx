import React from "react";
import styles from "./Flag.module.css";
import {
  Form,
  Link,
  NavLink,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { findId } from "../../functions/helper";

export async function loader({ params }) {
  const flagId = params.flag;
  const flag = await findId(flagId);
  return flag;
}

function Flag() {
  const flag = useLoaderData();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(-1);
  };

  return (
    <div className={styles.outerLayer}>
      <div className={styles.imageCard}>
        <div className={styles.back}>
          <NavLink to="/">
            <button onClick={handleNavigation} className={styles.backButton}>
              <i className="fa-solid fa-arrow-left-long"></i>return
            </button>
          </NavLink>
          <div className={styles.content}>
            <div className={styles.image}>
              <img src={flag.flag} alt="" />
            </div>
            <div className={styles.info}>
              <p className={styles.title}>{flag.name}</p>
              <div className={styles["columns-2"]}>
                <div>
                  <p>
                    Native Name: <span>{flag.name ?? ""}</span>
                  </p>
                  <p>
                    Population: <span>{flag.population ?? ""}</span>
                  </p>
                  <p>
                    Region: <span>{flag.region ?? ""}</span>
                  </p>
                  <p>
                    SubRegion: <span>{flag.subregion ?? ""}</span>
                  </p>
                  {flag.capital ? (
                    <p>
                      Capital: <span>{flag.capital ?? ""}</span>
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <p>
                    Top Level Domain: <span>{flag.topLevelDomain ?? ""}</span>
                  </p>
                  <p>
                    Currencies:
                    {flag.currencies ? (
                      flag.currencies.map((currency) => (
                        <span key={currency.code}>{currency.name}</span>
                      ))
                    ) : (
                      <span> N/A</span>
                    )}
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
