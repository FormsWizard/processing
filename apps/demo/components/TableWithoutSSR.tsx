"use client";

import dynamic from "next/dynamic"

/** The component uses yjs-webrtc.
 *  This is not available with SSR.
 *  Solution:
 *  https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
 **/
export const TableWithProvider = dynamic(() => import('ui').then(module => module.TableWithProvider), {
    ssr: false
  })
