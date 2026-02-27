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

        const nativeContainer = document.getElementById('container-c688e187bdc29aee0edb83d877a2dcd8');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/c688e187bdc29aee0edb83d877a2dcd8/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/a1/f4/3a/a1f43ad926c67a3de96702e8b92dfdd9.js' }
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
            if(document.querySelector(`script[src*="bd998872b03517b447721f2fd0ded07a"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/bd/99/88/bd998872b03517b447721f2fd0ded07a.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}