'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface AdData {
  priority: number;
  adId: string;
  title: string;
  description: string;
  type: 'banner' | 'video';
  format: string;
  fileUrl: string;
  redirectUrl: string;
  placement: string;
  duration?: string | null;
  owner: string;
  pricing: string;
  engagement: string;
}

export default function AdsDisplay() {
  const [ads, setAds] = useState<{ bannerAds: AdData[]; videoAds: AdData[] } | null>(null);

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

  if (!ads) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Banner Ads */}
      {ads.bannerAds.map((ad) => (
        <a
          key={ad.adId}
          href={ad.redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={ad.fileUrl}
            alt="Advertisement"
            width={parseInt(ad.format.split('x')[0])}
            height={parseInt(ad.format.split('x')[1])}
            style={{ objectFit: 'cover' }}
          />
        </a>
      ))}

      {/* Video Ads */}
      {ads.videoAds.map((ad) => (
        <a
          key={ad.adId}
          href={ad.redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <video
            src={ad.fileUrl}
            width="100%"
            height="auto"
            controls
            muted
            style={{ borderRadius: '12px' }}
          />
        </a>
      ))}
    </div>
  );
}
