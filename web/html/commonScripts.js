var respActionTable;
var respTable;
var paymentVisitsTable;

$(function() {
    $('.withCharLimit').keyup(function() {
        var max = 500;
        var char = 0;
        var len = $(this).val().length;
        $('.hhax-hint-text.charLimit').html(len + '/' + max + ' characters');
        if (len >= max) {
            var char = len - max;
            $('.hhax-hint-text.charLimit').addClass('hhax-form-error-text');
            $('.hhax-hint-text.charLimit').append(' - Limit exceeded');
        } else {
            $('.hhax-hint-text.charLimit').removeClass('hhax-form-error-text');
        }
    });

    /* Generic DataTables */
    $('.sortableTable').DataTable({
        paging: false,
        lengthMenu: false,
        info: false,
        searching: false,
        order: [
            [0, 'asc']
        ],
        columnDefs: [{ orderable: false, targets: -1 }],
    });
    respActionTable = $('.responsiveActionTable').DataTable({
        paging: false,
        lengthMenu: false,
        info: false,
        searching: false,
        responsive: {
            details: { type: 'column' },
        },
        order: [
            [1, 'asc']
        ],
        columnDefs: [
            { className: 'control', orderable: false, targets: 0 },
            { orderable: false, targets: -1 },
            { responsivePriority: 0, targets: 1 },
            { responsivePriority: 1, targets: -1 }
        ],
    });

    paymentVisitsTable = $('#paymentVisitsTable').DataTable({
        paging: false,
        lengthMenu: false,
        info: false,
        searching: false,
        responsive: {
            details: { type: 'column' },
        },
        order: [
            [2, 'desc']
        ],
        columnDefs: [
            { className: 'control', orderable: false, targets: 0 },
            { orderable: false, targets: -1 },
            { orderable: false, targets: 1 },
            { responsivePriority: 0, targets: 1 },
            { responsivePriority: 1, targets: 2 },
            { responsivePriority: 2, targets: -1 },
            { responsivePriority: 3, targets: 3 },
            { responsivePriority: 4, targets: 6 },
            { responsivePriority: 5, targets: -2 },
            { responsivePriority: 6, targets: -3 },
            { responsivePriority: 7, targets: -4 },
            { responsivePriority: 8, targets: -5 },
            { responsivePriority: 9, targets: -6 },
            { responsivePriority: 19, targets: -7 },
            { responsivePriority: 11, targets: -8 },
            { responsivePriority: 12, targets: -9 },
            { responsivePriority: 13, targets: -10 },
            { responsivePriority: 14, targets: -11 },
            { responsivePriority: 15, targets: -12 },
            { responsivePriority: 16, targets: -13 },
            { responsivePriority: 17, targets: -14 },
            { responsivePriority: 18, targets: -15 }
        ],
    })

    $('.sortDescTable').DataTable({
        paging: false,
        lengthMenu: false,
        info: false,
        searching: false,
        order: [
            [0, 'desc']
        ],
        columnDefs: [{ orderable: false, targets: -1 }],
    });
    $('.selectableTable').DataTable({
        paging: false,
        lengthMenu: false,
        info: false,
        searching: false,
        order: [
            [1, 'asc']
        ],
        columnDefs: [
            { orderable: false, targets: -1 },
            { orderable: false, targets: 0 },
        ],
    });
    $('.selectableDescTable').DataTable({
        paging: false,
        lengthMenu: false,
        info: false,
        searching: false,
        order: [
            [1, 'desc']
        ],
        columnDefs: [
            { orderable: false, targets: -1 },
            { orderable: false, targets: 0 },
        ],
    });
    respTable = $('.responsiveTable').DataTable({
        //scrollY: 300,
        paging: false,
        lengthMenu: false,
        info: false,
        searching: false,
        responsive: {
            details: { type: 'column' },
        },
        order: [
            [1, 'asc']
        ],
        columnDefs: [
            { className: 'control', orderable: false, targets: 0 },
            { responsivePriority: 0, targets: 1 }, //,
            //{ responsivePriority: 1, targets: -1 },
            //{ 'orderable': false, 'targets': -1 }//,
            //{ 'visible': false, 'targets': 8 },
            //{ className: 'search-col', targets: 7 }
        ],
    });
    respDescTable = $('.responsiveDescTable').DataTable({
        //scrollY: 300,
        paging: false,
        lengthMenu: false,
        info: false,
        searching: false,
        responsive: {
            details: { type: 'column' },
        },
        order: [
            [1, 'desc']
        ],
        columnDefs: [
            { className: 'control', orderable: false, targets: 0 },
            { responsivePriority: 0, targets: 1 }, //,
            //{ responsivePriority: 1, targets: -1 },
            //{ 'orderable': false, 'targets': -1 }//,
            //{ 'visible': false, 'targets': 8 },
            //{ className: 'search-col', targets: 7 }
        ],
    });

    var shiftTable = $('.shiftTable').DataTable({
        paging: false,
        lengthMenu: false,
        info: false,
        searching: false,
        ordering: false,
        responsive: {
            details: { type: 'column' }
        },
        columnDefs: [
            { className: 'control', orderable: false, targets: 0 },
            { orderable: false, targets: -1 },
            { responsivePriority: 0, targets: 1 },
            { responsivePriority: 1, targets: -1 },
            { responsivePriority: 2, targets: 4 },
            { responsivePriority: 3, targets: 5 },
            { responsivePriority: 4, targets: 6 },
            { responsivePriority: 5, targets: -3 },
            { responsivePriority: 6, targets: 2 },
            { responsivePriority: 7, targets: 3 },
            { responsivePriority: 8, targets: -4 }
        ],
    });

    $('.expandAll').on('click', function() {
        // Expand row details
        respTable.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');
        respDescTable.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');
        respActionTable.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');
        paymentVisitsTable.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');
        shiftTable.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');
    });

    // Handle click on "Collapse All" button
    $('.collapseAll').on('click', function() {
        // Collapse row details
        respTable.rows('.parent').nodes().to$().find('td:first-child').trigger('click');
        respDescTable.rows('.parent').nodes().to$().find('td:first-child').trigger('click');
        respActionTable.rows('.parent').nodes().to$().find('td:first-child').trigger('click');
        paymentVisitsTable.rows('.parent').nodes().to$().find('td:first-child').trigger('click');
        shiftTable.rows('.parent').nodes().to$().find('td:first-child').trigger('click');
    });
});

