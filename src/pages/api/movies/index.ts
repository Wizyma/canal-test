import Fetcher from 'fetcher';

import type { AxiosError, AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Movies } from 'type/movies';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const instance = Fetcher.getInstance();

  try {
    const { status, data } = (await instance.getAsync<Movies>({
      path: '/movie/popular',
      // @ts-ignore
      params: query.params,
    })) as AxiosResponse<Movies>;
    res.status(status).json(data);
  } catch (err) {
    const error = err as AxiosError;
    res.status(parseInt(error.code, 10)).json({ message: error.message });
  }
};
