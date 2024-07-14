import React from "react";
import styles from "@/header.module.css";
import Link from "next/link";
function Header() {
  return (
    <nav className={styles["navbar"]}>
      <ul className={styles["link-list"]}>
        <li>
          <Link href="/" className={styles.logo}>
            Animeflix
          </Link>
        </li>
        <li className={styles["list-item"]}>
          <Link href="/series">Series</Link>
        </li>
        <li className={styles["list-item"]}>
          <Link href="/peliculas">Peliculas</Link>
        </li>
        <li className={styles["list-item"]}>
          <Link href="/novedades">Novedades Populares</Link>
        </li>
        <li className={styles["list-item"]}>
          <Link href="/lista">Mi lista</Link>
        </li>
        <li className={styles["list-item"]}>
          <Link href="/emision">En emision</Link>
        </li>
      </ul>
      <form action="/search" className={styles["search-container"]}>
        <button className={styles["search-btn"]}>
          <i className="fas fa-search"></i>
        </button>
        <input
          type="search"
          name="q"
          id="search-input"
          defaultValue={""}
          required
          className={styles["search-input"]}
        />
        <input type="number" name="page_number" defaultValue={"1"} hidden />
        <input type="text" name="filters" defaultValue={"{}"} hidden />
      </form>
    </nav>
  );
}

export default Header;
