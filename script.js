const form = document.querySelector(".form");
const selectGender = document.querySelector(".select-gender");
const selectNat = document.querySelector(".select-nat");
const searchBtn = document.querySelector(".search-btn");
const content = document.querySelector(".content");

const renderCards = (item) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const nationality = document.createElement("h3");
  nationality.classList.add("nationality");
  nationality.textContent = item.nat;
  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = item.picture.thumbnail;
  const text = document.createElement("div");
  text.classList.add("text");
  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = item.name.first + " " + item.name.last;
  const gendAge = document.createElement("p");
  gendAge.classList.add("gendAge");
  const gender = document.createElement("span");
  gender.textContent = item.gender;
  const age = document.createElement("span");
  age.textContent = ", " + item.dob.age;
  const email = document.createElement("p");
  email.classList.add("email");
  email.textContent = item.email;

  gendAge.append(gender, age);
  text.append(name, gendAge, email);
  card.append(nationality, avatar, text);
  content.append(card);
};

const getUsers = async () => {
  const result = await fetch("https://www.randomuser.me/api/?results=64");
  const data = await result.json();

  console.log(data.results);

  const nationalityArr = [];
  data.results.map((item) => {
    if (!nationalityArr.includes(item.nat)) {
      nationalityArr.push(item.nat);

      const optionNat = document.createElement("option");
      optionNat.value = item.nat;
      optionNat.textContent = item.nat;

      selectNat.append(optionNat);
    }

    renderCards(item);
  });

  form.addEventListener("submit", (e) => {
    let newData = data.results;
    e.preventDefault();
    if (selectGender.value && selectGender.value !== "ALL") {
      newData = newData.filter((item) => selectGender.value === item.gender);
    }
    if (selectNat.value && selectNat.value !== "ALL")
      newData = newData.filter((item) => selectNat.value === item.nat);

    content.innerHTML = "";

    newData.map((item) => renderCards(item));
  });
  return result;
};

getUsers();
