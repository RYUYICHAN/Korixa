/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, X, Settings, ShieldAlert, Sparkles } from "lucide-react";
import { SiteSettings } from "../types";
import KORIXALogo from "./KORIXALogo";

interface NavbarProps {
  settings: SiteSettings;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
}

export default function Navbar({
  settings,
  activeSection,
  setActiveSection,
  isAdminMode,
  setIsAdminMode,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "소개" },
    { id: "services", label: "서비스" },
    { id: "portfolio", label: "포트폴리오" },
    { id: "blog", label: "인사이트" },
    { id: "contact", label: "문의하기" },
  ];

  const getAccentBgClass = () => {
    switch (settings.accentColor) {
      case "green":
        return "bg-emerald-500 text-white hover:bg-emerald-600";
      case "purple":
        return "bg-violet-500 text-white hover:bg-violet-600";
      case "orange":
        return "bg-orange-500 text-white hover:bg-orange-600";
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

  const getAccentBorderClass = () => {
    switch (settings.accentColor) {
      case "green":
        return "border-emerald-500";
      case "purple":
        return "border-violet-500";
      case "orange":
        return "border-orange-500";
    }
  };

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

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo & Slogan */}
          <div className="flex flex-col justify-center cursor-pointer" onClick={() => {
            setActiveSection("home");
            const el = document.getElementById("home");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            <KORIXALogo size="md" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`text-sm font-medium tracking-tight transition-colors duration-200 relative py-2 ${
                  activeSection === item.id
                    ? `${getAccentTextClass()} font-extrabold`
                    : "text-gray-600 hover:text-gray-950"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] ${getAccentBgClass()}`} />
                )}
              </button>
            ))}
          </div>

          {/* Action Buttons: Admin Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm ${
                isAdminMode
                  ? "bg-gray-900 text-white ring-2 ring-offset-2 ring-gray-900 border-transparent"
                  : "bg-gray-50 text-gray-800 hover:bg-gray-100 hover:shadow border border-gray-200"
              }`}
            >
              <Settings className={`w-3.5 h-3.5 ${isAdminMode ? "animate-spin" : ""}`} />
              <span>관리자 대시보드</span>
              {isAdminMode && (
                <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-ping" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`p-2 rounded-full transition-colors ${
                isAdminMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"
              }`}
              title="관리자 설정"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg px-2 pt-2 pb-6 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsOpen(false);
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                activeSection === item.id
                  ? `${getAccentTextClass()} bg-gray-50 font-bold`
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 px-4 border-t border-gray-100 mt-4">
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>실시간 관리자 설정 모드</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
