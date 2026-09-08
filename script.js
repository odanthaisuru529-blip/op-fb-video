/**
 * OP FB Video Downloader - Main JavaScript
 * Developed by OP Web Developer
 * 
 * Features:
 * - URL validation
 * - Paste from clipboard
 * - Download interaction with API placeholder
 * - Loading spinner
 * - Error handling
 * - Result card animation
 * - Quality selector
 * - Copy link functionality
 * - FAQ accordion
 * - Dark/light mode toggle
 * - Mobile navigation
 * - Smooth scrolling
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const elements = {
        // Header
        header: document.getElementById('header'),
        nav: document.getElementById('nav'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        themeToggle: document.getElementById('themeToggle'),
        navLinks: document.querySelectorAll('.nav-link'),

        // Hero / Download
        videoUrl: document.getElementById('videoUrl'),
        pasteBtn: document.getElementById('pasteBtn'),
        downloadBtn: document.getElementById('downloadBtn'),
        errorMessage: document.getElementById('errorMessage'),
        errorText: document.getElementById('errorText'),
        resultCard: document.getElementById('resultCard'),
        videoThumbnail: document.getElementById('videoThumbnail'),
        videoTitle: document.getElementById('videoTitle'),
        videoMeta: document.getElementById('videoMeta'),
        qualitySelect: document.getElementById('qualitySelect'),
        downloadVideoBtn: document.getElementById('downloadVideoBtn'),
        copyLinkBtn: document.getElementById('copyLinkBtn'),

        // FAQ
        faqItems: document.querySelectorAll('.faq-item'),

        // Toast
        toast: document.getElementById('toast'),
        toastIcon: document.getElementById('toastIcon'),
        toastMessage: document.getElementById('toastMessage'),
    };

    // ============================================
    // Constants
    // ============================================
    const FACEBOOK_URL_PATTERNS = [
        /facebook\.com\/.*\/videos\//i,
        /fb\.watch\//i,
        /facebook\.com\/watch\//i,
        /facebook\.com\/reel\//i,
        /fb\.com\/.*\/videos\//i,
    ];

    const API_ENDPOINT = '/api/download';

    // ============================================
    // Theme / Dark Mode
    // ============================================
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    function toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    // ============================================
    // Mobile Navigation
    // ============================================
    function toggleMobileMenu() {
        elements.mobileMenuBtn.classList.toggle('active');
        elements.nav.classList.toggle('mobile-open');
        document.body.style.overflow = elements.nav.classList.contains('mobile-open') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        elements.mobileMenuBtn.classList.remove('active');
        elements.nav.classList.remove('mobile-open');
        document.body.style.overflow = '';
    }

    // ============================================
    // Smooth Scrolling & Active Nav Link
    // ============================================
    function handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = elements.header.offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            closeMobileMenu();
        }
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + elements.header.offsetHeight + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                elements.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ============================================
    // URL Validation
    // ============================================
    function isValidFacebookUrl(url) {
        if (!url || typeof url !== 'string') return false;

        const trimmed = url.trim();
        if (!trimmed) return false;

        // Check if it's a valid URL
        let parsedUrl;
        try {
            parsedUrl = new URL(trimmed);
        } catch {
            // Try adding https://
            try {
                parsedUrl = new URL(`https://${trimmed}`);
            } catch {
                return false;
            }
        }

        // Check against Facebook URL patterns
        const urlString = parsedUrl.toString().toLowerCase();
        return FACEBOOK_URL_PATTERNS.some(pattern => pattern.test(urlString));
    }

    function showError(message) {
        elements.errorText.textContent = message;
        elements.errorMessage.hidden = false;
        elements.resultCard.hidden = true;

        // Auto-hide error after 5 seconds
        setTimeout(() => {
            elements.errorMessage.hidden = true;
        }, 5000);
    }

    function hideError() {
        elements.errorMessage.hidden = true;
    }

    // ============================================
    // Paste from Clipboard
    // ============================================
    async function pasteFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                elements.videoUrl.value = text.trim();
                elements.videoUrl.focus();
                hideError();
                showToast('URL pasted from clipboard', 'success');
            }
        } catch (err) {
            // Fallback for browsers without clipboard API permission
            elements.videoUrl.focus();
            document.execCommand('paste');
            showToast('Please paste manually (Ctrl+V / Cmd+V)', 'error');
        }
    }

    // ============================================
    // Download Process (API Placeholder)
    // ============================================
    async function handleDownload() {
        const url = elements.videoUrl.value.trim();

        // Validate URL
        if (!url) {
            showError('Please enter a Facebook video URL.');
            elements.videoUrl.focus();
            return;
        }

        if (!isValidFacebookUrl(url)) {
            showError('Please enter a valid Facebook video URL. Example: facebook.com/watch?v=...');
            elements.videoUrl.focus();
            return;
        }

        hideError();
        setLoading(true);

        try {
            // ========================================
            // API INTEGRATION PLACEHOLDER
            // ========================================
            // This is where you connect your backend API.
            // Replace this fetch call with your actual API endpoint.
            // 
            // Example backend response format:
            // {
            //   success: true,
            //   data: {
            //     title: "Video Title",
            //     thumbnail: "https://...",
            //     duration: "2:30",
            //     qualities: [
            //       { quality: "1080p", url: "https://..." },
            //       { quality: "720p", url: "https://..." }
            //     ]
            //   }
            // }
            // ========================================

            /*
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'Failed to process video');
            }

            displayResult(result.data);
            */

            // ========================================
            // DEMO / PLACEHOLDER BEHAVIOR
            // ========================================
            // Since there's no backend connected yet, we simulate
            // a network delay and show a placeholder result.
            // REMOVE THIS IN PRODUCTION AND USE THE API CALL ABOVE.
            // ========================================

            await simulateNetworkDelay(1500);

            // Placeholder result data
            const placeholderData = {
                title: 'Facebook Video',
                thumbnail: `https://picsum.photos/400/250?random=${Date.now()}`,
                duration: '2:34',
                qualities: [
                    { quality: '1080p', url: '#' },
                    { quality: '720p', url: '#' },
                    { quality: '480p', url: '#' },
                    { quality: '360p', url: '#' }
                ]
            };

            displayResult(placeholderData);
            showToast('Video processed successfully! (Demo mode)', 'success');

        } catch (error) {
            console.error('Download error:', error);
            showError(
                error.message || 
                'Unable to process this video. The video may be private, restricted, or the service is temporarily unavailable.'
            );
        } finally {
            setLoading(false);
        }
    }

    function simulateNetworkDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function setLoading(isLoading) {
        elements.downloadBtn.classList.toggle('loading', isLoading);
        elements.videoUrl.disabled = isLoading;
        elements.pasteBtn.disabled = isLoading;
    }

    function displayResult(data) {
        elements.videoTitle.textContent = data.title || 'Facebook Video';
        elements.videoMeta.textContent = data.duration ? `Duration: ${data.duration}` : 'Facebook Video';
        elements.videoThumbnail.src = data.thumbnail || '';
        elements.videoThumbnail.alt = data.title || 'Video thumbnail';

        // Reset quality selector
        elements.qualitySelect.value = '720';

        elements.resultCard.hidden = false;

        // Scroll to result
        setTimeout(() => {
            elements.resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    // ============================================
    // Quality Selector & Download Actions
    // ============================================
    function handleQualityDownload() {
        const quality = elements.qualitySelect.value;
        const url = elements.videoUrl.value.trim();

        // ========================================
        // IN PRODUCTION: Trigger actual download
        // ========================================
        // const selectedQuality = data.qualities.find(q => q.quality.startsWith(quality));
        // if (selectedQuality) {
        //     window.open(selectedQuality.url, '_blank');
        // }
        // ========================================

        showToast(`Download started at ${quality}p (Connect backend API for real downloads)`, 'success');
    }

    async function handleCopyLink() {
        const url = elements.videoUrl.value.trim();

        if (!url) return;

        try {
            await navigator.clipboard.writeText(url);
            showToast('Video link copied to clipboard!', 'success');
        } catch {
            showToast('Failed to copy link. Please copy manually.', 'error');
        }
    }

    // ============================================
    // FAQ Accordion
    // ============================================
    function toggleFaq(item) {
        const isActive = item.classList.contains('active');

        // Close all other items
        elements.faqItems.forEach(faq => {
            faq.classList.remove('active');
            faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
        }
    }

    // ============================================
    // Toast Notification
    // ============================================
    let toastTimeout;

    function showToast(message, type = 'success') {
        clearTimeout(toastTimeout);

        elements.toastMessage.textContent = message;
        elements.toastIcon.textContent = type === 'error' ? '!' : '✓';
        elements.toast.classList.toggle('error', type === 'error');
        elements.toast.hidden = false;

        // Force reflow
        elements.toast.offsetHeight;

        elements.toast.classList.add('show');

        toastTimeout = setTimeout(() => {
            elements.toast.classList.remove('show');
            setTimeout(() => {
                elements.toast.hidden = true;
            }, 300);
        }, 3500);
    }

    // ============================================
    // Header Scroll Effect
    // ============================================
    function handleScroll() {
        const scrollY = window.pageYOffset;

        // Add shadow to header when scrolled
        if (scrollY > 10) {
            elements.header.style.boxShadow = 'var(--shadow)';
        } else {
            elements.header.style.boxShadow = 'none';
        }

        // Update active nav link
        updateActiveNavLink();
    }

    // ============================================
    // Keyboard Shortcuts
    // ============================================
    function handleKeyboard(e) {
        // Ctrl/Cmd + Enter to submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement === elements.videoUrl) {
            handleDownload();
        }

        // Escape to close mobile menu
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    }

    // ============================================
    // Event Listeners
    // ============================================
    function initEventListeners() {
        // Theme toggle
        elements.themeToggle.addEventListener('click', toggleTheme);

        // Mobile menu
        elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Navigation links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        // Paste button
        elements.pasteBtn.addEventListener('click', pasteFromClipboard);

        // Download button
        elements.downloadBtn.addEventListener('click', handleDownload);

        // URL input enter key
        elements.videoUrl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleDownload();
            }
        });

        // Hide error on input
        elements.videoUrl.addEventListener('input', hideError);

        // Result actions
        elements.downloadVideoBtn.addEventListener('click', handleQualityDownload);
        elements.copyLinkBtn.addEventListener('click', handleCopyLink);

        // FAQ accordion
        elements.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => toggleFaq(item));
        });

        // Scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboard);

        // Close mobile menu on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                closeMobileMenu();
            }
        });
    }

    // ============================================
    // Initialize
    // ============================================
    function init() {
        initTheme();
        initEventListeners();
        handleScroll(); // Set initial header state

        console.log('%c OP FB Video Downloader ', 'background: #2563eb; color: white; font-size: 16px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
        console.log('%c Developed by OP Web Developer ', 'color: #64748b; font-size: 12px;');
        console.log('%c Note: Connect a backend API at ' + API_ENDPOINT + ' for full functionality.', 'color: #f59e0b; font-size: 12px;');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
