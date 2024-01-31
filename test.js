const list = [1, 0, 0, 2, 3];

function moveZeros(list) {
  let idx = 0;

  for (let i = 0; i < list.length; i++) {
    if (list[i] !== 0) {
      list[idx++] = list[i];
    }
  }

  while (idx < list.length) {
    console.log(list.length);
    list[idx++] = 0;
  }
}

moveZeros(list);
console.log(list); // [1,2,3,0,0]
