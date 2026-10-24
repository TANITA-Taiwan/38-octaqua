/* ============================================================
   OCTAQUA × TANITA 第 38 屆產學合作網站｜設定檔
   學生維護者只需要改這個檔案，再把圖片放進 images 資料夾。
   index.html、style.css、app.js 不需要動。

   改的時候請注意：
   1. 文字要放在引號 " " 裡面，不要刪掉引號，也不要刪掉每行結尾的逗號。
   2. 想知道還缺哪些圖：網址後面加上 ?check（例如 .../38-octaqua/?check），
      畫面右下角會列出所有還沒放的檔名。
   ============================================================ */

window.SITE = {
  /* ---------- 基本資料 ---------- */
  title: "OCTAQUA",
  project: "腳腳者上線！好腳力等你 TRY",
  school: "中國文化大學廣告學系 第 38 屆產學合作",

  /* 首圖（主視覺）。電腦版用橫式、手機版用直式；沒有直式時，手機也會用橫式。
     banner：橫式，建議 2400×1070　　bannerMobile：直式 4:5，建議 1600×2000 */
  banner: "images/banner.jpg",
  bannerMobile: "images/banner-m.jpg",

  /* 標誌（透明背景 PNG，高度約 120px 即可） */
  logos: {
    tanita: "images/logo-tanita.png",
    octaqua: "images/logo-octaqua.png"
  },

  /* ---------- 主題介紹 ---------- */
  intro: {
    heading: "把大眾的視野，從「外在體態」帶往「全家人的行動力」",
    paragraphs: [
      "久坐久站的職業勞損、抗老、老後肌肉失能……大家追求體態管理，卻常常忽略下肢肌力與筋肉量。TANITA 獨步全球的「腳點」技術，正是看見這個隱性焦慮的關鍵。",
      "第 38 屆 OCTAQUA 以像素冒險遊戲為舞台，把健康量測變成任務：民眾是「腳腳者」，站上 BC-775 十合一藍牙腳點智能體組成計，就是登入遊戲、為健康之樹蒐集腳點能量。",
      "這個網站記錄每一站的冒險。每完成一站，YOTA 就往上走一格。"
    ],
    points: [
      { label: "主軸", text: "腳腳者上線！好腳力等你 TRY" },
      { label: "產品", text: "TANITA BC-775 十合一藍牙腳點智能體組成計" },
      { label: "線下活動", text: "5 站市集與活動 + 2027 文化廣告學系畢業展" },
      { label: "公益任務", text: "長老村：腳力覺醒日（全程貫穿）" }
    ]
  },

  /* ---------- BC-775 產品介紹 ----------
     image：產品照，建議背景乾淨或透明，方形 1200×1200 */
  product: {
    tag: "NEW ITEM 新道具解鎖！",
    name: "TANITA BC-775",
    sub: "十合一藍牙腳點智能體組成計",
    image: "images/product/bc775.jpg",
    itemsTitle: ["ITEM DATA", "裝備資訊"],
    items: [
      { k: "DATA", v: "10 項身體數據" },
      { k: "LEG SCORE", v: "50–150 Pt" },
      { k: "CONNECT", v: "藍牙連線" },
      { k: "PLAYERS", v: "最多 5 人登錄" }
    ],
    unlockTitle: ["UNLOCK EFFECT", "解鎖效果"],
    unlocks: ["查看 10 項身體數據", "個人健康管理"],
    skill: {
      tag: "SPECIAL SKILL！腳點到底是什麼？",
      text: "腳點是根據腿部肌肉量與體重之間的關係換算出的指標，可以多一個角度了解自己的腿部肌肉狀態。",
      heading: "腳點 3 階段判定",
      levels: [
        { range: "50pt～79pt", name: "低", lines: ["腿部狀態需多留意", "日常活動可能較為費力"], tone: "low" },
        { range: "80pt～89pt", name: "略低", lines: ["腿部肌肉開始流失", "長時間活動較容易疲勞"], tone: "mid" },
        { range: "90pt～150pt", name: "良", lines: ["腿肌狀態良好", "平衡與支撐力佳"], tone: "good" }
      ]
    },
    scan: {
      tag: "PLAYER DATA SCAN！一次可以看到什麼？",
      status: "玩家數據掃描中……",
      items: ["體重", "體脂率", "BMI", "肌肉量", "推定骨量", "基礎代謝", "體水分率", "體內年齡", "內臟脂肪", "腳點"]
    }
  },

  /* ---------- 腳點能量解鎖計畫（公益） ----------
     current：目前累積的腳點數，之後請從現場統計更新這個數字 */
  energy: {
    heading: "腳點能量解鎖計畫",
    current: 0,
    target: 15000,
    unit: "腳點",
    note: "全活動每累計達 15,000 腳點，TANITA 即捐贈 10 台 BC-775 體組成計至財團法人老五老基金會。"
  },

  /* ---------- 世界觀（前情提要） ----------
     三張漫畫格圖：images/story/01.jpg、02.jpg、03.jpg（建議橫式 1600×1000） */
  story: {
    heading: "世界觀",
    panels: [
      "在幸之國的中央，生長著一棵守護大家行動力的「健康之樹」。",
      "然而，一場轟天巨雷打中了健康之樹，健康之樹失去能量，居民的生活與健康意識逐漸斷線，葉片也開始停止生長……",
      "於是 YOTA 與守護者踏上冒險，開始尋找各地的腳腳者，一起蒐集「腳點能量」！"
    ],
    roles: [
      { who: "腳腳者", what: "現場來體驗的民眾，人人都是健康佼佼者。" },
      { who: "守護者", what: "OCTAQUA 的組員，陪大家完成每一關。" }
    ],
    steps: ["測量一次", "能量上升", "樹木成長", "花朵綻放", "解鎖捐贈"]
  },

  /* 活動地圖最終章上的小圖（像素版 BC-775，透明背景 PNG，建議 256×256）。
     放好 images/map/final.png 就會自動取代預設小圖示；不想換就留著不放。 */
  mapIcon: "images/map/final.png",

  /* ---------- 吉祥物 YOTA ----------
     image：介紹區大圖，透明背景 PNG，建議 1200×1200
     marker：地圖上走動的小圖，透明背景 PNG，建議 256×256（正面站姿） */
  yota: {
    name: "YOTA",
    image: "images/yota/main.png",
    marker: "images/yota/marker.png",
    intro: "腳腳者的冒險夥伴。陪著大家踏上旅程，一起完成健康之樹的復甦任務！",
    facts: [
      { label: "概念", text: "從體組成計上測量腳點的四個電極片出發，加上象徵幸福與幸運的四葉草。" },
      { label: "名字由來", text: "四葉草的日文「Yotsuba」加上品牌名「TANITA」，組合成日本名，音譯也有「優踏」的意思。" },
      { label: "外型特徵", text: "頭上、腳上各有四個電極片，臉是一個大螢幕。" }
    ]
  },

  /* ---------- 全域貫穿任務：長老村（公益捐贈計劃） ----------
     不計入地圖進度。照片放 images/mission/01.jpg…，影片放 images/mission/video.mp4。 */
  mission: {
    id: "mission",
    chapter: "全域貫穿任務",
    name: "長老村：腳力覺醒日",
    event: "公益捐贈計劃",
    date: "全活動期間",
    place: "財團法人老五老基金會",
    address: "",
    summary: "貫穿整個冒險旅程的「長老村任務」同步上線！全活動每累計達 15,000 腳點，TANITA 即捐贈 10 台 BC-775 體組成計至財團法人老五老基金會，將你的好腳力轉化為實質陪伴，支持長輩穩健邁步、綻放健康活力。",
    goal: "",
    badge: "進行中",
    photos: 0
  },

  /* ---------- 6 站活動（由下往上，對應活動地圖；地圖最下面的「序章」是起點，不用設定） ----------
     id       ：資料夾名稱，請不要改（event-01 到 event-06）
     chapter  ：地圖上的章節名稱
     short    ：地圖上方塊的短名稱（3 個字最剛好）
     event    ：活動檔期名稱
     start、end：活動開始與結束的日期（西元年-月-日）。地圖上的 YOTA 與進度條會依「台灣時間」
                 自動前進：活動結束的隔天，YOTA 就走到這一站，不需要手動調整。
     done     ：這一站的照片與影片都上傳完成後，改成 true（只影響「已上傳」標籤，不影響進度）。
     photos   ：這一站實際上傳的照片張數。照片檔名 01.jpg、02.jpg……
     summary  ：活動結束後，請改寫成實際成果。
     goal     ：預期成效，活動結束後可改成實際數字；不想顯示就留空 "" 。 */
  events: [
    { id: "event-01", start: "2026-10-09", end: "2026-10-11", chapter: "第一章", name: "創之國：能量果實我來採", short: "創之國",
      event: "雙十檔期 168 幸福市集",
      date: "2026.10.09 – 10.11", place: "台北松菸誠品戶外大廣場", address: "台北市信義區菸廠路 88 號",
      summary: "活動結束後，請在這裡寫下這一站的實際內容與成果。",
      goal: "",
      done: false, photos: 1 },
    { id: "event-02", start: "2026-10-24", end: "2026-10-24", chapter: "第二章", name: "水之國：腳點榮譽登陸戰", short: "水之國",
      event: "淡江大橋路跑活動",
      date: "2026.10.24", place: "淡水漁人碼頭舞台", address: "新北市淡水區觀海路",
      summary: "完賽民眾站上 BC-775 量測腳點，領取能量證書、把數據寫上榮譽榜，並擺出「腳力英雄姿勢」拍照打卡。",
      goal: "預計引導 200 位以上民眾量測",
      done: false, photos: 0 },
    { id: "event-03", start: "2026-11-16", end: "2026-11-20", chapter: "第三章", name: "風之國：不倒翁腳力修練場", short: "風之國",
      event: "文化廣告 38 屆園遊會",
      date: "2026.11.16 – 11.20", place: "中國文化大學 百花池廣場", address: "臺北市士林區華岡路 55 號",
      summary: "依腳點分數選擇等級，負重進行 30 秒不倒翁腳力特訓，完成後拍照打卡、填寫回饋。",
      goal: "預計引導 300 位以上民眾站上 BC-775",
      done: false, photos: 0 },
    { id: "event-04", start: "2026-11-27", end: "2026-11-29", chapter: "第四章", name: "花之國：極速踩踏，腳點爆花！", short: "花之國",
      event: "圓山花博 168 幸福市集",
      date: "2026.11.27 – 11.29", place: "花博公園環形廣場", address: "臺北市中山區玉門街 1 號",
      summary: "量測腳點後依分數判定遊戲段位，挑戰雙腳動態反應力小遊戲，通關就把被封印的腳點能量傳回健康之樹。",
      goal: "預計引導 300 位以上民眾站上 BC-775",
      done: false, photos: 0 },
    { id: "event-05", start: "2026-12-05", end: "2026-12-06", chapter: "第五章", name: "雪之國：腳石頭布 COMBO 戰！", short: "雪之國",
      event: "新店裕隆城 168 幸福市集",
      date: "2026.12.05 – 12.06", place: "新店裕隆城百貨遮雨廊道", address: "新北市新店區中興路三段 70 號",
      summary: "活動結束後，請在這裡寫下這一站的實際內容與成果。",
      goal: "",
      done: false, photos: 0 },
    { id: "event-06", start: "2027-04-09", end: "2027-04-11", chapter: "最終章", name: "重回幸之國：文化廣告第 38 屆畢業展", short: "畢業展",
      event: "文化廣告學系畢業展",
      date: "2027.04.09 – 04.11", place: "三創生活園區", address: "臺北市中正區正守里市民大道三段 2 號 12 樓",
      summary: "以遊戲風格打造拯救「健康之樹」的體驗：按下 GAME START 領取冒險者地圖，經過測量站、展示區、腳踩鋼琴鍵互動區，最後在像素背板前合影。",
      goal: "預計引導 500 位以上民眾站上 BC-775",
      done: false, photos: 0 }
  ],

  /* 進度依台灣時間自動計算（"auto"）。想測試畫面，可以改成 0 到 6 的數字，
     或在網址後面加 ?today=2026-11-30 預覽那一天的樣子。 */
  progress: "auto",

  /* ---------- 延伸閱讀（網站最後面） ----------
     articles：三篇文章卡片。url 填文章網址；還沒填（留空 ""）時，卡片會顯示「網址待補」。
     quiz：健康心理測驗　youtube：影片網址（直接貼 YouTube 觀看網址）　product：產品介紹頁 */
  more: {
    heading: "延伸閱讀",
    articles: [
      { tag: "READ 01", title: "腳點是什麼？", text: "「腳點」是根據「腿部肌肉量是否足以支撐體重」所評估出來的分數。並將腿部肌肉分成三階段「良／略低／低」來測量！透過「腳點」可快速掌握腿部肌肉量", url: "https://www.tanita.com.tw/blogs/%E5%81%A5%E5%BA%B7%E6%83%85%E5%A0%B1/135094" },
      { tag: "READ 02", title: "腳點怎麼提高？", text: "從日常運動與均衡飲食開始，一步一步把腳力練起來。", url: "https://www.tanita.com.tw/blogs/%E5%81%A5%E5%BA%B7%E6%83%85%E5%A0%B1/160795" },
      { tag: "QUIZ", title: "腳腳者召集測驗", text: "只需完成 6 道初始任務，YOTA 將依據你的日常選擇，分類出最適合你的本命腳腳者檔案！", url: "https://ooopenlab.cc/quiz/0ZsFaky9TiSxorc8oUEr", cta: "開始測驗" }
    ],
    videoTitle: "冒險影片",
    youtube: "https://www.youtube.com/watch?v=4h1rIyz0IHo",
    product: { tag: "NEW ITEM", name: "TANITA BC-775", text: "十合一藍牙腳點智能體組成計", url: "https://www.tanita.com.tw/products/bc-775", cta: "看產品介紹" }
  },

  /* ---------- 受贈單位（網站最後面）
     logo：放 images/logo-ofo.png（透明背景 PNG，高度約 160px）；沒放時顯示文字。 */
  donee: {
    heading: "受贈單位",
    name: "財團法人老五老基金會",
    logo: "images/logo-ofo.png",
    url: "https://www.ofo.org.tw/",
    text: "每累計 15,000 腳點，TANITA 即捐贈 10 台 BC-775 體組成計，陪伴長輩穩健邁步。"
  },

  links: { tanita: "https://www.tanita.com.tw/" }
};
