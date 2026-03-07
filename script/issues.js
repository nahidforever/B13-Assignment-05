let allIssues = [];

const allIssueContainer = document.getElementById("allIssueContainer");
const loadingSpinner = document.getElementById("loadingSpinner");

const allTab = document.getElementById("allTab");
const openTab = document.getElementById("openTab");
const closedTab = document.getElementById("closedTab");
const issueDetailsModal = document.getElementById("issue-details-modal");

const loadAllIssues = async () => {
  showLoading();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();

  allIssues = data.data;

  hideLoading();
  displayAllIssues(allIssues);
};

const displayAllIssues = (issues) => {
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

    card.onclick = () => openIssueModal(issue.id);
    card.innerHTML = `
     <div class="flex justify-between items-center">
              <p></p>
              <p
                class="bg-[#FEECEC] text-red-600 py-0.5 px-5 rounded-full text-[12px]"
              >
                ${issue.priority.toUpperCase()}
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
      `<span class="bg-[#FDE68A] rounded-full px-3 text-[14px]"> ${el.toUpperCase()}</span>`,
  );
  return htmlElements.join(" ");
};

function showLoading() {
  loadingSpinner.classList.remove("hidden");
  allIssueContainer.classList.add("hidden");
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
  allIssueContainer.classList.remove("hidden");
}

async function openIssueModal(issueId) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`,
  );

  const data = await res.json();

  const issueDetails = data.data;

  issueDetailsModal.innerHTML = "";

  const dateObj = new Date(issueDetails.createdAt);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${month}/${day}/${year}`;

  const issueDetailsCard = document.createElement("div");
  issueDetailsCard.className = "modal-box";
  issueDetailsCard.innerHTML = `
     <div class="bg-white p-6 rounded-lg">
            <!-- Title -->
            <h2 class="text-2xl font-bold mb-2">
              ${issueDetails.title}
            </h2>

            <div class="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span
                class="bg-green-500 text-white px-3 py-1 rounded-full text-xs"
              >
                ${issueDetails.status}
              </span>

              <span>•</span>

              <span>Opened by ${issueDetails.author}</span>

              <span>•</span>
              <p>${formattedDate}</p>
            </div>

           
            <div class="flex gap-3 mb-4">
               ${createElements(issueDetails.labels)}
            </div>

         
            <p class="text-gray-600 mb-6">
              ${issueDetails.description}
            </p>

         
            <div class="bg-base-200 flex justify-between items-center p-4">
    
              <div>
                <p class="text-sm text-gray-500">Assignee:</p>
                <p class="font-semibold"> ${issueDetails.assignee}</p>
              </div>

  
              <div>
                <p class="text-sm text-gray-500">Priority:</p>
                <span
                  class="bg-red-500 text-white px-4 py-1 rounded-full text-xs"
                >
                  ${issueDetails.priority.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div class="modal-action">
            <form method="dialog">
              <!--if there is a button in form, it will close the modal-->
              <button class="btn btn-primary border-none">Close</button>
            </form>
          </div>
  `;
  issueDetailsModal.appendChild(issueDetailsCard);

  issueDetailsModal.showModal();
}
