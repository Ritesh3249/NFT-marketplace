let data = [{
    "rollNo": 1,
    "name": "Ram",
    "marks": [50, 90, 60, 65, 75]
},
{
    "rollNo": 2,
    "name": "Ramesh",
    "marks": [70, 90, 60, 85, 100]
},
{
    "rollNo": 3,
    "name": "vikash",
    "marks": [100, 90, 95, 65, 72]
},
{
    "rollNo": 4,
    "name": "Raman",
    "marks": [50, 50, 60, 50, 75]
},
{
    "rollNo": 5,
    "name": "Ram",
    "marks": [90, 90, 95, 65, 85]
}
]
let arr = []
for (let i = 0; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < data[i].marks.length; j++) {
        sum += data[i].marks[j];
    }
    let percen = (sum / 500) * 100;
    arr.push(percen);
}

let greater = 0;

for (let i = 0; i < arr.length; i++) {


    if (arr[i] > greater) {
        greater = arr[i];
    }



}


console.log(greater);