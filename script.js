const inputBox = document.querySelector("#input-box");
const listItems = document.querySelector(".list-items");
const addButton = document.querySelector(".add-btn");
const listButton = document.querySelector(".list-item-btn");
const list = document.querySelector("span");

addButton.addEventListener("click", () => {
	const inputValue = inputBox.value.trim();
	listItems.insertAdjacentHTML(
		"beforeend",
		`
		 <li class="todo-list">
			<span class="input-value">${inputValue}</span>
			<div class="todo-btns">
				<button class="list-item-btn"><img src="images/edit.svg" class="btn-icon edit-btn" alt="edit-icon"></button>
				<button class="list-item-btn"><img src="images/delete.svg" class="btn-icon delete-btn" alt="delete-icon"></button>
			</div>
		</li>
		`
	);

	inputBox.value = "";
	inputBox.blur();
	saveData();
});

inputBox.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		addButton.click();
	}
});

listItems.addEventListener("click", (e) => {
	if (e.target.classList.contains("edit-btn")) {
		const spanTarget = e.target.parentElement.parentElement;
		const spanValue = spanTarget.parentElement.querySelector(".input-value");
		const imgTarget = e.target.parentElement;
		const imgBtn = imgTarget.querySelector(".edit-btn");
		let imgSrc = imgTarget.querySelector(".edit-btn");
		let altName = imgTarget.querySelector(".edit-btn");
		console.log(imgSrc.src);
		if (altName.alt === "edit-icon") {
			spanValue.setAttribute("contenteditable", "true");
			spanValue.focus();
			imgSrc.src = "./images/save.svg";
			altName.alt = "save-icon";
			console.log(imgSrc);
		} else if (altName.alt === "save-icon") {
			spanValue.setAttribute("contenteditable", "false");
			imgSrc.src = "./images/edit.svg";
			altName.alt = "edit-icon";
		}

		spanValue.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				imgBtn.click();
			}
		});

		saveData();
	} else if (e.target.classList.contains("delete-btn")) {
		const todoListTarget = e.target.parentElement.parentElement;
		todoListTarget.parentElement.remove();

		saveData();
	}
});

function saveData() {
	localStorage.setItem("data", listItems.innerHTML);
}

function showTask() {
	listItems.innerHTML = localStorage.getItem("data");
}

showTask();
