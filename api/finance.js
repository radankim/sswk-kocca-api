export default async function handler(request, response) {
  // 캐시 설정: 3600초(1시간) 동안 저장
  response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  const apiKey = process.env.KOCCA_FINANCE_KEY;
  const { pageNo = 1 } = request.query;
  // 50개 유지
  const url = `https://kocca.kr/api/finance/List.do?serviceKey=${apiKey}&pageNo=${pageNo}&numOfRows=50&viewStartDt=20240101`;

  try {
    const fetchResponse = await fetch(url);
    const data = await fetchResponse.json();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: 'Error fetching finance data' });
  }
}
