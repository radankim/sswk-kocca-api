export default async function handler(request, response) {
  const apiKey = process.env.KOCCA_FINANCE_KEY;
  const { pageNo = 1 } = request.query;
  const url = `https://kocca.kr/api/finance/List.do?serviceKey=${apiKey}&pageNo=${pageNo}&numOfRows=30&viewStartDt=20240101`;

  try {
    const fetchResponse = await fetch(url);
    const data = await fetchResponse.json();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: 'Error fetching finance data' });
  }
}
