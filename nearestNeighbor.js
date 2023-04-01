// Dosya adını ve yolu
const fs = require("fs");
//dosyaların isimleri için string olutşur 10. satırda ki ${tsp_5} gibi sadece simi değiştirerek kullanabilirsiniz...
const tsp_5 = "tsp_5_1.txt";
const tsp_124 = "tsp_124_1.txt";
const tsp_85900 = "tsp_85900_1.txt";
const tsp_1000 = "tsp_1000_1.txt";
const tsp_5915 = "tsp_5915_1.txt";
const tsp_11849 = "tsp_11849_1.txt";
// Dosyadan koordinatları okuyup diziye aktar
const fileData = fs.readFileSync(`./${tsp_11849}`, "utf8").split("\n");
const n = parseInt(fileData[0]);
const coords = [];
for (let i = 1; i < fileData.length; i++) {
  const [x, y] = fileData[i].split(" ").map(parseFloat);
  coords.push([x, y]);
}
console.log(coords);

// Başlangıç düğümü belirle
const start = coords[0];
let current = start;

// Ziyaret edilecek düğümleri tut
const unvisited = [...coords.slice(1)];

// En kısa yol ve toplam mesafeyi tut
let tour = [start];
let distance = 0;

while (unvisited.length > 0) {
  // En yakın düğümü seç
  const nearest = unvisited.reduce((prev, curr) => {
    const prevDistance = Math.sqrt(
      (prev[0] - current[0]) ** 2 + (prev[1] - current[1]) ** 2
    );
    const currDistance = Math.sqrt(
      (curr[0] - current[0]) ** 2 + (curr[1] - current[1]) ** 2
    );
    return currDistance < prevDistance ? curr : prev;
  }, unvisited[0]);

  // Yolu güncelle
  tour.push(nearest);
  distance += Math.sqrt(
    (nearest[0] - current[0]) ** 2 + (nearest[1] - current[1]) ** 2
  );

  // Ziyaret edilenleri güncelle
  const index = unvisited.indexOf(nearest);
  unvisited.splice(index, 1);

  // Şu anki düğümü güncelle
  current = nearest;
}

// Başlangıç noktasına dön
tour.push(start);
distance += Math.sqrt(
  (start[0] - current[0]) ** 2 + (start[1] - current[1]) ** 2
);

tour = tour.filter((item) => item[0] !== null && item[1] !== null);

// Yolu ve uzunluğunu consol ekranına yazdır
console.log(`En kısa yol: ${JSON.stringify(tour)}`);

const yol = tour;

const filePath = "./result11849.txt";

fs.writeFile(filePath, JSON.stringify(tour), (err) => {
  if (err) throw err;
  console.log("Dizi başarıyla dosyaya yazıldı.");
});
