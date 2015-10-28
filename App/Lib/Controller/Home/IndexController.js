/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function () {
    "use strict";
    return {
        indexAction: function () {
            //render View/Home/index_index.html file
            var navModel = thinkRequire("NavModel");
            
            this.display();
        },
        
        detailAction: function() {
            this.display();
        }
        
        
    };
});