async function fetchMusicList() {
  const response = await axios.get('http://localhost/study/music/list');
  const musicList = response.data;
  return musicList;
}

// 음악 정보를 테이블에 추가하는 함수
function addMusicToTable(music) {
  const table = document.getElementById('musicTable');
  const row = table.insertRow();
  const musicIdCell = row.insertCell();
  const titleCell = row.insertCell();
  const titleLink = document.createElement('a');
  musicIdCell.textContent = music.musicId;
  titleLink.href = 'http://localhost/study/musicDetail.html?musicId=' + music.musicId;  // 이 부분은 실제 상세 페이지의 URL 패턴에 맞게 수정해야 합니다.
  titleLink.textContent = music.title;
  titleCell.appendChild(titleLink);
}

// 페이지 로딩이 완료되면 실행할 함수
window.onload = async function() {
  const musicList = await fetchMusicList();
  for (const music of musicList) {
    addMusicToTable(music);
  }
};