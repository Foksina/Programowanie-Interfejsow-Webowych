"use strict";

var lists = []; // Tablica przechowująca listy zadań
var recentlyDeletedTask = null; // Zmienna przechowująca ostatnio usunięte zadanie


// Funkcja do dodawania nowej listy
function addList() {
    var newListInput = document.getElementById("newListInput");
    var newListName = newListInput.value.trim();
    if (newListName !== "") {
        var listsContainer = document.getElementById("listsContainer");
        var listDiv = document.createElement("div");
        listDiv.classList.add("col-sm-4", "mb-3");
        var listTable = document.createElement("table");
        listTable.classList.add("table", "table-striped", "task-table"); // Dodajemy klasę "task-table" dla tabeli
        var listBody = document.createElement("tbody");
        listBody.id = newListName + "TaskList";
        listTable.appendChild(listBody);
        var listHeader = document.createElement("thead");
        var headerRow = document.createElement("tr");
        var headerCell = document.createElement("th");
        headerCell.textContent = newListName;
        headerCell.classList.add("text-center", "font-weight-bold", "header-cell"); // Dodajemy klasę "header-cell" dla nagłówka

        headerCell.colSpan = 2; // Łączymy komórki nagłówka
        headerRow.appendChild(headerCell);
        listHeader.appendChild(headerRow);
        listTable.appendChild(listHeader);
        listDiv.appendChild(listTable);
        listsContainer.appendChild(listDiv);
        newListInput.value = "";
        lists.push({name: newListName, tasks: []}); // Dodajemy nową listę do tablicy

        // Aktualizujemy listę rozwijaną
        updateListDropdown();
    }
}

// Funkcja aktualizująca listę rozwijaną
function updateListDropdown() {
    var listSelect = document.getElementById("listSelect");
    listSelect.innerHTML = '<option value="default">Wybierz listę</option>';
    lists.forEach(function(list) {
        var option = document.createElement("option");
        option.value = list.name;
        option.textContent = list.name;
        listSelect.appendChild(option);
    });
}

// Funkcja do dodawania nowego zadania do listy
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskContent = taskInput.value.trim();
    var selectedList = document.getElementById("listSelect").value;
    if (taskContent !== "" && selectedList !== "default") {
        var taskList = document.getElementById(selectedList + "TaskList");
        var tr = document.createElement("tr"); // Zmiana nazwy z "li" na "tr"
        var taskCell = document.createElement("td");
        var dateCell = document.createElement("td"); // Dodajemy komórkę na datę
        taskCell.textContent = taskContent;
        taskCell.addEventListener("click", function(event) { // Dodajemy funkcję anonimową, która przekazuje indeks listy
            var listIndex = lists.findIndex(list => list.name === selectedList);
            toggleTask(event, listIndex); // Przekazujemy indeks listy
        });
        tr.appendChild(taskCell);
        tr.appendChild(dateCell); // Dodajemy komórkę z datą do wiersza

        // Dodajemy przycisk X do usuwania zadania
        var deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.innerHTML = "&times;";
        deleteTaskBtn.classList.add("close", "delete-task-btn");
        deleteTaskBtn.addEventListener("click", deleteTask); // Dodajemy obsługę kliknięcia na przycisku X
        tr.appendChild(deleteTaskBtn);

        taskList.appendChild(tr); // Zmiana "li" na "tr"
        taskInput.value = "";
        // Dodajemy zadanie do odpowiedniej listy
        var listIndex = lists.findIndex(list => list.name === selectedList);
        lists[listIndex].tasks.push({content: taskContent, completed: false, completedDate: null}); // Dodajemy pole completedDate do obiektu zadania
    } else {
        alert("Wybierz listę i wpisz treść zadania!");
    }
}

// Funkcja do zaznaczania/zdejmowania zaznaczenia z zadania
function toggleTask(event, listIndex) {
    var taskItem = event.target;
    taskItem.classList.toggle("completed");
    var taskContent = taskItem.textContent;
    var selectedList = lists[listIndex].name;
    var taskIndex = lists[listIndex].tasks.findIndex(task => task.content === taskContent);
    var task = lists[listIndex].tasks[taskIndex];
    if (task) { // Sprawdzamy, czy task istnieje
        task.completed = !task.completed; // Zaznaczamy/zdejmujemy zaznaczenie
        if (task.completed) {
            // Ustawiamy datę wykonania zadania na bieżącą datę
            task.completedDate = new Date().toLocaleString();
        } else {
            task.completedDate = null; // Resetujemy datę wykonania zadania
        }
        updateTaskDate(event.target.nextElementSibling, task.completedDate); // Aktualizujemy wyświetlaną datę
    } else {
        console.error("Task not found:", taskContent); // Wyświetlamy błąd w konsoli, jeśli task nie został znaleziony
    }
}

