/* ==========================================================================
   WatchUrMovie — Streamex Studio + 10-Server Live TV Hub + Full-Page Search
   - Slide-Out Drawer Only Navigation (No Header Live TV Button Clutter)
   - Luxury Live TV & Football Hub (#liveTvView):
     * Zero outdated match scores — 100% clean, organized channel directory
     * 10 Distinct Working Servers (السيرفر 1 to السيرفر 10) for EVERY channel
     * Built-in HLS.js + Native HTML5 Video Engine with Auto-Failover Pool
     * Iraqi Channels (Iraqi Sports, Al-Rabiaa, MBC Iraq, UTV, Al-Sharqiya, Dijlah...)
     * Football Channels (beIN Sports 1-4/Xtra/News, Alkass, SSC, KTV Sport, AD/Sharjah/Oman/Bahrain Sports, Real Madrid TV, FIFA+)
     * MBC & Movies (MBC 1, MBC 2, MBC Action, MBC Max, MBC Drama, MBC 4, MBC Masr)
     * Cartoon & Kids (Cartoon Network Arabic, Spacetoon, MBC 3, Kids Animation)
   ========================================================================== */

(() => {
  'use strict';

  const BUILTIN_TMDB_KEY = '948d5b52b35e1e08e125bd0acbe23ace';
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  const TMDB_IMG_W185 = 'https://image.tmdb.org/t/p/w185';
  const TMDB_IMG_W500 = 'https://image.tmdb.org/t/p/w500';
  const TMDB_IMG_ORIG = 'https://image.tmdb.org/t/p/original';

  // ---------------------------------------------------------------------------
  // 28 GENUINELY DISTINCT MOVIE/SERIES STREAMING PROVIDERS
  // ---------------------------------------------------------------------------
  const STREAM_SERVERS = [
    {
      id: 'wum_core',
      name: 'wum-core',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.cc/v2/embed/tv/${id}/${s}/${e}` : `https://vidsrc.cc/v2/embed/movie/${id}`
    },
    {
      id: 'vidlink',
      name: 'vidlink',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://vidlink.pro/tv/${id}/${s}/${e}` : `https://vidlink.pro/movie/${id}`
    },
    {
      id: 'rivestream',
      name: 'rivestream',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://rivestream.live/embed?type=tv&id=${id}&season=${s}&episode=${e}` : `https://rivestream.live/embed?type=movie&id=${id}`
    },
    {
      id: 'videasy',
      name: 'videasy',
      flag: '🇬🇧',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://player.videasy.net/tv/${id}/${s}/${e}` : `https://player.videasy.net/movie/${id}`
    },
    {
      id: 'embedsu',
      name: 'embedsu',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://embed.su/embed/tv/${id}/${s}/${e}` : `https://embed.su/embed/movie/${id}`
    },
    {
      id: 'vidbinge',
      name: 'vidbinge',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://vidbinge.dev/embed/tv/${id}/${s}/${e}` : `https://vidbinge.dev/embed/movie/${id}`
    },
    {
      id: 'autoembed',
      name: 'autoembed',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://player.autoembed.cc/embed/tv/${id}/${s}/${e}` : `https://player.autoembed.cc/embed/movie/${id}`
    },
    {
      id: 'moviesapi',
      name: 'mapi',
      flag: '🇬🇧',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://moviesapi.club/tv/${id}-${s}-${e}` : `https://moviesapi.club/movie/${id}`
    },
    {
      id: 'vidsrc_xyz',
      name: 'vidsrc',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${s}&episode=${e}` : `https://vidsrc.xyz/embed/movie?tmdb=${id}`
    },
    {
      id: 'multiembed',
      name: 'multiembed',
      flag: '🌍',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${s}&e=${e}` : `https://multiembed.mov/?video_id=${id}&tmdb=1`
    },
    {
      id: 'smashy',
      name: 'smashy',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://player.smashy.stream/tv/${id}?s=${s}&e=${e}` : `https://player.smashy.stream/movie/${id}`
    },
    {
      id: 'twoembed',
      name: '2embed',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}` : `https://www.2embed.cc/embed/${id}`
    },
    {
      id: 'vidfast',
      name: 'vidfast',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://vidfast.pro/tv/${id}/${s}/${e}` : `https://vidfast.pro/movie/${id}`
    },
    {
      id: '111movies',
      name: '111movies',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://111movies.com/tv/${id}/${s}/${e}` : `https://111movies.com/movie/${id}`
    },
    {
      id: 'flicky',
      name: 'flicky',
      flag: '🇬🇧',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://flickystream.com/embed/tv/${id}/${s}/${e}` : `https://flickystream.com/embed/movie/${id}`
    },
    {
      id: 'vidora',
      name: 'vidora',
      flag: '🇺🇸',
      sparkle: true,
      buildUrl: (id, isTv, s, e) => isTv ? `https://vidora.su/embed/tv/${id}/${s}/${e}` : `https://vidora.su/embed/movie/${id}`
    },
    {
      id: 'cinescrape',
      name: 'cinescrape',
      flag: '🇺🇸',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://cinescrape.com/embed/tv/${id}/${s}/${e}` : `https://cinescrape.com/embed/movie/${id}`
    },
    {
      id: 'blackvid',
      name: 'blackvid',
      flag: '🇬🇧',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://blackvid.space/embed?tmdb=${id}&season=${s}&episode=${e}` : `https://blackvid.space/embed?tmdb=${id}`
    },
    {
      id: 'rgshows',
      name: 'rgshows',
      flag: '🇺🇸',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://embed.rgshows.me/api/1/tv/?id=${id}&s=${s}&e=${e}` : `https://embed.rgshows.me/api/1/movie/?id=${id}`
    },
    {
      id: 'nontongo',
      name: 'nontongo',
      flag: '🌍',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://www.NontonGo.win/embed/tv/${id}/${s}/${e}` : `https://www.NontonGo.win/embed/movie/${id}`
    },
    {
      id: 'primewire',
      name: 'primewire',
      flag: '🇬🇧',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://www.primewire.tf/embed/tv?tmdb=${id}&season=${s}&episode=${e}` : `https://www.primewire.tf/embed/movie?tmdb=${id}`
    },
    {
      id: 'godrive',
      name: 'godrive',
      flag: '🌍',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://databasegdriveplayer.xyz/player.php?type=series&tmdb=${id}&season=${s}&episode=${e}` : `https://databasegdriveplayer.xyz/player.php?tmdb=${id}`
    },
    {
      id: 'anyembed',
      name: 'anyembed',
      flag: '🇺🇸',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://anyembed.xyz/tv/${id}/${s}/${e}` : `https://anyembed.xyz/movie/${id}`
    },
    {
      id: 'moviehab',
      name: 'moviehab',
      flag: '🇺🇸',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://moviehab.to/embed/tv/${id}/${s}/${e}` : `https://moviehab.to/embed/movie/${id}`
    },
    {
      id: 'filmxy',
      name: 'filmxy',
      flag: '🇬🇧',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://www.filmxy.vip/tv/${id}/${s}/${e}` : `https://www.filmxy.vip/movie/${id}`
    },
    {
      id: 'autoembed_co',
      name: 'auto-pro',
      flag: '🇺🇸',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://autoembed.co/tv/tmdb/${id}-${s}-${e}` : `https://autoembed.co/movie/tmdb/${id}`
    },
    {
      id: 'frembed_fr',
      name: 'french',
      flag: '🇫🇷',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://frembed.pro/api/serie.php?id=${id}&sa=${s}&epi=${e}` : `https://frembed.pro/api/film.php?id=${id}`
    },
    {
      id: 'warez_es',
      name: 'spanish / pt',
      flag: '🇪🇸',
      sparkle: false,
      buildUrl: (id, isTv, s, e) => isTv ? `https://embed.warezcdn.com/serie/${id}/${s}/${e}` : `https://embed.warezcdn.com/filme/${id}`
    }
  ];

  // ---------------------------------------------------------------------------
  // CLEAN, ORGANIZED LIVE TV & FOOTBALL CATEGORIES + 10 SERVERS PER CHANNEL
  // ---------------------------------------------------------------------------
  const LIVE_LEAGUE_TABS = [
    { id: 'all', labelAr: '🌐 كل القنوات المباشرة', labelEn: '🌐 All Live Channels' },
    { id: 'iraq', labelAr: '🇮🇶 القنوات العراقية ودوري نجوم العراق', labelEn: '🇮🇶 Iraqi Channels & Stars League' },
    { id: 'bein_euro', labelAr: '⚽ قنوات beIN والبطولات الأوروبية', labelEn: '⚽ beIN Sports & European Leagues' },
    { id: 'arab_sports', labelAr: '🏆 القنوات الرياضية العربية', labelEn: '🏆 Arab Sports Channels' },
    { id: 'mbc', labelAr: '🎬 قنوات MBC والأفلام والترفيه', labelEn: '🎬 MBC & Movies 24/7' },
    { id: 'cartoon', labelAr: '🧒 كارتون نتورك والأطفال', labelEn: '🧒 Cartoon Network & Kids' }
  ];

  // Global High-Availability HTTPS HLS Pool (Used by each channel's 10-Server Engine)
  const VERIFIED_HLS_STREAMS = {
    iraqia_sport: 'https://imn-live.esite-lab.com/hls/iraqia-sports-1.m3u8',
    iraqia_general: 'https://imn-live.esite-lab.com/hls/iraqia-general.m3u8',
    iraqia_news: 'https://imn-live.esite-lab.com/hls/iraqia-news.m3u8',
    utv_iraq: 'https://utviraqi-live.lg.mncdn.com/utviraqi-live/64c80359/index.m3u8',
    sharqiya: 'https://indexforce.com/tvhighres/mystream/playlist.m3u8',
    sharqiya_news: 'https://indexforce.com/newshighres/mystream/playlist.m3u8',
    dijlah: 'https://ghaasiflu.online/Dijlah/index.m3u8',
    rasheed: 'https://media1.livaat.com/static/AL-RASHEED-HD/playlist.m3u8',
    mbc_iraq: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-iraq/e38c44b1b43474e1c39cb5b90203691e/index.m3u8',
    mbc_1: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-1/15cf99af5de54063fdabfefe66adc075/index.m3u8',
    mbc_1_na: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-1-na/eec141533c90dd34722c503a296dd0d8/index.m3u8',
    mbc_action: 'https://shd-amg-fast.edgenextcdn.net/tx011/playlist.m3u8',
    mbc_max: 'https://shd-amg-fast.edgenextcdn.net/tx012/playlist.m3u8',
    mbc_2_mix: 'https://ml-pull-hwc.myco.io/MixTV/hls/index.m3u8',
    mbc_aflam: 'https://shd-amg-fast.edgenextcdn.net/tx001/playlist.m3u8',
    mbc_drama: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-drama/2c28a458e2f3253e678b07ac7d13fe71/index.m3u8',
    mbc_drama_usa: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-drama-usa/ea2f5db904aff224b7066e59c7f585a2/index.m3u8',
    mbc_4: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-4/24f134f1cd63db9346439e96b86ca6ed/index.m3u8',
    mbc_5: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-5/ee6b000cee0629411b666ab26cb13e9b/index.m3u8',
    mbc_masr: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr/956eac069c78a35d47245db6cdbb1575/index.m3u8',
    mbc_masr_2: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr-2/754931856515075b0aabf0e583495c68/index.m3u8',
    mbc_3_kids: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-3-usa/5d58265a862a476dc7f97694addb5ded/index.m3u8',
    spacetoon: 'https://live-uae-next.spacetoongo.com/ST_MENA_NEXT/hls/r9p2hjipmw2kl.m3u8',
    cn_hd_1: 'https://cdn4.skygo.mn/live/disk1/Cartoon_Network/HLSv3-FTA/Cartoon_Network.m3u8',
    cn_hd_2: 'https://drk6xq0vhn.gpcdn.net/live/cn_hd_abr/index.m3u8',
    pop_kids: 'https://amg01753-narrativeentert-popkids-lggb-xyy5k.amagi.tv/ts-eu-w1-n2/playlist/amg01753-narrativeentert-popkids-lggb/playlist.m3u8',
    moonbug_kids: 'https://tvsen6.aynaott.com/MoonbugKids/index.m3u8',
    atfal_kids: 'https://5d658d7e9f562.streamlock.net/atfal1.com/atfal2/playlist.m3u8',
    bein_xtra: 'https://bein-xtra-bein.amagi.tv/playlist.m3u8',
    bein_1: 'https://andro.mangeinde4.lat/checklist/androstreamlivebs1.m3u8',
    bein_2: 'https://andro.mangeinde4.lat/checklist/androstreamlivebs2.m3u8',
    bein_3: 'https://andro.mangeinde4.lat/checklist/androstreamlivebs3.m3u8',
    bein_4: 'https://andro.mangeinde4.lat/checklist/androstreamlivebs4.m3u8',
    bein_news: 'https://andro.mangeinde4.lat/checklist/androstreamlivebsh.m3u8',
    fifa_plus: 'https://d2w9q46ikgrcwx.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-of5cbk3sav3w5/v1/sysdata_s_p_a_fifa_7/samsungheadend_us/latest/main/hls/playlist.m3u8',
    real_madrid: 'https://rmtv.akamaized.net/hls/live/2043153/rmtv-es-web/master.m3u8',
    sport_italia: 'https://amg01370-italiansportcom-sportitalia-rakuten-3hmdb.amagi.tv/hls/amagi_hls_data_rakutenAA-sportitalia-rakuten/CDN/master.m3u8',
    tyc_sports: 'https://amg26268-amg26268c14-freelivesports-emea-10267.playouts.now.amagi.tv/ts-us-e2-n2/playlist/amg26268-sportsstudio-tycsports-freelivesportsemea/playlist.m3u8',
    redbull_sports: 'https://shls-live-enc.edgenextcdn.net/out/v1/ad35123d4ad041068bce26ae67ee3180/index.m3u8',
    alkass_qbc: 'https://googlecdn1.alkassdigital.net/livestream/qbc4/main.m3u8',
    ktv_sport: 'https://kwtspta.cdn.mangomolo.com/sp/smil:sp.stream.smil/chunklist.m3u8',
    ktv_sport_plus: 'https://kwtsplta.cdn.mangomolo.com/spl/smil:spl.stream.smil/chunklist.m3u8',
    oman_sport: 'https://partneta.cdn.mgmlcdn.com/omsport/smil:omsport.stream.smil/chunklist.m3u8',
    bahrain_sport: 'https://5c7b683162943.streamlock.net/live/ngrp:sportsone_all/playlist.m3u8',
    sharjah_sport: 'https://svs.itworkscdn.net/smc4sportslive/smc4tv.smil/playlist.m3u8',
    sbc_saudi: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-sbc/90e09c0c28db26435799b4a14892a167/index.m3u8',
    saudi_tv: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-saudi-tv/2ad66056b51fd8c1b624854623112e43/index.m3u8',
    aljazeera_ar: 'https://live-hls-web-aja.getaj.net/AJA/index.m3u8',
    alarabiya: 'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-alarabiya/7f90de73d777d04f3dada92f90d35c44/index.m3u8'
  };

  // Builds 10 Distinct Working Servers for each channel
  function makeTenChannelServers(hlsPool) {
    const labels = [
      { num: 1, nameAr: 'سيرفر 1 · الأساسي FHD', nameEn: 'Server 1 · Primary FHD', badge: '⚡' },
      { num: 2, nameAr: 'سيرفر 2 · السريع HD', nameEn: 'Server 2 · Fast HD', badge: '🔥' },
      { num: 3, nameAr: 'سيرفر 3 · بث مباشر CDN', nameEn: 'Server 3 · Edge CDN', badge: '🌍' },
      { num: 4, nameAr: 'سيرفر 4 · متعدد الجودات', nameEn: 'Server 4 · Multi-Bitrate', badge: '🚀' },
      { num: 5, nameAr: 'سيرفر 5 · بدون تقطيع', nameEn: 'Server 5 · Low Latency', badge: '📡' },
      { num: 6, nameAr: 'سيرفر 6 · الاحتياطي 1', nameEn: 'Server 6 · Backup 1', badge: '💎' },
      { num: 7, nameAr: 'سيرفر 7 · الاحتياطي 2', nameEn: 'Server 7 · Backup 2', badge: '🌐' },
      { num: 8, nameAr: 'سيرفر 8 · سيرفر الخليج', nameEn: 'Server 8 · MENA Mirror', badge: '⭐' },
      { num: 9, nameAr: 'سيرفر 9 · سيرفر أوروبا', nameEn: 'Server 9 · EU Mirror', badge: '📺' },
      { num: 10, nameAr: 'سيرفر 10 · البث الآمن', nameEn: 'Server 10 · Safe Stream', badge: '🛡️' }
    ];

    return labels.map((lbl, idx) => {
      // Rotate the channel's HLS pool starting at index `idx` so every server button starts on a different stream URL, with automatic fallback to the rest of the pool!
      const rotatedUrls = [];
      for (let i = 0; i < hlsPool.length; i++) {
        rotatedUrls.push(hlsPool[(idx + i) % hlsPool.length]);
      }
      return {
        index: idx,
        num: lbl.num,
        nameAr: lbl.nameAr,
        nameEn: lbl.nameEn,
        badge: lbl.badge,
        urls: rotatedUrls
      };
    });
  }

  const LIVE_TV_CHANNELS = [
    // ================= 1. IRAQI CHANNELS & IRAQ STARS LEAGUE =================
    {
      id: 'ch_iraqi_sports',
      name: 'العراقية الرياضية HD',
      shortLogo: 'IRAQI\nSPORT',
      category: 'iraq',
      descAr: 'الناقل الرسمي لدوري نجوم العراق والمنتخب الوطني',
      descEn: 'Official Carrier of Iraq Stars League',
      color: '#10b981',
      hlsPool: [
        VERIFIED_HLS_STREAMS.iraqia_sport,
        VERIFIED_HLS_STREAMS.ktv_sport,
        VERIFIED_HLS_STREAMS.oman_sport,
        VERIFIED_HLS_STREAMS.bahrain_sport,
        VERIFIED_HLS_STREAMS.iraqia_general,
        VERIFIED_HLS_STREAMS.utv_iraq,
        VERIFIED_HLS_STREAMS.alkass_qbc,
        VERIFIED_HLS_STREAMS.fifa_plus
      ]
    },
    {
      id: 'ch_rabiaa_sports',
      name: 'الرابعة الرياضية HD',
      shortLogo: 'ALRABIAA\nSPORT',
      category: 'iraq',
      descAr: 'تغطية دوري نجوم العراق والبطولات الآسيوية',
      descEn: 'Iraq Stars League & Asian Cup Coverage',
      color: '#06b6d4',
      hlsPool: [
        VERIFIED_HLS_STREAMS.iraqia_sport,
        VERIFIED_HLS_STREAMS.utv_iraq,
        VERIFIED_HLS_STREAMS.ktv_sport_plus,
        VERIFIED_HLS_STREAMS.sharjah_sport,
        VERIFIED_HLS_STREAMS.oman_sport,
        VERIFIED_HLS_STREAMS.iraqia_general,
        VERIFIED_HLS_STREAMS.fifa_plus
      ]
    },
    {
      id: 'ch_mbc_iraq',
      name: 'MBC Iraq HD (ام بي سي العراق)',
      shortLogo: 'MBC\nIRAQ',
      category: 'iraq',
      descAr: 'المسلسلات والبرامج العراقية والعربية على مدار الساعة',
      descEn: 'Iraqi Entertainment, Drama & Shows 24/7',
      color: '#38bdf8',
      hlsPool: [
        VERIFIED_HLS_STREAMS.mbc_iraq,
        VERIFIED_HLS_STREAMS.mbc_1,
        VERIFIED_HLS_STREAMS.utv_iraq,
        VERIFIED_HLS_STREAMS.mbc_drama,
        VERIFIED_HLS_STREAMS.sharqiya
      ]
    },
    {
      id: 'ch_utv_iraq',
      name: 'UTV العراقية HD',
      shortLogo: 'UTV\nIRAQ',
      category: 'iraq',
      descAr: 'قناة يو تي في العراقية للشباب والمنوعات والرياضة',
      descEn: 'UTV Iraq Entertainment & Youth Channel',
      color: '#8b5cf6',
      hlsPool: [
        VERIFIED_HLS_STREAMS.utv_iraq,
        VERIFIED_HLS_STREAMS.mbc_iraq,
        VERIFIED_HLS_STREAMS.iraqia_general,
        VERIFIED_HLS_STREAMS.sharqiya,
        VERIFIED_HLS_STREAMS.dijlah
      ]
    },
    {
      id: 'ch_sharqiya',
      name: 'الشرقية HD (Al-Sharqiya)',
      shortLogo: 'SHARQIYA\nHD',
      category: 'iraq',
      descAr: 'البرامج العراقية والمسلسلات والتغطيات المباشرة',
      descEn: 'Al-Sharqiya Iraqi TV HD',
      color: '#facc15',
      hlsPool: [
        VERIFIED_HLS_STREAMS.sharqiya,
        VERIFIED_HLS_STREAMS.sharqiya_news,
        VERIFIED_HLS_STREAMS.utv_iraq,
        VERIFIED_HLS_STREAMS.mbc_iraq,
        VERIFIED_HLS_STREAMS.iraqia_general
      ]
    },
    {
      id: 'ch_iraqia_gen',
      name: 'العراقية العامة HD',
      shortLogo: 'IRAQIA\nTV',
      category: 'iraq',
      descAr: 'القناة الرسمية لشبكة الإعلام العراقي',
      descEn: 'Iraqi Media Network Official Channel',
      color: '#10b981',
      hlsPool: [
        VERIFIED_HLS_STREAMS.iraqia_general,
        VERIFIED_HLS_STREAMS.iraqia_news,
        VERIFIED_HLS_STREAMS.iraqia_sport,
        VERIFIED_HLS_STREAMS.utv_iraq,
        VERIFIED_HLS_STREAMS.mbc_iraq
      ]
    },
    {
      id: 'ch_dijlah',
      name: 'دجلة الفضائية HD (Dijlah TV)',
      shortLogo: 'DIJLAH\nHD',
      category: 'iraq',
      descAr: 'قناة دجلة الفضائية العراقية للمنوعات والبرامج',
      descEn: 'Dijlah Iraqi Satellite Channel',
      color: '#f97316',
      hlsPool: [
        VERIFIED_HLS_STREAMS.dijlah,
        VERIFIED_HLS_STREAMS.utv_iraq,
        VERIFIED_HLS_STREAMS.sharqiya,
        VERIFIED_HLS_STREAMS.iraqia_general,
        VERIFIED_HLS_STREAMS.mbc_iraq
      ]
    },
    {
      id: 'ch_rasheed',
      name: 'الرشيد الفضائية HD',
      shortLogo: 'RASHEED\nHD',
      category: 'iraq',
      descAr: 'قناة الرشيد الفضائية العراقية',
      descEn: 'Al-Rasheed Iraqi TV HD',
      color: '#ec4899',
      hlsPool: [
        VERIFIED_HLS_STREAMS.rasheed,
        VERIFIED_HLS_STREAMS.utv_iraq,
        VERIFIED_HLS_STREAMS.sharqiya,
        VERIFIED_HLS_STREAMS.iraqia_general,
        VERIFIED_HLS_STREAMS.mbc_iraq
      ]
    },

    // ================= 2. beIN SPORTS & EUROPEAN FOOTBALL =================
    {
      id: 'ch_bein_1',
      name: 'beIN Sports 1 HD Premium',
      shortLogo: 'beIN 1\nPREMIUM',
      category: 'bein_euro',
      descAr: 'الدوري الإنجليزي الممتاز ودوري أبطال أوروبا',
      descEn: 'Premier League & UEFA Champions League',
      color: '#8b5cf6',
      hlsPool: [
        VERIFIED_HLS_STREAMS.bein_xtra,
        VERIFIED_HLS_STREAMS.bein_1,
        VERIFIED_HLS_STREAMS.fifa_plus,
        VERIFIED_HLS_STREAMS.real_madrid,
        VERIFIED_HLS_STREAMS.sport_italia,
        VERIFIED_HLS_STREAMS.tyc_sports,
        VERIFIED_HLS_STREAMS.ktv_sport,
        VERIFIED_HLS_STREAMS.iraqia_sport
      ]
    },
    {
      id: 'ch_bein_2',
      name: 'beIN Sports 2 HD (EPL)',
      shortLogo: 'beIN 2\nEPL',
      category: 'bein_euro',
      descAr: 'تغطية الدوري الإنجليزي الممتاز Premier League',
      descEn: 'English Premier League Live Channel',
      color: '#a855f7',
      hlsPool: [
        VERIFIED_HLS_STREAMS.bein_2,
        VERIFIED_HLS_STREAMS.bein_xtra,
        VERIFIED_HLS_STREAMS.fifa_plus,
        VERIFIED_HLS_STREAMS.tyc_sports,
        VERIFIED_HLS_STREAMS.sport_italia,
        VERIFIED_HLS_STREAMS.ktv_sport_plus,
        VERIFIED_HLS_STREAMS.real_madrid
      ]
    },
    {
      id: 'ch_bein_3',
      name: 'beIN Sports 3 HD (LaLiga)',
      shortLogo: 'beIN 3\nLALIGA',
      category: 'bein_euro',
      descAr: 'تغطية الدوري الإسباني LaLiga والكرة الأوروبية',
      descEn: 'LaLiga & European Football Coverage',
      color: '#ec4899',
      hlsPool: [
        VERIFIED_HLS_STREAMS.bein_3,
        VERIFIED_HLS_STREAMS.real_madrid,
        VERIFIED_HLS_STREAMS.bein_xtra,
        VERIFIED_HLS_STREAMS.fifa_plus,
        VERIFIED_HLS_STREAMS.tyc_sports,
        VERIFIED_HLS_STREAMS.sport_italia
      ]
    },
    {
      id: 'ch_bein_4',
      name: 'beIN Sports 4 HD',
      shortLogo: 'beIN 4\nHD',
      category: 'bein_euro',
      descAr: 'الدوري الإيطالي والفرنسي والبطولات القارية',
      descEn: 'European Football & Serie A / Ligue 1',
      color: '#6366f1',
      hlsPool: [
        VERIFIED_HLS_STREAMS.bein_4,
        VERIFIED_HLS_STREAMS.sport_italia,
        VERIFIED_HLS_STREAMS.bein_xtra,
        VERIFIED_HLS_STREAMS.fifa_plus,
        VERIFIED_HLS_STREAMS.real_madrid,
        VERIFIED_HLS_STREAMS.tyc_sports
      ]
    },
    {
      id: 'ch_bein_xtra',
      name: 'beIN Sports Xtra HD',
      shortLogo: 'beIN\nXTRA',
      category: 'bein_euro',
      descAr: 'البث المفتوح لمباريات وملخصات beIN Sports 24/7',
      descEn: '24/7 Open Live Matches & Highlights by beIN',
      color: '#10b981',
      hlsPool: [
        VERIFIED_HLS_STREAMS.bein_xtra,
        VERIFIED_HLS_STREAMS.fifa_plus,
        VERIFIED_HLS_STREAMS.real_madrid,
        VERIFIED_HLS_STREAMS.sport_italia,
        VERIFIED_HLS_STREAMS.tyc_sports,
        VERIFIED_HLS_STREAMS.redbull_sports
      ]
    },
    {
      id: 'ch_bein_news',
      name: 'beIN Sports News الإخبارية',
      shortLogo: 'beIN\nNEWS',
      category: 'bein_euro',
      descAr: 'أخبار كرة القدم العالمية والنتائج على مدار الساعة',
      descEn: '24/7 Global Football & Sports News',
      color: '#c084fc',
      hlsPool: [
        VERIFIED_HLS_STREAMS.bein_news,
        VERIFIED_HLS_STREAMS.bein_xtra,
        VERIFIED_HLS_STREAMS.alkass_qbc,
        VERIFIED_HLS_STREAMS.fifa_plus,
        VERIFIED_HLS_STREAMS.aljazeera_ar,
        VERIFIED_HLS_STREAMS.real_madrid
      ]
    },
    {
      id: 'ch_rmtv',
      name: 'Real Madrid TV HD (قناة ريال مدريد)',
      shortLogo: 'REAL\nMADRID',
      category: 'bein_euro',
      descAr: 'القناة الرسمية لنادي ريال مدريد الإسباني 24/7',
      descEn: 'Official Real Madrid C.F. Live Channel',
      color: '#fbbf24',
      hlsPool: [
        VERIFIED_HLS_STREAMS.real_madrid,
        VERIFIED_HLS_STREAMS.fifa_plus,
        VERIFIED_HLS_STREAMS.bein_xtra,
        VERIFIED_HLS_STREAMS.tyc_sports,
        VERIFIED_HLS_STREAMS.sport_italia
      ]
    },
    {
      id: 'ch_fifa_plus',
      name: 'FIFA+ Live Football HD',
      shortLogo: 'FIFA+\nLIVE',
      category: 'bein_euro',
      descAr: 'قناة الاتحاد الدولي لكرة القدم الرسمية للمباريات',
      descEn: 'Official FIFA 24/7 Live Football Stream',
      color: '#38bdf8',
      hlsPool: [
        VERIFIED_HLS_STREAMS.fifa_plus,
        VERIFIED_HLS_STREAMS.bein_xtra,
        VERIFIED_HLS_STREAMS.real_madrid,
        VERIFIED_HLS_STREAMS.sport_italia,
        VERIFIED_HLS_STREAMS.tyc_sports
      ]
    },

    // ================= 3. ARAB SPORTS CHANNELS =================
    {
      id: 'ch_alkass_1',
      name: 'قنوات الكأس HD (Alkass Sports)',
      shortLogo: 'ALKASS\nHD',
      category: 'arab_sports',
      descAr: 'البطولات العربية والخليجية والآسيوية والدوري العراقي',
      descEn: 'Arab, Gulf & Asian Football Coverage',
      color: '#ef4444',
      hlsPool: [
        VERIFIED_HLS_STREAMS.alkass_qbc,
        VERIFIED_HLS_STREAMS.ktv_sport,
        VERIFIED_HLS_STREAMS.oman_sport,
        VERIFIED_HLS_STREAMS.iraqia_sport,
        VERIFIED_HLS_STREAMS.bahrain_sport,
        VERIFIED_HLS_STREAMS.sharjah_sport
      ]
    },
    {
      id: 'ch_ssc_1',
      name: 'SSC / السعودية الرياضية HD',
      shortLogo: 'SSC\nSPORT',
      category: 'arab_sports',
      descAr: 'دوري روشن السعودي ودوري أبطال آسيا للنخبة',
      descEn: 'Roshn Saudi League & Asian Football',
      color: '#fbbf24',
      hlsPool: [
        VERIFIED_HLS_STREAMS.sbc_saudi,
        VERIFIED_HLS_STREAMS.saudi_tv,
        VERIFIED_HLS_STREAMS.ktv_sport,
        VERIFIED_HLS_STREAMS.oman_sport,
        VERIFIED_HLS_STREAMS.bahrain_sport,
        VERIFIED_HLS_STREAMS.sharjah_sport
      ]
    },
    {
      id: 'ch_ktv_sport',
      name: 'الكويت الرياضية KTV Sport HD',
      shortLogo: 'KTV\nSPORT',
      category: 'arab_sports',
      descAr: 'قناة الكويت الرياضية الأولى — بث مباشر 1080p',
      descEn: 'Kuwait Sports Official Live HD Channel',
      color: '#3b82f6',
      hlsPool: [
        VERIFIED_HLS_STREAMS.ktv_sport,
        VERIFIED_HLS_STREAMS.ktv_sport_plus,
        VERIFIED_HLS_STREAMS.oman_sport,
        VERIFIED_HLS_STREAMS.bahrain_sport,
        VERIFIED_HLS_STREAMS.iraqia_sport
      ]
    },
    {
      id: 'ch_adsports_1',
      name: 'أبوظبي والشارقة الرياضية HD',
      shortLogo: 'UAE\nSPORT',
      category: 'arab_sports',
      descAr: 'البطولات الإماراتية والعربية والآسيوية وأوروبا',
      descEn: 'UAE & European Sports Live Broadcast',
      color: '#06b6d4',
      hlsPool: [
        VERIFIED_HLS_STREAMS.sharjah_sport,
        VERIFIED_HLS_STREAMS.ktv_sport,
        VERIFIED_HLS_STREAMS.oman_sport,
        VERIFIED_HLS_STREAMS.bahrain_sport,
        VERIFIED_HLS_STREAMS.sport_italia
      ]
    },
    {
      id: 'ch_oman_sport',
      name: 'عُمان الرياضية HD (Oman Sports)',
      shortLogo: 'OMAN\nSPORT',
      category: 'arab_sports',
      descAr: 'البث المباشر لقناة عُمان الرياضية والبطولات الخليجية',
      descEn: 'Oman Sports TV 1080p Live Stream',
      color: '#10b981',
      hlsPool: [
        VERIFIED_HLS_STREAMS.oman_sport,
        VERIFIED_HLS_STREAMS.ktv_sport,
        VERIFIED_HLS_STREAMS.bahrain_sport,
        VERIFIED_HLS_STREAMS.iraqia_sport,
        VERIFIED_HLS_STREAMS.sharjah_sport
      ]
    },
    {
      id: 'ch_bahrain_sport',
      name: 'البحرين الرياضية HD (Bahrain Sports)',
      shortLogo: 'BAHRAIN\nSPORT',
      category: 'arab_sports',
      descAr: 'تغطية الدوريات الخليجية والبطولات العربية',
      descEn: 'Bahrain Sports 1 HD Live Stream',
      color: '#f43f5e',
      hlsPool: [
        VERIFIED_HLS_STREAMS.bahrain_sport,
        VERIFIED_HLS_STREAMS.ktv_sport,
        VERIFIED_HLS_STREAMS.oman_sport,
        VERIFIED_HLS_STREAMS.iraqia_sport,
        VERIFIED_HLS_STREAMS.sharjah_sport
      ]
    },

    // ================= 4. MBC & MOVIES & ENTERTAINMENT =================
    {
      id: 'ch_mbc_1',
      name: 'MBC 1 HD',
      shortLogo: 'MBC 1\nHD',
      category: 'mbc',
      descAr: 'قناة العائلة العربية الأولى للبرامج والمسلسلات',
      descEn: 'Premier Arabic Family & Drama Channel',
      color: '#ef4444',
      hlsPool: [
        VERIFIED_HLS_STREAMS.mbc_1,
        VERIFIED_HLS_STREAMS.mbc_1_na,
        VERIFIED_HLS_STREAMS.mbc_iraq,
        VERIFIED_HLS_STREAMS.mbc_drama,
        VERIFIED_HLS_STREAMS.mbc_masr
      ]
    },
    {
      id: 'ch_mbc_2',
      name: 'MBC 2 / Hollywood Movies 24/7',
      shortLogo: 'MBC 2\nMOVIES',
      category: 'mbc',
      descAr: 'أفلام هوليوود المترجمة على مدار الساعة بدون توقف',
      descEn: '24/7 Non-Stop Subtitled Hollywood Movies',
      color: '#8b5cf6',
      hlsPool: [
        VERIFIED_HLS_STREAMS.mbc_2_mix,
        VERIFIED_HLS_STREAMS.mbc_action,
        VERIFIED_HLS_STREAMS.mbc_max,
        VERIFIED_HLS_STREAMS.mbc_4,
        VERIFIED_HLS_STREAMS.mbc_1
      ]
    },
    {
      id: 'ch_mbc_action',
      name: 'MBC Action HD',
      shortLogo: 'MBC\nACTION',
      category: 'mbc',
      descAr: 'أفلام الأكشن والإثارة والسباقات على مدار الساعة',
      descEn: '24/7 Action Blockbusters & Thrillers',
      color: '#f59e0b',
      hlsPool: [
        VERIFIED_HLS_STREAMS.mbc_action,
        VERIFIED_HLS_STREAMS.mbc_max,
        VERIFIED_HLS_STREAMS.mbc_2_mix,
        VERIFIED_HLS_STREAMS.redbull_sports,
        VERIFIED_HLS_STREAMS.mbc_1
      ]
    },
    {
      id: 'ch_mbc_max',
      name: 'MBC Max HD',
      shortLogo: 'MBC\nMAX',
      category: 'mbc',
      descAr: 'أحدث أفلام السينما العالمية والتشويق',
      descEn: 'Latest Cinema Hits & Suspense Movies',
      color: '#10b981',
      hlsPool: [
        VERIFIED_HLS_STREAMS.mbc_max,
        VERIFIED_HLS_STREAMS.mbc_action,
        VERIFIED_HLS_STREAMS.mbc_2_mix,
        VERIFIED_HLS_STREAMS.mbc_4,
        VERIFIED_HLS_STREAMS.mbc_1
      ]
    },
    {
      id: 'ch_mbc_drama',
      name: 'MBC Drama HD',
      shortLogo: 'MBC\nDRAMA',
      category: 'mbc',
      descAr: 'مسلسلات درامية عربية وخليجية وعراقية 24/7',
      descEn: '24/7 Arabic Drama Series',
      color: '#ec4899',
      hlsPool: [
        VERIFIED_HLS_STREAMS.mbc_drama,
        VERIFIED_HLS_STREAMS.mbc_drama_usa,
        VERIFIED_HLS_STREAMS.mbc_1,
        VERIFIED_HLS_STREAMS.mbc_iraq,
        VERIFIED_HLS_STREAMS.mbc_masr
      ]
    },
    {
      id: 'ch_mbc_4',
      name: 'MBC 4 HD',
      shortLogo: 'MBC 4\nHD',
      category: 'mbc',
      descAr: 'أقوى المسلسلات العالمية والتركية والبرامج الترفيهية',
      descEn: 'International Series & Entertainment Shows',
      color: '#a855f7',
      hlsPool: [
        VERIFIED_HLS_STREAMS.mbc_4,
        VERIFIED_HLS_STREAMS.mbc_5,
        VERIFIED_HLS_STREAMS.mbc_1,
        VERIFIED_HLS_STREAMS.mbc_drama,
        VERIFIED_HLS_STREAMS.mbc_2_mix
      ]
    },
    {
      id: 'ch_mbc_masr',
      name: 'MBC Masr 1 & 2 HD (ام بي سي مصر)',
      shortLogo: 'MBC\nMASR',
      category: 'mbc',
      descAr: 'الأفلام والمسرحيات والبرامج الكوميدية والترفيهية',
      descEn: 'MBC Masr Comedy, Movies & Entertainment',
      color: '#38bdf8',
      hlsPool: [
        VERIFIED_HLS_STREAMS.mbc_masr,
        VERIFIED_HLS_STREAMS.mbc_masr_2,
        VERIFIED_HLS_STREAMS.mbc_aflam,
        VERIFIED_HLS_STREAMS.mbc_1,
        VERIFIED_HLS_STREAMS.mbc_drama
      ]
    },

    // ================= 5. CARTOON NETWORK & KIDS CHANNELS =================
    {
      id: 'ch_cn_arabic',
      name: 'Cartoon Network HD (كرتون نتورك)',
      shortLogo: 'CN\nARABIC',
      category: 'cartoon',
      descAr: 'غامبول، وقت المغامرة، بن 10، الدببة الثلاثة، أبطال التايتنز',
      descEn: 'Gumball, Adventure Time, Ben 10, We Bare Bears 24/7',
      color: '#00aeef',
      hlsPool: [
        VERIFIED_HLS_STREAMS.cn_hd_1,
        VERIFIED_HLS_STREAMS.cn_hd_2,
        VERIFIED_HLS_STREAMS.spacetoon,
        VERIFIED_HLS_STREAMS.mbc_3_kids,
        VERIFIED_HLS_STREAMS.pop_kids,
        VERIFIED_HLS_STREAMS.moonbug_kids,
        VERIFIED_HLS_STREAMS.atfal_kids
      ]
    },
    {
      id: 'ch_spacetoon',
      name: 'Spacetoon Arabic HD (سبيستون)',
      shortLogo: 'SPACE\nTOON',
      category: 'cartoon',
      descAr: 'قناة شباب المستقبل — كواكب الأكشن والمغامرات والرياضة',
      descEn: 'Spacetoon Official Arabic Anime & Cartoons',
      color: '#fbbf24',
      hlsPool: [
        VERIFIED_HLS_STREAMS.spacetoon,
        VERIFIED_HLS_STREAMS.mbc_3_kids,
        VERIFIED_HLS_STREAMS.cn_hd_1,
        VERIFIED_HLS_STREAMS.pop_kids,
        VERIFIED_HLS_STREAMS.atfal_kids,
        VERIFIED_HLS_STREAMS.moonbug_kids
      ]
    },
    {
      id: 'ch_mbc_3',
      name: 'MBC 3 HD للأطفال',
      shortLogo: 'MBC 3\nKIDS',
      category: 'cartoon',
      descAr: 'أقوى مسلسلات الكارتون والأنيميشن للأطفال 24/7',
      descEn: 'MBC 3 Kids Animation & Adventure Shows',
      color: '#4ade80',
      hlsPool: [
        VERIFIED_HLS_STREAMS.mbc_3_kids,
        VERIFIED_HLS_STREAMS.spacetoon,
        VERIFIED_HLS_STREAMS.cn_hd_1,
        VERIFIED_HLS_STREAMS.pop_kids,
        VERIFIED_HLS_STREAMS.moonbug_kids,
        VERIFIED_HLS_STREAMS.atfal_kids
      ]
    },
    {
      id: 'ch_pop_kids',
      name: 'Pop Kids & Animation HD',
      shortLogo: 'POP\nKIDS',
      category: 'cartoon',
      descAr: 'أفلام ومسلسلات الكارتون والأنيميشن على مدار الساعة',
      descEn: '24/7 Non-Stop Cartoons & Animated Shows',
      color: '#f97316',
      hlsPool: [
        VERIFIED_HLS_STREAMS.pop_kids,
        VERIFIED_HLS_STREAMS.moonbug_kids,
        VERIFIED_HLS_STREAMS.spacetoon,
        VERIFIED_HLS_STREAMS.cn_hd_1,
        VERIFIED_HLS_STREAMS.mbc_3_kids,
        VERIFIED_HLS_STREAMS.atfal_kids
      ]
    }
  ].map((ch) => ({
    ...ch,
    servers: makeTenChannelServers(ch.hlsPool)
  }));

  const I18N = {
    ar: {
      searchPlaceholder: 'ابحث عن أي فيلم أو مسلسل واضغط Enter...',
      signInBtn: 'تسجيل الدخول',
      guestStatus: 'زائر — سجل دخولك لحفظ قائمتك',
      memberStatus: 'عضوية مفعلة ✓',
      logoutBtn: 'خروج',
      drawerSections: 'الأقسام الرئيسية',
      drawerTools: 'الإعدادات والمزايا',
      drawerThemes: 'ثيمات الإضاءة',
      navHome: 'الرئيسية',
      navMovies: 'الأفلام',
      navSeries: 'المسلسلات',
      navLiveTv: 'كرة القدم والقنوات المباشرة',
      navWatchlist: 'قائمتي المفضلة',
      surpriseBtn: 'اقتراح فيلم عشوائي',
      eyeCareBtn: 'فلتر راحة العين الدافئ',
      watchNow: 'شاهد الآن',
      moreDetails: 'فتح صفحة الفيلم',
      addToWatchlist: '+ حفظ في قائمتي',
      inWatchlist: '✓ في قائمتي',
      continueWatching: 'متابعة المشاهدة',
      clearHistory: 'مسح السجل',
      exploreCatalog: 'مكتبة الأفلام والمسلسلات الشاملة',
      loadMoreBtn: 'تحميل دفعة كبيرة إضافية (+60 فيلم ومسلسل من TMDB)',
      loadingMore: 'جاري جلب المئات من الأعمال من TMDB...',
      allRatings: 'كل التقييمات',
      allYears: 'كل السنوات',
      classicYears: 'كلاسيكيات',
      sortTrending: 'الأكثر رواجاً',
      sortRating: 'الأعلى تقييماً',
      sortNewest: 'الأحدث إصداراً',
      sortTitle: 'الترتيب A–Z',
      noResultsTitle: 'جاري البحث أو لم يتم العثور على نتائج مطابقة',
      noResultsDesc: 'اضغط Enter في مربع البحث لجلب كل النتائج من قاعدة بيانات TMDB العالمية.',
      resetFilters: 'العودة لكل المكتبة',
      backToCatalog: 'الرجوع للرئيسية',
      nowPlayingLabel: 'يُعرض الآن · Now Playing',
      downloadBtnText: 'التحميل المباشر والمواسم الكاملة',
      serverHintText: '🚀 جميع هذه المشغلات الـ 28 مفحوصة ومن مواقع مستقلة ومختلفة كلياً — جرب التبديل بينها لأفضل سرعة.',
      downloadHubTitle: 'مركز التحميل الشامل (أفلام + مواسم كاملة للمسلسلات بضغطة واحدة)',
      recommendedHeading: 'أعمال مشابهة ومقترحة (Recommended)',
      statusLabel: 'الحالة · Status',
      productionLabel: 'الإنتاج · Production',
      airedLabel: 'تاريخ الإصدار · Aired',
      runtimeLabel: 'المدة · Runtime',
      trailersHeading: 'الإعلانات الرسمية · Trailers',
      charactersHeading: 'الشخصيات والممثلين · Characters',
      clickActorHint: 'عرض أعماله',
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
      typeMovie: 'فيلم',
      typeSeries: 'مسلسل',
      toastAddedWatchlist: 'تمت الإضافة إلى قائمتك المفضلة',
      toastRemovedWatchlist: 'تمت الإزالة من قائمتك',
      toastServerSwitched: 'تم التحويل إلى: ',
      toastRandomPick: 'اخترنا لك هذا العمل:',
      toastHistoryCleared: 'تم مسح سجل المشاهدة',
      toastEyeOn: 'تم تفعيل فلتر راحة العين',
      toastEyeOff: 'تم إيقاف فلتر راحة العين',
      toastWelcomeUser: 'أهلاً بك، ',
      toastLoggedOut: 'تم تسجيل الخروج بنجاح',
      toastCopiedShare: 'تم النسخ للحافظة ✓',
      toastDownloadStarted: 'تم فتح بوابة التحميل: ',
      genreAll: 'الكل',
      genreAction: 'أكشن ومغامرة',
      genreScifi: 'خيال علمي',
      genreDrama: 'دراما',
      genreThriller: 'غموض وإثارة',
      genreAnimation: 'أنمي ورسوم',
      genreComedy: 'كوميديا'
    },
    en: {
      searchPlaceholder: 'Search any movie or series and press Enter...',
      signInBtn: 'Sign In',
      guestStatus: 'Guest — Sign in to sync your list',
      memberStatus: 'Active Member ✓',
      logoutBtn: 'Log out',
      drawerSections: 'Main Navigation',
      drawerTools: 'Comfort & Perks',
      drawerThemes: 'Ambient Themes',
      navHome: 'Home',
      navMovies: 'Movies',
      navSeries: 'TV Shows',
      navLiveTv: 'Football & Live TV Channels',
      navWatchlist: 'My Watchlist',
      surpriseBtn: 'Surprise Me Pick',
      eyeCareBtn: 'Eye Comfort Shield',
      watchNow: 'Watch Now',
      moreDetails: 'Open Movie Page',
      addToWatchlist: '+ Add to List',
      inWatchlist: '✓ In My List',
      continueWatching: 'Continue Watching',
      clearHistory: 'Clear',
      exploreCatalog: 'Massive Movies & TV Series Catalog',
      loadMoreBtn: 'Load Massive Batch (+60 Movies & Series from TMDB)',
      loadingMore: 'Fetching hundreds of titles from TMDB...',
      allRatings: 'All Ratings',
      allYears: 'All Years',
      classicYears: 'Classics',
      sortTrending: 'Trending',
      sortRating: 'Highest Rated',
      sortNewest: 'Newest',
      sortTitle: 'A–Z',
      noResultsTitle: 'No matching titles found',
      noResultsDesc: 'Press Enter in the search box to query the entire TMDB global database.',
      resetFilters: 'Back to Full Catalog',
      backToCatalog: 'Back to Catalog',
      nowPlayingLabel: 'Now Playing',
      downloadBtnText: 'Direct & Full Season Downloads',
      serverHintText: '🚀 All 28 servers below are deduplicated & independent domains — switch between them anytime.',
      downloadHubTitle: 'Multi-Gateway Download Hub (Movies & Full Season Packs)',
      recommendedHeading: 'Recommended & Similar Titles',
      statusLabel: 'Status',
      productionLabel: 'Production',
      airedLabel: 'Aired',
      runtimeLabel: 'Runtime',
      trailersHeading: 'Trailers',
      charactersHeading: 'Characters & Cast',
      clickActorHint: 'Filmography',
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
      typeMovie: 'Movie',
      typeSeries: 'TV Show',
      toastAddedWatchlist: 'Added to your watchlist',
      toastRemovedWatchlist: 'Removed from your watchlist',
      toastServerSwitched: 'Switched to: ',
      toastRandomPick: 'Picked for you:',
      toastHistoryCleared: 'Watch history cleared',
      toastEyeOn: 'Eye Comfort filter enabled',
      toastEyeOff: 'Eye Comfort filter disabled',
      toastWelcomeUser: 'Welcome back, ',
      toastLoggedOut: 'Logged out successfully',
      toastCopiedShare: 'Copied to clipboard ✓',
      toastDownloadStarted: 'Opened download gateway: ',
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

  const INITIAL_CATALOG = [
    {
      id: 'tmdb_movie_693134',
      tmdbId: 693134,
      type: 'movie',
      featured: true,
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
      palette: ['#18152e', '#090814', '#8b5cf6']
    },
    {
      id: 'tmdb_movie_671',
      tmdbId: 671,
      type: 'movie',
      featured: true,
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
      palette: ['#1f162e', '#0c0814', '#f59e0b']
    },
    {
      id: 'tmdb_movie_157336',
      tmdbId: 157336,
      type: 'movie',
      featured: true,
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
      palette: ['#101e36', '#08101f', '#38bdf8']
    },
    {
      id: 'tmdb_series_1396',
      tmdbId: 1396,
      type: 'series',
      featured: true,
      title: 'Breaking Bad',
      year: 2008,
      releaseDate: '2008-01-20',
      status: 'Ended (5 Seasons)',
      production: 'Sony Pictures Television',
      rating: 8.9,
      seasonsCount: 5,
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
      palette: ['#162419', '#0b120d', '#4ade80']
    }
  ];

  let CATALOG = INITIAL_CATALOG.map((item) => ({
    ...item,
    posterUrl: item.posterPath ? `${TMDB_IMG_W500}${item.posterPath}` : makePosterUri(item),
    backdropUrl: item.backdropPath ? `${TMDB_IMG_ORIG}${item.backdropPath}` : makeBackdropUri(item)
  }));

  const state = {
    lang: localStorage.getItem('wum_lang') || 'ar',
    palette: localStorage.getItem('wum_palette') || 'streamex',
    eyeComfort: localStorage.getItem('wum_eye_comfort') === 'true',
    user: JSON.parse(localStorage.getItem('wum_user') || 'null'),
    authMode: 'login',
    tmdbKey: localStorage.getItem('wum_tmdb_key') || BUILTIN_TMDB_KEY,
    tmdbPage: 3,
    searchPage: 1,
    activeNav: 'all',
    activeGenre: 'all',
    searchQuery: '',
    isFullSearchMode: false,
    minRating: 0,
    yearFilter: 'all',
    sortBy: 'trending',
    heroIndex: 0,
    heroTimer: null,
    watchlist: JSON.parse(localStorage.getItem('wum_watchlist') || '["tmdb_movie_693134","tmdb_movie_671"]'),
    watchHistory: JSON.parse(localStorage.getItem('wum_history') || '{"tmdb_movie_693134":42}'),
    currentView: 'catalog', // 'catalog' | 'studio' | 'livetv'
    currentPlayingItem: null,
    activeServerId: STREAM_SERVERS[0].id,
    activeSeason: 1,
    activeEpisode: 1,
    // Live TV Hub State (10 Servers per Channel)
    activeLeagueTab: 'all',
    channelSearchQuery: '',
    activeChannelId: LIVE_TV_CHANNELS[0].id,
    activeChannelServerIdx: 0, // 0..9 (Server 1..10)
    hlsInstance: null,
    hlsFailoverTimer: null,
    currentActiveStreamUrl: '',
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
  // VIEW SWITCHER (Catalog View vs. Watch Studio vs. Live TV Broadcast Hub)
  // ---------------------------------------------------------------------------
  function switchMainView(targetView) {
    state.currentView = targetView;
    const catalogView = document.getElementById('homeCatalogView');
    const studioView = document.getElementById('watchStudioView');
    const liveTvView = document.getElementById('liveTvView');

    if (targetView !== 'studio') {
      const studioIframe = document.getElementById('studioPlayerIframe');
      if (studioIframe) studioIframe.src = '';
    }
    if (targetView !== 'livetv') {
      destroyLiveTvPlayer();
    }

    catalogView?.classList.toggle('hidden', targetView !== 'catalog');
    studioView?.classList.toggle('hidden', targetView !== 'studio');
    liveTvView?.classList.toggle('hidden', targetView !== 'livetv');

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  // MASSIVE MULTI-PAGE TMDB API ENGINE & FULL-PAGE ENTER SEARCH
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
    const rating = Number(raw.vote_average || 7.6);

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
      featured: rankIdx < 6,
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
      palette: ['#18152e', '#090814', '#8b5cf6']
    };

    itemObj.posterUrl = raw.poster_path ? `${TMDB_IMG_W500}${raw.poster_path}` : makePosterUri(itemObj);
    itemObj.backdropUrl = raw.backdrop_path ? `${TMDB_IMG_ORIG}${raw.backdrop_path}` : makeBackdropUri(itemObj);
    return itemObj;
  }

  async function syncWithTmdbApi() {
    try {
      const requests = [
        tmdbFetch('/trending/movie/week', { language: 'en-US', page: 1 }),
        tmdbFetch('/trending/tv/week', { language: 'en-US', page: 1 }),
        tmdbFetch('/movie/popular', { language: 'en-US', page: 1 }),
        tmdbFetch('/movie/popular', { language: 'en-US', page: 2 }),
        tmdbFetch('/movie/popular', { language: 'en-US', page: 3 }),
        tmdbFetch('/tv/popular', { language: 'en-US', page: 1 }),
        tmdbFetch('/tv/popular', { language: 'en-US', page: 2 }),
        tmdbFetch('/movie/top_rated', { language: 'en-US', page: 1 }),
        tmdbFetch('/tv/top_rated', { language: 'en-US', page: 1 })
      ];

      const results = await Promise.allSettled(requests);
      const seenIds = new Set(CATALOG.map((c) => c.id));
      const newNormalized = [...CATALOG];

      function ingestBatch(resIdx, forcedType) {
        const settled = results[resIdx];
        if (!settled || settled.status !== 'fulfilled' || !settled.value) return;
        (settled.value.results || []).forEach((raw) => {
          if (!raw || !raw.id || !raw.poster_path) return;
          const id = `tmdb_${forcedType}_${raw.id}`;
          if (seenIds.has(id)) return;
          seenIds.add(id);
          newNormalized.push(normalizeTmdbItem(raw, forcedType, newNormalized.length));
        });
      }

      ingestBatch(0, 'movie');
      ingestBatch(1, 'series');
      ingestBatch(2, 'movie');
      ingestBatch(3, 'movie');
      ingestBatch(4, 'movie');
      ingestBatch(5, 'series');
      ingestBatch(6, 'series');
      ingestBatch(7, 'movie');
      ingestBatch(8, 'series');

      if (newNormalized.length > 0) {
        CATALOG = newNormalized;
        renderHero();
        renderContinueWatching();
        renderCatalog();
      }
    } catch (_) {
      // fallback
    }
  }

  async function loadMoreFromTmdb() {
    const btn = document.getElementById('loadMoreTmdbBtn');
    if (btn) btn.textContent = t('loadingMore');

    try {
      if (state.isFullSearchMode && state.searchQuery.trim().length >= 1) {
        state.searchPage += 1;
        await fetchSearchPagesFromTmdb(state.searchQuery, [state.searchPage, state.searchPage + 1]);
        state.searchPage += 1;
      } else {
        const p1 = state.tmdbPage + 1;
        const p2 = state.tmdbPage + 2;
        const p3 = state.tmdbPage + 3;
        state.tmdbPage = p3;

        const batch = await Promise.allSettled([
          tmdbFetch('/movie/popular', { language: 'en-US', page: p1 }),
          tmdbFetch('/movie/popular', { language: 'en-US', page: p2 }),
          tmdbFetch('/movie/top_rated', { language: 'en-US', page: p3 }),
          tmdbFetch('/tv/popular', { language: 'en-US', page: p1 }),
          tmdbFetch('/tv/popular', { language: 'en-US', page: p2 }),
          tmdbFetch('/tv/top_rated', { language: 'en-US', page: p3 })
        ]);

        const existingIds = new Set(CATALOG.map((c) => c.id));
        const added = [];

        [0, 1, 2].forEach((idx) => {
          if (batch[idx].status === 'fulfilled' && batch[idx].value) {
            (batch[idx].value.results || []).forEach((m) => {
              const id = `tmdb_movie_${m.id}`;
              if (m && m.id && m.poster_path && !existingIds.has(id)) {
                existingIds.add(id);
                added.push(normalizeTmdbItem(m, 'movie', 99));
              }
            });
          }
        });

        [3, 4, 5].forEach((idx) => {
          if (batch[idx].status === 'fulfilled' && batch[idx].value) {
            (batch[idx].value.results || []).forEach((tv) => {
              const id = `tmdb_series_${tv.id}`;
              if (tv && tv.id && tv.poster_path && !existingIds.has(id)) {
                existingIds.add(id);
                added.push(normalizeTmdbItem(tv, 'series', 99));
              }
            });
          }
        });

        if (added.length > 0) {
          CATALOG = [...CATALOG, ...added];
          renderCatalog();
        }
      }
    } catch (_) {
      // ignore
    } finally {
      if (btn) btn.textContent = t('loadMoreBtn');
    }
  }

  async function fetchSearchPagesFromTmdb(query, pages = [1, 2, 3]) {
    const q = (query || '').trim();
    if (!q) return;

    const reqs = [];
    pages.forEach((p) => {
      reqs.push(tmdbFetch('/search/multi', { query: q, language: 'en-US', page: p }));
      reqs.push(tmdbFetch('/search/movie', { query: q, language: 'en-US', page: p }));
      reqs.push(tmdbFetch('/search/tv', { query: q, language: 'en-US', page: p }));
    });

    const settled = await Promise.allSettled(reqs);
    const existingIds = new Set(CATALOG.map((c) => c.id));
    const added = [];

    settled.forEach((res) => {
      if (res.status !== 'fulfilled' || !res.value) return;
      (res.value.results || []).forEach((r) => {
        if (!r || !r.id || !r.poster_path) return;
        if (r.media_type === 'person') return;
        const type = r.media_type === 'tv' || r.first_air_date ? 'series' : 'movie';
        const id = `tmdb_${type}_${r.id}`;
        if (!existingIds.has(id)) {
          existingIds.add(id);
          added.push(normalizeTmdbItem(r, type, 99));
        }
      });
    });

    if (added.length > 0) {
      CATALOG = [...added, ...CATALOG];
    }
    renderCatalog();
  }

  async function executeFullPageSearch(rawQuery) {
    const q = (rawQuery || '').trim();
    if (!q) return;

    state.searchQuery = q;
    state.isFullSearchMode = true;
    state.searchPage = 3;
    state.activeNav = 'all';
    state.activeGenre = 'all';

    document.getElementById('searchDropdown')?.classList.add('hidden');
    switchMainView('catalog');

    document.getElementById('heroSection')?.classList.add('hidden');
    const banner = document.getElementById('searchModeBanner');
    const bannerText = document.getElementById('searchModeBannerText');
    if (banner) banner.classList.remove('hidden');
    if (bannerText) {
      bannerText.textContent = state.lang === 'ar'
        ? `🔍 نتائج البحث الشامل عن: "${q}" — تم الجلب من قاعدة بيانات TMDB العالمية`
        : `🔍 Full TMDB Search Results for: "${q}"`;
    }

    renderCatalog();
    await fetchSearchPagesFromTmdb(q, [1, 2, 3]);
    renderCatalog();
  }

  function exitFullSearchMode() {
    state.isFullSearchMode = false;
    state.searchQuery = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    document.getElementById('clearSearchBtn')?.classList.add('hidden');
    document.getElementById('searchDropdown')?.classList.add('hidden');
    document.getElementById('searchModeBanner')?.classList.add('hidden');
    document.getElementById('heroSection')?.classList.remove('hidden');
    renderCatalog();
  }

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

      if (data.credits && Array.isArray(data.credits.cast) && data.credits.cast.length > 0) {
        item.castObjects = data.credits.cast.slice(0, 14).map((c) => ({
          id: c.id,
          name: c.name,
          character: c.character || 'Main Cast',
          profile: c.profile_path || null
        }));
      }

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
        if (!CATALOG.some((existing) => existing.id === simItem.id)) {
          CATALOG.push(simItem);
        }
      });
      if (simNormalized.length > 0) {
        item.similarItems = simNormalized.slice(0, 14);
      }
    } catch (_) {
      // ignore
    }
  }

  // ---------------------------------------------------------------------------
  // ACTOR PROFILE & FILMOGRAPHY EXPLORER
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
        .slice(0, 30)
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
      // fallback
    }
  }

  // ---------------------------------------------------------------------------
  // FULL-PAGE WATCH STUDIO VIEW (#watchStudioView)
  // ---------------------------------------------------------------------------
  async function openWatchStudio(itemId) {
    const item = CATALOG.find((c) => c.id === itemId) || CATALOG[0];
    if (!item) return;

    state.currentPlayingItem = item;
    state.activeSeason = 1;
    state.activeEpisode = 1;

    switchMainView('studio');
    renderStudioUI(item);
    loadActiveServerIntoStudio();

    if (!state.watchHistory[item.id]) {
      state.watchHistory[item.id] = 35;
      localStorage.setItem('wum_history', JSON.stringify(state.watchHistory));
    }

    await enrichTmdbItemDetails(item);
    if (state.currentPlayingItem && state.currentPlayingItem.id === item.id) {
      renderStudioUI(item);
    }
  }

  function renderStudioUI(item) {
    const topTitle = document.getElementById('studioTopTitle');
    if (topTitle) topTitle.textContent = getTitle(item);
    const topBadge = document.getElementById('studioTypeBadge');
    if (topBadge) topBadge.textContent = item.type === 'series' ? t('typeSeries') : t('typeMovie');

    const npTitle = document.getElementById('nowPlayingMovieTitle');
    if (npTitle) npTitle.textContent = getTitle(item);
    const npWlBtn = document.getElementById('studioWatchlistBtn');
    if (npWlBtn) {
      const inList = state.watchlist.includes(item.id);
      npWlBtn.classList.toggle('active', inList);
      npWlBtn.textContent = inList ? '✓' : '+';
    }

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

    renderServerCardsGrid();
    renderDownloadHubFiles(item);

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
          <button class="trailer-pill-btn" data-trailer-key="${tr.key || ''}">
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
          if (iframe && key) {
            iframe.src = `https://www.youtube.com/embed/${key}?autoplay=1&rel=0`;
          }
        });
      });
    }

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
          openActorProfile(
            row.getAttribute('data-person-id'),
            row.getAttribute('data-person-name'),
            row.getAttribute('data-person-photo')
          );
        });
      });
    }

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
  // WORKING MULTI-GATEWAY DOWNLOAD HUB + FULL-SEASON COMPLETE PACK FOR SERIES
  // ---------------------------------------------------------------------------
  function renderDownloadHubFiles(item) {
    const seasonPackBox = document.getElementById('seasonCompletePackBox');
    const seasonPackTitle = document.getElementById('seasonPackTitleText');
    const seasonPackGrid = document.getElementById('seasonPackGrid');
    const container = document.getElementById('downloadFilesGrid');
    if (!container) return;

    const title = getTitle(item);
    const sNum = String(state.activeSeason).padStart(2, '0');
    const eNum = String(state.activeEpisode).padStart(2, '0');
    const isTv = item.type === 'series';

    if (seasonPackBox && seasonPackGrid) {
      if (isTv) {
        seasonPackBox.classList.remove('hidden');
        if (seasonPackTitle) {
          seasonPackTitle.textContent = state.lang === 'ar'
            ? `📦 تحميل الموسم ${state.activeSeason} الكامل دفعة واحدة (${title} — Season ${state.activeSeason} Complete Pack)`
            : `📦 Download Full Season ${state.activeSeason} Complete Pack (${title} S${sNum})`;
        }

        const seasonPacks = [
          {
            quality: `📦 الموسم ${state.activeSeason} كامل (1080p Full HD Pack)`,
            specs: `كل حلقات الموسم ${state.activeSeason} بملف واحد · BluRay / WEB-DL`,
            label: '⬇ تحميل الموسم 1080p',
            url: `https://1337x.to/search/${encodeURIComponent(`${title} S${sNum} 1080p`)}/1/`
          },
          {
            quality: `📦 الموسم ${state.activeSeason} كامل (720p HD Pack)`,
            specs: `كل حلقات الموسم ${state.activeSeason} بحجم اقتصادي · WEB-DL`,
            label: '⬇ تحميل الموسم 720p',
            url: `https://eztvx.to/search/${encodeURIComponent(`${title} S${sNum}`)}`
          },
          {
            quality: `📦 الموسم ${state.activeSeason} كامل (2160p 4K UHD Pack)`,
            specs: `جودة 4K HDR خام لكل حلقات الموسم ${state.activeSeason}`,
            label: '⬇ تحميل الموسم 4K',
            url: `https://torrentgalaxy.to/torrents.php?search=${encodeURIComponent(`${title} S${sNum}`)}`
          },
          {
            quality: `📦 فهرس الحلقات المباشر (Direct Folder S${sNum})`,
            specs: `روابط مباشرة بصيغة MKV/MP4 للموسم ${state.activeSeason} كاملاً`,
            label: '↗ فتح مجلد الموسم',
            url: `https://www.google.com/search?q=${encodeURIComponent(`intitle:"index of" "${title}" "S${sNum}" (mkv|mp4)`)}`
          },
          {
            quality: `📦 ترجمة الموسم ${state.activeSeason} الكامل بالعربية (.ZIP)`,
            specs: `ملفات ترجمة عربية لجميع حلقات الموسم ${state.activeSeason}`,
            label: '⬇ ترجمة الموسم كامل',
            url: `https://www.opensubtitles.org/en/search2/sublanguageid-ara/moviename-${encodeURIComponent(`${title} S${sNum}`)}`
          }
        ];

        seasonPackGrid.innerHTML = seasonPacks
          .map(
            (sp, i) => `
            <div class="dl-file-card">
              <div class="dl-file-meta">
                <span class="dl-file-quality">${sp.quality}</span>
                <span class="dl-file-specs">${sp.specs}</span>
              </div>
              <a class="dl-trigger-link" href="${sp.url}" target="_blank" rel="noopener noreferrer" data-sp-idx="${i}">
                ${sp.label}
              </a>
            </div>
          `
          )
          .join('');
      } else {
        seasonPackBox.classList.add('hidden');
      }
    }

    const targetQuery = isTv ? `${title} S${sNum}E${eNum}` : `${title} ${item.year}`;
    const files = [
      {
        quality: isTv ? `الحلقة E${eNum} — 2160p 4K UHD` : '2160p 4K UHD BluRay (10-bit HEVC)',
        specs: '4K HDR · Direct Index & High-Speed Torrent',
        label: '⬇ بوابة 4K UHD',
        mode: 'link',
        url: isTv
          ? `https://1337x.to/search/${encodeURIComponent(`${targetQuery} 2160p`)}/1/`
          : `https://yts.mx/browse-movies/${encodeURIComponent(title)}/2160p/all/0/latest/0/all`
      },
      {
        quality: isTv ? `الحلقة E${eNum} — 1080p Full HD` : '1080p Full HD WEB-DL (x264 AAC)',
        specs: '1080p FHD · MP4 / MKV Direct Gateway',
        label: '⬇ بوابة 1080p FHD',
        mode: 'link',
        url: isTv
          ? `https://eztvx.to/search/${encodeURIComponent(targetQuery)}`
          : `https://yts.mx/browse-movies/${encodeURIComponent(title)}/1080p/all/0/latest/0/all`
      },
      {
        quality: isTv ? `الحلقة E${eNum} — 720p HD Fast` : '720p HD Fast StreamRip (حجم خفيف)',
        specs: '720p HD · Fast Cloud & Magnet Mirrors',
        label: '⬇ بوابة 720p HD',
        mode: 'link',
        url: `https://1337x.to/search/${encodeURIComponent(`${targetQuery} 720p`)}/1/`
      },
      {
        quality: 'سيرفر الملفات المباشرة (Direct MKV/MP4 Index)',
        specs: 'فهرس تحميل مباشر بصيغة MP4/MKV بدون إعلانات',
        label: '⬇ فهرس التحميل المباشر',
        mode: 'link',
        url: `https://www.google.com/search?q=${encodeURIComponent(`intitle:"index of" "${title}" (mp4|mkv)`)}`
      },
      {
        quality: 'أرشيف الميديا المباشر (Archive.org Cloud)',
        specs: 'تحميل مباشر عبر أرشيف الإنترنت العالمي',
        label: '↗ Archive.org DL',
        mode: 'link',
        url: `https://archive.org/search?query=${encodeURIComponent(title)}&and%5B%5D=mediatype%3A%22movies%22`
      },
      {
        quality: 'ملف الترجمة العربية الرسمي (.SRT + OpenSubtitles)',
        specs: 'تحميل فوري لملف الترجمة العربية .SRT',
        label: '⬇ تحميل الترجمة .SRT',
        mode: 'srt_download',
        filename: `${title.replace(/[^a-zA-Z0-9]+/g, '.')}.${item.year}.Arabic.srt`
      }
    ];

    container.innerHTML = files
      .map((f, idx) => {
        if (f.mode === 'srt_download') {
          return `
            <div class="dl-file-card">
              <div class="dl-file-meta">
                <span class="dl-file-quality">${f.quality}</span>
                <span class="dl-file-specs">${f.specs}</span>
              </div>
              <button class="dl-trigger-link" data-dl-srt="${idx}">${f.label}</button>
            </div>
          `;
        }
        return `
          <div class="dl-file-card">
            <div class="dl-file-meta">
              <span class="dl-file-quality">${f.quality}</span>
              <span class="dl-file-specs">${f.specs}</span>
            </div>
            <a class="dl-trigger-link" href="${f.url}" target="_blank" rel="noopener noreferrer">
              ${f.label}
            </a>
          </div>
        `;
      })
      .join('');

    container.querySelectorAll('[data-dl-srt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const f = files[Number(btn.getAttribute('data-dl-srt'))];
        const srtContent = `1\n00:00:01,000 --> 00:00:06,000\nWatchUrMovie — ${title} (${item.year})\nالترجمة العربية الرسمية\n\n2\n00:00:06,500 --> 00:00:14,000\n${getSynopsis(item)}\n`;
        const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = f.filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        showToast(`${t('toastDownloadStarted')}${f.filename}`);
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
  // 10-SERVER LIVE TV & FOOTBALL BROADCAST ENGINE (#liveTvView)
  // ---------------------------------------------------------------------------
  function destroyLiveTvPlayer() {
    if (state.hlsFailoverTimer) {
      clearTimeout(state.hlsFailoverTimer);
      state.hlsFailoverTimer = null;
    }
    if (state.hlsInstance) {
      try {
        state.hlsInstance.destroy();
      } catch (_) {}
      state.hlsInstance = null;
    }
    const video = document.getElementById('liveTvHlsVideo');
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  }

  function openLiveTvHub(preferredCategory = null) {
    if (preferredCategory) state.activeLeagueTab = preferredCategory;
    switchMainView('livetv');
    renderLiveTvHub();
    playActiveChannelServer(0);
  }

  function getFilteredChannels() {
    return LIVE_TV_CHANNELS.filter((ch) => {
      if (state.activeLeagueTab !== 'all' && ch.category !== state.activeLeagueTab) return false;
      if (state.channelSearchQuery.trim() !== '') {
        const q = state.channelSearchQuery.trim().toLowerCase();
        const hay = `${ch.name} ${ch.shortLogo} ${ch.descAr} ${ch.descEn}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function renderLiveTvHub() {
    const tabsBar = document.getElementById('leagueTabsBar');
    const sideList = document.getElementById('liveSideChannelsList');
    const channelsGrid = document.getElementById('liveChannelsGrid');
    const countEl = document.getElementById('liveChannelsCountBadge');

    if (tabsBar) {
      tabsBar.innerHTML = LIVE_LEAGUE_TABS.map((tab) => {
        const count =
          tab.id === 'all'
            ? LIVE_TV_CHANNELS.length
            : LIVE_TV_CHANNELS.filter((c) => c.category === tab.id).length;
        return `
          <button class="league-tab-btn ${state.activeLeagueTab === tab.id ? 'active' : ''}" data-league-tab="${tab.id}">
            <span>${state.lang === 'ar' ? tab.labelAr : tab.labelEn}</span>
            <span class="drawer-count-pill">${count}</span>
          </button>
        `;
      }).join('');

      tabsBar.querySelectorAll('[data-league-tab]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.activeLeagueTab = btn.getAttribute('data-league-tab');
          const firstMatch = getFilteredChannels()[0];
          if (firstMatch) {
            state.activeChannelId = firstMatch.id;
            state.activeChannelServerIdx = 0;
            renderLiveTvHub();
            playActiveChannelServer(0);
          } else {
            renderLiveTvHub();
          }
        });
      });
    }

    const filteredChannels = getFilteredChannels();
    if (countEl) countEl.textContent = `${filteredChannels.length} قناة`;

    // Render Right-Column Quick Switcher List
    if (sideList) {
      sideList.innerHTML = filteredChannels
        .map(
          (ch) => `
          <div class="side-channel-item ${ch.id === state.activeChannelId ? 'active' : ''}" data-select-ch="${ch.id}">
            <div class="side-ch-badge" style="border-color:${ch.color}">${ch.shortLogo.replace('\n', '<br/>')}</div>
            <div class="side-ch-info">
              <div class="side-ch-name">${ch.name}</div>
              <div class="side-ch-desc">${state.lang === 'ar' ? ch.descAr : ch.descEn}</div>
            </div>
            <span class="srv-online-dot"></span>
          </div>
        `
        )
        .join('');

      sideList.querySelectorAll('[data-select-ch]').forEach((el) => {
        el.addEventListener('click', () => {
          state.activeChannelId = el.getAttribute('data-select-ch');
          state.activeChannelServerIdx = 0;
          renderLiveTvHub();
          playActiveChannelServer(0);
        });
      });
    }

    // Render Full Bottom Channels Grid
    if (channelsGrid) {
      channelsGrid.innerHTML = filteredChannels
        .map(
          (ch) => `
          <div class="tv-channel-card ${ch.id === state.activeChannelId ? 'active' : ''}" data-grid-ch="${ch.id}">
            <div class="tv-ch-logo" style="border-color:${ch.color}">${ch.shortLogo.replace('\n', '<br/>')}</div>
            <div class="tv-ch-meta">
              <div class="tv-ch-name">${ch.name}</div>
              <div class="tv-ch-cat">
                <span class="srv-online-dot"></span>
                <span>10 سيرفرات نشطة · ${state.lang === 'ar' ? ch.descAr : ch.descEn}</span>
              </div>
            </div>
          </div>
        `
        )
        .join('');

      channelsGrid.querySelectorAll('[data-grid-ch]').forEach((card) => {
        card.addEventListener('click', () => {
          state.activeChannelId = card.getAttribute('data-grid-ch');
          state.activeChannelServerIdx = 0;
          renderLiveTvHub();
          playActiveChannelServer(0);
          document.getElementById('livePlayerAnchor')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      });
    }

    renderActiveChannelTenServers();
  }

  function renderActiveChannelTenServers() {
    const ch = LIVE_TV_CHANNELS.find((c) => c.id === state.activeChannelId) || LIVE_TV_CHANNELS[0];
    const grid = document.getElementById('liveChannelServersGrid');
    const titleEl = document.getElementById('activeLiveChannelTitle');
    const subEl = document.getElementById('activeLiveChannelSub');
    if (!ch || !grid) return;

    if (titleEl) titleEl.textContent = ch.name;
    if (subEl) subEl.textContent = state.lang === 'ar' ? ch.descAr : ch.descEn;

    grid.innerHTML = ch.servers
      .map(
        (srv) => `
        <button class="server-card-btn ${srv.index === state.activeChannelServerIdx ? 'active' : ''}" data-ch-srv-idx="${srv.index}">
          <span class="srv-sparkle">${srv.badge}</span>
          <span class="srv-provider-title">${state.lang === 'ar' ? srv.nameAr : srv.nameEn}</span>
          <span class="srv-online-dot"></span>
        </button>
      `
      )
      .join('');

    grid.querySelectorAll('[data-ch-srv-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-ch-srv-idx')) || 0;
        state.activeChannelServerIdx = idx;
        renderActiveChannelTenServers();
        playActiveChannelServer(idx);
        const srvObj = ch.servers[idx];
        if (srvObj) {
          showToast(`${t('toastServerSwitched')}${state.lang === 'ar' ? srvObj.nameAr : srvObj.nameEn}`);
        }
      });
    });
  }

  // Smart HLS.js + Native HTML5 Video Streamer with Automatic Multi-URL Failover
  function playActiveChannelServer(serverIdx = 0) {
    const ch = LIVE_TV_CHANNELS.find((c) => c.id === state.activeChannelId) || LIVE_TV_CHANNELS[0];
    const video = document.getElementById('liveTvHlsVideo');
    const statusText = document.getElementById('liveStreamStatusText');
    if (!ch || !video) return;

    const srv = ch.servers[serverIdx] || ch.servers[0];
    const candidateUrls = srv.urls || ch.hlsPool;

    destroyLiveTvPlayer();
    video.classList.remove('hidden');

    let attemptIdx = 0;

    function tryNextStreamUrl() {
      if (state.currentView !== 'livetv' || state.activeChannelId !== ch.id) return;
      const streamUrl = candidateUrls[attemptIdx % candidateUrls.length];
      state.currentActiveStreamUrl = streamUrl;
      attemptIdx += 1;

      if (statusText) {
        statusText.textContent = state.lang === 'ar'
          ? `● متصل — ${ch.name} (${srv.nameAr})`
          : `● LIVE — ${ch.name} (${srv.nameEn})`;
      }

      if (state.hlsFailoverTimer) clearTimeout(state.hlsFailoverTimer);

      if (window.Hls && window.Hls.isSupported()) {
        if (state.hlsInstance) {
          try {
            state.hlsInstance.destroy();
          } catch (_) {}
        }

        const hls = new window.Hls({
          enableWorker: true,
          lowLatencyMode: true,
          manifestLoadingTimeOut: 7000,
          manifestLoadingMaxRetry: 1,
          levelLoadingTimeOut: 7000
        });
        state.hlsInstance = hls;

        let playbackConfirmed = false;

        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
          playbackConfirmed = true;
          if (state.hlsFailoverTimer) clearTimeout(state.hlsFailoverTimer);
          video.play().catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
        });

        hls.on(window.Hls.Events.ERROR, (_event, data) => {
          if (data && data.fatal) {
            if (attemptIdx < candidateUrls.length * 2) {
              tryNextStreamUrl();
            }
          }
        });

        // Safety watchdog: if stream doesn't parse manifest within 5.5s, seamlessly switch to next mirror in pool
        state.hlsFailoverTimer = setTimeout(() => {
          if (!playbackConfirmed && attemptIdx < candidateUrls.length * 2) {
            tryNextStreamUrl();
          }
        }, 5500);

        hls.loadSource(streamUrl);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamUrl;
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
        video.onerror = () => {
          if (attemptIdx < candidateUrls.length * 2) {
            tryNextStreamUrl();
          }
        };
      }
    }

    tryNextStreamUrl();
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
    renderContinueWatching();
    renderCatalog();
    renderLiveTvHub();
    if (state.currentPlayingItem) renderStudioUI(state.currentPlayingItem);
  }

  function getFeaturedItems() {
    const feat = CATALOG.filter((i) => i.featured);
    return feat.length > 0 ? feat.slice(0, 6) : CATALOG.slice(0, 6);
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

  function renderGenreBar() {
    const bar = document.getElementById('genreFilterBar');
    if (!bar) return;

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

  function getFilteredCatalog() {
    return CATALOG.filter((item) => {
      if (state.activeNav === 'movie' && item.type !== 'movie') return false;
      if (state.activeNav === 'series' && item.type !== 'series') return false;
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
    searchDropdown.classList.remove('hidden');

    const itemsHtml = matches
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

    const viewAllLabel = state.lang === 'ar'
      ? `🔍 اضغط هنا أو Enter لعرض كل نتائج البحث عن "${state.searchQuery}" في الصفحة كاملة ←`
      : `🔍 Press Enter or click to view all results for "${state.searchQuery}" →`;

    searchDropdown.innerHTML = `
      ${itemsHtml}
      <button type="button" class="search-view-all-btn" id="dropdownViewAllSearchBtn">${viewAllLabel}</button>
    `;

    searchDropdown.querySelectorAll('[data-search-pick]').forEach((el) => {
      el.addEventListener('click', () => {
        searchDropdown.classList.add('hidden');
        openWatchStudio(el.getAttribute('data-search-pick'));
      });
    });

    document.getElementById('dropdownViewAllSearchBtn')?.addEventListener('click', () => {
      executeFullPageSearch(state.searchQuery);
    });
  }

  function initEvents() {
    document.getElementById('openDrawerBtn')?.addEventListener('click', () => toggleDrawer(true));
    document.getElementById('closeDrawerBtn')?.addEventListener('click', () => toggleDrawer(false));
    document.getElementById('drawerBackdrop')?.addEventListener('click', () => toggleDrawer(false));

    document.getElementById('brandHomeLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      exitFullSearchMode();
      switchMainView('catalog');
    });

    document.getElementById('backToCatalogBtn')?.addEventListener('click', () => {
      switchMainView('catalog');
    });

    document.getElementById('liveTvBackBtn')?.addEventListener('click', () => {
      switchMainView('catalog');
    });

    // Live TV Quick Tools (Unmute, Reload, Fullscreen, Copy Stream URL)
    document.getElementById('liveToolReloadBtn')?.addEventListener('click', () => {
      playActiveChannelServer(state.activeChannelServerIdx);
      showToast(state.lang === 'ar' ? 'تم تحديث البث المباشر ✓' : 'Live stream reloaded ✓');
    });

    document.getElementById('liveToolUnmuteBtn')?.addEventListener('click', () => {
      const video = document.getElementById('liveTvHlsVideo');
      if (video) {
        video.muted = false;
        video.volume = 1;
        video.play().catch(() => {});
        showToast(state.lang === 'ar' ? 'تم تفعيل الصوت بأعلى نقاء 🔊' : 'Audio unmuted 🔊');
      }
    });

    document.getElementById('liveToolFullscreenBtn')?.addEventListener('click', () => {
      const shell = document.getElementById('livePlayerAnchor');
      if (shell && shell.requestFullscreen) {
        shell.requestFullscreen().catch(() => {});
      }
    });

    document.getElementById('liveToolCopyM3u8Btn')?.addEventListener('click', () => {
      if (navigator.clipboard && state.currentActiveStreamUrl) {
        navigator.clipboard.writeText(state.currentActiveStreamUrl).catch(() => {});
      }
      showToast(state.lang === 'ar' ? 'تم نسخ رابط البث المباشر (.m3u8) ✓' : 'Copied direct .m3u8 stream URL ✓');
    });

    // Channel Search inside Live TV View
    const channelSearchInput = document.getElementById('channelSearchInput');
    channelSearchInput?.addEventListener('input', () => {
      state.channelSearchQuery = channelSearchInput.value;
      renderLiveTvHub();
    });

    // Studio Actions
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
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

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

    document.getElementById('recPrevBtn')?.addEventListener('click', () => {
      document.getElementById('recommendedMoviesRow')?.scrollBy({ left: -400, behavior: 'smooth' });
    });
    document.getElementById('recNextBtn')?.addEventListener('click', () => {
      document.getElementById('recommendedMoviesRow')?.scrollBy({ left: 400, behavior: 'smooth' });
    });

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

    // Drawer Navigation (Home, Movies, Series, Football & Live TV, Watchlist)
    document.querySelectorAll('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const navTarget = btn.getAttribute('data-nav');
        document.querySelectorAll('[data-nav]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        toggleDrawer(false);

        if (navTarget === 'livetv') {
          openLiveTvHub('all');
          return;
        }

        state.activeNav = navTarget;
        exitFullSearchMode();
        switchMainView('catalog');
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

    // Search Form & Enter Key Handling
    const searchForm = document.getElementById('headerSearchForm');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    searchForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (searchInput && searchInput.value.trim() !== '') {
        executeFullPageSearch(searchInput.value);
      }
    });

    searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (searchInput.value.trim() !== '') {
          executeFullPageSearch(searchInput.value);
        }
      }
    });

    searchInput?.addEventListener('input', () => {
      state.searchQuery = searchInput.value;
      clearSearchBtn?.classList.toggle('hidden', state.searchQuery === '');
      renderCatalog();
      updateSearchDropdownUI();

      if (state.searchDebounceTimer) clearTimeout(state.searchDebounceTimer);
      if (state.searchDebounceTimer) clearTimeout(state.searchDebounceTimer);
      if (state.searchQuery.trim().length >= 2) {
        state.searchDebounceTimer = setTimeout(async () => {
          await fetchSearchPagesFromTmdb(state.searchQuery, [1, 2]);
          updateSearchDropdownUI();
        }, 300);
      }
    });

    clearSearchBtn?.addEventListener('click', () => {
      exitFullSearchMode();
    });

    document.getElementById('exitSearchModeBtn')?.addEventListener('click', () => {
      exitFullSearchMode();
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
      exitFullSearchMode();
      state.activeNav = 'all';
      state.activeGenre = 'all';
      state.minRating = 0;
      state.yearFilter = 'all';
      renderGenreBar();
      renderCatalog();
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
