import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/NavUser.module.css";
import Link from "next/link";
import SignoutModal from "./SignoutModal";
import { User } from "@supabase/supabase-js";
import { createAuthorUrl } from "@/utils/createAuthorUrl";

export default function NavUser({ user }: { user: User }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [signoutModal, setSignoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(e: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
      setShowDropdown(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={styles["user"]} ref={dropdownRef}>
        <div
          className={styles["image-container"]}
          onClick={() => setShowDropdown((curr) => !curr)}
        >
          <Image
            src={user.user_metadata.imageUrl}
            alt={
              user.user_metadata.firstname + " " + user.user_metadata.lastname
            }
            fill
            sizes="80px"
          ></Image>
        </div>
        {showDropdown ? (
          <div
            className={styles["options"]}
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href={`/authors/${createAuthorUrl(user)}`}
              className={styles["user-details"]}
            >
              <div className={styles["image-container"]}>
                <Image
                  src={user.user_metadata.imageUrl}
                  alt={
                    user.user_metadata.firstname +
                    " " +
                    user.user_metadata.lastname
                  }
                  fill
                  sizes="80px"
                ></Image>
              </div>
              <div className={styles["text"]}>
                <h4>
                  {user.user_metadata.firstname +
                    " " +
                    user.user_metadata.lastname}
                </h4>
                <p>{user.email}</p>
              </div>
            </Link>
            <hr />
            <ul
              className={styles["option-list"]}
              onClick={() => setShowDropdown(false)}
            >
              <li>
                <Link href={"/dashboard"}>
                  <svg
                    width={19}
                    height={19}
                    viewBox="0 -1 159 159"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g clipPath="url(#clip0)">
                        <path
                          d="M35.0165 132.618C35.867 132.56 36.7174 132.488 37.5678 132.417C39.3318 132.27 41.1551 132.117 42.9373 132.102C47.0141 132.063 51.1637 132.131 55.1761 132.194L58.2652 132.241C58.5308 132.258 58.7937 132.303 59.0493 132.377C57.7067 136.94 55.5617 141.225 52.715 145.033C51.3132 146.95 49.9627 147.629 48.0459 147.378C46.7548 147.231 45.4483 147.304 44.1811 147.591C43.4348 147.733 42.7551 148.115 42.2456 148.679C41.7362 149.244 41.4249 149.96 41.3592 150.718C41.2442 151.692 41.5139 153.05 43.4541 153.983C44.3078 154.419 45.2267 154.713 46.1747 154.853C46.9061 154.943 47.6376 155.038 48.3691 155.133C51.126 155.492 53.9765 155.862 56.8049 155.967C60.9395 156.12 65.1424 156.163 69.2068 156.204C71.6367 156.228 74.0658 156.253 76.4943 156.3C77.0997 156.334 77.7005 156.426 78.2883 156.573C78.5926 156.638 78.8969 156.703 79.1985 156.757C79.2363 156.763 79.274 156.767 79.3123 156.767H95.3347C95.3939 156.767 95.4524 156.759 95.509 156.743C95.7112 156.688 95.9134 156.621 96.1143 156.554C96.4524 156.421 96.8068 156.333 97.1676 156.294C98.089 156.256 99.0357 156.253 99.9505 156.249C101.597 156.272 103.243 156.204 104.881 156.044C106.934 155.851 108.938 155.296 110.798 154.403C111.37 154.165 111.867 153.774 112.234 153.273C112.6 152.772 112.823 152.18 112.879 151.561C112.857 150.929 112.663 150.314 112.319 149.784C111.973 149.253 111.49 148.828 110.921 148.553C109.782 147.939 108.538 147.545 107.254 147.391C106.384 147.284 105.505 147.26 104.63 147.318C104.412 147.326 104.192 147.333 103.973 147.338C103.356 145.704 102.657 144.122 101.978 142.588C100.621 139.519 99.3341 136.608 98.6495 133.31H101.462C104.453 133.31 107.298 133.304 110.145 133.325C110.875 133.331 111.629 133.396 112.356 133.456C112.826 133.496 113.296 133.536 113.767 133.562C114.409 133.598 115.052 133.649 115.695 133.699C117.282 133.857 118.877 133.912 120.472 133.862C123.991 133.671 127.5 133.254 130.768 132.831C134.119 132.397 137.964 131.772 141.194 129.828C152.767 122.857 158.481 112.904 158.167 100.243C157.976 92.4988 157.949 84.6175 157.923 76.9962L157.91 73.2829C157.898 70.1768 157.932 67.0159 157.964 63.9581C158.03 57.9686 158.095 51.7757 157.819 45.6879C157.44 38.587 156.602 31.5184 155.307 24.5268C153.932 16.6996 150.739 10.9909 145.547 7.07367C139.03 2.03978 130.882 -0.39464 122.678 0.24077C115.323 0.748905 108.589 1.08754 102.09 1.27712C95.4192 1.47255 88.6304 1.44662 82.0634 1.42121C72.4488 1.38603 62.5071 1.34814 52.7228 1.99568C48.6623 2.26473 44.5146 2.35655 40.5035 2.44515C36.8676 2.52658 33.1081 2.60934 29.4117 2.82431C22.3069 3.23668 16.1917 5.50909 11.2351 9.5774C8.67482 11.5921 6.53818 14.095 4.94857 16.9415C3.35894 19.7881 2.34779 22.9219 1.97359 26.1621C1.51511 30.693 1.30478 35.2457 1.34354 39.7996L1.33965 40.1801C1.32145 42.0419 1.44761 43.9218 1.56919 45.7406C1.66672 47.1882 1.76426 48.6853 1.79222 50.1504C2.01459 63.1468 2.2129 76.8959 2.41576 93.4193C2.40945 94.1698 2.35755 94.9203 2.26036 95.6649C2.15885 96.4531 2.10396 97.2459 2.0959 98.0407C2.1076 99.2648 2.17586 100.501 2.24218 101.697C2.3202 103.109 2.40144 104.569 2.38584 105.996C2.32927 111.211 4.05881 116.234 7.52702 120.926C13.86 129.48 23.1099 133.422 35.0165 132.618ZM149.471 75.0484L149.475 81.8645C149.481 88.6552 149.488 95.6753 149.439 102.581C149.412 104.063 149.178 105.534 148.746 106.952C147.704 110.495 145.975 113.797 143.659 116.67C140.138 121.025 135.313 123.626 128.907 124.622C125.342 125.176 121.58 125.591 117.403 125.89C116.284 125.933 115.163 125.877 114.054 125.724C113.33 125.647 112.581 125.567 111.836 125.538C109.005 125.428 106.172 125.346 103.34 125.264C97.9355 125.107 92.3464 124.945 86.8684 124.587C78.9099 124.066 70.8655 123.935 62.9115 123.935C58.9316 123.935 54.9732 123.969 51.0602 124C45.185 124.049 39.1101 124.097 33.1393 124.036C28.7439 123.991 25.2354 123.294 22.0969 121.84C19.7861 120.809 17.7088 119.318 15.9914 117.457C14.2741 115.596 12.9525 113.405 12.1071 111.016C10.3853 106.355 9.80274 102.091 10.3262 97.9795C10.4516 96.773 10.4937 95.56 10.4523 94.3476C10.4484 93.9763 10.4438 93.6056 10.4445 93.2363C10.4506 90.2148 10.4592 87.1934 10.4706 84.1713C10.4979 76.1115 10.5258 67.7775 10.4666 59.5789C10.4432 56.3712 10.3314 53.1159 10.2235 49.9668C10.0934 46.2535 9.96334 42.4159 9.97699 38.6472C9.95254 33.0938 11.1799 27.6065 13.5674 22.5947C16.0915 17.3622 20.6547 14.092 27.1398 12.8764C30.952 12.1598 34.7414 11.7754 37.9457 11.492C51.9121 10.2601 66.1645 10.1415 79.9437 10.0268C83.0315 10.0012 86.1193 9.97133 89.2065 9.93746C93.5889 9.88404 97.9713 9.83609 102.353 9.7931C109.303 9.72078 116.489 9.64639 123.558 9.5402C128.495 9.4516 133.336 11.0124 138.807 14.4051C141.945 16.3504 144.139 19.564 145.328 23.9555C146.279 27.4733 146.968 31.1338 147.633 34.6771L147.986 36.55C148.429 38.8757 148.808 41.436 149.144 44.3792C149.349 46.2286 149.45 48.0877 149.447 49.9484C149.471 56.062 149.476 62.1767 149.464 68.2921V74.9317C149.463 74.9702 149.465 75.0086 149.471 75.0471V75.0484ZM63.4044 145.795C64.2896 144.022 65.0613 142.194 65.7146 140.323C66.277 138.454 66.714 136.551 67.0241 134.625C67.1483 133.947 67.2744 133.263 67.4142 132.574L89.9334 132.965C90.308 138.248 91.9439 142.917 93.7489 147.193H62.7484C62.963 146.728 63.184 146.261 63.4044 145.795Z"
                          fill="#333"
                        ></path>
                        <path
                          d="M126.331 34.0147C124.846 33.0375 123.481 33.9822 122.825 34.4343C121.586 35.2474 120.442 36.1968 119.413 37.2644C116.267 40.704 113.118 44.2445 110.073 47.6679L107.685 50.35C105.706 52.5715 103.729 54.7944 101.752 57.0188C97.7839 61.48 93.8105 65.9367 89.8313 70.3894C89.116 71.19 88.326 71.9372 87.4905 72.7281C87.222 72.9821 86.9502 73.2408 86.6758 73.5046C86.0978 73.0727 85.5347 72.6466 84.9814 72.2271C83.4651 71.0792 82.0327 69.9959 80.5385 68.9698L79.9293 68.5523C75.8265 65.736 71.5826 62.8232 67.3029 60.1152C63.337 57.6077 60.9371 57.9654 57.7842 61.5399C56.4559 63.0467 55.0092 64.6205 53.0937 66.6455C49.3857 70.5646 45.6759 74.4818 41.964 78.397C36.9358 83.7037 31.9098 89.0131 26.8858 94.325C26.0421 95.2338 25.252 96.1908 24.5197 97.1914C24.2822 97.4644 24.1027 97.7829 23.9921 98.1275C23.8815 98.4722 23.8422 98.8357 23.8765 99.1959C23.9109 99.5562 24.0181 99.906 24.1918 100.224C24.3654 100.541 24.6017 100.82 24.8864 101.043C25.3786 101.537 26.0413 101.822 26.7376 101.84C27.496 101.809 28.2161 101.497 28.7584 100.965C29.9223 99.9295 31.0243 98.8037 32.1102 97.695C35.1237 94.6149 38.1363 91.5335 41.148 88.4515C47.0935 82.3676 53.0446 76.2902 59.0014 70.218C59.9851 69.2167 61.0665 68.2637 62.1127 67.3445C62.4824 67.0194 62.8508 66.6937 63.218 66.3673C63.348 66.4455 63.4736 66.5204 63.5945 66.5927C64.0821 66.8845 64.5048 67.136 64.8897 67.4187L68.6105 70.1333C73.266 73.5287 78.0801 77.0387 82.7765 80.5422C86.3293 83.193 88.7051 83.148 91.8541 80.3605C93.529 78.8771 95.1122 77.2941 96.596 75.6199C104.364 66.8702 110.875 59.5021 117.403 51.9844C119.905 49.1017 122.419 45.9541 124.88 42.6265C125.907 41.1317 126.723 39.5028 127.307 37.7854C127.903 36.1887 127.548 34.8134 126.331 34.0147Z"
                          fill="#333"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect
                            width="158"
                            height="157"
                            fill="white"
                            transform="translate(0.777344)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </g>
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href={`/authors/${createAuthorUrl(user)}`}>
                  <svg
                    height={20}
                    width={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.0001 1.25C9.37678 1.25 7.25013 3.37665 7.25013 6C7.25013 8.62335 9.37678 10.75 12.0001 10.75C14.6235 10.75 16.7501 8.62335 16.7501 6C16.7501 3.37665 14.6235 1.25 12.0001 1.25ZM8.75013 6C8.75013 4.20507 10.2052 2.75 12.0001 2.75C13.7951 2.75 15.2501 4.20507 15.2501 6C15.2501 7.79493 13.7951 9.25 12.0001 9.25C10.2052 9.25 8.75013 7.79493 8.75013 6Z"
                        fill="#333"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.0001 12.25C9.68658 12.25 7.55506 12.7759 5.97558 13.6643C4.41962 14.5396 3.25013 15.8661 3.25013 17.5L3.25007 17.602C3.24894 18.7638 3.24752 20.222 4.52655 21.2635C5.15602 21.7761 6.03661 22.1406 7.22634 22.3815C8.4194 22.6229 9.97436 22.75 12.0001 22.75C14.0259 22.75 15.5809 22.6229 16.7739 22.3815C17.9637 22.1406 18.8443 21.7761 19.4737 21.2635C20.7527 20.222 20.7513 18.7638 20.7502 17.602L20.7501 17.5C20.7501 15.8661 19.5807 14.5396 18.0247 13.6643C16.4452 12.7759 14.3137 12.25 12.0001 12.25ZM4.75013 17.5C4.75013 16.6487 5.37151 15.7251 6.71098 14.9717C8.02693 14.2315 9.89541 13.75 12.0001 13.75C14.1049 13.75 15.9733 14.2315 17.2893 14.9717C18.6288 15.7251 19.2501 16.6487 19.2501 17.5C19.2501 18.8078 19.2098 19.544 18.5265 20.1004C18.156 20.4022 17.5366 20.6967 16.4763 20.9113C15.4194 21.1252 13.9744 21.25 12.0001 21.25C10.0259 21.25 8.58087 21.1252 7.52393 20.9113C6.46366 20.6967 5.84425 20.4022 5.47372 20.1004C4.79045 19.544 4.75013 18.8078 4.75013 17.5Z"
                        fill="#333"
                      ></path>
                    </g>
                  </svg>
                  My Profile
                </Link>
              </li>
              <li>
                <Link href={"/settings"}>
                  <svg
                    height={20}
                    width={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                        fill="#333"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z"
                        fill="#333"
                      ></path>
                    </g>
                  </svg>
                  Settings
                </Link>
              </li>
            </ul>
            <hr />
            <button
              className={styles["signout-btn"]}
              onClick={() => {
                setSignoutModal(true);
                setShowDropdown(false);
              }}
            >
              <svg
                height={16}
                width={16}
                viewBox="0 -0.5 21 21"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>shut_down [#1431]</title>
                  <desc>Created with Sketch.</desc> <defs> </defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-419.000000, -560.000000)"
                      fill="#fff"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <path
                          d="M378.381271,401.145 C377.596921,400.752 376.64982,401.278 376.64982,402.123 C376.64982,402.552 376.91862,402.925 377.316571,403.126 C380.236622,404.602 382.110873,407.716 381.575372,411.174 C381.046172,414.602 378.050521,417.343 374.434319,417.728 C369.515067,418.251 365.333966,414.581 365.333966,410 C365.333966,407.004 367.121066,404.4 369.733467,403.101 C370.102018,402.918 370.349818,402.572 370.349818,402.176 L370.349818,402.084 C370.349818,401.256 369.423717,400.745 368.651967,401.129 C364.951765,402.966 362.545164,406.841 363.072265,411.191 C363.624565,415.742 367.515866,419.43 372.296519,419.936 C378.634321,420.607 383.999823,415.9 383.999823,410 C383.999823,406.155 381.722372,402.818 378.381271,401.145 M372.449819,409 L372.449819,401 C372.449819,400.447 372.920219,400 373.499819,400 C374.080469,400 374.549819,400.447 374.549819,401 L374.549819,409 C374.549819,409.552 374.080469,410 373.499819,410 C372.920219,410 372.449819,409.552 372.449819,409"
                          id="shut_down-[#1431]"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              Sign Out
            </button>
          </div>
        ) : null}
      </div>
      <SignoutModal
        isOpen={signoutModal}
        closeSignoutModal={() => setSignoutModal(false)}
      />
    </>
  );
}
