jk(document).on('knack-page-render.any', function (event, view, records) {
    $(".kn-instructions:contains('slider')").each(function () {
        if ($(this).siblings('.control').length) {
            var original_input_el = $(this).siblings('.control').children().first();
            console.log("Used Control Level");
        } else {
            var original_input_el = $(this).closest('.kn-input').find('input').first();
            console.log("Used Sibling Level", $(original_input_el));
        }

        // Retrieve the initial value
        var original_input_val = original_input_el.val();

        // Hide Number Input Box
        original_input_el.css("display", "none");

        // Get the slider range out of the instructions text, use given range to build slider
        var range = [0, 5];
        var instruction_vals = $(this)[0].innerText.split(":").pop().replace(/\s+/, '\x01').split('\x01');
        var value = instruction_vals[0];
        var instructions = "";
        if (instruction_vals.length > 1) {
            instructions = instruction_vals[1];
        }

        $(this).html(instructions);

        // Set Range Values
        range = value.split('|');

        // Create Slider
        var slider = '<input style="margin-top:20px" type="range" min="' + range[0] + '" max="' + range[1] + '" ' +
            'value="' + original_input_val + '" step="1" data-rangeslider>' +
            '<output class="slider-output"></output>';

        // Insert actual slider element to DOM
        $(slider).insertAfter(
            original_input_el
        );

        // RangeSlider Initialization

        var selector = '[data-rangeslider]';
        var $inputRange = $(selector);

        /** Setup RangeSlider Feedback **/
        function valueOutput(element) {
            var value = element.value;
            var output = element.parentNode.getElementsByTagName('output')[0];
            var storage = element.parentNode.getElementsByTagName('input')[0];
            output.innerHTML = value;
            storage.value = value;
        }

        function updateRangesliderWidth(viewWidth) {
            $(".rangeslider").each(function (index) {
                $(this).parent().width((viewWidth - 0));
                $(this).width((viewWidth - 28));
                $(this).css("max-width", ((viewWidth - 28) + "px"));
            });
        }

        // Make sliders responsive
        $(window).resize(function () {
            var viewWidth = ($('.view-header>h2')[0].offsetWidth - 5);
            updateRangesliderWidth(viewWidth);
        });

        /** Sets both Input and Output elements **/
        for (var i = $inputRange.length - 1; i >= 0; i--) {
            valueOutput($inputRange[i]);
        }

        /** Update value output **/
        $(document).on('input', selector, function (e) {
            valueOutput(e.target);
        });

        /** Initialize the elements **/
        $inputRange.rangeslider({
            polyfill: false
        });

        // Initial Setting of Width
        $(window).trigger('resize');
    });
});
