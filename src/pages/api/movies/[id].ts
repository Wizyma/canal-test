import type { NextApiRequest, NextApiResponse } from 'next';
import type { AxiosResponse, AxiosError } from 'axios';

import Fetcher from 'fetcher';
import type { Movie } from 'type/movies';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const instance = Fetcher.getInstance();

  try {
    const { status, data: movie } = (await instance.getAsync<Movie>({
      path: `/movie/${query.id}`,
      params: 'append_to_response=videos',
    })) as AxiosResponse<Movie>;

    res.status(status).json(movie);
  } catch (err) {
    const error = err as AxiosError;
    res.status(parseInt(error.code, 10)).json({ message: error.message });
  }
};
