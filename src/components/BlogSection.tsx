/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BookOpen, Calendar, Clock, ChevronRight, X, Sparkles, User, Tag } from "lucide-react";
import { BlogItem, SiteSettings } from "../types";

interface BlogSectionProps {
  blogs: BlogItem[];
  settings: SiteSettings;
}

export default function BlogSection({ blogs, settings }: BlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogItem | null>(null);

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

  const getAccentLightBgClass = () => {
    switch (settings.accentColor) {
      case "green":
        return "bg-emerald-50 text-emerald-800 border-emerald-100";
      case "purple":
        return "bg-violet-50 text-violet-800 border-violet-100";
      case "orange":
        return "bg-orange-50 text-orange-800 border-orange-100";
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
    <section id="blog" className="py-24 bg-gray-50/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Grid */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-xs uppercase font-bold tracking-widest ${getAccentTextClass()}`}>
            STUDIO INSIGHTS
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 mt-2 ${getFontClass()}`}>
            비즈니스의 성장을 돕는 지식 콘텐츠
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-4">
            KORIXA 전문가 그룹이 제안하는 최신 그래픽 브랜딩 화두, 테크니컬 성능 튜닝 가이드, <br className="hidden sm:inline" />
            웹 최적화 마케팅 인사이트를 지속적으로 공유합니다.
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl shadow-sm">
            <BookOpen className="w-10 h-10 mx-auto text-gray-300" />
            <p className="text-gray-500 text-sm mt-4 font-medium">등록된 블로그 포스트가 없습니다.</p>
            <p className="text-xs text-gray-400 mt-1">블로그 탭은 관리자 영역을 통해 언제든지 실시간으로 생성할 수 있습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full"
              >
                {/* Banner Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1 max-w-[80%]">
                    {post.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold text-white bg-black/50 backdrop-blur px-2 py-0.5 rounded-full border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold text-gray-950 tracking-tight leading-snug group-hover:text-violet-500 line-clamp-2 transition-colors ${getFontClass()}`}>
                      {post.title}
                    </h3>

                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold mt-6 pt-4 border-t border-gray-50 uppercase tracking-wide group-hover:underline self-start">
                    <span className={`${getAccentTextClass()}`}>아티글 전체 읽기</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${getAccentTextClass()}`} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Selected Post Reader Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
            <div className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
              {/* Cover Banner Header */}
              <div className="relative h-56 sm:h-72 bg-gray-100">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 bg-black/45 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur"
                  title="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Interactive Reading Panel */}
              <div className="p-6 sm:p-10 overflow-y-auto">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-mono mb-4 border-b pb-3 border-gray-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    작성일: {selectedPost.date}
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    독서 소요: {selectedPost.readTime}
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    KORIXA 수석 집필진
                  </span>
                </div>

                {/* Heading */}
                <h3 className={`text-2xl sm:text-3xl font-black text-gray-950 tracking-tight leading-tight mb-6 ${getFontClass()}`}>
                  {selectedPost.title}
                </h3>

                {/* Excerpt emphasis paragraph */}
                <p className="text-gray-950 font-bold border-l-4 border-gray-300 pl-4 py-1 text-sm bg-gray-50 rounded-r-xl p-3 mb-6">
                  {selectedPost.excerpt}
                </p>

                {/* Markdown-like body content */}
                <div className="text-gray-700 text-sm sm:text-base leading-8 space-y-5 whitespace-pre-line">
                  {selectedPost.content}
                </div>

                {/* Author Credit */}
                <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100/80 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-xs font-mono">
                      KX
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">KORIXA 브랜드 리서치 유닛</p>
                      <p className="text-gray-500 mt-0.5 text-[11px]">성공적인 로고디자인 및 하이엔드 테크 웹 브랜딩 자문 수행 중</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center">
                    {selectedPost.tags.map((tag, i) => (
                      <span key={i} className={`flex items-center gap-1 px-2.5 py-1 border rounded-lg text-xs font-medium ${getAccentLightBgClass()}`}>
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom interaction controls */}
              <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 rounded-xl border text-xs font-semibold bg-white hover:bg-gray-100 text-gray-700 transition"
                >
                  기사 정독 완료 (닫기)
                </button>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow transition ${getAccentBgClass()}`}
                >
                  브랜드 컨설팅 상담 신청하기
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
