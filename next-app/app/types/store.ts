// 店舗情報
export type Store = {
  id: number;
  name: string;
  description: string;
  link: string;
  address: string | null;
  genreId: number;
  createdAt: string;
  updatedAt: string;
  comments: {
    id: number;
    message: string;
    user: {
      id: string;
    };
  } | null;
  genre: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  storeImage:
    | {
        id: number;
        path: string;
        storeId: number;
        createdAt: string;
        updatedAt: string;
      }[]
    | null;
  _count: {
    storeLikes: number;
    storeSupports: number;
    comments: number | null;
  };
};
