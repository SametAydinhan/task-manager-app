"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import Image from "next/image";
import menu from "@/app/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../Button/Button";
import { arrowLeft, bars, logout } from "@/app/utils/Icons";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";

const Sidebar = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const { theme, collapsed, collapseMenu } = useGlobalState();
  const Router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const { firstName, lastName, imageUrl } = user || {
    firstName: "",
    lastName: "",
    imageUrl: "",
  };
  const handleClick = (link: string) => {
    Router.push(link);
  };
  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
      <button className='toggle-nav' onClick={collapseMenu}>
        {collapsed ? bars : arrowLeft}
      </button>
      <div className='profile'>
        <div className='profile-overlay'></div>
        <div className='image'>
          <Image width={70} height={70} src={imageUrl} alt='Profile' />
        </div>
        <div className='user'>
          <div className='user-btn absolute z-20 top-0 left-0 w-full h-full'>
            <UserButton />
          </div>
        </div>
        <h1 className='capitlaze'>
          {firstName} {lastName}
        </h1>
      </div>
      <ul className='nav-items'>
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              key={link}
              className={`nav-item ${pathname === link ? "active" : ""}`}
              onClick={() => {
                handleClick(link);
              }}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className='sign-out relative m-6'>
        <Button
          name={"Sign Out"}
          type={"submit"}
          padding={"0.4rem 0.8rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          icon={logout}
          click={() => signOut(() => router.push("/signin"))}
        />
      </div>
    </SidebarStyled>
  );
};

const SidebarStyled = styled.div<{ collapsed: boolean }>`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGrey3};

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 1000;
    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props) =>
      props.collapsed ? "translateX(-107%)" : "translateX(0)"};
    .toggle-nav {
      display: block !important;
    }
  }

  .toggle-nav {
    display: none;
    position: absolute;
    right: -69px;
    top: 1.8rem;
    padding: 0.8rem 0.9rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: ${(props) => props.theme.colorBg2};
    border-right: 2px solid ${(props) => props.theme.borderColor2};
    border-top: 2px solid ${(props) => props.theme.borderColor2};
    border-bottom: 2px solid ${(props) => props.theme.borderColor2};
  }

  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;
      .cl-userButtonBox {
        width: 100%;
        height: 100%;
        .cl-userButtonTrigger {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }

  .profile {
    margin: 1.5rem;
    position: relative;
    padding: 1rem 0.8rem;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};
    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.5s ease-in-out;
      border-radius: 1rem;
      opacity: 0.2;
    }
    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }
    .image,
    h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      width: 70px;
      height: 70px;
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 50%;
    }
    img {
      border-radius: 50%;
      transition: all 0.5s ease-in-out;
    }

    > h1 {
      margin-left: 0.8rem;
      font-size: clamp(1rem, 1vw, 1.05rem);
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }
      img {
        transform: scale(1.1);
      }
    }
  }
  .nav-item {
    position: relative;
    padding: 1rem 1rem 1rem 2.1rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.5s ease-in-out;
    }
    &::before {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};
      border-bottom-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;
    }
    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: ${(props) => props.theme.activeNavLink};
    i,
    a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }
`;

export default Sidebar;
