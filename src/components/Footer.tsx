import React from "react";
import styles from "@/styles/Footer.module.css";
import Link from "next/link";

const socialLinks = [
  {
    name: "twitter",
    icon: (
      <svg
        fill="#333"
        className="group-hover:fill-blue-500 duration-300 group-focus-visible:fill-blue-500 "
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height={18}
        width={18}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g id="7935ec95c421cee6d86eb22ecd12f847">
            <path d="M459.186,151.787c0.203,4.501,0.305,9.023,0.305,13.565 c0,138.542-105.461,298.285-298.274,298.285c-59.209,0-114.322-17.357-160.716-47.104c8.212,0.973,16.546,1.47,25.012,1.47 c49.121,0,94.318-16.759,130.209-44.884c-45.887-0.841-84.596-31.154-97.938-72.804c6.408,1.227,12.968,1.886,19.73,1.886 c9.55,0,18.816-1.287,27.617-3.68c-47.955-9.633-84.1-52.001-84.1-102.795c0-0.446,0-0.882,0.011-1.318 c14.133,7.847,30.294,12.562,47.488,13.109c-28.134-18.796-46.637-50.885-46.637-87.262c0-19.212,5.16-37.218,14.193-52.7 c51.707,63.426,128.941,105.156,216.072,109.536c-1.784-7.675-2.718-15.674-2.718-23.896c0-57.891,46.941-104.832,104.832-104.832 c30.173,0,57.404,12.734,76.525,33.102c23.887-4.694,46.313-13.423,66.569-25.438c-7.827,24.485-24.434,45.025-46.089,58.002 c21.209-2.535,41.426-8.171,60.222-16.505C497.448,118.542,479.666,137.004,459.186,151.787z"></path>
          </g>
        </g>
      </svg>
    ),
    href: "https://twitter.com/greatochuko4",
  },
  {
    name: "github",
    icon: (
      <svg
        viewBox="0 0 20 20"
        height={18}
        width={18}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#333"
        className="group-hover:fill-blue-500 duration-300 group-focus-visible:fill-blue-500 "
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <title>github [#142]</title> <desc>Created with Sketch.</desc>
          <defs> </defs>
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-140.000000, -7559.000000)"
              fill="#333"
              className="group-hover:fill-blue-500 duration-300 group-focus-visible:fill-blue-500 "
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                  id="github-[#142]"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),
    href: "https://github.com/greatochuko",
  },
  {
    name: "linkedin",
    icon: (
      <svg
        viewBox="0 0 20 20"
        height={18}
        width={18}
        version="1.1"
        fill="#333"
        className="group-hover:fill-blue-500 duration-300 group-focus-visible:fill-blue-500 "
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <title>linkedin [#161]</title> <desc>Created with Sketch.</desc>
          <defs> </defs>
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-180.000000, -7479.000000)"
              fill="#333"
              className="group-hover:fill-blue-500 duration-300 group-focus-visible:fill-blue-500 "
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z"
                  id="linkedin-[#161]"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),
    href: "https://linkedin.com/in/greatochuko",
  },
  {
    name: "email",
    icon: (
      <svg
        fill="#000000"
        className="group-hover:fill-blue-500 duration-300 group-focus-visible:fill-blue-500 "
        viewBox="0 0 24 24"
        height={18}
        width={18}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <title>Gmail icon</title>

          <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z"></path>
        </g>
      </svg>
    ),
    href: "mailto:greatochuko123@gmail.com",
  },
];

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-container"]}>
        <Link href={"/"} className="logo" style={{ color: "white" }}>
          Bloggerzine
        </Link>
        <p className={styles["copyright"]}>
          &copy; {new Date().getFullYear()} Bloggerzine. All rights reserved
        </p>
        <ul className={styles["social-links"]}>
          {socialLinks.map((socialLink) => (
            <li key={socialLink.name}>
              <Link href={socialLink.href} target="_blank">
                {socialLink.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
