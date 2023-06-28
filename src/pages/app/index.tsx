import Navbar from "@/components/app/Navbar";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiStackshareLine } from "react-icons/ri";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import Image from "next/image";

export default function MainApp() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.replace("/");
  }

  return status !== "authenticated" ? (
    <>Loading...</>
  ) : (
    <>
      <Head>
        <title>GBooks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="flex container mt-10 mx-auto gap-5">
          <ProfileCard />
          <CardsGrid />
        </div>
      </main>
    </>
  );
}

function ProfileCard() {
  const { data: session }: any = useSession();

  return (
    <div className="bg-white shadow-lg min-w-[300px] border">
      <div className="px-4 py-5 sm:px-6">
        <Image
          className="w-20 h-20 mb-5 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={session?.user?.image ?? ""}
          width={100}
          height={100}
          alt="Bordered avatar"
        />
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          {session?.user?.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {session?.user?.profile.bio}
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Followers</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {session?.user?.profile.followers}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Following</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {session?.user?.profile.following}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Website</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <a
                href={"https://" + session?.user?.profile.blog ?? ""}
                target="_blank"
              >
                {session?.user?.profile.blog ?? "-"}
              </a>
              {/* {session?.user?.profile.blog ?? ""} */}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {session?.user?.profile.location}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

interface MainCardProps {
  title: string;
  path?: string;
  subtitle: string;
  onClick?: () => void;
  icon?: JSX.Element;
}

function CardsGrid() {
  return (
    <div className="gap-4">
      <div className="grid grid-cols-4 gap-4">
        <MainCard
          icon={<HiOutlineSquare3Stack3D size={20} />}
          title="Repositories"
          path="/app/repositories"
          subtitle="Manage your github repositories and track actions/workflows."
        />
        <MainCard
          icon={<RiStackshareLine size={20} />}
          title="Workflows"
          subtitle="Manage workflow and progress"
        />
      </div>
    </div>
  );
}

function MainCard(props: MainCardProps) {
  return (
    <Link href={props.path ?? "#"} onClick={props.onClick}>
      <div className="p-5 min-h-[130px] rounded-sm bg-white shadow-md outline outline-1 outline-gray-200">
        <div className="flex items-center gap-2">
          {props.icon}
          <h1 className="text-xl font-semibold">{props.title}</h1>
        </div>
        <p>{props.subtitle}</p>
      </div>
    </Link>
  );
}
