const addContent = async () => {
  let users = await (await fetch(
    "https://jsonplaceholder.typicode.com/users"
  )).json();

  let tableRow = () =>
    document.querySelector("tbody").appendChild(document.createElement("tr"));

  users.map(el => {
    let row = tableRow();
    row.className = "table__row-content";
    row.id = `${el.id}`;

    let rowUserNumber = row.appendChild(document.createElement("td"));
    rowUserNumber.className = "table__data table__data-number";
    rowUserNumber.innerHTML = `${el.id}`;
    rowUserNumber.dataset.label = "Number";

    let rowDataName = row.appendChild(document.createElement("td"));
    rowDataName.className = "table__data ";
    rowDataName.innerHTML = `${el.name}`;
    rowDataName.dataset.label = "Name";

    let rowDataUserName = row.appendChild(document.createElement("td"));
    rowDataUserName.className = "table__data table__data-username";
    rowDataUserName.innerHTML = `${el.username}`;
    rowDataUserName.dataset.label = "Username";

    let rowDataEmail = row.appendChild(document.createElement("td"));
    rowDataEmail.className = "table__data table__data-email";
    rowDataEmail.innerHTML = `${el.email}`;
    rowDataEmail.dataset.label = "Email";

    let rowDataWebsite = row.appendChild(document.createElement("td"));
    rowDataWebsite.className = "table__data table__data-website";
    rowDataWebsite.innerHTML = `${el.website}`;
    rowDataWebsite.dataset.label = "Website";
  });

  const modalTriggers = document.querySelectorAll(".table__row-content");
  const bodyBlackout = document.querySelector(".body-blackout");

  modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", e => {
      let popup = document
        .querySelector(".container")
        .appendChild(document.createElement("div"));
      popup.classList.add("popup");
      popup.id = `${trigger.id}`;

      let popupItem = users.find(user => user.id === +e.target.parentNode.id);

      let popupHeading = popup.appendChild(document.createElement("h2"));
      popupHeading.className = "popup__heading";
      popupHeading.innerHTML = `${popupItem.name} address:`;

      let popupCity = popup.appendChild(document.createElement("p"));
      popupCity.className = "popup__city";
      popupCity.innerHTML = `City: ${popupItem.address.city}`;

      let popupStreet = popup.appendChild(document.createElement("p"));
      popupStreet.className = "popup__street";
      popupStreet.innerHTML = `Street: ${popupItem.address.street}`;

      let popupSuite = popup.appendChild(document.createElement("p"));
      popupSuite.className = "popup__suite";
      popupSuite.innerHTML = ` ${popupItem.address.suite}`;

      let popupZipcode = popup.appendChild(document.createElement("p"));
      popupZipcode.className = "popup__zipcode";
      popupZipcode.innerHTML = `Zipcode: ${popupItem.address.zipcode}`;

      //   Object.values(popupItem.address).map(el => {
      //     let popupContent = document
      //       .querySelector(".popup")
      //       .appendChild(document.createElement("p"));
      //     popupContent.className = "popup__content_street";
      //     popupContent.innerHTML = `${el}`;
      //     console.log(popupContent);
      //   });

      let modalCloseTrigger = popup.appendChild(document.createElement("i"));
      modalCloseTrigger.className = "popup__close";
      modalCloseTrigger.innerHTML = "&times;";

      popup.classList.add("popup__is--visible");
      bodyBlackout.classList.add("is-blacked-out");

      popup.querySelector(".popup__close").addEventListener("click", () => {
        popup.remove();
        bodyBlackout.classList.remove("is-blacked-out");
      });
    });
  });
};

addContent();

const tableSort = () => {
  const grid = document.getElementById("table");

  grid.onclick = function(e) {
    if (e.target.tagName != "TH") return;

    sortGrid(e.target.cellIndex, e.target.getAttribute("data-type"));
  };

  function sortGrid(colNum, type) {
    let tbody = grid.getElementsByTagName("tbody")[0];

    let rowsArray = [].slice.call(tbody.rows);

    let compare;

    switch (type) {
      case "number":
        compare = function(rowA, rowB) {
          return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
        };
        break;
      case "string":
        compare = function(rowA, rowB) {
          return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML
            ? 1
            : -1;
        };
        break;
    }

    rowsArray.sort(compare);

    grid.removeChild(tbody);

    for (let i = 0; i < rowsArray.length; i++) {
      tbody.appendChild(rowsArray[i]);
    }

    grid.appendChild(tbody);
  }
};

tableSort();
