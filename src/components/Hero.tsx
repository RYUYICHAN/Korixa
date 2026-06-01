/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Unlock, 
  CheckCircle, 
  RefreshCw, 
  Smartphone, 
  QrCode, 
  CreditCard, 
  Layers, 
  FileText, 
  Pocket, 
  HelpCircle, 
  Check, 
  AlertCircle,
  Maximize2,
  Minimize2
} from "lucide-react";
import { SiteSettings } from "../types";

interface HeroProps {
  settings: SiteSettings;
  onContactClick: () => void;
}

interface Locker {
  id: string; // name
  row: number; // 1 to 5
  column: "left" | "right";
  color: "purple" | "orange" | "green";
  status: "empty" | "used";
  pin: string | null;
  heightMm: number; // 460 or 350
}

export default function Hero({ settings, onContactClick }: HeroProps) {
  // 10 lockers representing the exact 2-column, 5-row blueprint configuration
  const [lockers, setLockers] = useState<Locker[]>([
    { id: "001", row: 1, column: "left", color: "purple", status: "used", pin: "1234", heightMm: 460 },
    { id: "002", row: 2, column: "left", color: "orange", status: "empty", pin: null, heightMm: 350 },
    { id: "003", row: 3, column: "left", color: "green", status: "used", pin: "4321", heightMm: 350 },
    { id: "004", row: 4, column: "left", color: "purple", status: "empty", pin: null, heightMm: 350 },
    { id: "005", row: 5, column: "left", color: "orange", status: "empty", pin: null, heightMm: 460 },
    
    { id: "006", row: 1, column: "right", color: "green", status: "empty", pin: null, heightMm: 460 },
    { id: "007", row: 2, column: "right", color: "purple", status: "used", pin: "7777", heightMm: 350 },
    { id: "008", row: 3, column: "right", color: "green", status: "empty", pin: null, heightMm: 350 },
    { id: "009", row: 4, column: "right", color: "orange", status: "empty", pin: null, heightMm: 350 },
    { id: "010", row: 5, column: "right", color: "purple", status: "empty", pin: null, heightMm: 460 },
  ]);

  // Operational States
  const [activeTab, setActiveTab] = useState<"kiosk" | "mobile" | "blueprint">("kiosk");
  const [selectedId, setSelectedId] = useState<string>("002");
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [feedback, setFeedback] = useState<{ text: string; type: "info" | "success" | "error" }>({
    text: "이용 구분을 선택하여 코릭사 스마트 락커 서비스를 진행해 보세요.",
    type: "info",
  });

  // Kiosk Step-by-Step Flow (1. Menu, 2. Locker Select, 3. Phone/PW Input, 4. Completion)
  const [kioskStep, setKioskStep] = useState<number>(1);
  const [kioskFlowType, setKioskFlowType] = useState<"store" | "retrieve" | null>(null);
  const [kioskSelectedId, setKioskSelectedId] = useState<string>("");
  const [kioskPhone, setKioskPhone] = useState<string>("");
  const [kioskPassword, setKioskPassword] = useState<string>("");
  const [kioskActiveField, setKioskActiveField] = useState<"phone" | "password">("phone");

  // Mobile App Simulation Flow (Image 2 - 4 Steps)
  const [mobileStep, setMobileStep] = useState<number>(1);
  const [mobileSelectedLocker, setMobileSelectedLocker] = useState<string>("002");
  const [mobileActionType, setMobileActionType] = useState<"store" | "retrieve">("store");
  const [mobilePin, setMobilePin] = useState<string>("");
  const [mobileMessage, setMobileMessage] = useState<string>("");
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [paySuccess, setPaySuccess] = useState<boolean>(false);
  const [laserActive, setLaserActive] = useState<boolean>(false);

  // Active locker highlighted reference
  const selectedLocker = lockers.find((l) => l.id === selectedId);

  // Handle laser animation trigger when entering Step 1
  useEffect(() => {
    if (activeTab === "mobile" && mobileStep === 1) {
      setLaserActive(true);
      const timer = setTimeout(() => setLaserActive(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [activeTab, mobileStep]);

  const getAccentTextClass = () => {
    switch (settings.accentColor) {
      case "green":
        return "text-emerald-500";
      case "purple":
        return "text-violet-500";
      case "orange":
        return "text-orange-500";
      default:
        return "text-violet-500";
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
      default:
        return "bg-violet-500 hover:bg-violet-600 focus:ring-violet-500";
    }
  };

  const getAccentBorderClass = () => {
    switch (settings.accentColor) {
      case "green":
        return "border-emerald-500/20 bg-emerald-50/50 text-emerald-700";
      case "purple":
        return "border-violet-500/20 bg-violet-50/50 text-violet-700";
      case "orange":
        return "border-orange-500/20 bg-orange-50/50 text-orange-700";
      default:
        return "border-violet-500/20 bg-violet-50/50 text-violet-700";
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

  // Keyboard controls
  const handleKeypadPress = (val: string) => {
    if (enteredPin.length < 4) {
      setEnteredPin((prev) => prev + val);
    }
  };

  const handleKeypadClear = () => {
    setEnteredPin("");
  };

  const handleKeypadSubmit = () => {
    if (!selectedLocker) return;

    if (selectedLocker.status === "empty") {
      // Keep safety condition - must be 4 digits
      if (enteredPin.length < 4) {
        setFeedback({
          text: "⚠️ 안전한 비밀번호 설정을 위해 반드시 숫자 4자리를 정확히 입력해 주세요.",
          type: "error"
        });
        return;
      }
      setLockers((prev) =>
        prev.map((l) =>
          l.id === selectedLocker.id ? { ...l, status: "used", pin: enteredPin } : l
        )
      );
      setFeedback({
        text: `🔒 [${selectedLocker.id}번 보관함] 보관 설정 성공! 입력하신 핀코드 [ ${enteredPin} ]로 도어가 완벽히 잠겼습니다.`,
        type: "success"
      });
      setEnteredPin("");
    } else {
      // Unlock verification
      if (enteredPin === selectedLocker.pin) {
        setLockers((prev) =>
          prev.map((l) =>
            l.id === selectedLocker.id ? { ...l, status: "empty", pin: null } : l
          )
        );
        setFeedback({
          text: `🔓 인증 통과! [${selectedLocker.id}번 보관함] 잠금이 성공적으로 해제되었습니다. 물품을 수거해 가세요.`,
          type: "success"
        });
        setEnteredPin("");
      } else {
        setFeedback({
          text: `❌ 비밀번호 불일치! 입력하신 키값이 맞지 않습니다. (힌트: ${selectedLocker.pin})`,
          type: "error"
        });
        setEnteredPin("");
      }
    }
  };

  const handleSelectLocker = (id: string) => {
    setSelectedId(id);
    setEnteredPin("");
    const target = lockers.find((l) => l.id === id);
    if (target) {
      if (target.status === "used") {
        setFeedback({
          text: `[${target.id}번 사용 중] 비밀번호 4자리를 정확히 기입하여 인증하면 보관함이 자동으로 오픈됩니다.`,
          type: "info"
        });
      } else {
        setFeedback({
          text: `[${target.id}번 비어 있음] 비밀번호 4자리를 입력하고 확인을 누르면 잠금이 적용되어 물품 보관이 완료됩니다.`,
          type: "info"
        });
      }
    }
  };

  // Kiosk step action helpers (Requested workflow)
  const handleKioskMenuSelect = (type: "store" | "retrieve") => {
    setKioskFlowType(type);
    setKioskSelectedId("");
    setKioskPhone("");
    setKioskPassword("");
    setKioskActiveField("phone");
    setKioskStep(2);
    setFeedback({
      text: type === "store" 
        ? "함을 선택하세요: 비어 있는 안전 보관함(녹색)을 선택해 주십시오." 
        : "함을 선택하세요: 물품을 찾을 보관함(주황색)을 선택해 주십시오.",
      type: "info"
    });
  };

  const handleKioskSelectLocker = (id: string) => {
    const target = lockers.find(l => l.id === id);
    if (!target) return;

    if (kioskFlowType === "store") {
      if (target.status === "used") {
        setFeedback({
          text: `⚠️ [사용 불가] ${id}호 보관함은 이미 물건이 보관되어 있습니다. 다른 녹색(열기 가능) 함을 선택해 주세요.`,
          type: "error"
        });
        return;
      }
      setKioskSelectedId(id);
      setKioskStep(3);
      setKioskActiveField("phone");
      setFeedback({
        text: `📍 [${id}호 선택 완료] 핸드폰 번호와 비밀번호를 알맞게 입력해 주십시오.`,
        type: "info"
      });
    } else {
      // retrieve flow
      if (target.status === "empty") {
        setFeedback({
          text: `⚠️ [열기 가능] ${id}호 보관함은 비어 있습니다. 물품이 잠겨져 있는 주황색 보관함을 선택해 주세요.`,
          type: "error"
        });
        return;
      }
      setKioskSelectedId(id);
      setKioskStep(3);
      setKioskActiveField("password");
      setFeedback({
        text: `📍 [${id}호 선택 완료] 물품 수령을 위해 비밀번호 4자리를 정밀하게 입력해 주세요.`,
        type: "info"
      });
    }
  };

  const handleKioskKeypadPress = (val: string) => {
    if (kioskActiveField === "phone") {
      const raw = kioskPhone.replace(/[^0-9]/g, "");
      if (raw.length < 11) {
        setKioskPhone(raw + val);
      }
    } else {
      if (kioskPassword.length < 4) {
        setKioskPassword(prev => prev + val);
      }
    }
  };

  const handleKioskKeypadClear = () => {
    if (kioskActiveField === "phone") {
      setKioskPhone("");
    } else {
      setKioskPassword("");
    }
  };

  const handleKioskKeypadBackspace = () => {
    if (kioskActiveField === "phone") {
      const raw = kioskPhone.replace(/[^0-9]/g, "");
      setKioskPhone(raw.slice(0, -1));
    } else {
      setKioskPassword(prev => prev.slice(0, -1));
    }
  };

  const formatKioskPhone = (val: string) => {
    const raw = val.replace(/[^0-9]/g, "");
    if (raw.length <= 3) return raw;
    if (raw.length <= 7) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
    return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
  };

  const handleKioskSubmitStep3 = () => {
    if (!kioskSelectedId) return;
    const target = lockers.find(l => l.id === kioskSelectedId);
    if (!target) return;

    if (kioskFlowType === "store") {
      if (!kioskPhone || kioskPhone.length < 10) {
        setFeedback({
          text: "⚠️ 연락처(핸드폰 번호)를 정확히 작성해 주시기 바랍니다.",
          type: "error"
        });
        return;
      }
      if (kioskPassword.length < 4) {
        setFeedback({
          text: "⚠️ 안전한 수납을 위해 비밀번호 4자리를 전부 기입해 주세요.",
          type: "error"
        });
        return;
      }

      setLockers(prev => prev.map(l => l.id === kioskSelectedId ? { ...l, status: "used", pin: kioskPassword } : l));
      setKioskStep(4);
      setFeedback({
        text: `🎉 보관 완료! ${kioskSelectedId}호 보관함의 통신 도어락이 성공적으로 잠겼습니다.`,
        type: "success"
      });
    } else {
      // retrieve flow
      if (kioskPassword !== target.pin) {
        setFeedback({
          text: `❌ 비밀번호 인증 실패! 입력 정보가 일치하지 않습니다. (임시 관리자 힌트: ${target.pin})`,
          type: "error"
        });
        return;
      }

      setLockers(prev => prev.map(l => l.id === kioskSelectedId ? { ...l, status: "empty", pin: null } : l));
      setKioskStep(4);
      setFeedback({
        text: `🔓 수령 완료! ${kioskSelectedId}호 보관함이 기계적으로 해제되었습니다. 물품을 원격 확인 후 도어를 닫아주십시오.`,
        type: "success"
      });
    }
  };

  // Reset Lockers to Initial Preset
  const handleResetSimulator = () => {
    setLockers([
      { id: "001", row: 1, column: "left", color: "purple", status: "used", pin: "1234", heightMm: 460 },
      { id: "002", row: 2, column: "left", color: "orange", status: "empty", pin: null, heightMm: 350 },
      { id: "003", row: 3, column: "left", color: "green", status: "used", pin: "4321", heightMm: 350 },
      { id: "004", row: 4, column: "left", color: "purple", status: "empty", pin: null, heightMm: 350 },
      { id: "005", row: 5, column: "left", color: "orange", status: "empty", pin: null, heightMm: 460 },
      
      { id: "006", row: 1, column: "right", color: "green", status: "empty", pin: null, heightMm: 460 },
      { id: "007", row: 2, column: "right", color: "purple", status: "used", pin: "7777", heightMm: 350 },
      { id: "008", row: 3, column: "right", color: "green", status: "empty", pin: null, heightMm: 350 },
      { id: "009", row: 4, column: "right", color: "orange", status: "empty", pin: null, heightMm: 350 },
      { id: "010", row: 5, column: "right", color: "purple", status: "empty", pin: null, heightMm: 460 },
    ]);
    setSelectedId("002");
    setEnteredPin("");
    setMobileStep(1);
    setMobilePin("");
    setMobileSelectedLocker("002");
    setMobileMessage("");
    setKioskStep(1);
    setKioskFlowType(null);
    setKioskSelectedId("");
    setKioskPhone("");
    setKioskPassword("");
    setKioskActiveField("phone");
    setFeedback({
      text: "코릭사 보관 시스템 및 시뮬레이션 데이터를 안전하게 초기 기본값으로 원복했습니다.",
      type: "info"
    });
  };

  // Mobile steps logic (Image 2)
  const advanceMobileStep1 = () => {
    setMobileStep(2);
    setMobileMessage("현장의 QR 코드가 완벽 인식되었습니다! 원하시는 원격 제어 모드를 선택하세요.");
  };

  const handleMobileActionSelect = (type: "store" | "retrieve") => {
    setMobileActionType(type);
    setMobileStep(3);
    setMobilePin("");
    if (type === "store") {
      // Find first empty locker
      const firstEmpty = lockers.find(l => l.status === "empty")?.id || "002";
      setMobileSelectedLocker(firstEmpty);
      setMobileMessage("보관하실 빈 보관함을 터치하고, 사용할 임보 핀코드를 설계하세요.");
    } else {
      // Find first used locker
      const firstUsed = lockers.find(l => l.status === "used")?.id || "001";
      setMobileSelectedLocker(firstUsed);
      setMobileMessage("수거하실 점유 보관함을 터치하고, 기존 비밀번호를 설정 수력해 주세요.");
    }
  };

  // Execute payment and unlock final action
  const handleMobileSubmit = () => {
    const target = lockers.find(l => l.id === mobileSelectedLocker);
    if (!target) return;

    if (mobileActionType === "store") {
      if (mobilePin.length < 4) {
        setMobileMessage("⚠️ 비밀번호는 실시간 4자리가 필요합니다.");
        return;
      }
      setIsPaying(true);
      setMobileMessage("🔒 코릭사 차세대 원격 모바일 보안 서버와 가상 이중 연동 통신망 암호화 세션 생성 중...");
      
      setTimeout(() => {
        setIsPaying(false);
        setPaySuccess(true);
        setLockers(prev => prev.map(l => l.id === mobileSelectedLocker ? { ...l, status: "used", pin: mobilePin } : l));
        setMobileStep(4);
        setFeedback({
          text: `📱 [모바일 원격 IoT 전산망] ${mobileSelectedLocker}번 사물함 보관 잠금 완료! 설정된 핀: [${mobilePin}]`,
          type: "success"
        });
      }, 1500);
    } else {
      // Retrieve
      if (mobilePin !== target.pin) {
        setMobileMessage(`❌ 비밀번호 오류! 입력값이 보관함 핀코드와 맞지 않습니다. (힌트: ${target.pin})`);
        return;
      }
      setIsPaying(true);
      setMobileMessage("🛡️ 잠금해제 인증 해시 대조 및 솔레노이드 전기 신호 주입 무선 승인 중...");

      setTimeout(() => {
        setIsPaying(false);
        setPaySuccess(true);
        setLockers(prev => prev.map(l => l.id === mobileSelectedLocker ? { ...l, status: "empty", pin: null } : l));
        setMobileStep(4);
        setFeedback({
          text: `📱 [모바일 원격 IoT 전산망] ${mobileSelectedLocker}번 사물함이 무결 오픈 통신을 받아 활짝 열렸습니다.`,
          type: "success"
        });
      }, 1500);
    }
  };

  const handleResetMobileFlow = () => {
    setMobileStep(1);
    setMobilePin("");
    setPaySuccess(false);
    setIsPaying(false);
    setMobileMessage("");
  };

  return (
    <section id="home" className="pt-32 pb-20 md:pt-36 md:pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Slogan and text (7 Columns) */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            {/* Elegant Tagline Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold self-start tracking-tight ${getAccentBorderClass()}`}>
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500" />
              <span className="font-sans">대한민국 실시간 클라우드 스마트 사물함 No.1</span>
            </div>

            {/* Title / Slogan */}
            <h1 className={`text-4xl sm:text-5xl lg:text-[46px] xl:text-[54px] font-black tracking-tight text-gray-950 leading-[1.15] ${getFontClass()}`}>
              공간의 미래를 여는<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-orange-500 to-emerald-500">
                코릭사(KORIXA) Smart Locker
              </span>
            </h1>

            {/* Custom Slogan Describing 2-column, 5-row specs */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
              정밀 하드웨어 공학으로 빚어낸 <strong className="text-gray-900 font-bold">2열 5단(10개 칸 + 중앙 키오스크)</strong> 표준 세트 구축 방식의 대표 국가브랜드 코릭사입니다. IoT 원격 무선 제어 통신을 완비한 최고의 보안 인프라를 스마트폰 및 키오스크 연동을 통해 입체적으로 직접 제어해 보세요.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <button
                onClick={onContactClick}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg ${getAccentBgClass()}`}
              >
                <span>전문가에게 견적 및 상담 문의</span>
                <ArrowRight className="w-4 h-4 translate-x-0 hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("portfolio");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-950 transition-all duration-200"
              >
                <span>납품 실적 조회</span>
              </button>
            </div>

            {/* Core Blueprint Parameters (Image 1 mapping details) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gray-100">
              <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                <span className="block text-[11px] font-mono text-gray-400 font-bold uppercase">SET 가로너비</span>
                <span className="text-base font-black text-gray-900">900 mm</span>
                <p className="text-[10px] text-gray-500 mt-0.5">400+100+400 설계 비율</p>
              </div>
              <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                <span className="block text-[11px] font-mono text-gray-400 font-bold uppercase">유닛 전체높이</span>
                <span className="text-base font-black text-gray-900">1,970 mm</span>
                <p className="text-[10px] text-gray-500 mt-0.5">고정 걸레받이 하부 프레임</p>
              </div>
              <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                <span className="block text-[11px] font-mono text-gray-400 font-bold uppercase">내실 설치두께</span>
                <span className="text-base font-black text-gray-900">500 mm</span>
                <p className="text-[10px] text-gray-500 mt-0.5">최저 설치 장비 깊이 기준</p>
              </div>
              <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                <span className="block text-[11px] font-mono text-gray-400 font-bold uppercase">보관함 칸 구조</span>
                <span className="text-base font-black text-violet-600">2열 5단 (10칸)</span>
                <p className="text-[10px] text-gray-500 mt-0.5">대용량 460mm x 4칸</p>
              </div>
            </div>
          </div>

          {/* RIGHT: High-fidelity visual twin simulator with interactive layout (6 Columns) */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            {/* Glowing active ambient rings */}
            <div className="absolute inset-x-0 top-0 h-[480px] bg-gradient-to-tr from-violet-200/30 via-orange-100/30 to-emerald-100/30 rounded-full filter blur-3xl z-0 pointer-events-none" />

            {/* Mode Tab Switcher Bar - Very Premium Accent Interface */}
            <div className="relative w-full max-w-sm sm:max-w-md bg-slate-900/40 p-1 rounded-2xl border border-slate-200/50 flex gap-1.5 mb-3 z-10 shadow-sm backdrop-blur-md">
              <button
                onClick={() => { setActiveTab("kiosk"); if(selectedId === "") setSelectedId("002"); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all duration-300 ${
                  activeTab === "kiosk" 
                    ? "bg-slate-900 text-white shadow-md scale-[1.01]" 
                    : "text-slate-650 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>📟 하드웨어 키오스크</span>
              </button>
              <button
                onClick={() => { setActiveTab("mobile"); handleResetMobileFlow(); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all duration-300 ${
                  activeTab === "mobile" 
                    ? "bg-violet-600 text-white shadow-md scale-[1.01] ring-1 ring-violet-400" 
                    : "text-slate-650 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>📱 QR 모바일 원격</span>
              </button>
              <button
                onClick={() => setActiveTab("blueprint")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all duration-300 ${
                  activeTab === "blueprint" 
                    ? "bg-emerald-600 text-white shadow-md scale-[1.01]" 
                    : "text-slate-650 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>📐 설계도면 Blueprint</span>
              </button>
            </div>

            {/* MAIN CONTAINER */}
            <div className="relative w-full max-w-md bg-slate-950 text-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800 z-10 flex flex-col justify-between overflow-hidden sm:min-h-[580px]">
              
              {/* Header Telemetry */}
              <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4 text-[10px] font-mono tracking-tight text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>KORIXA CLOUD NODE CONNECTED</span>
                </div>
                <button 
                  onClick={handleResetSimulator}
                  className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 hover:text-white px-2 py-0.5 rounded border border-slate-700 transition"
                  title="초기상태로 디바이스 리셋"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>전체 초기화</span>
                </button>
              </div>

              {/* VIEW 1: DIRECT KEYPAD & KIOKS CONTROL */}
              {activeTab === "kiosk" && (
                <div className="flex flex-col justify-between flex-1">
                  
                  {/* Step 1: Main Menu Selection (보관하기 / 물품 찾기) */}
                  {kioskStep === 1 && (
                    <div className="flex flex-col flex-1 justify-between">
                      <div className="space-y-4">
                        <div className="text-center space-y-1.5 py-2">
                          <span className="inline-block bg-violet-900/40 text-violet-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-800">
                            KORIXA 스마트 무인 단말기
                          </span>
                          <h4 className="text-base font-black text-white">원하시는 서비스를 선택해 주십시오</h4>
                          <p className="text-[10px] text-slate-400">코릭사 2열 5단 보관 자동화 노드</p>
                        </div>

                        {/* Store / Retrieve Selection Buttons */}
                        <div className="space-y-3 py-1">
                          <button
                            onClick={() => handleKioskMenuSelect("store")}
                            className="group w-full bg-gradient-to-br from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white p-4.5 rounded-2xl flex items-center justify-between shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition border border-emerald-400"
                          >
                            <div className="flex items-center gap-3.5">
                              <span className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-xl shadow-inner">📥</span>
                              <div className="text-left">
                                <p className="text-sm font-black text-white">1. 물품 보관하기 (Store)</p>
                                <p className="text-[10px] text-emerald-100/70 mt-0.5">빈 보관함을 지정하여 귀중품을 안전하게 잠금 보존</p>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                          </button>

                          <button
                            onClick={() => handleKioskMenuSelect("retrieve")}
                            className="group w-full bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-450 hover:to-amber-500 text-white p-4.5 rounded-2xl flex items-center justify-between shadow-lg shadow-orange-950/20 active:scale-[0.99] transition border border-orange-400"
                          >
                            <div className="flex items-center gap-3.5">
                              <span className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-xl shadow-inner">🔑</span>
                              <div className="text-left">
                                <p className="text-sm font-black text-white">2. 물품 찾기 (Retrieve)</p>
                                <p className="text-[10px] text-orange-100/70 mt-0.5">비밀번호를 입력하여 보존되어 있는 물품을 즉시 인증 해제</p>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>

                        {/* Real-time Small Locker Overview Map */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
                          <p className="text-[9px] text-slate-400 mb-2 font-mono flex justify-between items-center">
                            <span>● 실시간 보관함 사용 현황</span>
                            <span className="flex gap-2">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />보관 가능</span>
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />보관 중</span>
                            </span>
                          </p>
                          <div className="grid grid-cols-5 gap-1.5">
                            {lockers.map((l) => {
                              const isUsed = l.status === "used";
                              return (
                                <div
                                  key={l.id}
                                  className={`p-1 rounded text-center font-mono text-[9px] font-bold border transition ${
                                    isUsed 
                                      ? "bg-orange-950/40 border-orange-850/60 text-orange-400" 
                                      : "bg-emerald-950/40 border-emerald-850/60 text-emerald-400"
                                  }`}
                                >
                                  {l.id}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-3 border-t border-slate-900 text-center">
                        <p className="text-[9px] text-slate-500">※ 무인 자동화 노드 KORIXA IoT 펌웨어 v2.4 구동 중</p>
                      </div>
                    </div>
                  )}

                  {/* Step 2: "함을 선택하세요" (Compartment Selection) */}
                  {kioskStep === 2 && (
                    <div className="flex flex-col flex-1 justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="inline-block bg-emerald-950 text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded border border-emerald-800">
                            STEP 2/4 - 함 선택
                          </span>
                          <button 
                            onClick={() => setKioskStep(1)}
                            className="text-slate-400 hover:text-white underline text-[10px]"
                          >
                            처음 메뉴로
                          </button>
                        </div>
                        
                        <div className="text-center py-1">
                          <h4 className="text-sm font-black text-white">함을 터치하여 선택해 주세요</h4>
                          <p className="text-[9.5px] text-slate-400 mt-0.5">
                            {kioskFlowType === "store" 
                              ? "🟢 녹색 (열기 가능) 함을 한 개 골라주세요" 
                              : "🟠 주황색 (물품 보관 불가 / 보관 중) 함을 골라주세요"}
                          </p>
                        </div>

                        {/* Physical Locker Unit Interface */}
                        <div className="relative border border-slate-800 p-2 sm:p-3 rounded-2xl bg-black flex flex-col shadow-inner">
                          
                          {/* Dimension tag */}
                          <div className="flex justify-between text-[7px] font-mono text-slate-500 font-bold border-b border-slate-900 pb-1 mb-2">
                            <span>◀ 좌측 칼럼 (001~005) ▶</span>
                            <span>키오스크 제어부</span>
                            <span>◀ 우측 칼럼 (006~010) ▶</span>
                          </div>

                          <div className="grid grid-cols-12 gap-1.5">
                            {/* Left Column Button List */}
                            <div className="col-span-5 flex flex-col gap-1.5">
                              {lockers.filter(l => l.column === "left").map((l) => {
                                const isSelected = kioskSelectedId === l.id;
                                const isUsed = l.status === "used";
                                const heightClass = l.heightMm === 460 ? "h-13 sm:h-15" : "h-9 sm:h-11";
                                
                                // Color representing style: green for empty, orange for used
                                const designClass = isUsed 
                                  ? "from-orange-650 to-orange-800 border-orange-500 text-orange-100 hover:brightness-110 shadow-orange-950/20" 
                                  : "from-emerald-600 to-emerald-700 border-emerald-500 hover:brightness-110 text-emerald-50 shadow-emerald-950/20";

                                return (
                                  <button
                                    key={l.id}
                                    type="button"
                                    onClick={() => handleKioskSelectLocker(l.id)}
                                    className={`relative w-full ${heightClass} bg-gradient-to-br ${designClass} border rounded-lg p-1.5 flex flex-col justify-between shadow-md transition-all duration-300 transform ${
                                      isSelected
                                        ? "ring-2 ring-violet-500 scale-[1.04] z-10"
                                        : "hover:scale-[1.01]"
                                    }`}
                                  >
                                    <div className="flex justify-between items-center w-full leading-none">
                                      <span className="font-mono text-[10px] sm:text-xs font-extrabold">{l.id}호</span>
                                      <span className={`w-1.5 h-1.5 rounded-full border border-white/20 ${isUsed ? 'bg-orange-300 animate-pulse' : 'bg-emerald-300'}`} />
                                    </div>
                                    <div className="flex justify-between items-center w-full text-[8px] opacity-90 leading-none">
                                      <span className="font-mono tracking-tighter text-[7.5px] opacity-70">{l.heightMm}mm</span>
                                      <span className="font-bold uppercase tracking-tight text-[7px]">
                                        {isUsed ? "사용불가" : "열기인용"}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Middle Control Panel Bar */}
                            <div className="col-span-2 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-1 flex flex-col justify-between items-center py-2 relative min-h-[260px]">
                              {/* Central LED Screen */}
                              <div className="w-full bg-slate-950 border border-slate-850 rounded px-0.5 py-1 flex flex-col items-center gap-0.5 shadow-inner">
                                <span className="text-[5px] font-mono text-violet-400 tracking-tight leading-none">KORIXA TOWER</span>
                                <div className="w-full h-3 bg-black rounded flex items-center justify-center text-[7.5px] text-white font-mono font-bold">
                                  {kioskFlowType === "store" ? "STORE" : "RETRIEVE"}
                                </div>
                              </div>

                              {/* Simulated Hardware Barcode Scanner & NFC Graphic */}
                              <div className="flex flex-col items-center gap-3.5 my-3">
                                <div className="w-6 h-6 rounded bg-slate-850 border border-slate-700 flex items-center justify-center p-0.5">
                                  <QrCode className="w-full h-full text-slate-500" />
                                </div>
                                <div className="w-5 h-4 bg-slate-900 rounded border border-slate-800 flex items-center justify-center leading-none">
                                  <span className="text-[5px] font-mono font-black text-rose-500 animate-pulse">LASER</span>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[6px] font-black text-emerald-400 font-mono">
                                  NFC
                                </div>
                              </div>

                              {/* Card Reader Line Slot */}
                              <div className="w-full flex flex-col items-center gap-0.5 mt-auto">
                                <div className="w-4 h-0.5 bg-slate-700 rounded" />
                                <span className="text-[4px] text-slate-500 font-mono">CARD IN</span>
                              </div>
                            </div>

                            {/* Right Column Button List */}
                            <div className="col-span-5 flex flex-col gap-1.5">
                              {lockers.filter(l => l.column === "right").map((l) => {
                                const isSelected = kioskSelectedId === l.id;
                                const isUsed = l.status === "used";
                                const heightClass = l.heightMm === 460 ? "h-13 sm:h-15" : "h-9 sm:h-11";
                                
                                const designClass = isUsed 
                                  ? "from-orange-650 to-orange-800 border-orange-500 text-orange-100 hover:brightness-110 shadow-orange-950/20" 
                                  : "from-emerald-600 to-emerald-700 border-emerald-500 hover:brightness-110 text-emerald-50 shadow-emerald-950/20";

                                return (
                                  <button
                                    key={l.id}
                                    type="button"
                                    onClick={() => handleKioskSelectLocker(l.id)}
                                    className={`relative w-full ${heightClass} bg-gradient-to-br ${designClass} border rounded-lg p-1.5 flex flex-col justify-between shadow-md transition-all duration-300 transform ${
                                      isSelected
                                        ? "ring-2 ring-violet-500 scale-[1.04] z-10"
                                        : "hover:scale-[1.01]"
                                    }`}
                                  >
                                    <div className="flex justify-between items-center w-full leading-none">
                                      <span className="font-mono text-[10px] sm:text-xs font-extrabold">{l.id}호</span>
                                      <span className={`w-1.5 h-1.5 rounded-full border border-white/20 ${isUsed ? 'bg-orange-300 animate-pulse' : 'bg-emerald-300'}`} />
                                    </div>
                                    <div className="flex justify-between items-center w-full text-[8px] opacity-90 leading-none">
                                      <span className="font-mono tracking-tighter text-[7.5px] opacity-70">{l.heightMm}mm</span>
                                      <span className="font-bold uppercase tracking-tight text-[7px]">
                                        {isUsed ? "사용불가" : "열기인용"}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Operational Status Display banner */}
                        <div className={`p-2.5 rounded-xl text-[10.5px] transition-all flex items-start gap-2 ${
                          feedback.type === "success" 
                            ? "bg-emerald-950/60 border border-emerald-900/50 text-emerald-300" 
                            : feedback.type === "error"
                              ? "bg-red-950/60 border border-red-900/50 text-red-300"
                              : "bg-slate-900 border border-slate-850 text-slate-350"
                        }`}>
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{feedback.text}</span>
                        </div>
                      </div>

                      <div className="pt-3">
                        <button
                          onClick={() => setKioskStep(1)}
                          className="w-full text-center py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs text-slate-300 font-bold tracking-tight active:scale-95 transition"
                        >
                          이전 메뉴로 가기 ◀
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: 핸드폰 번호 및 비밀번호 입력 */}
                  {kioskStep === 3 && (
                    <div className="flex flex-col flex-1 justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="inline-block bg-violet-950 text-violet-400 text-[9px] font-black px-2 py-0.5 rounded border border-violet-800">
                            STEP 3/4 - 정보 입력 ({kioskSelectedId}호)
                          </span>
                          <button 
                            onClick={() => setKioskStep(2)}
                            className="text-slate-400 hover:text-white underline text-[10px]"
                          >
                            함 재선택
                          </button>
                        </div>

                        <div className="text-center py-1">
                          <h4 className="text-sm font-black text-white">핸드폰 번호 및 비밀번호 입력</h4>
                          <p className="text-[9.5px]/relaxed text-slate-400">
                            {kioskFlowType === "store" 
                              ? "물품을 수거할 분의 모바일 연락처와 원하는 비밀번호를 설정하세요" 
                              : "보관 당시 등록한 비밀번호를 하단 가상 키패드로 입력 후 확인해 주십시오"}
                          </p>
                        </div>

                        {/* Interactive Form Display Fields */}
                        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-3">
                          {/* Phone Number Box */}
                          <div 
                            onClick={() => setKioskActiveField("phone")}
                            className={`p-2.5 rounded-xl border transition cursor-pointer flex justify-between items-center ${
                              kioskActiveField === "phone" 
                                ? "bg-slate-950 border-violet-500 ring-1 ring-violet-500/50" 
                                : "bg-slate-950/40 border-slate-800 hover:bg-slate-900/60"
                            }`}
                          >
                            <div>
                              <span className="text-[8.5px] font-bold text-slate-500 block uppercase font-mono">가수 연락처 (PHONE)</span>
                              <span className="text-xs sm:text-sm font-mono font-black text-stone-100">
                                {formatKioskPhone(kioskPhone) || "010-____-____"}
                              </span>
                            </div>
                            <span className={`text-[8.5px] px-2 py-0.5 rounded-full font-bold ${
                              kioskActiveField === "phone" ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-450"
                            }`}>
                              입력중
                            </span>
                          </div>

                          {/* Password Box */}
                          <div 
                            onClick={() => setKioskActiveField("password")}
                            className={`p-2.5 rounded-xl border transition cursor-pointer flex justify-between items-center ${
                              kioskActiveField === "password" 
                                ? "bg-slate-950 border-violet-500 ring-1 ring-violet-500/50" 
                                : "bg-slate-950/40 border-slate-800 hover:bg-slate-900/60"
                            }`}
                          >
                            <div>
                              <span className="text-[8.5px] font-bold text-slate-500 block uppercase font-mono">비밀번호 4자리 (PASSCODE)</span>
                              <span className="text-sm font-mono font-black tracking-widest text-amber-400">
                                {kioskPassword ? "• ".repeat(kioskPassword.length) + " ".repeat(4 - kioskPassword.length) : "----"}
                              </span>
                            </div>
                            <span className={`text-[8.5px] px-2 py-0.5 rounded-full font-bold ${
                              kioskActiveField === "password" ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-450"
                            }`}>
                              입력중
                            </span>
                          </div>
                        </div>

                        {/* Operational Status Display banner */}
                        <div className={`p-2 rounded-xl text-[10px] leading-relaxed transition-all flex items-start gap-1.5 ${
                          feedback.type === "success" 
                            ? "bg-emerald-950/50 border border-emerald-900/40 text-emerald-300" 
                            : feedback.type === "error"
                              ? "bg-red-950/50 border border-red-900/40 text-red-300"
                              : "bg-slate-900/60 border border-slate-850 text-slate-400"
                        }`}>
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{feedback.text}</span>
                        </div>

                        {/* Numeric Keypad Panel */}
                        <div className="bg-slate-950 border border-slate-850 p-3 rounded-2xl">
                          <div className="grid grid-cols-3 gap-1.5 text-xs">
                            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() => handleKioskKeypadPress(n)}
                                className="bg-slate-900 hover:bg-slate-800 active:bg-slate-950 border border-slate-800 rounded-lg py-2 font-mono font-bold text-white transition active:scale-95"
                              >
                                {n}
                              </button>
                            ))}
                            <button
                              type="button"
                              onClick={handleKioskKeypadClear}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg py-2 transition text-[10.5px] active:scale-95"
                            >
                              전체 지움
                            </button>
                            <button
                              type="button"
                              onClick={() => handleKioskKeypadPress("0")}
                              className="bg-slate-900 hover:bg-slate-800 font-bold border border-slate-800 rounded-lg py-2 text-white transition active:scale-95"
                            >
                              0
                            </button>
                            <button
                              type="button"
                              onClick={handleKioskKeypadBackspace}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg py-2 transition text-[10.5px] active:scale-95 flex items-center justify-center"
                            >
                              ◀ 한글자 지움
                            </button>
                          </div>
                        </div>

                        {/* Admin helper hint inside retrieve flow */}
                        {kioskFlowType === "retrieve" && (
                          <p className="text-[8.5px] text-slate-500 text-center font-mono bg-black/30 py-1 rounded">
                            💡 관리자 수동 테스트 비밀번호 힌트: <span className="font-bold text-amber-500 underline">{lockers.find(l => l.id === kioskSelectedId)?.pin}</span>
                          </p>
                        )}
                        {kioskFlowType === "store" && (
                          <p className="text-[8.5px] text-slate-500 text-center font-mono bg-black/30 py-1 rounded">
                            💡 임의의 번호(휴대폰 번호 11자리 및 핀 4자리)를 터치형 가상 키패드로 기입하고 확인을 눌러 완료하십시오.
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => setKioskStep(2)}
                          className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-stone-300 py-2 rounded-xl text-xs font-bold"
                        >
                          ◀ 함 재선택
                        </button>
                        <button
                          type="button"
                          onClick={handleKioskSubmitStep3}
                          className="bg-violet-600 hover:bg-violet-500 text-white font-extrabold py-2 rounded-xl text-xs shadow-md shadow-violet-500/10 active:scale-95 transition"
                        >
                          입력 완료 확인 ▶
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: 완료 (Completion Screen) */}
                  {kioskStep === 4 && (
                    <div className="flex flex-col flex-1 text-center justify-between py-2 text-xs">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-2 text-2xl animate-bounce">
                          ✓
                        </div>
                        <span className="inline-block bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase font-mono tracking-wider">
                          KORIXA PROCESS COMPLETED
                        </span>
                        
                        <h4 className="text-base font-black text-white">
                          {kioskFlowType === "store" ? "보관 처리 완료!" : "수령 개방 완료!"}
                        </h4>

                        <div className="bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-4 space-y-2 text-left max-w-[320px] mx-auto shadow-inner">
                          <p className="text-[10px] font-mono text-slate-400 text-center border-b border-slate-850 pb-1.5 font-bold">전산 정산 전도식 영수증 (RECEIPT)</p>
                          
                          <div className="grid grid-cols-3 gap-y-1 text-[10px] font-mono text-slate-350">
                            <span className="text-slate-500 font-bold">인용 모델</span>
                            <span className="col-span-2 text-right text-slate-100">KORIXA SMART {kioskSelectedId}号</span>

                            <span className="text-slate-500 font-bold">행동 구분</span>
                            <span className="col-span-2 text-right font-black text-emerald-400">
                              {kioskFlowType === "store" ? "물품 보관 (STORED)" : "물품 인도 (RETRIEVED)"}
                            </span>

                            <span className="text-slate-500 font-bold">등록폰 번</span>
                            <span className="col-span-2 text-right font-bold text-slate-100">
                              {kioskPhone ? formatKioskPhone(kioskPhone) : "010-3841-XXXX"}
                            </span>

                            <span className="text-slate-500 font-bold">도어 상태</span>
                            <span className="col-span-2 text-right text-amber-400 font-black flex items-center justify-end gap-1">
                              <Unlock className="w-2.5 h-2.5 inline text-emerald-400 animate-pulse" /> SOLENOID RELEASED
                            </span>
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-400 leading-relaxed max-w-[280px] mx-auto">
                          {kioskFlowType === "store"
                            ? `${kioskSelectedId}호 무인 도어의 핀 코드가 장전되었습니다. 도어를 가볍게 밀어서 문이 확실히 잠겼는지 점검 하십시오.`
                            : `${kioskSelectedId}호 무인 보관함 장치가 개방되었습니다. 물건을 하나도 빠짐없이 모두 수거한 뒤, 다음 사용자를 위해 도어를 닫아주십시오.`}
                        </p>
                      </div>

                      <div className="pt-8">
                        <button
                          type="button"
                          onClick={() => {
                            setKioskStep(1);
                            setKioskFlowType(null);
                            setKioskSelectedId("");
                            setKioskPhone("");
                            setKioskPassword("");
                          }}
                          className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-850 py-3 rounded-xl text-xs font-black text-white hover:text-orange-400 transition"
                        >
                          ◀ 다른 신규 거래 시작하기 (처음 메인으로)
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* VIEW 2: PHONE APP / QR REMOTE UNLOCK SIMULATION (Image 2) */}
              {activeTab === "mobile" && (
                <div className="flex-1 flex flex-col justify-between">
                  
                  {/* Outer Mobile Phone Border Frame */}
                  <div className="relative border-4 border-slate-800 rounded-3xl bg-slate-950 p-3 sm:p-4.5 flex flex-col flex-1 min-h-[350px]">
                    <div className="w-12 h-4 bg-slate-800 rounded-full mx-auto -mt-2.5 mb-3 flex items-center justify-center">
                      <div className="w-2.5 h-1.5 bg-slate-950 rounded-full" />
                    </div>

                    {/* Step Content */}
                    {mobileStep === 1 && (
                      <div className="flex flex-col flex-1 text-center justify-between py-2">
                        <div className="space-y-2">
                          <span className="inline-block bg-violet-900/50 text-violet-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-800">
                            STEP 1/4 - 현장 QR 결합
                          </span>
                          <h4 className="text-sm font-black text-white">현장 보관함의 QR 코드 촬영</h4>
                          <p className="text-[10px] text-slate-400 leading-relaxed max-w-[240px] mx-auto">
                            스마트폰 카메라로 물리 사물함 중간 칼럼의 고유 표식을 프레임 안에 맞추어 촬영하십시오.
                          </p>
                        </div>

                        {/* Scanner Viewport Interface */}
                        <div className="relative w-36 h-36 bg-slate-900 border-2 border-violet-500 rounded-2xl mx-auto my-4 flex items-center justify-center overflow-hidden shadow-inner">
                          {laserActive && (
                            <div className="absolute w-full h-0.5 bg-violet-400 shadow-[0_0_6px_#8b5cf6] animate-pulse top-1/2 left-0" />
                          )}
                          <QrCode className="w-16 h-16 text-slate-600 animate-pulse" />
                          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-violet-400" />
                          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-violet-400" />
                          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-violet-400" />
                          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-violet-400" />
                        </div>

                        <button
                          onClick={advanceMobileStep1}
                          className="w-full bg-violet-600 hover:bg-violet-500 py-2.5 rounded-xl text-xs font-black text-white shadow-md transition transform active:scale-95"
                        >
                          카메라 촬영 / QR 인식하기 📸
                        </button>
                      </div>
                    )}

                    {mobileStep === 2 && (
                      <div className="flex flex-col flex-1 text-center justify-between py-2">
                        <div className="space-y-1">
                          <span className="inline-block bg-violet-900/50 text-violet-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-800">
                            STEP 2/4 - 메뉴 선택
                          </span>
                          <h4 className="text-sm font-black text-white">메뉴를 선택해 주세요</h4>
                          <p className="text-[9.5px] text-slate-400">현장 보관소: KORIXA 성동구 지점 무인 단말</p>
                        </div>

                        <div className="space-y-2.5 my-8">
                          <button
                            onClick={() => handleMobileActionSelect("store")}
                            className="w-full bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 text-white p-3 rounded-2xl flex items-center justify-between transition-all group"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">📥</span>
                              <div className="text-left">
                                <p className="text-xs font-black">물품 보관하기 (무인 신청)</p>
                                <p className="text-[8px] text-slate-500">빈 사물함을 동적으로 할당받아 보류</p>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                          </button>

                          <button
                            onClick={() => handleMobileActionSelect("retrieve")}
                            className="w-full bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 text-white p-3 rounded-2xl flex items-center justify-between transition-all group"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs">📤</span>
                              <div className="text-left">
                                <p className="text-xs font-black">물품 찾기 / 원격 열기</p>
                                <p className="text-[8px] text-slate-500">기존에 점용한 사물함 문을 원격으로 해제</p>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>

                        <button
                          onClick={() => setMobileStep(1)}
                          className="text-[9.5px] text-slate-550 underline hover:text-slate-300"
                        >
                          뒤로가기
                        </button>
                      </div>
                    )}

                    {mobileStep === 3 && (
                      <div className="flex flex-col flex-1 justify-between py-1 text-xs">
                        <div className="text-center space-y-1 mb-2">
                          <span className="inline-block bg-violet-900/50 text-violet-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-violet-800">
                            STEP 3/4 - 보관칸 & 핀 정의
                          </span>
                          <h4 className="text-xs font-black text-white">
                            {mobileActionType === "store" ? "보관용 빈 칸 및 신규 비밀번호" : "수거용 보관함 및 비밀번호"}
                          </h4>
                        </div>

                        {/* Locker map within the app */}
                        <div className="bg-slate-900 p-2 rounded-xl mb-2 border border-slate-850">
                          <p className="text-[8px] text-slate-500 text-center mb-1 bg-black/40 py-0.5 rounded">※ 아래 칸에서 원격 구동할 번호를 정확히 선택하세요</p>
                          <div className="grid grid-cols-5 gap-1">
                            {lockers.map(l => {
                              const isTargetCurrent = mobileSelectedLocker === l.id;
                              const isEligible = mobileActionType === "store" ? l.status === "empty" : l.status === "used";
                              
                              let colorClass = "bg-slate-800 text-slate-600 opacity-40 cursor-not-allowed";
                              if (isEligible) {
                                colorClass = isTargetCurrent
                                  ? "bg-violet-600 text-white ring-1 ring-white"
                                  : "bg-slate-950 text-slate-300 hover:bg-slate-850 cursor-pointer";
                              }

                              return (
                                <button
                                  key={l.id}
                                  type="button"
                                  disabled={!isEligible}
                                  onClick={() => setMobileSelectedLocker(l.id)}
                                  className={`py-1 rounded text-[9.5px] font-mono leading-none flex flex-col items-center justify-center ${colorClass}`}
                                >
                                  <span>{l.id}</span>
                                  <span className="text-[6.5px] opacity-75">{l.heightMm}mm</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-850">
                            <span className="text-[10px] text-slate-400">선택 보관함:</span>
                            <span className="font-extrabold text-white">{mobileSelectedLocker}호 칸 ({mobileActionType === "store" ? "신규 계약" : "점용 수거"})</span>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 block">비밀번호 4자리 설정/확인:</label>
                            <div className="relative">
                              <input
                                type="password"
                                maxLength={4}
                                placeholder="숫자 4자리를 정확히 기입"
                                value={mobilePin}
                                onChange={(e) => setMobilePin(e.target.value.replace(/[^0-9]/g, ""))}
                                className="w-full bg-slate-900 border border-slate-805 rounded-lg py-1.5 px-3.5 text-center text-xs font-mono font-bold tracking-widest text-violet-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
                              />
                            </div>
                            {mobileActionType === "retrieve" && (
                              <p className="text-[8px] text-amber-500 text-center uppercase font-mono">가상 힌트핀: {lockers.find(l => l.id === mobileSelectedLocker)?.pin}</p>
                            )}
                          </div>
                        </div>

                        {mobileMessage && (
                          <p className="text-[8.5px] text-amber-400 mt-1.5 leading-tight bg-slate-900 p-1.5 rounded text-center border border-slate-800">{mobileMessage}</p>
                        )}

                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <button
                            onClick={() => setMobileStep(2)}
                            className="bg-slate-900 hover:bg-slate-800 text-slate-450 py-2 rounded-lg text-[10px]"
                          >
                            이전 단계
                          </button>
                          <button
                            onClick={handleMobileSubmit}
                            disabled={isPaying || !mobileSelectedLocker}
                            className={`py-2 rounded-lg text-[10px] font-black text-white ${
                              isPaying ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-500"
                            }`}
                          >
                            {isPaying ? "연동 통신 보안 검증 중..." : "원격 전산 신청 및 구동"}
                          </button>
                        </div>
                      </div>
                    )}

                    {mobileStep === 4 && (
                      <div className="flex flex-col flex-1 text-center justify-between py-2 text-xs">
                        <div className="space-y-2">
                          <div className="w-10 h-10 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center mx-auto mb-2 text-lg border border-emerald-800 animate-bounce">
                            ✓
                          </div>
                          <span className="inline-block bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800-30 hover:shadow-md">
                            STEP 4/4 - 개방 완료
                          </span>
                          <h4 className="text-sm font-black text-white">사물함 솔레노이드 작동 완료!</h4>
                          <p className="text-[9.5px] text-slate-400 leading-relaxed">
                            {mobileSelectedLocker}호 스마트 보관함의 통신 잠금쇠가 성공적으로 작동하여 문이 활짝 해제되었습니다.
                          </p>
                        </div>

                        {/* Interactive Lock Open Icon Vector */}
                        <div className="border border-dashed border-slate-800 rounded-2xl p-4.5 bg-slate-900/40 w-full max-w-[200px] mx-auto my-4 space-y-1.5">
                          <p className="text-[10px] font-mono text-slate-400">보관함 실시간 로깅</p>
                          <div className="flex justify-center items-center gap-1">
                            <span className="font-mono text-base font-black text-violet-400">{mobileSelectedLocker}号</span>
                            <span className="px-1.5 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded text-[9px] font-mono">OPENS SUCCESS</span>
                          </div>
                        </div>

                        <button
                          onClick={handleResetMobileFlow}
                          className="w-full bg-slate-900 hover:bg-slate-800 py-2.5 rounded-xl text-xs font-bold text-white shadow"
                        >
                          처음으로 돌아가기 (다시 시뮬레이션)
                        </button>
                      </div>
                    )}

                  </div>

                  <p className="text-[9.5px] text-slate-500 text-center font-mono mt-3 leading-normal">
                    ※ 실물 보관함 중간의 물리 탑재부 [QR Code] 연동 및 안전성 기준을 스마트폰 프레임워크로 축약 연계한 기술 예시입니다.
                  </p>
                </div>
              )}

              {/* VIEW 3: ARCHITECTURAL BLUEPRINT SPECIFICATION */}
              {activeTab === "blueprint" && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                      <FileText className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-black tracking-tight text-white block">KORIXA 900mm 표준 세트 정밀도면</span>
                    </div>

                    {/* Proportional Layout specifications inside diagram */}
                    <div className="grid grid-cols-2 gap-3.5 text-[11px]">
                      
                      {/* Left: Wireframe front blueprint visual */}
                      <div className="border border-slate-800 rounded-xl p-3 bg-slate-900/60 relative space-y-2 flex flex-col justify-between min-h-[220px]">
                        <span className="absolute top-1.5 right-1.5 text-[7px] text-slate-500 font-mono tracking-widest font-black">FRONT VIEW</span>
                        
                        <div className="space-y-1">
                          <p className="font-bold text-slate-200">설계 외형 특징</p>
                          <ul className="space-y-1 text-[10px] text-slate-400 list-disc pl-3">
                            <li>2열 5단 총 10개 문짝</li>
                            <li>중앙 100mm 키오스크 타워</li>
                            <li>001-005: 400mm 가로선</li>
                            <li>006-010: 400mm 가로선</li>
                          </ul>
                        </div>

                        <div className="space-y-1">
                          <p className="font-bold text-slate-200 underline">체적 제원표 (Mm)</p>
                          <div className="font-mono text-[9px] text-slate-400 space-y-0.5">
                            <p>· 상단/하단용(001,006,005,010): 460</p>
                            <p>· 중단용(002~004, 007~009): 350</p>
                            <p>· 하부 걸레받이 프레임 고정: 100</p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Side view blueprint parameters */}
                      <div className="border border-slate-800 rounded-xl p-3 bg-slate-900/60 relative space-y-2 flex flex-col justify-between min-h-[220px]">
                        <span className="absolute top-1.5 right-1.5 text-[7px] text-slate-500 font-mono tracking-widest font-black">SIDE VIEW</span>
                        
                        <div className="space-y-1">
                          <p className="font-bold text-slate-200">설치 및 유지 공법</p>
                          <ul className="space-y-1 text-[10px] text-slate-400 list-disc pl-3">
                            <li>깊이두께: 500mm 매립설치</li>
                            <li>배후 배선 환기 스페이스</li>
                            <li>벽면 브래킷 안도링 타격고정</li>
                            <li>이중 방청 1.2T 아연도금강판</li>
                          </ul>
                        </div>

                        <div className="bg-slate-950 p-2 rounded border border-slate-850 font-mono text-[9px] text-slate-350 select-none">
                          <span className="block font-bold text-emerald-400 text-[8px] mb-0.5">※ 분체도장 특성보증</span>
                          코릭사는 180℃ 분체 도정으로 에징 및 외부 환경 내구도 20년 보장을 약속합니다.
                        </div>
                      </div>

                    </div>

                    {/* Interactive diagram mockup graphic */}
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex flex-col gap-1.5 text-[10px] font-mono text-slate-300">
                      <p className="text-center font-bold text-slate-400 border-b border-slate-800 pb-1 mb-1">KORIXA 900mm SET 설계 표준 수치</p>
                      <div className="grid grid-cols-3 gap-2.5 text-center">
                        <div className="border border-slate-800 p-1.5 rounded">
                          <span className="text-slate-500 font-bold block text-[8px]">TOTAL WIDTH</span>
                          <span className="text-white text-xs font-black">900 mm</span>
                        </div>
                        <div className="border border-slate-800 p-1.5 rounded">
                          <span className="text-slate-500 font-bold block text-[8px]">TOTAL HEIGHT</span>
                          <span className="text-white text-xs font-black">1,970 mm</span>
                        </div>
                        <div className="border border-slate-800 p-1.5 rounded">
                          <span className="text-slate-500 font-bold block text-[8px]">DEPTH SCALE</span>
                          <span className="text-white text-xs font-black">500 mm</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 font-mono text-center leading-normal mt-4">
                    ※ 도면 변경이나 단독 특수 사이즈 주문제작(OEM) 설계가 필요하시면 하단의 상담을 통해 도면을 매칭해 드립니다.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
