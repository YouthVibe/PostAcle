'use client';

import { useEffect, useState } from 'react';

interface AdData {
  priority: number;
  adId: string;
  type: 'banner' | 'video';
  format: string;
  fileUrl: string;
  redirectUrl: string;
  duration?: string | null;
}

interface AdsResponse {
  bannerAds: AdData[];
  videoAds: AdData[];
}

// Utility to manage ad frequency with localStorage
const getAdHistory = () => {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem('adHistory');
  return data ? JSON.parse(data) : {};
};

const setAdHistory = (history: Record<string, { views: number; lastViewed: number }>) => {
  localStorage.setItem('adHistory', JSON.stringify(history));
};

export default function AdsDisplay({ adType }: { adType: string }) {
  const [ads, setAds] = useState<AdsResponse | null>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('https://www.post-acle.blog/ads/index.json');
        const data = await res.json();
        setAds(data);
      } catch (error) {
        console.error('Failed to fetch ads:', error);
      }
    };
    fetchAds();
  }, []);

  const getNextAd = (adsList: AdData[], currentIndex: number) => {
    if (!adsList || adsList.length === 0) return null;

    const history = getAdHistory();
    let nextIndex = currentIndex;
    let attempts = 0;

    while (attempts < adsList.length) {
      const ad = adsList[nextIndex];
      const record = history[ad.adId];

      // Filter by requested adType
      if (adType && ad.format !== adType && !(adType === 'video' && ad.type === 'video')) {
        nextIndex = (nextIndex + 1) % adsList.length;
        attempts++;
        continue;
      }

      // Check if ad is blocked for 24h
      if (record && record.views >= 5) {
        const elapsed = Date.now() - record.lastViewed;
        if (elapsed < 24 * 60 * 60 * 1000) {
          nextIndex = (nextIndex + 1) % adsList.length;
          attempts++;
          continue;
        } else {
          history[ad.adId] = { views: 0, lastViewed: 0 };
          setAdHistory(history);
        }
      }

      return ad;
    }

    return null;
  };

  const handleAdClick = (ad: AdData) => {
    const history = getAdHistory();
    if (!history[ad.adId]) {
      history[ad.adId] = { views: 0, lastViewed: 0 };
    }
    history[ad.adId].views += 1;
    history[ad.adId].lastViewed = Date.now();
    setAdHistory(history);

    window.open(ad.redirectUrl, '_blank');
  };

  if (!ads) return null;

  const currentBanner = getNextAd(ads.bannerAds, currentBannerIndex);
  const currentVideo = getNextAd(ads.videoAds, currentVideoIndex);

  return (
    <div className="flex flex-col gap-6">
      {/* Show Banner Ad */}
      {currentBanner && adType !== 'video' && (
        <div
          key={currentBanner.adId}
          onClick={() => handleAdClick(currentBanner)}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={currentBanner.fileUrl}
            alt="Advertisement"
            width={parseInt(currentBanner.format.split('x')[0])}
            height={parseInt(currentBanner.format.split('x')[1])}
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Show Video Ad */}
      {currentVideo && adType === 'video' && (
        <div
          key={currentVideo.adId}
          onClick={() => handleAdClick(currentVideo)}
          style={{ cursor: 'pointer' }}
        >
          <video
            src={currentVideo.fileUrl}
            width="100%"
            height="auto"
            controls
            muted
            style={{ borderRadius: '12px' }}
          />
        </div>
      )}
    </div>
  );
}
