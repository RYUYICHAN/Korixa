/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteSettings, PortfolioItem, BlogItem, Inquiry, SEOMeta } from "./types";

export const defaultSiteSettings: SiteSettings = {
  agencyName: "KORIXA",
  agencySlogan: "공간에 가치와 안정감을 더하는 혁신 스마트 사물함 시스템",
  accentColor: "purple",
  fontStyle: "sans",
  heroTitle: "IoT 기술과 정밀 공학이 빚어낸 차세대 보관 솔루션, 코릭사.",
  heroSubtitle: "코릭사(KORIXA)는 보라색, 주황색, 녹색의 고유 컬러 아이덴티티와 최첨단 제어 시스템을 결합하여, 스마트 오피스 신사옥, 지하철역, 아파트, 레포츠 시설에 최고 안전 등급의 스마트 락커를 설계·제작·설치합니다.",
  logoDesignDescription: "인공지능(AI)과 사물인터넷(IoT) 기술이 결합되어 실시간 상태 관제, 생체인증/QR/PIN 멀티 수단 언락, 원격 제어 및 키오스크 주문 연동 시스템을 완비한 4차 산업형 차세대 스마트 보관 시스템입니다.",
  webDevelopmentDescription: "오랜 시간 녹슬지 않는 프리미엄 친환경 고압 분체 도장, 정밀 강판 절곡 제조 및 충격 분산형 실린더 도어 시스템을 도입하여 최고의 내구성과 심미적인 퍼플-오렌지-그린 하이테크 익스테리어를 실현합니다."
};

export const defaultPortfolios: PortfolioItem[] = [
  {
    id: "port-1",
    title: "유료 및 무료 다기능 스마트 사물함 (KORIXA Multi Smart Locker)",
    category: "Smart",
    client: "스파렉스 랜드 및 전국 공공 문화체육센터",
    imageUrl: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=600",
    description: "터치스크린 키오스크와 QR코드, 신용카드 결제 엔진이 탑재되어 유료/무료 동적 모드 설정이 실시간으로 지원되는 최첨단 지능형 보관 솔루션입니다.",
    date: "2026.03"
  },
  {
    id: "port-2",
    title: "세대별 주거지 및 빌딩 공용 통합 사물함 (KORIXA Resident Shared Locker)",
    category: "Smart",
    client: "헬리오시티 대단지 아파트 및 업무용 메가타워 빌딩",
    imageUrl: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&q=80&w=600",
    description: "입주민 NFC 카드 및 모바일 동기화 전용 키패드가 결합된 세대 매칭형 공용 택배 및 물품 보관 사물함으로 공간 편의성과 방수 보안을 완비하였습니다.",
    date: "2026.04"
  },
  {
    id: "port-3",
    title: "프리미엄 무소음 ABS 플라스틱 사물함 (KORIXA Tough ABS Locker)",
    category: "Standard",
    client: "강남 명문 오션 피트니스 및 스포츠 사우나 락커룸",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600",
    description: "부식과 충격에 극도로 강한 친환경 고강도 ABS 재질을 채택하여 물기가 많은 레포츠 시설 및 실외에서도 뒤틀림이나 녹 발생 없이 반영구적으로 보존됩니다.",
    date: "2026.02"
  },
  {
    id: "port-4",
    title: "원목 감성의 최고급 목재 친환경 사물함 (KORIXA Crafted Wood Locker)",
    category: "Standard",
    client: "대기업 본사 오피스 임원실 및 청담 프라이빗 라운지",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600",
    description: "유해물질 방출 제로 친환경 도료를 입힌 고밀도 원목 질감 보드로 맞춤 제작되어 중후한 품격을 선사하며, 원격 실린더 스마트락이 빌트인되어 마찰을 제어합니다.",
    date: "2026.05"
  },
  {
    id: "port-5",
    title: "정밀 강판 절곡 고기능 철제 사물함 (KORIXA Heavy Steel Cabinets)",
    category: "Standard",
    client: "현대 정밀 생산 기지 및 남동공단 물류 스마트 연구실",
    imageUrl: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=600",
    description: "정밀 절곡 1.2t 고강도 아연강판과 Pantone 색상을 완전하게 구현하는 고온 친환경 분체도장을 적용하여 물리적인 외압 및 기후 변화에도 녹과 변색 없이 내구성을 지킵니다.",
    date: "2026.01"
  },
  {
    id: "port-6",
    title: "스마트 전자기기 및 핸드폰 특화 보관함 (KORIXA Tech Cradle Mobile)",
    category: "Special",
    client: "판교 바이오 R&D 연구센터 및 테크노밸리 보안 회의실",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600",
    description: "개별 수납 칸마다 고성능 충전 고속 커넥터와 도난 방지용 전자 감지 키패드가 탑재된 정보 보안 전용 핸드폰 및 태블릿 특화 보관 솔루션입니다.",
    date: "2026.05"
  },
  {
    id: "port-7",
    title: "AI 센서 기반 지능형 재고관리 사물함 (KORIXA Smart Stock-Keeper)",
    category: "Special",
    client: "종합 의료원 특수 전문 의약품실 및 자재 물류 허브",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    description: "잠금 장치 실시간 관제와 정밀 중량 마이크로 센서가 결합하여 물품 입출고 내역이 즉시 클라우드망에 기록 완료되고 보관칸 재고 수량이 자동 동기화됩니다.",
    date: "2026.05"
  },
  {
    id: "port-8",
    title: "스마트 호텔 캐리어 & 대형 수하물 보관함 (KORIXA Luggage Butler)",
    category: "Special",
    client: "파라다이스 백화점 광장 및 공항 허브 리조트 라운지",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    description: "초대형 여행용 캐리어와 골프백 등을 직립 보관하도록 맞춤 특화된 대형 스토리지 시스템으로, 터치 키오스크 결제 연동 제어로 장갑이나 손 보호 기능을 극대화하였습니다.",
    date: "2026.04"
  }
];

