import React from "react";
import "@/css/header.css";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
function Header() {
  return (
    <nav className="navbar">
      <ul className="link-list">
        <li>
          <Link href="/" className="logo">
            Animeflix
          </Link>
        </li>
        <li className="list-item">
          <Link href="/series">Series</Link>
        </li>
        <li className="list-item">
          <Link href="/peliculas">Peliculas</Link>
        </li>
        <li className="list-item">
          <Link href="/novedades">Novedades Populares</Link>
        </li>
        <li className="list-item">
          <Link href="/lista">Mi lista</Link>
        </li>
        <li className="list-item">
          <Link href="/emision">En emision</Link>
        </li>
      </ul>
      <form action="/search" className="search-container">
        <button className="search-btn">
          <FaSearch />
        </button>
        <input
          type="search"
          name="q"
          id="search-input"
          defaultValue={""}
          required
          className="search-input"
        />
        <input type="number" name="page_number" defaultValue={"1"} hidden />
        <input type="text" name="filters" defaultValue={"{}"} hidden />
      </form>
    </nav>
  );
}

export default Header;
