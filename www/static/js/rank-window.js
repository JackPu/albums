

App.LoadingSpinner.show('.js-rank-list');

function percent_sort(array){  
      var i = 0, len = array.length,  
          j, d;  
      for(; i<len; i++){  
          for(j=0; j<len; j++){  
              if(array[i]['percent'] > array[j]['percent']){  
                  d = array[j];  
                  array[j] = array[i];  
                  array[i] = d;  
              }  
          }  
      }  
      return array;  
}

function timeCheck(timeStr) {
    
     return (parseInt(timeStr.split(':')[0])*60 + parseInt(timeStr.split(':')[1]));
        
}

function time_sort(array){  
    if(array.length>10){
        array = array.slice(0,10);
    }  
    var i = 0, len = array.length,  
          j, d;  
      for(; i<len; i++){  
          for(j=0; j<len; j++){  
              var a = timeCheck(array[i]['active_time']);
              var b = timeCheck(array[j]['active_time']);
              if(a < b && array[i]['percent'] == array[j]['percent']){  
                  d = array[j];  
                  array[j] = array[i];  
                  array[i] = d;  
              }  
          }  
      }  
      return array;  
}

App.send('get_rank_list',{
    data:{
        'testbank_no' : $('.js-testbank-no').val()
    },
    success: function(result){
        if(result.errcode == 0){
            App.LoadingSpinner.hide();

            var sortData = percent_sort(result.data);
            
            sortData = time_sort(sortData);

            App.Template.render('rank-list',{data:sortData});
        }else{
            App.sendMessage(result.errstr);
        }
    }
});
    
