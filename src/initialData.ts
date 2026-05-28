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
    title: "스마트 단기 무인 보관 시스템 (KORIXA Smart Locker-S)",
    category: "Logo",
    client: "서울교통공사 및 메트로 쇼핑몰",
    imageUrl: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=600",
    description: "지하철역 및 초고층 랜드마크용 보관함으로, 모바일 페이먼트 결제 연동 터치 스크린과 실시간 배정 시스템이 가동되는 미래형 스마트 스테이션. 퍼플, 주황, 녹색의 하모니.",
    date: "2026.03"
  },
  {
    id: "port-2",
    title: "프리미엄 비즈니스 오피스 사물함 (KORIXA Business Locker)",
    category: "Branding",
    client: "판교 카카오 테크허브 신사옥",
    imageUrl: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=600",
    description: "스마트 오피스용 다이얼 및 모바일 사원증 NFC 자동 언락 사물함. 감각적인 퍼플 라인 익스테리어와 친환경 목재/강판 믹스 매치 피니시.",
    date: "2026.04"
  },
  {
    id: "port-3",
    title: "주거 단지형 지능형 무인 택배함 (KORIXA Parcel Garden)",
    category: "Logo",
    client: "자이 앤 프레스티지 대단지 아파트",
    imageUrl: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?auto=format&fit=crop&q=80&w=600",
    description: "아파트 단지 특화형 비대면 무인 익스프레스 자동 보관 락커 시스템. 눈과 비를 완벽 차단하는 실외용 특수 도장 기술과 엠비언트 그린 발광 키패드 적용.",
    date: "2026.02"
  },
  {
    id: "port-4",
    title: "럭셔리 골프 & 피트니스 클럽 락커 (KORIXA Royal Club Sports)",
    category: "Branding",
    client: "해슬리 나인브릿지 CC 최고급 클럽하우스",
    imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=600",
    description: "원목 가구 비례 디자인과 내장형 방수 정밀 실린더 도어록이 장착된 프리미엄 피트니스 락커룸. 코릭사의 주황 컬러 가죽 시팅 벤치와의 일체형 구축.",
    date: "2026.05"
  },
  {
    id: "port-5",
    title: "콜드 체인 바이오 신선 식품 락커 (KORIXA Frozen Shield)",
    category: "Website",
    client: "마켓컬리 콜센터 로지스틱스",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    description: "고정밀 인버터 압축기를 결합하여 영하 18도부터 영하 2도까지 오차 범위 0.2도 내에서 정밀 통제하는 스마트 바이오 콜드-스토리지 보관 키오스크 챔버 관리용 웹 연동.",
    date: "2026.01"
  },
  {
    id: "port-6",
    title: "무인 독서실 & 하이브리드 좌석 연동 사물함 (KORIXA Study Center)",
    category: "Website",
    client: "작심독서실 전국 직영 체인망",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    description: "독서실 및 공유 스페이스 플랫폼 전용 락커로 만기 알림 발송, 키오스크 결제 연동 자동 기한 차단 기술이 완벽 연계된 저소음 충격 분산형 전자 락커 제어 웹.",
    date: "2026.05"
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
    excerpt: "코릭사가 독자 개발한 극초단파 열처리 정밀 도장과 퍼플, 오렌지, 에메랄드 그린 컬러 표현을 위한 고기능 안료 배합 공정의 모든 것.",
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
    serviceType: "All-in-One",
    message: "성동구 신축 대단지 아파트 총 1,800세대에 각 동 로비마다 매립식 스마트 택배 무인 시스템 및 자전거 무인 보관 시설을 올인원으로 도킹 도입하고자 합니다. 단체 제휴 도면 지원과 코릭사의 주황색 시그니처 락커 실리콘 샘플 견적이 시급합니다.",
    date: "2026-05-27 15:42",
    status: "pending"
  },
  {
    id: "inq-2",
    name: "한상엽 기획이사",
    email: "syhan@smartworking.io",
    phone: "010-9921-5503",
    serviceType: "Website",
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
