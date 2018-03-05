/**
 * Created by my on 2018/1/29.
 */


console.matrix = (matrix = []) => {
    matrix.map((row, ix) => {
        console.log(`row ${ix} ===>>   `, ...row)
    })
}