// Open windows and URL
function openUrl(url, opt) {
    if (opt == 0) {
        // current window
        window.location = url;
    } else if (opt == 1) {
        // new window
        window.open(url);
    } else if (opt == 2) {
        // background window
        window.open(url);
        self.focus();
    } else {
        window.location = url;
    }
}
// open a small browser windows
function openWindow(url, title, width, height) {
    if (!width) width = 500;
    if (!height) height = 400;
    window.open(url, title, 'width = ' + width + ', height =' + height + ', toolbar=0, menubar=0, status=0');
}

// utility functions for prototyping
function showElement(element) {
    $(element).removeClass('hide');
}

function hideElement(element) {
    $(element).addClass('hide');
}

function toggleElement(element) {
    $(element).toggleClass('hide');
}

// select all checkboxes
function selectAllCheckboxes(source, checkboxesName) {
    var checkboxes = document.getElementsByName(checkboxesName);
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = source.checked;
    }
}

//success and warning toast messages timeout
function successTimeout() {
    $('.toastSuccess')
        .fadeTo(8000, 0)
        .slideUp(500, function() {
            $(this).addClass('hide');
            console.log('hide success');
        });

    $('.toastSuccess')
        .on('mouseover', function(e) {
            if ($(this).css('opacity') > 0.1) {
                $(this).stop(true).fadeTo(200, 1);
            }
        })
        .on('mouseout', function(e) {
            if ($(this).css('opacity') > 0.1) {
                $(this).fadeTo(10000, 0);
            }
        });

    $('.toastSuccess').on('click', function() {
        $(this).off('mouseout');
    });
}

function warningTimeout() {
    $('.toastWarning')
        .fadeTo(5000, 0)
        .slideUp(3000, function() {
            $(this).addClass('hide');
        });
}

