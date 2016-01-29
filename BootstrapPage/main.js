// Jquery for modal  table content
$(document).ready(function() {
    $('#modal1').click(function() {
        $('#contentload').html($('.boxes').eq(0).find('p').text());
    });
    $('#modal2').click(function() {
        $('#contentload').html($('.boxes').eq(1).find('p').text());
    });
    $('#modal3').click(function() {
        $('#contentload').html($('.boxes').eq(2).find('p').text());
    });
    $('#modal4').click(function() {
        $('#contentload').html($('.boxes').eq(3).find('p').text());
    });
    //Ajax call for images...
    var oimages = $.ajax({
        url: 'main.json',
        type: 'GET',
        dataType: 'JSON'
    });
    oimages.success(function(data) {
        var oslide = data;
        for (i = 0; i < oslide.Images.length; i++) {
            $('#image img').eq(i).attr("src", oslide.Images[i].img);
            $('#image p').eq(i).html(oslide.Images[i].caption);
        }
        for (i = 0; i < oslide.SmallImages.length; i++) {
            $('#item h4').eq(i).html(oslide.SmallImages[i].title);
            $('#item img').eq(i).attr("src", oslide.SmallImages[i].icon);
            $('#item p').eq(i).html(oslide.SmallImages[i].text);
        }
    });
    // ===============employee table==========================
    $('#empbtn').click(function() {
        $('#adding').show();
        $('#update').hide();
    });
    $('#adding').click(function() {
        $('#tableid tbody').append('<tr><td>' + $('#SNo').val() + '</td>' + '<td>' + $('#ename').val() + '</td>' + '<td>' + $('#eid').val() + '</td>' + '<td>' + $('#address').val() + '</td>' + '<td><button class="btn btn-default" id="edit">Edit</button></td>' + '<td><button class="btn btn-default" id="view" data-toggle="modal" data-target="#myModal3">View</button></td>' + '<td><button class="btn btn-default" id="delete">Delete</button></td>' + '<td><span class="glyphicon glyphicon-info-sign" aria-hidden="true" id="info"></span></td>' + '</tr>');

    });
    $('#tableid').on('click', '#delete', function() {
        $(this).parent().parent().remove();
    });
    $('#tableid').on('click', '#view', function() {
        var oview = $(this).closest('td').parent();
        $('#editcontent').html('SNo:' + oview.find('td').eq(0).text() + '<br/>' + 'EmployeName:' + oview.find('td').eq(1).text() + '<br/>' + 'EmployeId:' + oview.find('td').eq(2).text() + '<br/>' + 'Address:' + oview.find('td').eq(3).text());
    });
    var r1, r2, r3, r4;

    $(document).on('click', '#edit', function() {
        $('#myModal2').modal('show');
        $('#adding').hide();
        $('#update').show();
        var tr = $(this).closest('td').parent();
        r1 = tr.find('td').eq(0);
        r2 = tr.find('td').eq(1);
        r3 = tr.find('td').eq(2);
        r4 = tr.find('td').eq(3);
        $('#SNo').val(cell1.text());
        $('#ename').val(cell2.text());
        $('#eid').val(cell3.text());
        $('#address').val(cell4.text());
    });
    $('#update').click(function() {

        r1.text($('#SNo').val());
        r2.text($('#ename').val());
        r3.text($('#eid').val());
        r4.text($('#address').val());
        $('#myModal2').modal('hide');

    });
    $('#tableid').on("mouseover", "#info", function() {
        var tp = $(this).closest('td').parent();
        $(this).tooltip({
            title: 'Serial No:' + tp.find('td').eq(0).text() + 'EmpName:' + tp.find('td').eq(1).text() + 'EmpId:' + tp.find('td').eq(2).text() + 'Address:' + tp.find('td').eq(3).text(),
            placement: "top"
        });


    });
    //=================================Sorting===============================================
    var f_sl = 1;
    $('#sortData').click(function() {

        $('#sortData span').toggleClass('glyphicon-triangle-bottom glyphicon-triangle-top');
        f_sl *= -1;
        var n = $(this).prevAll().length;
        sortTable(f_sl, n);
    });

    function sortTable(f, n) {
        var rows = $('#tableid tbody  tr').get();

        rows.sort(function(a, b) {

            var A = Number($(a).children('td').eq(n).text());

            var B = Number($(b).children('td').eq(n).text());

            if (A < B) {
                return -1 * f;
            }
            if (A > B) {
                return 1 * f;
            }
            return 0;
        });

        $.each(rows, function(index, row) {
            $('#tableid').children('tbody').append(row);
        });
    }
});
