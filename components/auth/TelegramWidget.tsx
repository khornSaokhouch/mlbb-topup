'use client';

import React, { useEffect, useRef } from 'react';

interface Props {
  botName: string;
  onAuth: (user: any) => void;
}

const TelegramWidget: React.FC<Props> = ({ botName, onAuth }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // @ts-ignore
    window.onTelegramAuth = onAuth;

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    // Strip @ if present
    const cleanBotName = botName.startsWith('@') ? botName.substring(1) : botName;
    script.setAttribute('data-telegram-login', cleanBotName);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '10');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [botName, onAuth]);

  return <div ref={containerRef} className="flex justify-center w-full" />;
};

export default TelegramWidget;
