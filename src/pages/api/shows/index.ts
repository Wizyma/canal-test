import Fetcher from 'fetcher';

import type { AxiosError, AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Shows } from 'type/show';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const instance = Fetcher.getInstance();

  try {
    const { status, data } = (await instance.getAsync<Shows>({
      path: '/tv/popular',
      // @ts-ignore
      params: query.params,
    })) as AxiosResponse<Shows>;
    res.status(status).json(data);
  } catch (err) {
    const error = err as AxiosError;
    res.status(parseInt(error.code, 10)).json({ message: error.message });
  }
};
