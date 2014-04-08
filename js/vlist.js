var VList = {
    maxCols: 0,
    minColumnHeight: 0,
    value: 1,
    start: function(minColumnHeight, maxCols, listContainer){
        this.minColumnHeight = minColumnHeight;
        this.maxCols = maxCols;
		this.listContainer = listContainer;
        t = setInterval('VList.redistribute();', 500);
    },
    pauseTimer: function(){
        clearInterval(t);
    },
    redistribute: function(){
        $("#growingListContainer").empty();
        with (VList) {
            var cols = parseInt((value / minColumnHeight)) > maxCols ? maxCols : parseInt((value / minColumnHeight));
            cols = Math.max(1, cols);
            var listItemsCountInEachColumn_Array = new Array(cols);
            //
            var listItemsInEachColumn = parseInt(value / cols);
            var remainingListItems = value % cols;
            
            for (var i = 0; i < cols; i++) {
                listItemsCountInEachColumn_Array[i] = listItemsInEachColumn;
            }
            
            for (i = 0; i < cols; i++) {
                if (remainingListItems == 0) 
                    break;
                if (listItemsCountInEachColumn_Array[i] > 0) {
                    listItemsCountInEachColumn_Array[i] += 1;
                    remainingListItems--;
                }
            }
            var g = 1;
            for (var j = 0; j < listItemsCountInEachColumn_Array.length; j++) {
                $('#'+listContainer).append("<ul class='vlist_ul' id='growList" + j + "'><\/ul>");
                for (var k = 0; k < listItemsCountInEachColumn_Array[j]; k++) {
                    $('#growList' + j).append("<li class='vlist_li'>" + g + "<\/li>");
                    g++;
                }
            }
            value++;
        }
    }
}
