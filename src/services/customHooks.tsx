import { Repository } from "@/models/repository.model";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const BASE_URL = "https://api.github.com";

/**
 * Custom hook that fetches repositories from the GitHub API.
 *
 * @return {Object} An object containing repositories, error, loading, and fetchData function.
 */
const useRepositores = () => {
  const [repositories, setRepositories] = useState<Array<Repository>>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data }: any = useSession();

  function fetchData() {
    setLoading(true);
    setError(null);
    setRepositories([]);
    fetch(BASE_URL + `/users/${data?.user.profile.login}/repos`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRepositories(data);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    repositories,
    error,
    loading,
    fetchData,
  };
};

export default useRepositores;
