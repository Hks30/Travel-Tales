/* how called: 
        dropDownFW({
            dropHeaderStyle: "dropHeader",
            dropContentStyle: "dropContent",
            showStyle: "show",
            hideStyle: "hide"
        }); 
*/

function dropDownFW({ dropHeaderStyle = "dropHeader", dropContentStyle = "dropContent",
    showStyle = "show", hideStyle = "hide" }) {

    window.onclick = function (event) {

        var clickedEle = event.target;  // this is the DOM element (anywhere on page) that was clicked.
        // console.log("clickedEle on next line");
        // console.log(clickedEle);

        if (clickedEle.classList.contains(dropHeaderStyle)) {

            var nextEle = clickedEle.parentElement.getElementsByClassName(dropContentStyle)[0];
            // console.log("nextEle on next line");
            // console.log(nextEle);

            if (nextEle.classList.contains(showStyle)) {
                hide(nextEle);
            } else {
                show(nextEle);
                hideAllBut(nextEle);
            }

        } else {

            hideAllBut(); // hide all drop contents
        }

        // private function defined inside of another function
        function hide(ele) {
            ele.classList.remove(showStyle);
            ele.classList.add(hideStyle);
        }

        function hideAllBut(ele) {
            var dropContentList = document.getElementsByClassName(dropContentStyle);
            for (var dropContent of dropContentList) {
                if (dropContent !== ele) {
                    dropContent.classList.remove(showStyle);
                    dropContent.classList.add(hideStyle);
                }
            }
        }

        // private function defined inside of another function
        function show(ele) {
            ele.classList.remove(hideStyle);
            ele.classList.add(showStyle);
        }
    };  // window.onclick function 








}