import { db } from "@/lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  // Genreの作成
  const genres = await db.genre.createMany({
    data: [
      { name: "カフェ" },
      { name: "レストラン" },
      { name: "居酒屋" },
      { name: "ファストフード" },
      { name: "スイーツ" },
    ],
  });

  console.log("✅ Genres created:", genres.count);

  // 作成されたGenreを取得
  const createdGenres = await db.genre.findMany();

  // Storeの作成
  const stores = await db.store.createMany({
    data: [
      {
        name: "コーヒーハウス アロマ",
        description: "厳選された豆から淹れる本格コーヒー",
        link: "https://example.com/coffee-house",
        address: "東京都渋谷区渋谷2-1-1",
        genreId: createdGenres[0].id, // カフェ
      },
      {
        name: "カフェ モーニング",
        description: "朝食に最適なパンとコーヒー",
        link: "https://example.com/cafe-morning",
        address: "東京都新宿区新宿3-1-1",
        genreId: createdGenres[0].id, // カフェ
      },
      {
        name: "イタリアン ベラヴィスタ",
        description: "本格イタリア料理とワイン",
        link: "https://example.com/italian-bella",
        address: "東京都中央区銀座1-1-1",
        genreId: createdGenres[1].id, // レストラン
      },
      {
        name: "和食 花月",
        description: "季節の食材を使った懐石料理",
        link: "https://example.com/washoku-kagetsu",
        address: "東京都港区六本木1-1-1",
        genreId: createdGenres[1].id, // レストラン
      },
      {
        name: "居酒屋 酒蔵",
        description: "地酒と郷土料理が楽しめる",
        link: "https://example.com/izakaya-sakura",
        address: "東京都渋谷区神宮前1-1-1",
        genreId: createdGenres[2].id, // 居酒屋
      },
      {
        name: "串焼き 炭火",
        description: "備長炭で焼く本格串焼き",
        link: "https://example.com/kushiyaki-sumi",
        address: "東京都新宿区歌舞伎町1-1-1",
        genreId: createdGenres[2].id, // 居酒屋
      },
      {
        name: "バーガーショップ フレッシュ",
        description: "手作りパティのジューシーバーガー",
        link: "https://example.com/burger-fresh",
        address: "東京都品川区大井1-1-1",
        genreId: createdGenres[3].id, // ファストフード
      },
      {
        name: "ピザハウス マルゲリータ",
        description: "石窯で焼く本格ナポリピザ",
        link: "https://example.com/pizza-margherita",
        address: "東京都目黒区目黒1-1-1",
        genreId: createdGenres[3].id, // ファストフード
      },
      {
        name: "パティスリー スイート",
        description: "フランス直伝の本格スイーツ",
        link: "https://example.com/patisserie-sweet",
        address: "東京都世田谷区三軒茶屋1-1-1",
        genreId: createdGenres[4].id, // スイーツ
      },
      {
        name: "アイスクリーム ジェラート",
        description: "イタリア産の生クリーム使用",
        link: "https://example.com/ice-cream-gelato",
        address: "東京都中野区中野1-1-1",
        genreId: createdGenres[4].id, // スイーツ
      },
    ],
  });

  console.log("✅ Stores created:", stores.count);

  // 作成されたStoreを取得
  const createdStores = await db.store.findMany();

  // StoreImageの作成（各店舗に2つずつ）
  const storeImagesData = createdStores.flatMap((store) => [
    {
      path: "shop-demo.svg",
      storeId: store.id,
    },
    {
      path: "shop-demo-nagomi.svg",
      storeId: store.id,
    },
  ]);

  const storeImages = await db.storeImage.createMany({
    data: storeImagesData,
  });

  console.log("✅ StoreImages created:", storeImages.count);
  console.log(" Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
