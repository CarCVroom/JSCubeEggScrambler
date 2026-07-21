function loSolEvalC() {
        let lo = process.argv[2];
        if (!lo) {
                throw new error("No input value")
        }

        let loArr = lo.split(" ");
        for (let i = 0; i < loArr.length; i++) {
                loArr[i] = loArr[i].trim();

                if (loArr[i] === "[tPerm]") {
                        loArr[i] = "R U R' U' R' F R2 U' R' U' R U R' F'"
                }
        }

        loArr = loArr.join(" ")

        console.log(loArr)
}

loSolEvalC()