function saveSuccessMsg(msg) {

    console.log(msg);
    $('.toastSuccess').stop(true).fadeTo(200, 1);
    $('.toastSuccess').addClass('hide');
    $('.toastSuccess').toggle();
    $('.toastSuccess').removeClass('hide');
    $('.toastSuccess').toggle();
    $('.toastSuccess .content').html(msg);
    successTimeout();
}

function saveSuccessMsgNoFade(msg) {
    console.log(msg);
    $('.toastSuccess').toggle();
    $('.toastSuccess').removeClass('hide');
    $('.toastSuccess .content').html(msg);
}

function saveErrorMsg(msg) {
    console.log(msg);
    $('.toastAlert').toggle();
    $('.toastAlert').removeClass('hide');
    $('.toastAlert .content').html(msg);
}

function saveInfoMsg(msg) {
    console.log(msg);
    $('.toastInfo').removeClass('hide');
    $('.toastInfo').toggle();
    $('.toastInfo .content').html(msg);
}

function confirmDelete(ele) {
    $('#confirmDeletion .content').html(ele);
    $('#confirmDeletion').foundation('open');
}

function confirmRecall(ele) {
    $('#confirmRecall .content').html(ele);
    $('#confirmRecall').foundation('open');
}

function uploadFile() {
    var count = 10;
    var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
    $('#uploadDocModal .uploadButton').toggleClass('hide');

    function timer() {
        count = count - 1;
        if (count <= 0) {
            clearInterval(counter);
            $('#uploadDocModal .uploadButton').toggleClass('hide');
            $('#uploadDocModal').foundation('close');
            saveSuccessMsg('Document uploaded successfully');
            $('.uploadedDoc').toggleClass('hide');
            return;
        }
    }
}

function checkLimit() {
    if ($('.totalLimit').val() == '3600.00' || $('.totalLimit').val() == '3600') {
        console.log('yes 3600');
        $('#limitError').removeClass('is-visible');
        $('.totalLimit').removeClass('is-invalid-input');
        $('.totalLimit').removeClass('hhax-form-error');
        $('.limit .primary.button').removeClass('disabled');
    } else {
        console.log('not 3600');
        $('#limitError').addClass('is-visible');

        $('.totalLimit').addClass('is-invalid-input');
        $('.totalLimit').addClass('hhax-form-error');
        $('.limit .primary.button').addClass('disabled');
    }
}

//When modals are opened, re-initialize compact multiselects
$(document).on('open.fndtn.reveal', '[data-reveal]', function() {
    initializeCompactMultiselects();
    styleNestedMultiSelect();
});

$(document).ready(function() {
    initializeCompactMultiselects();
    styleNestedMultiSelect();
});

function initializeCompactMultiselects() {
    $('.multiselect-compact:visible').each(function(i, e) {
        $(e).zmultiselect({
            filter: false,
            //filterResult: true,
            selectAll: false,
            //locale: 'it-IT',

            //REPLACE WITH CUSTOM TEXT:
            //selectAllText: ['Check All', 'Uncheck All'],
            //selectedText: ['Selected', 'of'],
            //filterPlaceholder: 'What are your searching for?',
            //filterResultText: "Showed",
            //filterPlaceholder: 'MyFilter...',

            get: 'zmultiselect',
            placeholder: 'Select one or more',
            live: '#menu_live',
        });
    });

    $('.zselect ul>li:first-child input').on('change', function(e) {
        //Implement select all as a checkbox for accessibility
        if ($(e.target).parent().html().indexOf('All') != -1) {
            //Input labeled "All" checked
            console.log('all input changed');
            var associatedSelect = $(e.target).closest('.multiselect-compact-container').find('.multiselect-compact');
            if ($(e.target).prop('checked') == false) {
                $(associatedSelect).zmultiselect('uncheckAll');
            } else {
                $(associatedSelect).zmultiselect('checkAll');
            }
        }
    });

    $('.zselect ul>li:not(:first-child) *').on('click', function(e) {
        //Deselect "All" option when any other option is de-selected
        var container = $(e.target).closest('.multiselect-compact-container');
        var input = $(container).find('input');
        if ($(input).prop('checked') == true) {
            $(container).find('.zselect ul>li:first-child input').prop('checked', false);
        }

        var allChecked = true;
        input.each(function(i, ele) {
            if (i != 0 && $(input[i]).prop('checked') == false) {
                //If all checkboxes other than the first one are checked
                allChecked = false;
            }
        });

        if (allChecked) {
            $(container).find('.zselect ul>li:first-child input').prop('checked', true);
        }
    });
}

