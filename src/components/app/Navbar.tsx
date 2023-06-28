import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

// Profile Dropdown
const ProfileDropDown = (props: any) => {
  const { data: session, status } = useSession();
  const [state, setState] = useState(false);
  const profileRef: any = useRef();

  const navigation = [
    { title: "Log out", path: "#", onClick: () => signOut() },
  ];

  // useEffect(() => {
  //   const handleDropDown = (event: any) => {
  //     if (!profileRef.current.contains(event.target)) {
  //       setState(false);
  //     }
  //   };
  //   document.addEventListener("click", handleDropDown);
  // }, []);

  return (
    <div className={`relative ${props.class}`}>
      <div className="flex items-center space-x-4">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        >
          <img
            src={session?.user?.image ?? ""}
            className="w-full h-full rounded-full"
          />
        </button>
      </div>
      <ul
        className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            <a
              onClick={item.onClick}
              className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
              href={item.path}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default () => {
  const [menuState, setMenuState] = useState(false);
  const { data: session, status } = useSession();

  const navigation = [{ title: "Logout", path: "#", onClick: () => signOut() }];

  return (
    <nav className="bg-white border-b">
      <div className="flex items-center py-3 px-4 container mx-auto">
        <div className="flex-none lg:flex-initial">
          <a href="#">
            <h1 className="text-2xl font-bold">GFlows!</h1>
            {/* <img
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="Float UI logo"
            /> */}
          </a>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
            <div className="flex flex-col items-end">
              <h1 className="font-bold bg-clip-text bg-gradient-to-r">
                {session?.user?.name}
              </h1>
              <h1 className="text-sm text-gray-600">{session?.user?.email}</h1>
            </div>
            <ProfileDropDown class="hidden lg:block" />
            <button
              className="outline-none text-gray-400 block lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
