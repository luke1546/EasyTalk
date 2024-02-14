async function fetchSentenceList() {
  const response = await axios.get('http://localhost/study/sentence/list');
  const sentenceList = response.data;
  return sentenceList;
}

const typeEng = ["travel", "study", "introduce", "bussiness", "friendly", "restaurant"];
const typeKor = ["여행", "공부", "소개", "업무", "친목", "식당"];

// 음악 정보를 테이블에 추가하는 함수
function addSentenceToTable(sentence) {
  const table = document.getElementById('sentenceTable');
  const row = table.insertRow();
  const sentenceIdCell = row.insertCell();
  const sentenceCell = row.insertCell();
  const meaningCell = row.insertCell();
  sentenceIdCell.textContent = sentence.sentenceId;
  sentenceCell.textContent = sentence.sentence;
  meaningCell.textContent = sentence.meaning;

  for (let i = 0; i < 6; i++) {
      const btnCell = row.insertCell();
      const btn = document.createElement('button');
      btn.textContent = typeKor[i];
      btn.value = typeEng[i]; // 버튼의 value 설정
      btn.onclick = function () { sendRequest(sentence.sentenceId, this.value); }; // 클릭 이벤트 핸들러 추가
      btnCell.appendChild(btn);
    }
}

async function sendRequest(sentenceId, btnValue) {
  const response = await axios.put('http://localhost/study/sentence/update', { // PUT 요청으로 변경
    sentenceId: sentenceId, // sentenceId를 요청과 함께 보냄
    type: btnValue // 버튼의 value를 요청과 함께 보냄
  });
  console.log(response.data);
}

// 페이지 로딩이 완료되면 실행할 함수
window.onload = async function() {
  const sentenceList = await fetchSentenceList();
  for (const sentence of sentenceList) {
    addSentenceToTable(sentence);
  }
};