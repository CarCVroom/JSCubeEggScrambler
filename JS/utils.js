export function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
}

export function printCube(cube) {
        const face = (i) => {
                const f = cube[i];
                return [
                        [f[0], f[1], f[2]],
                        [f[3], f[4], f[5]],
                        [f[6], f[7], f[8]],
                ];
        };

        const row = (faces, r) => faces.map(f => f[r].join(' ')).join('   ');

        const [U, L, F, R, B, D] = [0,1,2,3,4,5].map(face);

        console.log('      ' + row([U], 0));
        console.log('      ' + row([U], 1));
        console.log('      ' + row([U], 2));
        console.log();
        console.log(row([L, F, R, B], 0));
        console.log(row([L, F, R, B], 1));
        console.log(row([L, F, R, B], 2));
        console.log();
        console.log('      ' + row([D], 0));
        console.log('      ' + row([D], 1));
        console.log('      ' + row([D], 2));
}