'use client';

import Script from "next/script";

// 728x90 Banner Ad
export function Ad728x90() {
  return (
    <div style={{ width: '728px', height: '90px' }}>
      <Script id="ad728x90-config" strategy="afterInteractive">
        {`
          atOptions = {
            'key' : 'deb90f9d9868cf984165fb6973757d04',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `}
      </Script>
      <Script
        id="ad728x90-script"
        strategy="afterInteractive"
        src="https://amuletshaped.com/deb90f9d9868cf984165fb6973757d04/invoke.js"
      />
    </div>
  );
}

// 468x60 Banner Ad
export function Ad468x60() {
  return (
    <div style={{ width: '468px', height: '60px' }}>
      <Script id="ad468x60-config" strategy="afterInteractive">
        {`
          atOptions = {
            'key' : 'b7ebe084f764e7263438a39b71a37661',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        `}
      </Script>
      <Script
        id="ad468x60-script"
        strategy="afterInteractive"
        src="https://amuletshaped.com/b7ebe084f764e7263438a39b71a37661/invoke.js"
      />
    </div>
  );
}

// 320x50 Banner Ad
export function Ad320x50() {
  return (
    <div style={{ width: '320px', height: '50px' }}>
      <Script id="ad320x50-config" strategy="afterInteractive">
        {`
          atOptions = {
            'key' : 'd8372ea9cf4ccf712e78b0f4f078b034',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        `}
      </Script>
      <Script
        id="ad320x50-script"
        strategy="afterInteractive"
        src="https://amuletshaped.com/d8372ea9cf4ccf712e78b0f4f078b034/invoke.js"
      />
    </div>
  );
}

// Optional default export (choose one to be default)
// export default Ad728x90;
