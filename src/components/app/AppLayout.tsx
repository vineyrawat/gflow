import { useRouter } from "next/router";
import Navbar from "./Navbar";
import ProfileCard from "./ProfileCard";
import { useEffect, useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import Link from "next/link";

export default function AppLayout({ component }: { component: JSX.Element }) {
  return (
    <main>
      <Navbar />
      <div className="flex container mx-auto gap-5 py-5 px-4">
        <ProfileCard />
        <div className="w-full">
          <BreadCumb />
          {component}
        </div>
      </div>
    </main>
  );
}

function BreadCumb() {
  const router = useRouter();
  const { asPath } = router;
  const [items, setItems] = useState<Array<any>>([]);

  function toCamelCase(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  useEffect(() => {
    setItems(
      asPath
        .split("/")
        .map((i) => toCamelCase(i))
        .filter((i) => i != "")
        .map((i, idx) => {
          return {
            text: i,
            href: `/${asPath
              .split("/")
              .slice(0, idx + 2)
              .join("/")}`,
          };
        })
    );
  }, []);

  return (
    <nav
      className="flex px-5 py-3 w-min text-gray-700 mb-5 border border-gray-200 rounded-lg bg-gray-50"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((i, idx) => (
          <li key={idx} aria-current="page">
            <div className="flex items-center">
              {idx == 0 ? (
                <RxDotFilled className="text-gray-500" />
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
              <Link href={i.href}>
                <span className="ml-1 hover:text-gray-800 truncate text-sm font-medium text-gray-500 md:ml-2">
                  {i.text}
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
