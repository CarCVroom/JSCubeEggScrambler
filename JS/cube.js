const cube = [
        [0,0,0,0,0,0,0,0,0], // WHITE / U
        [1,1,1,1,1,1,1,1,1], // ORANGE / L
        [2,2,2,2,2,2,2,2,2], // GREEN / F
        [3,3,3,3,3,3,3,3,3], // RED / R
        [4,4,4,4,4,4,4,4,4], // BLUE / B
        [5,5,5,5,5,5,5,5,5], // YELLOW / D
];      
// It would be like aabbCENTERccdd
// First is corner and second is edge
// index 4/ CENTER cant move

// NOW WE HAVE ALL SIX SIDES OF A CUBE INDICATED BY COLORS

function moveR() {
        let upp = [2, 0, 4, 5];
        let cubePlaying = [...cube];

        for(let i = 0; i < upp.length; i++) {
                for(const idx of [2, 5, 8]) {
                        [cubePlaying[upp[i]][idx], cubePlaying[upp[i + 1]][idx]] =
                        [cubePlaying[upp[i + 1]][idx], cubePlaying[upp[i]][idx]];
                }
        }

        console.log(cubePlaying)
}
moveR();