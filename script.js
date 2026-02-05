document.getElementById("questionnaire").addEventListener("submit", function (e) {
  e.preventDefault(); // 不刷新頁面

  const formData = new FormData(e.target);

  let totalScore = 0;

  for (let value of formData.values()) {
    totalScore += Number(value);
  }

  let level = "";

  if (totalScore <= 100) {
    level = "低效能級（視覺狀態良好）";
  } else if (totalScore <= 130) {
    level = "中低效能級（輕度疲勞）";
  } else if (totalScore <= 160) {
    level = "中高效能級（疲勞風險偏高）";
  } else {
    level = "高疲勞高負荷（建議專業評估）";
  }

  document.getElementById("result").innerHTML = `
    <h2>評估結果</h2>
    <p>總分：${totalScore}</p>
    <p>等級：${level}</p>
    <p class="note">
      本結果僅供視覺狀態參考，不構成醫療診斷。
    </p>
  `;
});
let currentPage = 1;
const totalPages = 5; // 你一共 5 頁（1~7, 8~14, 15~20, 21~27, 28~34）

const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

function showPage(page) {
  const questions = document.querySelectorAll(".question");

  questions.forEach(q => {
    const qPage = parseInt(q.dataset.page);
    q.style.display = (qPage === page) ? "block" : "none";
  });

  // 按鈕控制
  if (page === totalPages) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
  }
});

// 初始化
showPage(currentPage);
