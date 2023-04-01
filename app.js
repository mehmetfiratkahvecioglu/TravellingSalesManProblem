//Veri sayısı yksek değilse  brute force yöntemi kullanarak TSP problemine çözüm üretebiliriz. Burada tüm olası yol kombinasyonlarını hesaplayıp en kısa yolu bulacağız. Bu yöntem büyük boyutlu problemlerde verimli olmayabilir ama küçük boyutlu problemler için uygun olabilir.

//İlk olarak dosyadan koordinatları okuyup bir diziye aktaralım:

const fs = require("fs");

// Dosyadan koordinatları okuyup diziye aktar
const fileData = fs.readFileSync("./tsp_5_1.txt", "utf8").split("\n");
const n = parseInt(fileData[0]);
const coords = [];
for (let i = 1; i < fileData.length; i++) {
  const [x, y] = fileData[i].split(" ").map(parseFloat);
  coords.push([x, y]);
}

//Daha sonra tüm yol kombinasyonlarını hesaplamak için bir permute fonksiyonu oluşturalım:
// Tüm olası yol kombinasyonlarını hesapla
function permute(permutation) {
  const results = [];

  function permuteHelper(arr, memo) {
    let i;
    let curr;
    memo = memo || [];

    if (arr.length === 0) {
      results.push(memo);
    } else {
      for (i = 0; i < arr.length; i++) {
        curr = arr.slice();
        const removed = curr.splice(i, 1);
        permuteHelper(curr.slice(), memo.concat(removed));
      }
    }

    return results;
  }

  return permuteHelper(permutation);
}

//Bu fonksiyon, verilen bir dizi için tüm olası permütasyonları hesaplayıp bir dizi olarak geri döndürür.

//Son olarak, bu fonksiyonları kullanarak TSP problemine brute force yöntemiyle çözüm üretebiliriz:
// Tüm olası yolları hesapla ve en kısa yolu bul
const shortestPath = permute([...Array(n).keys()]).reduce(
  (shortest, permutation) => {
    const dist = permutation.reduce((total, curr, i, arr) => {
      if (i === arr.length - 1) {
        return total;
      }
      return (
        total +
        Math.sqrt(
          Math.pow(coords[curr][0] - coords[arr[i + 1]][0], 2) +
            Math.pow(coords[curr][1] - coords[arr[i + 1]][1], 2)
        )
      );
    }, 0);
    return dist < shortest.dist ? { dist, path: permutation } : shortest;
  },
  { dist: Infinity, path: [] }
);

// En kısa yolu yazdır
console.log(
  `En kısa yol: ${shortestPath.path.join("-")}-${shortestPath.path[0]}`
);
console.log(`Uzunluk: ${shortestPath.dist}`);
