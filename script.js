/* ==========================================================================
   WatchUrMovie — Calm, Eye-Soothing & Ultra-Organized Application Logic
   - Powered by Live TMDB API (Key: 948d5b52b35e1e08e125bd0acbe23ace)
   - Movie & Series Titles NEVER translated (Original English Titles Always)
   - Real TMDB Posters, Backdrops, Arabic & English Overviews, Cast,
     Live Global TMDB Search (/search/multi), Official Trailers & Load More!
   ========================================================================== */

(() => {
  'use strict';

  // Official TMDB API v3 Key provided by user
  const BUILTIN_TMDB_KEY = '948d5b52b35e1e08e125bd0acbe23ace';
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  const TMDB_IMG_W500 = 'https://image.tmdb.org/t/p/w500';
  const TMDB_IMG_ORIG = 'https://image.tmdb.org/t/p/original';

  const I18N = {
    ar: {
      navHome: 'الرئيسية',
      navMovies: 'الأفلام',
      navSeries: 'المسلسلات',
      navTop10: 'الأعلى تقييماً',
      navWatchlist: 'قائمتي',
      searchPlaceholder: 'ابحث في قاعدة بيانات TMDB عن أي فيلم أو مسلسل...',
      eyeCareBtn: 'راحة العين',
      surpriseBtn: 'فاجئني',
      codesBtn: 'الأكواد',
      tmdbBtn: 'TMDB متصل ✓',
      watchNow: 'بدء المشاهدة',
      watchTrailer: 'الإعلان الرسمي (Trailer)',
      moreDetails: 'معلومات العمل',
      addToWatchlist: '+ حفظ في قائمتي',
      inWatchlist: '✓ محفوظ في قائمتي',
      spotlightQueueTitle: 'أبرز أفلام ومسلسلات الأسبوع',
      spotlightQueueSub: 'بيانات حية من TMDB',
      continueWatching: 'متابعة المشاهدة',
      clearHistory: 'مسح السجل',
      exploreCatalog: 'مكتبة الأفلام والمسلسلات (TMDB)',
      loadMoreBtn: 'عرض المزيد من الأفلام والمسلسلات +',
      loadingMore: 'جاري جلب المزيد من TMDB...',
      allRatings: 'كل التقييمات',
      allYears: 'كل السنوات',
      classicYears: 'قبل 2020',
      sortTrending: 'الترتيب: الأكثر رواجاً',
      sortRating: 'الترتيب: الأعلى تقييماً',
      sortNewest: 'الترتيب: الأحدث إصداراً',
      sortTitle: 'الترتيب: A–Z',
      noResultsTitle: 'لا توجد أعمال مطابقة لهذا البحث',
      noResultsDesc: 'جرب البحث بالاسم الإنجليزي للفيلم أو المسلسل للبحث المباشر في TMDB.',
      resetFilters: 'إظهار الكل',
      trendingTop10: 'قائمة الشرف — الأعلى تقييماً على TMDB',
      codesBannerTitle: 'متصل مباشرة مع TMDB API + أكواد المستودع (./codes)',
      codesBannerDesc: 'يتم جلب البوسترات الأصلية، التقييمات، الممثلين، والقصص المترجمة مباشرة عبر مفتاح TMDB API الخاص بك.',
      redeemCodeNow: 'الأكواد وإعدادات TMDB',
      selectServer: 'المصدر:',
      subtitlesLabel: 'الترجمة:',
      qualityLabel: 'الدقة:',
      episodesListTitle: 'حلقات المسلسل',
      castAndCrew: 'طاقم التمثيل والإخراج (TMDB Credits)',
      userReviews: 'انطباعات المشاهدين',
      submitReview: 'نشر',
      codesModalHeading: 'إعدادات TMDB API وأكواد التفعيل',
      codesModalSub: 'مفتاح TMDB API الخاص بك مفعل ومتصل حالياً. يمكنك أيضاً تفعيل أكواد المستودع بالأسفل:',
      activateCodeBtn: 'تفعيل',
      saveTmdbBtn: 'تحديث المفتاح',
      typeMovie: 'فيلم',
      typeSeries: 'مسلسل',
      episodeWord: 'الحلقة',
      directorLabel: 'المخرج / العمل',
      yearLabel: 'سنة الإصدار',
      durationLabel: 'المدة / المواسم',
      qualityMetaLabel: 'التقييم العالمي',
      useCodeNow: 'تفعيل ←',
      toastAddedWatchlist: 'تم الحفظ في قائمتك',
      toastRemovedWatchlist: 'تمت الإزالة من قائمتك',
      toastServerSwitched: 'تم تبديل مصدر العرض بنجاح',
      toastRandomPick: 'اخترنا لك هذا العمل من TMDB:',
      toastReviewAdded: 'تم نشر انطباعك بنجاح',
      toastHistoryCleared: 'تم مسح سجل المشاهدة',
      toastEyeOn: 'تم تفعيل فلتر راحة العين الدافئ',
      toastEyeOff: 'تم إيقاف فلتر راحة العين',
      toastCodeSuccess: 'تم تفعيل الكود بنجاح:',
      toastCodeInvalid: 'الكود غير مطابق، اختر أحد الأكواد بالأسفل',
      toastTmdbConnected: 'تم الجلب الحي من TMDB API بنجاح!',
      toastTmdbError: 'تعذر الاتصال بـ TMDB API، تأكد من الاتصال بالإنترنت',
      genreAll: 'الكل',
      genreScifi: 'خيال علمي وفانتازيا',
      genreDrama: 'دراما',
      genreThriller: 'غموض وإثارة',
      genreAction: 'أكشن ومغامرة',
      genreAnimation: 'أنمي ورسوم',
      genreComedy: 'كوميديا'
    },
    en: {
      navHome: 'Home',
      navMovies: 'Movies',
      navSeries: 'Series',
      navTop10: 'Top Rated',
      navWatchlist: 'My List',
      searchPlaceholder: 'Search any movie or series live on TMDB...',
      eyeCareBtn: 'Eye Care',
      surpriseBtn: 'Surprise Me',
      codesBtn: 'Codes',
      tmdbBtn: 'TMDB Live ✓',
      watchNow: 'Watch Now',
      watchTrailer: 'Official Trailer',
      moreDetails: 'Movie Info',
      addToWatchlist: '+ Save to List',
      inWatchlist: '✓ Saved in List',
      spotlightQueueTitle: 'Trending This Week',
      spotlightQueueSub: 'Live from TMDB',
      continueWatching: 'Continue Watching',
      clearHistory: 'Clear History',
      exploreCatalog: 'TMDB Cinema Library',
      loadMoreBtn: 'Load More from TMDB +',
      loadingMore: 'Loading more from TMDB...',
      allRatings: 'All Ratings',
      allYears: 'All Years',
      classicYears: 'Before 2020',
      sortTrending: 'Sort: Trending',
      sortRating: 'Sort: Highest Rated',
      sortNewest: 'Sort: Newest',
      sortTitle: 'Sort: A–Z',
      noResultsTitle: 'No matching titles found',
      noResultsDesc: 'Try resetting filters or searching another title on TMDB.',
      resetFilters: 'Reset All',
      trendingTop10: 'Honor Roll — Top Rated on TMDB',
      codesBannerTitle: 'Live TMDB API Connected + Repo Codes (./codes)',
      codesBannerDesc: 'Fetching official posters, backdrops, cast credits, trailers, and synopses directly via your TMDB API key.',
      redeemCodeNow: 'Codes & TMDB Settings',
      selectServer: 'Source:',
      subtitlesLabel: 'Subtitles:',
      qualityLabel: 'Resolution:',
      episodesListTitle: 'Episodes',
      castAndCrew: 'Cast & Crew (TMDB Credits)',
      userReviews: 'Audience Impressions',
      submitReview: 'Post',
      codesModalHeading: 'TMDB API & ./codes Perks',
      codesModalSub: 'Your TMDB API key is active and connected. You can also activate repository codes below:',
      activateCodeBtn: 'Activate',
      saveTmdbBtn: 'Update Key',
      typeMovie: 'Movie',
      typeSeries: 'Series',
      episodeWord: 'Episode',
      directorLabel: 'Director / Creator',
      yearLabel: 'Released',
      durationLabel: 'Runtime',
      qualityMetaLabel: 'TMDB Score',
      useCodeNow: 'Activate →',
      toastAddedWatchlist: 'Saved to your list',
      toastRemovedWatchlist: 'Removed from your list',
      toastServerSwitched: 'Streaming source switched',
      toastRandomPick: 'Selected for you from TMDB:',
      toastReviewAdded: 'Your impression has been posted',
      toastHistoryCleared: 'Watch history cleared',
      toastEyeOn: 'Warm Eye-Comfort filter enabled',
      toastEyeOff: 'Eye-Comfort filter disabled',
      toastCodeSuccess: 'Code activated:',
      toastCodeInvalid: 'Invalid code, click one below',
      toastTmdbConnected: 'Live TMDB data synchronized!',
      toastTmdbError: 'Could not reach TMDB API',
      genreAll: 'All',
      genreScifi: 'Sci-Fi & Fantasy',
      genreDrama: 'Drama',
      genreThriller: 'Mystery & Thriller',
      genreAction: 'Action & Adventure',
      genreAnimation: 'Anime & Animation',
      genreComedy: 'Comedy'
    }
  };

  const GENRES = [
    { id: 'all', key: 'genreAll' },
    { id: 'action', key: 'genreAction' },
    { id: 'scifi', key: 'genreScifi' },
    { id: 'drama', key: 'genreDrama' },
    { id: 'thriller', key: 'genreThriller' },
    { id: 'animation', key: 'genreAnimation' },
    { id: 'comedy', key: 'genreComedy' }
  ];

  const TMDB_GENRE_MAP = {
    28: 'action',
    12: 'action',
    10759: 'action',
    878: 'scifi',
    10765: 'scifi',
    14: 'scifi',
    18: 'drama',
    80: 'thriller',
    53: 'thriller',
    9648: 'thriller',
    27: 'thriller',
    16: 'animation',
    35: 'comedy'
  };

  function makePosterUri(item) {
    const [c1, c2, accent] = item.palette || ['#13262f', '#0a141c', '#2dd4bf'];
    const safeTitle = String(item.title || 'Movie').replace(/[&<>'"]/g, '');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="55%" stop-color="${c2}"/>
          <stop offset="100%" stop-color="#070a10"/>
        </linearGradient>
      </defs>
      <rect width="400" height="600" fill="url(#bg)"/>
      <circle cx="200" cy="195" r="86" fill="none" stroke="${accent}" stroke-width="1.6" stroke-opacity="0.45"/>
      <rect x="26" y="26" width="348" height="548" rx="14" fill="none" stroke="#ffffff" stroke-opacity="0.09" stroke-width="1"/>
      <line x1="56" y1="440" x2="344" y2="440" stroke="${accent}" stroke-opacity="0.45" stroke-width="1.2"/>
      <text x="200" y="490" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="20" fill="#f8fafc">${safeTitle}</text>
      <text x="200" y="532" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" font-size="11" fill="${accent}" letter-spacing="3">${item.year} • ${item.quality}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  function makeBackdropUri(item) {
    const [c1, c2, accent] = item.palette || ['#13262f', '#0a141c', '#2dd4bf'];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="55%" stop-color="${c2}"/>
          <stop offset="100%" stop-color="#070a10"/>
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)"/>
      <circle cx="860" cy="280" r="220" fill="none" stroke="${accent}" stroke-opacity="0.15" stroke-width="1.5"/>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  const VIDEO_STREAMS = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  ];

  // Fallback initial items before TMDB response arrives (with real TMDB poster paths!)
  const INITIAL_CATALOG = [
    {
      id: 'tmdb_movie_693134',
      tmdbId: 693134,
      type: 'movie',
      featured: true,
      topRank: 1,
      title: 'Dune: Part Two',
      year: 2024,
      rating: 8.3,
      durationAr: '2 س 46 د',
      durationEn: '2h 46m',
      quality: '4K IMAX',
      genres: ['scifi', 'drama', 'action'],
      director: 'Denis Villeneuve',
      cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
      synopsisAr: 'يتحد بول أتريدس مع تشاني والفريمن في رحلة انتقام ضد المتآمرين الذين دمروا عائلته، وعليه الاختيار بين حب حياته ومصير الكون.',
      synopsisEn: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
      posterPath: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      backdropPath: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
      palette: ['#13262f', '#0a141c', '#2dd4bf'],
      streamUrl: VIDEO_STREAMS[0]
    },
    {
      id: 'tmdb_movie_157336',
      tmdbId: 157336,
      type: 'movie',
      featured: true,
      topRank: 2,
      title: 'Interstellar',
      year: 2014,
      rating: 8.4,
      durationAr: '2 س 49 د',
      durationEn: '2h 49m',
      quality: '4K IMAX',
      genres: ['scifi', 'drama'],
      director: 'Christopher Nolan',
      cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
      synopsisAr: 'فريق من المستكشفين يسافر عبر ثقب دودي في الفضاء في محاولة لضمان بقاء البشرية وإيجاد كوكب جديد صالح للحياة.',
      synopsisEn: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.',
      posterPath: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      backdropPath: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
      palette: ['#101e36', '#08101f', '#38bdf8'],
      streamUrl: VIDEO_STREAMS[0]
    },
    {
      id: 'tmdb_movie_872585',
      tmdbId: 872585,
      type: 'movie',
      featured: true,
      topRank: 3,
      title: 'Oppenheimer',
      year: 2023,
      rating: 8.1,
      durationAr: '3 س 00 د',
      durationEn: '3h 00m',
      quality: '4K HDR',
      genres: ['drama', 'thriller'],
      director: 'Christopher Nolan',
      cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
      synopsisAr: 'قصة العالم الأمريكي جيه روبرت أوبنهايمر ودوره في قيادة مشروع مانهاتن وتطوير القنبلة الذرية.',
      synopsisEn: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
      posterPath: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      backdropPath: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
      palette: ['#261815', '#120c0b', '#fb923c'],
      streamUrl: VIDEO_STREAMS[1]
    },
    {
      id: 'tmdb_series_1396',
      tmdbId: 1396,
      type: 'series',
      featured: true,
      topRank: 4,
      title: 'Breaking Bad',
      year: 2008,
      rating: 8.9,
      durationAr: '5 مواسم (62 حلقة)',
      durationEn: '5 Seasons (62 Eps)',
      episodesCount: 10,
      quality: '4K Remaster',
      genres: ['drama', 'thriller'],
      director: 'Vince Gilligan',
      cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Giancarlo Esposito'],
      synopsisAr: 'معلم كيمياء في المرحلة الثانوية يُشخص بمرض خطير فيلجأ إلى تصنيع المواد الكيميائية مع طالب سابق لتأمين مستقبل عائلته.',
      synopsisEn: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student.',
      posterPath: '/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
      backdropPath: '/gc8PfyTqzqltKPW3X0cIVUGmagz.jpg',
      palette: ['#162419', '#0b120d', '#4ade80'],
      streamUrl: VIDEO_STREAMS[3]
    }
  ];

  let CATALOG = INITIAL_CATALOG.map((item) => ({
    ...item,
    posterUrl: item.posterPath ? `${TMDB_IMG_W500}${item.posterPath}` : makePosterUri(item),
    backdropUrl: item.backdropPath ? `${TMDB_IMG_ORIG}${item.backdropPath}` : makeBackdropUri(item)
  }));

  const SUBTITLES_SCRIPT = [
    { start: 0, end: 6, ar: 'مرحباً بك في تجربة المشاهدة الهادئة من WatchUrMovie', en: 'Welcome to the calm viewing experience on WatchUrMovie' },
    { start: 6, end: 14, ar: 'متصل مباشرة بقاعدة بيانات TMDB العالمية للأفلام والمسلسلات', en: 'Connected live to The Movie Database (TMDB)' },
    { start: 14, end: 24, ar: 'بث فائق الدقة 4K مع إمكانية التبديل بين المصادر والإعلان الرسمي', en: '4K playback with instant source and official trailer switching' }
  ];

  const DEFAULT_REPO_CODES = [
    { code: 'WATCH2026', type: 'VIP_4K_IMAX', descAr: 'تفعيل جودة 4K IMAX مع صوت Dolby Atmos المحيطي', descEn: 'Unlock 4K IMAX Quality & Dolby Atmos Audio' },
    { code: 'IRAQVIP', type: 'VIP_UNLIMITED', descAr: 'عضوية خاصة مجانية + فتح العروض الحصرية المبكرة', descEn: 'Free Special Membership + Early Screenings' },
    { code: 'CINEMA99', type: 'AMBIENT_THEME', descAr: 'تفعيل الثيم العنبر الدافئ المريح للعين تلقائياً', descEn: 'Activate Warm Amber Comfort Palette automatically' },
    { code: 'PARTY777', type: 'WATCH_PARTY', descAr: 'إنشاء غرفة مشاهدة مشتركة مع الأصدقاء', descEn: 'Create Shared Watch Party Room with Friends' },
    { code: 'ARABSEED', type: 'MULTI_SERVERS', descAr: 'تفعيل مصادر البث المباشر فائقة السرعة', descEn: 'Enable Ultra-Fast Direct Streaming Mirrors' }
  ];

  const state = {
    lang: localStorage.getItem('wum_lang') || 'ar',
    palette: localStorage.getItem('wum_palette') || 'aurora',
    eyeComfort: localStorage.getItem('wum_eye_comfort') === 'true',
    viewMode: localStorage.getItem('wum_view_mode') || 'grid',
    vipUnlocked: localStorage.getItem('wum_vip') === 'true',
    tmdbKey: localStorage.getItem('wum_tmdb_key') || BUILTIN_TMDB_KEY,
    tmdbConnected: false,
    tmdbPage: 1,
    activeNav: 'all',
    activeGenre: 'all',
    searchQuery: '',
    minRating: 0,
    yearFilter: 'all',
    sortBy: 'trending',
    heroIndex: 0,
    heroTimer: null,
    watchlist: JSON.parse(localStorage.getItem('wum_watchlist') || '["tmdb_movie_693134","tmdb_series_1396"]'),
    watchHistory: JSON.parse(localStorage.getItem('wum_history') || '{"tmdb_movie_693134":42}'),
    reviews: JSON.parse(localStorage.getItem('wum_reviews') || '{}'),
    repoCodes: [...DEFAULT_REPO_CODES],
    currentPlayingItem: null,
    activeServer: '1',
    canvasAnimId: null,
    usingFallbackCanvas: false,
    syntheticTime: 0,
    syntheticPlaying: false,
    searchDebounceTimer: null
  };

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || key;
  }

  // NEVER translate movie or series titles! Always keep original English title.
  function getTitle(item) {
    return item.title;
  }

  function getSynopsis(item) {
    return state.lang === 'ar' ? (item.synopsisAr || item.synopsisEn) : (item.synopsisEn || item.synopsisAr);
  }

  function getDuration(item) {
    return state.lang === 'ar' ? item.durationAr : item.durationEn;
  }

  function getGenreNames(item) {
    return (item.genres || [])
      .map((gId) => {
        const gObj = GENRES.find((g) => g.id === gId);
        return gObj ? t(gObj.key) : gId;
      })
      .join(' · ');
  }

  function showToast(msg) {
    const area = document.getElementById('toastContainer');
    if (!area) return;
    const bubble = document.createElement('div');
    bubble.className = 'toast-bubble';
    bubble.textContent = msg;
    area.appendChild(bubble);
    setTimeout(() => {
      bubble.style.opacity = '0';
      bubble.style.transition = 'opacity 0.25s ease';
      setTimeout(() => bubble.remove(), 260);
    }, 2800);
  }

  function formatTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // ---------------------------------------------------------------------------
  // LIVE TMDB API ENGINE
  // ---------------------------------------------------------------------------
  async function tmdbFetch(endpoint, params = {}) {
    const key = (state.tmdbKey || BUILTIN_TMDB_KEY).trim();
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const headers = { Accept: 'application/json' };
    if (key.length > 45 || key.startsWith('eyJ')) {
      headers.Authorization = `Bearer ${key}`;
    } else {
      url.searchParams.set('api_key', key);
    }

    const res = await fetch(url.toString(), { headers });
    if (!res.ok) throw new Error(`TMDB_HTTP_${res.status}`);
    return res.json();
  }

  function normalizeTmdbItem(raw, mediaType, rankIdx = 99) {
    const type = mediaType || (raw.media_type === 'tv' || raw.first_air_date ? 'series' : 'movie');
    // Strictly keep English / Latin title (never Arabic translated title!)
    const englishTitle =
      raw.title_en ||
      (raw.original_language === 'en' ? (raw.original_title || raw.original_name) : null) ||
      raw.title ||
      raw.name ||
      raw.original_title ||
      raw.original_name ||
      'Untitled';

    const dateStr = raw.release_date || raw.first_air_date || '2025';
    const year = Number(dateStr.slice(0, 4)) || 2025;
    const rating = Number(raw.vote_average || 7.8);

    const mappedGenres = [];
    (raw.genre_ids || []).forEach((gid) => {
      const slug = TMDB_GENRE_MAP[gid];
      if (slug && !mappedGenres.includes(slug)) mappedGenres.push(slug);
    });
    if (mappedGenres.length === 0) mappedGenres.push('drama');

    const itemObj = {
      id: `tmdb_${type}_${raw.id}`,
      tmdbId: raw.id,
      type,
      featured: rankIdx < 5,
      topRank: null,
      title: englishTitle,
      year,
      rating: Math.max(5.0, Math.min(9.9, rating)),
      durationAr: type === 'series' ? 'مسلسل أصلي' : 'فيلم سينمائي',
      durationEn: type === 'series' ? 'TV Series' : 'Feature Film',
      quality: rating >= 7.8 ? '4K IMAX' : '1080p FHD',
      genres: mappedGenres,
      director: 'TMDB Official',
      cast: [],
      trailerKey: null,
      synopsisAr: raw.overview_ar || raw.overview || 'قصة سينمائية من قاعدة بيانات TMDB العالمية.',
      synopsisEn: raw.overview_en || raw.overview || 'Official synopsis from The Movie Database (TMDB).',
      palette: ['#13262f', '#0a141c', '#2dd4bf'],
      streamUrl: VIDEO_STREAMS[rankIdx % VIDEO_STREAMS.length]
    };

    itemObj.posterUrl = raw.poster_path ? `${TMDB_IMG_W500}${raw.poster_path}` : makePosterUri(itemObj);
    itemObj.backdropUrl = raw.backdrop_path ? `${TMDB_IMG_ORIG}${raw.backdrop_path}` : makeBackdropUri(itemObj);
    return itemObj;
  }

  async function syncWithTmdbApi(showSuccessToast = false) {
    try {
      const [trendingMoviesEn, trendingMoviesAr, trendingTvEn, trendingTvAr, topRatedMoviesEn, topRatedMoviesAr] =
        await Promise.all([
          tmdbFetch('/trending/movie/week', { language: 'en-US', page: 1 }),
          tmdbFetch('/trending/movie/week', { language: 'ar-SA', page: 1 }),
          tmdbFetch('/trending/tv/week', { language: 'en-US', page: 1 }),
          tmdbFetch('/trending/tv/week', { language: 'ar-SA', page: 1 }),
          tmdbFetch('/movie/top_rated', { language: 'en-US', page: 1 }),
          tmdbFetch('/movie/top_rated', { language: 'ar-SA', page: 1 })
        ]);

      const arOverviewMap = new Map();
      [...(trendingMoviesAr.results || []), ...(trendingTvAr.results || []), ...(topRatedMoviesAr.results || [])].forEach((r) => {
        if (r && r.id && r.overview) arOverviewMap.set(r.id, r.overview);
      });

      const seenIds = new Set();
      const mergedList = [];

      function addRawList(list, forcedType) {
        (list || []).forEach((item) => {
          if (!item || !item.id || (!item.poster_path && !item.backdrop_path)) return;
          const uniqueKey = `${forcedType}_${item.id}`;
          if (seenIds.has(uniqueKey)) return;
          seenIds.add(uniqueKey);
          mergedList.push({
            ...item,
            media_type: forcedType === 'series' ? 'tv' : 'movie',
            title_en: item.title || item.name || item.original_title || item.original_name,
            overview_en: item.overview,
            overview_ar: arOverviewMap.get(item.id) || item.overview
          });
        });
      }

      addRawList((trendingMoviesEn.results || []).slice(0, 12), 'movie');
      addRawList((trendingTvEn.results || []).slice(0, 10), 'series');
      addRawList((topRatedMoviesEn.results || []).slice(0, 10), 'movie');

      if (mergedList.length > 0) {
        const normalized = mergedList.map((raw, idx) => normalizeTmdbItem(raw, null, idx));

        // Assign topRank 1..10 to highest rated items
        const byRating = [...normalized].sort((a, b) => b.rating - a.rating);
        byRating.slice(0, 10).forEach((item, i) => {
          item.topRank = i + 1;
        });

        CATALOG = normalized;
        state.tmdbConnected = true;
        state.heroIndex = 0;

        const tmdbPill = document.getElementById('tmdbStatusPill');
        if (tmdbPill) {
          tmdbPill.textContent = 'TMDB LIVE ✓';
          tmdbPill.classList.remove('hidden');
        }

        renderHero();
        renderTop10();
        renderContinueWatching();
        renderCatalog();
        if (showSuccessToast) showToast(t('toastTmdbConnected'));
        return true;
      }
    } catch (_) {
      if (showSuccessToast) showToast(t('toastTmdbError'));
    }
    return false;
  }

  // Load More Pages from TMDB
  async function loadMoreFromTmdb() {
    const btn = document.getElementById('loadMoreTmdbBtn');
    if (btn) btn.textContent = t('loadingMore');
    try {
      state.tmdbPage += 1;
      const [popMoviesEn, popMoviesAr, popTvEn, popTvAr] = await Promise.all([
        tmdbFetch('/movie/popular', { language: 'en-US', page: state.tmdbPage }),
        tmdbFetch('/movie/popular', { language: 'ar-SA', page: state.tmdbPage }),
        tmdbFetch('/tv/popular', { language: 'en-US', page: state.tmdbPage }),
        tmdbFetch('/tv/popular', { language: 'ar-SA', page: state.tmdbPage })
      ]);

      const arMap = new Map();
      [...(popMoviesAr.results || []), ...(popTvAr.results || [])].forEach((r) => {
        if (r && r.id && r.overview) arMap.set(r.id, r.overview);
      });

      const existingIds = new Set(CATALOG.map((c) => c.id));
      const newItems = [];

      (popMoviesEn.results || []).forEach((m) => {
        const id = `tmdb_movie_${m.id}`;
        if (!existingIds.has(id) && m.poster_path) {
          existingIds.add(id);
          newItems.push(
            normalizeTmdbItem(
              {
                ...m,
                media_type: 'movie',
                title_en: m.title || m.original_title,
                overview_en: m.overview,
                overview_ar: arMap.get(m.id) || m.overview
              },
              'movie',
              CATALOG.length + newItems.length
            )
          );
        }
      });

      (popTvEn.results || []).forEach((tv) => {
        const id = `tmdb_series_${tv.id}`;
        if (!existingIds.has(id) && tv.poster_path) {
          existingIds.add(id);
          newItems.push(
            normalizeTmdbItem(
              {
                ...tv,
                media_type: 'tv',
                title_en: tv.name || tv.original_name,
                overview_en: tv.overview,
                overview_ar: arMap.get(tv.id) || tv.overview
              },
              'series',
              CATALOG.length + newItems.length
            )
          );
        }
      });

      if (newItems.length > 0) {
        CATALOG = [...CATALOG, ...newItems];
        renderCatalog();
      }
    } catch (_) {
      // ignore error
    } finally {
      if (btn) btn.textContent = t('loadMoreBtn');
    }
  }

  // Live Global TMDB Search (/search/multi) when user types in the search box
  async function performLiveTmdbSearch(query) {
    const q = (query || '').trim();
    if (q.length < 2) return;
    try {
      const [resEn, resAr] = await Promise.all([
        tmdbFetch('/search/multi', { query: q, language: 'en-US', page: 1 }),
        tmdbFetch('/search/multi', { query: q, language: 'ar-SA', page: 1 })
      ]);

      const arMap = new Map();
      (resAr.results || []).forEach((r) => {
        if (r && r.id && r.overview) arMap.set(r.id, r.overview);
      });

      const existingIds = new Set(CATALOG.map((c) => c.id));
      const added = [];

      (resEn.results || [])
        .filter((r) => (r.media_type === 'movie' || r.media_type === 'tv') && r.poster_path)
        .slice(0, 12)
        .forEach((r) => {
          const type = r.media_type === 'tv' ? 'series' : 'movie';
          const id = `tmdb_${type}_${r.id}`;
          if (!existingIds.has(id)) {
            existingIds.add(id);
            added.push(
              normalizeTmdbItem(
                {
                  ...r,
                  title_en: r.title || r.name || r.original_title || r.original_name,
                  overview_en: r.overview,
                  overview_ar: arMap.get(r.id) || r.overview
                },
                type,
                99
              )
            );
          }
        });

      if (added.length > 0) {
        CATALOG = [...CATALOG, ...added];
        renderCatalog();
        updateSearchDropdownUI();
      }
    } catch (_) {
      // fallback to local catalog search
    }
  }

  // Enrich Cast, Runtime & Official YouTube Trailer from TMDB
  async function enrichTmdbItemDetails(item) {
    if (!item.tmdbId) return;
    try {
      const endpointType = item.type === 'series' ? 'tv' : 'movie';
      const data = await tmdbFetch(`/${endpointType}/${item.tmdbId}`, {
        language: 'en-US',
        append_to_response: 'credits,videos'
      });

      if (data.credits && Array.isArray(data.credits.cast) && data.credits.cast.length > 0) {
        item.cast = data.credits.cast.slice(0, 8).map((c) => c.name);
      }
      if (data.credits && Array.isArray(data.credits.crew)) {
        const dir = data.credits.crew.find((c) => c.job === 'Director');
        if (dir) item.director = dir.name;
      } else if (Array.isArray(data.created_by) && data.created_by[0]) {
        item.director = data.created_by[0].name;
      }
      if (data.runtime) {
        const h = Math.floor(data.runtime / 60);
        const m = data.runtime % 60;
        item.durationAr = `${h} س ${m} د`;
        item.durationEn = `${h}h ${m}m`;
      } else if (data.number_of_seasons) {
        item.durationAr = `${data.number_of_seasons} مواسم (${data.number_of_episodes || ''} حلقة)`;
        item.durationEn = `${data.number_of_seasons} Seasons (${data.number_of_episodes || ''} Eps)`;
      }
      if (data.videos && Array.isArray(data.videos.results)) {
        const yt =
          data.videos.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
          data.videos.results.find((v) => v.site === 'YouTube');
        if (yt && yt.key) {
          item.trailerKey = yt.key;
        }
      }
    } catch (_) {
      // ignore error
    }
  }

  function applyPaletteAndComfort() {
    document.documentElement.setAttribute('data-palette', state.palette);
    localStorage.setItem('wum_palette', state.palette);

    document.querySelectorAll('[data-palette-pick]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-palette-pick') === state.palette);
    });

    document.getElementById('eyeComfortOverlay')?.classList.toggle('active', state.eyeComfort);
    document.getElementById('eyeComfortBtn')?.classList.toggle('active', state.eyeComfort);
    document.getElementById('vipBadgeHeader')?.classList.toggle('hidden', !state.vipUnlocked);
  }

  function applyLanguage() {
    const html = document.documentElement;
    html.lang = state.lang;
    html.dir = state.lang === 'ar' ? 'rtl' : 'ltr';

    const langLabel = document.getElementById('langToggleLabel');
    if (langLabel) langLabel.textContent = state.lang === 'ar' ? 'EN' : 'عربي';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (I18N[state.lang][key]) el.textContent = I18N[state.lang][key];
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = t('searchPlaceholder');

    applyPaletteAndComfort();
    renderHero();
    renderGenreBar();
    renderTop10();
    renderContinueWatching();
    renderCatalog();
    renderRepoCodesList();
  }

  function getFeaturedItems() {
    const feat = CATALOG.filter((i) => i.featured);
    return feat.length > 0 ? feat.slice(0, 5) : CATALOG.slice(0, 5);
  }

  function renderHero() {
    const featuredItems = getFeaturedItems();
    const item = featuredItems[state.heroIndex] || CATALOG[0];
    if (!item) return;

    const backdrop = document.getElementById('heroBackdrop');
    if (backdrop) backdrop.style.backgroundImage = `url("${item.backdropUrl}")`;

    const badgesEl = document.getElementById('heroBadges');
    if (badgesEl) {
      badgesEl.innerHTML = `
        <span class="chip">${item.type === 'series' ? t('typeSeries') : t('typeMovie')}</span>
        <span class="chip rating">★ ${item.rating.toFixed(1)} TMDB</span>
        <span class="chip glass">${item.quality}</span>
      `;
    }

    const titleEl = document.getElementById('heroTitle');
    if (titleEl) {
      titleEl.textContent = getTitle(item);
      titleEl.setAttribute('dir', 'ltr');
    }

    const metaEl = document.getElementById('heroMeta');
    if (metaEl) {
      metaEl.innerHTML = `<span>${item.year}</span><span>·</span><span>${getDuration(item)}</span><span>·</span><span>${getGenreNames(item)}</span>`;
    }

    const synopsisEl = document.getElementById('heroSynopsis');
    if (synopsisEl) synopsisEl.textContent = getSynopsis(item);

    const wlBtn = document.getElementById('heroWatchlistBtn');
    if (wlBtn) wlBtn.classList.toggle('in-list', state.watchlist.includes(item.id));

    const queueEl = document.getElementById('heroThumbs');
    if (queueEl) {
      queueEl.innerHTML = featuredItems
        .map(
          (fItem, idx) => `
          <button class="spotlight-item ${idx === state.heroIndex ? 'active' : ''}" data-hero-idx="${idx}">
            <img src="${fItem.posterUrl}" alt="${getTitle(fItem)}" />
            <div class="spotlight-item-info">
              <div class="spotlight-item-name" dir="ltr">${getTitle(fItem)}</div>
              <div class="spotlight-item-meta">${fItem.year} · ★ ${fItem.rating.toFixed(1)} · ${fItem.quality}</div>
            </div>
          </button>
        `
        )
        .join('');

      queueEl.querySelectorAll('.spotlight-item').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.heroIndex = Number(btn.getAttribute('data-hero-idx'));
          renderHero();
          restartHeroAutoCycle();
        });
      });
    }
  }

  function restartHeroAutoCycle() {
    if (state.heroTimer) clearInterval(state.heroTimer);
    state.heroTimer = setInterval(() => {
      const featuredItems = getFeaturedItems();
      state.heroIndex = (state.heroIndex + 1) % featuredItems.length;
      renderHero();
    }, 8000);
  }

  function updateWatchlistCountBadge() {
    const badge = document.getElementById('watchlistCountBadge');
    if (badge) badge.textContent = String(state.watchlist.length);
  }

  function toggleWatchlist(itemId) {
    const idx = state.watchlist.indexOf(itemId);
    if (idx === -1) {
      state.watchlist.push(itemId);
      showToast(t('toastAddedWatchlist'));
    } else {
      state.watchlist.splice(idx, 1);
      showToast(t('toastRemovedWatchlist'));
    }
    localStorage.setItem('wum_watchlist', JSON.stringify(state.watchlist));
    updateWatchlistCountBadge();
    renderHero();
    renderCatalog();
  }

  function renderContinueWatching() {
    const section = document.getElementById('continueWatchingSection');
    const grid = document.getElementById('continueWatchingGrid');
    if (!section || !grid) return;

    const ids = Object.keys(state.watchHistory).filter((id) => CATALOG.some((c) => c.id === id));
    if (ids.length === 0) {
      section.classList.add('hidden');
      return;
    }

    section.classList.remove('hidden');
    grid.innerHTML = ids
      .map((id) => {
        const item = CATALOG.find((c) => c.id === id);
        if (!item) return '';
        const pct = Math.min(95, Math.max(10, Number(state.watchHistory[id]) || 30));
        return `
          <div class="continue-item-card" data-play-id="${item.id}">
            <img src="${item.posterUrl}" alt="${getTitle(item)}" />
            <div class="continue-item-body">
              <div class="continue-item-title" dir="ltr">${getTitle(item)}</div>
              <div class="continue-item-sub">${getDuration(item)} · ${pct}%</div>
              <div class="progress-track-mini">
                <div class="progress-fill-mini" style="width:${pct}%"></div>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    grid.querySelectorAll('[data-play-id]').forEach((card) => {
      card.addEventListener('click', () => openPlayerModal(card.getAttribute('data-play-id')));
    });
  }

  function renderTop10() {
    const track = document.getElementById('top10Track');
    if (!track) return;
    const topItems = CATALOG.filter((i) => i.topRank !== null).sort((a, b) => a.topRank - b.topRank);

    track.innerHTML = topItems
      .map(
        (item) => `
        <div class="honor-card" data-details-id="${item.id}">
          <span class="honor-rank">${item.topRank}</span>
          <img src="${item.posterUrl}" alt="${getTitle(item)}" loading="lazy" />
          <div class="honor-info">
            <div class="honor-name" dir="ltr">${getTitle(item)}</div>
            <div class="honor-sub">★ ${item.rating.toFixed(1)} · ${item.year} · ${item.quality}</div>
          </div>
        </div>
      `
      )
      .join('');

    track.querySelectorAll('[data-details-id]').forEach((card) => {
      card.addEventListener('click', () => openDetailsModal(card.getAttribute('data-details-id')));
    });
  }

  function renderGenreBar() {
    const bar = document.getElementById('genreFilterBar');
    if (!bar) return;

    bar.innerHTML = GENRES.map(
      (g) => `<button class="genre-chip-btn ${state.activeGenre === g.id ? 'active' : ''}" data-genre="${g.id}">${t(g.key)}</button>`
    ).join('');

    bar.querySelectorAll('.genre-chip-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeGenre = btn.getAttribute('data-genre');
        renderGenreBar();
        renderCatalog();
      });
    });
  }

  function getFilteredCatalog() {
    return CATALOG.filter((item) => {
      if (state.activeNav === 'movie' && item.type !== 'movie') return false;
      if (state.activeNav === 'series' && item.type !== 'series') return false;
      if (state.activeNav === 'top10' && !item.topRank) return false;
      if (state.activeNav === 'watchlist' && !state.watchlist.includes(item.id)) return false;
      if (state.activeGenre !== 'all' && !item.genres.includes(state.activeGenre)) return false;
      if (state.minRating > 0 && item.rating < state.minRating) return false;
      if (state.yearFilter !== 'all') {
        if (state.yearFilter === 'classic' && item.year >= 2020) return false;
        if (state.yearFilter !== 'classic' && String(item.year) !== state.yearFilter) return false;
      }
      if (state.searchQuery.trim() !== '') {
        const q = state.searchQuery.trim().toLowerCase();
        const hay = `${item.title} ${item.director} ${item.synopsisAr} ${item.synopsisEn}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (state.sortBy === 'rating') return b.rating - a.rating;
      if (state.sortBy === 'newest') return b.year - a.year;
      if (state.sortBy === 'title') return getTitle(a).localeCompare(getTitle(b), 'en');
      return 0;
    });
  }

  function renderCatalog() {
    const grid = document.getElementById('moviesGrid');
    const emptyBox = document.getElementById('emptyStateBox');
    const countBadge = document.getElementById('resultsCountBadge');
    if (!grid || !emptyBox) return;

    grid.classList.toggle('list-view', state.viewMode === 'list');
    document.getElementById('viewGridBtn')?.classList.toggle('active', state.viewMode === 'grid');
    document.getElementById('viewListBtn')?.classList.toggle('active', state.viewMode === 'list');

    const filtered = getFilteredCatalog();
    if (countBadge) countBadge.textContent = String(filtered.length);

    if (filtered.length === 0) {
      grid.innerHTML = '';
      emptyBox.classList.remove('hidden');
      return;
    }

    emptyBox.classList.add('hidden');
    grid.innerHTML = filtered
      .map((item) => {
        const inList = state.watchlist.includes(item.id);
        return `
          <article class="work-card" data-card-id="${item.id}">
            <div class="work-poster-box">
              <img src="${item.posterUrl}" alt="${getTitle(item)}" loading="lazy" />
              <div class="work-badges-top">
                <span class="work-q-tag">${item.quality}</span>
                <span class="work-r-tag">★ ${item.rating.toFixed(1)}</span>
              </div>
              <button class="work-save-btn ${inList ? 'active' : ''}" data-wl-id="${item.id}" title="${t('addToWatchlist')}">
                ${inList ? '✓' : '+'}
              </button>
              <div class="work-hover-layer">
                <button class="work-play-btn" data-watch-id="${item.id}" aria-label="Play">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
                </button>
                <button class="work-details-pill" data-info-id="${item.id}">${t('moreDetails')}</button>
              </div>
            </div>
            <div class="work-card-body">
              <h3 class="work-title" dir="ltr" title="${getTitle(item)}">${getTitle(item)}</h3>
              <div class="work-meta-line">
                <span>${item.year} · ${item.type === 'series' ? t('typeSeries') : t('typeMovie')}</span>
                <span>★ ${item.rating.toFixed(1)}</span>
              </div>
              <div class="work-genre-line">${getGenreNames(item)}</div>
            </div>
          </article>
        `;
      })
      .join('');

    grid.querySelectorAll('[data-watch-id]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPlayerModal(btn.getAttribute('data-watch-id'));
      });
    });

    grid.querySelectorAll('[data-info-id]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDetailsModal(btn.getAttribute('data-info-id'));
      });
    });

    grid.querySelectorAll('[data-wl-id]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWatchlist(btn.getAttribute('data-wl-id'));
      });
    });

    grid.querySelectorAll('.work-card').forEach((card) => {
      card.addEventListener('click', () => openDetailsModal(card.getAttribute('data-card-id')));
    });
  }

  function updateSearchDropdownUI() {
    const searchDropdown = document.getElementById('searchDropdown');
    if (!searchDropdown) return;
    if (state.searchQuery.trim().length === 0) {
      searchDropdown.classList.add('hidden');
      return;
    }
    const matches = getFilteredCatalog().slice(0, 6);
    if (matches.length > 0) {
      searchDropdown.classList.remove('hidden');
      searchDropdown.innerHTML = matches
        .map(
          (m) => `
          <div class="suggestion-row" data-search-pick="${m.id}">
            <img src="${m.posterUrl}" alt="${getTitle(m)}" />
            <div>
              <div class="suggestion-title" dir="ltr">${getTitle(m)}</div>
              <div class="suggestion-meta">★ ${m.rating.toFixed(1)} · ${m.year} · ${m.type === 'series' ? t('typeSeries') : t('typeMovie')}</div>
            </div>
          </div>
        `
        )
        .join('');
      searchDropdown.querySelectorAll('[data-search-pick]').forEach((el) => {
        el.addEventListener('click', () => {
          searchDropdown.classList.add('hidden');
          openDetailsModal(el.getAttribute('data-search-pick'));
        });
      });
    } else {
      searchDropdown.classList.add('hidden');
    }
  }

  const videoEl = document.getElementById('cinemaVideo');
  const canvasEl = document.getElementById('cinemaFallbackCanvas');
  const ytIframeEl = document.getElementById('ytTrailerIframe');

  function startCinemaSynthesizer(item) {
    state.usingFallbackCanvas = true;
    state.syntheticPlaying = true;
    if (canvasEl) canvasEl.classList.remove('hidden');
    if (videoEl) videoEl.classList.add('hidden');
    if (ytIframeEl) ytIframeEl.classList.add('hidden');

    const ctx = canvasEl.getContext('2d');
    canvasEl.width = 960;
    canvasEl.height = 540;
    let lastTick = performance.now();

    function drawFrame(now) {
      if (!state.usingFallbackCanvas) return;
      const dt = (now - lastTick) / 1000;
      lastTick = now;

      if (state.syntheticPlaying) {
        state.syntheticTime = (state.syntheticTime + dt) % 140;
        updatePlayerTimeUI(state.syntheticTime, 140);
      }

      const [c1, c2, accent] = item.palette || ['#0f172a', '#090d16', '#2dd4bf'];
      const grad = ctx.createLinearGradient(0, 0, canvasEl.width, canvasEl.height);
      grad.addColorStop(0, c1);
      grad.addColorStop(0.65, c2);
      grad.addColorStop(1, '#04070d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

      const breathe = Math.sin(now * 0.0015) * 18;
      ctx.save();
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(480, 235, 65 + i * 42 + breathe * 0.4, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(getTitle(item), 480, 225);

      ctx.fillStyle = accent;
      ctx.font = '600 14px monospace';
      ctx.fillText(`${item.quality} STREAM · ${item.year}`, 480, 260);

      for (let b = 0; b < 20; b++) {
        const barH = state.syntheticPlaying ? 5 + Math.abs(Math.sin(now * 0.005 + b * 0.45)) * 22 : 4;
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.55;
        ctx.fillRect(360 + b * 12, 315 - barH, 6, barH);
      }
      ctx.globalAlpha = 1;

      state.canvasAnimId = requestAnimationFrame(drawFrame);
    }

    if (state.canvasAnimId) cancelAnimationFrame(state.canvasAnimId);
    state.canvasAnimId = requestAnimationFrame(drawFrame);
  }

  function stopCinemaSynthesizer() {
    state.usingFallbackCanvas = false;
    state.syntheticPlaying = false;
    if (state.canvasAnimId) {
      cancelAnimationFrame(state.canvasAnimId);
      state.canvasAnimId = null;
    }
  }

  function updatePlayerTimeUI(current, duration) {
    const curLabel = document.getElementById('currentTimeLabel');
    const durLabel = document.getElementById('durationTimeLabel');
    const filled = document.getElementById('progressFilled');
    const subOverlay = document.getElementById('subtitleOverlay');

    if (curLabel) curLabel.textContent = formatTime(current);
    if (durLabel) durLabel.textContent = formatTime(duration || 140);

    const pct = duration > 0 ? Math.min(100, (current / duration) * 100) : 0;
    if (filled) filled.style.width = `${pct}%`;

    if (state.currentPlayingItem && current > 2) {
      state.watchHistory[state.currentPlayingItem.id] = Math.max(10, Math.min(95, Math.round(pct || 28)));
      localStorage.setItem('wum_history', JSON.stringify(state.watchHistory));
    }

    const subMode = document.getElementById('subtitleSelect')?.value || 'ar';
    if (subOverlay) {
      if (subMode === 'off') {
        subOverlay.innerHTML = '';
      } else {
        const cueTime = current % 24;
        const cue = SUBTITLES_SCRIPT.find((c) => cueTime >= c.start && cueTime < c.end);
        subOverlay.innerHTML = cue ? `<span>${subMode === 'ar' ? cue.ar : cue.en}</span>` : '';
      }
    }
  }

  async function openPlayerModal(itemId, preferTrailer = false) {
    const item = CATALOG.find((c) => c.id === itemId) || CATALOG[0];
    if (!item) return;

    state.currentPlayingItem = item;
    document.getElementById('playerModal')?.classList.remove('hidden');
    document.getElementById('playerTypeBadge').textContent = item.type === 'series' ? t('typeSeries') : t('typeMovie');
    document.getElementById('playerModalTitle').textContent = getTitle(item);
    document.getElementById('playerSubMeta').textContent = `${item.year} · ★ ${item.rating.toFixed(1)} TMDB`;

    await enrichTmdbItemDetails(item);

    stopCinemaSynthesizer();
    if (preferTrailer && item.trailerKey && ytIframeEl) {
      if (videoEl) {
        videoEl.pause();
        videoEl.classList.add('hidden');
      }
      if (canvasEl) canvasEl.classList.add('hidden');
      ytIframeEl.classList.remove('hidden');
      ytIframeEl.src = `https://www.youtube.com/embed/${item.trailerKey}?autoplay=1&rel=0`;
      document.getElementById('videoCustomCtrlBar')?.classList.add('hidden');
    } else {
      if (ytIframeEl) {
        ytIframeEl.src = '';
        ytIframeEl.classList.add('hidden');
      }
      document.getElementById('videoCustomCtrlBar')?.classList.remove('hidden');
      if (videoEl) {
        videoEl.classList.remove('hidden');
        if (canvasEl) canvasEl.classList.add('hidden');
        videoEl.src = item.streamUrl;
        videoEl.currentTime = 0;
        const p = videoEl.play();
        if (p !== undefined) {
          p.catch(() => startCinemaSynthesizer(item));
        }
      } else {
        startCinemaSynthesizer(item);
      }
    }

    if (!state.watchHistory[item.id]) {
      state.watchHistory[item.id] = 22;
      localStorage.setItem('wum_history', JSON.stringify(state.watchHistory));
    }
    renderContinueWatching();
  }

  function closePlayerModal() {
    document.getElementById('playerModal')?.classList.add('hidden');
    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute('src');
    }
    if (ytIframeEl) {
      ytIframeEl.src = '';
      ytIframeEl.classList.add('hidden');
    }
    stopCinemaSynthesizer();
    renderContinueWatching();
  }

  async function openDetailsModal(itemId) {
    const item = CATALOG.find((c) => c.id === itemId);
    if (!item) return;

    state.currentPlayingItem = item;
    document.getElementById('detailsModal')?.classList.remove('hidden');

    const poster = document.getElementById('detailsPoster');
    if (poster) poster.src = item.posterUrl;

    document.getElementById('detailsBadges').innerHTML = `
      <span class="chip">${item.type === 'series' ? t('typeSeries') : t('typeMovie')}</span>
      <span class="chip rating">★ ${item.rating.toFixed(1)} TMDB</span>
      <span class="chip glass">${item.quality}</span>
    `;

    const titleEl = document.getElementById('detailsTitle');
    if (titleEl) {
      titleEl.textContent = getTitle(item);
      titleEl.setAttribute('dir', 'ltr');
    }
    document.getElementById('detailsSynopsis').textContent = getSynopsis(item);

    // Fetch live cast & director from TMDB
    await enrichTmdbItemDetails(item);

    document.getElementById('detailsMetaGrid').innerHTML = `
      <div><small style="color:var(--text-subtle);display:block">${t('directorLabel')}</small><strong dir="ltr">${item.director || 'TMDB'}</strong></div>
      <div><small style="color:var(--text-subtle);display:block">${t('yearLabel')}</small><strong>${item.year}</strong></div>
      <div><small style="color:var(--text-subtle);display:block">${t('durationLabel')}</small><strong>${getDuration(item)}</strong></div>
      <div><small style="color:var(--text-subtle);display:block">${t('qualityMetaLabel')}</small><strong>★ ${item.rating.toFixed(1)} / 10</strong></div>
    `;

    const wlBtnText = document.getElementById('detailsWatchlistText');
    if (wlBtnText) {
      wlBtnText.textContent = state.watchlist.includes(item.id) ? t('inWatchlist') : t('addToWatchlist');
    }

    const castContainer = document.getElementById('detailsCastList');
    if (castContainer) {
      const castArr = item.cast && item.cast.length > 0 ? item.cast : ['TMDB Official Cast'];
      castContainer.innerHTML = castArr
        .map((actor) => `<span class="cast-tag" dir="ltr">${actor}</span>`)
        .join('');
    }

    renderItemReviews(item.id);
  }

  function renderItemReviews(itemId) {
    const container = document.getElementById('reviewsListContainer');
    if (!container) return;
    const list = state.reviews[itemId] || [
      {
        author: state.lang === 'ar' ? 'متابع سينمائي' : 'Cinema Viewer',
        text: state.lang === 'ar' ? 'عمل رائع وتصميم الواجهة مريح جداً للعين.' : 'Wonderful title and the interface is very easy on the eyes.'
      }
    ];
    container.innerHTML = list
      .map((rev) => `<div class="review-card-item"><strong>${rev.author}:</strong> ${rev.text}</div>`)
      .join('');
  }

  function renderRepoCodesList() {
    const listEl = document.getElementById('repoCodesList');
    if (!listEl) return;

    listEl.innerHTML = state.repoCodes
      .map(
        (c) => `
        <div class="code-row-item" data-use-code="${c.code}">
          <span class="code-key-pill">${c.code}</span>
          <span style="flex:1;font-size:0.8rem">${state.lang === 'ar' ? c.descAr : c.descEn}</span>
          <span style="color:var(--primary-light);font-size:0.76rem;font-weight:700">${t('useCodeNow')}</span>
        </div>
      `
      )
      .join('');

    listEl.querySelectorAll('[data-use-code]').forEach((el) => {
      el.addEventListener('click', () => {
        const codeStr = el.getAttribute('data-use-code');
        const input = document.getElementById('codeInput');
        if (input) input.value = codeStr;
        activateRepoCode(codeStr);
      });
    });
  }

  function activateRepoCode(rawCode) {
    const code = (rawCode || '').trim().toUpperCase();
    const matched = state.repoCodes.find((c) => c.code === code);
    if (!matched) {
      showToast(t('toastCodeInvalid'));
      return;
    }
    state.vipUnlocked = true;
    localStorage.setItem('wum_vip', 'true');
    if (matched.code === 'CINEMA99') state.palette = 'amber';
    applyPaletteAndComfort();
    showToast(`${t('toastCodeSuccess')} ${matched.code}`);
  }

  function initEvents() {
    document.querySelectorAll('[data-palette-pick]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.palette = btn.getAttribute('data-palette-pick');
        applyPaletteAndComfort();
      });
    });

    document.getElementById('eyeComfortBtn')?.addEventListener('click', () => {
      state.eyeComfort = !state.eyeComfort;
      localStorage.setItem('wum_eye_comfort', String(state.eyeComfort));
      applyPaletteAndComfort();
      showToast(state.eyeComfort ? t('toastEyeOn') : t('toastEyeOff'));
    });

    document.getElementById('viewGridBtn')?.addEventListener('click', () => {
      state.viewMode = 'grid';
      localStorage.setItem('wum_view_mode', 'grid');
      renderCatalog();
    });

    document.getElementById('viewListBtn')?.addEventListener('click', () => {
      state.viewMode = 'list';
      localStorage.setItem('wum_view_mode', 'list');
      renderCatalog();
    });

    document.getElementById('langToggleBtn')?.addEventListener('click', () => {
      state.lang = state.lang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('wum_lang', state.lang);
      applyLanguage();
    });

    document.querySelectorAll('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeNav = btn.getAttribute('data-nav');
        document.querySelectorAll('[data-nav]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
        renderCatalog();
      });
    });

    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const searchDropdown = document.getElementById('searchDropdown');

    searchInput?.addEventListener('input', () => {
      state.searchQuery = searchInput.value;
      clearSearchBtn?.classList.toggle('hidden', state.searchQuery === '');
      renderCatalog();
      updateSearchDropdownUI();

      if (state.searchDebounceTimer) clearTimeout(state.searchDebounceTimer);
      if (state.searchQuery.trim().length >= 2) {
        state.searchDebounceTimer = setTimeout(() => {
          performLiveTmdbSearch(state.searchQuery);
        }, 350);
      }
    });

    clearSearchBtn?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      searchDropdown?.classList.add('hidden');
      renderCatalog();
    });

    document.getElementById('loadMoreTmdbBtn')?.addEventListener('click', loadMoreFromTmdb);

    document.getElementById('surpriseMeBtn')?.addEventListener('click', () => {
      const randomItem = CATALOG[Math.floor(Math.random() * CATALOG.length)];
      showToast(`${t('toastRandomPick')} ${getTitle(randomItem)}`);
      openDetailsModal(randomItem.id);
    });

    document.getElementById('heroWatchBtn')?.addEventListener('click', () => {
      const featuredItems = getFeaturedItems();
      const item = featuredItems[state.heroIndex] || CATALOG[0];
      openPlayerModal(item.id, false);
    });
    document.getElementById('heroDetailsBtn')?.addEventListener('click', () => {
      const featuredItems = getFeaturedItems();
      const item = featuredItems[state.heroIndex] || CATALOG[0];
      openDetailsModal(item.id);
    });
    document.getElementById('heroWatchlistBtn')?.addEventListener('click', () => {
      const featuredItems = getFeaturedItems();
      const item = featuredItems[state.heroIndex] || CATALOG[0];
      toggleWatchlist(item.id);
    });

    document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
      state.watchHistory = {};
      localStorage.removeItem('wum_history');
      renderContinueWatching();
      showToast(t('toastHistoryCleared'));
    });

    document.getElementById('ratingFilterSelect')?.addEventListener('change', (e) => {
      state.minRating = Number(e.target.value);
      renderCatalog();
    });
    document.getElementById('yearFilterSelect')?.addEventListener('change', (e) => {
      state.yearFilter = e.target.value;
      renderCatalog();
    });
    document.getElementById('sortSelect')?.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });
    document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
      state.activeNav = 'all';
      state.activeGenre = 'all';
      state.searchQuery = '';
      state.minRating = 0;
      state.yearFilter = 'all';
      if (searchInput) searchInput.value = '';
      renderGenreBar();
      renderCatalog();
    });

    document.getElementById('closePlayerModalBtn')?.addEventListener('click', closePlayerModal);

    document.querySelectorAll('.srv-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.srv-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const srv = btn.getAttribute('data-server');
        if (srv === 'trailer' && state.currentPlayingItem) {
          openPlayerModal(state.currentPlayingItem.id, true);
        } else if (state.currentPlayingItem) {
          openPlayerModal(state.currentPlayingItem.id, false);
        }
        showToast(t('toastServerSwitched'));
      });
    });

    document.getElementById('playPauseBtn')?.addEventListener('click', () => {
      if (state.usingFallbackCanvas) {
        state.syntheticPlaying = !state.syntheticPlaying;
      } else if (videoEl) {
        if (videoEl.paused) videoEl.play();
        else videoEl.pause();
      }
    });

    document.getElementById('skipBackBtn')?.addEventListener('click', () => {
      if (state.usingFallbackCanvas) state.syntheticTime = Math.max(0, state.syntheticTime - 10);
      else if (videoEl) videoEl.currentTime = Math.max(0, videoEl.currentTime - 10);
    });

    document.getElementById('skipFwdBtn')?.addEventListener('click', () => {
      if (state.usingFallbackCanvas) state.syntheticTime = (state.syntheticTime + 10) % 140;
      else if (videoEl) videoEl.currentTime = Math.min(videoEl.duration || 140, videoEl.currentTime + 10);
    });

    document.getElementById('closeDetailsModalBtn')?.addEventListener('click', () => {
      document.getElementById('detailsModal')?.classList.add('hidden');
    });

    document.getElementById('detailsWatchBtn')?.addEventListener('click', () => {
      document.getElementById('detailsModal')?.classList.add('hidden');
      if (state.currentPlayingItem) openPlayerModal(state.currentPlayingItem.id, false);
    });

    document.getElementById('detailsTrailerBtn')?.addEventListener('click', () => {
      document.getElementById('detailsModal')?.classList.add('hidden');
      if (state.currentPlayingItem) openPlayerModal(state.currentPlayingItem.id, true);
    });

    document.getElementById('detailsWatchlistBtn')?.addEventListener('click', () => {
      if (!state.currentPlayingItem) return;
      toggleWatchlist(state.currentPlayingItem.id);
      const wlBtnText = document.getElementById('detailsWatchlistText');
      if (wlBtnText) {
        wlBtnText.textContent = state.watchlist.includes(state.currentPlayingItem.id) ? t('inWatchlist') : t('addToWatchlist');
      }
    });

    document.getElementById('reviewForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!state.currentPlayingItem) return;
      const nameInput = document.getElementById('reviewerNameInput');
      const commentInput = document.getElementById('reviewCommentInput');
      const author = nameInput.value.trim();
      const text = commentInput.value.trim();
      if (!author || !text) return;
      const id = state.currentPlayingItem.id;
      if (!state.reviews[id]) state.reviews[id] = [];
      state.reviews[id].unshift({ author, text });
      localStorage.setItem('wum_reviews', JSON.stringify(state.reviews));
      nameInput.value = '';
      commentInput.value = '';
      renderItemReviews(id);
      showToast(t('toastReviewAdded'));
    });

    const openCodes = (e) => {
      if (e) e.preventDefault();
      const tmdbInput = document.getElementById('tmdbKeyInput');
      if (tmdbInput) tmdbInput.value = state.tmdbKey || BUILTIN_TMDB_KEY;
      document.getElementById('codesModal')?.classList.remove('hidden');
    };
    document.getElementById('openCodesModalBtn')?.addEventListener('click', openCodes);
    document.getElementById('bannerOpenCodesBtn')?.addEventListener('click', openCodes);

    document.getElementById('closeCodesModalBtn')?.addEventListener('click', () => {
      document.getElementById('codesModal')?.classList.add('hidden');
    });

    document.getElementById('tmdbKeyForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const keyVal = (document.getElementById('tmdbKeyInput')?.value || '').trim();
      if (!keyVal) return;
      state.tmdbKey = keyVal;
      localStorage.setItem('wum_tmdb_key', keyVal);
      const ok = await syncWithTmdbApi(true);
      if (ok) {
        document.getElementById('codesModal')?.classList.add('hidden');
      }
    });

    document.getElementById('redeemCodeForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      activateRepoCode(document.getElementById('codeInput')?.value || '');
    });

    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          if (overlay.id === 'playerModal') closePlayerModal();
          else overlay.classList.add('hidden');
        }
      });
    });
  }

  updateWatchlistCountBadge();
  applyLanguage();
  initEvents();
  restartHeroAutoCycle();
  // Automatically connect and fetch live movies & TV shows using the user's TMDB key!
  syncWithTmdbApi(false);
})();
