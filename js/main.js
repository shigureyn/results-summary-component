const summaryList = document.querySelector(".summary-list");

function getSummaryItemClass(category) {
  return `summary-item__${category.toLowerCase()}`;
}

function createSummaryItem(item) {
  const summaryItem = document.createElement("li");
  
  summaryItem.classList.add("summary-item");
  summaryItem.classList.add(getSummaryItemClass(item.category));

  summaryItem.innerHTML = `
    <div class="summary-category">
      <img class="summary-icon" src="${item.icon}" alt="" aria-hidden="true">
      <span class="summary-name">${item.category}</span>
    </div>

    <p class="summary-score">
      <strong class="summary-score__value">${item.score}</strong>
      <span class="summary-score__max">/ 100</span>
    </p>
  `;

  return summaryItem;
}

async function renderSummary() {
  try {
    const response = await fetch("../data.json");

    if (!response.ok) {
      throw new Error("Failed to load summary data");
    }

    const data = await response.json();

    summaryList.innerHTML = "";

    data.forEach((item) => {
      const summaryItem = createSummaryItem(item);
      summaryList.append(summaryItem);
    });
  } catch (error) {
    summaryList.innerHTML = "<li>Failed to load results.</li>";
    console.error(error);
  }
}

renderSummary();
