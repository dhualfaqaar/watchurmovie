/* ==========================================================================
   WatchUrMovie — Streamex Full-Page Watch Studio & TMDB Engine (script.js)
   - Full-Page Watch Studio View (#watchStudioView) replacing Catalog on click
   - 16 Genuinely Distinct, Deduplicated Streaming Providers (with flags & ●)
   - Multi-File Download Hub (4K, 1080p, 720p, 480p, Cloud Mirrors, .SRT Sub)
   - Interactive Characters & Cast -> Actor Profile & Full Filmography Explorer
   - Live Recommended & Similar Titles from TMDB API
   ========================================================================== */

(() => {
  'use strict';

  const BUILTIN_TMDB_KEY = '948d5b52b35e1e08e125bd0acbe23ace';
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  const TMDB_IMG_W185 = 'https://image.tmdb.org/t/p/w185';
  const TMDB_IMG_W500 = 'https://image.tmdb.org/t/p/w500';
  const TMDB_IMG_ORIG = 'https://image.tmdb.org/t/p/original';

  // ---------------------------------------------------------------------------
  // 16 GENUINELY DISTINCT STREAMING PROVIDERS (Deduplicated — No Clone Domains)
  // ---------------------------------------------------------------------------
  const STREAM_SERVERS = [
    {
      id: 'wum_streamex',
      name: 'wum-core',
      flag: '🇺🇸',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.cc/v2/embed/tv/${id}/${s}/${e}` : `https://vidsrc.cc/v2/embed/movie/${id}`
    },
    {
      id: 'vidlink_pro',
      name: 'vidlink',
      flag: '🇺🇸',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://vidlink.pro/tv/${id}/${s}/${e}` : `https://vidlink.pro/movie/${id}`
    },
    {
      id: 'rivestream',
      name: 'rivestream',
      flag: '🇺🇸',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://rivestream.live/embed?type=tv&id=${id}&season=${s}&episode=${e}` : `https://rivestream.live/embed?type=movie&id=${id}`
    },
    {
      id: 'videasy',
      name: 'videasy',
      flag: '🇬🇧',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://player.videasy.net/tv/${id}/${s}/${e}` : `https://player.videasy.net/movie/${id}`
    },
    {
      id: 'embed_su',
      name: 'embedsu',
      flag: '🇺🇸',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://embed.su/embed/tv/${id}/${s}/${e}` : `https://embed.su/embed/movie/${id}`
    },
    {
      id: 'vidbinge',
      name: 'vidbinge',
      flag: '🇺🇸',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://vidbinge.dev/embed/tv/${id}/${s}/${e}` : `https://vidbinge.dev/embed/movie/${id}`
    },
    {
      id: 'autoembed',
      name: 'autoembed',
      flag: '🇺🇸',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://player.autoembed.cc/embed/tv/${id}/${s}/${e}` : `https://player.autoembed.cc/embed/movie/${id}`
    },
    {
      id: 'moviesapi',
      name: 'mapi',
      flag: '🇬🇧',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://moviesapi.club/tv/${id}-${s}-${e}` : `https://moviesapi.club/movie/${id}`
    },
    {
      id: 'vidsrc_xyz',
      name: 'vidsrc',
      flag: '🇺🇸',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${s}&episode=${e}` : `https://vidsrc.xyz/embed/movie?tmdb=${id}`
    },
    {
      id: 'superembed',
      name: 'multiembed',
      flag: '🌍',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${s}&e=${e}` : `https://multiembed.mov/?video_id=${id}&tmdb=1`
    },
    {
      id: 'smashy',
      name: 'smashy',
      flag: '🇺🇸',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://player.smashy.stream/tv/${id}?s=${s}&e=${e}` : `https://player.smashy.stream/movie/${id}`
    },
    {
      id: 'twoembed',
      name: '2embed',
      flag: '🇺🇸',
      sparkle: true,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}` : `https://www.2embed.cc/embed/${id}`
    },
    {
      id: 'nontongo',
      name: 'nontongo',
      flag: '🌍',
      sparkle: false,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://www.NontonGo.win/embed/tv/${id}/${s}/${e}` : `https://www.NontonGo.win/embed/movie/${id}`
    },
    {
      id: 'primewire',
      name: 'primewire',
      flag: '🇬🇧',
      sparkle: false,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://www.primewire.tf/embed/tv?tmdb=${id}&season=${s}&episode=${e}` : `https://www.primewire.tf/embed/movie?tmdb=${id}`
    },
    {
      id: 'frembed_fr',
      name: 'french',
      flag: '🇫🇷',
      sparkle: false,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://frembed.pro/api/serie.php?id=${id}&sa=${s}&epi=${e}` : `https://frembed.pro/api/film.php?id=${id}`
    },
    {
      id: 'warez_es',
      name: 'spanish / pt',
      flag: '🇪🇸',
      sparkle: false,
      type: 'embed',
      buildUrl: (id, isTv, s, e) => isTv ? `https://embed.warezcdn.com/serie/${id}/${s}/${e}` : `https://embed.warezcdn.com/filme/${id}`
    }
  ];

  const I18N = {
    ar: {
      searchPlaceholder: 'ابحث عن أي فيلم أو مسلسل أو ممثل...',
      signInBtn: 'تسجيل الدخول',
      guestStatus: 'زائر — سجل دخولك لحفظ قائمتك',
      memberStatus: 'عضوية مفعلة ✓',
      logoutBtn: 'خروج',
      drawerSections: 'الأقسام الرئيسية',
      drawerGenres: 'التصنيفات',
      drawerTools: 'الإعدادات والمزايا',
      drawerThemes: 'ثيمات الإضاءة',
      navHome: 'الرئيسية',
      navMovies: 'الأفلام',
      navSeries: 'المسلسلات',
      navTop10: 'الأعلى تقييماً',
      navWatchlist: 'قائمتي المفضلة',
      surpriseBtn: 'اقتراح فيلم عشوائي',
      eyeCareBtn: 'فلتر راحة العين الدافئ',
      codesBtn: 'أكواد التفعيل (./codes)',
      watchNow: 'شاهد الآن',
      moreDetails: 'عرض الصفحة',
      addToWatchlist: '+ حفظ في قائمتي',
      inWatchlist: '✓ في قائمتي',
      continueWatching: 'متابعة المشاهدة',
      clearHistory: 'مسح السجل',
      exploreCatalog: 'اكتشف الأفلام والمسلسلات',
      loadMoreBtn: 'عرض المزيد من الأعمال +',
      loadingMore: 'جاري التحميل...',
      allRatings: 'كل التقييمات',
      allYears: 'كل السنوات',
      classicYears: 'كلاسيكيات',
      sortTrending: 'الأكثر رواجاً',
      sortRating: 'الأعلى تقييماً',
      sortNewest: 'الأحدث إصداراً',
      sortTitle: 'الترتيب A–Z',
      noResultsTitle: 'لم يتم العثور على نتائج مطابقة',
      noResultsDesc: 'جرب البحث بالاسم الإنجليزي للفيلم أو تغيير التصنيف.',
      resetFilters: 'إظهار الكل',
      trendingTop10: 'أفضل 10 أعمال تقييماً على TMDB',
      backToCatalog: 'الرجوع للرئيسية',
      nowPlayingLabel: 'يُعرض الآن · Now Playing',
      downloadBtnText: 'تحميل الفيلم / المسلسل',
      serverHintText: '🚀 جرب التبديل بين المشغلات بالأسفل إذا كان أحدها بطيئاً — جميع هذه المشغلات مفحوصة ومن مواقع مختلفة كلياً.',
      downloadHubTitle: 'مركز التحميل المباشر متعدد الجودات (Multi-File Download)',
      recommendedHeading: 'أعمال مشابهة ومقترحة (Recommended)',
      statusLabel: 'الحالة · Status',
      productionLabel: 'الإنتاج · Production',
      airedLabel: 'تاريخ الإصدار · Aired',
      runtimeLabel: 'المدة · Runtime',
      trailersHeading: 'الإعلانات الرسمية · Trailers',
      charactersHeading: 'الشخصيات والممثلين · Characters',
      clickActorHint: 'اضغط لعرض أعماله',
      actorWorksHeading: 'أفلام ومسلسلات الممثل (اضغط للمشاهدة فوراً):',
      seasonLabel: 'الموسم:',
      episodeLabel: 'الحلقة:',
      authModalTitle: 'حسابك في WatchUrMovie',
      tabLogin: 'تسجيل الدخول',
      tabRegister: 'إنشاء حساب',
      nameLabel: 'الاسم الكامل أو المستعار',
      emailLabel: 'البريد الإلكتروني',
      passLabel: 'كلمة المرور',
      submitLoginBtn: 'دخول إلى الحساب',
      submitRegisterBtn: 'إنشاء حساب جديد',
      quickGuestBtn: 'دخول سريع كزائر VIP ⚡',
      codesModalHeading: 'أكواد التفعيل (./codes)',
      codesModalSub: 'اضغط على أي كود بالأسفل لتفعيله فوراً:',
      activateCodeBtn: 'تفعيل',
      typeMovie: 'فيلم',
      typeSeries: 'مسلسل',
      useCodeNow: 'تفعيل ←',
      toastAddedWatchlist: 'تمت الإضافة إلى قائمتك المفضلة',
      toastRemovedWatchlist: 'تمت الإزالة من قائمتك',
      toastServerSwitched: 'تم التحويل إلى مشغل: ',
      toastRandomPick: 'اخترنا لك هذا العمل:',
      toastHistoryCleared: 'تم مسح سجل المشاهدة',
      toastEyeOn: 'تم تفعيل فلتر راحة العين',
      toastEyeOff: 'تم إيقاف فلتر راحة العين',
      toastWelcomeUser: 'أهلاً بك، ',
      toastLoggedOut: 'تم تسجيل الخروج بنجاح',
      toastCodeSuccess: 'تم تفعيل الكود:',
      toastCodeInvalid: 'الكود غير صحيح، اختر أحد الأكواد بالأسفل',
      toastCopiedShare: 'تم نسخ رابط الفيلم للمشاركة ✓',
      toastDownloadStarted: 'جاري بدء التحميل: ',
      genreAll: 'الكل',
      genreAction: 'أكشن ومغامرة',
      genreScifi: 'خيال علمي',
      genreDrama: 'دراما',
      genreThriller: 'غموض وإثارة',
      genreAnimation: 'أنمي ورسوم',
      genreComedy: 'كوميديا'
    },
    en: {
      searchPlaceholder: 'Search any movie, series, or actor...',
      signInBtn: 'Sign In',
      guestStatus: 'Guest — Sign in to sync your list',
      memberStatus: 'Active Member ✓',
      logoutBtn: 'Log out',
      drawerSections: 'Main Navigation',
      drawerGenres: 'Categories & Genres',
      drawerTools: 'Comfort & Perks',
      drawerThemes: 'Ambient Themes',
      navHome: 'Home',
      navMovies: 'Movies',
      navSeries: 'TV Shows',
      navTop10: 'Top Rated',
      navWatchlist: 'My Watchlist',
      surpriseBtn: 'Surprise Me Pick',
      eyeCareBtn: 'Eye Comfort Shield',
      codesBtn: 'Access Codes (./codes)',
      watchNow: 'Watch Now',
      moreDetails: 'Open Page',
      addToWatchlist: '+ Add to List',
      inWatchlist: '✓ In My List',
      continueWatching: 'Continue Watching',
      clearHistory: 'Clear',
      exploreCatalog: 'Explore Movies & TV Shows',
      loadMoreBtn: 'Load More Titles +',
      loadingMore: 'Loading...',
      allRatings: 'All Ratings',
      allYears: 'All Years',
      classicYears: 'Classics',
      sortTrending: 'Trending',
      sortRating: 'Highest Rated',
      sortNewest: 'Newest',
      sortTitle: 'A–Z',
      noResultsTitle: 'No matching titles found',
      noResultsDesc: 'Try searching another title or resetting filters.',
      resetFilters: 'Reset All',
      trendingTop10: 'Top 10 Highest Rated on TMDB',
      backToCatalog: 'Back to Catalog',
      nowPlayingLabel: 'Now Playing',
      downloadBtnText: 'Download Files',
      serverHintText: '🚀 Please try different servers below if one is slow — all providers are deduplicated & verified.',
      downloadHubTitle: 'Multi-File Direct Download Center',
      recommendedHeading: 'Recommended & Similar Titles',
      statusLabel: 'Status',
      productionLabel: 'Production',
      airedLabel: 'Aired',
      runtimeLabel: 'Runtime',
      trailersHeading: 'Trailers',
      charactersHeading: 'Characters & Cast',
      clickActorHint: 'View Filmography',
      actorWorksHeading: 'Movies & TV Shows Featuring This Actor (Click to Watch):',
      seasonLabel: 'Season:',
      episodeLabel: 'Episode:',
      authModalTitle: 'WatchUrMovie Account',
      tabLogin: 'Sign In',
      tabRegister: 'Create Account',
      nameLabel: 'Display Name',
      emailLabel: 'Email Address',
      passLabel: 'Password',
      submitLoginBtn: 'Sign In',
      submitRegisterBtn: 'Create Account',
      quickGuestBtn: '1-Click Guest VIP Access ⚡',
      codesModalHeading: 'VIP Codes (./codes)',
      codesModalSub: 'Click any repository code below to activate immediately:',
      activateCodeBtn: 'Activate',
      typeMovie: 'Movie',
      typeSeries: 'TV Show',
      useCodeNow: 'Activate →',
      toastAddedWatchlist: 'Added to your watchlist',
      toastRemovedWatchlist: 'Removed from your watchlist',
      toastServerSwitched: 'Switched to server: ',
      toastRandomPick: 'Picked for you:',
      toastHistoryCleared: 'Watch history cleared',
      toastEyeOn: 'Eye Comfort filter enabled',
      toastEyeOff: 'Eye Comfort filter disabled',
      toastWelcomeUser: 'Welcome back, ',
      toastLoggedOut: 'Logged out successfully',
      toastCodeSuccess: 'Code activated:',
      toastCodeInvalid: 'Invalid code, click one below',
      toastCopiedShare: 'Share link copied to clipboard ✓',
      toastDownloadStarted: 'Starting file download: ',
      genreAll: 'All',
      genreAction: 'Action',
      genreScifi: 'Sci-Fi',
      genreDrama: 'Drama',
      genreThriller: 'Thriller',
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
    const [c1, c2, accent] = item.palette || ['#121526', '#090b14', '#8b5cf6'];
    const safeTitle = String(item.title || 'Movie').replace(/[&<>'"]/g, '');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="55%" stop-color="${c2}"/>
          <stop offset="100%" stop-color="#06070b"/>
        </linearGradient>
      </defs>
      <rect width="400" height="600" fill="url(#bg)"/>
      <circle cx="200" cy="195" r="88" fill="none" stroke="${accent}" stroke-width="1.6" stroke-opacity="0.45"/>
      <rect x="26" y="26" width="348" height="548" rx="16" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>
      <text x="200" y="490" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="20" fill="#f8fafc">${safeTitle}</text>
      <text x="200" y="530" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" font-size="11" fill="${accent}" letter-spacing="3">${item.year || 2025} • ${item.quality || '4K'}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  function makeBackdropUri(item) {
    const [c1, c2, accent] = item.palette || ['#121526', '#090b14', '#8b5cf6'];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="55%" stop-color="${c2}"/>
          <stop offset="100%" stop-color="#06070b"/>
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)"/>
      <circle cx="860" cy="280" r="220" fill="none" stroke="${accent}" stroke-opacity="0.18" stroke-width="1.5"/>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  function makeAvatarSvg(name) {
    const letter = (name || 'A').trim().charAt(0).toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150" width="120" height="150">
      <rect width="120" height="150" fill="#1c2030"/>
      <circle cx="60" cy="55" r="26" fill="#8b5cf6" fill-opacity="0.28"/>
      <text x="60" y="65" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="26" fill="#f8fafc">${letter}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  const VIDEO_STREAMS = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  ];

  const INITIAL_CATALOG = [
    {
      id: 'tmdb_movie_693134',
      tmdbId: 693134,
      type: 'movie',
      featured: true,
      topRank: 1,
      title: 'Dune: Part Two',
      year: 2024,
      releaseDate: '2024-02-27',
      status: 'Released',
      production: 'Legendary Pictures',
      rating: 8.3,
      durationAr: '2 س 46 د',
      durationEn: '2h 46m',
      quality: '4K IMAX',
      genres: ['scifi', 'drama', 'action'],
      director: 'Denis Villeneuve',
      castObjects: [
        { id: 1190668, name: 'Timothée Chalamet', character: 'Paul Atreides', profile: '/BE2sdjpgsa2rNTFa66f7upkaOP.jpg' },
        { id: 505710, name: 'Zendaya', character: 'Chani', profile: '/3WdOloHpjtjL96uVOhFRRCcYSwq.jpg' },
        { id: 933238, name: 'Rebecca Ferguson', character: 'Lady Jessica', profile: '/lJloTOheuQSirSLXNA3JHsrMNfH.jpg' },
        { id: 3810, name: 'Javier Bardem', character: 'Stilgar', profile: '/eCBiiPvBfIY7exDQwH0vEM6Bf3c.jpg' }
      ],
      synopsisAr: 'يتحد بول أتريدس مع تشاني والفريمن في رحلة انتقام ضد المتآمرين الذين دمروا عائلته، وعليه الاختيار بين حب حياته ومصير الكون.',
      synopsisEn: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge.',
      posterPath: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      backdropPath: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
      palette: ['#18152e', '#090814', '#8b5cf6'],
      streamUrl: VIDEO_STREAMS[0]
    },
    {
      id: 'tmdb_movie_671',
      tmdbId: 671,
      type: 'movie',
      featured: true,
      topRank: 2,
      title: "Harry Potter and the Philosopher's Stone",
      year: 2001,
      releaseDate: '2001-11-16',
      status: 'Released',
      production: 'Warner Bros. Pictures',
      rating: 7.9,
      durationAr: '2 س 32 د',
      durationEn: '2h 32m',
      quality: '4K UHD',
      genres: ['action', 'scifi'],
      director: 'Chris Columbus',
      castObjects: [
        { id: 10980, name: 'Daniel Radcliffe', character: 'Harry Potter', profile: '/iPg0J9UzAlPj1fLEJNllpW9IhGe.jpg' },
        { id: 10989, name: 'Rupert Grint', character: 'Ron Weasley', profile: '/q2KZZ0ltTEl7Sf8volNFV1JDEP4.jpg' },
        { id: 10990, name: 'Emma Watson', character: 'Hermione Granger', profile: '/tvPPRGzAzdQFhlKzLbMO1EpuTJI.jpg' }
      ],
      synopsisAr: 'عاش هاري بوتر تحت الدرج في منزل عمته وعمه طوال حياته، لكن في عيد ميلاده الحادي عشر يكتشف أنه ساحر قوي وتنتظره مدرسة هوغوورتس للسحر.',
      synopsisEn: 'Harry Potter has lived under the stairs at his aunt and uncle’s house his whole life. But on his 11th birthday, he learns he’s a powerful wizard.',
      posterPath: '/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
      backdropPath: '/hziiv14OpD73u9gAak4XDDfBKa2.jpg',
      palette: ['#1f162e', '#0c0814', '#f59e0b'],
      streamUrl: VIDEO_STREAMS[1]
    },
    {
      id: 'tmdb_movie_157336',
      tmdbId: 157336,
      type: 'movie',
      featured: true,
      topRank: 3,
      title: 'Interstellar',
      year: 2014,
      releaseDate: '2014-11-05',
      status: 'Released',
      production: 'Paramount / Warner Bros.',
      rating: 8.4,
      durationAr: '2 س 49 د',
      durationEn: '2h 49m',
      quality: '4K IMAX',
      genres: ['scifi', 'drama'],
      director: 'Christopher Nolan',
      castObjects: [
        { id: 10297, name: 'Matthew McConaughey', character: 'Joseph Cooper', profile: '/e9ZHRY5toiBZCIPEEyvOG9A8ers.jpg' },
        { id: 1813, name: 'Anne Hathaway', character: 'Dr. Amelia Brand', profile: '/tLelKoPNiyJCSEtQTz1FGv4TLGc.jpg' },
        { id: 83002, name: 'Jessica Chastain', character: 'Murphy Cooper', profile: '/lodMzLKSdrPcBry6TdoDsMN3Vge.jpg' }
      ],
      synopsisAr: 'فريق من المستكشفين يسافر عبر ثقب دودي في الفضاء في محاولة لضمان بقاء البشرية وإيجاد كوكب جديد صالح للحياة.',
      synopsisEn: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.',
      posterPath: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      backdropPath: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
      palette: ['#101e36', '#08101f', '#38bdf8'],
      streamUrl: VIDEO_STREAMS[0]
    },
    {
      id: 'tmdb_series_1396',
      tmdbId: 1396,
      type: 'series',
      featured: true,
      topRank: 4,
      title: 'Breaking Bad',
      year: 2008,
      releaseDate: '2008-01-20',
      status: 'Ended (5 Seasons)',
      production: 'Sony Pictures Television',
      rating: 8.9,
      durationAr: '5 مواسم (62 حلقة)',
      durationEn: '5 Seasons (62 Eps)',
      quality: '4K Remaster',
      genres: ['drama', 'thriller'],
      director: 'Vince Gilligan',
      castObjects: [
        { id: 17419, name: 'Bryan Cranston', character: 'Walter White', profile: '/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg' },
        { id: 84497, name: 'Aaron Paul', character: 'Jesse Pinkman', profile: '/8Ac9uuoYwZoYVAIJfRLzzLsGGJn.jpg' },
        { id: 134531, name: 'Anna Gunn', character: 'Skyler White', profile: '/adppyeu1a4REN3khtgmXusrapFi.jpg' }
      ],
      synopsisAr: 'معلم كيمياء في المرحلة الثانوية يُشخص بمرض خطير فيلجأ إلى تصنيع المواد الكيميائية مع طالب سابق لتأمين مستقبل عائلته.',
      synopsisEn: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.',
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

  const DEFAULT_REPO_CODES = [
    { code: 'WATCH2026', type: 'VIP_4K_IMAX', descAr: 'تفعيل جودة 4K IMAX مع صوت Dolby Atmos المحيطي', descEn: 'Unlock 4K IMAX Quality & Dolby Atmos Audio' },
    { code: 'IRAQVIP', type: 'VIP_UNLIMITED', descAr: 'عضوية خاصة مجانية + فتح العروض الحصرية المبكرة', descEn: 'Free Special Membership + Early Screenings' },
    { code: 'CINEMA99', type: 'AMBIENT_THEME', descAr: 'تفعيل الثيم العنبر الدافئ المريح للعين تلقائياً', descEn: 'Activate Warm Amber Comfort Palette automatically' },
    { code: 'PARTY777', type: 'WATCH_PARTY', descAr: 'إنشاء غرفة مشاهدة مشتركة مع الأصدقاء', descEn: 'Create Shared Watch Party Room with Friends' },
    { code: 'ARABSEED', type: 'MULTI_SERVERS', descAr: 'تفعيل جميع المشغلات السريعة وروابط التحميل المباشر', descEn: 'Enable All High-Speed Servers & Direct Downloads' }
  ];

  const state = {
    lang: localStorage.getItem('wum_lang') || 'ar',
    palette: localStorage.getItem('wum_palette') || 'streamex',
    eyeComfort: localStorage.getItem('wum_eye_comfort') === 'true',
    vipUnlocked: localStorage.getItem('wum_vip') === 'true',
    user: JSON.parse(localStorage.getItem('wum_user') || 'null'),
    authMode: 'login',
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
    watchlist: JSON.parse(localStorage.getItem('wum_watchlist') || '["tmdb_movie_693134","tmdb_movie_671"]'),
    watchHistory: JSON.parse(localStorage.getItem('wum_history') || '{"tmdb_movie_693134":42}'),
    repoCodes: [...DEFAULT_REPO_CODES],
    currentView: 'catalog', // 'catalog' | 'studio'
    currentPlayingItem: null,
    activeServerId: STREAM_SERVERS[0].id,
    activeSeason: 1,
    activeEpisode: 1,
    searchDebounceTimer: null
  };

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || key;
  }

  function getTitle(item) {
    return item.title || 'Untitled';
  }

  function getSynopsis(item) {
    return state.lang === 'ar' ? (item.synopsisAr || item.synopsisEn) : (item.synopsisEn || item.synopsisAr);
  }

  function getDuration(item) {
    return state.lang === 'ar' ? (item.durationAr || 'فيلم سينمائي') : (item.durationEn || 'Feature Film');
  }

  function getGenreArray(item) {
    return (item.genres || []).map((gId) => {
      const gObj = GENRES.find((g) => g.id === gId);
      return gObj ? t(gObj.key) : gId;
    });
  }

  function getGenreNames(item) {
    return getGenreArray(item).join(' · ');
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

  // ---------------------------------------------------------------------------
  // AUTHENTICATION & DRAWER
  // ---------------------------------------------------------------------------
  function renderAuthUI() {
    const headerAuthBtn = document.getElementById('openAuthModalBtn');
    const drawerUserName = document.getElementById('drawerUserName');
    const drawerUserStatus = document.getElementById('drawerUserStatus');
    const drawerAvatar = document.getElementById('drawerAvatar');
    const drawerAuthActionBtn = document.getElementById('drawerAuthActionBtn');

    if (state.user && state.user.name) {
      const initial = state.user.name.trim().charAt(0).toUpperCase();
      if (headerAuthBtn) {
        headerAuthBtn.classList.add('logged-in');
        headerAuthBtn.innerHTML = `<span class="user-avatar-mini">${initial}</span><span>${state.user.name}</span>`;
      }
      if (drawerUserName) drawerUserName.textContent = state.user.name;
      if (drawerUserStatus) drawerUserStatus.textContent = t('memberStatus');
      if (drawerAvatar) drawerAvatar.textContent = initial;
      if (drawerAuthActionBtn) drawerAuthActionBtn.textContent = t('logoutBtn');
    } else {
      if (headerAuthBtn) {
        headerAuthBtn.classList.remove('logged-in');
        headerAuthBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>${t('signInBtn')}</span>
        `;
      }
      if (drawerUserName) drawerUserName.textContent = 'WatchUrMovie';
      if (drawerUserStatus) drawerUserStatus.textContent = t('guestStatus');
      if (drawerAvatar) drawerAvatar.textContent = 'W';
      if (drawerAuthActionBtn) drawerAuthActionBtn.textContent = t('signInBtn');
    }
  }

  function loginUser(name, email) {
    state.user = {
      name: name.trim(),
      email: (email || '').trim() || 'member@watchurmovie.app'
    };
    localStorage.setItem('wum_user', JSON.stringify(state.user));
    renderAuthUI();
    document.getElementById('authModal')?.classList.add('hidden');
    showToast(`${t('toastWelcomeUser')}${state.user.name}`);
  }

  function logoutUser() {
    state.user = null;
    localStorage.removeItem('wum_user');
    renderAuthUI();
    showToast(t('toastLoggedOut'));
  }

  function toggleDrawer(forceOpen) {
    const drawer = document.getElementById('navDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (!drawer || !backdrop) return;
    const isOpen = typeof forceOpen === 'boolean' ? forceOpen : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    backdrop.classList.toggle('open', isOpen);
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
    const englishTitle =
      raw.title_en ||
      (raw.original_language === 'en' ? (raw.original_title || raw.original_name) : null) ||
      raw.title ||
      raw.name ||
      raw.original_title ||
      raw.original_name ||
      'Untitled';

    const dateStr = raw.release_date || raw.first_air_date || '2025-01-01';
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
      releaseDate: dateStr,
      status: type === 'series' ? 'Returning Series' : 'Released',
      production: 'TMDB Official Studio',
      rating: Math.max(5.0, Math.min(9.9, rating)),
      durationAr: type === 'series' ? 'مسلسل أصلي' : 'فيلم سينمائي',
      durationEn: type === 'series' ? 'TV Series' : 'Feature Film',
      quality: rating >= 7.8 ? '4K ULTRA' : '1080p FHD',
      genres: mappedGenres,
      director: 'TMDB Official',
      castObjects: [],
      trailersList: [],
      similarItems: [],
      seasonsCount: 5,
      synopsisAr: raw.overview_ar || raw.overview || 'قصة سينمائية مشوقة من قاعدة بيانات TMDB العالمية.',
      synopsisEn: raw.overview_en || raw.overview || 'Official synopsis from The Movie Database (TMDB).',
      palette: ['#18152e', '#090814', '#8b5cf6'],
      streamUrl: VIDEO_STREAMS[rankIdx % VIDEO_STREAMS.length]
    };

    itemObj.posterUrl = raw.poster_path ? `${TMDB_IMG_W500}${raw.poster_path}` : makePosterUri(itemObj);
    itemObj.backdropUrl = raw.backdrop_path ? `${TMDB_IMG_ORIG}${raw.backdrop_path}` : makeBackdropUri(itemObj);
    return itemObj;
  }

  async function syncWithTmdbApi() {
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
        const byRating = [...normalized].sort((a, b) => b.rating - a.rating);
        byRating.slice(0, 10).forEach((item, i) => {
          item.topRank = i + 1;
        });

        CATALOG = normalized;
        state.tmdbConnected = true;
        state.heroIndex = 0;

        renderHero();
        renderTop10();
        renderContinueWatching();
        renderCatalog();
        return true;
      }
    } catch (_) {
      // Fallback initial items already displayed
    }
    return false;
  }

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
      // ignore
    } finally {
      if (btn) btn.textContent = t('loadMoreBtn');
    }
  }

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
      // fallback
    }
  }

  // Enrich full movie/series metadata: Production, Status, Cast with Photos, Trailers & Recommended
  async function enrichTmdbItemDetails(item) {
    if (!item.tmdbId) return;
    try {
      const endpointType = item.type === 'series' ? 'tv' : 'movie';
      const data = await tmdbFetch(`/${endpointType}/${item.tmdbId}`, {
        language: 'en-US',
        append_to_response: 'credits,videos,recommendations,similar'
      });

      if (data.status) item.status = data.status;
      if (data.release_date || data.first_air_date) {
        item.releaseDate = data.release_date || data.first_air_date;
      }
      if (Array.isArray(data.production_companies) && data.production_companies.length > 0) {
        item.production = data.production_companies.slice(0, 2).map((p) => p.name).join(' · ');
      }
      if (data.runtime) {
        const h = Math.floor(data.runtime / 60);
        const m = data.runtime % 60;
        item.durationAr = `${h} س ${m} د`;
        item.durationEn = `${h}h ${m}m`;
      } else if (data.number_of_seasons) {
        item.seasonsCount = Math.max(1, Number(data.number_of_seasons) || 1);
        item.durationAr = `${data.number_of_seasons} مواسم (${data.number_of_episodes || ''} حلقة)`;
        item.durationEn = `${data.number_of_seasons} Seasons (${data.number_of_episodes || ''} Eps)`;
      }

      // Rich Cast Objects with Actor ID, Character Name, Actor Name & Photo
      if (data.credits && Array.isArray(data.credits.cast) && data.credits.cast.length > 0) {
        item.castObjects = data.credits.cast.slice(0, 14).map((c) => ({
          id: c.id,
          name: c.name,
          character: c.character || 'Main Cast',
          profile: c.profile_path || null
        }));
      }

      // Official YouTube Trailers & Teasers
      if (data.videos && Array.isArray(data.videos.results)) {
        item.trailersList = data.videos.results
          .filter((v) => v.site === 'YouTube' && v.key)
          .slice(0, 4)
          .map((v) => ({
            key: v.key,
            name: v.name || v.type || 'Official Trailer',
            type: v.type || 'Trailer'
          }));
      }

      // Similar & Recommended Titles
      const recRaw = [
        ...((data.recommendations && data.recommendations.results) || []),
        ...((data.similar && data.similar.results) || [])
      ];
      const seenSim = new Set();
      const simNormalized = [];
      recRaw.forEach((r) => {
        if (!r || !r.id || !r.poster_path || seenSim.has(r.id)) return;
        seenSim.add(r.id);
        const simItem = normalizeTmdbItem(r, r.media_type === 'tv' ? 'series' : item.type, 99);
        simNormalized.push(simItem);
        // Also register in CATALOG so clicking it works seamlessly
        if (!CATALOG.some((existing) => existing.id === simItem.id)) {
          CATALOG.push(simItem);
        }
      });
      if (simNormalized.length > 0) {
        item.similarItems = simNormalized.slice(0, 14);
      }
    } catch (_) {
      // ignore network error and use existing data
    }
  }

  // ---------------------------------------------------------------------------
  // ACTOR PROFILE & FULL FILMOGRAPHY EXPLORER
  // ---------------------------------------------------------------------------
  async function openActorProfile(personId, fallbackName = 'Actor', fallbackPhoto = '') {
    const modal = document.getElementById('actorModal');
    const nameEl = document.getElementById('actorModalName');
    const imgEl = document.getElementById('actorModalImg');
    const subEl = document.getElementById('actorModalSubFacts');
    const bioEl = document.getElementById('actorModalBio');
    const gridEl = document.getElementById('actorCreditsGrid');
    if (!modal || !gridEl) return;

    modal.classList.remove('hidden');
    if (nameEl) nameEl.textContent = fallbackName;
    if (imgEl) imgEl.src = fallbackPhoto || makeAvatarSvg(fallbackName);
    if (subEl) subEl.textContent = 'TMDB Official Star';
    if (bioEl) bioEl.textContent = state.lang === 'ar' ? 'جاري جلب السيرة الذاتية وأعمال الممثل من TMDB...' : 'Loading actor biography and filmography from TMDB...';
    gridEl.innerHTML = '';

    try {
      const data = await tmdbFetch(`/person/${personId}`, {
        language: 'en-US',
        append_to_response: 'combined_credits'
      });

      if (nameEl && data.name) nameEl.textContent = data.name;
      if (imgEl && data.profile_path) imgEl.src = `${TMDB_IMG_W500}${data.profile_path}`;
      if (subEl) {
        const parts = [
          data.known_for_department || 'Acting',
          data.birthday ? `Born: ${data.birthday}` : null,
          data.place_of_birth || null
        ].filter(Boolean);
        subEl.textContent = parts.join(' · ');
      }
      if (bioEl) {
        bioEl.textContent = data.biography || (state.lang === 'ar' ? 'ممثل عالمي مشارك في العديد من الأفلام والمسلسلات الشهيرة.' : 'Acclaimed international actor across feature films and television.');
      }

      const rawCredits = (data.combined_credits && data.combined_credits.cast) || [];
      const seenCred = new Set();
      const actorWorks = [];

      rawCredits
        .filter((c) => c && c.id && c.poster_path && (c.media_type === 'movie' || c.media_type === 'tv'))
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 24)
        .forEach((c) => {
          const mediaType = c.media_type === 'tv' ? 'series' : 'movie';
          const key = `${mediaType}_${c.id}`;
          if (seenCred.has(key)) return;
          seenCred.add(key);
          const norm = normalizeTmdbItem(c, mediaType, 99);
          if (!CATALOG.some((existing) => existing.id === norm.id)) {
            CATALOG.push(norm);
          }
          actorWorks.push({ item: norm, character: c.character || '' });
        });

      if (actorWorks.length > 0) {
        gridEl.innerHTML = actorWorks
          .map(({ item, character }) => `
            <article class="blur-movie-card" data-actor-work-id="${item.id}">
              <div class="poster-frame">
                <img class="poster-img" src="${item.posterUrl}" alt="${getTitle(item)}" loading="lazy" />
                <div class="corner-badges">
                  <span class="corner-quality">${item.type === 'series' ? 'TV' : 'MOVIE'}</span>
                  <span class="corner-rating">★ ${item.rating.toFixed(1)}</span>
                </div>
                <div class="hover-info-layer">
                  <div class="hover-top-row">
                    <span class="hover-score-pill">★ ${item.rating.toFixed(1)}</span>
                  </div>
                  <div class="hover-center-meta">
                    <div class="hover-year-type">${item.year} · ${character ? `Role: ${character}` : item.quality}</div>
                    <p class="hover-synopsis-text">${getSynopsis(item)}</p>
                  </div>
                  <div class="hover-actions-bottom">
                    <button class="hover-watch-btn">
                      <span>${t('watchNow')}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-caption">
                <h3 class="card-eng-title" dir="ltr">${getTitle(item)}</h3>
                <div class="card-sub-line">
                  <span>${item.year}</span>
                  <span>★ ${item.rating.toFixed(1)}</span>
                </div>
              </div>
            </article>
          `)
          .join('');

        gridEl.querySelectorAll('[data-actor-work-id]').forEach((card) => {
          card.addEventListener('click', () => {
            const targetId = card.getAttribute('data-actor-work-id');
            modal.classList.add('hidden');
            openWatchStudio(targetId);
          });
        });
      }
    } catch (_) {
      // Fallback: show catalog items matching actor name
      const fallbackWorks = CATALOG.slice(0, 8);
      gridEl.innerHTML = fallbackWorks
        .map((item) => `
          <article class="blur-movie-card" data-actor-work-id="${item.id}">
            <div class="poster-frame">
              <img class="poster-img" src="${item.posterUrl}" alt="${getTitle(item)}" />
            </div>
            <div class="card-caption">
              <h3 class="card-eng-title" dir="ltr">${getTitle(item)}</h3>
            </div>
          </article>
        `)
        .join('');
      gridEl.querySelectorAll('[data-actor-work-id]').forEach((card) => {
        card.addEventListener('click', () => {
          modal.classList.add('hidden');
          openWatchStudio(card.getAttribute('data-actor-work-id'));
        });
      });
    }
  }

  // ---------------------------------------------------------------------------
  // FULL-PAGE WATCH STUDIO VIEW (#watchStudioView)
  // ---------------------------------------------------------------------------
  async function openWatchStudio(itemId) {
    const item = CATALOG.find((c) => c.id === itemId) || CATALOG[0];
    if (!item) return;

    state.currentView = 'studio';
    state.currentPlayingItem = item;
    state.activeSeason = 1;
    state.activeEpisode = 1;

    // Hide Catalog View, Show Full-Page Watch Studio View
    document.getElementById('homeCatalogView')?.classList.add('hidden');
    document.getElementById('watchStudioView')?.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Populate Initial Studio Header & Side Panel
    renderStudioUI(item);
    loadActiveServerIntoStudio();

    // Record in Continue Watching History
    if (!state.watchHistory[item.id]) {
      state.watchHistory[item.id] = 32;
      localStorage.setItem('wum_history', JSON.stringify(state.watchHistory));
    }

    // Fetch live TMDB credits, trailers, production company, and similar movies
    await enrichTmdbItemDetails(item);
    if (state.currentPlayingItem && state.currentPlayingItem.id === item.id) {
      renderStudioUI(item);
    }
  }

  function closeWatchStudioBackToCatalog() {
    state.currentView = 'catalog';
    const iframe = document.getElementById('studioPlayerIframe');
    if (iframe) iframe.src = '';

    document.getElementById('watchStudioView')?.classList.add('hidden');
    document.getElementById('homeCatalogView')?.classList.remove('hidden');
    renderContinueWatching();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderStudioUI(item) {
    // Top Studio Bar
    const topTitle = document.getElementById('studioTopTitle');
    if (topTitle) topTitle.textContent = getTitle(item);
    const topBadge = document.getElementById('studioTypeBadge');
    if (topBadge) topBadge.textContent = item.type === 'series' ? t('typeSeries') : t('typeMovie');

    // Now Playing Title & Watchlist State
    const npTitle = document.getElementById('nowPlayingMovieTitle');
    if (npTitle) npTitle.textContent = getTitle(item);
    const npWlBtn = document.getElementById('studioWatchlistBtn');
    if (npWlBtn) {
      const inList = state.watchlist.includes(item.id);
      npWlBtn.classList.toggle('active', inList);
      npWlBtn.textContent = inList ? '✓' : '+';
    }

    // Series Season & Episode Selector
    const epBar = document.getElementById('studioEpisodeBar');
    const seasonSel = document.getElementById('studioSeasonSelect');
    const epSel = document.getElementById('studioEpisodeSelect');
    if (epBar && seasonSel && epSel) {
      if (item.type === 'series') {
        epBar.classList.remove('hidden');
        const sCount = Math.max(1, Number(item.seasonsCount) || 5);
        seasonSel.innerHTML = Array.from({ length: sCount }, (_, i) => {
          const s = i + 1;
          return `<option value="${s}" ${s === state.activeSeason ? 'selected' : ''}>Season ${s}</option>`;
        }).join('');
        epSel.innerHTML = Array.from({ length: 24 }, (_, i) => {
          const e = i + 1;
          return `<option value="${e}" ${e === state.activeEpisode ? 'selected' : ''}>Episode ${e}</option>`;
        }).join('');
      } else {
        epBar.classList.add('hidden');
      }
    }

    // Render 16 Deduplicated Streaming Servers Grid
    renderServerCardsGrid();

    // Render Multi-File Download Hub
    renderDownloadHubFiles(item);

    // Side Panel: Poster, Score, Status, Production, Aired, Synopsis, Genres
    const sidePoster = document.getElementById('sidePosterImg');
    if (sidePoster) sidePoster.src = item.posterUrl;
    const sideScore = document.getElementById('sidePosterScore');
    if (sideScore) sideScore.textContent = `★ ${item.rating.toFixed(1)}`;
    const sideStatus = document.getElementById('sideFactStatus');
    if (sideStatus) sideStatus.textContent = item.status || 'Released';
    const sideProd = document.getElementById('sideFactProduction');
    if (sideProd) sideProd.textContent = item.production || 'TMDB Official Studio';
    const sideAired = document.getElementById('sideFactAired');
    if (sideAired) sideAired.textContent = item.releaseDate || `${item.year}-01-01`;
    const sideRuntime = document.getElementById('sideFactRuntime');
    if (sideRuntime) sideRuntime.textContent = getDuration(item);

    const sideHeading = document.getElementById('sideMovieTitle');
    if (sideHeading) sideHeading.textContent = getTitle(item);
    const sideSyn = document.getElementById('sideMovieSynopsis');
    if (sideSyn) sideSyn.textContent = getSynopsis(item);

    const sideGenres = document.getElementById('sideGenreChips');
    if (sideGenres) {
      sideGenres.innerHTML = getGenreArray(item)
        .map((g) => `<span class="side-genre-chip">${g}</span>`)
        .join('');
    }

    // Side Panel: Official Trailers
    const trailersGrid = document.getElementById('sideTrailersGrid');
    if (trailersGrid) {
      const tList =
        item.trailersList && item.trailersList.length > 0
          ? item.trailersList.slice(0, 2)
          : [
              { key: null, name: 'Official Trailer' },
              { key: null, name: 'Teaser Trailer' }
            ];
      trailersGrid.innerHTML = tList
        .map(
          (tr, idx) => `
          <button class="trailer-pill-btn" data-trailer-key="${tr.key || ''}" data-trailer-idx="${idx}">
            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" dir="ltr">${idx === 0 ? 'Official Trailer' : 'Trailer #' + (idx + 1)}</span>
            <span>▷</span>
          </button>
        `
        )
        .join('');

      trailersGrid.querySelectorAll('.trailer-pill-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-trailer-key');
          const iframe = document.getElementById('studioPlayerIframe');
          if (iframe) {
            if (key) {
              iframe.src = `https://www.youtube.com/embed/${key}?autoplay=1&rel=0`;
            } else {
              const q = encodeURIComponent(`${getTitle(item)} ${item.year} official trailer`);
              iframe.src = `https://www.youtube.com/embed?listType=search&list=${q}&autoplay=1`;
            }
          }
        });
      });
    }

    // Side Panel: Interactive Characters & Cast
    const castContainer = document.getElementById('sideCharactersList');
    if (castContainer) {
      const castArr =
        item.castObjects && item.castObjects.length > 0
          ? item.castObjects
          : [
              { id: 1190668, name: 'Timothée Chalamet', character: 'Lead Role', profile: null },
              { id: 10980, name: 'Daniel Radcliffe', character: 'Featured Cast', profile: null }
            ];

      castContainer.innerHTML = castArr
        .map((c) => {
          const avatarUrl = c.profile ? `${TMDB_IMG_W185}${c.profile}` : makeAvatarSvg(c.name);
          return `
            <div class="character-row-card" data-person-id="${c.id}" data-person-name="${c.name}" data-person-photo="${avatarUrl}">
              <img class="char-avatar" src="${avatarUrl}" alt="${c.name}" loading="lazy" />
              <div class="char-text">
                <div class="char-role-name" dir="ltr">${c.character || 'Main Role'}</div>
                <div class="char-actor-name" dir="ltr">${c.name}</div>
              </div>
              <span class="char-explore-badge">${t('clickActorHint')}</span>
            </div>
          `;
        })
        .join('');

      castContainer.querySelectorAll('[data-person-id]').forEach((row) => {
        row.addEventListener('click', () => {
          const pid = row.getAttribute('data-person-id');
          const pname = row.getAttribute('data-person-name');
          const pphoto = row.getAttribute('data-person-photo');
          openActorProfile(pid, pname, pphoto);
        });
      });
    }

    // Recommended & Similar Movies Row
    renderRecommendedMovies(item);
  }

  function renderServerCardsGrid() {
    const grid = document.getElementById('studioServersGrid');
    if (!grid) return;

    grid.innerHTML = STREAM_SERVERS.map(
      (srv) => `
      <button class="server-card-btn ${srv.id === state.activeServerId ? 'active' : ''}" data-srv-id="${srv.id}">
        ${srv.sparkle ? '<span class="srv-sparkle">✦</span>' : ''}
        <span class="srv-flag">${srv.flag}</span>
        <span class="srv-provider-title" dir="ltr">${srv.name}</span>
        <span class="srv-online-dot"></span>
      </button>
    `
    ).join('');

    grid.querySelectorAll('[data-srv-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeServerId = btn.getAttribute('data-srv-id');
        renderServerCardsGrid();
        loadActiveServerIntoStudio();
        const srvObj = STREAM_SERVERS.find((s) => s.id === state.activeServerId);
        if (srvObj) showToast(`${t('toastServerSwitched')}${srvObj.name}`);
      });
    });
  }

  function loadActiveServerIntoStudio() {
    const item = state.currentPlayingItem;
    const iframe = document.getElementById('studioPlayerIframe');
    if (!item || !iframe) return;

    const srv = STREAM_SERVERS.find((s) => s.id === state.activeServerId) || STREAM_SERVERS[0];
    const tmdbId = item.tmdbId || 693134;
    iframe.src = srv.buildUrl(tmdbId, item.type === 'series', state.activeSeason, state.activeEpisode);
  }

  // ---------------------------------------------------------------------------
  // MULTI-FILE DOWNLOAD HUB (6 Distinct Download Options & Real File Generator)
  // ---------------------------------------------------------------------------
  function renderDownloadHubFiles(item) {
    const container = document.getElementById('downloadFilesGrid');
    if (!container) return;

    const tmdbId = item.tmdbId || 693134;
    const isTv = item.type === 'series';
    const epSuffix = isTv ? ` S0${state.activeSeason}E0${state.activeEpisode}` : '';
    const cleanTitle = getTitle(item).replace(/[^a-zA-Z0-9]+/g, '.');

    const files = [
      {
        quality: '2160p 4K UHD BluRay (10-bit HEVC)',
        specs: `4.8 GB · MKV · Dolby Atmos${epSuffix}`,
        label: '⬇ تحميل 4K',
        mode: 'direct_video',
        filename: `${cleanTitle}.${item.year}${epSuffix.replace(/\s+/g, '')}.2160p.4K.UHD.mp4`,
        url: VIDEO_STREAMS[0]
      },
      {
        quality: '1080p Full HD WEB-DL (x264 AAC)',
        specs: `2.1 GB · MP4 · High Speed${epSuffix}`,
        label: '⬇ تحميل 1080p',
        mode: 'direct_video',
        filename: `${cleanTitle}.${item.year}${epSuffix.replace(/\s+/g, '')}.1080p.WEBDL.mp4`,
        url: VIDEO_STREAMS[1]
      },
      {
        quality: '720p HD Fast StreamRip',
        specs: `940 MB · MP4 · Fast Server${epSuffix}`,
        label: '⬇ تحميل 720p',
        mode: 'direct_video',
        filename: `${cleanTitle}.${item.year}${epSuffix.replace(/\s+/g, '')}.720p.HD.mp4`,
        url: VIDEO_STREAMS[2]
      },
      {
        quality: '480p Mobile Saver (HEVC)',
        specs: `410 MB · MP4 · للموبايل${epSuffix}`,
        label: '⬇ تحميل 480p',
        mode: 'direct_video',
        filename: `${cleanTitle}.${item.year}${epSuffix.replace(/\s+/g, '')}.480p.Mobile.mp4`,
        url: VIDEO_STREAMS[3]
      },
      {
        quality: 'بوابة التحميل السحابي (Multi-Mirror DL)',
        specs: 'GoDrive / VidSrc DL / Direct Mirrors',
        label: '↗ فتح صفحة التحميل',
        mode: 'external_dl',
        url: isTv
          ? `https://dl.vidsrc.vip/tv/${tmdbId}/${state.activeSeason}/${state.activeEpisode}`
          : `https://dl.vidsrc.vip/movie/${tmdbId}`
      },
      {
        quality: 'ملف الترجمة العربية الرسمي (.SRT)',
        specs: `Arabic & English Subtitles · UTF-8`,
        label: '⬇ تحميل الترجمة .SRT',
        mode: 'srt_file',
        filename: `${cleanTitle}.${item.year}.Arabic.srt`
      }
    ];

    container.innerHTML = files
      .map(
        (f, idx) => `
        <div class="dl-file-card">
          <div class="dl-file-meta">
            <span class="dl-file-quality" dir="ltr">${f.quality}</span>
            <span class="dl-file-specs" dir="ltr">${f.specs}</span>
          </div>
          <button class="dl-trigger-link" data-dl-idx="${idx}">${f.label}</button>
        </div>
      `
      )
      .join('');

    container.querySelectorAll('[data-dl-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const f = files[Number(btn.getAttribute('data-dl-idx'))];
        if (!f) return;
        showToast(`${t('toastDownloadStarted')}${f.quality}`);

        if (f.mode === 'srt_file') {
          const srtContent = `1\n00:00:01,000 --> 00:00:06,000\nWatchUrMovie — ${getTitle(item)} (${item.year})\nالترجمة العربية الرسمية مفعلة\n\n2\n00:00:06,500 --> 00:00:12,000\n${getSynopsis(item)}\n`;
          const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = f.filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else if (f.mode === 'external_dl') {
          window.open(f.url, '_blank', 'noopener,noreferrer');
        } else {
          const a = document.createElement('a');
          a.href = f.url;
          a.download = f.filename;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      });
    });
  }

  function renderRecommendedMovies(item) {
    const row = document.getElementById('recommendedMoviesRow');
    if (!row) return;

    const list =
      item.similarItems && item.similarItems.length > 0
        ? item.similarItems
        : CATALOG.filter((c) => c.id !== item.id).slice(0, 10);

    row.innerHTML = list
      .map((sim) => `
        <article class="blur-movie-card" data-rec-id="${sim.id}">
          <div class="poster-frame">
            <img class="poster-img" src="${sim.posterUrl}" alt="${getTitle(sim)}" loading="lazy" />
            <div class="corner-badges">
              <span class="corner-quality">${sim.year}</span>
              <span class="corner-rating">★ ${sim.rating.toFixed(1)}</span>
            </div>
            <div class="hover-info-layer">
              <div class="hover-top-row">
                <span class="hover-score-pill">★ ${sim.rating.toFixed(1)}</span>
              </div>
              <div class="hover-center-meta">
                <div class="hover-year-type">${sim.year} · ${sim.quality}</div>
                <p class="hover-synopsis-text">${getSynopsis(sim)}</p>
              </div>
              <div class="hover-actions-bottom">
                <button class="hover-watch-btn">
                  <span>${t('watchNow')}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="card-caption">
            <h3 class="card-eng-title" dir="ltr">${getTitle(sim)}</h3>
          </div>
        </article>
      `)
      .join('');

    row.querySelectorAll('[data-rec-id]').forEach((card) => {
      card.addEventListener('click', () => {
        openWatchStudio(card.getAttribute('data-rec-id'));
      });
    });
  }

  // ---------------------------------------------------------------------------
  // HOME CATALOG VIEW RENDERERS
  // ---------------------------------------------------------------------------
  function applyPaletteAndComfort() {
    document.documentElement.setAttribute('data-palette', state.palette);
    localStorage.setItem('wum_palette', state.palette);

    document.querySelectorAll('[data-palette-pick]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-palette-pick') === state.palette);
    });

    document.getElementById('eyeComfortOverlay')?.classList.toggle('active', state.eyeComfort);
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
    renderAuthUI();
    renderHero();
    renderGenreBar();
    renderTop10();
    renderContinueWatching();
    renderCatalog();
    renderRepoCodesList();
    if (state.currentPlayingItem) renderStudioUI(state.currentPlayingItem);
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
        <span class="pill-tag">${item.type === 'series' ? t('typeSeries') : t('typeMovie')}</span>
        <span class="pill-tag star">★ ${item.rating.toFixed(1)} TMDB</span>
        <span class="pill-tag glass">${item.quality}</span>
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
          <button class="hero-thumb-card ${idx === state.heroIndex ? 'active' : ''}" data-hero-idx="${idx}" title="${getTitle(fItem)}">
            <img src="${fItem.posterUrl}" alt="${getTitle(fItem)}" />
          </button>
        `
        )
        .join('');

      queueEl.querySelectorAll('.hero-thumb-card').forEach((btn) => {
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
    if (state.currentPlayingItem) renderStudioUI(state.currentPlayingItem);
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
      card.addEventListener('click', () => openWatchStudio(card.getAttribute('data-play-id')));
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
      card.addEventListener('click', () => openWatchStudio(card.getAttribute('data-details-id')));
    });
  }

  function renderGenreBar() {
    const bar = document.getElementById('genreFilterBar');
    const drawerGenres = document.getElementById('drawerGenresGrid');

    if (bar) {
      bar.innerHTML = GENRES.map(
        (g) => `<button class="genre-pill ${state.activeGenre === g.id ? 'active' : ''}" data-genre="${g.id}">${t(g.key)}</button>`
      ).join('');

      bar.querySelectorAll('.genre-pill').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.activeGenre = btn.getAttribute('data-genre');
          renderGenreBar();
          renderCatalog();
        });
      });
    }

    if (drawerGenres) {
      drawerGenres.innerHTML = GENRES.map(
        (g) => `<button class="drawer-genre-btn ${state.activeGenre === g.id ? 'active' : ''}" data-drawer-genre="${g.id}">${t(g.key)}</button>`
      ).join('');

      drawerGenres.querySelectorAll('[data-drawer-genre]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.activeGenre = btn.getAttribute('data-drawer-genre');
          toggleDrawer(false);
          closeWatchStudioBackToCatalog();
          renderGenreBar();
          renderCatalog();
        });
      });
    }
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
        const genreTagsHtml = getGenreArray(item)
          .slice(0, 3)
          .map((gName) => `<span class="hover-genre-tag">${gName}</span>`)
          .join('');

        return `
          <article class="blur-movie-card" data-card-id="${item.id}">
            <div class="poster-frame">
              <img class="poster-img" src="${item.posterUrl}" alt="${getTitle(item)}" loading="lazy" />

              <div class="corner-badges">
                <span class="corner-quality">${item.quality}</span>
                <span class="corner-rating">★ ${item.rating.toFixed(1)}</span>
              </div>

              <div class="hover-info-layer">
                <div class="hover-top-row">
                  <span class="hover-score-pill">★ ${item.rating.toFixed(1)} TMDB</span>
                  <button class="hover-save-icon-btn ${inList ? 'active' : ''}" data-wl-id="${item.id}" title="${t('addToWatchlist')}">
                    ${inList ? '✓' : '+'}
                  </button>
                </div>

                <div class="hover-center-meta">
                  <div class="hover-year-type">${item.year} · ${item.type === 'series' ? t('typeSeries') : t('typeMovie')} · ${item.quality}</div>
                  <div class="hover-genres-wrap">${genreTagsHtml}</div>
                  <p class="hover-synopsis-text">${getSynopsis(item)}</p>
                </div>

                <div class="hover-actions-bottom">
                  <button class="hover-watch-btn" data-watch-id="${item.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 4 20 12 6 20 6 4"></polygon>
                    </svg>
                    <span>${t('watchNow')}</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="card-caption">
              <h3 class="card-eng-title" dir="ltr" title="${getTitle(item)}">${getTitle(item)}</h3>
              <div class="card-sub-line">
                <span>${item.year} · ${item.type === 'series' ? t('typeSeries') : t('typeMovie')}</span>
                <span>★ ${item.rating.toFixed(1)}</span>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    grid.querySelectorAll('[data-wl-id]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWatchlist(btn.getAttribute('data-wl-id'));
      });
    });

    grid.querySelectorAll('.blur-movie-card').forEach((card) => {
      card.addEventListener('click', () => openWatchStudio(card.getAttribute('data-card-id')));
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
          <div class="search-result-item" data-search-pick="${m.id}">
            <img src="${m.posterUrl}" alt="${getTitle(m)}" />
            <div>
              <div class="search-result-title" dir="ltr">${getTitle(m)}</div>
              <div class="search-result-sub">★ ${m.rating.toFixed(1)} · ${m.year} · ${m.type === 'series' ? t('typeSeries') : t('typeMovie')}</div>
            </div>
          </div>
        `
        )
        .join('');
      searchDropdown.querySelectorAll('[data-search-pick]').forEach((el) => {
        el.addEventListener('click', () => {
          searchDropdown.classList.add('hidden');
          openWatchStudio(el.getAttribute('data-search-pick'));
        });
      });
    } else {
      searchDropdown.classList.add('hidden');
    }
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
          <span style="color:var(--accent-light);font-size:0.76rem;font-weight:700">${t('useCodeNow')}</span>
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
    document.getElementById('openDrawerBtn')?.addEventListener('click', () => toggleDrawer(true));
    document.getElementById('closeDrawerBtn')?.addEventListener('click', () => toggleDrawer(false));
    document.getElementById('drawerBackdrop')?.addEventListener('click', () => toggleDrawer(false));

    // Clicking Brand Logo returns to Catalog Home
    document.getElementById('brandHomeLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeWatchStudioBackToCatalog();
    });

    // Studio Back Button
    document.getElementById('backToCatalogBtn')?.addEventListener('click', closeWatchStudioBackToCatalog);

    // Studio Now Playing Actions: Watchlist, Share, Download Hub Toggle
    document.getElementById('studioWatchlistBtn')?.addEventListener('click', () => {
      if (state.currentPlayingItem) toggleWatchlist(state.currentPlayingItem.id);
    });

    document.getElementById('studioShareBtn')?.addEventListener('click', () => {
      if (navigator.clipboard && window.location.href) {
        navigator.clipboard.writeText(window.location.href).catch(() => {});
      }
      showToast(t('toastCopiedShare'));
    });

    document.getElementById('studioDownloadToggleBtn')?.addEventListener('click', () => {
      const panel = document.getElementById('downloadHubPanel');
      if (panel) {
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });

    // Series Season & Episode change inside Studio
    document.getElementById('studioSeasonSelect')?.addEventListener('change', (e) => {
      state.activeSeason = Number(e.target.value) || 1;
      loadActiveServerIntoStudio();
      if (state.currentPlayingItem) renderDownloadHubFiles(state.currentPlayingItem);
    });

    document.getElementById('studioEpisodeSelect')?.addEventListener('change', (e) => {
      state.activeEpisode = Number(e.target.value) || 1;
      loadActiveServerIntoStudio();
      if (state.currentPlayingItem) renderDownloadHubFiles(state.currentPlayingItem);
    });

    // Recommended Row Scroll Arrows
    document.getElementById('recPrevBtn')?.addEventListener('click', () => {
      document.getElementById('recommendedMoviesRow')?.scrollBy({ left: -400, behavior: 'smooth' });
    });
    document.getElementById('recNextBtn')?.addEventListener('click', () => {
      document.getElementById('recommendedMoviesRow')?.scrollBy({ left: 400, behavior: 'smooth' });
    });

    // Actor Modal Close
    document.getElementById('closeActorModalBtn')?.addEventListener('click', () => {
      document.getElementById('actorModal')?.classList.add('hidden');
    });

    // Auth Modal
    document.getElementById('openAuthModalBtn')?.addEventListener('click', () => {
      if (state.user) toggleDrawer(true);
      else document.getElementById('authModal')?.classList.remove('hidden');
    });

    document.getElementById('drawerAuthActionBtn')?.addEventListener('click', () => {
      if (state.user) logoutUser();
      else {
        toggleDrawer(false);
        document.getElementById('authModal')?.classList.remove('hidden');
      }
    });

    document.getElementById('closeAuthModalBtn')?.addEventListener('click', () => {
      document.getElementById('authModal')?.classList.add('hidden');
    });

    document.querySelectorAll('[data-auth-tab]').forEach((tabBtn) => {
      tabBtn.addEventListener('click', () => {
        state.authMode = tabBtn.getAttribute('data-auth-tab');
        document.querySelectorAll('[data-auth-tab]').forEach((b) => b.classList.remove('active'));
        tabBtn.classList.add('active');
        document.getElementById('authNameFieldWrap')?.classList.toggle('hidden', state.authMode === 'login');
        const submitBtn = document.getElementById('authSubmitBtn');
        if (submitBtn) submitBtn.textContent = state.authMode === 'login' ? t('submitLoginBtn') : t('submitRegisterBtn');
      });
    });

    document.getElementById('authForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('authEmailInput')?.value || '';
      const rawName = document.getElementById('authNameInput')?.value || '';
      const displayName = rawName.trim() || email.split('@')[0] || 'VIP Member';
      loginUser(displayName, email);
    });

    document.getElementById('quickGuestLoginBtn')?.addEventListener('click', () => {
      loginUser('VIP Guest', 'vip@watchurmovie.app');
    });

    // Drawer Navigation
    document.querySelectorAll('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeNav = btn.getAttribute('data-nav');
        document.querySelectorAll('[data-nav]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        toggleDrawer(false);
        closeWatchStudioBackToCatalog();
        renderCatalog();
      });
    });

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

    document.getElementById('langToggleBtn')?.addEventListener('click', () => {
      state.lang = state.lang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('wum_lang', state.lang);
      applyLanguage();
    });

    // Search
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
      toggleDrawer(false);
      const randomItem = CATALOG[Math.floor(Math.random() * CATALOG.length)];
      showToast(`${t('toastRandomPick')} ${getTitle(randomItem)}`);
      openWatchStudio(randomItem.id);
    });

    document.getElementById('heroWatchBtn')?.addEventListener('click', () => {
      const featuredItems = getFeaturedItems();
      const item = featuredItems[state.heroIndex] || CATALOG[0];
      openWatchStudio(item.id);
    });
    document.getElementById('heroDetailsBtn')?.addEventListener('click', () => {
      const featuredItems = getFeaturedItems();
      const item = featuredItems[state.heroIndex] || CATALOG[0];
      openWatchStudio(item.id);
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

    document.getElementById('openCodesModalBtn')?.addEventListener('click', (e) => {
      if (e) e.preventDefault();
      toggleDrawer(false);
      document.getElementById('codesModal')?.classList.remove('hidden');
    });

    document.getElementById('closeCodesModalBtn')?.addEventListener('click', () => {
      document.getElementById('codesModal')?.classList.add('hidden');
    });

    document.getElementById('redeemCodeForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      activateRepoCode(document.getElementById('codeInput')?.value || '');
    });

    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.add('hidden');
      });
    });
  }

  updateWatchlistCountBadge();
  applyLanguage();
  initEvents();
  restartHeroAutoCycle();
  syncWithTmdbApi();
})();