// Funkcja do aktualizacji wyświetlanej daty w komórce
function updateTaskDate(dateCell, completedDate) {
    dateCell.textContent = completedDate || ""; // Ustawiamy datę, jeśli istnieje, w przeciwnym wypadku pusty ciąg znaków
}

// Funkcja do usuwania zadania
function deleteTask(event) {
    var taskItem = event.target.parentElement;
    var taskContent = taskItem.firstChild.textContent; // Pobieramy treść zadania
    var modalTaskContent = document.getElementById("modalTaskContent");
    modalTaskContent.textContent = taskContent; // Aktualizujemy tekst w modalu

    var modal = document.getElementById("myModal");
    modal.style.display = "block"; // Wyświetlamy modal

    var confirmDeleteBtn = document.getElementById("confirmDelete");
    confirmDeleteBtn.onclick = function() { // Obsługa przycisku Tak
        var listName = taskItem.parentElement.id.replace("TaskList", ""); // Pobieramy nazwę listy z ID
        var listIndex = lists.findIndex(list => list.name === listName);
        var taskIndex = lists[listIndex].tasks.findIndex(task => task.content === taskContent);
        var deletedTask = lists[listIndex].tasks.splice(taskIndex, 1)[0]; // Usuwamy zadanie z listy zadań i zapisujemy je w zmiennej
        recentlyDeletedTask = {
            content: deletedTask.content,
            completed: deletedTask.completed,
            completedDate: deletedTask.completedDate,
            listName: listName // Poprawiamy przypisanie nazwy listy
        };
        taskItem.remove(); // Usuwamy zadanie z listy na stronie
        modal.style.display = "none"; // Chwylimy modal
        updateRestoreButtonState(); // Aktualizujemy stan przycisku "Przywróć ostatnio usunięte zadanie"
    }

    var cancelDeleteBtn = document.getElementById("cancelDelete");
    cancelDeleteBtn.onclick = function() { // Obsługa przycisku Nie
        modal.style.display = "none"; // Chwylimy modal
    }
}

function restoreDeletedTask() {
    if (recentlyDeletedTask) {
        var selectedList = recentlyDeletedTask.listName;
        var taskContent = recentlyDeletedTask.content;
        var taskList = lists.find(list => list.name === selectedList);

        if (taskList) {
            var taskListElement = document.getElementById(selectedList + "TaskList");
            var tr = document.createElement("tr");
            var taskCell = document.createElement("td");
            var dateCell = document.createElement("td");
            taskCell.textContent = taskContent;
            taskCell.addEventListener("click", function(event) {
                var listIndex = lists.findIndex(list => list.name === selectedList);
                toggleTask(event, listIndex);
            });
            tr.appendChild(taskCell);
            tr.appendChild(dateCell);
            
            var deleteTaskBtn = document.createElement("button");
            deleteTaskBtn.innerHTML = "&times;";
            deleteTaskBtn.classList.add("close", "delete-task-btn");
            deleteTaskBtn.addEventListener("click", deleteTask);
            tr.appendChild(deleteTaskBtn);

            taskListElement.appendChild(tr);
            taskList.tasks.push({content: taskContent, completed: false, completedDate: null});
            recentlyDeletedTask = null;
            updateRestoreButtonState();
        } else {
            console.error("Nie znaleziono listy o nazwie:", selectedList);
        }
    }
}

// Funkcja do aktualizowania stanu przycisku "Przywróć ostatnio usunięte zadanie"
function updateRestoreButtonState() {
    var restoreButton = document.getElementById("restoreButton");
    restoreButton.disabled = !recentlyDeletedTask; // Aktywujemy przycisk, jeśli istnieje ostatnio usunięte zadanie
}

window.onload = function() {
    var addTaskBtn = document.getElementById("addTaskBtn");
    addTaskBtn.addEventListener("click", addTask);

    var addListBtn = document.getElementById("addListBtn");
    addListBtn.addEventListener("click", addList);

    var confirmDeleteBtn = document.getElementById("confirmDelete");
    confirmDeleteBtn.addEventListener("click", function() { // Obsługa przycisku "Tak"
        var listSelect = document.getElementById("listSelect");
        var selectedList = listSelect.value;
        var listIndex = lists.findIndex(list => list.name === selectedList);
        var taskIndex = lists[listIndex].tasks.findIndex(task => task.content === taskContent);
        lists[listIndex].tasks.splice(taskIndex, 1); // Usuwamy zadanie z listy zadań
        taskItem.remove(); // Usuwamy zadanie z listy na stronie
        modal.style.display = "none"; 
    });

    var cancelDeleteBtn = document.getElementById("cancelDelete");
    cancelDeleteBtn.addEventListener("click", function() { // Obsługa przycisku "Nie"
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    });

    var restoreButton = document.getElementById("restoreButton");
    restoreButton.addEventListener("click", restoreDeletedTask); // Dodajemy obsługę kliknięcia na przycisku przywracania
    updateRestoreButtonState(); // Aktualizujemy stan przycisku przy ładowaniu strony
}
