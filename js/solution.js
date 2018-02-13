(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        isles = [];
        // todo: подсчитать кол-во островов на карте
        for(y = 0; y < map.length; y++) {
            for(x = 0; x < map[y].length; x++) {
                //console.log("Landpoint : ", x, y);
                //console.log("Is land?", map[y][x]);
                if(map[y][x] === ISLAND) {
                    hasBorderIdx = hasBorder([x, y], isles);
                    //console.log("Has border", hasBorderIdx);
                    if(hasBorderIdx >= 0) {
                        //console.log(isles);
                        //console.log("To existing");
                        isles[hasBorderIdx].push([x, y]);
                    } else {
                        //console.log(isles);
                        //console.log("New isle");
                        isles.push([[x, y]]);
                    }
                }
            }
        }
        do {
            isles = checkBorders(isles);
        } while(isles.length != (checkBorders(isles)).length);
        isles = checkBorders(isles);
        console.log(isles);
        return isles.length;
    }

    /**
    * Функция возвращает индекс острова в массиве,
    * в случае если точка с указанными координатами
    * имеет с ним границу
    *
    * @param {number[]} coords - кординаты точки суши
    * @param {number[][]} isles - координаты точек суши островов
    * @returns {number} индекс массива с координатми острова, имеющего общую границу
    * */
    function hasBorder(coords, isles) {
        for(i = 0; i < isles.length; i++) {
            for(k = 0; k < isles[i].length; k++) {
                if((isles[i][k][0] === coords[0] && Math.abs(isles[i][k][1]-coords[1]) === 1)
                    || (isles[i][k][1] === coords[1] && Math.abs(isles[i][k][0]-coords[0]) === 1)) {
                    return i;
                }
            }
        }
        return -1;
    }

    /**
     * Функция проверяет границы островов
     * и если острова имеют общую границу
     * объединяет их в один остров
     *
     * @param {number[][]} isles - массив координат островов, у которых могут быть общие границы
     * @returns {number[][]} result - массив островов, не имеющих общих границ
     * **/
    function checkBorders(isles) {
        result = isles;
        result.forEach(function(isle, idx){
            isle.forEach(function(coords){
                borderIdx = hasBorder(coords, isles);
                if(borderIdx !== idx && borderIdx >= 0) {
                    console.log(borderIdx, idx);
                    newIsle = isle.concat(result[borderIdx]);
                    result[borderIdx] = newIsle;
                    result[idx] = [];
                }
            });
        });
        result = result.filter(function(item){
            return item.length > 0;
        });
        return result;

    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