function multiSelectInputFocused(e) {
    $(e.target).parent('multi-input').addClass('focused');
}

function multiSelectInputFocusOut(e) {
    $(e.target).parent('multi-input').removeClass('focused');
}

function styleNestedMultiSelect() {
    var layer1s = $('.multiselect-compact.nested + .zselect').find('li:contains("_layer1")');
    var layer2s = $('.multiselect-compact.nested + .zselect').find('li:contains("_layer2")');
    var layer3s = $('.multiselect-compact.nested + .zselect').find('li:contains("_layer3")');

    //Style nested options by layer
    for (layer1 of layer1s) {
        $(layer1).addClass('layer1');
        $(layer1).html($(layer1).html().split('_layer1').join(''));
    }
    for (layer2 of layer2s) {
        $(layer2).addClass('layer2');
        $(layer2).find('input').addClass('margin-left-1');
        $(layer2).html($(layer2).html().split('_layer2').join(''));
    }
    for (layer3 of layer3s) {
        $(layer3).addClass('layer3');
        $(layer3).find('input').addClass('margin-left-2');
        $(layer3).html($(layer3).html().split('_layer3').join(''));
    }

    $('.multiselect-compact.nested + .zselect ul>li:not(:first-child) *').on('click', function() {
        //(un)Check all child items
        if ($(this).closest('li').hasClass('layer1')) {
            var allChildren = $(this).closest('li').nextUntil('.layer1');
            for (Child of allChildren) {
                if ($(this).parent().find('input').is(':checked')) {
                    $(Child).find('input').prop('checked', true);
                } else {
                    $(Child).find('input').prop('checked', false);
                }
            }
        }
        if ($(this).closest('li').hasClass('layer2')) {
            var allChildren = $(this).closest('li').nextUntil('.layer2, .layer1');
            for (Child of allChildren) {
                if ($(this).parent().find('input').is(':checked')) {
                    $(Child).find('input').prop('checked', true);
                } else {
                    $(Child).find('input').prop('checked', false);
                }
            }
        }

        //(un)Check parent
        if ($(this).closest('li').hasClass('layer3')) {
            var allNexts = $(this).closest('li').nextUntil('.layer2, .layer1');
            var allPrevs = $(this).closest('li').prevUntil('.layer2');
            var allSiblings = allNexts.add(allPrevs);
            var x = 0;
            for (Sibling of allSiblings) {
                if ($(this).parent().find('input').is(':checked') && $(Sibling).find('input').is(':checked')) {
                    x++;
                } else if (!$(this).parent().find('input').is(':checked') && !$(Sibling).find('input').is(':checked')) {
                    x++;
                }
            }
            if (x == allSiblings.length) {
                if ($(this).parent().find('input').is(':checked')) {
                    $(this).closest('li').prevAll('.layer2').first().find('input').prop('checked', true);
                } else {
                    $(this).closest('li').prevAll('.layer2').first().find('input').prop('checked', false);
                }
            }
        }
        if ($(this).closest('li').hasClass('layer2')) {
            var allNexts = $(this).closest('li').nextUntil('.layer1');
            var allPrevs = $(this).closest('li').prevUntil('.layer1');
            var allSiblings = allNexts.add(allPrevs);
            var x = 0;
            for (Sibling of allSiblings) {
                if ($(this).parent().find('input').is(':checked') && $(Sibling).find('input').is(':checked')) {
                    x++;
                } else if (!$(this).parent().find('input').is(':checked') && !$(Sibling).find('input').is(':checked')) {
                    x++;
                }
            }
            if (x == allSiblings.length) {
                if ($(this).parent().find('input').is(':checked')) {
                    $(this).closest('li').prevAll('.layer1').first().find('input').prop('checked', true);
                } else {
                    $(this).closest('li').prevAll('.layer1').first().find('input').prop('checked', false);
                }
            }
        }
    });
}

