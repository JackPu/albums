/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function () {
    "use strict";
    return {
        getListAction: function () {
            //render View/Home/index_index.html file
            this.display();
        },
        
        detailAction: function() {
            this.display();
        }
        
        
    };
});