angular.module("odb").directive("odbTextAreaAutoHeight", [
    function() {
        return {
            link: function(elem) {
                var txt = elem,
                    hiddenDiv = $(document.createElement('div')),
                    content = null;

                txt.addClass('txtstuff');
                hiddenDiv.addClass('hiddendiv common');

                $('body').append(hiddenDiv);

                txt.on('keyup', function () {

                    content = $(this).val();

                    content = content.replace(/\n/g, '<br>');
                    hiddenDiv.html(content + '<br class="lbr">');

                    elem.css('height', hiddenDiv.height());
                });​
            }
        };
    }
]);
