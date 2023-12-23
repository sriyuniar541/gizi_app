
// TKPI
async function searchPosts() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();

  try {
    const response = await fetch(`http://localhost:3000/search/${searchTerm}`);
    const posts = await response.json();
    displayResults(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    searchPosts();
  }
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", handleEnterKey);

function displayResults(results) {
  const searchResultsTable = document
    .getElementById("searchResults")
    .getElementsByTagName("tbody")[0];
  searchResultsTable.innerHTML = "";

  if (results.length === 0) {
    const noResultsRow = searchResultsTable.insertRow();
    const noResultsCell = noResultsRow.insertCell(0);
    noResultsCell.colSpan = 24;
    noResultsCell.textContent = "No results found.";
    return;
  }

  results.forEach((post) => {
    const row = searchResultsTable.insertRow();
    for (const key in post) {
      const cell = row.insertCell();
      cell.textContent = post[key];
    }
  });
}

//hitung IMT

function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);

  if (isNaN(weight) || isNaN(height) || height === 0) {
    document.getElementById("result").innerHTML =
      "Masukkan berat badan dan tinggi badan yang valid.";
    return;
  }

  const bmi = weight / Math.pow(height, 2);
  const resultText = `Indeks Massa Tubuh (IMT): ${bmi.toFixed(2)}`;

  let category;
  let categoryColor;

  if (bmi < 18.5) {
    category = "Kurus (Underweight)";
    categoryColor = "blue";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal";
    categoryColor = "green";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    category = "Kelebihan Berat Badan (Overweight)";
    categoryColor = "orange";
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    category = "Obesitas Tingkat I";
    categoryColor = "red";
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    category = "Obesitas Tingkat II";
    categoryColor = "purple";
  } else {
    category = "Obesitas Tingkat III";
    categoryColor = "maroon";
  }

  const resultElement = document.getElementById("result");
  resultElement.innerHTML =
    resultText +
    "<br>" +
    "Kategori IMT: " +
    `<span style="color: ${categoryColor};">${category}</span>`;
}

//hitung kalori

function calculateCalories() {
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseInt(document.getElementById("age").value);
  const activityLevel = document.getElementById("activityLevel").value;

  if (isNaN(weight) || isNaN(height) || isNaN(age)) {
    alert(
      "Masukkan angka yang valid untuk berat badan, tinggi badan, dan usia."
    );
    return;
  }

  let bmr;

  if (gender === "pria") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else if (gender === "wanita") {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  const calorieNeeds = calculateCalorieNeeds(bmr, activityLevel);

  document.getElementById(
    "calorieResult"
  ).innerHTML = `Kebutuhan Kalori Harian Anda adalah ${calorieNeeds.toFixed(
    2
  )} kalori.`;
}

function calculateCalorieNeeds(bmr, activityLevel) {
  const palLevels = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
    extraActive: 1.9,
  };

  return bmr * palLevels[activityLevel];
}
