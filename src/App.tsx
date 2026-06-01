/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  defaultSiteSettings,
  defaultPortfolios,
  defaultBlogs,
  defaultInquiries,
  defaultSEOMeta,
} from "./initialData";
import { SiteSettings, PortfolioItem, BlogItem, Inquiry, SEOMeta } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import PortfolioGrid from "./components/PortfolioGrid";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import AdminPanel from "./components/AdminPanel";
import { Sparkles, Settings2, Instagram, MessageCircle, Linkedin } from "lucide-react";
import KORIXALogo from "./components/KORIXALogo";

export default function App() {
  // 1. Core Config States loaded from LocalStorage
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const cached = localStorage.getItem("korixa_settings");
      return cached ? JSON.parse(cached) : defaultSiteSettings;
    } catch {
      return defaultSiteSettings;
    }
  });

  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(() => {
    try {
      const cached = localStorage.getItem("korixa_portfolios");
      if (cached) {
        const parsed: PortfolioItem[] = JSON.parse(cached);
        // Check if there are legacy categories like 'Logo', 'Website', or 'Branding'
        const hasLegacyCategory = parsed.some(
          (item: any) =>
            item.category === "Logo" ||
            item.category === "Website" ||
            item.category === "Branding"
        );
        // Check if there are legacy images that mismatch product descriptions (e.g. grass, high-vis jacket, bicycle)
        const hasLegacyImages = parsed.some(
          (item: any) =>
            item.imageUrl.includes("luxury_luggage_locker") || // old luxury luggage locker without tethers
            (item.id === "port-8" && !item.title.includes("Plus")) ||
            item.imageUrl.includes("1558002038-1055907df827") || // old port-6 unsplash
            item.imageUrl.includes("1584622650111-993a426fbf0a") || // old port-7 unsplash
            item.imageUrl.includes("1540555700478-4be289fbecef") || // old port-8 unsplash
            item.imageUrl.includes("1574634534894") || // old multi smart locker image
            item.imageUrl.includes("1520038410233") || // old basement locker image
            item.imageUrl.includes("1540575467063") || // old ABS plastic locker image
            item.imageUrl.includes("basement_cage_locker") || // old prison-like cages basement locker image
            item.imageUrl.includes("abs_plastic_locker_1780288762071") || // old single plastic locker image
            item.imageUrl.includes("1510074377623") ||
            item.imageUrl.includes("1535131749006") ||
            item.imageUrl.includes("1504917595217") ||
            item.imageUrl.includes("1586023492125") || // old wood locker unsplash
            item.imageUrl.includes("1595246140625") || // old steel locker unsplash
            (item.id === "port-5" && item.category !== "Smart")
        );
        // Force sync with newly updated comprehensive defaultPortfolios if legacy cache is detected
        if (hasLegacyCategory || hasLegacyImages || parsed.length < defaultPortfolios.length) {
          localStorage.setItem("korixa_portfolios", JSON.stringify(defaultPortfolios));
          return defaultPortfolios;
        }
        return parsed;
      }
      return defaultPortfolios;
    } catch {
      return defaultPortfolios;
    }
  });

  const [blogs, setBlogs] = useState<BlogItem[]>(() => {
    try {
      const cached = localStorage.getItem("korixa_blogs");
      return cached ? JSON.parse(cached) : defaultBlogs;
    } catch {
      return defaultBlogs;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const cached = localStorage.getItem("korixa_inquiries");
      return cached ? JSON.parse(cached) : defaultInquiries;
    } catch {
      return defaultInquiries;
    }
  });

  const [seoSettings, setSeoSettings] = useState<SEOMeta>(() => {
    try {
      const cached = localStorage.getItem("korixa_seo");
      return cached ? JSON.parse(cached) : defaultSEOMeta;
    } catch {
      return defaultSEOMeta;
    }
  });

  // 2. Navigation & UI States
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // 3. Persist State Changes in LocalStorage securely
  useEffect(() => {
    localStorage.setItem("korixa_settings", JSON.stringify(settings));
    
    // Dynamically update page title & meta-description tags for visual SEO representation!
    document.title = seoSettings.metaTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", seoSettings.metaDescription);
  }, [settings, seoSettings.metaTitle, seoSettings.metaDescription]);

  useEffect(() => {
    localStorage.setItem("korixa_portfolios", JSON.stringify(portfolios));
  }, [portfolios]);

  useEffect(() => {
    localStorage.setItem("korixa_blogs", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem("korixa_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem("korixa_seo", JSON.stringify(seoSettings));
  }, [seoSettings]);

  // Handle new inquiries from ContactUs client form
  const handleAddInquiry = (newInq: Omit<Inquiry, "id" | "date" | "status">) => {
    const formattedDate = new Date();
    const dateString = `${formattedDate.getFullYear()}-${String(formattedDate.getMonth() + 1).padStart(2, "0")}-${String(formattedDate.getDate()).padStart(2, "0")} ${String(formattedDate.getHours()).padStart(2, "0")}:${String(formattedDate.getMinutes()).padStart(2, "0")}`;
    
    const fullyFormed: Inquiry = {
      ...newInq,
      id: "inq_" + Date.now(),
      date: dateString,
      status: "pending"
    };

    setInquiries([fullyFormed, ...inquiries]);
  };

  // Helper theme mappings
  const getFontClass = () => {
    switch (settings.fontStyle) {
      case "serif":
        return "font-serif-style";
      case "display":
        return "font-display-style";
      case "mono":
        return "font-mono-style";
      default:
        return "font-sans-style";
    }
  };

  const getAccentTextClass = () => {
    switch (settings.accentColor) {
      case "green":
        return "text-emerald-500";
      case "purple":
        return "text-violet-500";
      case "orange":
        return "text-orange-500";
    }
  };

  const handleContactClick = () => {
    setActiveSection("contact");
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Brand overrides color and sizing converter
  const customAccentColor = settings.customAccentHex || (settings.accentColor === "green" ? "#10B981" : settings.accentColor === "orange" ? "#F97316" : "#8B5CF6");
  
  const getThemeVars = () => {
    switch (settings.customThemeMode) {
      case "dark":
        return {
          bg: "#0f172a",
          cardBg: "#1e293b",
          text: "#f8fafc",
          textMuted: "#94a3b8",
          border: "#334155"
        };
      case "ivory":
        return {
          bg: "#faf5ec",
          cardBg: "#f4ede0",
          text: "#1c120c",
          textMuted: "#5c4d44",
          border: "#decfbd"
        };
      case "midnight":
        return {
          bg: "#030712",
          cardBg: "#0b0f19",
          text: "#f3f4f6",
          textMuted: "#9ca3af",
          border: "#1f2937"
        };
      default: // light
        return {
          bg: "#ffffff",
          cardBg: "#f8fafc",
          text: "#0f172a",
          textMuted: "#4b5563",
          border: "#e5e7eb"
        };
    }
  };

  const themeVars = getThemeVars();

  return (
    <div id="app-root-container" className={`${getFontClass()} bg-white min-h-screen text-gray-900 selection:bg-slate-100 relative transition-colors duration-300`}>
      
      {/* 0. Real-time Injector of Custom Style Configurations */}
      <style>{`
        :root {
          --brand-primary: ${customAccentColor};
          --brand-bg: ${themeVars.bg};
          --brand-card: ${themeVars.cardBg};
          --brand-text: ${themeVars.text};
          --brand-text-muted: ${themeVars.textMuted};
          --brand-border: ${themeVars.border};
          --h-offset: ${settings.headingFontSizeOffset || 0}px;
          --b-offset: ${settings.bodyFontSizeOffset || 0}px;
        }

        /* Accent text overrides */
        .text-violet-500, .text-emerald-500, .text-orange-500 {
          color: var(--brand-primary) !important;
        }
        
        /* Accent background overrides */
        .bg-violet-500, .bg-emerald-500, .bg-orange-500 {
          background-color: var(--brand-primary) !important;
        }

        .hover\\:bg-violet-600:hover, .hover\\:bg-emerald-600:hover, .hover\\:bg-orange-600:hover {
          background-color: var(--brand-primary) !important;
          filter: brightness(0.9) !important;
        }

        /* Border overrides */
        .border-violet-500, .border-emerald-500, .border-orange-500 {
          border-color: var(--brand-primary) !important;
        }

        .border-violet-100, .border-emerald-100, .border-orange-100 {
          border-color: var(--brand-border) !important;
        }

        .bg-violet-50, .bg-emerald-50, .bg-orange-50 {
          background-color: var(--brand-card) !important;
        }

        /* Real-time Theme Overrides on Container */
        #app-root-container {
          background-color: var(--brand-bg) !important;
          color: var(--brand-text) !important;
        }

        /* Global Typography Scaling Overrides */
        h1, h2, h3, .heading-scale {
          font-size: calc(100% + var(--h-offset)) !important;
        }
        
        p, span:not(.font-mono), li, label, textarea, input, .body-scale {
          font-size: calc(100% + var(--b-offset)) !important;
        }

        /* Card theme overlays */
        #services .bg-white, #portfolio .bg-white, #blog .bg-white, #contact .bg-white {
          background-color: var(--brand-card) !important;
          color: var(--brand-text) !important;
          border-color: var(--brand-border) !important;
        }

        /* Change section layouts backgrounds natively based on selected theme */
        #services, #portfolio, #blog, #contact {
          background-color: var(--brand-bg) !important;
          border-color: var(--brand-border) !important;
        }

        /* Input overrides */
        #contact input, #contact textarea, #contact select {
          background-color: var(--brand-card) !important;
          border-color: var(--brand-border) !important;
          color: var(--brand-text) !important;
        }

        input:focus, textarea:focus, select:focus {
          border-color: var(--brand-primary) !important;
        }

        /* Navbar & footer adaptive dark controls */
        nav {
          background-color: ${settings.customThemeMode === "light" ? "rgba(255, 255, 255, 0.82)" : "rgba(11, 15, 25, 0.82)"} !important;
          border-color: var(--brand-border) !important;
        }
        nav button {
          color: ${settings.customThemeMode === "light" ? "#1e293b" : "#f1f5f9"} !important;
        }
        nav button:hover {
          color: var(--brand-primary) !important;
        }

        /* Map and indicator accents */
        .glow-green {
          box-shadow: 0 0 15px ${customAccentColor}22 !important;
        }
      `}</style>
      
      {/* 1. Header Navigation */}
      <Navbar
        settings={settings}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
      />

      {/* 2. Primary Sections */}
      <main className="relative">
        
        {/* Real-time Indicator banner if in administrator mode */}
        {isAdminMode && (
          <div className="fixed bottom-6 left-6 z-40 bg-slate-900 border border-slate-750 text-white rounded-2xl p-4.5 shadow-2xl glass-panel flex items-center gap-4 animate-active-indicator max-w-sm">
            <span className="p-2 bg-rose-600 text-white rounded-lg animate-pulse">
              <Settings2 className="w-5 h-5" />
            </span>
            <div>
              <p className="font-extrabold text-xs tracking-tight">KORIXA 실시간 관리자 모드가 켜짐</p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                원하는 항목을 수정하고 대시보드를 닫으면 그대로 라이브 인터페이스에 세이브 및 최적화가 완결됩니다.
              </p>
            </div>
            <button
              onClick={() => setIsAdminMode(false)}
              className="text-slate-400 hover:text-white font-mono text-xs font-bold border-l pl-3 border-slate-800"
            >
              닫기
            </button>
          </div>
        )}

        <Hero settings={settings} onContactClick={handleContactClick} />
        
        <ServicesSection settings={settings} />
        
        <PortfolioGrid portfolios={portfolios} settings={settings} />
        
        <BlogSection blogs={blogs} settings={settings} />
        
        <ContactSection settings={settings} onAddInquiry={handleAddInquiry} />
      </main>

      {/* 3. Footer */}
      <footer className="bg-gray-950 text-gray-200 py-16 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            
            {/* Branding Block */}
            <div className="md:col-span-5 space-y-4">
              <KORIXALogo size="md" light={true} />
              <p className="text-gray-400 text-xs sm:text-sm max-w-sm leading-relaxed">
                {settings.agencySlogan} - {settings.agencyName || "KORIXA"}는 대한민국 사물함 및 무인 스마트 보관함의 가치를 최고급 디자인과 첨단 IoT 공학으로 새롭게 정의합니다.
              </p>
              
              {/* Custom Editable Links indicators */}
              <div className="flex gap-2.5 pt-2">
                <a href={settings.contactInstaLink || "#instagram"} target="_blank" rel="noreferrer" className="p-2 bg-gray-900 hover:bg-gray-850 rounded-full border border-gray-800 transition text-gray-400 hover:text-white" title="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href={settings.contactKakaoLink || "#kakaotalk"} target="_blank" rel="noreferrer" className="p-2 bg-gray-900 hover:bg-gray-850 rounded-full border border-gray-800 transition text-gray-400 hover:text-white" title="KakaoTalk">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href={settings.contactLinkedinLink || "#linkedin"} target="_blank" rel="noreferrer" className="p-2 bg-gray-900 hover:bg-gray-850 rounded-full border border-gray-800 transition text-gray-400 hover:text-white" title="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links Column (3 columns) */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs uppercase font-extrabold text-gray-400 tracking-widest border-b border-gray-900 pb-1.5 font-mono">가용 스튜디오 채널</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>
                  <a href="#services" className="hover:text-white hover:underline transition">브랜드 로고 디자인 특화</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white hover:underline transition">반응형 웹 퍼포먼스 기획</a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-white hover:underline transition">공식 크리에이티브 쇼케이스</a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-white hover:underline transition">최신 오가닉 테크 칼럼 기재</a>
                </li>
              </ul>
            </div>

            {/* Contacts Hub (4 columns) */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs uppercase font-extrabold text-gray-400 tracking-widest border-b border-gray-900 pb-1.5 font-mono">{settings.agencyName || "KORIXA"} 본사</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                본사 : {settings.contactAddress || "인천시 서구 중봉대로 490 청라더리브티아모 지식산업센터 1064호"}
              </p>
              <div className="text-xs text-gray-400 font-mono pt-1 space-y-1">
                <div>메일 : {settings.contactEmail || "admin@korixa.co.kr"}</div>
                {settings.contactPhone && <div>전화 : {settings.contactPhone}</div>}
              </div>
            </div>

          </div>

          {/* Lower Legal Frame */}
          <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-550 font-medium">
            <p className="text-gray-500">
              © 2026 {settings.agencyName || "KORIXA"} Management Group. All rights reserved. Registered under {seoSettings.author}.
            </p>
            <div className="flex gap-4 text-gray-500">
              <span className="hover:text-white cursor-pointer hover:underline">개인정보 처리방침</span>
              <span>|</span>
              <span className="hover:text-white cursor-pointer hover:underline text-[11px] font-mono">V1.8 (ADVANCED DYNAMIC BUILD)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 4. Sliding Interactive Admin Dashboard Panel */}
      {isAdminMode && (
        <AdminPanel
          settings={settings}
          setSettings={setSettings}
          portfolios={portfolios}
          setPortfolios={setPortfolios}
          blogs={blogs}
          setBlogs={setBlogs}
          inquiries={inquiries}
          setInquiries={setInquiries}
          seoSettings={seoSettings}
          setSeoSettings={setSeoSettings}
          onClose={() => setIsAdminMode(false)}
        />
      )}

    </div>
  );
}
