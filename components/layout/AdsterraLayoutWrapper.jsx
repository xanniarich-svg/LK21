// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-be9a37fc1a7ebc8a10a09ad77bfebf78');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/be9a37fc1a7ebc8a10a09ad77bfebf78/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/b7/ae/b5/b7aeb5f7577a965d2295a786f64fe3aa.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="22b52ea945e087056d7ef99d6a39813a"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/22/b5/2e/22b52ea945e087056d7ef99d6a39813a.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}