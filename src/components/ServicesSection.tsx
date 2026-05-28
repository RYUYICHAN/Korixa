/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { PenTool, Code, Sparkles, Check, Milestone, Zap, Tablet, Share2 } from "lucide-react";
import { SiteSettings } from "../types";

interface ServicesSectionProps {
  settings: SiteSettings;
}

export default function ServicesSection({ settings }: ServicesSectionProps) {
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
        return "bg-emerald-50 border-emerald-100";
      case "purple":
        return "bg-violet-50 border-violet-100";
      case "orange":
        return "bg-orange-50 border-orange-100";
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

  const logoFeatures = [
    "정밀 레이저 절단 아연강판 공법 및 이중 완충 실린더 도어",
    "180℃ 고온 친환경 분체 도장 (보라, 주황, 녹색 시그니처 배합)",
    "방수·방진 등급의 전자기계식 솔레노이드 디지털 락 잠금 장치",
    "이동·확장이 유연한 다목적 모듈형 보관함 아키텍처",
    "공공시설 및 초고층 빌딩 설치 기준 구조 안전성 평가 우수"
  ];

  const webFeatures = [
    "실시간 LTE/Wi-Fi 무선 통신 관제 대시보드 및 원격 도어 제어",
    "NFC 사원증, 모바일 앱 앱연동, QR 및 생체인식 복합 인증 지원",
    "직관적인 사용을 보장하는 중앙 터치 키오스크 UI 및 결제 연동",
    "잔여함 상태 모바일 실시간 매핑 웹 보관소 탐색 API 시스템",
    "정전/단선 등 재난 상황에 즉각 반응하는 내부 로컬 복원 표준 적용"
  ];

  return (
    <section id="services" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className={`text-xs uppercase font-bold tracking-widest ${getAccentTextClass()}`}>
            OUR EXPERTISE
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 mt-2 ${getFontClass()}`}>
            예술적 비주얼과 기술적 기능의 독보적 결합
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-4">
            KORIXA는 비즈니스 경쟁력을 견인하기 위해 독창적인 비주얼 정체성을 설계하고,<br className="hidden sm:inline" /> 
            이를 바탕으로 한 안정적인 테크 플랫폼 서비스를 최상급 품질로 제공합니다.
          </p>
        </div>

        {/* Services Split Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Logo Design Service Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            {/* Top Hover Deco Bar */}
            <div className={`absolute top-0 left-0 w-full h-[4px] transition-transform duration-300 ${
              settings.accentColor === "green" ? "bg-emerald-500" : settings.accentColor === "purple" ? "bg-violet-500" : "bg-orange-500"
            }`} />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className={`p-4 rounded-2xl ${getAccentLightBgClass()} border`}>
                  <PenTool className={`w-8 h-8 ${getAccentTextClass()}`} />
                </div>
                <span className="font-mono text-xs font-semibold text-gray-400">01 / HARDWARE ENGINEERING</span>
              </div>

              <h3 className={`text-2xl font-bold text-gray-950 tracking-tight mb-4 ${getFontClass()}`}>
                공학 기법 기반의 프리미엄 제조
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                {settings.logoDesignDescription}
              </p>

              {/* Logo features bullet items */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">하드웨어 안심 표준 보증</p>
                {logoFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${getAccentTextClass()}`} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">최장 10년 녹 방지 보장 및 신속 AS망 완비</span>
              <span className={`text-xs font-bold ${getAccentTextClass()}`}>정밀 도면 상담 →</span>
            </div>
          </div>

          {/* Web Development Service Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            {/* Top Hover Deco Bar */}
            <div className={`absolute top-0 left-0 w-full h-[4px] transition-transform duration-300 ${
              settings.accentColor === "green" ? "bg-emerald-500" : settings.accentColor === "purple" ? "bg-violet-500" : "bg-orange-500"
            }`} />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className={`p-4 rounded-2xl ${getAccentLightBgClass()} border`}>
                  <Code className={`w-8 h-8 ${getAccentTextClass()}`} />
                </div>
                <span className="font-mono text-xs font-semibold text-gray-400">02 / IOT CONTROL NETWORK</span>
              </div>

              <h3 className={`text-2xl font-bold text-gray-950 tracking-tight mb-4 ${getFontClass()}`}>
                스마트 IoT 락 솔루션 & 원격 관제
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                {settings.webDevelopmentDescription}
              </p>

              {/* Web features bullet items */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">스마트 관제 패키지 사양</p>
                {webFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${getAccentTextClass()}`} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">클라우드 중앙 원격 해제 및 실시간 통신망 적용</span>
              <span className={`text-xs font-bold ${getAccentTextClass()}`}>실시간 시스템 투어 →</span>
            </div>
          </div>
          
        </div>

        {/* Value Proposition Board */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <span className={`p-3 bg-white border border-gray-200 rounded-xl ${getAccentTextClass()}`}>
              <Milestone className="w-6 h-6" />
            </span>
            <div>
              <p className="font-bold text-gray-900 text-base">원스톱 올인원 패키지 출시 (로고 + 웹 개발)</p>
              <p className="text-xs text-gray-500 mt-0.5">신규 스타트업 및 리브랜딩 최적화: 통합 브랜드 완성 시 최대 20% 특별 우대 제공</p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className={`px-6 py-3 rounded-lg text-xs font-bold tracking-tight shrink-0 transition-opacity whitespace-nowrap ${getAccentBgClass()}`}
          >
            패키지 혜택 세부 상담받기
          </button>
        </div>

      </div>
    </section>
  );
}
