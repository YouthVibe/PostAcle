'use client';

import { useEffect, useState } from 'react';

interface AdData {
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

export default function AdsDisplay({ adType }: { adType: string }) {
  const [ads, setAds] = useState<AdsResponse | null>(null);
  const [selectedAd, setSelectedAd] = useState<AdData | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/YouthVibe/PostAcle/refs/heads/main/post-acle/public/Ads/index.json'
        );
        const data: AdsResponse = await res.json();
        setAds(data);

        // Select ad pool
        let pool: AdData[] = [];
        if (adType === 'video') {
          pool = data.videoAds;
        } else {
          pool = data.bannerAds.filter(ad => ad.format === adType);
        }

        if (pool.length > 0) {
          const randomAd = pool[Math.floor(Math.random() * pool.length)];
          setSelectedAd(randomAd);
        }
      } catch (error) {
        console.error('Failed to fetch ads:', error);
      }
    };

    fetchAds();
  }, [adType]);

  if (!selectedAd) return null;

  const handleClick = (ad: AdData) => {
    window.open(ad.redirectUrl, '_blank');
  };

  return (
    <div
      key={selectedAd.adId}
      onClick={() => handleClick(selectedAd)}
      style={{ cursor: 'pointer' }}
    >
      {selectedAd.type === 'banner' ? (
        <img
          src={selectedAd.fileUrl}
          alt="Advertisement"
          width={parseInt(selectedAd.format.split('x')[0])}
          height={parseInt(selectedAd.format.split('x')[1])}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <video
          src={selectedAd.fileUrl}
          width="100%"
          height="auto"
          controls
          muted
          style={{ borderRadius: '12px' }}
        />
      )}
    </div>
  );
}
