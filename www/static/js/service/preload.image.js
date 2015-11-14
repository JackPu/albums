define(['angularAMD'], function (angularAMD) { 
    angularAMD.factory('preloadImage',function() {
        
        function preload(arr) {
            var images = new Array();

            
            for (i = 0; i < arr.length; i++) {
                var j = i*3;
                images[j] = new Image();
                images[j].src = arr[i]['exercise_answer_a'];
                images[j+1] = new Image();
                images[j+1].src = arr[i]['exercise_answer_b'];
                images[j+2] = new Image();
                images[j+2].src = arr[i]['exercise_answer_c'];
            }
        }
        
        return preload;
    
    });


});