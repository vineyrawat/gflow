import { DarkButton } from "@/components/global/Buttons";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import { useRepositores } from "@/services/customHooks";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineLock } from "react-icons/ai";
import { IoEarthOutline } from "react-icons/io5";
import { BiCodeAlt } from "react-icons/bi";
import { TbLicense } from "react-icons/tb";
import AppLayout from "@/components/app/AppLayout";

export default function Repositories() {
  const { status }: any = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.replace("/");
  }

  return status !== "authenticated" ? (
    <>Loading...</>
  ) : (
    <>
      <Head>
        <title>Repositories</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout component={<RepositoriesData />} />
    </>
  );
}

function RepositoriesData() {
  const { loading, repositories, fetchData, error } = useRepositores();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 ">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center gap-2 flex-col items-center h-40 ">
        <h1>Unable to fetch data</h1>
        <p>{error!.message ?? ""}</p>
        <DarkButton onClick={fetchData}>Retry</DarkButton>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 ">
        <h1>No repositories found</h1>
        <DarkButton onClick={fetchData}>Retry</DarkButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {repositories.map((repository) => {
        return (
          <div
            key={repository.id}
            className="p-4 rounded-sm bg-white flex flex-col gap-2"
          >
            <div className="flex gap-2 items-center">
              <Link href={`/app/repositories/${repository.name ?? ""}`}>
                <h1 className="text-xl font-semibold hover:underline">
                  {repository.name}
                </h1>
              </Link>
              {repository.private ? (
                <AiOutlineLock size={20} />
              ) : (
                <IoEarthOutline size={20} />
              )}
            </div>
            {repository.description && <p>{repository.description}</p>}
            {(repository.topics?.length ?? 0) > 0 && (
              <div className="flex gap-2">
                {repository.topics?.map((i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                  >
                    {i}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <div className="flex gap-1 items-center">
                <BiCodeAlt />
                <p>{repository.language}</p>
              </div>
              <div className="flex gap-1 items-center">
                <TbLicense />
                <p>{repository?.license?.name ?? "NA"}</p>
              </div>
            </div>
          </div>
        );
      })}
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
