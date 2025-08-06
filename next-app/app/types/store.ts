// 店舗情報
export type Store = {
  id: number;
  name: string;
  address: string | null;
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
  };
  storeImage: {
    id: number;
    path: string;
  } | null;
  _count: {
    storeLikes: number;
    storeSupports: number;
    comments: number | null;
  };
};