// file upload
$('.hhax-file-upload input').change(function() {
    var i = $(this).prev('label').clone();
    var file = $('.hhax-file-upload input')[0].files[0].name;
    $(this).prev('label').text(file);
});

function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $(input).closest('.file-upload-wrap').addClass('hide');
            $(input).closest('.file-upload').find('.file-upload-btn').addClass('hide');
            $(input).closest('.file-upload').find('.file-upload-content').removeClass('hide');
            $(input).closest('.file-upload').find('.file-title').html(input.files[0].name);

            let filesizeKB = input.files[0].size / 1000;
            filesizeKB = Math.round(filesizeKB * 100) / 100;
            let filesizeMB = filesizeKB / 1000;
            filesizeMB = Math.round(filesizeMB * 100) / 100;

            let fileString = input.files[0].name + ' ';
            if (filesizeMB > 1) {
                $(input)
                    .closest('.file-upload')
                    .find('.file-size')
                    .html(filesizeMB + ' MB');
                fileString = fileString + '(' + filesizeMB + ' MB)';
            } else {
                $(input)
                    .closest('.file-upload')
                    .find('.file-size')
                    .html(filesizeKB + ' KB');
                fileString = fileString + '(' + filesizeKB + ' KB)';
            }

            $(input).closest('.file-upload').find('.uploaded-file-link').focus();

            //$(input).closest('.file-upload').find('.file-size').html(input.files[0].size);

            let filetype = input.files[0].name.replace(/^.*\./, '');
            filetype = filetype.toLowerCase();
            //Supported filetypes: .doc, .docx, .pdf, .txt, .png, .gif, .jpeg, .jpg,  .xls, .xlsx
            if (filetype == 'doc' || filetype == 'docx') {
                $(input).closest('.file-upload').find('.file-icon .fa-file-word').removeClass('hide');
            } else if (filetype == 'pdf') {
                $(input).closest('.file-upload').find('.file-icon .fa-file-pdf').removeClass('hide');
            } else if (filetype == 'txt') {
                $(input).closest('.file-upload').find('.file-icon .fa-file-alt').removeClass('hide');
            } else if (filetype == 'png' || filetype == 'gif' || filetype == 'jpeg' || filetype == 'jpg') {
                $(input).closest('.file-upload').find('.file-icon .fa-image').removeClass('hide');
            } else if (filetype == 'xls' || filetype == 'xlsx') {
                $(input).closest('.file-upload').find('.file-icon .fa-file-excel').removeClass('hide');
            }
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        removeUpload(input);
    }
}

function removeUpload(ele) {
    $(ele)
        .closest('.file-upload')
        .find('.file-upload-input')
        .replaceWith($(ele).closest('.file-upload').find('.file-upload-input').clone());
    $(ele).closest('.file-upload').find('.file-upload-input')[0].value = '';
    $(ele).closest('.file-upload').find('.file-upload-content').addClass('hide');
    $(ele).closest('.file-upload').find('.file-upload-btn').removeClass('hide');
    $(ele).closest('.file-upload').find('.file-icon *').addClass('hide');
}

function selectableTableClick(ctx, e) {
    $(ctx).parents('table').find('button').not($(ctx)).html('Select');
    $(ctx).parents('table').find('button').not($(ctx)).removeClass('selected');
    $(ctx).parents('table').find('button').not($(ctx)).addClass('hollow');

    $(ctx).toggleClass('selected');
    $(ctx).toggleClass('hollow');
    if ($(ctx).hasClass('selected')) {
        $(ctx).html('Selected');
    } else {
        $(ctx).html('Select');
    }

    $('.linkFieldButton').removeAttr('disabled');
    $('.importSectionButton').removeAttr('disabled');

    e.stopPropagation();
}

