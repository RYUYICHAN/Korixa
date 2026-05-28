/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Folder, Eye, Calendar, Sparkles, X, Layers, Briefcase } from "lucide-react";
import { PortfolioItem, SiteSettings } from "../types";

interface PortfolioGridProps {
  portfolios: PortfolioItem[];
  settings: SiteSettings;
}

export default function PortfolioGrid({ portfolios, settings }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedWork, setSelectedWork] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: "All", label: "전체" },
    { id: "Logo", label: "로고 디자인" },
    { id: "Website", label: "웹사이트 개발" },
    { id: "Branding", label: "브랜딩 패키지" },
  ];

  const mapCategoryToId = (cat: string) => {
    if (cat === "Logo") return "Logo";
    if (cat === "Website") return "Website";
    return "Branding"; // Branding
  };

  const filteredPortfolios = portfolios.filter((item) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Logo") return item.category === "Logo";
    if (selectedCategory === "Website") return item.category === "Website";
    return item.category === "Branding";
  });

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

  const getAccentBgClass = () => {
    switch (settings.accentColor) {
      case "green":
        return "bg-emerald-500 text-white";
      case "purple":
        return "bg-violet-500 text-white";
      case "orange":
        return "bg-orange-500 text-white";
    }
  };

  const getAccentLightBgClass = () => {
    switch (settings.accentColor) {
      case "green":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "purple":
        return "bg-violet-50 text-violet-700 border-violet-200";
      case "orange":
        return "bg-orange-50 text-orange-700 border-orange-200";
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
    <section id="portfolio" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Grid */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <span className={`text-xs uppercase font-bold tracking-widest ${getAccentTextClass()}`}>
              PORTFOLIO SHOWCASE
            </span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 mt-2 ${getFontClass()}`}>
              크리에이티브의 완성형 레코딩
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-xl">
              브랜드의 탄생을 장식한 맞춤 수작업 로고 디자인부터 비즈니스를 선도하는 하이성능 고감각 웹 플랫폼의 완성작들을 필터링해 감상하세요.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-100 self-start">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4.5 py-2 text-xs font-semibold tracking-tight transition-all rounded-lg ${
                    isActive
                      ? `${getAccentBgClass()} shadow-sm`
                      : "text-gray-500 hover:text-gray-950 hover:bg-gray-100"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolios Grid */}
        {filteredPortfolios.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
            <Layers className="w-10 h-10 mx-auto text-gray-300" />
            <p className="text-gray-500 text-sm mt-4 font-medium">선택하신 카테고리의 포트폴리오 항목이 비어 있습니다.</p>
            <p className="text-xs text-gray-400 mt-1">우측 상단 관리자 대시보드에서 신규 포트폴리오를 마음껏 등록해 채워보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolios.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedWork(item)}
                className="group cursor-pointer bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:translate-y-[-4px]"
              >
                {/* Image Container with Hover Zoom Effects */}
                <div className="relative overflow-hidden aspect-video bg-gray-100 border-b border-gray-50">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category badge */}
                  <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border shadow-sm ${getAccentLightBgClass()}`}>
                    {item.category === "Logo" ? "로고" : item.category === "Website" ? "웹사이트" : "브랜딩"}
                  </span>
                  
                  {/* Hover visual utility layer */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-3.5 bg-white text-gray-950 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                      <Eye className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {/* Card Info Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-medium text-gray-400 block mb-1 uppercase tracking-wider">
                      Client: {item.client}
                    </span>
                    <h3 className={`text-lg font-bold text-gray-950 tracking-tight leading-snug group-hover:text-violet-500 line-clamp-1 transition-colors ${getFontClass()}`}>
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 mt-5 pt-4 border-t border-gray-50 font-medium">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className={`font-semibold group-hover:underline text-[11px] ${getAccentTextClass()}`}>
                      상세 정보 보기 →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Portfolio Showcase Detail Modal */}
        {selectedWork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              {/* Image Banner */}
              <div className="relative h-64 sm:h-80 bg-gray-100">
                <img
                  src={selectedWork.imageUrl}
                  alt={selectedWork.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedWork(null)}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Informational Details */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase py-1 px-3 border rounded-full tracking-wider ${getAccentLightBgClass()}`}>
                    {selectedWork.category === "Logo" ? "로고 디자인" : selectedWork.category === "Website" ? "웹사이트 개발" : "브랜딩 패키지"}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded">
                    제작 시기: {selectedWork.date}
                  </span>
                </div>

                <h3 className={`text-2xl font-black text-gray-950 tracking-tight ${getFontClass()}`}>
                  {selectedWork.title}
                </h3>

                <div className="grid grid-cols-2 gap-4 my-5 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                  <div>
                    <span className="text-gray-400 block font-medium">클라이언트 배정 주체</span>
                    <span className="text-gray-800 font-bold text-sm mt-0.5 block">{selectedWork.client}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">검수 전문 에이전시</span>
                    <span className="text-gray-800 font-bold text-sm mt-0.5 block">KORIXA DESIGN LAB</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b pb-1">프로젝트 세부 수행 내역 및 성과</h4>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {selectedWork.description}
                  </p>
                  
                  <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100/50 flex gap-3 text-xs text-slate-600">
                    <Sparkles className={`w-5 h-5 shrink-0 ${getAccentTextClass()}`} />
                    <p>
                      KORIXA 전담 크리에이티브 디렉터단이 기획 연구 단계부터 마케팅 시안 배포까지 모니터링하여 성공적인 런칭 결과를 획득했습니다. 관리자 모드를 통해 이러한 포트폴리오의 실시간 텍스트 및 대표 그래픽을 한 번에 바꿀 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedWork(null)}
                  className="px-6 py-2.5 rounded-xl border text-xs font-semibold bg-white hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  창 닫기
                </button>
                <button
                  onClick={() => {
                    setSelectedWork(null);
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold ${getAccentBgClass()} shadow-sm`}
                >
                  유사 스타일 상세 제작 견적 상담 요청
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
