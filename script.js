/* ==========================================================================
   WatchUrMovie — Streamex-Inspired Luxury Cinema Application (script.js)
   - Clean Floating Header + 3-Lines Slide-Out Navigation Drawer (☰)
   - Full User Authentication (Sign In, Create Account, Guest VIP, Logout)
   - Signature Hover-Blur Movie Cards with Genre Badges, Synopsis & Watch CTA
   - Live TMDB API (Key: 948d5b52b35e1e08e125bd0acbe23ace) + Original Titles
   ========================================================================== */

(() => {
  'use strict';

  const BUILTIN_TMDB_KEY = '948d5b52b35e1e08e125bd0acbe23ace';
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  const TMDB_IMG_W500 = 'https://image.tmdb.org/t/p/w500';
  const TMDB_IMG_ORIG = 'https://image.tmdb.org/t/p/original';

  const I18N = {
    ar: {
      searchPlaceholder: 'ابحث عن أي فيلم أو مسلسل...',
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
      watchTrailer: 'الإعلان الرسمي',
      moreDetails: 'التفاصيل',
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
      selectServer: 'سيرفر العرض:',
      subtitlesLabel: 'الترجمة:',
      castAndCrew: 'طاقم التمثيل والإخراج',
      userReviews: 'تعليقات المشاهدين',
      submitReview: 'إرسال',
      authModalTitle: 'حسابك في WatchUrMovie',
      tabLogin: 'تسجيل الدخول',
      tabRegister: 'إنشاء حساب',
      nameLabel: 'الاسم الكامل أو المستعار',
      emailLabel: 'البريد الإلكتروني',
      passLabel: 'كلمة المرور',
      submitLoginBtn: 'دخول إلى الحساب',
      submitRegisterBtn: 'إنشاء حساب جديد',
      quickGuestBtn: 'دخول سريع كزائر VIP ⚡',
      codesModalHeading: 'أكواد التفعيل وإعدادات TMDB',
      codesModalSub: 'اضغط على أي كود بالأسفل لتفعيله فوراً:',
      activateCodeBtn: 'تفعيل',
      typeMovie: 'فيلم',
      typeSeries: 'مسلسل',
      directorLabel: 'المخرج / الإنتاج',
      yearLabel: 'الإصدار',
      durationLabel: 'المدة / المواسم',
      qualityMetaLabel: 'التقييم',
      useCodeNow: 'تفعيل ←',
      toastAddedWatchlist: 'تمت الإضافة إلى قائمتك المفضلة',
      toastRemovedWatchlist: 'تمت الإزالة من قائمتك',
      toastServerSwitched: 'تم تبديل السيرفر بنجاح',
      toastRandomPick: 'اخترنا لك هذا العمل:',
      toastReviewAdded: 'تم نشر تعليقك بنجاح',
      toastHistoryCleared: 'تم مسح سجل المشاهدة',
      toastEyeOn: 'تم تفعيل فلتر راحة العين',
      toastEyeOff: 'تم إيقاف فلتر راحة العين',
      toastWelcomeUser: 'أهلاً بك، ',
      toastLoggedOut: 'تم تسجيل الخروج بنجاح',
      toastCodeSuccess: 'تم تفعيل الكود:',
      toastCodeInvalid: 'الكود غير صحيح، اختر أحد الأكواد بالأسفل',
      genreAll: 'الكل',
      genreAction: 'أكشن ومغامرة',
      genreScifi: 'خيال علمي',
      genreDrama: 'دراما',
      genreThriller: 'غموض وإثارة',
      genreAnimation: 'أنمي ورسوم',
      genreComedy: 'كوميديا'
    },
    en: {
      searchPlaceholder: 'Search any movie or series...',
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
      watchTrailer: 'Official Trailer',
      moreDetails: 'Details',
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
      selectServer: 'Server:',
      subtitlesLabel: 'Subtitles:',
      castAndCrew: 'Cast & Crew',
      userReviews: 'Audience Comments',
      submitReview: 'Post',
      authModalTitle: 'WatchUrMovie Account',
      tabLogin: 'Sign In',
      tabRegister: 'Create Account',
      nameLabel: 'Display Name',
      emailLabel: 'Email Address',
      passLabel: 'Password',
      submitLoginBtn: 'Sign In',
      submitRegisterBtn: 'Create Account',
      quickGuestBtn: '1-Click Guest VIP Access ⚡',
      codesModalHeading: 'VIP Codes & TMDB API',
      codesModalSub: 'Click any repository code below to activate immediately:',
      activateCodeBtn: 'Activate',
      typeMovie: 'Movie',
      typeSeries: 'TV Show',
      directorLabel: 'Director / Creator',
      yearLabel: 'Released',
      durationLabel: 'Runtime',
      qualityMetaLabel: 'Score',
      useCodeNow: 'Activate →',
      toastAddedWatchlist: 'Added to your watchlist',
      toastRemovedWatchlist: 'Removed from your watchlist',
      toastServerSwitched: 'Streaming server switched',
      toastRandomPick: 'Picked for you:',
      toastReviewAdded: 'Your comment has been posted',
      toastHistoryCleared: 'Watch history cleared',
      toastEyeOn: 'Eye Comfort filter enabled',
      toastEyeOff: 'Eye Comfort filter disabled',
      toastWelcomeUser: 'Welcome back, ',
      toastLoggedOut: 'Logged out successfully',
      toastCodeSuccess: 'Code activated:',
      toastCodeInvalid: 'Invalid code, click one below',
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
      <text x="200" y="530" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" font-size="11" fill="${accent}" letter-spacing="3">${item.year} • ${item.quality}</text>
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
      rating: 8.3,
      durationAr: '2 س 46 د',
      durationEn: '2h 46m',
      quality: '4K IMAX',
      genres: ['scifi', 'drama', 'action'],
      director: 'Denis Villeneuve',
      cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
      synopsisAr: 'يتحد بول أتريدس مع تشاني والفريمن في رحلة انتقام ضد المتآمرين الذين دمروا عائلته، وعليه الاختيار بين حب حياته ومصير الكون.',
      synopsisEn: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge.',
      posterPath: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      backdropPath: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
      palette: ['#18152e', '#090814', '#8b5cf6'],
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
      cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
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
      quality: '4K Remaster',
      genres: ['drama', 'thriller'],
      director: 'Vince Gilligan',
      cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Giancarlo Esposito'],
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
    { code: 'ARABSEED', type: 'MULTI_SERVERS', descAr: 'تفعيل مصادر البث المباشر فائقة السرعة', descEn: 'Enable Ultra-Fast Direct Streaming Mirrors' }
  ];

  const state = {
    lang: localStorage.getItem('wum_lang') || 'ar',
    palette: localStorage.getItem('wum_palette') || 'streamex',
    eyeComfort: localStorage.getItem('wum_eye_comfort') === 'true',
    vipUnlocked: localStorage.getItem('wum_vip') === 'true',
    user: JSON.parse(localStorage.getItem('wum_user') || 'null'),
    authMode: 'login', // 'login' | 'register'
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
    canvasAnimId: null,
    usingFallbackCanvas: false,
    syntheticTime: 0,
    syntheticPlaying: false,
    searchDebounceTimer: null
  };

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || key;
  }

  function getTitle(item) {
    return item.title;
  }

  function getSynopsis(item) {
    return state.lang === 'ar' ? (item.synopsisAr || item.synopsisEn) : (item.synopsisEn || item.synopsisAr);
  }

  function getDuration(item) {
    return state.lang === 'ar' ? item.durationAr : item.durationEn;
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

  function formatTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // ---------------------------------------------------------------------------
  // AUTHENTICATION & USER PROFILE UI
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

  // ---------------------------------------------------------------------------
  // SLIDE-OUT DRAWER CONTROL
  // ---------------------------------------------------------------------------
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
      quality: rating >= 7.8 ? '4K ULTRA' : '1080p FHD',
      genres: mappedGenres,
      director: 'TMDB Official',
      cast: [],
      trailerKey: null,
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
        if (yt && yt.key) item.trailerKey = yt.key;
      }
    } catch (_) {
      // ignore
    }
  }

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
          renderGenreBar();
          renderCatalog();
          document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
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

  // ---------------------------------------------------------------------------
  // RENDER HOVER-BLUR MOVIE CARDS
  // ---------------------------------------------------------------------------
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

              <!-- Subtle Corner Badges (Default View) -->
              <div class="corner-badges">
                <span class="corner-quality">${item.quality}</span>
                <span class="corner-rating">★ ${item.rating.toFixed(1)}</span>
              </div>

              <!-- HOVER BLUR OVERLAY WITH FULL INFO, GENRES & WATCH BUTTON -->
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
                  <button class="hover-details-btn" data-info-id="${item.id}" title="${t('moreDetails')}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
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

    grid.querySelectorAll('[data-watch-id]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPlayerModal(btn.getAttribute('data-watch-id'), false);
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

    grid.querySelectorAll('.blur-movie-card').forEach((card) => {
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

      const [c1, c2, accent] = item.palette || ['#121526', '#090b14', '#8b5cf6'];
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

    if (curLabel) curLabel.textContent = formatTime(current);
    if (durLabel) durLabel.textContent = formatTime(duration || 140);

    const pct = duration > 0 ? Math.min(100, (current / duration) * 100) : 0;
    if (filled) filled.style.width = `${pct}%`;

    if (state.currentPlayingItem && current > 2) {
      state.watchHistory[state.currentPlayingItem.id] = Math.max(10, Math.min(95, Math.round(pct || 28)));
      localStorage.setItem('wum_history', JSON.stringify(state.watchHistory));
    }
  }

  async function openPlayerModal(itemId, mode = 'stream') {
    const item = CATALOG.find((c) => c.id === itemId) || CATALOG[0];
    if (!item) return;

    state.currentPlayingItem = item;
    document.getElementById('playerModal')?.classList.remove('hidden');
    document.getElementById('playerTypeBadge').textContent = item.type === 'series' ? t('typeSeries') : t('typeMovie');
    document.getElementById('playerModalTitle').textContent = getTitle(item);
    document.getElementById('playerSubMeta').textContent = `${item.year} · ★ ${item.rating.toFixed(1)} TMDB`;

    await enrichTmdbItemDetails(item);
    stopCinemaSynthesizer();

    if (mode === 'trailer' && item.trailerKey && ytIframeEl) {
      if (videoEl) {
        videoEl.pause();
        videoEl.classList.add('hidden');
      }
      if (canvasEl) canvasEl.classList.add('hidden');
      ytIframeEl.classList.remove('hidden');
      ytIframeEl.src = `https://www.youtube.com/embed/${item.trailerKey}?autoplay=1&rel=0`;
      document.getElementById('videoCustomCtrlBar')?.classList.add('hidden');
    } else if (mode === 'vidsrc' && item.tmdbId && ytIframeEl) {
      if (videoEl) {
        videoEl.pause();
        videoEl.classList.add('hidden');
      }
      if (canvasEl) canvasEl.classList.add('hidden');
      ytIframeEl.classList.remove('hidden');
      const embedType = item.type === 'series' ? 'tv' : 'movie';
      ytIframeEl.src = `https://vidsrc.xyz/embed/${embedType}/${item.tmdbId}`;
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
      <span class="pill-tag">${item.type === 'series' ? t('typeSeries') : t('typeMovie')}</span>
      <span class="pill-tag star">★ ${item.rating.toFixed(1)} TMDB</span>
      <span class="pill-tag glass">${item.quality}</span>
    `;

    const titleEl = document.getElementById('detailsTitle');
    if (titleEl) {
      titleEl.textContent = getTitle(item);
      titleEl.setAttribute('dir', 'ltr');
    }
    document.getElementById('detailsSynopsis').textContent = getSynopsis(item);

    await enrichTmdbItemDetails(item);

    document.getElementById('detailsMetaGrid').innerHTML = `
      <div><small style="color:var(--text-muted);display:block">${t('directorLabel')}</small><strong dir="ltr">${item.director || 'TMDB'}</strong></div>
      <div><small style="color:var(--text-muted);display:block">${t('yearLabel')}</small><strong>${item.year}</strong></div>
      <div><small style="color:var(--text-muted);display:block">${t('durationLabel')}</small><strong>${getDuration(item)}</strong></div>
      <div><small style="color:var(--text-muted);display:block">${t('qualityMetaLabel')}</small><strong>★ ${item.rating.toFixed(1)} / 10</strong></div>
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
        text: state.lang === 'ar' ? 'عمل ممتاز وتجربة المشاهدة سلسة جداً.' : 'Fantastic title and super smooth streaming experience.'
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
    // 3-Lines Drawer Menu Trigger
    document.getElementById('openDrawerBtn')?.addEventListener('click', () => toggleDrawer(true));
    document.getElementById('closeDrawerBtn')?.addEventListener('click', () => toggleDrawer(false));
    document.getElementById('drawerBackdrop')?.addEventListener('click', () => toggleDrawer(false));

    // Auth Modal & User Login / Register
    document.getElementById('openAuthModalBtn')?.addEventListener('click', () => {
      if (state.user) {
        toggleDrawer(true);
      } else {
        document.getElementById('authModal')?.classList.remove('hidden');
      }
    });

    document.getElementById('drawerAuthActionBtn')?.addEventListener('click', () => {
      if (state.user) {
        logoutUser();
      } else {
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
        const nameFieldWrap = document.getElementById('authNameFieldWrap');
        const submitBtn = document.getElementById('authSubmitBtn');
        if (nameFieldWrap) nameFieldWrap.classList.toggle('hidden', state.authMode === 'login');
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

    // Drawer Navigation Links
    document.querySelectorAll('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeNav = btn.getAttribute('data-nav');
        document.querySelectorAll('[data-nav]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        toggleDrawer(false);
        document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
        renderCatalog();
      });
    });

    // Palette Swatches inside Drawer
    document.querySelectorAll('[data-palette-pick]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.palette = btn.getAttribute('data-palette-pick');
        applyPaletteAndComfort();
      });
    });

    // Eye Comfort inside Drawer
    document.getElementById('eyeComfortBtn')?.addEventListener('click', () => {
      state.eyeComfort = !state.eyeComfort;
      localStorage.setItem('wum_eye_comfort', String(state.eyeComfort));
      applyPaletteAndComfort();
      showToast(state.eyeComfort ? t('toastEyeOn') : t('toastEyeOff'));
    });

    // Language Switcher
    document.getElementById('langToggleBtn')?.addEventListener('click', () => {
      state.lang = state.lang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('wum_lang', state.lang);
      applyLanguage();
    });

    // Search Input & Live TMDB Search
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
      openDetailsModal(randomItem.id);
    });

    // Hero CTA Buttons
    document.getElementById('heroWatchBtn')?.addEventListener('click', () => {
      const featuredItems = getFeaturedItems();
      const item = featuredItems[state.heroIndex] || CATALOG[0];
      openPlayerModal(item.id, 'stream');
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
        if (state.currentPlayingItem) {
          openPlayerModal(state.currentPlayingItem.id, srv);
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
      if (state.currentPlayingItem) openPlayerModal(state.currentPlayingItem.id, 'stream');
    });

    document.getElementById('detailsTrailerBtn')?.addEventListener('click', () => {
      document.getElementById('detailsModal')?.classList.add('hidden');
      if (state.currentPlayingItem) openPlayerModal(state.currentPlayingItem.id, 'trailer');
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
      const author = (nameInput?.value || state.user?.name || '').trim();
      const text = (commentInput?.value || '').trim();
      if (!author || !text) return;
      const id = state.currentPlayingItem.id;
      if (!state.reviews[id]) state.reviews[id] = [];
      state.reviews[id].unshift({ author, text });
      localStorage.setItem('wum_reviews', JSON.stringify(state.reviews));
      if (nameInput) nameInput.value = '';
      if (commentInput) commentInput.value = '';
      renderItemReviews(id);
      showToast(t('toastReviewAdded'));
    });

    const openCodes = (e) => {
      if (e) e.preventDefault();
      toggleDrawer(false);
      document.getElementById('codesModal')?.classList.remove('hidden');
    };
    document.getElementById('openCodesModalBtn')?.addEventListener('click', openCodes);

    document.getElementById('closeCodesModalBtn')?.addEventListener('click', () => {
      document.getElementById('codesModal')?.classList.add('hidden');
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
  syncWithTmdbApi();
})();
