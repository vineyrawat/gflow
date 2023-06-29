import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfileCard() {
  const { data: session }: any = useSession();

  return (
    <div className="w-80">
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
      <div className="border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-2">
            <dt className="text-sm font-medium text-gray-500">Followers</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {session?.user?.profile.followers}
            </dd>
          </div>
          <div className="py-2">
            <dt className="text-sm font-medium text-gray-500">Following</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {session?.user?.profile.following}
            </dd>
          </div>
          <div className="py-2">
            <dt className="text-sm font-medium text-gray-500">Website</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <a
                href={"https://" + session?.user?.profile.blog ?? ""}
                target="_blank"
              >
                {session?.user?.profile.blog ?? "-"}
              </a>
              {/* {session?.user?.profile.blog ?? ""} */}
            </dd>
          </div>
          <div className="py-2">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {session?.user?.profile.location}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
