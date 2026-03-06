let allIssues = [];

const loadAllIssues = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();

  allIssues = data.data;
  displayAllIssues(allIssues);
};

const displayAllIssues = async (issues) => {
  const allIssueContainer = document.getElementById("allIssueContainer");
  allIssueContainer.innerHTML = "";

  const issueCount = document.getElementById("issueCount");
  issueCount.innerText = issues.length;

  issues.forEach((issue) => {
    const dateObj = new Date(issue.createdAt);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${month}/${day}/${year}`;

    const card = document.createElement("div");
    card.className = `bg-base-100 p-6 rounded-lg shadow-lg space-y-3`;

    card.innerHTML = `
     <div class="flex justify-between items-center">
              <p></p>
              <p
                class="bg-[#FEECEC] text-red-600 py-0.5 px-5 rounded-full text-[12px]"
              >
                ${issue.priority}
              </p>
            </div>

            <div>
              <h2 class="font-bold text-[14px]">
                ${issue.title}
              </h2>
              <p class="text-[#64748B] line-clamp-2 text-[12px]">
                ${issue.description}
              </p>
            </div>

            <div>
              ${createElements(issue.labels)}
            </div>

            <div
              class="border-t border-gray-200 -mx-6 pt-3 mt-3 px-6 text-xs text-gray-500 space-y-2"
            >
              <p>#${issue.id} by ${issue.author}</p>
              <p>${formattedDate}</p>
            </div>
    `;
    allIssueContainer.appendChild(card);
  });
};

loadAllIssues();

const allTab = document.getElementById("allTab");
const openTab = document.getElementById("openTab");
const closedTab = document.getElementById("closedTab");

allTab.addEventListener("click", () => {
  activeTab(allTab);
  displayAllIssues(allIssues);
});

openTab.addEventListener("click", () => {
  activeTab(openTab);
  const openIssues = allIssues.filter((issue) => issue.status === "open");
  displayAllIssues(openIssues);
});

closedTab.addEventListener("click", () => {
  activeTab(closedTab);
  const closeIssues = allIssues.filter((issue) => issue.status === "closed");
  displayAllIssues(closeIssues);
});

const activeTab = (btn) => {
  allTab.classList.remove("btn-primary");
  openTab.classList.remove("btn-primary");
  closedTab.classList.remove("btn-primary");

  btn.classList.add("btn-primary");
};

const createElements = (arr) => {
  const htmlElements = arr.map(
    (el) =>
      `<span class="bg-[#FDE68A] rounded-full px-3 text-[14px]"> ${el}</span>`,
  );
  return htmlElements.join(" ");
};
