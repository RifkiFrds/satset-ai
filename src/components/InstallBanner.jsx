import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

const InstallBanner = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // auto hide ketika 5 detik
    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // tampilkan prompt install
        deferredPrompt.prompt();

        // tunggu user memilih
        const { outcome } = await deferredPrompt.userChoice;

        // setelah user memilih, reset prompt dan hide banner
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Install Satset AI
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Akses lebih cepat dan gunakan secara offline dengan menginstall aplikasi ini.
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleInstallClick}
                            className="flex-1 bg-[#647DEB] hover:bg-[#5064bd] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <Download size={16} />
                            Install
                        </button>
                        <button
                            onClick={handleClose}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Nanti Saja
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleClose}
                    className="ml-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default InstallBanner;