var treeObject = [{
    text: "All Offices",
    checked: true,
    children: [{
        text: "New York",
        children: [{
            text: "New York City",
            children: [{
                    text: "Brooklyn",
                    children: [{
                            text: "Office 1",
                        },
                        {
                            text: "Office 2",
                        },
                        {
                            text: "Office 3",
                        },
                    ]
                },
                {
                    text: "Manhattan",
                    children: [{
                            text: "Office 1",
                            checked: true
                        },
                        {
                            text: "Office 2",
                        },
                        {
                            text: "Office 3",
                        },
                    ]
                },
                {
                    text: "Queens",
                    children: [{
                            text: "Office 1",
                        },
                        {
                            text: "Office 2",
                        },
                        {
                            text: "Office 3",
                        },
                    ]
                },
            ]
        }]
    }]
}]

$(function() {
    if (typeof TreeView !== 'undefined') {
        var tw = new TreeView(
            treeObject, { openAllFold: true }
        );

        $('.tree').append(tw.root);
    }
});

// authorization type select dropdown change
function changeAuthType(e) {
    console.log(e.options[e.selectedIndex].text);

    switch (e.options[e.selectedIndex].text) {
        case 'Daily':
            $('.dailyOptions').removeClass('hide');
            $('.weeklyOptions').addClass('hide');
            $('.monthlyOptions').addClass('hide');
            $('.entireOptions').addClass('hide');
            $('.maxUnitsAuth').removeClass('hide');
            $('.allowDateType').removeClass('hide');
            $('#maxUnitsPerAuth').val($('#unitsPerAuthPeriod').val());
            $('#maxUnitsPerAuth').prop('readonly', true);
            break;
        case 'Weekly':
            $('.monthlyOptions').addClass('hide');
            $('.dailyOptions').addClass('hide');
            $('.weeklyOptions').removeClass('hide');
            $('.entireOptions').addClass('hide');
            $('.maxUnitsAuth').removeClass('hide');
            $('.allowDateType').removeClass('hide');
            $('#maxUnitsPerAuth').val($('#unitsPerAuthPeriod').val());
            $('#maxUnitsPerAuth').prop('readonly', true);
            break;
        case 'Monthly':
            $('.monthlyOptions').removeClass('hide');
            $('.dailyOptions').addClass('hide');
            $('.weeklyOptions').addClass('hide');
            $('.entireOptions').addClass('hide');
            $('.maxUnitsAuth').removeClass('hide');
            $('.allowDateType').addClass('hide');
            $('#maxUnitsPerAuth').val($('#unitsPerAuthPeriod').val());
            $('#maxUnitsPerAuth').prop('readonly', true);
            break;
        case 'Entire Period':
            $('.monthlyOptions').addClass('hide');
            $('.dailyOptions').addClass('hide');
            $('.weeklyOptions').addClass('hide');
            $('.entireOptions').removeClass('hide');
            $('.maxUnitsAuth').addClass('hide');
            $('.allowDateType').addClass('hide');
            $('#unitsPerAuthPeriod').val($('#maxUnitsPerAuth').val());
            break;
    }
}

//Mark Link List Item Selected by content id
function markLinkListSelected() {
    var pageContent = $('.link-list-content').attr('id');
    $('.link-list-item a').each(function() {
        if ($(this).attr('data-link-active') == pageContent) {
            console.log($(this).attr('data-link-active'));
            $(this).attr('aria-selected', 'true');
            $(this).parent().addClass('is-active');
        } else { $(this).attr('aria-selected', 'false'); }
    })
}

markLinkListSelected();


function wrapDropdown() {
    $('.long-options').on('click', function() {
        $(this).next('.is-dropdown-submenu').addClass('wrap-options');
    });
}

wrapDropdown();

// Phone Validator

function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
}

function phoneNumberFormatter(ctx) {
    const inputField = ctx; //document.getElementById('phone-number');
    const formattedInputValue = formatPhoneNumber(inputField.value);
    inputField.value = formattedInputValue;
}

function invalidify() {
    $('input:visible').addClass('is-invalid-input');
    $('label:visible').addClass('is-invalid-label');
}

function defocusOnEnter(e) {
    if (e.which == 13) {
        $(e.target).blur();
    }
}