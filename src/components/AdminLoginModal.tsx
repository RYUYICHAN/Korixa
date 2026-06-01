/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, ShieldCheck, Key, User, AlertCircle } from "lucide-react";
import { SiteSettings } from "../types";

interface AdminLoginModalProps {
  settings: SiteSettings;
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AdminLoginModal({
  settings,
  isOpen,
  onClose,
  onLoginSuccess,
}: AdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "korixa*1064") {
      onLoginSuccess();
      setUsername("");
      setPassword("");
      onClose();
    } else {
      setError("아이디(ID) 또는 비밀번호(PW)가 일치하지 않습니다. 관리자 권한을 다시 입력해 주세요.");
    }
  };

  const getAccentBgClass = () => {
    switch (settings.accentColor) {
      case "green":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "purple":
        return "bg-violet-500 hover:bg-violet-600";
      case "orange":
        return "bg-orange-500 hover:bg-orange-600";
      default:
        return "bg-violet-500 hover:bg-violet-600";
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
      default:
        return "text-violet-500";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col p-6 sm:p-8">
        
        {/* Header Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Branding & Theme Icon */}
        <div className="text-center mt-4 mb-6">
          <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 ${getAccentBgClass()} text-white shadow-lg`}>
            <ShieldCheck className="w-7 h-7 animate-pulse" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-950 tracking-tight">
            KORIXA 최고 관리자 인증
          </h2>
          <p className="text-gray-500 text-xs mt-1.5 max-w-xs mx-auto">
            인천 청라 스마트 본사 통합 시스템 관리를 위해 배정된 전용 관리자 자격 증명을 입력하세요.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* System Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs flex gap-2.5 items-start">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3.5">
            {/* Username Input */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                관리자 아이디 (ID)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/10 focus:border-violet-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                액세스 비밀번호 (PW)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                  <Key className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/10 focus:border-violet-500 transition-all font-mono"
                />
              </div>
            </div>
          </div>

          {/* Guidelines notes */}
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-[11px] text-gray-500 leading-relaxed font-mono">
            * 일반 방문자 모드에서는 읽기 전용으로 제품 쇼케이스만 감상 가능하며, 관리자 로그인 성공 시에만 레이아웃, 액센트 컬러, 폰트 및 텍스트 데이터의 실시간 동적 커스텀 대시보드가 열립니다.
          </div>

          {/* Action buttons */}
          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all"
            >
              인증 취소
            </button>
            <button
              type="submit"
              className={`flex-1 py-3 text-xs font-bold text-white rounded-2xl shadow-md transition-all ${getAccentBgClass()}`}
            >
              인증 상태 확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
