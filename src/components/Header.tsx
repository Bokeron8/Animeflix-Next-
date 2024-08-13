"use client";
import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import "@/css/header.css";
import NextLink from "next/link";
import { FaSearch } from "react-icons/fa";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Input,
} from "@nextui-org/react";

function Header() {
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    "Series",
    "Peliculas",
    "Novedades Populares",
    "Mi Lista",
    "En Emision",
  ];
  const navItems = [
    {
      href: "/series",
      text: "Series",
    },
    {
      href: "/peliculas",
      text: "Peliculas",
    },
    {
      href: "/novedades",
      text: "Novedades",
    },
  ];
  const handleKeyDown = (e: { key: any }) => {
    const { key } = e;
    if (key === "Enter" && formRef.current) {
      formRef.current.submit();
    }
  };
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as={NextLink} href="/">
          <p className="font-bold text-inherit text-3xl text-red-600">
            Animeflix
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map(({ href, text }, idx) => (
          <NavbarItem key={idx} isActive={pathname == href}>
            <Link
              as={NextLink}
              color={pathname == href ? "primary" : "foreground"}
              href={href}
            >
              {text}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <form action="/search" ref={formRef}>
          <Input
            classNames={{
              base: "max-w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Escribi para buscar..."
            size="sm"
            startContent={<FaSearch size={24} />}
            type="search"
            name="q"
            required
            onKeyDown={handleKeyDown}
          />

          <input type="number" name="page_number" defaultValue={"1"} hidden />
          <input type="text" name="filters" defaultValue={"{}"} hidden />
        </form>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
