import { BedType } from "types/room";

export const monthList = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

export const yearList = Array.from(Array(121), (_, i) => String(2021 - i));

export const bedroomCountList = Array.from(Array(16), (_, i) =>
  String(`침실 ${i}개`),
);

/*
숙소 큰 범위 건물 유형
*/
export const largeBuildingTypeList = [
  "아파트",
  "주택",
  "별채",
  "독특한 숙소",
  "B&B",
  "부티크호텔",
];

export const convertLargeBuilding: any = {
  아파트: "apartment",
  주택: "houst",
  별채: "secondary",
  독특한: "unique",
  "B&B": "b&b",
  부티크호텔: "hotel",
};

/*
숙소 건물 유형
*/
export const buildingTypeList: any = {
  apartment: [
    "아파트",
    "공동 주택",
    "별채",
    "카사 파르티쿨라르(쿠바)",
    "로프트",
    "레지던스",
  ],
  houst: [
    "주택",
    "방갈로",
    "통나무 집",
    "카사 파르티쿨라르(쿠바)",
    "살레",
    "전원주택",
    "키클라데스 주택(그리스)",
    "담무소(이탈리아)",
    "돔하우스",
    "땅속의집",
    "농장 체험 숙박",
    "하우스 보트",
    "오두막",
    "등대",
    "팬션(한국)",
    "마차(영국,프랑스)",
    "초소형주택",
    "타운하우스",
    "트를로(이탈리아)",
    "저택",
  ],
  secondary: ["게스트용 별채", "게스트 스위트", "농장 체험 숙박"],
  unique: [
    "헛간",
    "보트",
    "버스",
    "캠핑카",
    "캠핑장",
    "성",
    "동굴",
    "돔하우스",
    "땅속의 집",
    "농장 체험 숙박",
    "하우스 보트",
    "오두막",
    "이글루",
    "섬",
    "등대",
    "팬션(한국)",
    "비행기",
    "마차(영국,프랑스)",
    "텐트",
    "초소형 주택",
    "티피",
    "기차",
    "트리하우스",
    "풍차",
    "유르트",
  ],
  "b&b": [
    "B&B",
    "카사 파르티쿨라르(쿠바)",
    "농장 체험 숙박",
    "민수(대만)",
    "산장",
    "료칸(일본)",
  ],
  hotel: [
    "부티크 호텔",
    "아파트 호텔",
    "헤리티지 호텔(인도)",
    "호텔",
    "산장",
    "리조트",
    "레지던스",
    "객잔(중국)",
  ],
};

export const roomTypeRadioList = [
  {
    label: "집 전체",
    value: "entire",
    description:
      "게스트가 숙소 전체를 다른 사람과 공유하지 않고 단독으로 이용합니다. 일반적으로 침실, 욕실, 부엌이 포함됩니다.",
  },
  {
    label: "개인실",
    value: "private",
    description:
      "게스트에게 개인 침실이 제공됩니다. 침실 이외의 공간은 공용일 수 있습니다.",
  },
  {
    label: "다인실",
    value: "public",
    description:
      "게스트는 개인 공간 없이, 다른 사람과 함께 쓰는 침실이나 공용 공간에서 숙박합니다.",
  },
];

export const isSetUpForGuestOptions = [
  {
    label: "예, 게스트용으로 따로 마련된 숙소입니다.",
    value: true,
  },
  {
    label: "아니요. 제 개인 물건이 숙소에 있습니다.",
    value: false,
  },
];

export const bedTypes: BedType[] = [
  "소파",
  "에어 매트릭스",
  "요와 이불",
  "싱글",
  "더블",
  "퀸",
  "이층 침대",
  "바닥용 에어매트릭스",
  "유아 침대",
  "유아용 침대",
  "해먹",
  "물침대",
];

export const bathroomRadioList = [
  { value: "private", label: "예" },
  { value: "public", label: "아니요, 공용입니다." },
];

export const countryList = [
  "가나",
  "가봉",
  "감비아",
  "과들루프",
  "과테말라",
  "괌",
  "그루지야",
  "그리스",
  "그린란드",
  "기니",
  "나미비아",
  "나우르",
  "나이지리아",
  "남아프리카",
  "네덜란드",
  "카리브",
  "네팔",
  "노르웨이",
  "뉴질랜드",
  "대만",
  "덴마크",
  "독일",
  "라오스",
  "러시아",
  "레바논",
  "레소토",
  "루마니아",
  "룩셈부르크",
  "리비아",
  "마카오",
  "말레이시아",
  "말리",
  "멕시코",
  "모나코",
  "몬테네그로",
  "몰디브",
  "몽골",
  "미국",
  "바티칸",
  "베트남",
  "벨기에",
  "볼리비아",
  "불가리아",
  "브라질",
  "세네갈",
  "세르비아",
  "스웨덴",
  "스위스",
  "스페인",
  "싱가포르",
  "아르메니아",
  "아일랜드",
  "알제리",
  "오스트레일리아",
  "오스트리아",
  "영국",
  "우크라이나",
  "이스라엘",
  "이집트",
  "이탈리아",
  "인도",
  "인도네시아",
  "일본",
  "자메이카",
  "중국",
  "집바브웨",
  "체코",
  "칠레",
  "카메룬",
  "캐나다",
  "케냐",
  "쿠바",
  "태국",
  "터키",
  "파라과이",
  "페루",
  "포르투갈",
  "폴란드",
  "프랑스",
  "필리핀",
  "대한민국",
  "홍콩",
];

export const amentityList = [
  "무선 인터넷",
  "TV",
  "난방",
  "에어컨",
  "다리미",
  "샴푸",
  "헤어 드라이어",
  "조식,커피,차",
  "업무 가능 공간/책상",
  "벽난로",
  "옷장/서랍장",
  "게스트 전용 출입문",
];

export const convenienceList = [
  "주방",
  "세탁 공간 - 세탁기",
  "세탁 공간 - 건조기",
  "주차",
  "헬스장",
  "수영장",
  "자쿠지",
];
