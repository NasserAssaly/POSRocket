/** 
 * @desc this main js to start load and call system main functions
 * @author Nasser Al-Assaly nax.roma@gmail.com
 */

/** 
 * @desc this function to check from transactions
 */
function doCheckTransaction() {

    // this function just to test the transactionChecker function # remove it when publish new verison on real server
    var value = transactionChecker.isValid('{1:a1, 2:b2, 3:c3, 4:d4}'); //

    console.log('the reuslt of transactionChecker = ' + value);
    if (!value) {
        var error = transactionChecker.getErrorMessage();
        console.log(error);
    }
    return;
    //***************************************************************************************************************/


    // this code need real server to run 100% coz of Cors Origin security issue.
    var jsonObject = loadTransaction(
        '../sources/transaction.json',
        function (result) {
            let value = transactionChecker.isValid(result);
            if (!value) {
                var error = transactionChecker.getErrorMessage();
                console.error(error);
            }
        },
        function (err) {
            console.error(err);
        },
    );
}


/** 
 * @desc this function to load transaction object from file.
 * @param url string of the file source.
 * @param success function what function do after get result.
 * @param onFail function what function do after fail to get file.
 * @example loadTransaction('./myJsonFile.json', function(){}, function(){})
 * @return callback methods success or fail.
 */
function loadTransaction(url, success, onFail) {
    try {
        if (!url || url.length == 0) {
            console.error('Error in loadJSON, please check the file path');
            return;
        }

        var http = new XMLHttpRequest();
        http.overrideMimeType("application/json");
        http.open('GET', url, true); // Replace 'my_data' with the path to your file
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == "200") {
                success(http.responseText);
            } else {
                onFail(http.responseText)
            }
        };
        http.send(null);
    } catch (err) {
        onFail(err);
    }
}

