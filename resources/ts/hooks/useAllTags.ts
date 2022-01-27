import { useCallback, useState } from "react";
import axios from "axios";

import { Tag } from "../types/api/tag";
import { useMessage } from "./useMessage";
import { isEmpty } from "lodash";

export const useAllTags = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Array<Tag>>([]);

  const getTags = useCallback(() => {
    setLoading(loading);
    async function getTags() {
      await axios
        .get<Array<Tag>>("api/tags")
        .then((res) => {
          if (isEmpty(res.data)) {
            setTags([]);
          } else {
            setTags(res.data);
          }
        })
        .catch(() =>
          showMessage({ title: "タグの取得に失敗しました", status: "error" })
        )
        .finally(() => {
          setLoading(false);
        });
    }
    getTags();
  }, []);
  return { getTags, loading, tags };
};
