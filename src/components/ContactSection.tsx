/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Info, Sparkles, Map, Route } from "lucide-react";
import { Inquiry, SiteSettings } from "../types";

interface ContactSectionProps {
  settings: SiteSettings;
  onAddInquiry: (inquiry: Omit<Inquiry, "id" | "date" | "status">) => void;
}

interface OfficeLocation {
  name: string;
  address: string;
  tel: string;
  hours: string;
  desc: string;
  mapEmbedUrl: string; // standard safety iFrame
}

export default function ContactSection({ settings, onAddInquiry }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState<"Smart" | "Standard" | "Consult">("Consult");
  const [message, setMessage] = useState("");
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeOfficeIndex, setActiveOfficeIndex] = useState(0);

  const offices: OfficeLocation[] = [
    {
      name: `${settings.agencyName || "KORIXA"} 본사 (HQ)`,
      address: settings.contactAddress || "인천시 서구 중봉대로 490 청라더리브티아모 지식산업센터 1064호",
      tel: settings.contactPhone || "010-4492-3810",
      hours: "월 - 금, 09:30 ~ 18:30 (점심시간 12:30 ~ 13:30)",
      desc: "IoT 통합 원격 제어 및 고유 Pantone 색상 개발 총괄 본사.",
      mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(settings.contactAddress || "인천시 서구 중봉대로 490 청라더리브티아모 지식산업센터 1064호")}&t=&z=16&ie=UTF8&iwloc=&output=embed`
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      alert("모든 필수 입력 필드를 정확하게 기입해주세요.");
      return;
    }

    onAddInquiry({
      name,
      email,
      phone,
      serviceType,
      message,
    });

    setIsSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");

    // Automatically hide success screen after 8 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 8000);
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

  const getAccentBgClass = () => {
    switch (settings.accentColor) {
      case "green":
        return "bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500";
      case "purple":
        return "bg-violet-500 hover:bg-violet-600 focus:ring-violet-500";
      case "orange":
        return "bg-orange-500 hover:bg-orange-600 focus:ring-orange-500";
    }
  };

  const getAccentBorderClass = () => {
    switch (settings.accentColor) {
      case "green":
        return "border-emerald-500 focus:ring-emerald-500 text-emerald-800";
      case "purple":
        return "border-violet-500 focus:ring-violet-500 text-violet-800";
      case "orange":
        return "border-orange-500 focus:ring-orange-500 text-orange-850";
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
    <section id="contact" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-xs uppercase font-bold tracking-widest ${getAccentTextClass()}`}>
            CONTACT KORIXA
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 mt-2 ${getFontClass()}`}>
            혁신의 파트너를 선택할 타이밍
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-4">
            전문 에이전시 KORIXA팀과 가볍게 커피 미팅을 잡거나 메일로 문의하세요.<br className="hidden sm:inline" />
            작성하신 문의는 관리자 패널의 문의 대장 항목에 실시간 연계되어 체계적으로 트래킹됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Inquiry Form (7 columns) */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col justify-between">
            {isSubmitted ? (
              <div className="text-center py-16 flex flex-col items-center justify-center space-y-6 flex-1">
                <div className={`p-4 rounded-full bg-emerald-50 text-emerald-500`}>
                  <CheckCircle className="w-16 h-16 animate-bounce" />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold text-gray-900 ${getFontClass()}`}>
                    프로젝트 문의가 정상 접수되었습니다!
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                    작성해주신 가용 연락처와 이메일로 24시간 이내에 KORIXA 수석 제안 위원이 초기 매칭 가이드라인과 예상 견적 테이블 리포트를 전달합니다.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border text-xs text-gray-400 font-mono flex items-center gap-1.5">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>실시간 확인: 우측 상단 '관리자 대시보드' → '문의 로그' 탭에서 방금 보낸 원문을 바로 조회하고 일괄 처리할 수 있습니다.</span>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className={`mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-white ${getAccentBgClass()}`}
                >
                  새로운 문의하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-50 mb-4">
                  <Sparkles className={`w-4 h-4 ${getAccentTextClass()}`} />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">상담 신청 및 견적 요청</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">신청인 / 담당자명 *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="예시: 홍길동 팀장"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">비즈니스 이메일 주소 *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="예시: service@domain.co.kr"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">긴급 연락처 *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="예시: 010-1234-5678"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">인입 서비스 카테고리 *</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-gray-50/50"
                    >
                      <option value="Consult">전문 보관함 상세 비상담 및 일괄 견적 문의</option>
                      <option value="Smart">지능형 IoT 스마트 사물함 도입 문의</option>
                      <option value="Standard">소재별 프리미엄 일반 캐비닛/사물함 대량 납품</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">상세 비즈니스 요구사항 및 예산 제약사항 *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="프로젝트의 목적, 희망 완료 기한, 선호하시는 스타일 등 세부 사양을 편하게 안내해주세요. 맞춤 설계안 제공의 정확도가 높아집니다."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-gray-50/50"
                  />
                </div>

                {/* Privacy disclaimer */}
                <div className="p-3.5 bg-gray-50 rounded-xl text-[11px] text-gray-500 leading-relaxed border flex gap-2">
                  <input type="checkbox" defaultChecked className="mt-0.5 shrink-0" required id="privacy_agree" />
                  <label htmlFor="privacy_agree" className="cursor-pointer">
                    <strong>개인 정보 안전 수집 및 이용 동의 (필수):</strong> 귀하의 프로젝트 상담 목적에 한하여 성명, 이메일, 전화번호 데이터를 안전하게 관리하며 타사에 누출하지 않습니다.
                  </label>
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 transform active:scale-99 shadow-lg ${getAccentBgClass()}`}
                >
                  <Send className="w-4 h-4" />
                  <span>KORIXA 전문 상담사에게 무료 견적서 제출하기</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Block: Dynamic Interactive Office Maps & Info (5 columns) */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-50 mb-6">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className={`w-4 h-4 ${getAccentTextClass()}`} />
                  OFFICE LOCATION
                </span>
              </div>

              {/* Active office descriptions */}
              <div className="space-y-4 mb-6">
                <h3 className={`text-lg font-extrabold text-gray-950 tracking-tight flex items-center gap-1.5 ${getFontClass()}`}>
                  <span>{offices[activeOfficeIndex].name}</span>
                </h3>
                
                <p className="text-xs text-gray-500 leading-relaxed">
                  {offices[activeOfficeIndex].desc}
                </p>

                <div className="pt-3 space-y-2 border-t border-gray-50 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>{offices[activeOfficeIndex].address}</span>
                  </div>
                  {settings.contactPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>문의전화: {settings.contactPhone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>이메일: {settings.contactEmail || "admin@korixa.co.kr"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google iFrame Integrated Map */}
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square sm:aspect-video lg:aspect-square flex-1 border border-gray-100 flex items-center justify-center glow-green shadow-inner">
              {/* Actual Embedded Map */}
              <iframe
                title={offices[activeOfficeIndex].name}
                src={offices[activeOfficeIndex].mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-90 grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition duration-300"
              />

              {/* Floating aesthetic locator helper */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur px-3 py-2 rounded-xl text-[10px] font-semibold text-gray-600 shadow-lg border flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <Route className={`w-3.5 h-3.5 ${getAccentTextClass()}`} />
                  <span>실시간 Google 위성 연동 지도</span>
                </span>
                <span className={`text-[9px] uppercase ${getAccentTextClass()}`}>PIN ACTIVE</span>
              </div>
            </div>

          </div>
          
        </div>

      </div>
    </section>
  );
}
