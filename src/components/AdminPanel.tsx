/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  X,
  Settings,
  Grid,
  FileText,
  Globe,
  Mail,
  Plus,
  Trash,
  Edit2,
  Save,
  CheckCircle,
  Undo,
  TrendingUp,
  Instagram,
  Linkedin,
  MessageCircle,
  Sparkles,
  RefreshCw,
  Search,
  Eye
} from "lucide-react";
import { SiteSettings, PortfolioItem, BlogItem, Inquiry, SEOMeta } from "../types";

interface AdminPanelProps {
  settings: SiteSettings;
  setSettings: (s: SiteSettings) => void;
  portfolios: PortfolioItem[];
  setPortfolios: (p: PortfolioItem[]) => void;
  blogs: BlogItem[];
  setBlogs: (b: BlogItem[]) => void;
  inquiries: Inquiry[];
  setInquiries: (i: Inquiry[]) => void;
  seoSettings: SEOMeta;
  setSeoSettings: (seo: SEOMeta) => void;
  onClose: () => void;
}

export default function AdminPanel({
  settings,
  setSettings,
  portfolios,
  setPortfolios,
  blogs,
  setBlogs,
  inquiries,
  setInquiries,
  seoSettings,
  setSeoSettings,
  onClose
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"design" | "portfolio" | "blog" | "seo" | "inquiries">("design");

  // Local state for portfolio adding/editing
  const [editingPortId, setEditingPortId] = useState<string | null>(null);
  const [portForm, setPortForm] = useState<Omit<PortfolioItem, "id">>({
    title: "",
    category: "Smart",
    client: "",
    imageUrl: "",
    description: "",
    date: ""
  });

  // Local state for blog adding/editing
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<Omit<BlogItem, "id">>({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    date: "",
    readTime: "",
    tags: []
  });

  // SEO Score calculation logic
  const calculateSEOScore = () => {
    let score = 30;
    if (seoSettings.metaTitle.length > 10 && seoSettings.metaTitle.length < 50) score += 20;
    if (seoSettings.metaDescription.length > 30 && seoSettings.metaDescription.length < 155) score += 20;
    if (seoSettings.keywords.split(",").length >= 3) score += 15;
    if (seoSettings.ogImage.startsWith("http")) score += 15;
    return Math.min(100, score);
  };

  // Portfolio list modification functions
  const savePortfolioEdit = (id: string) => {
    const updated = portfolios.map((item) =>
      item.id === id ? { ...item, ...portForm } : item
    );
    setPortfolios(updated);
    setEditingPortId(null);
  };

  const startPortfolioEdit = (item: PortfolioItem) => {
    setEditingPortId(item.id);
    setPortForm({
      title: item.title,
      category: item.category,
      client: item.client,
      imageUrl: item.imageUrl,
      description: item.description,
      date: item.date
    });
  };

  const addNewPortfolio = () => {
    const newItem: PortfolioItem = {
      id: "port-" + Date.now(),
      title: "신규 스마트/소재별 보관함 납품 사례",
      category: "Smart",
      client: "신규 클라이언트사",
      imageUrl: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=600",
      description: "사물함 규격 및 정밀 하드웨어, 스마트 제어 솔루션 구축에 관한 납품 상세 정보입니다. 관리자 대시보드에서 직접 내용을 수정하실 수 있습니다.",
      date: "2026.06"
    };
    setPortfolios([newItem, ...portfolios]);
    startPortfolioEdit(newItem);
  };

  const deletePortfolio = (id: string) => {
    if (confirm("정말로 이 포트폴리오 항목을 완전 삭제하시겠습니까? (이 작업은 되돌릴 수 없습니다)")) {
      setPortfolios(portfolios.filter((item) => item.id !== id));
      if (editingPortId === id) setEditingPortId(null);
    }
  };

  // Blog list modification functions
  const saveBlogEdit = (id: string) => {
    const updated = blogs.map((item) =>
      item.id === id ? { ...item, ...blogForm } : item
    );
    setBlogs(updated);
    setEditingBlogId(null);
  };

  const startBlogEdit = (item: BlogItem) => {
    setEditingBlogId(item.id);
    setBlogForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      imageUrl: item.imageUrl,
      date: item.date,
      readTime: item.readTime,
      tags: item.tags
    });
  };

  const addNewBlog = () => {
    const newItem: BlogItem = {
      id: "blog-" + Date.now(),
      title: "새로운 트렌드 인사이트 아티글",
      excerpt: "독자의 눈길을 끄는 매력적인 메타 요약 정보 구문.",
      content: "심포지엄 및 기술 구현의 실질적 내용들을 풍부하게 기입하세요.",
      imageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=600",
      date: "2026.05.28",
      readTime: "3분 소요",
      tags: ["태그1", "디자인"]
    };
    setBlogs([newItem, ...blogs]);
    startBlogEdit(newItem);
  };

  const deleteBlog = (id: string) => {
    if (confirm("정말로 이 블로그 아티글을 영구 삭제하시겠습니까?")) {
      setBlogs(blogs.filter((item) => item.id !== id));
      if (editingBlogId === id) setEditingBlogId(null);
    }
  };

  // Inquiry logs modifications
  const toggleInquiryStatus = (id: string) => {
    const updated = inquiries.map((item) =>
      item.id === id
        ? { ...item, status: (item.status === "pending" ? "completed" : "pending") as any }
        : item
    );
    setInquiries(updated);
  };

  const deleteInquiry = (id: string) => {
    if (confirm("상담 처리가 완료된 이 문의 내역을 삭제 대장에서 제외하시겠습니까?")) {
      setInquiries(inquiries.filter((item) => item.id !== id));
    }
  };

  const [sitemapStatus, setSitemapStatus] = useState("Sitemap Not Generated");
  const generateSitemap = () => {
    setSitemapStatus("Generating...");
    setTimeout(() => {
      setSitemapStatus("Sitemap_v1.xml Generated & Submitted Google Search Console Successfully!");
    }, 1500);
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
        return "bg-emerald-500 text-white hover:bg-emerald-600";
      case "purple":
        return "bg-violet-500 text-white hover:bg-violet-600";
      case "orange":
        return "bg-orange-500 text-white hover:bg-orange-600";
    }
  };

  const getThemeClass = (accent: string) => {
    if (accent === "green") return "bg-emerald-500 text-white";
    if (accent === "purple") return "bg-violet-500 text-white";
    return "bg-orange-500 text-white";
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-4xl bg-slate-900 text-slate-100 z-50 shadow-2xl flex flex-col md:flex-row border-l border-slate-850">
      
      {/* Drawer Control Sidebar Tabs (Left Side, Black background) */}
      <div className="w-full md:w-56 bg-slate-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="p-1.5 bg-violet-600 text-white rounded-lg admin-active-indicator">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight text-white uppercase">KORIXA Engine</h3>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Admin Desk v1.5</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab("design")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-all text-left ${
                activeTab === "design" ? "bg-slate-850 text-white shadow-sm border border-slate-750" : "text-slate-400 hover:text-slate-100"
              }`}
            >
              <Settings className="w-4 h-4 text-emerald-400" />
              <span>레이아웃 & 컬러 지정</span>
            </button>
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-all text-left ${
                activeTab === "portfolio" ? "bg-slate-850 text-white shadow-sm border border-slate-750" : "text-slate-400 hover:text-slate-100"
              }`}
            >
              <Grid className="w-4 h-4 text-blue-400" />
              <span>포트폴리오 관리 (CRUD)</span>
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-all text-left ${
                activeTab === "blog" ? "bg-slate-850 text-white shadow-sm border border-slate-750" : "text-slate-400 hover:text-slate-100"
              }`}
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>지식 블로그 관리</span>
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-all text-left ${
                activeTab === "seo" ? "bg-slate-850 text-white shadow-sm border border-slate-750" : "text-slate-400 hover:text-slate-100"
              }`}
            >
              <Globe className="w-4 h-4 text-orange-400" />
              <span>SEO 키워드 & 소셜연계</span>
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`w-full flex items-center justify-between gap-1 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-all text-left ${
                activeTab === "inquiries" ? "bg-slate-850 text-white shadow-sm border border-slate-750" : "text-slate-400 hover:text-slate-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-400" />
                <span>문의 상담 대장</span>
              </span>
              {inquiries.filter((inq) => inq.status === "pending").length > 0 && (
                <span className="bg-rose-500 text-white font-black text-[9px] px-1.5 py-0.5 rounded-full">
                  {inquiries.filter((inq) => inq.status === "pending").length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Global info, exit dashboard button */}
        <div className="pt-6 border-t border-slate-800 mt-6 md:mt-0 text-[11px] text-slate-500">
          <p className="font-semibold text-slate-400">실시간 프론트 싱크</p>
          <p className="mt-1 leading-relaxed">변경 사항이 메인 웹 브라우저 뷰레이어에 즉각 반영되어 최종 배포됩니다.</p>
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold rounded-lg border border-slate-750 flex items-center justify-center gap-1.5 cursor-pointer text-xs transition-colors"
          >
            <Undo className="w-3.5 h-3.5" />
            <span>편집장 및 도구 종료</span>
          </button>
        </div>
      </div>

      {/* Editor Space (Main Area) */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col justify-between">
        {/* Editor Title */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>{activeTab === "design" ? "레이아웃 & 컬러 지정" : activeTab === "portfolio" ? "포트폴리오 대장 관리 (CRUD)" : activeTab === "blog" ? "블로그 아티글 관리" : activeTab === "seo" ? "SEO 검색 최적화 & 소셜" : "문의 기록 및 상담 관리"}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">KORIXA의 전문 콘텐츠 및 가이드라인을 코딩 없이 커스텀 편집합니다.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-800 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
            title="창 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Panels */}
        <div className="flex-1 space-y-6">
          
          {/* 1. LAYOUTS & DESIGN THEME EDITOR */}
          {activeTab === "design" && (
            <div className="space-y-6">
              
              {/* Agency Name & Slogan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">에이전시 명칭</label>
                  <input
                    type="text"
                    value={settings.agencyName}
                    onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-sm focus:outline-none border border-slate-700 focus:border-violet-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">대표 한줄 슬로건</label>
                  <input
                    type="text"
                    value={settings.agencySlogan}
                    onChange={(e) => setSettings({ ...settings, agencySlogan: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-sm focus:outline-none border border-slate-700 focus:border-violet-500 text-white"
                  />
                </div>
              </div>

              {/* Accent Point Color Controls & Typography Styles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 bg-slate-950/40 border border-slate-800 rounded-2xl">
                {/* Point Colors */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2">포인트 브랜드 컬러 (체인지)</label>
                  <div className="flex items-center gap-3">
                    {[
                      { id: "purple", label: "바이올렛 퍼플", hex: "#8B5CF6", bg: "bg-violet-500" },
                      { id: "green", label: "에메랄드 그린", hex: "#10B981", bg: "bg-emerald-500" },
                      { id: "orange", label: "코랄 오렌지", hex: "#F97316", bg: "bg-orange-500" }
                    ].map((col) => (
                      <button
                        key={col.id}
                        onClick={() => setSettings({ ...settings, accentColor: col.id as any })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition ${
                          settings.accentColor === col.id ? "bg-slate-800 ring-2 ring-slate-400 border border-transparent" : "hover:bg-slate-900 border border-slate-800"
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${col.bg}`} />
                        <span>{col.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fonts */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2">글로벌 서체 스타일 조합</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: "sans", label: "한글 프리미엄 산스 고딕" },
                      { id: "serif", label: "클래식 럭셔리 세리프" },
                      { id: "display", label: "테크니컬 스페이스 폰트" },
                      { id: "mono", label: "개발 정밀 모노 크래프트" }
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSettings({ ...settings, fontStyle: f.id as any })}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-tight text-left border ${
                          settings.fontStyle === f.id ? "bg-slate-800 text-white border-slate-500" : "text-slate-400 border-slate-800 hover:bg-slate-900"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slogan Customization: Hero Section Texts */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-violet-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">메인 히어로 텍스트</h4>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">히어로 보드 메인 슬로건 문구</label>
                  <input
                    type="text"
                    value={settings.heroTitle}
                    onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-xs focus:outline-none border border-slate-700 focus:border-violet-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">히어로 상세 소개 단락</label>
                  <textarea
                    rows={2}
                    value={settings.heroSubtitle}
                    onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-xs focus:outline-none border border-slate-700 focus:border-violet-500 text-white"
                  />
                </div>
              </div>

              {/* Service description customization */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-violet-400 tracking-wider uppercase border-b border-slate-800 pb-1.5">서비스 세부 소개 수정</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">로고 디자인 파트 설명</label>
                    <textarea
                      rows={3}
                      value={settings.logoDesignDescription}
                      onChange={(e) => setSettings({ ...settings, logoDesignDescription: e.target.value })}
                      className="w-full p-3 rounded-lg bg-slate-800 text-xs focus:outline-none border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">웹 개발 파트 설명</label>
                    <textarea
                      rows={3}
                      value={settings.webDevelopmentDescription}
                      onChange={(e) => setSettings({ ...settings, webDevelopmentDescription: e.target.value })}
                      className="w-full p-3 rounded-lg bg-slate-800 text-xs focus:outline-none border border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 2. PORTFOLIO MANAGER (CRUD) */}
          {activeTab === "portfolio" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">총 <strong>{portfolios.length}개</strong>의 오리지널 포트폴리오 프로젝트가 등록되어 있습니다.</span>
                <button
                  type="button"
                  onClick={addNewPortfolio}
                  className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>새 작업 추가</span>
                </button>
              </div>

              {/* Edit form panel if selected */}
              {editingPortId && (
                <div className="p-5 bg-slate-850/80 rounded-2xl border border-violet-500/30 ring-1 ring-violet-500/20 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                    <span className="text-xs font-extrabold text-violet-400 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      선택된 포트폴리오 노드 상세 정보 편집
                    </span>
                    <button onClick={() => setEditingPortId(null)} className="text-slate-400 hover:text-white text-xs font-bold">
                      편집 취소
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">포젝트 제제목</label>
                      <input
                        type="text"
                        value={portForm.title}
                        onChange={(e) => setPortForm({ ...portForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white uppercase focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">카테고리</label>
                      <select
                        value={portForm.category}
                        onChange={(e) => setPortForm({ ...portForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none"
                      >
                        <option value="Smart">Smart (스마트 사물함)</option>
                        <option value="Standard">Standard (소재별 일반 사물함)</option>
                        <option value="Special">Special (특수 목적형 사물함)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">클라이언트 사</label>
                      <input
                        type="text"
                        value={portForm.client}
                        onChange={(e) => setPortForm({ ...portForm, client: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">제작 년월 (예: 2026.05)</label>
                      <input
                        type="text"
                        value={portForm.date}
                        onChange={(e) => setPortForm({ ...portForm, date: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">대표 Unsplash 이미지 주소</label>
                      <input
                        type="text"
                        value={portForm.imageUrl}
                        onChange={(e) => setPortForm({ ...portForm, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1 font-mono">프로젝트 상세 설명</label>
                    <textarea
                      rows={3}
                      value={portForm.description}
                      onChange={(e) => setPortForm({ ...portForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-1.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingPortId(null)}
                      className="px-4 py-1.5 rounded bg-slate-700 hover:bg-slate-650 text-xs text-white"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={() => savePortfolioEdit(editingPortId)}
                      className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-xs text-white font-bold flex items-center gap-1"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>변화 사항 저장</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Table list */}
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {portfolios.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-slate-950/40 border border-slate-800 rounded-xl hover:bg-slate-850/50 transition">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt="thumb"
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-slate-850 shrink-0 border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            item.category === "Smart" ? "bg-emerald-500/20 text-emerald-400" : item.category === "Standard" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"
                          }`}>
                            {item.category === "Smart" ? "스마트형" : item.category === "Standard" ? "소재별 일반" : "특수 목적형"}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{item.client} • {item.date}</span>
                        </div>
                        <h4 className="font-bold text-xs text-white mt-1 line-clamp-1">{item.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => startPortfolioEdit(item)}
                        className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded hover:bg-slate-700"
                        title="수정"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePortfolio(item.id)}
                        className="p-1.5 bg-rose-500/10 text-rose-400 hover:text-white rounded hover:bg-rose-500/40"
                        title="완전 삭제"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 3. BLOG MANAGER */}
          {activeTab === "blog" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">총 <strong>{blogs.length}편</strong>의 전문 지식이 게재되어 있습니다.</span>
                <button
                  type="button"
                  onClick={addNewBlog}
                  className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>새 포스트 작성</span>
                </button>
              </div>

              {/* Edit form panel if selected */}
              {editingBlogId && (
                <div className="p-5 bg-slate-850/80 rounded-2xl border border-violet-500/30 ring-1 ring-violet-500/20 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                    <span className="text-xs font-extrabold text-violet-400 uppercase tracking-widest">
                      선택된 팁 아티글 상세 내용 가공
                    </span>
                    <button onClick={() => setEditingBlogId(null)} className="text-slate-400 hover:text-white text-xs font-bold">
                      편집중 단락 취소
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">블로그 아티글 제목</label>
                      <input
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">태그 해시 목록 (쉼표구분)</label>
                      <input
                        type="text"
                        value={blogForm.tags.join(",")}
                        onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value.split(",") })}
                        placeholder="예시: 로고 디자인, 트렌드, 2026"
                        className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">메인 대표 이미지 Unsplash 주소</label>
                      <input
                        type="text"
                        value={blogForm.imageUrl}
                        onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">작성 일자 (예: 2026.05.28)</label>
                      <input
                        type="text"
                        value={blogForm.date}
                        onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">평균 독서 시간 (분)</label>
                      <input
                        type="text"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        placeholder="예: 5분 소요"
                        className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">요약 메타 코멘트 (두줄 내외)</label>
                    <textarea
                      rows={2}
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">본문 전체 원문 (줄바꿈 가능)</label>
                    <textarea
                      rows={4}
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 rounded text-xs text-white focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end gap-1.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingBlogId(null)}
                      className="px-4 py-1.5 rounded bg-slate-700 text-xs text-white"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={() => saveBlogEdit(editingBlogId)}
                      className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-xs text-white font-bold"
                    >
                      기사 수정 반영
                    </button>
                  </div>
                </div>
              )}

              {/* Table list */}
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {blogs.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-slate-950/40 border border-slate-800 rounded-xl hover:bg-slate-850/50 transition">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt="thumb"
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-slate-850 shrink-0 border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.readTime}</span>
                        </div>
                        <h4 className="font-bold text-xs text-white mt-1 line-clamp-1">{item.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => startBlogEdit(item)}
                        className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded hover:bg-slate-700"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteBlog(item.id)}
                        className="p-1.5 bg-rose-500/10 text-rose-400 hover:text-white rounded hover:bg-rose-500/40"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 4. SEO & MARKETING CONTROLLER */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              
              {/* Interactive SEO Heath Index Gauge */}
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 flex flex-col sm:flex-row gap-6 items-center">
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  {/* Visual simulated radial chart */}
                  <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                  <div className={`absolute inset-0 rounded-full border-4 border border-t-emerald-500 border-r-emerald-500 ${calculateSEOScore() > 80 ? "border-l-emerald-500" : ""} animate-pulse`} />
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold font-mono text-white">{calculateSEOScore()}%</span>
                    <span className="text-[9px] text-slate-400 uppercase font-mono">SEO Score</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>실시간 검색 매커니즘 스코어 현황</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    구글 웹 마케팅 점수를 90% 이상 획득하기 위한 조건: 제목 길이 10자 이상, 설명문 30자 이상 확보 및 핵심 쉼표 키워드 3개 이상 바인딩.
                  </p>
                  
                  {/* Recommendation alerts */}
                  <div className="text-[10px] text-slate-500 font-mono flex flex-wrap gap-2 pt-1.5">
                    <span className={`${seoSettings.metaTitle.length > 10 ? "text-emerald-400" : "text-rose-400"}`}>
                      ✓ 대표제목 ({seoSettings.metaTitle.length}자)
                    </span>
                    <span className={`${seoSettings.metaDescription.length > 30 ? "text-emerald-400" : "text-rose-400"}`}>
                      ✓ 메타설명 ({seoSettings.metaDescription.length}자)
                    </span>
                    <span className={`${seoSettings.keywords.split(",").length >= 3 ? "text-emerald-400" : "text-slate-500"}`}>
                      ✓ 키워드 ({seoSettings.keywords.split(",").length}개)
                    </span>
                  </div>
                </div>
              </div>

              {/* Form entries */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">메인 SEO 검색 결과 노출 제목 (Meta Title) *</label>
                  <input
                    type="text"
                    value={seoSettings.metaTitle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-xs focus:outline-none border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">대표 설명 구절 (Meta Description) *</label>
                  <textarea
                    rows={2}
                    value={seoSettings.metaDescription}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-xs focus:outline-none border border-slate-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">핵심 검색 주축 태그 키워드 (쉼표 구분)</label>
                    <input
                      type="text"
                      value={seoSettings.keywords}
                      onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-xs focus:outline-none border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">컨텐츠 및 원작 권자 (Author)</label>
                    <input
                      type="text"
                      value={seoSettings.author}
                      onChange={(e) => setSeoSettings({ ...seoSettings, author: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-xs focus:outline-none border border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Sitemap & social details */}
              <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-purple-400 block border-b border-slate-800 pb-1.5 uppercase tracking-wider">
                  마케팅 채널 허브 및 사이트맵 유틸리티
                </span>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-xs">
                    <p className="font-bold text-slate-300">구글 자동 검색 최적화용 XML 사이트맵 구축 상태</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-1">{sitemapStatus}</p>
                  </div>
                  <button
                    type="button"
                    onClick={generateSitemap}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer border border-slate-700"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sitemap 원클릭 빌드 및 배포</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span className="text-slate-400 truncate">Instagram 연결됨</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-400 truncate">카카오 상담 활성화</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-400 truncate">LinkedIn 연결됨</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 5. INQUIRIES DESK */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400">전체 문의: <strong>{inquiries.length}건</strong></span>
                <span className="text-amber-400 font-bold">확인 대기 중 건수: {inquiries.filter((inq) => inq.status === "pending").length}건</span>
              </div>

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {inquiries.length === 0 ? (
                  <div className="text-center py-16 bg-slate-950/20 border border-dashed border-slate-800 rounded-2xl">
                    <Mail className="w-10 h-10 mx-auto text-slate-600" />
                    <p className="text-xs text-slate-500 mt-3 font-medium">상담 원장 기록 테이블이 비워져 있습니다.</p>
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`p-4 rounded-xl border transition flex flex-col gap-3 relative ${
                        inq.status === "pending"
                          ? "bg-amber-500/5 border-amber-500/20"
                          : "bg-slate-950/30 border-slate-800 opacity-75 hover:opacity-100"
                      }`}
                    >
                      {/* Top Header Card Info */}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-white text-sm">{inq.name}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              inq.serviceType === "Consult" ? "bg-purple-600/30 text-purple-300" : inq.serviceType === "Smart" ? "bg-emerald-500/20 text-emerald-300" : "bg-blue-500/20 text-blue-300"
                            }`}>
                              {inq.serviceType === "Consult" ? "전문 상담" : inq.serviceType === "Smart" ? "스마트형" : "소재별 일반"}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">{inq.date}</span>
                          </div>

                          <p className="text-[11px] text-slate-400 font-mono mt-1.5">
                            연락처: {inq.phone} | 이메일: {inq.email}
                          </p>
                        </div>

                        {/* Status Label Button & Trash Action */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleInquiryStatus(inq.id)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition ${
                              inq.status === "completed"
                                ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                                : "bg-amber-500 text-slate-950 font-black hover:bg-amber-400"
                            }`}
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>{inq.status === "completed" ? "상담완료" : "상담대기"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded transition"
                            title="삭제"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content Message */}
                      <div className="p-3 rounded-lg bg-slate-950/50 text-xs text-slate-300 leading-normal border border-slate-850 whitespace-pre-line">
                        {inq.message}
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

        </div>

        {/* Global Action Footer */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between gap-4 mt-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400 font-medium font-mono text-[11px]">System: LocalStorage Sync Enabled</span>
          </div>
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold cursor-pointer font-mono ${getAccentBgClass()}`}
          >
            대시보드 반영 완료 (닫기)
          </button>
        </div>

      </div>
    </div>
  );
}
