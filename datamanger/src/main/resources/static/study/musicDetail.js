async function axiosLyricList() {
  // 현재 페이지의 URL에서 'musicId' 파라미터 값을 가져옵니다.
  const params = new URLSearchParams(window.location.search);
  const musicId = params.get('musicId');
  console.log(musicId);  // 콘솔에 musicId 값을 출력합니다.
  const response = await axios.get('http://localhost/study/music/detail?musicId='+musicId);
  const lyricList = response.data;
  return lyricList;
}
// 음악 정보를 테이블에 추가하는 함수
// 가사 정보를 테이블에 추가하는 함수
function addLyricToTable(lyric) {
  const table = document.getElementById('lyricTable');
  const row = table.insertRow();
  const lyricIdCell = row.insertCell();
  const lyricCell = row.insertCell();
  const deleteCell = row.insertCell();  // 삭제 버튼을 위한 셀을 추가합니다.
  const meaningCell = row.insertCell();  // 삭제 버튼을 위한 셀을 추가합니다.
  const inputCell = row.insertCell();  // 삭제 버튼을 위한 셀을 추가합니다.
  const insertCell = row.insertCell();  // 삭제 버튼을 위한 셀을 추가합니다.

  lyricIdCell.textContent = lyric.lyricId;
  lyricCell.textContent = lyric.lyric;
  meaningCell.textContent = lyric.meaning;

  // 삭제 버튼을 생성하고, 버튼을 눌렀을 때 삭제 함수를 호출하도록 설정합니다.
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '삭제하기';
  deleteButton.onclick = function() {
    deleteLyric(lyric.lyricId);
  };
  deleteCell.appendChild(deleteButton);

  const inputTag = document.createElement('input');
  inputTag.type = 'text';
  inputTag.id = 'input' + lyric.lyricId;  // 고유한 ID를 부여합니다.
  inputCell.appendChild(inputTag);

// 삽입 버튼 생성
  const insertButton = document.createElement('button');
  insertButton.textContent = '입력하기';
  insertButton.onclick = function() {
    const inputValue = document.getElementById('input' + lyric.lyricId).value;
    axios.put('http://localhost/study/music/lyric', {  // 여기에 서버의 PUT 요청을 처리하는 엔드포인트를 입력해야 합니다.
      lyricId: lyric.lyricId,
      newValue: inputValue,
      lyric: lyric.lyric
    })
    .then(function (response) {
      console.log(response);
      location.reload();
    })
    .catch(function (error) {
      console.error(error);
    });
  };
  insertCell.appendChild(insertButton);

}

// 입력 필드 생성


// 가사를 삭제하는 함수
async function insertMusicWords() {
  const params = new URLSearchParams(window.location.search);
  const musicId = params.get('musicId');
  const isConfirmed = confirm('노래에 속한 단어들을 추가할까요?');

  const param = {
    musicId : musicId
  };

  if (isConfirmed) {
    await axios.post("http://localhost/study/music/word",null, {params : param});  // 이 URL은 실제 API 주소로 변경해야 합니다.
    location.reload();
  }
}

async function deleteLyric(lyricId) {
  // 삭제 확인창을 띄웁니다.
  const isConfirmed = confirm(lyricId + ' 번 가사를 삭제할까요?');
  if (isConfirmed) {
    // '예'를 선택하면 삭제 API를 호출합니다.
    await axios.delete("http://localhost/study/music/lyric?lyricId=" + lyricId);  // 이 URL은 실제 API 주소로 변경해야 합니다.
    // 페이지를 새로 고침하여 삭제된 가사를 화면에서 제거합니다.
    location.reload();
  }
}


// 페이지 로딩이 완료되면 실행할 함수
window.onload = async function() {
  const lyricList = await axiosLyricList();
  for (const lyric of lyricList) {
    addLyricToTable(lyric);
  }
};