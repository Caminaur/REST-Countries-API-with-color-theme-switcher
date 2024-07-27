import React from "react";
import styles from "./Main.module.css";
import CountryCard from "../CountryCard/CountryCard";
import SearchBar from "../SearchBar/SearchBar";
import { fetchData } from "../../functions/helper";
import { Form, useLoaderData, useSubmit } from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? null;
  const page = url.searchParams.get("page") ?? 1;
  const region = url.searchParams.get("region") ?? null;
  const { flags, maxLength } = await fetchData(q, region, page);
  const pages = Math.ceil(maxLength / 20);
  return { flags, pages, q, region, page };
}

function Main() {
  const { flags, pages, q, region, page } = useLoaderData();
  const submit = useSubmit();

  const pagesList = [];

  for (let i = 1; i <= pages; i++) {
    const subpage = (
      <Form className={styles.pagination} key={`pag-${i}`} role="pagination">
        <input type="text" hidden name="q" defaultValue={q} />
        <input type="text" hidden name="page" defaultValue={i} />
        <input type="text" hidden name="region" defaultValue={region} />
        <li
          className={i === parseInt(page) ? `${styles.active}` : ""}
          onClick={(e) => {
            submit(e.currentTarget.parentElement);
          }}
        >
          <p>{i}</p>
        </li>
      </Form>
    );
    pagesList.push(subpage);
  }

  return (
    <>
      <SearchBar />
      <div className={styles.outerLayer}>
        <div className={styles.content}>
          {flags.map((flag, index) => {
            return <CountryCard key={index} flag={flag} />;
          })}
        </div>

        {pagesList.length > 1 ? (
          <div className={styles.pagination}>
            <ul>{pagesList}</ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Main;