export const defaultBlogs: BlogItem[] = [
  {
    id: "blog-1",
    title: "스마트 보관 인프라가 대학교 캠퍼스와 기업 사옥 생산성을 높이는 핵심 전략",
    excerpt: "NFC 카드와 모바일 앱으로 연동되는 개인 맞춤형 사물함이 공간 낭비를 줄이고 사무 환경 만족도를 비약적으로 높이는 통계 수치 분석.",
    content: "공유 오피스와 거점 근무제가 확산되면서 고정식 개인 캐비닛의 시대가 가고 스마트 모바일 연동 사물함이 주류로 올라서고 있습니다. 보관함 상태를 원격에서 실시간 조회하고, 비어있는 최적의 보관칸만 동적으로 할당받아 좌석 점유율을 극대화하는 코릭사의 다이내믹 오피스 알고리즘은 기존 사무 공간 배치 비용 대비 연간 최대 35%의 탄소 발생과 동선 소요 시간을 획기적으로 줄여줍니다.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
    date: "2026.05.20",
    readTime: "5분 소요",
    tags: ["스마트 오피스", "보관함 혁신", "NFC시스템"]
  },
  {
    id: "blog-2",
    title: "고온 친환경 분체도장 기법과 방청 기술: 절대로 녹슬지 않는 보관함 제작 핵심 공정",
    excerpt: "코릭사가 독자 개발한 극초단파 열처리 정밀 도장과 퍼플, 오렌지, 에메랄드 그린 제품 표현을 위한 pantone 색상컬러칩 그대로의 표현 공정.",
    content: "헬스장, 해수목욕탕, 레포츠 센터 등 다습한 고부식 환경에서 사물함 문짝이 어긋나거나 흰색 녹 및 시트지 벌어짐 현상은 치명적입니다. 코릭사 스마트 보관함은 냉간압연 아연도금 강판을 정밀 레이저 절단한 후, 유해 물질 배출이 제로에 가까운 친환경 열 가공 보강제를 180도 고온에서 분체 응축하여 기후 변화나 내외부 충격 가압에도 25년 이상 원본 색상과 매끄러운 텍스처를 안전하게 보호해 줍니다.",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600",
    date: "2026.05.15",
    readTime: "7분 소요",
    tags: ["분체 도장 공법", "내구성 분석", "공장 자동화"]
  },
  {
    id: "blog-3",
    title: "차세대 무인 스마트 택배함의 오프라인 보안을 높이는 비대면 제어 및 데이터 암호화 표준",
    excerpt: "해킹 차단 마이크로 컨트롤러 보드 및 암호화 이중화 프로토콜을 통과한 코릭사의 완전 무결성 락킹 엔진 설계 기술.",
    content: "보관함 통신 장애나 임의 락 해킹은 심각한 보안 사고를 야기합니다. 코릭사의 보안연구소는 각 사물함 잠금 모듈에 고유 암호키를 지닌 보안 전용 MCU를 장착하고, 키오스크 통신 패킷 전체를 강력한 하이브리드 AES-256 방식으로 이중 암호화하여 외부 조작을 완전 봉쇄합니다. 또한, 네트워크가 일시적으로 오프라인 상태가 되어도 내부 캐시 키를 활용해 안전하게 사물함을 여닫을 수 있는 오프라인 회복 탄력성(Offline Resilience) 기술을 탑재하였습니다.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
    date: "2026.05.02",
    readTime: "4분 소요",
    tags: ["스마트 보안", "MCU 보드 설계", "보관함 제어"]
  }
];

export const defaultInquiries: Inquiry[] = [
  {
    id: "inq-1",
    name: "박장수 입주자대표연합 회장",
    email: "jangsoo@xi-prestige.co.kr",
    phone: "010-4492-3810",
    serviceType: "Consult",
    message: "성동구 신축 대단지 아파트 총 1,800세대에 각 동 로비마다 매립식 스마트 택배 무인 시스템 및 자전거 무인 보관 시설을 올인원으로 도킹 도입하고자 합니다. 단체 제휴 도면 지원과 코릭사의 주황색 시그니처 락커 실리콘 샘플 견적이 시급합니다.",
    date: "2026-05-27 15:42",
    status: "pending"
  },
  {
    id: "inq-2",
    name: "한상엽 기획이사",
    email: "syhan@smartworking.io",
    phone: "010-9921-5503",
    serviceType: "Smart",
    message: "공유 피트니스 및 거점 러닝 클럽용 신형 블루투스 스마트 보관함 300대 대량 발주 및 관리용 키오스크 12인치 터치 모니터 연동 사양 납품 상담을 요합니다.",
    date: "2026-05-26 11:20",
    status: "completed"
  }
];

export const defaultSEOMeta: SEOMeta = {
  metaTitle: "KORIXA | 코릭사 프리미엄 스마트 보관함 & 사물함 시스템",
  metaDescription: "미래지향적 스마트 보관함 전문 제조업체 KORIXA(코릭사). 친환경 분체도장 사물함, 무인 택배 시스템, IoT 원격 제어 스마트 락커 솔루션의 대한민국 국가대표 브랜드입니다.",
  keywords: "코릭사, KORIXA, 코릭사 사물함, 스마트 보관함, 무인 택배함, 스마트 락커, 다이얼 사물함, 전자 보관함, 독서실 사물함, 목욕탕 락커룸, 사물함 제조업체",
  author: "KORIXA Smart Systems Ltd.",
  ogImage: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=1200"
};
