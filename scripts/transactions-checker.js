/** 
  * @desc this object to validated transaction object
  * @example transactionChecker.isValid(transObj), transactionChecker.getErrorMessage()
  * @author Nasser Al-Assaly nax.roma@gmail.com
*/
transactionChecker = (function () {

    var errMessage = '';
    /** 
     * @desc public function to valid transaction object
     * @example isValid(transactionObject)
     * @param transactionObject typeof any
     * @return boolan true || false
     */
    function isValid(transactionObject) {

        let jsonObject = getJsonObject(transactionObject);
        if (
            !jsonObject
            || jsonObject == null
            || !isTaxesValid(jsonObject)
        ) {
            return false;
        }

        return true;
    }

    /** 
     * @desc public function to get any error that done in this checker
     * @example getErrorMessage()
     * @return string error message;
     */
    function getErrorMessage() {
        return errMessage;
    }

    /** 
     * @desc private function to check form taxes object in the transaction
     * @example isTaxesValid(jsonObject)
     * @param jsonObject typeof jsonObject
     * @return boolan true || false
     */
    function isTaxesValid(jsonObject) {
        var taxObject = jsonObject['taxes'];
        if (!taxObject || !taxObject.length) {
            errMessage = "error in taxs, tax's is not defiend";
            return false;
        }
        return true;
    }

    /** 
     * @desc private function to get type of the transaction object and convert it to json object
     * @example getJsonObject(transUknowObj)
     * @param transactionObject typeof string, json, xml ,array
     * @return json object || null
     */
    function getJsonObject(transactionObject) {
        try {
            // in this case the result is already json object
            return JSON.parse(transactionObject);
        } catch (err) {
            try {
                // in this case the result is array object
                var strObj = JSON.stringify(transactionObject);
                return JSON.parse(strObj);
            } catch (err) {
                try {
                    // in this case the result is xml object
                    return xmlToJson(transactionObject);
                } catch (err) {
                    // type that i dont know and i can handel.
                    errMessage = "error in getJsonObject, error transaction object type";
                    return null;
                }
            }
        }
    }

    var transactionCheckerPublicApis = {
        isValid: isValid,
        getErrorMessage: getErrorMessage,
    };

    return transactionCheckerPublicApis;
}());