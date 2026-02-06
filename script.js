let currentPage = 1;
const totalPages = 7;

const questions = document.querySelectorAll(".question");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("questionnaire");
const resultDiv = document.getElementById("result");

function showPage(page) {
  questions.forEach(q => {
    q.style.display = q.dataset.page == page ? "block" : "none";
  });

  if (page === 6) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }

  if (page === 7) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
  }
}

// 初始顯示
showPage(currentPage);

// 下一頁
nextBtn.addEventListener("click", () => {
  const currentSelects = document.querySelectorAll(
    `.question[data-page="${currentPage}"] select`
  );

  for (let s of currentSelects) {
    if (!s.value) {
      alert("請完成本頁所有題目");
      return;
    }
  }

  currentPage++;
  showPage(currentPage);
});

// 送出評估
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let totalScore = 0;
  const selects = form.querySelectorAll("select");

  selects.forEach(s => {
    totalScore += Number(s.value);
  });

  let level = "";
  let advice = "";

  if (totalScore <= 80) {
    level = "視覺狀況良好";
    advice = "目前視覺負擔較低，請持續保持良好用眼習慣。";
  } else if (totalScore <= 120) {
    level = "中度視覺疲勞";
    advice = "建議調整用眼時間，並適度休息。";
  } else {
    level = "高度視覺疲勞";
    advice = "建議進一步進行專業視覺檢查與評估。";
  }

  // ⭐ 關鍵：結果只寫進「評估結果卡片內的 result」
  resultDiv.innerHTML = `
    <p><strong>總分：</strong>${totalScore}</p>
    <p><strong>評估結果：</strong>${level}</p>
    <p><strong>建議：</strong>${advice}</p>
  `;

  currentPage = 7;
  showPage(currentPage);
});