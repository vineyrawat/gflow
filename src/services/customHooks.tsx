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
    fetch(BASE_URL + `/user/repos`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${data.user.account.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.message == "Requires authentication") {
          throw data;
        }
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

const useWorkflows = (repo: string) => {
  const [workflows, setWorkflows] = useState<Array<any>>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data }: any = useSession();

  function fetchData() {
    setLoading(true);
    setError(null);
    setWorkflows([]);
    fetch(
      BASE_URL + `/repos/${data.user.profile.login}/${repo}/actions/workflows`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${data.user.account.access_token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.message == "Requires authentication") {
          throw data;
        }
        setWorkflows(data.workflows ?? []);
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
    workflows,
    error,
    loading,
    fetchData,
  };
};

export { useRepositores, useWorkflows };
